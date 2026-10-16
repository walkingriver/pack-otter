(function () {
  // Current capture set (android/scripts/capture-play-screenshots.js).
  var CURRENT = [
    { src: "assets/screenshots/01_wizard_travelers.png", alt: "Trip wizard asking who is traveling", caption: "Add who's going" },
    { src: "assets/screenshots/02_wizard_trip_type.png", alt: "Trip wizard for trip type and duration", caption: "Pick the trip type" },
    { src: "assets/screenshots/03_wizard_before_you_leave.png", alt: "Before you leave step with prep toggles", caption: "Turn on before-you-leave prep" },
    { src: "assets/screenshots/04_checklist.png", alt: "Generated checklist grouped by traveler", caption: "Get a tailored list in seconds" },
    { src: "assets/screenshots/05_checklist_packed.png", alt: "Checklist with items checked off", caption: "Check items off as you pack" },
    { src: "assets/screenshots/06_trip_menu.png", alt: "Trip menu with duplicate, add traveler and archive", caption: "Duplicate, add travelers, or archive" },
    { src: "assets/screenshots/07_home_trips.png", alt: "Home screen with trip list", caption: "All your trips on one screen" },
    { src: "assets/screenshots/08_settings.png", alt: "Settings screen", caption: "No account, no ads, no tracking" },
  ];
  // Older capture set: only the screens without capture glitches.
  var LEGACY = [
    { src: "assets/screenshots/02_wizard_travelers.png", alt: "Trip wizard asking who is traveling", caption: "Add who's going" },
    { src: "assets/screenshots/05_checklist.png", alt: "Generated checklist grouped by traveler", caption: "Get a tailored list in seconds" },
    { src: "assets/screenshots/07_share_menu.png", alt: "Checklist with items checked off and the trip menu open", caption: "Check items off, then duplicate for next time" },
    { src: "assets/screenshots/06_checklist_packed.png", alt: "Home screen with trip list", caption: "All your trips on one screen" },
  ];
  var steps = LEGACY;

  var root = document.querySelector("[data-tour]");
  if (!root) return;

  var img = root.querySelector("[data-tour-img]");
  var caption = root.querySelector("[data-tour-caption]");
  var counter = root.querySelector("[data-tour-counter]");
  var prevBtn = root.querySelector("[data-tour-prev]");
  var nextBtn = root.querySelector("[data-tour-next]");
  var dots = root.querySelector("[data-tour-dots]");
  var index = 0;

  function renderDots() {
    dots.innerHTML = "";
    steps.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "tour-dot" + (i === index ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
      dot.setAttribute("aria-label", "Screen " + (i + 1) + " of " + steps.length);
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dots.appendChild(dot);
    });
  }

  function goTo(nextIndex) {
    index = (nextIndex + steps.length) % steps.length;
    var step = steps[index];
    img.src = step.src;
    img.alt = step.alt;
    caption.textContent = step.caption;
    counter.textContent = (index + 1) + " / " + steps.length;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === steps.length - 1;
    renderDots();
  }

  prevBtn.addEventListener("click", function () {
    goTo(index - 1);
  });

  nextBtn.addEventListener("click", function () {
    goTo(index + 1);
  });

  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  });

  goTo(0);

  // Switch to the full current set once its screenshots are deployed.
  var probe = new Image();
  probe.onload = function () {
    steps = CURRENT;
    goTo(0);
  };
  probe.src = CURRENT[2].src;
})();
