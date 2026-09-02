// ============================================================
// PORTFOLIO — Graphic Design & 3D Product Design
// ============================================================

(function () {
  const CONTACT_INSTAGRAM = "https://www.instagram.com/custom_ch_shop?igsi=MTRvYjB0ZTA4OWI3Yg==";
  const CONTACT_TELEGRAM = "https://t.me/Chstorepl";
  const CONTACT_EMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=dyzainbych@gmail.com";

  const gridRoot = document.getElementById("portfolio-grid");
  const modalRoot = document.getElementById("item-modal-root");

  if (!gridRoot || !modalRoot) return;

  // Данные портфолио (можно вынести в отдельный JSON)

const portfolioItems = [
  {
    id: "pf-001",
    title: "Wish You Were Here",
    category: "Vinyl Record Redesign",
    description: "A complete redesign of the iconic Pink Floyd album cover. The original image is replaced with a modern interpretation while keeping the essence of the original artwork.",
    tools: "Photoshop, Illustrator",
    year: "2026",
    images: [
      "images/portfolio/wish-you-were-here-1.jpg",
      "images/portfolio/wish-you-were-here-2.jpg",
      "images/portfolio/wish-you-were-here-3.jpg",
      "images/portfolio/wish-you-were-here-4.jpg"
    ]
  },
  {
    id: "pf-002",
    title: "Editorial Posters",
    category: "Poster Design",
    description: "A series of editorial posters exploring typography and color theory. Each poster is designed to be both informative and visually striking.",
    tools: "Photoshop, Illustrator",
    year: "2026",
    images: [
      "images/portfolio/editorial-posters-1.jpg",
      "images/portfolio/editorial-posters-2.jpg"
    ]
  },
  {
    id: "pf-003",
    title: "Awareness Series",
    category: "Poster Series",
    description: "A collection of awareness posters addressing social and environmental issues. Each poster uses bold graphics and strong messaging.",
    tools: "Photoshop, Illustrator",
    year: "2026",
    images: [
      "images/portfolio/awareness-series-1.jpg",
      "images/portfolio/awareness-series-2.jpg",
      "images/portfolio/awareness-series-3.jpg"
    ]
  },
  {
    id: "pf-004",
    title: "Port Key Holder",
    category: "3D Product Design",
    description: "A functional key holder designed for efficiency and style. The modular design allows for easy wall mounting and organization.",
    tools: "Autodesk Fusion 360",
    year: "2026",
    images: [
      "images/portfolio/port-key-holder-1.jpg",
      "images/portfolio/port-key-holder-2.jpg",
      "images/portfolio/port-key-holder-3.jpg",
      "images/portfolio/port-key-holder-4.jpg",
      "images/portfolio/port-key-holder-5.jpg",
      "images/portfolio/port-key-holder-6.jpg",
      "images/portfolio/port-key-holder-7.jpg"
    ]
  },
  {
    id: "pf-005",
    title: "Modular Organizer",
    category: "3D Product Design",
    description: "A modular desk organizer designed to keep workspace clutter-free. The system allows for flexible configurations.",
    tools: "Autodesk Fusion 360",
    year: "2026",
    images: [
      "images/portfolio/modular-organizer-1.jpg",
      "images/portfolio/modular-organizer-2.jpg",
      "images/portfolio/modular-organizer-3.jpg",
      "images/portfolio/modular-organizer-4.jpg",
      "images/portfolio/modular-organizer-5.jpg",
      "images/portfolio/modular-organizer-6.jpg",
      "images/portfolio/modular-organizer-7.jpg"
    ]
  },
  {
    id: "pf-006",
    title: "Arctic Plate Set",
    category: "3D Product Design",
    description: "A set of dinner plates inspired by the Arctic landscape. The design features clean lines and a cool color palette.",
    tools: "Autodesk Fusion 360",
    year: "2026",
    images: [
      "images/portfolio/arctic-plate-set-1.jpg",
      "images/portfolio/arctic-plate-set-2.jpg",
      "images/portfolio/arctic-plate-set-3.jpg"
    ]
  },
  {
    id: "pf-007",
    title: "Gill Sans Typography Study",
    category: "Editorial Booklet Design",
    description: "A typographic study of the Gill Sans typeface, presented as an editorial booklet. Explores the history and application of this classic font.",
    tools: "Adobe InDesign",
    year: "2026",
    images: [
      "images/portfolio/gill-sans-study.pdf"
    ]
  }
];
