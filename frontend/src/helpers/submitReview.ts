import { api } from "../utils/api";
import axios from "axios";

export const submitReview = async <T>(
  animeName: T,
  review: T,
  reviewList: any,
  setReviewList: any
) => {
  await axios.post(`${api}/insert`, {
    animeName: animeName,
    review: review,
  });

  setReviewList([...reviewList, { animeName: animeName, review: review }]);
};
