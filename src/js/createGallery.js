import { refs } from "./submitAndScrollFunc";

export const createGallery = (name) => {
  name.map((el) => {
    refs.gallery.insertAdjacentHTML(
      "beforeend",
      `<a class="card-link" href="${el.largeImageURL}">
        <div class="photo-card">
        <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes</b> </br>
            ${el.likes}
            </p>
            <p class="info-item">
            <b>Views</b> </br>
            ${el.views}
            </p>
            <p class="info-item">
            <b>Comments</b> </br>
            ${el.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b> </br>
            ${el.downloads}
            </p>
        </div>
        </div></a>      
      `
    );
  });
};
