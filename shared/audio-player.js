const players = new Set();
const initialized = new WeakSet();

const qs = (selector, scope) => scope.querySelector(selector);

export const formatTime = (seconds, showSubsecondDuration = false) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const wholeSeconds = showSubsecondDuration && seconds > 0 && seconds < 1 ? 1 : Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  return `${minutes}:${String(wholeSeconds % 60).padStart(2, "0")}`;
};

const escapeAttribute = value => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

export function audioPlayerMarkup({src, title, duration = 0, preload = "metadata", className = ""}) {
  const safeSrc = escapeAttribute(src);
  const safeTitle = escapeAttribute(title);
  return `<div class="audio-control-row ${className}" data-audio-player data-audio-title="${safeTitle}">
    <audio src="${safeSrc}" preload="${preload}"></audio>
    <div class="audio-controls">
      <button class="audio-toggle" type="button" aria-label="Play ${safeTitle}"><span aria-hidden="true">▶</span><span>Play</span></button>
      <input class="audio-progress" type="range" min="0" max="${duration || 1}" value="0" step="0.1" aria-label="Seek ${safeTitle}" disabled>
      <output class="audio-time" aria-label="Playback time"><span data-current-time>0:00</span> / <span data-duration>${formatTime(duration, true)}</span></output>
    </div>
    <span class="audio-state sr-only" data-audio-status aria-live="polite">Ready to load ${safeTitle}</span>
    <noscript><audio class="native-audio-fallback" src="${safeSrc}" controls preload="metadata">Open ${safeTitle} in a browser with audio support.</audio></noscript>
  </div>`;
}

export function pauseAllAudio(except = null) {
  players.forEach(audio => {
    if (audio !== except && !audio.paused) audio.pause();
  });
}

export function setupAudioPlayers(scope = document) {
  scope.querySelectorAll("[data-audio-player]").forEach(player => {
    if (initialized.has(player)) return;
    initialized.add(player);

    const audio = qs("audio", player);
    const toggle = qs(".audio-toggle", player);
    const toggleIcon = qs("span:first-child", toggle);
    const toggleLabel = qs("span:last-child", toggle);
    const progress = qs(".audio-progress", player);
    const current = qs("[data-current-time]", player);
    const duration = qs("[data-duration]", player);
    const status = qs("[data-audio-status]", player);
    const title = player.dataset.audioTitle || "audio";
    const container = player.closest(".audio-bank-card, .composition-card, .featured-composition");
    let playbackRequested = false;
    players.add(audio);

    const setStatus = (state, message) => {
      player.dataset.audioState = state;
      if (status) status.textContent = message;
    };
    const syncDuration = () => {
      if (!Number.isFinite(audio.duration)) return;
      progress.max = String(audio.duration);
      progress.disabled = false;
      duration.textContent = formatTime(audio.duration, true);
      setStatus(audio.paused ? "ready" : "playing", audio.paused ? `${title} ready` : `Playing ${title}`);
    };
    const syncTime = () => {
      progress.value = String(audio.currentTime);
      const percent = Number.isFinite(audio.duration) && audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
      progress.style.setProperty("--progress", `${percent}%`);
      current.textContent = formatTime(audio.currentTime);
    };
    const syncToggle = playing => {
      toggleIcon.textContent = playing ? "Ⅱ" : "▶";
      toggleLabel.textContent = playing ? "Pause" : "Play";
      toggle.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${title}`);
      player.classList.toggle("is-playing", playing);
      container?.classList.toggle("is-playing", playing);
    };
    const fail = () => {
      syncToggle(false);
      toggle.disabled = true;
      progress.disabled = true;
      setStatus("error", `${title} could not be loaded`);
    };

    audio.addEventListener("loadstart", () => {
      if (playbackRequested) setStatus("loading", `Loading ${title}`);
    });
    audio.addEventListener("waiting", () => {
      if (playbackRequested) setStatus("loading", `Buffering ${title}`);
    });
    audio.addEventListener("stalled", () => {
      if (playbackRequested) setStatus("loading", `Waiting for ${title}`);
    });
    audio.addEventListener("canplay", () => setStatus(audio.paused ? "ready" : "playing", audio.paused ? `${title} ready` : `Playing ${title}`));
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("error", fail);
    audio.addEventListener("play", () => {
      pauseAllAudio(audio);
      syncToggle(true);
      setStatus("playing", `Playing ${title}`);
    });
    audio.addEventListener("pause", () => {
      syncToggle(false);
      if (!audio.ended && player.dataset.audioState !== "error") setStatus("paused", `${title} paused`);
    });
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      syncTime();
      setStatus("ready", `${title} finished`);
    });

    toggle.addEventListener("click", () => {
      if (audio.paused) {
        playbackRequested = true;
        setStatus("loading", `Loading ${title}`);
        audio.play().catch(fail);
      } else {
        audio.pause();
      }
    });
    progress.addEventListener("input", () => {
      audio.currentTime = Number(progress.value);
      syncTime();
    });
    progress.addEventListener("keydown", event => {
      const seekKeys = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"];
      if (!seekKeys.includes(event.key) || !Number.isFinite(audio.duration)) return;
      event.preventDefault();
      if (event.key === "Home") audio.currentTime = 0;
      else if (event.key === "End") audio.currentTime = audio.duration;
      else {
        const direction = event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 1;
        audio.currentTime = Math.min(audio.duration, Math.max(0, audio.currentTime + direction * 5));
      }
      syncTime();
    });

    if (audio.readyState >= 1) syncDuration();
  });
}
