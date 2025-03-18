"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>The user profile you tried to visit does not exist</h2>
      <Link href="/">Return to the homepage</Link>
    </div>
  );
}
