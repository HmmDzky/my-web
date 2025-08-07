// Image loading detection and management
function checkImageLoaded(element, imagePath) {
  const img = new Image();
  img.onload = function () {
    element.classList.add("image-loaded");
    element.classList.remove("loading-placeholder");
    const icon = element.querySelector("i");
    if (icon) icon.style.display = "none";
  };
  img.onerror = function () {
    console.log("Image failed to load:", imagePath);
  };
  img.src = imagePath;
}

document.addEventListener("DOMContentLoaded", function () {
  const bridePhoto = document.querySelector(".couple-photo.bride");
  const groomPhoto = document.querySelector(".couple-photo.groom");
  if (bridePhoto) checkImageLoaded(bridePhoto, "bride-photo.jpg");
  if (groomPhoto) checkImageLoaded(groomPhoto, "groom-photo.jpg");

  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    const imagePath = `gallery-${index + 1}.jpg`;
    checkImageLoaded(item, imagePath);
  });

  // Autoplay music on page load
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("musicBtn");
  const musicIcon = document.getElementById("musicIcon");

  if (music) {
    music
      .play()
      .then(() => {
        isPlaying = true;
        musicBtn?.classList.add("playing");
        if (musicIcon) musicIcon.className = "fas fa-pause";
      })
      .catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Navigation scroll effect
window.addEventListener("scroll", function () {
  const nav = document.getElementById("nav");
  if (nav && window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else if (nav) {
    nav.classList.remove("scrolled");
  }
});

// Fade-in
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Countdown timer
function updateCountdown() {
  const weddingDate = new Date("2024-09-15T08:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  if (distance < 0) {
    document.getElementById("countdown").innerHTML =
      '<h3 style="color: white;">Hari Bahagia Telah Tiba!</h3>';
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Form
document.getElementById("rsvpForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    name: formData.get("name"),
    attendance: formData.get("attendance"),
    guests: formData.get("guests"),
    message: formData.get("message"),
  };

  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(`Terima kasih ${data.name}! Konfirmasi Anda telah diterima.`);
    this.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Music
let isPlaying = false;
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");

function toggleMusic() {
  if (!music) return;

  if (isPlaying) {
    music.pause();
    musicBtn?.classList.remove("playing");
    if (musicIcon) musicIcon.className = "fas fa-music";
    isPlaying = false;
  } else {
    music
      .play()
      .then(() => {
        musicBtn?.classList.add("playing");
        if (musicIcon) musicIcon.className = "fas fa-pause";
        isPlaying = true;
      })
      .catch((err) => {
        console.warn("Play blocked:", err);
      });
  }
}

// Tombol buka undangan
document
  .getElementById("openInvitationBtn")
  ?.addEventListener("click", function () {
    const landingPage = document.getElementById("landing");
    if (landingPage) landingPage.style.display = "none";
    toggleMusic(); // play music
  });

// Open Maps
function openMaps(location) {
  const encodedLocation = encodeURIComponent(location);
  window.open(
    `https://www.google.com/maps/search/${encodedLocation}`,
    "_blank"
  );
}

// Gallery click anim
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1.05)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    }, 100);
  });
});

// Bottom nav highlight
function updateActiveNavItem() {
  const sections = document.querySelectorAll(".section, .hero, .countdown");
  const navItems = document.querySelectorAll(".bottom-nav-item");
  let currentSection = "home";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    if (
      sectionTop <= window.innerHeight / 2 &&
      sectionTop + sectionHeight > window.innerHeight / 2
    ) {
      currentSection = section.id || "home";
    }
  });

  navItems.forEach((item) => {
    const section = item.getAttribute("data-section");
    if (section === currentSection) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavItem);

document.querySelectorAll(".bottom-nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".bottom-nav-item").forEach((navItem) => {
      navItem.classList.remove("active");
    });
    this.classList.add("active");

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

// Preload
function preloadImages() {
  const imagesToPreload = [
    "hero-bg.jpg",
    "bride-photo.jpg",
    "groom-photo.jpg",
    "gallery-1.jpg",
    "gallery-2.jpg",
    "gallery-3.jpg",
  ];
  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

window.addEventListener("load", function () {
  updateActiveNavItem();
  preloadImages();
  document.body.classList.add("loaded");
  console.log("Wedding invitation loaded successfully!");
});

// Handle image errors
window.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      console.log("Image failed to load:", e.target.src);
    }
  },
  true
);

// Keyboard nav
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
      e.preventDefault();
      const currentActive = document.querySelector(".bottom-nav-item.active");
      if (currentActive) {
        const allItems = Array.from(
          document.querySelectorAll(".bottom-nav-item")
        );
        const currentIndex = allItems.indexOf(currentActive);
        let nextIndex =
          e.key === "ArrowUp"
            ? currentIndex > 0
              ? currentIndex - 1
              : allItems.length - 1
            : currentIndex < allItems.length - 1
            ? currentIndex + 1
            : 0;
        allItems[nextIndex].click();
      }
      break;
    case " ":
    case "Spacebar":
      if (e.target === document.body) {
        e.preventDefault();
        toggleMusic();
      }
      break;
  }
});
