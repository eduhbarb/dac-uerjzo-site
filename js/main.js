/* DAC UERJ ZO — interações */
(function () {
  "use strict";

  /* ---------- FAQ ---------- */
  var faqRoots = document.querySelectorAll("[data-faq]");

  Array.prototype.forEach.call(faqRoots, function (root) {
    var questions = Array.prototype.slice.call(
      root.querySelectorAll(".faq-question")
    );

    questions.forEach(function (button) {
      button.addEventListener("click", function () {
        var isOpen = button.getAttribute("aria-expanded") === "true";

        questions.forEach(function (other) {
          if (other === button) return;
          other.setAttribute("aria-expanded", "false");
          other.closest(".faq-item").classList.remove("is-open");
        });

        button.setAttribute("aria-expanded", String(!isOpen));
        button.closest(".faq-item").classList.toggle("is-open", !isOpen);
      });
    });
  });

  /* ---------- Carrossel de membros ---------- */
  var track = document.querySelector("[data-carousel-track]");
  var prevBtn = document.querySelector("[data-carousel-prev]");
  var nextBtn = document.querySelector("[data-carousel-next]");

  if (track) {
    var step = function () {
      var card = track.querySelector(".member-card");
      if (!card) return 280;
      var styles = window.getComputedStyle(track);
      var gap = parseFloat(styles.columnGap || styles.gap || 0) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    var updateButtons = function () {
      var maxScroll = track.scrollWidth - track.clientWidth - 2;
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        track.scrollBy({ left: -step(), behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        track.scrollBy({ left: step(), behavior: "smooth" });
      });
    }

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();

    /* Arrastar com o mouse no desktop */
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startScroll = 0;

    /* Bloqueia o arraste nativo de imagens/links: o mouse arrasta o carrossel */
    track.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    track.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = track.scrollLeft;
    });

    track.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      var delta = event.clientX - startX;

      if (Math.abs(delta) > 4) {
        moved = true;
        track.classList.add("is-dragging");
        track.scrollLeft = startScroll - delta;
        event.preventDefault();
      }
    });

    var stopDrag = function () {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
      if (moved) {
        // impede o clique acidental em links/imagens após arrastar
        var swallow = function (event) {
          event.preventDefault();
          event.stopPropagation();
          track.removeEventListener("click", swallow, true);
        };
        track.addEventListener("click", swallow, true);
        window.setTimeout(function () {
          track.removeEventListener("click", swallow, true);
        }, 50);
      }
    };

    track.addEventListener("pointerup", stopDrag);
    track.addEventListener("pointerleave", stopDrag);
    track.addEventListener("pointercancel", stopDrag);
  }

  /* ---------- Modais de fluxograma ---------- */
  var modalTriggers = document.querySelectorAll("[data-open-modal]");
  var flowModals = document.querySelectorAll(".flow-modal");

  var closeFlowModal = function (dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else {
      dialog.removeAttribute("open");
      document.body.classList.remove("is-locked");
    }
  };

  Array.prototype.forEach.call(modalTriggers, function (trigger) {
    trigger.addEventListener("click", function () {
      var dialog = document.getElementById(trigger.getAttribute("data-open-modal"));
      if (!dialog) return;

      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");

      document.body.classList.add("is-locked");

      var scroller = dialog.querySelector(".flow-scroll");
      if (scroller) scroller.scrollTop = 0;
    });
  });

  Array.prototype.forEach.call(flowModals, function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeFlowModal(dialog);
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("is-locked");
    });

    Array.prototype.forEach.call(
      dialog.querySelectorAll("[data-close-modal]"),
      function (button) {
        button.addEventListener("click", function () {
          closeFlowModal(dialog);
        });
      }
    );
  });

  /* ---------- Revelação no scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- Ano do rodapé ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
