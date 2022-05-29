import { page, countPerPage } from "./submitAndScrollFunc";
import Notiflix from "notiflix";

const axios = require("axios").default;

export const fetchRes = async (name, page) => {
  const URL = `https://pixabay.com/api/`;
  try {
    const response = await axios.get(
      `${URL}?key=27564441-2bad7552450aa73f501c58b21&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&safesearch=true&page=${page}&per_page=${countPerPage}`
    );
    if (response.data.totalHits === 0) {
      return Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
