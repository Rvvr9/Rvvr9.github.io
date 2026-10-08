import { getProject } from "../projects.js";

const rootAsset = path => new URL(`../${path}`, import.meta.url).href;
const projectPage = slug => new URL(`../?project=${slug}`, import.meta.url).href;

const durations = {
  "spoilage|Left Hand": 67.825488,
  "delivery|Scene 2–8 Mastered": 66.060771,
  "project-eve|Eve": 35.503311,
  "project-eve|As Night Rises": 76.416871,
  "project-eve|Broken Pipes": 43.467755,
  "atira|Main Menu": 97.872109,
  "atira|Gameplay": 46.393469,
  "disease-brings-death|Poor City - Church": 84.172336,
  "tell-tale-den|Catch the Lie": 89.512925,
  "tell-tale-den|Tell-Tale Den": 99.056327,
  "tell-tale-den|Main Menu": 77.206349,
  "sleeping-on-the-job|Break Room": 96.060952,
  "sleeping-on-the-job|Jazz Bar": 95.480454,
  "sleeping-on-the-job|Main Menu": 95.480454,
  "sleeping-on-the-job|Minigame": 104.396916,
  "sleeping-on-the-job|Sleepwalking": 204.056961,
  "mariposa|Drowning Tide": 135.209796,
  "anomie|Face Behind the Mask": 36.850068,
  "anomie|Bunny Boss": 76.115011,
  "tail-of-two|Tail of Two": 189.68381,
  "harmonious-home-designer|Way of Feng Shui - Main Menu": 105.209615,
  "harmonious-home-designer|Way of Feng Shui - Open Curtains": 178.050612,
  "dungeon-chef|Tavern": 101.122902,
  "dungeon-chef|Village": 47.624127
};

const confirmedSoleComposer = new Set([
  "mariposa|Drowning Tide",
  "project-eve|Eve",
  "project-eve|As Night Rises",
  "project-eve|Broken Pipes",
  "tell-tale-den|Catch the Lie",
  "tell-tale-den|Tell-Tale Den",
  "tell-tale-den|Main Menu",
  "sleeping-on-the-job|Break Room",
  "sleeping-on-the-job|Jazz Bar",
  "sleeping-on-the-job|Main Menu",
  "sleeping-on-the-job|Minigame",
  "sleeping-on-the-job|Sleepwalking",
  "spoilage|Left Hand",
  "harmonious-home-designer|Way of Feng Shui - Main Menu",
  "harmonious-home-designer|Way of Feng Shui - Open Curtains",
  "dungeon-chef|Tavern",
  "dungeon-chef|Village"
]);

const documentedCredits = {
  "tail-of-two|Tail of Two": "Audio Lead",
  "delivery|Scene 2–8 Mastered": "Audio Lead / Composition",
  "anomie|Face Behind the Mask": "Composer",
  "anomie|Bunny Boss": "Composer",
  "atira|Main Menu": "Music and sound credit",
  "atira|Gameplay": "Music and sound credit",
  "disease-brings-death|Poor City - Church": "Studio Lead / Technical Audio"
};

function makeTrack(projectSlug, title, overrides = {}) {
  const project = getProject(projectSlug);
  if (!project) throw new Error(`Unknown project: ${projectSlug}`);
  const sample = project.audioSamples?.find(item => item.title === title);
  if (!sample) throw new Error(`Unknown composition: ${project.title} — ${title}`);
  const key = `${projectSlug}|${title}`;
  return {
    title,
    displayTitle: overrides.displayTitle || title,
    project: overrides.project || project.title,
    projectSlug,
    provenanceProject: project.title,
    sourceTitle: title,
    projectUrl: overrides.projectUrl || projectPage(projectSlug),
    src: rootAsset(sample.src),
    duration: durations[key] || sample.duration || 0,
    credit: overrides.credit || (confirmedSoleComposer.has(key) ? "Sole composer — River Hsu" : documentedCredits[key] || project.role),
    description: overrides.description || sample.description || "",
    context: overrides.context ?? sample.context ?? "",
    image: rootAsset(overrides.image || project.image),
    imageAlt: overrides.imageAlt || project.imageAlt,
    imageFit: overrides.imageFit || project.imageFit || "cover",
    accent: overrides.accent || project.accent || "#c95625"
  };
}

export const featuredComposition = makeTrack("anomie", "Face Behind the Mask", {
  displayTitle: "Grave Of Gods",
  project: "Grave of Gods",
  projectUrl: projectPage("grave-of-gods"),
  credit: "Composer — River Hsu",
  description: "Main Menu Track",
  context: "",
  image: "resources/project-media/grave-of-gods-music-hero.webp",
  imageAlt: "An armored warrior overlooking a gothic citadel and vast army beneath a fiery sunset in Grave of Gods",
  accent: "#c95625"
});

export const selectedCompositions = [
  makeTrack("project-eve", "As Night Rises", {
    description: "A featured composition from River’s three-track Project Eve collection."
  }),
  makeTrack("tail-of-two", "Tail of Two", {
    description: "The project score for a 2D puzzle-platformer following a spirit cat."
  }),
  makeTrack("tell-tale-den", "Tell-Tale Den", {
    description: "The main project theme for a supernatural poker game set in a ghost city."
  }),
  makeTrack("delivery", "Scene 2–8 Mastered", {
    displayTitle: "Scene 2–8",
    description: "A scene score from Delivery, created within River’s audio-lead role on a professional team project."
  }),
  makeTrack("mariposa", "Drowning Tide", {
    description: "A tense level cue for Mariposa, a 2D puzzle-platformer moving between a solarpunk past and an apocalyptic future.",
    context: "Ableton Live 12 · Game score"
  }),
  makeTrack("atira", "Main Menu", {
    description: "Main-menu music for an early-development third-person action game."
  })
];

const projectDescriptions = {
  "project-eve": "Three standalone game-music pieces presented as a compact composition study.",
  "tell-tale-den": "Themes and gameplay music for a supernatural poker game set in a gambling den within a ghost city.",
  "sleeping-on-the-job": "Five compositions for a puzzle game that shifts between exploration and a sleep mode used to investigate evidence.",
  "atira": "Music for a third-person action demo whose current Unity build also uses FMOD-backed music-state routing.",
  "disease-brings-death": "Music within a Unity vertical slice supported by an FMOD-backed audio manager and gameplay event hooks.",
  "anomie": "Horror-focused music supporting tension, atmosphere, and combat.",
  "spoilage": "A composition from a collaborative audio-production project with leadership, pipeline, and implementation responsibilities.",
  "harmonious-home-designer": "Two compositions for an in-development Unity game.",
  "dungeon-chef": "Tavern and village compositions from the project’s existing music collection."
};

function makeProject(projectSlug, trackTitles) {
  const project = getProject(projectSlug);
  const tracks = trackTitles.map(title => makeTrack(projectSlug, title));
  return {
    slug: projectSlug,
    title: project.title,
    role: tracks.every(track => track.credit.startsWith("Sole composer")) ? "Sole Composer" : project.role,
    description: projectDescriptions[projectSlug] || project.summary,
    image: rootAsset(project.image),
    imageAlt: project.imageAlt,
    imageFit: project.imageFit || "cover",
    accent: project.accent || "#c95625",
    tools: project.tools,
    projectUrl: projectPage(projectSlug),
    tracks
  };
}

export const scoringProjects = [
  makeProject("project-eve", ["Eve", "Broken Pipes"]),
  makeProject("tell-tale-den", ["Catch the Lie", "Main Menu"]),
  makeProject("sleeping-on-the-job", ["Break Room", "Jazz Bar", "Main Menu", "Minigame", "Sleepwalking"]),
  makeProject("atira", ["Gameplay"]),
  makeProject("disease-brings-death", ["Poor City - Church"]),
  makeProject("anomie", ["Bunny Boss"]),
  makeProject("spoilage", ["Left Hand"]),
  makeProject("harmonious-home-designer", ["Way of Feng Shui - Main Menu", "Way of Feng Shui - Open Curtains"]),
  makeProject("dungeon-chef", ["Tavern", "Village"])
];

export const productionCapabilities = [
  {
    index: "01",
    title: "Composition",
    body: "Seventeen compositions are explicitly confirmed as sole-composer work, with additional documented music credits across game projects.",
    tags: ["Ableton Live 12", "Game music", "Editing", "Mixing"]
  },
  {
    index: "02",
    title: "Interactive Music",
    body: "Music and audio are connected to gameplay through documented FMOD event integration, state-based routing, and Unity systems.",
    tags: ["FMOD", "Unity", "Adaptive states", "Event routing"]
  },
  {
    index: "03",
    title: "Engine Integration",
    body: "Project experience spans FMOD and Wwise workflows in Unity and Unreal Engine, supporting both creative and technical audio work.",
    tags: ["Wwise", "Unreal Engine", "C#", "Technical audio"]
  },
  {
    index: "04",
    title: "Collaboration",
    body: "Audio-lead and cross-disciplinary project work includes iteration with designers, programmers, artists, and production leads.",
    tags: ["Audio direction", "Iteration", "Team production"]
  }
];

export const compositionInventory = [featuredComposition, ...selectedCompositions, ...scoringProjects.flatMap(project => project.tracks)];
