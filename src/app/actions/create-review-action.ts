"use server";

import { fetchCreateReview } from "@/api/fetch-review";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetchCreateReview({
      bookId,
      content,
      author,
    });

    console.log(response.status);
  } catch (err) {
    console.error(err);
  }
}
