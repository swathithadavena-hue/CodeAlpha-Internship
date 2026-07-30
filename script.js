const images = [
  "image.jpg",
  "img 3.jpg",
  "nature.jpg",
  "nature 2.webp",
  "nature 3.webp",
  "nature 4.jpg",
  "city 1.jpg",
  "city 2.jpg",
  "city 3.jpg",
  "animal 3.jpg",
  "animal 4.jpg",
  "animal.jpg",
];

let current = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

function openLightbox(index) {
  current = index;
  lightbox.style.display = "flex";
  lightboxImage.src = images[current];
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function changeImage(step) {
  current += step;

  if (current < 0) {
    current = images.length - 1;
  }

  if (current >= images.length) {
    current = 0;
  }

  lightboxImage.src = images[current];
}

function filterImages(category) {
  const gallery = document.querySelectorAll(".image");

  gallery.forEach(function (image) {
    if (category === "all") {
      image.style.display = "block";
    } else if (image.classList.contains(category)) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    changeImage(1);
  }

  if (e.key === "ArrowLeft") {
    changeImage(-1);
  }
});
