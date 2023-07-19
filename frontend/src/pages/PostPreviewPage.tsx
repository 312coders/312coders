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
        <p>
          <i>{post.owner?.name}</i>
        </p>
        <p>
          created on <i>{post.dateCreated?.toLocaleString()}</i>
        </p>
        <p>
          last edited on <i>{post.dateUpdated?.toLocaleString()}</i>
        </p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className='ql-snow'>
        {<div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content ?? '') }} />}
      </div>
    </div>
  )
}

export default PostPage;