import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join("");

galleryRef.innerHTML = galleryMarkup;
galleryRef.addEventListener("click", onGalleryImageClick);

function createGalleryItemMarkup({ preview, original, description }) {
  return `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
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
  const instance = basicLightbox.create(
    `
    <img src="${imageSrc}" width="800" height="600">
`,
    {
      onShow: onModalShow,
      onClose: onModalCLose,
    }
  );
  document.modal = instance;
  instance.show();
}
function onModalShow() {
  document.addEventListener("keydown", onEscPress);
}
function onEscPress(e) {
  if (e.code !== "Escape") {
    return;
  }
  document.modal.close();
}
function onModalCLose() {
  document.removeEventListener("keydown", onEscPress);
  delete document.modal;
}
