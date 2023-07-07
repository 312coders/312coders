import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BlogPost } from "../api/blog";
import BlogCard from "../components/BlogCard";
import { api } from "../api";

const AdminPostsPage = () => {
  const data = useLoaderData() as BlogPost[];
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <div className="p-10 bg-gray-300 max-w-4xl m-auto">
      <div className="mb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 rounded p-1 font-bold text-white"
          onClick={async () => {
            const newPostId = await api.blog.createPost(new BlogPost());
            navigate(`/edit/${newPostId}`);
          }}
        >
          add new post
        </button>
      </div>
      <ul className="space-y-2">
        {data.map((post, i) => (
          <li
            key={post.id}
            className="border-2 border-black rounded bg-white"
          >
            <BlogCard blogPost={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPostsPage;