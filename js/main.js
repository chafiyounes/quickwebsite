(function () {
  const toggle = document.querySelector(".site-nav__toggle");
  const menu = document.querySelector(".site-nav__menu");
  const header = document.querySelector(".site-header");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }, { passive: true });
  }

  /* Hero background slideshow */
  const heroSlides = document.querySelectorAll(".hero__slide");
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    setInterval(() => {
      heroSlides[heroIndex].classList.remove("is-active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("is-active");
    }, 6000);
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  const heroReveals = document.querySelectorAll(".hero .reveal");

  heroReveals.forEach((el) => el.classList.add("is-visible"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => {
      if (!el.closest(".hero")) observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Topics carousel */
  const track = document.querySelector(".topics-carousel__track");
  const slides = document.querySelectorAll(".topic-slide");
  const prevBtn = document.querySelector(".carousel-btn--prev");
  const nextBtn = document.querySelector(".carousel-btn--next");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (track && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    let index = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Thème " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    }

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));

    setInterval(() => goTo(index + 1), 8000);
  }

  /* Plaquette carousel */
  const plaquetteTrack = document.querySelector(".plaquette-viewer__track");
  const plaquetteSlides = document.querySelectorAll(".plaquette-slide");
  const plaquettePrev = document.querySelector(".plaquette-viewer__arrow--prev");
  const plaquetteNext = document.querySelector(".plaquette-viewer__arrow--next");
  const plaquetteDots = document.querySelectorAll(".plaquette-viewer__dot");
  const plaquetteLabel = document.getElementById("plaquette-page-label");

  if (plaquetteTrack && plaquetteSlides.length > 0) {
    let pageIndex = 0;

    function goToPage(i) {
      pageIndex = (i + plaquetteSlides.length) % plaquetteSlides.length;
      plaquetteTrack.style.transform = "translateX(-" + pageIndex * 100 + "%)";
      plaquetteDots.forEach((dot) => {
        dot.classList.toggle("is-active", Number(dot.dataset.page) === pageIndex);
      });
      if (plaquetteLabel) {
        plaquetteLabel.textContent = "Page " + (pageIndex + 1) + " / " + plaquetteSlides.length;
      }
    }

    if (plaquettePrev) plaquettePrev.addEventListener("click", () => goToPage(pageIndex - 1));
    if (plaquetteNext) plaquetteNext.addEventListener("click", () => goToPage(pageIndex + 1));
    plaquetteDots.forEach((dot) => {
      dot.addEventListener("click", () => goToPage(Number(dot.dataset.page)));
    });

    goToPage(0);
  }
})();
