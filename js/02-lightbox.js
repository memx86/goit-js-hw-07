import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join("");

galleryRef.innerHTML = galleryMarkup;

if ("loading" in HTMLImageElement.prototype) {
  setImgSrc();
} else {
  createLazySizesScript();
}

const lightboxOptions = {
  captions: true,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionDelay: 250,
};
let gallery = new SimpleLightbox(".gallery__item", lightboxOptions);

function createGalleryItemMarkup({ preview, original, description }) {
  return `
<a class="gallery__item" href="${original}">
  <img class="gallery__image lazyload" loading="lazy" data-src="${preview}" alt="${description}" />
</a>
`;
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
