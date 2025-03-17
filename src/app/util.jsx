"use server";

import { revalidatePath } from "next/cache";
import pg from "pg";

export async function handleUserEdit(formData) {
  "use server";
  const { username, userId, id, bio } = Object.fromEntries(formData);
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
  });
  await db.query(
    `UPDATE users SET username = $1, bio = $2 WHERE clerk_id = $3`,
    [username, bio, userId]
  );
  revalidatePath(`/users/${id}`);
}
