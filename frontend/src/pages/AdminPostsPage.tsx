import { useLoaderData, useNavigate } from "react-router-dom";
import { api } from "../api";
import { BlogPost } from "../models/blogPost";
import BlogCard from "../components/BlogCard";

const AdminPostsPage = () => {
  const posts = useLoaderData() as BlogPost[];
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-gray-300 max-w-4xl m-auto">
      <div className="mb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 rounded p-1 font-bold text-white"
          onClick={async () => {
            const newPostId = await api.blog.createPost(new BlogPost());
            navigate(`/blog/edit/${newPostId}`);
          }}
        >
          add new post
        </button>
      </div>
      <ul className="space-y-2">
        {posts.map((post) => (
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