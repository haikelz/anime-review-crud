import { api } from "../utils/api";
import axios from "axios";

export const getData = async (setReviewList: any) => {
  await axios
    .get(`${api}/get`)
    .then((response) => setReviewList(response.data));
};
