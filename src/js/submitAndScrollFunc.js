import { createGallery } from "./createGallery";
import simpleLightbox from "simplelightbox";
import Notiflix from "notiflix";

const axios = require("axios").default;

export const refs = {
  form: document.querySelector(".search-form"),
  gallery: document.querySelector(".gallery"),
};

let page;
const countPerPage = 40;

const fetchRes = async (name, page) => {
  const URL = `https://pixabay.com/api/`;
  try {
    const response = await axios.get(
      `${URL}?key=27564441-2bad7552450aa73f501c58b21&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&safesearch=true&page=${page}&per_page=${countPerPage}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

refs.form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  try {
    e.preventDefault();

    refs.gallery.innerHTML = "";

    page = 1;

    const request = e.currentTarget.elements.searchQuery.value;

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
