import { notFound } from "next/navigation";

// Catch-all: any /[lang]/... address that matches no other route lands here,
// so it gets the translated not-found page inside the site layout instead of
// Next.js's default 404. More specific routes (like /projects) always win.
export default function Missing() {
  notFound();
}
