import { getProject } from "../projects.js?v=20261008-1";

const rootAsset = path => new URL(`../${path}`, import.meta.url).href;
const projectPage = slug => new URL(`../?project=${slug}`, import.meta.url).href;

const durations = {
  "spoilage|Left Hand": 67.825488,
  "delivery|Scene 2–8 Mastered": 66.060771,
  "project-eve|Until Sunrise": 103.255828,
  "project-eve|Bud Town": 85,
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
  "project-eve|Until Sunrise": "Composer",
  "project-eve|Bud Town": "Composer",
  "tail-of-two|Tail of Two": "Audio Lead / Composer",
  "delivery|Scene 2–8 Mastered": "Audio Lead / Composer",
  "anomie|Face Behind the Mask": "Composer",
  "anomie|Bunny Boss": "Composer",
  "atira|Main Menu": "Music and sound credit",
  "atira|Gameplay": "Music and sound credit",
  "disease-brings-death|Poor City - Church": "Studio Lead / Technical Audio"
};

const projectRoles = {
  "project-eve": "Composer / Audio Designer",
  "delivery": "Audio Lead / Composer",
  "tell-tale-den": "Composer / Technical Audio Designer",
  "atira": "Composer / Sound Designer",
  "sleeping-on-the-job": "Composer",
  "mariposa": "Audio Lead / Composer",
  "tail-of-two": "Audio Lead / Composer",
  "disease-brings-death": "Studio Lead / Technical Audio",
  "anomie": "Composer / Sound Designer",
  "spoilage": "Audio Lead / Composer",
  "harmonious-home-designer": "Composer",
  "dungeon-chef": "Composer"
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

const projectDescriptions = {
  "project-eve": "Additional compositions from River’s Project Eve music collection.",
  "tell-tale-den": "The project theme for a supernatural poker game set in a gambling den within a ghost city.",
  "sleeping-on-the-job": "Additional music from a five-track score for a puzzle game that shifts between exploration and a sleep mode.",
  "mariposa": "A level cue for a puzzle-platformer moving between a solarpunk past and an apocalyptic future.",
  "tail-of-two": "The project score for a 2D puzzle-platformer following a spirit cat.",
  "disease-brings-death": "Music within a Unity vertical slice supported by an FMOD-backed audio manager and gameplay event hooks.",
  "anomie": "Horror-focused music supporting tension, atmosphere, and combat.",
  "spoilage": "A composition from a collaborative audio-production project with leadership, pipeline, and implementation responsibilities.",
  "harmonious-home-designer": "Two compositions for an in-development Unity game.",
  "dungeon-chef": "Tavern and village compositions from the project’s existing music collection."
};

function makeProject(projectSlug, trackSpecs, overrides = {}) {
  const project = getProject(projectSlug);
  if (!project) throw new Error(`Unknown project: ${projectSlug}`);
  const tracks = trackSpecs.map(spec => typeof spec === "string"
    ? makeTrack(projectSlug, spec)
    : makeTrack(projectSlug, spec.title, spec.overrides));
  return {
    kind: "audio",
    slug: projectSlug,
    title: overrides.title || project.title,
    role: overrides.role || projectRoles[projectSlug] || "Composer",
    description: overrides.description || projectDescriptions[projectSlug] || project.summary,
    image: rootAsset(overrides.image || project.image),
    imageAlt: overrides.imageAlt || project.imageAlt,
    imageFit: overrides.imageFit || project.imageFit || "cover",
    accent: overrides.accent || project.accent || "#c95625",
    tools: overrides.tools || project.tools || [],
    projectUrl: overrides.projectUrl || projectPage(projectSlug),
    tracks
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

const mariposa = getProject("mariposa");

export const selectedProjects = [
  {
    kind: "video",
    slug: "elden-ring-shadow-of-the-erdtree-rescore",
    title: "Elden Ring",
    subtitle: "Shadow of the Erdtree — Trailer Rescore",
    role: "Composer / Unofficial Rescore",
    description: "A personal cinematic scoring and sound-redesign exercise created against the Shadow of the Erdtree story trailer.",
    disclosure: "Unofficial personal work. ELDEN RING and Shadow of the Erdtree are properties of FromSoftware and Bandai Namco Entertainment; this rescore is not affiliated with, endorsed by, or commissioned by the rights holders.",
    videoSrc: rootAsset("resources/video/elden-ring-shadow-of-the-erdtree-unofficial-rescore.mp4"),
    poster: rootAsset("resources/project-media/elden-ring-rescore-poster.webp"),
    posterAlt: "A cinematic frame from the ELDEN RING Shadow of the Erdtree trailer rescore",
    duration: 62.020499,
    mediaLabel: "Finished local rescore",
    referenceUrl: "https://www.youtube.com/watch?v=UY8rXCdv5lA",
    referenceLabel: "Original trailer reference ↗",
    accent: "#b45b38"
  },
  {
    kind: "video",
    slug: "mariposa-trailer-score",
    title: "Mariposa",
    subtitle: "Trailer Score",
    role: "Audio Lead / Composer",
    description: "River’s original trailer score for Mariposa, shaped around the game’s movement between a solarpunk past and an apocalyptic future.",
    disclosure: "Original trailer score and production by River Hsu.",
    videoSrc: rootAsset(mariposa.musicVideo.src),
    poster: rootAsset("resources/project-media/mariposa-trailer-score-poster.webp"),
    posterAlt: "Mariposa characters and solar-powered technology in the game trailer",
    duration: mariposa.musicVideo.duration,
    mediaLabel: "Original trailer score",
    projectUrl: projectPage("mariposa"),
    accent: mariposa.accent || "#4f9189"
  },
  makeProject("project-eve", ["Until Sunrise", "Bud Town", "Broken Pipes"], {
    description: "Three contrasting compositions from River’s Project Eve music collection."
  }),
  makeProject("delivery", [{
    title: "Scene 2–8 Mastered",
    overrides: {displayTitle: "Cinematic Trailer Score"}
  }], {
    description: "A cinematic score created within River’s audio-lead role on the professional team project Delivery."
  }),
  makeProject("tell-tale-den", ["Catch the Lie", "Main Menu"], {
    description: "Two compositions for a supernatural poker game set in a gambling den within a ghost city."
  }),
  makeProject("atira", ["Main Menu", {
    title: "Gameplay",
    overrides: {displayTitle: "Rush"}
  }], {
    description: "Main-menu and gameplay compositions for a third-person action demo with FMOD-backed music-state routing."
  }),
  makeProject("sleeping-on-the-job", ["Jazz Bar", "Main Menu"], {
    description: "Two selections from River’s five-track score for a puzzle game built around exploration and sleep-state investigation."
  })
];

export const scoringProjects = [
  makeProject("project-eve", ["Eve", "As Night Rises"]),
  makeProject("tell-tale-den", ["Tell-Tale Den"]),
  makeProject("sleeping-on-the-job", ["Break Room", "Minigame", "Sleepwalking"]),
  makeProject("tail-of-two", ["Tail of Two"]),
  makeProject("mariposa", ["Drowning Tide"]),
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

export const videoInventory = selectedProjects.filter(project => project.kind === "video");
const selectedTracks = selectedProjects.flatMap(project => project.tracks || []);
export const compositionInventory = [featuredComposition, ...selectedTracks, ...scoringProjects.flatMap(project => project.tracks)];
