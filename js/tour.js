(function () {
  // Play Store phone screenshots (pack-otter-app: npm run play:screenshots:site), in app-flow order.
  var steps = [
    { src: "assets/screenshots/03_wizard_travelers.png", alt: "Trip wizard asking who is going, with travelers Alex, Sam and Jordan", caption: "Add who's going" },
    { src: "assets/screenshots/05_wizard_trip_basics.png", alt: "Trip wizard with trip name, trip type and duration", caption: "Name the trip and pick a type" },
    { src: "assets/screenshots/06_wizard_climate_activities.png", alt: "Trip wizard with climate, activities and options like traveling with kids", caption: "Tune it to the weather and plans" },
    { src: "assets/screenshots/04_wizard_before_you_leave.png", alt: "Before you leave step with travel and home prep toggles", caption: "Turn on before-you-leave prep" },
    { src: "assets/screenshots/01_traveler_packing_list.png", alt: "Alex's packing list grouped by category with items checked off", caption: "A packing list for each traveler" },
    { src: "assets/screenshots/02_before_you_leave_list.png", alt: "Shared list of before-you-leave tasks like arranging a pet sitter", caption: "Prep tasks live with the packing" },
    { src: "assets/screenshots/07_share_traveler_list.png", alt: "Trip menu with Share Alex's list, Duplicate and Archive", caption: "Share a traveler's list with a link" },
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
