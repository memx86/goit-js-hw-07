import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join("");

galleryRef.innerHTML = galleryMarkup;

const lightboxOptions = {
  captions: true,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionDelay: 250,
};
let gallery = new SimpleLightbox(".gallery a", lightboxOptions);

function createGalleryItemMarkup({ preview, original, description }) {
  return `
<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
`;
}
