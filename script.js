(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var countdownEl = document.getElementById("countdown");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  /**
   * Countdown até fim do dia (reinicia à meia-noite) — gatilho de urgência leve.
   */
  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function updateCountdown() {
    if (!countdownEl) return;

    var now = new Date();
    var end = new Date(now);
    end.setHours(23, 59, 59, 999);

    var diff = end - now;
    if (diff <= 0) {
      countdownEl.textContent = "Renovando oferta…";
      return;
    }

    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    countdownEl.textContent =
      "Promoção do dia termina em " + pad(h) + ":" + pad(m) + ":" + pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
