// ============================================================
// CLOTHING — ACTIVE PAGE
// Reads clothing-data.json and renders:
//   1. Pinned grid (items with "pinned": true)
//   2. Arrow-scroll carousel (all active items, newest first)
//   3. Shared modal for made-to-order vs in-stock items
// ============================================================

(function () {
  const CONTACT_INSTAGRAM = "https://www.instagram.com/custom_ch_shop?igsi=MTRvYjB0ZTA4OWI3Yg==";
  const CONTACT_TELEGRAM = "https://t.me/Chstorepl";

  const pinnedRoot = document.getElementById("pinned-grid");
  const carouselTrack = document.getElementById("carousel-track");
  const carouselPrev = document.getElementById("carousel-prev");
  const carouselNext = document.getElementById("carousel-next");
  const modalRoot = document.getElementById("item-modal-root");

  if (!pinnedRoot || !carouselTrack || !modalRoot) return;

  fetch("clothing-data.json")
    .then((res) => res.json())
    .then((items) => {
      const active = items.filter((i) => i.status === "active");
      const pinned = active.filter((i) => i.pinned);
      const sorted = [...active].sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      );

      renderPinned(pinned);
      renderCarousel(sorted);
      setupCarouselArrows();
      setupModal(active);
    })
    .catch((err) => {
      console.error("Could not load clothing data:", err);
      pinnedRoot.innerHTML =
        '<p class="data-error">Could not load items right now.</p>';
    });

  function badgeLabel(item) {
    return item.type === "in-stock" ? "In stock" : "Made to order";
  }

  function cardMarkup(item) {
    const img = item.images && item.images[0] ? item.images[0] : "";
    return `
      <button class="item-card" data-id="${item.id}" aria-label="${item.title}">
        <span class="item-card-photo" style="background-image:url('${img}')"></span>
        <span class="item-card-meta">
          <span class="item-card-title">${item.title}</span>
          <span class="item-card-badge item-card-badge--${item.type}">${badgeLabel(
      item
    )}</span>
        </span>
      </button>
    `;
  }

  function renderPinned(pinned) {
    if (!pinned.length) {
      pinnedRoot.innerHTML = "";
      return;
    }
    pinnedRoot.innerHTML = pinned.map(cardMarkup).join("");
  }

  function renderCarousel(items) {
    carouselTrack.innerHTML = items.map(cardMarkup).join("");
  }

  function setupCarouselArrows() {
    if (!carouselPrev || !carouselNext) return;
    const scrollAmount = 320;
    carouselPrev.addEventListener("click", () => {
      carouselTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    carouselNext.addEventListener("click", () => {
      carouselTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  function setupModal(items) {
    const byId = Object.fromEntries(items.map((i) => [i.id, i]));

    document.addEventListener("click", (e) => {
      const card = e.target.closest(".item-card");
      if (card) {
        const item = byId[card.dataset.id];
        if (item) openModal(item);
        return;
      }
      if (e.target.closest("[data-modal-close]")) {
        closeModal();
      }
      if (e.target === modalRoot) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    function openModal(item) {
      const img = item.images && item.images[0] ? item.images[0] : "";
      const sizeRow =
        item.type === "in-stock"
          ? `<div class="modal-row"><span class="modal-label">Size</span><span>${item.size}</span></div>`
          : "";

      modalRoot.innerHTML = `
        <div class="modal-overlay" data-modal-close></div>
        <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${item.title}">
          <button class="modal-close" data-modal-close aria-label="Close">×</button>
          <div class="modal-photo" style="background-image:url('${img}')"></div>
          <div class="modal-body">
            <span class="item-card-badge item-card-badge--${item.type}">${badgeLabel(
        item
      )}</span>
            <h2 class="modal-title">${item.title}</h2>
            <p class="modal-desc">${item.description}</p>
            <div class="modal-row"><span class="modal-label">Material</span><span>${item.material}</span></div>
            ${sizeRow}
            <div class="modal-row"><span class="modal-label">Price</span><span>${item.price}</span></div>
            <div class="modal-cta">
              <a href="${CONTACT_INSTAGRAM}" target="_blank" rel="noopener">Message on Instagram</a>
              <a href="${CONTACT_TELEGRAM}" target="_blank" rel="noopener">Message on Telegram</a>
            </div>
          </div>
        </div>
      `;
      modalRoot.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modalRoot.classList.remove("is-open");
      modalRoot.innerHTML = "";
      document.body.style.overflow = "";
    }
  }
})();
