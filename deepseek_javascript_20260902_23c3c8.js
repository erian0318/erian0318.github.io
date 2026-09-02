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
        "images/portfolio/wish-you-were-here-2.jpg"
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
        "images/portfolio/awareness-series-2.jpg"
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
        "images/portfolio/port-key-holder-2.jpg"
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
        "images/portfolio/modular-organizer-2.jpg"
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
        "images/portfolio/arctic-plate-set-2.jpg"
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
        "images/portfolio/gill-sans-study-1.jpg",
        "images/portfolio/gill-sans-study-2.jpg"
      ]
    }
  ];

  renderGrid(portfolioItems);
  setupModal(portfolioItems);

  function cardMarkup(item) {
    const img = item.images && item.images[0] ? item.images[0] : "";
    return `
      <button class="item-card" data-id="${item.id}" aria-label="${item.title}">
        <span class="item-card-photo" style="background-image:url('${img}')"></span>
        <span class="item-card-meta">
          <span class="item-card-title">${item.title}</span>
          <span class="item-card-badge item-card-badge--custom">${item.category}</span>
        </span>
      </button>
    `;
  }

  function renderGrid(items) {
    gridRoot.innerHTML = items.map(cardMarkup).join("");
  }

  function setupModal(items) {
    const byId = Object.fromEntries(items.map((i) => [i.id, i]));
    let currentImages = [];
    let currentIndex = 0;
    let touchStartX = null;

    document.addEventListener("click", (e) => {
      const card = e.target.closest(".item-card");
      if (card) {
        const item = byId[card.dataset.id];
        if (item) openModal(item);
        return;
      }
      if (e.target.closest("[data-modal-close]")) closeModal();
      if (e.target === modalRoot) closeModal();

      const nextBtn = e.target.closest("[data-photo-next]");
      const prevBtn = e.target.closest("[data-photo-prev]");
      if (nextBtn) showPhoto(currentIndex + 1);
      if (prevBtn) showPhoto(currentIndex - 1);

      const dot = e.target.closest("[data-photo-dot]");
      if (dot) showPhoto(Number(dot.dataset.photoDot));
    });

    document.addEventListener("keydown", (e) => {
      if (!modalRoot.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showPhoto(currentIndex + 1);
      if (e.key === "ArrowLeft") showPhoto(currentIndex - 1);
    });

    function openModal(item) {
      currentImages = item.images && item.images.length ? item.images : [""];
      currentIndex = 0;

      modalRoot.innerHTML = `
        <div class="modal-overlay" data-modal-close></div>
        <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${item.title}">
          <button class="modal-close" data-modal-close aria-label="Close">×</button>

          <div class="modal-photo-wrap">
            <div class="modal-photo" id="modal-photo"></div>
            ${
              currentImages.length > 1
                ? `<button class="modal-photo-arrow modal-photo-arrow--prev" data-photo-prev aria-label="Previous photo">←</button>
                   <button class="modal-photo-arrow modal-photo-arrow--next" data-photo-next aria-label="Next photo">→</button>
                   <div class="modal-photo-dots" id="modal-photo-dots"></div>`
                : ""
            }
          </div>

          <div class="modal-body">
            <span class="item-card-badge item-card-badge--custom">${item.category}</span>
            <h2 class="modal-title">${item.title}</h2>
            <p class="modal-desc">${item.description}</p>
            <div class="modal-row"><span class="modal-label">Tools</span><span>${item.tools}</span></div>
            <div class="modal-row"><span class="modal-label">Year</span><span>${item.year}</span></div>
            <div class="modal-cta">
              <a href="${CONTACT_EMAIL}" target="_blank" rel="noopener">Email</a>
              <a href="${CONTACT_INSTAGRAM}" target="_blank" rel="noopener">Instagram</a>
              <a href="${CONTACT_TELEGRAM}" target="_blank" rel="noopener">Telegram</a>
            </div>
          </div>
        </div>
      `;

      const photoEl = document.getElementById("modal-photo");
      photoEl.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      });
      photoEl.addEventListener("touchend", (e) => {
        if (touchStartX === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (delta > 40) showPhoto(currentIndex - 1);
        if (delta < -40) showPhoto(currentIndex + 1);
        touchStartX = null;
      });

      renderPhotoDots();
      showPhoto(0);

      modalRoot.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function renderPhotoDots() {
      const dotsEl = document.getElementById("modal-photo-dots");
      if (!dotsEl) return;
      dotsEl.innerHTML = currentImages
        .map((_, i) => `<span class="modal-photo-dot" data-photo-dot="${i}"></span>`)
        .join("");
    }

    function showPhoto(index) {
      const total = currentImages.length;
      currentIndex = ((index % total) + total) % total;
      const photoEl = document.getElementById("modal-photo");
      if (photoEl) {
        photoEl.style.backgroundImage = `url('${currentImages[currentIndex]}')`;
      }
      const dotsEl = document.getElementById("modal-photo-dots");
      if (dotsEl) {
        [...dotsEl.children].forEach((dot, i) => {
          dot.classList.toggle("is-active", i === currentIndex);
        });
      }
    }

    function closeModal() {
      modalRoot.classList.remove("is-open");
      modalRoot.innerHTML = "";
      document.body.style.overflow = "";
    }
  }
})();