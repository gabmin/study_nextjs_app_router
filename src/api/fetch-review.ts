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
  const response = await fetch(endpoints.review, {
    method: "POST",
    body: JSON.stringify({
      bookId,
      content,
      author,
    }),
  });

  return response;
};

export const fetchReadReview = async (bookId: string) => {
  const response = await fetch(`${endpoints.review}/book/${bookId}`);

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviewData = await response.json();

  return reviewData;
};
