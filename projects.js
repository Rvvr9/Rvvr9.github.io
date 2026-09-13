export const projects = [
  {
    id: "01", slug: "grave-of-gods", title: "Grave of Gods", role: "Solo Developer",
    tools: ["Unreal Engine 5.8"], categories: ["development", "design"], flagship: true, accent: "#b48a55",
    summary: "An ambitious solo-development project focused on atmospheric world design, gameplay, and scale.",
    detail: "Grave of Gods is River’s broadest game-development showcase: a solo project bringing world building, visual direction, gameplay, and technical development into one production.",
    contributions: ["Solo game development", "World and gameplay development", "Technical systems"],
    status: "In development",
    image: "resources/project-media/grave-of-gods-cover.png", imageAlt: "An armored warrior overlooks a gothic citadel and vast army at sunset in Grave of Gods",
    heroImage: "resources/project-media/grave-of-gods-cover.png", heroAlt: "An armored warrior overlooks a gothic citadel and vast army beneath a fiery sunset in Grave of Gods",
    imagePosition: "center", imagePositionMobile: "50% 50%", heroPosition: "center", heroPositionMobile: "50% 50%", heroType: "Unreal Engine development capture",
    gallery: [
      {src: "resources/project-media/grave-of-gods-world-overview.webp", alt: "Wide in-engine development overview of the interconnected gothic city in Grave of Gods", caption: "World scale / in-engine development overview"},
      {src: "resources/project-media/grave-of-gods-monument.webp", alt: "In-engine development view of a central gothic monument in Grave of Gods", caption: "Environment focal point / in-engine development capture"}
    ],
    conceptGallery: [
      {src: "resources/project-media/grave-of-gods-hero.webp", alt: "Generated concept artwork showing an armored figure overlooking a burning fortress city", caption: "Generated concept artwork / world-vision reference — not gameplay or in-engine media"}
    ]
  },
  {
    id: "02", slug: "spoilage", title: "Spoilage", role: "Audio Lead",
    tools: ["Unity", "C#", "FMOD", "Taiga", "Ableton"], categories: ["audio", "leadership"], accent: "#9c664b",
    summary: "Collaborative audio production with leadership, pipeline, and implementation responsibilities.",
    contributions: ["Audio leadership", "Audio pipeline", "Collaborative production"],
    image: "resources/project-media/spoilage-hero.webp", imageAlt: "Dark lounge environment artwork from Spoilage",
    heroImage: "resources/project-media/spoilage-hero.webp", heroAlt: "A dark lounge interior with red seating and suspended lights in Spoilage",
    heroType: "Environment artwork", heroPosition: "center",
    gallery: [
      {src: "resources/project-media/spoilage-environment-concept-01.webp", alt: "Shadowed street and storefront environment concept for Spoilage", caption: "Environment concept / storefront"},
      {src: "resources/project-media/spoilage-environment-concept-02.webp", alt: "Low-angle street environment concept with a telephone for Spoilage", caption: "Environment concept / street"}
    ],
    audioSamples: [
      {src: "resources/audio/spoilage-left-hand.m4a", title: "Left Hand", category: "Music"},
      {src: "resources/audio/spoilage-cutting-board-sfx.m4a", title: "Cutting Board SFX", category: "Sound Design"}
    ]
  },
  {
    id: "03", slug: "delivery", title: "Delivery", role: "Audio Lead",
    tools: ["Wwise", "Unreal Engine", "Ableton"], categories: ["audio", "leadership"], featured: true, accent: "#bd633a",
    summary: "Audio direction, composition, sound design, implementation, and team management for a professional team project.",
    detail: "Delivery is River’s primary audio case study, bringing creative audio work and technical implementation together with audio leadership in an internship and professional team environment.",
    contributions: ["Audio direction and team management", "Composition and sound design", "Audio implementation"],
    result: "Internship / professional team experience",
    image: "resources/project-media/delivery-development-overview.webp", imageAlt: "Development overview of Delivery’s island city in Unreal Engine",
    heroImage: "resources/project-media/delivery-development-overview.webp", heroAlt: "Development overview of the Delivery island city and road network",
    heroType: "Development capture",
    gallery: [
      {src: "resources/project-media/delivery-mail-truck-turnaround.webp", alt: "Delivery mail truck turnaround and color study", caption: "Vehicle turnaround / visual development"},
      {src: "resources/project-media/delivery-office-building-concepts.webp", alt: "Three office building concepts created for Delivery", caption: "Office building concepts"},
      {src: "resources/project-media/delivery-construction-worker-concepts.webp", alt: "Four construction worker character concepts for Delivery", caption: "Construction worker character concepts"}
    ],
    audioSamples: [
      {src: "resources/audio/delivery-scene-2-8.m4a", title: "Scene 2–8 Mastered", category: "Music", description: "Scene 2–8 score", featuredRail: "music", featuredOrder: 3, duration: 66}
    ]
  },
  {
    id: "04", slug: "project-eve", title: "Project Eve", role: "Audio Designer",
    tools: ["Ableton"], categories: ["audio"], featured: true, accent: "#9f6951",
    summary: "A focused creative audio showcase.",
    contributions: ["Creative audio design"],
    image: "resources/project-media/project-eve-rain-environment.webp", imageAlt: "Rainy industrial environment artwork from Project Eve",
    heroImage: "resources/project-media/project-eve-rain-environment.webp", heroAlt: "A rain-soaked industrial building in Project Eve",
    gallery: [
      {src: "resources/project-media/project-eve-desert-level.webp", alt: "Wide desert level environment from Project Eve", caption: "Desert level environment"},
      {src: "resources/project-media/project-eve-desert-arsenal.webp", alt: "Project Eve desert scene with a player character and weapon lineup", caption: "Character and weapon lineup"},
      {src: "resources/project-media/project-eve-raider-glaive.gif", alt: "Animated raider wielding a glowing glaive in Project Eve", caption: "Raider glaive animation", fit: "contain"},
      {src: "resources/project-media/project-eve-reversal.gif", alt: "Animated reversal move from Project Eve", caption: "Reversal animation", fit: "contain"}
    ],
    audioSamples: [
      {src: "resources/audio/project-eve-eve.m4a", title: "Eve", category: "Music"},
      {src: "resources/audio/project-eve-as-night-rises.m4a", title: "As Night Rises", category: "Music", featuredRail: "music", featuredOrder: 1, duration: 76.363},
      {src: "resources/audio/project-eve-broken-pipes.m4a", title: "Broken Pipes", category: "Music"}
    ]
  },
  {
    id: "05", slug: "atira", title: "Atira", role: "Music / Sound",
    tools: [], categories: ["audio"], accent: "#b44f48",
    summary: "Music and sound for an early-development third-person action game set in an abandoned city.",
    detail: "Atira is an early-development third-person action game by Boring Arcade Studios, combining ranged and melee combat in an abandoned city. The studio’s official team page credits River for music and sound.",
    contributions: ["Music and sound"],
    image: "resources/project-media/atira-hero.webp", imageAlt: "Masked gunfighter character artwork from Atira",
    heroImage: "resources/project-media/atira-hero.webp", heroAlt: "Atira character artwork with a masked gunfighter against a dark city backdrop",
    gallery: [
      {src: "resources/project-media/atira-main-menu.webp", alt: "Atira main menu in an industrial environment", caption: "Early-development main menu"},
      {src: "resources/project-media/atira-concept-art.webp", alt: "Atira concept art of a character leaping above a crowd", caption: "Project concept art"}
    ],
    audioSamples: [
      {src: "resources/audio/atira-main-menu.m4a", title: "Main Menu", category: "Music", featuredRail: "music", featuredOrder: 5, duration: 97.816},
      {src: "resources/audio/atira-gameplay.m4a", title: "Gameplay", category: "Music"},
      {src: "resources/audio/atira-revolver-reload.m4a", title: "Revolver Reload", category: "Sound Design", featuredRail: "sound", featuredOrder: 9, duration: .33},
      {
        title: "Shield Block", category: "Sound Design", featuredRail: "sound", featuredOrder: 10,
        variants: [
          {src: "resources/audio/ME - B - 1.wav", label: "Variation 01", duration: 2},
          {src: "resources/audio/ME - B - 2.wav", label: "Variation 02", duration: 2}
        ]
      }
    ],
    video: {title: "Atira early-development showcase", embed: "https://www.youtube-nocookie.com/embed/ezhkpZdxWnw", external: "https://www.youtube.com/watch?v=ezhkpZdxWnw"},
    links: [
      {label: "Official site", url: "https://boringarcadestudios.github.io/BAG-Studios/index.html"},
      {label: "Itch.io", url: "https://bag-studios.itch.io/project-a"}
    ]
  },
  {
    id: "06", slug: "disease-brings-death", title: "Disease Brings Death", role: "Studio Lead",
    tools: ["Jira", "Unity", "C#", "FMOD", "Ableton"], categories: ["audio", "development", "leadership"],
    summary: "Studio leadership, management, project organization, and cross-disciplinary production.",
    contributions: ["Studio leadership", "Project organization", "Cross-disciplinary development"],
    image: "resources/project-media/disease-brings-death-environment.webp", imageAlt: "Development environment showing a waterfront city in Disease Brings Death",
    heroImage: "resources/project-media/disease-brings-death-environment.webp", heroAlt: "Waterfront environment development capture from Disease Brings Death",
    heroType: "Development capture",
    gallery: [
      {src: "resources/project-media/disease-brings-death-city-concepts.webp", alt: "Blue-toned city location concepts for Disease Brings Death", caption: "City location concepts / production development"},
      {src: "resources/project-media/disease-brings-death-tile-editor.webp", alt: "Cathedral environment assets arranged in a tile editor for Disease Brings Death", caption: "Environment asset implementation in the tile editor"}
    ],
    audioSamples: [
      {src: "resources/audio/disease-brings-death-poor-city-church.m4a", title: "Poor City - Church", category: "Music"},
      {src: "resources/audio/disease-brings-death-underground-cavern-ambience.m4a", title: "Underground Cavern - Ambiance Intro", category: "Ambience", featuredRail: "sound", featuredOrder: 3, duration: 35.712},
      {src: "resources/audio/disease-brings-death-new-zone.m4a", title: "New Zone Stinger", category: "Stinger", featuredRail: "sound", featuredOrder: 4, duration: 8}
    ]
  },
  {
    id: "07", slug: "tell-tale-den", title: "Tell-Tale Den", role: "Technical / Creative Audio Designer",
    tools: ["Ableton Live 12", "FMOD", "Unity", "C#"], categories: ["audio", "development"], featured: true, accent: "#b94939",
    summary: "A supernatural poker game set in a gambling den within a ghost city in the afterlife.",
    detail: "Tell-Tale Den is a Texas Hold ’Em game about reading the table and spotting opponents’ tells while memories fade in a ghost city. River is credited for audio on the Brackeys Game Jam 2026.2 submission.",
    contributions: ["Technical audio", "Creative audio design", "FMOD implementation"],
    result: "Brackeys Game Jam 2026.2 submission",
    image: "resources/project-media/tell-tale-den-interior.webp", imageAlt: "The lantern-lit gambling den interior from Tell-Tale Den",
    heroImage: "resources/project-media/tell-tale-den-banner.webp", heroAlt: "Tell-Tale Den title artwork over a lantern-lit ghost city",
    gallery: [{src: "resources/project-media/tell-tale-den-interior.webp", alt: "The stage and card tables inside the Tell-Tale Den"}],
    audioSamples: [
      {src: "resources/audio/tell-tale-den/catch-the-lie.m4a", title: "Catch the Lie", category: "Music / Composition"},
      {
        src: "resources/audio/tell-tale-den/tell-tale-den.m4a", title: "Tell-Tale Den", category: "Music / Composition",
        description: "Main project theme", featuredRail: "music", featuredOrder: 7, duration: 99
      },
      {src: "resources/audio/tell-tale-den/main-menu.m4a", title: "Main Menu", category: "Music / Composition"},
      {src: "resources/audio/tell-tale-den/all-in.m4a", title: "All-In", category: "Sound Design / SFX"},
      {src: "resources/audio/tell-tale-den/call.m4a", title: "Call", category: "Sound Design / SFX"},
      {src: "resources/audio/tell-tale-den/check.m4a", title: "Check", category: "Sound Design / SFX"},
      {src: "resources/audio/tell-tale-den/raise.m4a", title: "Raise", category: "Sound Design / SFX"},
      {
        title: "Fold", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/fold-01.m4a", label: "Take 01"},
          {src: "resources/audio/tell-tale-den/fold-02.m4a", label: "Take 02"}
        ]
      },
      {
        title: "Card Deal", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/card-deal-01.m4a", label: "Take 01"},
          {src: "resources/audio/tell-tale-den/card-deal-03.m4a", label: "Take 03"}
        ]
      },
      {
        title: "Card Shuffle", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/card-shuffle-03.m4a", label: "Take 03"},
          {src: "resources/audio/tell-tale-den/card-shuffle-04.m4a", label: "Take 04"},
          {src: "resources/audio/tell-tale-den/card-shuffle-05.m4a", label: "Take 05"}
        ]
      },
      {
        title: "Card Flip / Toss", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/card-flip-toss-01.m4a", label: "Take 01"},
          {src: "resources/audio/tell-tale-den/card-flip-toss-02.m4a", label: "Take 02"},
          {src: "resources/audio/tell-tale-den/card-flip-toss-03.m4a", label: "Take 03"}
        ]
      },
      {
        title: "Poker Chip Hit", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/poker-chip-hit-01.m4a", label: "Take 01"},
          {src: "resources/audio/tell-tale-den/poker-chip-hit-02.m4a", label: "Take 02"},
          {src: "resources/audio/tell-tale-den/poker-chip-hit-03.m4a", label: "Take 03"}
        ]
      },
      {
        title: "Poker Chip Move", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/poker-chip-move-01.m4a", label: "Take 01"},
          {src: "resources/audio/tell-tale-den/poker-chip-move-02.m4a", label: "Take 02"},
          {src: "resources/audio/tell-tale-den/poker-chip-move-03.m4a", label: "Take 03"},
          {src: "resources/audio/tell-tale-den/poker-chip-move-04.m4a", label: "Take 04"}
        ]
      },
      {
        title: "Cough", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/tell-tale-den/cough-01.m4a", label: "Take 01"},
          {src: "resources/audio/tell-tale-den/cough-02.m4a", label: "Take 02"},
          {src: "resources/audio/tell-tale-den/cough-03.m4a", label: "Take 03"},
          {src: "resources/audio/tell-tale-den/cough-04.m4a", label: "Take 04"}
        ]
      }
    ],
    links: [{label: "Itch.io", url: "https://kyuowo.itch.io/tell-tale-den"}]
  },
  {
    id: "08", slug: "sleeping-on-the-job", title: "Sleeping On The Job", role: "Project Contributor",
    tools: [], categories: ["audio"], accent: "#d4aa35",
    summary: "A work-in-progress puzzle game built for B1T Jam 5, with exploration that shifts into a sleep mode for interacting with evidence.",
    detail: "Sleeping On The Job is a playable work-in-progress puzzle project submitted to B1T Jam 5. Its project page lists River among the project creators but does not specify individual responsibilities.",
    result: "B1T Jam 5 submission / Work in progress",
    image: "resources/project-media/sleeping-on-the-job-character.png", imageAlt: "A tired character checking a phone in Sleeping On The Job",
    imageFit: "contain", imagePosition: "center bottom",
    audioSamples: [
      {src: "resources/audio/sleeping-on-the-job/break-room.m4a", title: "Break Room", category: "Music / Composition"},
      {src: "resources/audio/sleeping-on-the-job/jazz-bar.m4a", title: "Jazz Bar", category: "Music / Composition"},
      {src: "resources/audio/sleeping-on-the-job/main-menu.m4a", title: "Main Menu", category: "Music / Composition"},
      {src: "resources/audio/sleeping-on-the-job/minigame.m4a", title: "Minigame", category: "Music / Composition"},
      {src: "resources/audio/sleeping-on-the-job/sleepwalking.m4a", title: "Sleepwalking", category: "Music / Composition"},
      {src: "resources/audio/sleeping-on-the-job/motel-ambience.m4a", title: "Motel Ambience", category: "Sound Design / SFX"},
      {
        src: "resources/audio/sleeping-on-the-job/window-break.m4a", title: "Window Break", category: "Sound Design / SFX",
        featuredRail: "sound", featuredOrder: 13, duration: 2.698667
      },
      {
        title: "Door Kick Open", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/sleeping-on-the-job/door-kick-open-01.m4a", label: "Take 01"},
          {src: "resources/audio/sleeping-on-the-job/door-kick-open-02.m4a", label: "Take 02"}
        ]
      },
      {
        title: "Player Walking", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/sleeping-on-the-job/player-walking-01.m4a", label: "Take 01"},
          {src: "resources/audio/sleeping-on-the-job/player-walking-02.m4a", label: "Take 02"},
          {src: "resources/audio/sleeping-on-the-job/player-walking-03.m4a", label: "Take 03"},
          {src: "resources/audio/sleeping-on-the-job/player-walking-04.m4a", label: "Take 04"}
        ]
      },
      {
        title: "UI Click", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/sleeping-on-the-job/ui-click-01.m4a", label: "Take 01"},
          {src: "resources/audio/sleeping-on-the-job/ui-click-02.m4a", label: "Take 02"},
          {src: "resources/audio/sleeping-on-the-job/ui-click-03.m4a", label: "Take 03"},
          {src: "resources/audio/sleeping-on-the-job/ui-click-04.m4a", label: "Take 04"}
        ]
      },
      {
        title: "UI Hover", category: "Sound Design / SFX", variants: [
          {src: "resources/audio/sleeping-on-the-job/ui-hover-01.m4a", label: "Take 01"},
          {src: "resources/audio/sleeping-on-the-job/ui-hover-02.m4a", label: "Take 02"},
          {src: "resources/audio/sleeping-on-the-job/ui-hover-03.m4a", label: "Take 03"},
          {src: "resources/audio/sleeping-on-the-job/ui-hover-04.m4a", label: "Take 04"},
          {src: "resources/audio/sleeping-on-the-job/ui-hover-05.m4a", label: "Take 05"}
        ]
      }
    ],
    links: [{label: "Itch.io", url: "https://kyuowo.itch.io/sleeping-on-the-job"}]
  },
  {
    id: "09", slug: "mariposa", title: "Mariposa", role: "Audio Lead",
    tools: ["Unity", "C#", "FMOD", "Ableton"], categories: ["audio", "leadership"], featured: true, accent: "#4f9189",
    summary: "Audio leadership for a 2D puzzle platformer split between a solarpunk past and apocalyptic future.",
    contributions: ["Audio leadership", "Audio testing", "Quality assurance"], image: "resources/Mari.png", imageAlt: "Mariposa game artwork",
    audioSamples: [{
      src: "resources/audio/mariposa-drowning-tide.m4a", title: "Drowning Tide", category: "Music",
      description: "Tense puzzle-platforming level", context: "Ableton Live 12", featuredRail: "music", featuredOrder: 2, duration: 135.15
    }],
    links: [{label: "Steam", url: "https://store.steampowered.com/app/3991120/Mariposa/"}]
  },
  {
    id: "10", slug: "anomie", title: "Anomie", role: "Audio Lead / Game Designer",
    tools: [], categories: ["audio", "design", "leadership"], accent: "#8e4d46",
    summary: "A horror-themed experience centered on tension, atmosphere, and combat.",
    image: "resources/Title.PNG", imageAlt: "Anomie title artwork",
    audioSamples: [{
      src: "resources/audio/anomie-face-behind-the-mask.m4a", title: "Face Behind the Mask", category: "Music",
      description: "Climactic horror boss fight", context: "Ableton Live 12", featuredRail: "music", featuredOrder: 4, duration: 36.788
    }, {
      src: "resources/audio/anomie-bunny-boss.m4a", title: "Bunny Boss", category: "Music"
    }, {
      src: "resources/audio/SFX_Player_Death.wav", title: "Player Death", category: "Sound Design", featuredRail: "sound", featuredOrder: 5, duration: 7.634603
    }, {
      src: "resources/audio/SFX_Monster_Roar_Long.wav", title: "Monster Roar", category: "Sound Design", featuredRail: "sound", featuredOrder: 6, duration: 3.252041
    }, {
      src: "resources/audio/SFX_Spider_Scittering.wav", title: "Spider Scuttling", category: "Sound Design", featuredRail: "sound", featuredOrder: 7, duration: 8.074989
    }, {
      src: "resources/audio/SFX_Bunny_Attack_03.wav", title: "Bunny Attack", category: "Sound Design", featuredRail: "sound", featuredOrder: 8, duration: 1.376032
    }],
    links: [{label: "Itch.io", url: "https://sproutdotmoe.itch.io/anomie"}]
  },
  {
    id: "11", slug: "mahjong-maestro", title: "Mahjong Maestro", role: "Technical / Creative Audio Designer",
    tools: ["Unity", "C#", "Ableton", "FMOD"], categories: ["audio", "development", "design"], featured: true, accent: "#a64a3f",
    summary: "A polished two-button game with creative audio and technical implementation work.",
    contributions: ["Technical audio design", "Creative audio design", "FMOD implementation"], result: "First place — Tinyware Game Jam",
    image: "resources/Mahjong.png", imageAlt: "Mahjong Maestro gameplay artwork",
    audioSamples: [
      {src: "resources/audio/mahjong-maestro-answer-correct.m4a", title: "Answer Correct", category: "UI"},
      {src: "resources/audio/mahjong-maestro-game-over.m4a", title: "Game Over", category: "Stinger", featuredRail: "sound", featuredOrder: 1, duration: 7.105},
      {src: "resources/audio/SFX_Tile_Place_Collection.wav", title: "Tile Placement", category: "Sound Design", featuredRail: "sound", featuredOrder: 2, duration: 1.525488}
    ],
    links: [{label: "Itch.io", url: "https://jwashabaugh.itch.io/mahjong-maestro"}]
  },
  {
    id: "12", slug: "tail-of-two", title: "Tail of Two", role: "Game Designer / Audio Lead",
    tools: [], categories: ["audio", "design", "leadership"], accent: "#746c9e",
    summary: "A 2D puzzle platformer following the journey of a spirit cat.",
    image: "resources/TOT.png", imageAlt: "Tail of Two game artwork",
    audioSamples: [{
      src: "resources/audio/tail-of-two.m4a", title: "Tail of Two", category: "Music",
      description: "2D puzzle-platformer score", context: "Ableton Live 12"
    }],
    links: [{label: "Itch.io", url: "https://jwashabaugh.itch.io/tail-of-two"}]
  },
  {
    id: "13", slug: "harmonious-home-designer", title: "Way of Feng Shui", role: "Project Archive",
    tools: ["Unity"], categories: [], accent: "#6e8f5b",
    summary: "An in-development Unity game available in browser and downloadable builds.",
    status: "In development",
    image: "resources/project-media/way-of-feng-shui-banner.webp", imageAlt: "Way of Feng Shui official title artwork with green leaves and a red decorative knot",
    heroImage: "resources/project-media/way-of-feng-shui-banner.webp", heroAlt: "Official Way of Feng Shui title artwork",
    imageFit: "contain", fitBackground: "#253329", heroType: "Official title artwork",
    audioSamples: [
      {src: "resources/audio/way-of-feng-shui-main-menu.m4a", title: "Way of Feng Shui - Main Menu", category: "Music"},
      {src: "resources/audio/way-of-feng-shui-open-curtains.m4a", title: "Way of Feng Shui - Open Curtains", category: "Music"},
      {src: "resources/audio/way-of-feng-shui-place-potted-plant.m4a", title: "SFX_Place_PottedPlant", category: "Sound Design", featuredRail: "sound", featuredOrder: 11, duration: .61},
      {
        title: "Delete", category: "UI", featuredRail: "sound", featuredOrder: 12,
        variants: [
          {src: "resources/audio/Delete 1.wav", label: "Variation 01", duration: .192018},
          {src: "resources/audio/Delete 2.wav", label: "Variation 02", duration: 1}
        ]
      }
    ],
    links: [{label: "Itch.io", url: "https://maghaejin.itch.io/way-of-feng-shui"}]
  },
  {
    id: "14", slug: "dungeon-chef", title: "Dungeon Chef!", role: "Project Archive",
    tools: [], categories: ["audio"], accent: "#75905f", summary: "Project entry preserved in the complete archive.",
    image: "resources/project-media/dungeon-chef-overview.webp", imageAlt: "Development overview of the forest village environment in Dungeon Chef",
    heroImage: "resources/project-media/dungeon-chef-overview.webp", heroAlt: "Forest village development overview from Dungeon Chef",
    heroType: "Development capture", imagePosition: "center",
    gallery: [{src: "resources/project-media/dungeon-chef-waterfall-overview.webp", alt: "Alternate Dungeon Chef village overview with a waterfall", caption: "Environment development overview"}],
    audioSamples: [
      {src: "resources/audio/dungeon-chef-tavern.m4a", title: "Tavern", category: "Music", featuredRail: "music", featuredOrder: 6, duration: 101.053},
      {src: "resources/audio/dungeon-chef-village.m4a", title: "Village", category: "Music"}
    ]
  },
  {
    id: "15", slug: "bestitched", title: "Bestitched", role: "Audio / Programming",
    tools: ["Unity"], categories: ["audio", "development"], accent: "#a6384d",
    summary: "A 2D top-down action RPG about escaping a witch’s mansion and unstitching bewitched toys.",
    detail: "Bestitched is a 2D top-down action RPG made for the UCSD Fall TritonWare 2025 game jam. The official project page credits River with audio and programming.",
    contributions: ["Audio", "Programming"], result: "Fall TritonWare 2025 submission",
    image: "resources/project-media/bestitched-hero.webp", imageAlt: "Bestitched title artwork featuring a red-hooded character holding scissors",
    heroImage: "resources/project-media/bestitched-hero.webp", heroAlt: "Bestitched key art with its red-hooded protagonist and title",
    imagePosition: "center", heroPosition: "center", heroType: "Key art",
    gallery: [
      {src: "resources/project-media/bestitched-gameplay.jpg", alt: "Native-size top-down room gameplay screenshot from Bestitched", caption: "Top-down gameplay room", fit: "contain"},
      {src: "resources/project-media/bestitched-environment-concept.webp", alt: "Blue-lit greenhouse environment concept for Bestitched", caption: "Environment concept"}
    ],
    links: [{label: "Itch.io", url: "https://jwashabaugh.itch.io/bestitched"}]
  },
  {
    id: "16", slug: "the-commute", title: "The Commute", role: "Audio",
    tools: ["Unity"], categories: ["audio"], accent: "#b65d43",
    summary: "A morning commute game made for VGDC @ UCSD’s 48-hour Tinyware game jam.",
    detail: "Usually diligent employee Quinn Bennett Kohl is running late to work. The Commute was made for VGDC @ UCSD’s 48-hour Tinyware game jam around the theme “On Repeat,” with River credited for audio.",
    contributions: ["Audio"], result: "VGDC @ UCSD Tinyware — 48-hour game jam", status: "Released",
    image: "resources/project-media/the-commute-key-art.png", imageAlt: "A red car flying through the air in The Commute key art",
    heroImage: "resources/project-media/the-commute-traffic.png", heroAlt: "Pixel-art traffic filling a city highway in The Commute",
    heroType: "Gameplay screenshot", heroPosition: "center",
    gallery: [
      {src: "resources/project-media/the-commute-main-menu.png", alt: "The Commute main menu with highway-sign buttons", caption: "Main menu"},
      {src: "resources/project-media/the-commute-phone.png", alt: "A phone alarm showing 6:30 and Go To Work in The Commute", caption: "Opening sequence"}
    ],
    links: [{label: "Itch.io", url: "https://gortizzz.itch.io/the-commute"}]
  }
];

export const getProject = slug => projects.find(project => project.slug === slug);
