import { Form, Link, useFetcher, useSubmit } from "react-router-dom";
import { BlogPost } from "../api/blog";
import { api } from "../api";


type Props = {
  blogPost: BlogPost;
}

const BlogCard = (props: Props) => {
  const { blogPost } = props;
  const submit = useSubmit();

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">
        {blogPost.title ? blogPost.title : <i>untitled</i>}
      </h1>
      <h2>
        id: <i>{blogPost.id}</i>
      </h2>
      <div>
        <p>
          created by: <i>{blogPost.createdByUser?.email}</i> on <i>{blogPost.dateCreated?.toLocaleString()}</i>
        </p>
        <p>
          last edited by: <i>{blogPost.updatedByUser?.email}</i> on <i>{blogPost.dateUpdated?.toLocaleString()}</i>
        </p>
      </div>
      <div className="container mt-2 space-x-2">
        <button
          className="bg-gray-300 hover:bg-green-500 transition rounded p-1 font-bold"
        >
          <Link to={`/edit/${blogPost.id}`}>
            edit
          </Link>
        </button>
        <button
          className="bg-gray-300 hover:bg-red-500 transition rounded p-1 font-bold"
          onClick={async (e) => {
            if (blogPost.id) {
              // await api.blog.deletePost(blogPost.id)
              submit({ id: blogPost.id }, {
                method: "delete",
                action: `/admin-posts`,
              });
            }
          }}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default BlogCard;