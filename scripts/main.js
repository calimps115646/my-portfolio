document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeIcons = document.querySelectorAll("[data-theme-icon]");
  const projectsCarouselEl = document.querySelector("[data-projects-carousel]");
  const projectsNextBtn = document.querySelector("[data-projects-next]");
  const projectsPrevBtn = document.querySelector("[data-projects-prev]");
  const projectDots = document.querySelectorAll("[data-project-dot]");
  const backToTopBtn = document.querySelector("[data-back-to-top]");
  const modalEl = document.querySelector("[data-project-modal]");
  const linkedinModalTrigger = document.querySelector("a[data-linkedin-modal]");
  const linkedinModalCloseBtn = document.querySelector("[data-close-linkedin-modal]");
  const modalTitle = modalEl?.querySelector("[data-modal-title]");
  const modalStack = modalEl?.querySelector("[data-modal-stack]");
  const modalDescription = modalEl?.querySelector("[data-modal-description]");
  const modalMedia = modalEl?.querySelector("[data-modal-media]");
  const modalRole = modalEl?.querySelector("[data-modal-role]");
  const modalContributions = modalEl?.querySelector("[data-modal-contributions]");
  const modalDeploy = modalEl?.querySelector("[data-modal-deploy]");

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
        cta: "View Project Details",
        role: "Frontend Developer and UI/UX Designer",
        stack: ["JavaScript", "CSS", "Figma"],
        contributions: [
          "Designed and prototyped the full user survey flow (Preferred Role, Skills, Interest, and Personality Quiz) in Figma.",
          "Developed wireframes for the View Personality Modal and the AI Card Matches display.",
          "Implemented the complete user survey form logic on the frontend using JavaScript.",
          "Implemented the final UI for the View Personality Modal and AI Card Matches based on the created wireframes.",
          "Ensured all implemented components have a responsive design for optimal viewing across devices."
        ],
        deployUrl: "https://capstoneconnect.netlify.app/",
      },
      {
        title: "Cartella — E-commerce Web Application",
        description:
          "A modern e-commerce platform that connects buyers and sellers. It offers a user-friendly interface for browsing products, filtering options, and secure shopping.",
        image: "assets/images/cartella.JPG",
        alt: "Placeholder portfolio project preview",
        cta: "View Project Details",
        role: "Frontend Developer and UI/UX Designer",
        stack: ["ReactJS", "Figma", "MUI (Material-UI)", "Canva"],
        contributions: [
          "Designed and prototyped the complete, dual-sided (Vendor and Buyer) e-commerce platform flow in Figma, and created the platform logo using Canva.",
          "Implemented the entire application frontend using ReactJS.",
          "Utilized MUI (Material-UI) components extensively to build a consistent and modern user interface.",
          "Developed the entire solution with a focus on responsive design, ensuring optimal viewing and functionality across all device sizes.",
        ],
        deployUrl: "https://cartellag5.netlify.app/",
      },
      {
        title: "FitTrack — Social Gym & Workout Logger",
        description:
          "FitTrack is a modern gym membership platform that allows users to log workouts, set and track fitness goals, and interact with others through social posts. Members can view workout history, post updates, and manage their fitness journey with a user-friendly interface.",
        image: "assets/images/fittrack.JPG",
        alt: "Upcoming project placeholder preview",
        cta: "View Project Details",
        role: "Frontend Developer and UI/UX Designer",
        stack: ["ReactJS", "CSS", "Figma", "Java"],
        contributions: [
          "Designed the wireframes in Figma for the View Post, Like, and Comment social features.",
          "Implemented the entire social feature frontend (View Post, Like, Comment) using ReactJS and CSS.",
          "Ensured the implemented social features have a fully responsive design for seamless use across all devices."
        ],
        videoUrl: "assets/video/fittrack.mp4",
        videoPoster: "assets/images/fittrack.JPG"
      },
    ];

    let currentIndex = 0;
    let autoTimer;
    let isModalOpen = false;

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
        ctaBtn.disabled = false;
        ctaBtn.onclick = () => {
          openProjectModal(project);
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

    const pauseAutoTimer = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
      }
    };

    const closeProjectModal = () => {
      if (!modalEl) return;
      modalEl.classList.remove("is-visible");
      document.body.style.overflow = "";
      isModalOpen = false;
      resetAutoTimer();
    };

    const openProjectModal = (project) => {
      if (!modalEl || !project) return;
      pauseAutoTimer();
      isModalOpen = true;

      if (modalTitle) modalTitle.textContent = project.title;
      if (modalDescription)
        modalDescription.textContent = project.description;
      if (modalRole) modalRole.textContent = project.role || "";

      if (modalStack) {
        modalStack.innerHTML = "";
        (project.stack || []).forEach((tech) => {
          const chip = document.createElement("span");
          chip.className = "project-modal__stack-chip";
          chip.textContent = tech;
          modalStack.appendChild(chip);
        });
      }

      if (modalContributions) {
        modalContributions.innerHTML = "";
        (project.contributions || []).forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          modalContributions.appendChild(li);
        });
      }

      if (modalMedia) {
        modalMedia.innerHTML = "";
        const mediaWrapper = modalMedia.parentElement;
        if (project.videoUrl) {
          const video = document.createElement("video");
          video.src = project.videoUrl;
          if (project.videoPoster) {
            video.poster = project.videoPoster;
          }
          video.controls = true;
          video.playsInline = true;
          modalMedia.appendChild(video);
          // Mark wrapper for video centering
          if (mediaWrapper) {
            mediaWrapper.setAttribute("data-has-video", "true");
          }
        } else if (project.image) {
          const img = document.createElement("img");
          img.src = project.image;
          img.alt = project.alt || project.title;
          modalMedia.appendChild(img);
          // Remove video marker if switching to image
          if (mediaWrapper) {
            mediaWrapper.removeAttribute("data-has-video");
          }
        }
      }

      if (modalDeploy) {
        if (project.deployUrl) {
          modalDeploy.style.display = "inline-flex";
          modalDeploy.setAttribute("href", project.deployUrl);
          modalDeploy.removeAttribute("aria-disabled");
        } else {
          modalDeploy.style.display = "none";
          modalDeploy.setAttribute("aria-disabled", "true");
        }
      }


      modalEl.classList.add("is-visible");
      document.body.style.overflow = "hidden";
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

    // Modal bindings
    if (modalEl) {
      const closeTriggers = modalEl.querySelectorAll("[data-close-modal]");
      closeTriggers.forEach((el) =>
        el.addEventListener("click", () => {
          closeProjectModal();
        })
      );

      // Removed backdrop click to close - only X button closes modal

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isModalOpen) {
          closeProjectModal();
        }
      });
    }
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

  // LinkedIn Modal functionality
  const linkedinModal = document.querySelector(".linkedin-modal");
  let isLinkedInModalOpen = false;

  const openLinkedInModal = () => {
    if (!linkedinModal) return;
    linkedinModal.classList.add("is-visible");
    document.body.style.overflow = "hidden";
    isLinkedInModalOpen = true;
  };

  const closeLinkedInModal = () => {
    if (!linkedinModal) return;
    linkedinModal.classList.remove("is-visible");
    document.body.style.overflow = "";
    isLinkedInModalOpen = false;
  };

  if (linkedinModalTrigger) {
    linkedinModalTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openLinkedInModal();
    });
  }

  if (linkedinModalCloseBtn) {
    linkedinModalCloseBtn.addEventListener("click", () => {
      closeLinkedInModal();
    });
  }

  // Only close with X button, not backdrop click
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isLinkedInModalOpen) {
      closeLinkedInModal();
    }
  });
});


