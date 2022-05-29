import { createGallery } from "./createGallery";
import { fetchRes } from "./fetch";
import simpleLightbox from "simplelightbox";

export const refs = {
  form: document.querySelector(".search-form"),
  gallery: document.querySelector(".gallery"),
};

let page;
const countPerPage = 40;

refs.form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  try {
    e.preventDefault();

    refs.gallery.innerHTML = "";

    page = 1;

    const request = e.currentTarget.elements.searchQuery.value.trim();

    if (request === "") return;

    let result = await fetchRes(request, page);

    createGallery(result.hits);

    new simpleLightbox(".gallery a");

    window.addEventListener("scroll", async () => {
      const elHeight = document
        .querySelector(".gallery")
        .getBoundingClientRect();

      if (
        elHeight.bottom < document.documentElement.clientHeight + 150 &&
        page < result.totalHits / countPerPage
      ) {
        page += 1;
        result = await fetchRes(request, page);
        return createGallery(result.hits);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  page,
  countPerPage,
};
