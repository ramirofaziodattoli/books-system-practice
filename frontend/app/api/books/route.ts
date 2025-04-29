import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const res = await fetch(`${API_URL}/books`);
  const books = await res.json();

  return NextResponse.json(books);
}
