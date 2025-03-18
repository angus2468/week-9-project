import { db } from "@/app/db";
import EditUser from "@/components/EditUser";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
export default async function Page({ params }) {
  const { id } = await params;
  const clientUser = await currentUser();
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  console.log(clientUser);
  const posts = await db.query("SELECT * FROM posts WHERE user_id = $1", [id]);
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Link href="/" className="absolute top-3 left-3">
        Home
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">
          Welcome to {user.rows[0].username}&apos;s page
        </h1>
        <p>Bio: {user.rows[0].bio}</p>
      </div>
      {user.rows[0].clerk_id === clientUser.id ? (
        <EditUser userId={user.rows[0].clerk_id} id={id} />
      ) : (
        ""
      )}
      <div>
        {posts.rows.map((post) => (
          <div
            key={post.id}
            className="flex gap-4 flex-col p-4 border border-gray-200 w-auto items-center m-2"
          >
            <h2 className="text-3xl">{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
