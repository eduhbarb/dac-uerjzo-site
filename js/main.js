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

  /* ---------- Calendário acadêmico ---------- */
  var calendarRoot = document.querySelector("[data-calendar]");

  if (calendarRoot) {
    var shortMonths = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    var longMonths = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var shortWeekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    var longWeekdays = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

    var calendarSemesters = [
      {
        id: "2026-1",
        label: "2026.1",
        start: "2026-07-17",
        end: "2026-11-17",
        months: [
          { year: 2026, month: 6 },
          { year: 2026, month: 9 },
          { year: 2026, month: 10 }
        ],
        events: [
          {
            id: "ajuste-2026-1",
            title: "Ajuste de grade (SAID)",
            start: "2026-07-17",
            end: "2026-07-24",
            description: "Alteração de disciplinas pelo SAID, de 17 a 24 de julho. Confirme as regras e os prazos no Aluno Online."
          },
          {
            id: "termino-aulas-2026-1",
            title: "Término das aulas",
            start: "2026-10-28",
            description: "Último dia de aulas do período letivo 2026.1."
          },
          {
            id: "avaliacoes-finais-2026-1",
            title: "Avaliações finais",
            start: "2026-10-29",
            end: "2026-10-31",
            description: "Exames finais do período. Confirme horários e salas com cada disciplina."
          },
          {
            id: "fechamento-2026-1",
            title: "Fechamento do semestre",
            start: "2026-10-31",
            description: "Encerramento oficial do semestre 2026.1."
          },
          {
            id: "ferias-docentes-2026-1",
            title: "Férias docentes",
            start: "2026-11-03",
            end: "2026-11-17",
            description: "Interstício entre os períodos letivos, com férias docentes e sem aulas."
          }
        ]
      },
      {
        id: "2026-2",
        label: "2026.2",
        start: "2026-11-18",
        end: "2027-04-24",
        months: [
          { year: 2026, month: 10 },
          { year: 2026, month: 11 },
          { year: 2027, month: 0 },
          { year: 2027, month: 3 }
        ],
        events: [
          {
            id: "abertura-2026-2",
            title: "Abertura do semestre",
            start: "2026-11-18",
            description: "Primeiro dia de aulas do período letivo 2026.2."
          },
          {
            id: "ajuste-2026-2",
            title: "Ajuste de grade (SAID)",
            start: "2026-11-18",
            end: "2026-12-02",
            description: "Modificações na matrícula pelo SAID, de 18 de novembro a 2 de dezembro."
          },
          {
            id: "recesso-fim-de-ano",
            title: "Recesso de fim de ano",
            start: "2026-12-23",
            end: "2027-01-03",
            description: "Recesso institucional de fim de ano. Não há atividades acadêmicas."
          },
          {
            id: "ferias-docentes-2027",
            title: "Férias docentes",
            start: "2027-01-04",
            end: "2027-01-18",
            description: "Férias docentes com aulas suspensas."
          },
          {
            id: "termino-aulas-2026-2",
            title: "Término das aulas",
            start: "2027-04-17",
            description: "Término das atividades letivas do período 2026.2."
          },
          {
            id: "fechamento-2026-2",
            title: "Fechamento do semestre",
            start: "2027-04-24",
            description: "Encerramento oficial do semestre 2026.2."
          }
        ]
      }
    ];

    var pad2 = function (value) {
      return value < 10 ? "0" + value : String(value);
    };

    var toISO = function (date) {
      return date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
    };

    var parseISO = function (iso) {
      var parts = iso.split("-");
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    };

    var formatFullDate = function (iso) {
      var date = parseISO(iso);
      var text = longWeekdays[date.getDay()] + ", " + date.getDate() + " de " + longMonths[date.getMonth()] + " de " + date.getFullYear();
      return text.charAt(0).toUpperCase() + text.slice(1);
    };

    var formatEventDate = function (event) {
      var start = parseISO(event.start);
      var end = parseISO(event.end || event.start);
      var startDay = start.getDate();
      var endDay = end.getDate();
      var startMonth = shortMonths[start.getMonth()];
      var endMonth = shortMonths[end.getMonth()];

      if (event.start === (event.end || event.start)) {
        return startDay + " " + startMonth + " " + start.getFullYear();
      }

      if (start.getFullYear() === end.getFullYear()) {
        if (start.getMonth() === end.getMonth()) {
          return startDay + "–" + endDay + " " + startMonth + " " + start.getFullYear();
        }
        return startDay + " " + startMonth + " – " + endDay + " " + endMonth + " " + start.getFullYear();
      }

      return startDay + " " + startMonth + " " + start.getFullYear() + " – " + endDay + " " + endMonth + " " + end.getFullYear();
    };

    var eventCoversDate = function (event, iso) {
      return iso >= event.start && iso <= (event.end || event.start);
    };

    var eventsForDate = function (semester, iso) {
      return semester.events.filter(function (event) {
        return eventCoversDate(event, iso);
      });
    };

    var makeElement = function (tag, className, text) {
      var element = document.createElement(tag);
      if (className) element.className = className;
      if (text) element.textContent = text;
      return element;
    };

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var todayISO = toISO(new Date());
    var activeIndex = 0;

    calendarSemesters.forEach(function (semester, index) {
      if (todayISO >= semester.start && todayISO <= semester.end) activeIndex = index;
    });

    var tabsRoot = makeElement("div", "calendar-tabs");
    tabsRoot.setAttribute("role", "tablist");
    tabsRoot.setAttribute("aria-label", "Período letivo");

    var panelsRoot = makeElement("div", "calendar-panels");
    var tabButtons = [];
    var panels = [];

    var activateTab = function (index, moveFocus) {
      if (!panels[index]) return;

      tabButtons.forEach(function (button, buttonIndex) {
        var selected = buttonIndex === index;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
      });

      panels.forEach(function (scope, panelIndex) {
        scope.panel.hidden = panelIndex !== index;
      });

      if (moveFocus) tabButtons[index].focus();
    };

    var clearSelection = function (scope) {
      scope.dayButtons.forEach(function (button) {
        button.classList.remove("is-range", "is-selected");
      });

      scope.eventButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", "false");
      });
    };

    var setDetail = function (scope, dateLabel, title, copy) {
      scope.detailDate.textContent = dateLabel;
      scope.detailTitle.textContent = title;
      scope.detailCopy.textContent = copy;
    };

    var markEventButton = function (scope, event) {
      scope.eventButtons.forEach(function (button) {
        if (button.getAttribute("data-event-id") === event.id) {
          button.setAttribute("aria-pressed", "true");
        }
      });
    };

    var selectDate = function (scope, iso) {
      var matches = eventsForDate(scope.semester, iso);

      clearSelection(scope);

      matches.forEach(function (event) {
        markEventButton(scope, event);
      });

      scope.dayButtons.forEach(function (button) {
        var date = button.getAttribute("data-date");

        if (matches.some(function (event) { return eventCoversDate(event, date); })) {
          button.classList.add("is-range");
        }

        if (date === iso) button.classList.add("is-selected");
      });

      if (!matches.length) {
        setDetail(scope, formatFullDate(iso), "Sem acontecimento cadastrado", "Esta data não está entre as principais do calendário acadêmico.");
        return;
      }

      setDetail(
        scope,
        formatFullDate(iso),
        matches.map(function (event) { return event.title; }).join(" · "),
        matches.map(function (event) { return event.description; }).join(" ")
      );
    };

    var selectEvent = function (scope, eventId) {
      var event = null;

      scope.semester.events.forEach(function (item) {
        if (item.id === eventId) event = item;
      });

      if (!event) return;

      clearSelection(scope);
      markEventButton(scope, event);

      scope.dayButtons.forEach(function (button) {
        var date = button.getAttribute("data-date");

        if (eventCoversDate(event, date)) button.classList.add("is-range");
        if (date === event.start) button.classList.add("is-selected");
      });

      setDetail(scope, formatEventDate(event), event.title, event.description);

      var firstDay = null;
      scope.dayButtons.forEach(function (button) {
        if (button.getAttribute("data-date") === event.start) firstDay = button;
      });

      if (!firstDay) return;

      var rect = firstDay.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < 80 || rect.bottom > viewportHeight - 20) {
        firstDay.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center"
        });
      }
    };

    var buildMonth = function (scope, year, monthIndex) {
      var card = makeElement("article", "calendar-month");
      card.appendChild(makeElement("h3", "calendar-month-title", longMonths[monthIndex] + " " + year));

      var table = makeElement("table", "calendar-grid");
      var caption = makeElement("caption", "visually-hidden", longMonths[monthIndex] + " de " + year);
      table.appendChild(caption);

      var thead = document.createElement("thead");
      var headRow = document.createElement("tr");

      shortWeekdays.forEach(function (weekday) {
        var cell = document.createElement("th");
        cell.scope = "col";
        cell.textContent = weekday;
        headRow.appendChild(cell);
      });

      thead.appendChild(headRow);
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      var firstWeekday = new Date(year, monthIndex, 1).getDay();
      var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      var cells = [];
      var day;

      for (day = 0; day < firstWeekday; day += 1) cells.push(null);
      for (day = 1; day <= daysInMonth; day += 1) cells.push(day);
      while (cells.length % 7 !== 0) cells.push(null);

      for (day = 0; day < cells.length; day += 7) {
        var row = document.createElement("tr");

        cells.slice(day, day + 7).forEach(function (dayNumber) {
          var cell = document.createElement("td");

          if (dayNumber === null) {
            cell.appendChild(makeElement("span", "calendar-day", ""));
            row.appendChild(cell);
            return;
          }

          var iso = year + "-" + pad2(monthIndex + 1) + "-" + pad2(dayNumber);
          var dayEvents = eventsForDate(scope.semester, iso);
          var dayElement;

          if (dayEvents.length) {
            dayElement = document.createElement("button");
            dayElement.type = "button";
            dayElement.className = "calendar-day is-event";
            dayElement.setAttribute("data-date", iso);
            dayElement.setAttribute(
              "aria-label",
              formatFullDate(iso) + ": " + dayEvents.map(function (event) { return event.title; }).join("; ")
            );
            scope.dayButtons.push(dayElement);
          } else {
            dayElement = makeElement("span", "calendar-day", "");
          }

          dayElement.textContent = String(dayNumber);
          cell.appendChild(dayElement);
          row.appendChild(cell);
        });

        tbody.appendChild(row);
      }

      table.appendChild(tbody);
      card.appendChild(table);
      return card;
    };

    var buildEventItem = function (scope, event) {
      var item = document.createElement("li");
      var button = makeElement("button", "calendar-event");
      button.type = "button";
      button.setAttribute("data-event-id", event.id);
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", formatEventDate(event) + ": " + event.title + ". " + event.description);

      button.appendChild(makeElement("span", "calendar-event-date", formatEventDate(event)));
      button.appendChild(makeElement("span", "calendar-event-title", event.title));
      button.appendChild(makeElement("span", "calendar-event-copy", event.description));

      scope.eventButtons.push(button);
      item.appendChild(button);
      return item;
    };

    calendarSemesters.forEach(function (semester, index) {
      var tab = makeElement("button", "calendar-tab", semester.label);
      tab.type = "button";
      tab.id = "calendario-tab-" + semester.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "calendario-panel-" + semester.id);
      tab.setAttribute("aria-selected", String(index === activeIndex));
      tab.tabIndex = index === activeIndex ? 0 : -1;

      tab.addEventListener("click", function () {
        activateTab(index, false);
      });

      tab.addEventListener("keydown", function (event) {
        var nextIndex = index;

        if (event.key === "ArrowRight") nextIndex = (index + 1) % calendarSemesters.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + calendarSemesters.length) % calendarSemesters.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = calendarSemesters.length - 1;
        else return;

        event.preventDefault();
        activateTab(nextIndex, true);
      });

      tabsRoot.appendChild(tab);
      tabButtons.push(tab);

      var panel = makeElement("div", "calendar-panel");
      panel.id = "calendario-panel-" + semester.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.hidden = index !== activeIndex;

      var layout = makeElement("div", "calendar-panel-layout");
      var main = makeElement("div", "calendar-main");

      var detail = makeElement("div", "calendar-detail");
      detail.setAttribute("role", "status");
      detail.setAttribute("aria-live", "polite");

      var detailDate = makeElement("p", "calendar-detail-date", "Calendário " + semester.label);
      var detailTitle = makeElement("p", "calendar-detail-title", "Selecione uma data destacada");
      var detailCopy = makeElement(
        "p",
        "calendar-detail-copy",
        "Clique em um dia marcado ou em um acontecimento ao lado para ver a descrição."
      );

      detail.appendChild(detailDate);
      detail.appendChild(detailTitle);
      detail.appendChild(detailCopy);

      var monthsRoot = makeElement("div", "calendar-months");
      var agenda = makeElement("aside", "calendar-agenda");
      agenda.setAttribute("aria-label", "Acontecimentos do período " + semester.label);

      var agendaHead = makeElement("div", "calendar-agenda-head");
      agendaHead.appendChild(makeElement("h3", "", "Acontecimentos"));
      agendaHead.appendChild(makeElement("p", "", "Clique em um acontecimento para destacar as datas no calendário."));

      var eventsRoot = makeElement("ol", "calendar-events");

      var scope = {
        semester: semester,
        panel: panel,
        detailDate: detailDate,
        detailTitle: detailTitle,
        detailCopy: detailCopy,
        dayButtons: [],
        eventButtons: []
      };

      semester.events.forEach(function (event) {
        eventsRoot.appendChild(buildEventItem(scope, event));
      });

      semester.months.forEach(function (month) {
        monthsRoot.appendChild(buildMonth(scope, month.year, month.month));
      });

      panel.addEventListener("click", function (event) {
        if (!event.target.closest) return;

        var dayButton = event.target.closest(".calendar-day[data-date]");
        if (dayButton) {
          selectDate(scope, dayButton.getAttribute("data-date"));
          return;
        }

        var eventButton = event.target.closest(".calendar-event");
        if (eventButton) selectEvent(scope, eventButton.getAttribute("data-event-id"));
      });

      main.appendChild(detail);
      main.appendChild(monthsRoot);
      agenda.appendChild(agendaHead);
      agenda.appendChild(eventsRoot);
      layout.appendChild(main);
      layout.appendChild(agenda);
      panel.appendChild(layout);
      panelsRoot.appendChild(panel);
      panels.push(scope);
    });

    calendarRoot.textContent = "";
    calendarRoot.appendChild(tabsRoot);
    calendarRoot.appendChild(panelsRoot);
  }

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

  /* ---------- TCCs: alternância CC / TADS ---------- */
  var tccRoot = document.querySelector("[data-tcc]");

  if (tccRoot) {
    var tccSwitch = tccRoot.querySelector(".tcc-switch");
    var tccThumb = tccRoot.querySelector(".tcc-switch-thumb");
    var tccTabs = Array.prototype.slice.call(
      tccRoot.querySelectorAll("[data-tcc-tab]")
    );
    var tccPanels = Array.prototype.slice.call(
      tccRoot.querySelectorAll("[data-tcc-panel]")
    );
    var tccCount = tccRoot.querySelector("[data-tcc-count]");
    var tccSwapTimer = null;
    var tccSwapToken = 0;
    var tccMotionQuery = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

    var prefersReducedMotion = function () {
      return Boolean(tccMotionQuery && tccMotionQuery.matches);
    };

    var moveTccThumb = function (tab) {
      if (!tccThumb || !tab) return;
      tccThumb.style.width = tab.offsetWidth + "px";
      tccThumb.style.transform = "translateX(" + tab.offsetLeft + "px)";
    };

    var updateTccCount = function (panel) {
      if (!tccCount || !panel) return;
      var total = panel.querySelectorAll("tbody tr").length;
      tccCount.textContent =
        total + (total === 1 ? " trabalho disponível" : " trabalhos disponíveis");
    };

    var showTccPanel = function (course) {
      var next = null;
      var current = null;

      tccPanels.forEach(function (panel) {
        if (panel.getAttribute("data-tcc-panel") === course) next = panel;
        if (!panel.hidden) current = panel;
      });

      if (!next) return;

      if (current === next && !next.classList.contains("is-leaving")) {
        updateTccCount(next);
        return;
      }

      var token = ++tccSwapToken;
      if (tccSwapTimer) {
        window.clearTimeout(tccSwapTimer);
        tccSwapTimer = null;
      }

      tccPanels.forEach(function (panel) {
        panel.classList.remove("is-entering", "is-leaving");
      });

      if (prefersReducedMotion()) {
        tccPanels.forEach(function (panel) {
          panel.hidden = panel !== next;
        });
        updateTccCount(next);
        return;
      }

      if (current && current !== next) {
        current.classList.add("is-leaving");
        tccSwapTimer = window.setTimeout(function () {
          if (token !== tccSwapToken) return;
          tccSwapTimer = null;

          tccPanels.forEach(function (panel) {
            panel.hidden = panel !== next;
            panel.classList.remove("is-leaving");
          });

          next.classList.remove("is-entering");
          void next.offsetWidth;
          next.classList.add("is-entering");
          updateTccCount(next);
        }, 160);
      } else if (current === next) {
        next.hidden = false;
        void next.offsetWidth;
        next.classList.add("is-entering");
        updateTccCount(next);
      }
    };

    var activateTccTab = function (tab, moveFocus) {
      var course = tab.getAttribute("data-tcc-tab");

      tccTabs.forEach(function (other) {
        var isActive = other === tab;
        other.classList.toggle("is-active", isActive);
        other.setAttribute("aria-selected", String(isActive));
        other.tabIndex = isActive ? 0 : -1;
      });

      moveTccThumb(tab);
      showTccPanel(course);
      if (moveFocus) tab.focus();
    };

    tccTabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activateTccTab(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var target = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          target = tccTabs[(index + 1) % tccTabs.length];
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          target = tccTabs[(index - 1 + tccTabs.length) % tccTabs.length];
        } else if (event.key === "Home") {
          target = tccTabs[0];
        } else if (event.key === "End") {
          target = tccTabs[tccTabs.length - 1];
        }

        if (!target) return;
        event.preventDefault();
        activateTccTab(target, true);
      });
    });

    var initialTccTab = tccTabs.filter(function (tab) {
      return tab.classList.contains("is-active");
    })[0] || tccTabs[0];

    moveTccThumb(initialTccTab);

    if (tccSwitch) {
      if (tccThumb) void tccThumb.offsetWidth;
      tccSwitch.classList.add("is-ready");
    }

    var refreshTccThumb = function () {
      var activeTab = tccTabs.filter(function (tab) {
        return tab.classList.contains("is-active");
      })[0];
      if (activeTab) moveTccThumb(activeTab);
    };

    window.addEventListener("resize", refreshTccThumb);
    window.addEventListener("load", refreshTccThumb);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshTccThumb);
    }
  }

  /* ---------- Ouvidoria: validação e estado do formulário ---------- */
  var ouvidoriaForm = document.querySelector("[data-ouvidoria-form]");

  if (ouvidoriaForm) {
    var ouvidoriaStatus = ouvidoriaForm.querySelector("[data-ouvidoria-status]");
    var ouvidoriaRelato = ouvidoriaForm.querySelector("[data-ouvidoria-relato]");
    var ouvidoriaCounter = ouvidoriaForm.querySelector("[data-ouvidoria-counter]");
    var ouvidoriaCategoria = ouvidoriaForm.querySelector("#ouvidoria-categoria");
    var ouvidoriaOutroWrap = ouvidoriaForm.querySelector("#ouvidoria-outro-wrap");
    var ouvidoriaOutro = ouvidoriaForm.querySelector("#ouvidoria-outro");
    var ouvidoriaData = ouvidoriaForm.querySelector("#ouvidoria-data");

    var updateOuvidoriaCounter = function () {
      if (!ouvidoriaRelato || !ouvidoriaCounter) return;
      var length = ouvidoriaRelato.value.length;
      ouvidoriaCounter.textContent = length + " / 2000";
      ouvidoriaCounter.classList.toggle("is-near", length > 1800);
    };

    var syncOuvidoriaOutro = function () {
      if (!ouvidoriaCategoria || !ouvidoriaOutroWrap || !ouvidoriaOutro) return;
      var isOther = ouvidoriaCategoria.value === "outro";
      ouvidoriaOutroWrap.hidden = !isOther;
      ouvidoriaOutro.required = isOther;
      if (!isOther) ouvidoriaOutro.value = "";
    };

    if (ouvidoriaData) {
      var today = new Date();
      var localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
      ouvidoriaData.max = localToday.toISOString().slice(0, 10);
    }

    if (ouvidoriaRelato) {
      ouvidoriaRelato.addEventListener("input", updateOuvidoriaCounter);
    }

    if (ouvidoriaCategoria) {
      ouvidoriaCategoria.addEventListener("change", syncOuvidoriaOutro);
    }

    ouvidoriaForm.addEventListener("input", function () {
      if (ouvidoriaStatus && !ouvidoriaStatus.hidden) ouvidoriaStatus.hidden = true;
    });

    ouvidoriaForm.addEventListener("submit", function (event) {
      if (!ouvidoriaStatus) return;
      event.preventDefault();

      ouvidoriaStatus.innerHTML = "";

      var title = document.createElement("strong");
      title.textContent = "Formulário validado";

      var message = document.createElement("span");
      message.textContent =
        "O preenchimento está completo. Este canal ainda está em implantação: nenhum dado foi enviado ou armazenado.";

      ouvidoriaStatus.appendChild(title);
      ouvidoriaStatus.appendChild(message);
      ouvidoriaStatus.hidden = false;
      ouvidoriaStatus.focus({ preventScroll: true });
      ouvidoriaStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    ouvidoriaForm.addEventListener("reset", function () {
      window.setTimeout(function () {
        syncOuvidoriaOutro();
        updateOuvidoriaCounter();
        if (ouvidoriaStatus) ouvidoriaStatus.hidden = true;
      }, 0);
    });

    syncOuvidoriaOutro();
    updateOuvidoriaCounter();
  }

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
