import { db } from "@/app/db";
import EditUser from "@/components/EditUser";
import Image from "next/image";
import Link from "next/link";
export default async function Page({ params }) {
  const { id } = await params;
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  console.log(user);
  const posts = await db.query("SELECT * FROM posts WHERE user_id = $1", [id]);
  return (
    <div>
      <Link href="/" className="absolute top-3 left-3">
        Home
      </Link>
      <div>
        <h1>Welcome to {user.rows[0].username}&apos;s page</h1>
        <p>Bio: {user.rows[0].bio}</p>
      </div>
      <EditUser userId={user.rows[0].clerk_id} id={id} />
      <div>
        <h2>Posts:</h2>
        {posts.rows.map((post) => (
          <div
            key={post.id}
            className="flex gap-4 flex-col p-4 border border-gray-200 w-1/2 items-center"
          >
            <h2 className="text-3xl">{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
