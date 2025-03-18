"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <html>
      <body>
        <h2>The user profile you tried to visit does not exist</h2>
        <Link href="/">Return to the homepage</Link>
      </body>
    </html>
  );
}
