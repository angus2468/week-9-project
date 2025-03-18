"use server";

import { revalidatePath } from "next/cache";
import pg from "pg";
import { db } from "./db";
import { redirect } from "next/navigation";

export async function handleUserEdit(formData) {
  console.log(formData);
  const { username, userId, id, bio } = Object.fromEntries(formData);
  await db.query(
    `UPDATE users SET username = $1, bio = $2 WHERE clerk_id = $3`,
    [username, bio, userId]
  );
  revalidatePath(`/users/${id}`);
  redirect(`/users/${id}`);
}
