// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
const imgArr = galleryItems.map(({ preview, original, description }) => {
  return `
  <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
  </a>
`;
});

gallery.innerHTML = imgArr.join('');

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

//css
let style = document.createElement('STYLE');
style.type = 'text/css';
style.innerHTML =
  '.sl-overlay {background: linear-gradient(0deg, rgba(120,121,9,1) 0%, rgba(0,6,179,1) 100%);}';
document.querySelector('body').append(style);
