import { audioPlayerMarkup, formatTime, setupAudioPlayers } from "../shared/audio-player.js";
import { setupNavigation, setupReveals } from "../shared/site-ui.js";
import {
  compositionInventory,
  featuredComposition,
  productionCapabilities,
  scoringProjects,
  selectedCompositions
} from "./music-data.js";

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

function renderSelected() {
  qs("[data-selected-compositions]").innerHTML = selectedCompositions.map((track, index) => `
    <article class="composition-card reveal" style="--composition-accent:${track.accent}">
      <div class="composition-card-art">
        ${artwork(track)}
        <span class="composition-number meta">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="composition-card-copy">
        ${trackMeta(track)}
        <h3>${escapeHtml(track.displayTitle)}</h3>
        <p class="composition-credit meta">${escapeHtml(track.credit)}</p>
        <p>${escapeHtml(track.description)}</p>
        ${audioPlayerMarkup({...track, className: "composition-player"})}
      </div>
    </article>`).join("");
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
              <div><h4>${escapeHtml(track.displayTitle)}</h4><p class="meta">${escapeHtml(track.credit)}</p></div>
              <span class="meta">${formatTime(track.duration, true)}</span>
            </div>
            ${audioPlayerMarkup({...track, className: "score-player", preload: "none"})}
          </section>`).join("")}
        </div>
        <a class="text-link" href="${project.projectUrl}">Open full project ↗</a>
      </div>
    </article>`).join("");
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
setupNavigation();
setupReveals();
