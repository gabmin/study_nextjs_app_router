import { endpoints } from "./endpoints";

export const fetchCreateReview = async ({
  bookId,
  content,
  author,
}: {
  bookId: string;
  content: string;
  author: string;
}) => {
  const response = await fetch(endpoints.createReview, {
    method: "POST",
    body: JSON.stringify({
      bookId,
      content,
      author,
    }),
  });

  return response;
};
