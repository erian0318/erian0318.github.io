// ============================================================
// CLOTHING — INACTIVE PAGE (custom recreation on request)
// ============================================================

(function () {
  const CONTACT_INSTAGRAM = "https://www.instagram.com/custom_ch_shop?igsi=MTRvYjB0ZTA4OWI3Yg==";
  const CONTACT_TELEGRAM = "https://t.me/Chstorepl";
  const CONTACT_EMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=dyzainbych@gmail.com";

  const gridRoot = document.getElementById("inactive-grid");
  const modalRoot = document.getElementById("item-modal-root");

  if (!gridRoot || !modalRoot) return;

  fetch("clothing-data.json")
    .then((res) => res.json())
    .then((items) => {
      const inactive = items
        .filter((i) => i.status === "inactive")
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      renderGrid(inactive);
      setupModal(inactive);
    })
    .catch((err) => {
      console.error("Could not load clothing data:", err);
      gridRoot.innerHTML = '<p class="data-error">Could not load items right now.</p>';
    });

  function cardMarkup(item) {
    const img = item.images && item.images[0] ? item.images[0] : "";
    return `
      <button class="item-card" data-id="${item.id}" aria-label="${item.title}">
        <span class="item-card-photo" style="background-image:url('${img}')"></span>
        <span class="item-card-meta">
          <span class="item-card-title">${item.title}</span>
          <span class="item-card-badge item-card-badge--custom">On request</span>
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
            <span class="item-card-badge item-card-badge--custom">On request</span>
            <h2 class="modal-title">${item.title}</h2>
            <p class="modal-desc">${item.description}</p>
            <div class="modal-row"><span class="modal-label">Material</span><span>${item.material}</span></div>
            <div class="modal-row modal-row--price"><span class="modal-label">Reference price</span><span>${item.price}</span></div>
            <p class="modal-note">Final price depends on your measurements and the order.</p>
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
      if (photoEl) photoEl.style.backgroundImage = `url('${currentImages[currentIndex]}')`;
      const dotsEl = document.getElementById("modal-photo-dots");
      if (dotsEl) {
        [...dotsEl.children].forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
      }
    }

    function closeModal() {
      modalRoot.classList.remove("is-open");
      modalRoot.innerHTML = "";
      document.body.style.overflow = "";
    }
  }
})();
