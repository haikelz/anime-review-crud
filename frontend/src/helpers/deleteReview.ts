import { api } from "../utils/api";
import axios from "axios";

export const deleteReview = async <T>(anime: T) => {
  await axios.delete(`${api}/delete/${anime}`);
};
