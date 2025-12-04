document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeIcons = document.querySelectorAll("[data-theme-icon]");
  const projectsCarouselEl = document.querySelector("[data-projects-carousel]");
  const projectsNextBtn = document.querySelector("[data-projects-next]");
  const projectsPrevBtn = document.querySelector("[data-projects-prev]");
  const projectDots = document.querySelectorAll("[data-project-dot]");
  const backToTopBtn = document.querySelector("[data-back-to-top]");
  const viewMoreBtn = document.querySelector("[data-view-more]");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  // Initialize theme
  const isDarkStart = savedTheme
    ? savedTheme === "dark"
    : prefersDark;

  if (isDarkStart) {
    document.body.classList.add("theme-dark");
  }

  // Apply correct icon sources based on theme
  const applyThemeIcons = (isDark) => {
    themeIcons.forEach((icon) => {
      const lightSrc = icon.getAttribute("data-light-src");
      const darkSrc = icon.getAttribute("data-dark-src");

      if (isDark && darkSrc) {
        icon.setAttribute("src", darkSrc);
      } else if (!isDark && lightSrc) {
        icon.setAttribute("src", lightSrc);
      }
    });
  };

  applyThemeIcons(isDarkStart);

  // Theme toggle handler
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("theme-dark");
      const isDark = document.body.classList.contains("theme-dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      applyThemeIcons(isDark);
    });
  }

  // Simple projects carousel (3 slides, auto-advance every 6 seconds)
  if (projectsCarouselEl) {
    const previewImg = projectsCarouselEl.querySelector(".project-preview img");
    const titleEl = projectsCarouselEl.querySelector(".project-details h3");
    const ctaBtn = projectsCarouselEl.querySelector(".project-details__cta-wrapper .project-details__cta");

    const projects = [
      {
        title: "CapstoneConnect — Team Formation with AI",
        description:
          "A smart system that uses AI to put students into capstone project teams. It pairs them based on technical skills, project interests, and compatibility. It finds good matches by understanding the meaning of their information and gives automatic team ideas.",
        image: "assets/images/capstoneconnect.JPG",
        alt: "CapstoneConnect landing page preview",
        href: "#",
        cta: "View Project Details",
      },
      {
        title: "Cartella — E-commerce Web Application",
        description:
          "A modern e-commerce platform with product catalog, shopping cart, user authentication, and secure payment processing. Built with Spring Boot backend and responsive frontend design.",
        image: "assets/images/cartella.JPG",
        alt: "Placeholder portfolio project preview",
        href: "#",
        cta: "View Project Details",
      },
      {
        title: "FitTrack — Social Gym & Workout Logger",
        description:
          "A reserved slot for a future project. Once the project is ready, this area will showcase its overview, goals, and key features.",
        image: "assets/images/fittrack.JPG",
        alt: "Upcoming project placeholder preview",
        href: "#",
        cta: "View Project Details",
      },
    ];

    let currentIndex = 0;
    let autoTimer;

    const setActiveDot = (index) => {
      projectDots.forEach((dot) => {
        if (Number(dot.getAttribute("data-project-dot")) === index) {
          dot.classList.add("is-active");
        } else {
          dot.classList.remove("is-active");
        }
      });
    };

    const showProject = (index) => {
      const project = projects[index];
      if (!project) return;

      // Add fade-out animation
      previewImg.classList.add("fade-out");
      titleEl.classList.add("fade-out");

      // After fade-out completes, update content and fade-in
      setTimeout(() => {
        previewImg.src = project.image;
        previewImg.alt = project.alt;
        titleEl.textContent = project.title;
        ctaBtn.textContent = project.cta;
        ctaBtn.disabled = project.href === "#";

        ctaBtn.onclick = () => {
          if (project.href && project.href !== "#") {
            window.open(project.href, "_blank");
          }
        };

        // Remove fade-out, add fade-in
        previewImg.classList.remove("fade-out");
        titleEl.classList.remove("fade-out");
        previewImg.classList.add("fade-in");
        titleEl.classList.add("fade-in");

        // Remove fade-in class after animation completes
        setTimeout(() => {
          previewImg.classList.remove("fade-in");
          titleEl.classList.remove("fade-in");
        }, 600);
      }, 500);

      currentIndex = index;
      setActiveDot(currentIndex);
    };

    const nextProject = () => {
      const nextIndex = (currentIndex + 1) % projects.length;
      showProject(nextIndex);
    };

    const prevProject = () => {
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      showProject(prevIndex);
    };

    const resetAutoTimer = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
      }
      autoTimer = setInterval(nextProject, 6000);
    };

    // Initialize
    showProject(currentIndex);
    resetAutoTimer();

    if (projectsNextBtn) {
      projectsNextBtn.addEventListener("click", () => {
        nextProject();
        resetAutoTimer();
      });
    }

    if (projectsPrevBtn) {
      projectsPrevBtn.addEventListener("click", () => {
        prevProject();
        resetAutoTimer();
      });
    }

    projectDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.getAttribute("data-project-dot"));
        if (!Number.isNaN(index)) {
          showProject(index);
          resetAutoTimer();
        }
      });
    });
  }

  // Back-to-top visibility and behavior
  if (backToTopBtn) {
    const updateBackToTopVisibility = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 120;

      if (scrolledToBottom) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", updateBackToTopVisibility, {
      passive: true,
    });
    updateBackToTopVisibility();

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Footer visibility transition
  const footer = document.querySelector(".site-footer");
  if (footer) {
    const updateFooterVisibility = () => {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if footer is in viewport
      if (footerRect.top < windowHeight && footerRect.bottom > 0) {
        footer.classList.add("is-visible");
      }
    };

    window.addEventListener("scroll", updateFooterVisibility, {
      passive: true,
    });
    updateFooterVisibility();
  }
});


