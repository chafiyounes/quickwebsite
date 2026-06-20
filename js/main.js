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

  /* Documents viewer (affiche / plaquette) */
  const docTrack = document.querySelector(".doc-viewer__track");
  const docSlides = document.querySelectorAll(".doc-slide");
  const docPrev = document.querySelector(".doc-viewer__arrow--prev");
  const docNext = document.querySelector(".doc-viewer__arrow--next");
  const docDots = document.querySelectorAll(".doc-viewer__dot");
  const docLabel = document.getElementById("doc-viewer-label");
  const docDownloads = document.querySelectorAll(".doc-download");

  const docTitles = ["Affiche officielle", "Plaquette"];

  if (docTrack && docSlides.length > 0) {
    let docIndex = 0;

    function goToDoc(i) {
      docIndex = (i + docSlides.length) % docSlides.length;
      docTrack.style.transform = "translateX(-" + docIndex * 100 + "%)";
      docDots.forEach((dot) => {
        dot.classList.toggle("is-active", Number(dot.dataset.docIndex) === docIndex);
      });
      if (docLabel) docLabel.textContent = docTitles[docIndex];
      docDownloads.forEach((btn) => {
        btn.hidden = !btn.classList.contains("doc-download--" + docIndex);
      });
    }

    if (docPrev) docPrev.addEventListener("click", () => goToDoc(docIndex - 1));
    if (docNext) docNext.addEventListener("click", () => goToDoc(docIndex + 1));
    docDots.forEach((dot) => {
      dot.addEventListener("click", () => goToDoc(Number(dot.dataset.docIndex)));
    });

    goToDoc(0);
  }
})();
