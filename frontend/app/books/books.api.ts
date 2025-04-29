const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllBooks() {
  const response = await fetch(`${API_URL}/books`);
  const books = await response.json();

  return books;
}
