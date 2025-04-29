import React from "react";

async function getAllBooks() {
  try {
    const res = await fetch("http://localhost:3000/api/books");

    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function BooksPage() {
  const books = await getAllBooks();

  return (
    <section className="w-screen border-2-red h-screen grid place-items-center ">
      {books.map((b: any) => (
        <BookCard title={b.title} key={b.id} />
      ))}
    </section>
  );
}

const BookCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-[200px] h-[100px] bg-red-500">
      <h1 className="text-black">{title}</h1>
    </div>
  );
};
