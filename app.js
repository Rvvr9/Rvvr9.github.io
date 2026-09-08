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

function renderAudioProjects() {
  const container = qs("[data-audio-projects]");
  const rails = [
    {id: "music", label: "Music + Composition", index: "01"},
    {id: "sound", label: "Sound Design + Game Audio", index: "02"}
  ];
  const featured = rail => projects.flatMap(project => (project.audioSamples || [])
    .filter(sample => sample.featuredRail === rail)
    .map(sample => ({project, sample})))
    .sort((a, b) => a.sample.featuredOrder - b.sample.featuredOrder);

  const tile = ({project, sample}, index) => {
    const position = project.imagePosition || "center";
    const fitClass = project.imageFit === "contain" ? " fit-contain" : "";
    const sources = sample.variants?.length ? sample.variants : [sample];
    return `<article class="audio-tile${sample.variants?.length ? " has-variations" : ""}" style="${projectStyle(project)}">
      <div class="audio-tile-art${fitClass}" style="--image-position:${position}" aria-hidden="true"><img src="${project.image}" alt="" loading="lazy"></div>
      <div class="audio-tile-content">
        <p class="audio-tile-label meta">${project.title} / ${sample.category}</p>
        <h3>${sample.title}</h3>
        <p class="audio-tile-role meta">${project.role}</p>
        <div class="audio-tile-variations">${sources.map((source, sourceIndex) => audioControlRow(source, sample.title, "none", sample.variants ? source.label || `Variation ${String(sourceIndex + 1).padStart(2, "0")}` : "")).join("")}</div>
        <a class="audio-tile-link meta" href="?project=${project.slug}" aria-label="View ${project.title} project">View project <span aria-hidden="true">↗</span></a>
      </div>
      <span class="audio-tile-index meta" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
    </article>`;
  };

  container.innerHTML = rails.map(rail => `<section class="audio-rail-group" data-audio-rail-group aria-labelledby="audio-rail-${rail.id}">
    <div class="audio-rail-heading">
      <p class="eyebrow" id="audio-rail-${rail.id}">${rail.index} / ${rail.label}</p>
      <div class="audio-rail-nav" aria-label="Scroll ${rail.label}">
        <button type="button" data-rail-direction="-1" aria-label="Previous ${rail.label} samples">←</button>
        <button type="button" data-rail-direction="1" aria-label="Next ${rail.label} samples">→</button>
      </div>
    </div>
    <div class="audio-tile-rail" data-audio-rail tabindex="0" aria-label="${rail.label} samples">
      ${featured(rail.id).map(tile).join("")}
    </div>
  </section>`).join("");
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
  });
}

function renderDeliveryCase() {
  const project = getProject("delivery");
  qs("[data-delivery-case]").innerHTML = `
    ${media(project, "case-visual")}
    <div class="case-copy reveal" style="${projectStyle(project)}">
      <p class="eyebrow">03 / Featured audio case study</p>
      <h2 id="delivery-title">${project.title}</h2>
      <p class="case-role">${project.role}</p>
      <p class="case-description">${project.detail}</p>
      <ul class="case-contributions">${project.contributions.map(item => `<li>${item}</li>`).join("")}</ul>
      <p class="tool-line meta">${tools(project)}</p>
      <a class="action action-light" href="?project=${project.slug}">Explore case study <span aria-hidden="true">↗</span></a>
    </div>`;
}

function renderTechnicalProjects() {
  const selected = ["tell-tale-den", "mahjong-maestro"].map(getProject);
  qs("[data-technical-projects]").innerHTML = selected.map((project, index) => `
    <a class="technical-card reveal" href="?project=${project.slug}" style="${projectStyle(project)}">
      <div class="technical-top"><span class="meta">0${index + 1} / Implementation</span><span aria-hidden="true">↗</span></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
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
  return `<section class="project-audio-section" id="audio-showcase">
    <p class="eyebrow">Audio / Selected samples</p><h2>Audio showcase</h2>
    <div class="audio-sample-list">${project.audioSamples.map((sample, index) => `
      <article class="audio-player${sample.variants?.length ? " has-variations" : ""}">
        <div class="audio-sample-index meta">${String(index + 1).padStart(2, "0")} / ${sample.category || "Audio"}</div>
        <div class="audio-sample-heading">
          <div><h3>${sample.title}</h3>${sample.description ? `<p>${sample.description}</p>` : ""}</div>
          ${sample.context ? `<span class="audio-context meta">${sample.context}</span>` : ""}
        </div>
        <div class="audio-variation-list">${(sample.variants?.length ? sample.variants : [sample]).map((source, sourceIndex) => audioControlRow(source, sample.title, "metadata", sample.variants ? source.label || `Variation ${String(sourceIndex + 1).padStart(2, "0")}` : "")).join("")}</div>
      </article>`).join("")}</div>
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
    const container = player.closest(".audio-player, .audio-tile");

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
        ${project.categories.length ? `<div><span>Disciplines</span><strong>${project.categories.join(" / ")}</strong></div>` : ""}
      </aside>
      <div class="project-detail-main">
        <section class="project-overview"><p class="eyebrow">01 / Overview</p><h2>About the project</h2><p>${project.detail || project.summary}</p></section>
        ${contributions}${result}${audio}${gallery}${conceptGallery}${video}${external}
      </div>
    </div>`;
  setupAudioPlayers(view);
}

const slug = new URLSearchParams(location.search).get("project");
const activeProject = slug ? getProject(slug) : null;

if (slug && activeProject) {
  renderProjectView(activeProject);
  setupNavigation();
} else {
  if (slug) history.replaceState({}, "", location.pathname);
  renderAudioProjects();
  renderDeliveryCase();
  renderTechnicalProjects();
  renderLeadershipProjects();
  renderArchive();
  setupFilters();
  setupNavigation();
  setupReveals();
}
