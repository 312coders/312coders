import { useLoaderData } from "react-router-dom";
import { BlogPost } from "../models/blogPost";
import DOMPurify from "dompurify";


const PostPage = () => {
  const post = useLoaderData() as BlogPost;

  return(
    <div className="p-10 bg-gray-300 max-w-4xl m-auto">
      <div>
        <h1 className="text-5xl">{post.title}</h1>
        <br/>
        {/* <h2 className="italic text-sm">created by {post.createdByUser?.['first name']} {post.createdByUser?.['last name']} on {post.dateCreated?.toLocaleString()}</h2>
        <h2 className="italic text-sm">updated by {post.updatedByUser?.['first name']} {post.updatedByUser?.['last name']} on {post.dateUpdated?.toLocaleString()}</h2> */}
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className='ql-snow'>
        {<div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content ?? '') }} />}
      </div>
    </div>
  )
}

export default PostPage;