import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { db } from "./db";
import NewPost from "@/components/NewPost";

export default async function Home() {
  const user = await currentUser();
  const allPosts = await db.query("SELECT * FROM posts");
  const realUser = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    user.id,
  ]);
  console.log(realUser);
  if (realUser.rows.length === 0) {
    db.query(
      "INSERT INTO users (clerk_id, username, bio) VALUES  ($1, $2, $3  )",
      [user.id, "username", "bio"]
    );
  }
  const id = await db.query("SELECT id FROM users WHERE clerk_id = $1", [
    user.id,
  ]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Link href={`/users/${id.rows[0].id}`} className="absolute top-3 left-3">
        My profile
      </Link>
      <h1 className="text-5xl p-6">
        Hello {user ? user.firstName : "Guest"} welcome to the main feed
      </h1>
      <NewPost id={id.rows[0].id} />
      {allPosts.rows.map((post) => (
        <div
          key={post.id}
          className="flex gap-4 flex-col p-4 border border-gray-200 w-1/2 items-center"
        >
          <h2 className="text-3xl">{post.title}</h2>
          <p>{post.description}</p>
          <Link href={`/users/${post.user_id}`}>Read more from them</Link>
        </div>
      ))}
    </div>
  );
}
