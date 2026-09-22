import { projects, getProject } from "./projects.js";

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const tools = project => project.tools.join(" / ");
const projectStyle = project => `--project-accent:${project.accent || "#c95625"}`;

function media(project, className = "", useHero = false) {
  const image = useHero && project.heroImage ? project.heroImage : project.image;
  const imageAlt = useHero && project.heroAlt ? project.heroAlt : project.imageAlt;
  const fitClass = project.imageFit === "contain" ? "fit-contain" : "";
  const position = useHero && project.heroPosition ? project.heroPosition : (project.imagePosition || "center");
  const mobilePosition = useHero && project.heroPositionMobile ? project.heroPositionMobile : (project.imagePositionMobile || position);
  const fitBackground = project.fitBackground ? `;--fit-background:${project.fitBackground}` : "";
  if (image) {
    return `<div class="project-media ${fitClass} ${className}" style="--image-position:${position};--image-position-mobile:${mobilePosition}${fitBackground}"><img src="${image}" alt="${imageAlt}" loading="${useHero ? "eager" : "lazy"}"${useHero ? ' fetchpriority="high"' : ""}></div>`;
  }
  return `<div class="project-media project-media-generated media-${project.mediaStyle || "grid"} ${className}" aria-hidden="true"><span>${project.title}</span><i></i></div>`;
}

function audioControlRow(source, title, preload = "metadata", label = "") {
  const playbackTitle = label ? `${title} — ${label}` : title;
  const labelMarkup = label ? `<span class="audio-variation-label meta">${label}</span>` : "";
  return `<div class="audio-control-row${label ? " has-label" : ""}" data-audio-player data-audio-title="${playbackTitle}">
    ${labelMarkup}
    <audio src="${source.src}" preload="${preload}"></audio>
    <div class="audio-controls">
      <button class="audio-toggle" type="button" aria-label="Play ${playbackTitle}"><span aria-hidden="true">▶</span><span>Play</span></button>
      <input class="audio-progress" type="range" min="0" max="${source.duration || 1}" value="0" step="1" aria-label="Seek ${playbackTitle}" disabled>
      <output class="audio-time" aria-label="Playback time"><span data-current-time>0:00</span> / <span data-duration>${formatTime(source.duration, true)}</span></output>
    </div>
  </div>`;
}

const audioKind = sample => /music|composition/i.test(sample.category || "") ? "music" : "sound";
const sourceCount = sample => sample.variants?.length || (sample.src ? 1 : 0);
const projectAudioCounts = project => (project.audioSamples || []).reduce((counts, sample) => {
  counts[audioKind(sample)] += sourceCount(sample);
  return counts;
}, {music: 0, sound: 0});
const audioInventory = project => {
  const counts = projectAudioCounts(project);
  return [counts.music ? `${counts.music} MUSIC` : "", counts.sound ? `${counts.sound} SFX` : ""].filter(Boolean).join(" · ");
};

const homepageAudioCuration = {
  "tell-tale-den": {
    music: ["Tell-Tale Den", "Main Menu", "Catch the Lie"],
    sound: ["Card Shuffle", "Poker Chip Move", "All-In", "Card Deal", "Card Flip / Toss"]
  },
  "sleeping-on-the-job": {
    music: ["Main Menu", "Sleepwalking", "Jazz Bar"],
    sound: ["Window Break", "Door Kick Open", "Motel Ambience", "UI Click", "Player Walking"]
  },
  "anomie": {
    music: ["Face Behind the Mask", "Bunny Boss"],
    sound: ["Monster Roar", "Player Death", "Spider Scuttling", "Bunny Attack"]
  },
  "atira": {
    music: ["Main Menu", "Gameplay"],
    sound: ["Revolver Reload", "Shield Block"]
  },
  "disease-brings-death": {
    music: ["Poor City - Church"],
    sound: ["Underground Cavern - Ambiance Intro", "New Zone Stinger"]
  },
  "mahjong-maestro": {
    sound: ["Tile Placement", "Game Over", "Answer Correct"]
  },
  "project-eve": {
    music: ["As Night Rises", "Eve", "Broken Pipes"]
  },
  "mariposa": {
    music: ["Drowning Tide"]
  },
  "delivery": {
    music: ["Scene 2–8 Mastered"]
  },
  "dungeon-chef": {
    music: ["Tavern", "Village"]
  }
};

function audioBankCard(sample, index, preload = "metadata") {
  const sources = sample.variants?.length ? sample.variants : [sample];
  const variationMeta = sample.variants?.length ? `${sample.variants.length} variations` : sample.category;
  return `<article class="audio-bank-card${sample.variants?.length ? " has-variations" : ""}">
    <div class="audio-bank-card-top meta"><span>${String(index + 1).padStart(2, "0")}</span><span>${variationMeta}</span></div>
    <h4>${sample.title}</h4>
    ${sample.description ? `<p>${sample.description}</p>` : ""}
    <div class="audio-bank-card-controls">${sources.map((source, sourceIndex) => audioControlRow(source, sample.title, preload, sample.variants ? source.label || `Variation ${String(sourceIndex + 1).padStart(2, "0")}` : "")).join("")}</div>
  </article>`;
}

function audioBank(project, kind, samples, idPrefix, preload = "metadata") {
  if (!samples.length) return "";
  const label = kind === "music" ? "Music" : "Sound Design";
  const count = samples.reduce((total, sample) => total + sourceCount(sample), 0);
  const unit = kind === "music" ? (count === 1 ? "track" : "tracks") : (count === 1 ? "sound" : "sounds");
  const railId = `${idPrefix}-${kind}`;
  return `<section class="project-audio-bank audio-bank-${kind}" data-audio-rail-group aria-labelledby="${railId}">
    <div class="audio-bank-heading">
      <div><p class="eyebrow" id="${railId}">${label}</p><span class="audio-bank-count meta">${count} ${unit}</span></div>
      <div class="audio-rail-nav" aria-label="Scroll ${project.title} ${label}">
        <button type="button" data-rail-direction="-1" aria-label="Previous ${project.title} ${label} samples">←</button>
        <button type="button" data-rail-direction="1" aria-label="Next ${project.title} ${label} samples">→</button>
      </div>
    </div>
    <div class="audio-bank-rail" data-audio-rail tabindex="0" aria-label="${project.title} ${label} samples">
      ${samples.map((sample, index) => audioBankCard(sample, index, preload)).join("")}
    </div>
  </section>`;
}

function curatedSamples(project, kind) {
  const titles = homepageAudioCuration[project.slug]?.[kind] || [];
  return titles.map(title => project.audioSamples.find(sample => sample.title === title)).filter(Boolean);
}

function renderSelectedProjects() {
  const container = qs("[data-selected-projects]");
  const selected = ["tell-tale-den", "atira", "disease-brings-death", "mahjong-maestro", "anomie", "sleeping-on-the-job"].map(getProject);
  container.innerHTML = selected.map(project => {
    const music = curatedSamples(project, "music");
    const sound = curatedSamples(project, "sound");
    return `<article class="selected-project" style="${projectStyle(project)}">
      <div class="selected-project-intro reveal">
        <div class="selected-project-copy">
          <p class="eyebrow">${project.id} / Selected project</p>
          <p class="selected-project-inventory meta">${audioInventory(project)}</p>
          <h3>${project.title}</h3>
          <p class="selected-project-role meta">${project.role}</p>
          ${project.audioFocus ? `<p class="selected-project-focus meta">${project.audioFocus}</p>` : ""}
          <p>${project.summary}</p>
          <a class="text-link" href="?project=${project.slug}">View full project and audio library ↗</a>
        </div>
        ${media(project, "selected-project-media")}
      </div>
      <div class="selected-project-banks">
        ${audioBank(project, "music", music, `home-${project.slug}`, "none")}
        ${audioBank(project, "sound", sound, `home-${project.slug}`, "none")}
      </div>
    </article>`;
  }).join("");
  setupAudioPlayers(container);
  setupAudioRails(container);
}

function setupAudioRails(scope = document) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  qsa("[data-audio-rail-group]", scope).forEach(group => {
    const rail = qs("[data-audio-rail]", group);
    qsa("[data-rail-direction]", group).forEach(button => button.addEventListener("click", () => {
      rail.scrollBy({left: Number(button.dataset.railDirection) * rail.clientWidth * .82, behavior: reducedMotion ? "auto" : "smooth"});
    }));
    rail.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const behavior = reducedMotion ? "auto" : "smooth";
      if (event.key === "Home") rail.scrollTo({left: 0, behavior});
      else if (event.key === "End") rail.scrollTo({left: rail.scrollWidth, behavior});
      else rail.scrollBy({left: (event.key === "ArrowLeft" ? -1 : 1) * rail.clientWidth * .82, behavior});
    });
  });
}

function renderTechnicalProjects() {
  const selected = ["atira", "disease-brings-death", "tell-tale-den", "mahjong-maestro", "anomie", "delivery"].map(getProject);
  qs("[data-technical-projects]").innerHTML = selected.map((project, index) => `
    <a class="technical-card reveal" href="?project=${project.slug}" style="${projectStyle(project)}">
      <div class="technical-top"><span class="meta">0${index + 1} / Implementation</span><span aria-hidden="true">↗</span></div>
      <h3>${project.title}</h3>
      <p>${project.audioFocus || project.summary}</p>
      ${project.implementationEvidence?.length ? `<ul class="technical-evidence">${project.implementationEvidence.slice(0, 2).map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
      <div class="technical-tags">${project.tools.map(tool => `<span>${tool}</span>`).join("")}</div>
      ${project.result ? `<strong class="result-tag">${project.result}</strong>` : ""}
    </a>`).join("");
}

function renderLeadershipProjects() {
  const selected = ["delivery", "mariposa", "spoilage", "disease-brings-death"].map(getProject);
  qs("[data-leadership-projects]").innerHTML = selected.map(project => `
    <a class="leadership-row reveal" href="?project=${project.slug}" style="${projectStyle(project)}">
      <span class="meta">${project.id}</span>
      <h3>${project.title}</h3>
      <p>${project.role}</p>
      <span class="row-tools">${tools(project)}</span>
      <span class="row-arrow" aria-hidden="true">↗</span>
    </a>`).join("");
}

function renderArchive() {
  qs("[data-project-archive]").innerHTML = projects.map(project => `
    <article class="archive-card reveal" data-categories="${project.categories.join(" ")}" style="${projectStyle(project)}">
      <a href="?project=${project.slug}" aria-label="View ${project.title}">
        ${media(project, "archive-media")}
        <div class="archive-card-top"><span class="meta">${project.id}</span><span aria-hidden="true">↗</span></div>
        <h3>${project.title}</h3>
        <p>${project.role}</p>
        ${project.audioSamples?.length ? `<span class="archive-audio-meta meta">${audioInventory(project)}</span>` : ""}
        <small>${tools(project) || project.result || "Details available on request"}</small>
      </a>
    </article>`).join("");
}

function setupFilters() {
  const buttons = qsa("[data-filter]");
  const cards = qsa("[data-categories]");
  const status = qs("[data-filter-status]");
  buttons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const show = filter === "all" || card.dataset.categories.split(" ").includes(filter);
      card.hidden = !show;
      if (show) visible += 1;
    });
    status.textContent = `${visible} projects shown for ${filter}.`;
  }));
}

function setupNavigation() {
  const toggle = qs(".menu-toggle");
  const nav = qs(".site-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  qsa("a", nav).forEach(link => link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));
  const header = qs("[data-header]");
  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 24), {passive: true});
}

function setupReveals() {
  const elements = qsa(".reveal");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), {rootMargin: "0px 0px -8%", threshold: 0.08});
  elements.forEach(item => observer.observe(item));
}

const formatTime = (seconds, showSubsecondDuration = false) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const wholeSeconds = showSubsecondDuration && seconds > 0 && seconds < 1 ? 1 : Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  return `${minutes}:${String(wholeSeconds % 60).padStart(2, "0")}`;
};

function renderAudioSection(project) {
  if (!project.audioSamples?.length) return "";
  const music = project.audioSamples.filter(sample => audioKind(sample) === "music");
  const sound = project.audioSamples.filter(sample => audioKind(sample) === "sound");
  return `<section class="project-audio-section" id="audio-showcase">
    <p class="eyebrow">Audio / Full library</p><h2>Project audio</h2>
    <p class="project-audio-inventory meta">${audioInventory(project)}</p>
    <div class="project-audio-banks">
      ${audioBank(project, "music", music, `project-${project.slug}`)}
      ${audioBank(project, "sound", sound, `project-${project.slug}`)}
    </div>
  </section>`;
}

function setupAudioPlayers(scope = document) {
  const players = qsa("[data-audio-player]", scope);
  players.forEach(player => {
    const audio = qs("audio", player);
    const toggle = qs(".audio-toggle", player);
    const toggleIcon = qs("span:first-child", toggle);
    const toggleLabel = qs("span:last-child", toggle);
    const progress = qs(".audio-progress", player);
    const current = qs("[data-current-time]", player);
    const duration = qs("[data-duration]", player);
    const title = player.dataset.audioTitle || qs("h3", player)?.textContent || "audio";
    const container = player.closest(".audio-bank-card");

    const syncDuration = () => {
      if (!Number.isFinite(audio.duration)) return;
      progress.max = String(audio.duration);
      progress.disabled = false;
      duration.textContent = formatTime(audio.duration, true);
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

    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("play", () => {
      players.forEach(otherPlayer => {
        const otherAudio = qs("audio", otherPlayer);
        if (otherAudio !== audio && !otherAudio.paused) otherAudio.pause();
      });
      syncToggle(true);
    });
    audio.addEventListener("pause", () => syncToggle(false));
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      syncTime();
    });
    const togglePlayback = () => {
      if (audio.paused) audio.play().catch(() => syncToggle(false));
      else audio.pause();
    };
    toggle.addEventListener("click", togglePlayback);
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

function renderProjectView(project) {
  const home = qs('[data-view="home"]');
  const view = qs('[data-view="project"]');
  const footer = qs(".site-footer");
  home.hidden = true;
  view.hidden = false;
  footer.classList.add("project-footer");
  qs("[data-header]").classList.add("is-scrolled");
  qsa('.site-nav a[href^="#"]').forEach(link => link.href = `./${link.getAttribute("href")}`);
  view.style.setProperty("--project-accent", project.accent || "#c95625");
  document.title = `${project.title} — River Hsu`;
  const contributions = project.contributions?.length ? `
    <section class="project-detail-section">
      <p class="eyebrow">02 / Contributions</p><h2>My Role</h2>
      <ol class="contribution-list">${project.contributions.map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`).join("")}</ol>
    </section>` : "";
  const result = project.result ? `<section class="project-result"><p class="eyebrow">03 / Result</p><p>${project.result}</p></section>` : "";
  const implementation = project.implementationEvidence?.length ? `<section class="project-detail-section project-implementation">
    <p class="eyebrow">03 / Implementation</p><h2>Interactive audio</h2>
    <ul class="implementation-list">${project.implementationEvidence.map(item => `<li>${item}</li>`).join("")}</ul>
  </section>` : "";
  const gallery = project.gallery?.length ? `<section class="project-media-section">
    <p class="eyebrow">04 / Media</p><h2>Project imagery</h2>
    <div class="project-gallery">${project.gallery.map(item => `<figure class="gallery-${item.fit || "cover"}"><img src="${item.src}" alt="${item.alt}" loading="lazy">${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}</figure>`).join("")}</div>
  </section>` : "";
  const conceptGallery = project.conceptGallery?.length ? `<section class="project-media-section">
    <p class="eyebrow">05 / Concept</p><h2>Concept / World Vision</h2>
    <div class="project-gallery">${project.conceptGallery.map(item => `<figure class="gallery-${item.fit || "cover"}"><img src="${item.src}" alt="${item.alt}" loading="lazy">${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}</figure>`).join("")}</div>
  </section>` : "";
  const video = project.video ? `<section class="project-media-section">
    <p class="eyebrow">05 / Video</p><h2>${project.video.title}</h2>
    <div class="project-video"><iframe src="${project.video.embed}" title="${project.video.title}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    <a class="text-link project-video-link" href="${project.video.external}" target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
  </section>` : "";
  const external = project.links?.length ? `<div class="project-links">${project.links.map(link => `<a class="action action-light" href="${link.url}" target="_blank" rel="noreferrer">Open ${link.label} <span aria-hidden="true">↗</span></a>`).join("")}</div>` : "";
  const audio = renderAudioSection(project);
  view.innerHTML = `
    <header class="project-hero">
      ${media(project, "project-hero-media", true)}
      <div class="project-hero-shade"></div>
      <a class="project-back meta" href="./">← Back to index</a>
      <div class="project-hero-copy">
        <p class="eyebrow">${project.id} / Project archive</p>
        <h1>${project.title}</h1>
        <p>${project.summary}</p>
      </div>
    </header>
    <div class="project-detail-wrap">
      <aside class="project-facts">
        <div><span>Role</span><strong>${project.role}</strong></div>
        ${project.tools.length ? `<div><span>Engine / Tools</span><strong>${tools(project)}</strong></div>` : ""}
        ${project.status ? `<div><span>Status</span><strong>${project.status}</strong></div>` : ""}
        ${project.heroType ? `<div><span>Hero media</span><strong>${project.heroType}</strong></div>` : ""}
        ${project.audioSamples?.length ? `<div><span>Audio library</span><strong>${audioInventory(project)}</strong></div>` : ""}
        ${project.categories.length ? `<div><span>Disciplines</span><strong>${project.categories.join(" / ")}</strong></div>` : ""}
      </aside>
      <div class="project-detail-main">
        <section class="project-overview"><p class="eyebrow">01 / Overview</p><h2>About the project</h2><p>${project.detail || project.summary}</p></section>
        ${contributions}${implementation}${result}${audio}${gallery}${conceptGallery}${video}${external}
      </div>
    </div>`;
  setupAudioPlayers(view);
  setupAudioRails(view);
}

const slug = new URLSearchParams(location.search).get("project");
const activeProject = slug ? getProject(slug) : null;

if (slug && activeProject) {
  renderProjectView(activeProject);
  setupNavigation();
} else {
  if (slug) history.replaceState({}, "", location.pathname);
  renderSelectedProjects();
  renderTechnicalProjects();
  renderLeadershipProjects();
  renderArchive();
  setupFilters();
  setupNavigation();
  setupReveals();
}
