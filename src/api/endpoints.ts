let defaultUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

if (process.env.NODE_ENV === "production") {
  defaultUrl = process.env.NEXT_PUBLIC_API_DEPLOY_SERVER_URL;
}

export const endpoints = {
  allBooks: `${defaultUrl}/book`,
  randomBooks: `${defaultUrl}/book/random`,
  searchBooks: `${defaultUrl}/book/search`,
};
