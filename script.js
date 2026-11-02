const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});

const projectGalleries = {
    "scam-shield": [
        "assets/projects/scam-shield-1.jpeg",
        "assets/projects/scam-shield-2.jpeg",
        "assets/projects/scam-shield-3.jpeg",
        "assets/projects/scam-shield-4.jpeg"
    ],
    "askarina": [
        "assets/projects/askarina-1.png"
    ],
    "mindspace": [
        "assets/projects/mindspace-1.png"
    ]
};

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentGallery = [];
let currentIndex = 0;

function openLightbox(projectKey) {
    currentGallery = projectGalleries[projectKey] || [];
    if (currentGallery.length === 0) return;
    currentIndex = 0;
    updateLightboxImage();
    lightbox.classList.add("open");
}

function updateLightboxImage() {
    lightboxImage.src = currentGallery[currentIndex];
    lightboxCounter.textContent = (currentIndex + 1) + " / " + currentGallery.length;

    const single = currentGallery.length <= 1;
    lightboxPrev.style.display = single ? "none" : "";
    lightboxNext.style.display = single ? "none" : "";
    lightboxCounter.style.display = single ? "none" : "";
}

function closeLightbox() {
    lightbox.classList.remove("open");
}

function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

document.querySelectorAll(".project-item").forEach(function (item) {
    item.addEventListener("click", function () {
        const projectKey = item.getAttribute("data-project");
        openLightbox(projectKey);
    });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", function (e) { e.stopPropagation(); showPrev(); });
lightboxNext.addEventListener("click", function (e) { e.stopPropagation(); showNext(); });

lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
});