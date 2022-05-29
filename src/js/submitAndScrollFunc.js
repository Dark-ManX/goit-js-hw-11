import { createGallery } from "./createGallery";
import { fetchRes } from "./fetch";
import simpleLightbox from "simplelightbox";

const throttle = require("lodash.throttle");

export const refs = {
  form: document.querySelector(".search-form"),
  gallery: document.querySelector(".gallery"),
};

let page;
export const countPerPage = 40;

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

    window.addEventListener(
      "scroll",
      throttle(async () => {
        const elHeight = document
          .querySelector(".gallery")
          .getBoundingClientRect();

        if (
          elHeight.bottom < document.documentElement.clientHeight * 2 &&
          page < result.totalHits / countPerPage
        ) {
          page += 1;
          result = await fetchRes(request, page);
          console.log(result);
          return createGallery(result.hits);
        }
      }, 1000)
    );
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  page,
  countPerPage,
};
