/* Transições entre páginas HTML.
   Usa View Transitions nativas (cross-document) quando disponíveis.
   Nos demais navegadores, aplica um fade com véu antes de navegar. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsCrossDocument = false;

  try {
    if (window.CSSStyleSheet) {
      var sheet = new CSSStyleSheet();
      sheet.replaceSync("@view-transition { navigation: auto; }");
      var rule = sheet.cssRules && sheet.cssRules[0];
      supportsCrossDocument = Boolean(rule && "navigation" in rule);
    }
  } catch (error) {
    supportsCrossDocument = false;
  }

  if (supportsCrossDocument || reducedMotion) return;

  root.classList.add("page-fallback");

  var veil = null;
  var navigating = false;

  var createVeil = function () {
    veil = document.createElement("div");
    veil.className = "page-veil";
    veil.setAttribute("aria-hidden", "true");
    document.body.appendChild(veil);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createVeil);
  } else {
    createVeil();
  }

  window.addEventListener("pageshow", function (event) {
    if (!event.persisted) return;
    navigating = false;
    if (veil) veil.classList.remove("is-active");
  });

  document.addEventListener("click", function (event) {
    if (navigating || !veil) return;
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var target = event.target;
    var link =
      target && target.closest ? target.closest("a[href]") : null;

    if (!link) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    if (url.origin !== window.location.origin) return;
    if (url.protocol !== "http:" && url.protocol !== "https:") return;
    if (
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash
    ) {
      return;
    }

    event.preventDefault();
    navigating = true;
    veil.classList.add("is-active");

    window.setTimeout(function () {
      window.location.assign(url.href);
    }, 240);
  });
})();
