(function () {
  var steps = [
    {
      src: "assets/screenshots/01_home.png",
      alt: "PackOtter home screen showing trip list",
      caption: "All your trips on one screen",
    },
    {
      src: "assets/screenshots/02_wizard_travelers.png",
      alt: "Trip wizard asking who is traveling",
      caption: "Add who's traveling",
    },
    {
      src: "assets/screenshots/03_wizard_trip_type.png",
      alt: "Trip wizard for trip type and activities",
      caption: "Choose trip type and activities",
    },
    {
      src: "assets/screenshots/04_wizard_climate.png",
      alt: "Trip wizard for climate and luggage",
      caption: "Set climate and luggage",
    },
    {
      src: "assets/screenshots/05_checklist.png",
      alt: "Generated packing checklist",
      caption: "Get a tailored list — grouped by traveler",
    },
    {
      src: "assets/screenshots/06_checklist_packed.png",
      alt: "Checklist with packed items checked off",
      caption: "Check items off as you pack",
    },
    {
      src: "assets/screenshots/07_share_menu.png",
      alt: "Share and export menu",
      caption: "Share lists or export",
    },
    {
      src: "assets/screenshots/08_settings.png",
      alt: "Settings screen with privacy options",
      caption: "No account, no ads, no tracking",
    },
  ];

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
})();
