import { db } from "@/app/db";
import { revalidatePath } from "next/cache";

export default function NewPost({ id }) {
  async function handleSubmit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { description, title, id } = data;

    await db.query(
      `INSERT INTO posts (description, user_id, title) VALUES ($1 , $2, $3)`,
      [description, id, title]
    );
    revalidatePath("/profile");
  }

  return (
    <form className="" action={handleSubmit}>
      Title:
      <input className="" id="title" name="title" placeholder="Title" />
      description:
      <textarea
        className=""
        id="description"
        name="description"
        placeholder="description"
      ></textarea>
      <input type="hidden" name="id" value={id} />
      <button className="" type="submit">
        Post!
      </button>
    </form>
  );
}
