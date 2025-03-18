import { db } from "@/app/db";
import { revalidatePath } from "next/cache";

export default function DeletButton({ id }) {
  async function handleDelete() {
    "use server";
    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    revalidatePath(`/users/${id}`);
  }
  return (
    <button className="p-2" onClick={handleDelete}>
      Delete
    </button>
  );
}
