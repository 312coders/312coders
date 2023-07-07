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
          <Link to={`/blog/edit/${blogPost.id}`}>
            edit
          </Link>
        </button>
        <button
          className="bg-gray-300 hover:bg-red-500 transition rounded p-1 font-bold"
          onClick={async (e) => {
            submit({ id: blogPost.id ?? '' }, {
              method: "delete",
              action: `/blog/admin-posts`,
            });
          }}
        >
          delete
        </button>
        <span>
          {blogPost.isPublic ? (
            <div className="inline-flex bg-green-200 rounded p-1">
              <h6 className="mr-1">public</h6>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          ) : (
            <div className="inline-flex bg-red-200 rounded p-1">
              <h6 className="mr-1">private</h6>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          )}
        </span>
      </div>
    </div>
  )
}

export default BlogCard;