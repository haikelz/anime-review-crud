import { api } from "../utils/api";
import axios from "axios";

export const updateReview = async <T>(
  anime: T,
  newReview: T,
  setNewReview: (str: string) => void
) => {
  await axios.put(`${api}/update`, {
    animeName: anime,
    review: newReview,
  });

  setNewReview("");
};
