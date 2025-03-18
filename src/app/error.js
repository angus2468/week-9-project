"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Oh no! Something went wrong on that page!</h2>
        <Link href="/">Return to the homepage</Link>
      </body>
    </html>
  );
}
