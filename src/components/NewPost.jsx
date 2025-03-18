import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function NewPost({ id }) {
  const clientUser = await currentUser();
  async function handleSubmit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { description, title, id } = data;

    await db.query(
      `INSERT INTO posts (description, user_id, title) VALUES ($1 , $2, $3)`,
      [description, id, title]
    );
    revalidatePath("/");
  }

  return (
    <form className="flex items-center gap-1" action={handleSubmit}>
      <img
        src={clientUser.imageUrl}
        alt="Profile picture"
        width="50"
        height="50"
        className="rounded-full"
      />
      Title:
      <input className="p-2" id="title" name="title" placeholder="Title" />
      description:
      <input
        className="p-2"
        id="description"
        name="description"
        placeholder="Description"
      />
      <input type="hidden" name="id" value={id} />
      <button className="p-2" type="submit">
        Post!
      </button>
    </form>
  );
}
