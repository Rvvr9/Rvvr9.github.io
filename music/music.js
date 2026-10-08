import { audioPlayerMarkup, formatTime, pauseAllAudio, setupAudioPlayers } from "../shared/audio-player.js?v=20261008-1";
import { setupNavigation, setupReveals } from "../shared/site-ui.js?v=20261008-1";
import {
  compositionInventory,
  featuredComposition,
  productionCapabilities,
  scoringProjects,
  selectedProjects
} from "./music-data.js?v=20261008-1";

const qs = selector => document.querySelector(selector);

const escapeHtml = value => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const artwork = (item, className = "") => `<div class="composition-art ${item.imageFit === "contain" ? "fit-contain" : ""} ${className}" style="--composition-accent:${item.accent}">
  <img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" loading="${className.includes("featured") ? "eager" : "lazy"}">
</div>`;

const trackMeta = track => `<div class="track-meta meta">
  <span>${escapeHtml(track.project)}</span>
  <span>${formatTime(track.duration, true)}</span>
</div>`;

function renderFeatured() {
  const track = featuredComposition;
  qs("[data-featured-composition]").innerHTML = `
    <div class="featured-art-wrap reveal">
      ${artwork(track, "featured-art")}
      <span class="featured-index meta">01 / Featured composition</span>
    </div>
    <div class="featured-copy reveal" style="--composition-accent:${track.accent}">
      <p class="eyebrow">River Hsu / Music composition</p>
      <h1>${escapeHtml(track.displayTitle)}</h1>
      ${trackMeta(track)}
      <p class="featured-credit">${escapeHtml(track.credit)}</p>
      <p class="featured-description">${escapeHtml(track.description)}</p>
      ${track.context ? `<p class="track-context meta">${escapeHtml(track.context)}</p>` : ""}
      ${audioPlayerMarkup({...track, title: track.displayTitle})}
      <a class="text-link" href="${track.projectUrl}">View ${escapeHtml(track.project)} project ↗</a>
    </div>`;
}

const selectedTrackMarkup = track => `<section class="selected-track" aria-label="${escapeHtml(track.displayTitle)}">
  <div class="selected-track-heading">
    <h4>${escapeHtml(track.displayTitle)}</h4>
    <span class="meta">${formatTime(track.duration, true)}</span>
  </div>
  ${audioPlayerMarkup({...track, title: track.displayTitle, className: "composition-player"})}
</section>`;

const renderAudioProject = (project, index) => `<article class="composition-card project-music-card reveal" style="--composition-accent:${project.accent}">
  <div class="composition-card-art">
    ${artwork(project)}
    <span class="composition-number meta">${String(index + 1).padStart(2, "0")}</span>
  </div>
  <div class="composition-card-copy">
    <div class="selected-project-meta meta"><span>${escapeHtml(project.role)}</span><span>${project.tracks.length} ${project.tracks.length === 1 ? "track" : "tracks"}</span></div>
    <h3>${escapeHtml(project.title)}</h3>
    <p class="selected-project-description">${escapeHtml(project.description)}</p>
    ${project.tools.length ? `<div class="selected-project-tools meta">${project.tools.map(escapeHtml).join(" / ")}</div>` : ""}
    <div class="selected-track-list">${project.tracks.map(selectedTrackMarkup).join("")}</div>
    <a class="text-link" href="${project.projectUrl}">Open full project ↗</a>
  </div>
</article>`;

const renderVideoProject = (project, index) => `<article class="composition-card video-score-card reveal" style="--composition-accent:${project.accent}">
  <div class="video-score-media">
    <video controls playsinline preload="metadata" poster="${project.poster}" aria-label="Play ${escapeHtml(project.title)} ${escapeHtml(project.subtitle)}" data-score-video>
      <source src="${project.videoSrc}" type="video/mp4">
      Your browser does not support video playback. <a href="${project.videoSrc}">Open the video file</a>.
    </video>
    <p class="sr-only">${escapeHtml(project.posterAlt)}</p>
    <span class="composition-number meta">${String(index + 1).padStart(2, "0")} / Cinematic score</span>
  </div>
  <div class="video-score-copy">
    <p class="selected-project-role meta">${escapeHtml(project.role)}</p>
    <h3>${escapeHtml(project.title)}</h3>
    <p class="video-score-subtitle">${escapeHtml(project.subtitle)}</p>
    <div class="video-score-meta meta"><span>${escapeHtml(project.mediaLabel)}</span><span>${formatTime(project.duration, true)}</span></div>
    <p class="selected-project-description">${escapeHtml(project.description)}</p>
    <p class="video-disclosure meta">${escapeHtml(project.disclosure)}</p>
    <div class="video-score-links">
      ${project.projectUrl ? `<a class="text-link" href="${project.projectUrl}">Open full project ↗</a>` : ""}
      ${project.referenceUrl ? `<a class="text-link" href="${project.referenceUrl}" target="_blank" rel="noreferrer">${escapeHtml(project.referenceLabel)}</a>` : ""}
    </div>
  </div>
</article>`;

function renderSelected() {
  qs("[data-selected-compositions]").innerHTML = selectedProjects.map((project, index) => project.kind === "video"
    ? renderVideoProject(project, index)
    : renderAudioProject(project, index)).join("");
}

function renderScoringProjects() {
  qs("[data-scoring-projects]").innerHTML = scoringProjects.map((project, index) => `
    <article class="score-project reveal" style="--composition-accent:${project.accent}">
      <div class="score-project-image ${project.imageFit === "contain" ? "fit-contain" : ""}">
        <img src="${project.image}" alt="${escapeHtml(project.imageAlt)}" loading="lazy">
        <span class="meta">${String(index + 1).padStart(2, "0")} / Project score</span>
      </div>
      <div class="score-project-copy">
        <p class="score-role meta">${escapeHtml(project.role)}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        ${project.tools.length ? `<div class="score-tools meta">${project.tools.map(escapeHtml).join(" / ")}</div>` : ""}
        <div class="score-track-list">
          ${project.tracks.map(track => `<section class="score-track" aria-label="${escapeHtml(track.displayTitle)}">
            <div class="score-track-heading">
              <h4>${escapeHtml(track.displayTitle)}</h4>
              <span class="meta">${formatTime(track.duration, true)}</span>
            </div>
            ${audioPlayerMarkup({...track, title: track.displayTitle, className: "score-player", preload: "none"})}
          </section>`).join("")}
        </div>
        <a class="text-link" href="${project.projectUrl}">Open full project ↗</a>
      </div>
    </article>`).join("");
}

function setupMediaExclusivity() {
  const videos = [...document.querySelectorAll("[data-score-video]")];
  videos.forEach(video => video.addEventListener("play", () => {
    pauseAllAudio();
    videos.forEach(otherVideo => {
      if (otherVideo !== video && !otherVideo.paused) otherVideo.pause();
    });
  }));
  document.addEventListener("play", event => {
    if (!(event.target instanceof HTMLAudioElement)) return;
    videos.forEach(video => {
      if (!video.paused) video.pause();
    });
  }, true);
}

function renderCapabilities() {
  qs("[data-production-capabilities]").innerHTML = productionCapabilities.map(item => `
    <article class="production-card reveal">
      <span class="meta">${item.index}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
      <div class="production-tags">${item.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    </article>`).join("");
}

renderFeatured();
renderSelected();
renderScoringProjects();
renderCapabilities();
qs("[data-composition-count]").textContent = String(compositionInventory.length);
setupAudioPlayers();
setupMediaExclusivity();
setupNavigation();
setupReveals();
