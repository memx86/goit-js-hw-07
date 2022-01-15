import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join("");
let instance;

galleryRef.innerHTML = galleryMarkup;
if ("loading" in HTMLImageElement.prototype) {
  setImgSrc();
} else {
  createLazySizesScript();
}
galleryRef.addEventListener("click", onGalleryImageClick);

function createGalleryItemMarkup({ preview, original, description }) {
  return `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image lazyload"
      loading="lazy"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;
}
function onGalleryImageClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  const imageSrc = e.target.dataset.source;
  instance = basicLightbox.create(
    `
    <img src="${imageSrc}" width="800" height="600">
`,
    {
      onShow: onModalShow,
      onClose: onModalCLose,
    }
  );
  instance.show();
}
function onModalShow() {
  document.addEventListener("keydown", onEscPress);
}
function onEscPress(e) {
  if (e.code !== "Escape") {
    return;
  }
  instance.close();
}
function onModalCLose() {
  document.removeEventListener("keydown", onEscPress);
}
function setImgSrc() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
}
function createLazySizesScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerpolicy = "no-referrer";
  document.body.appendChild(script);
}
