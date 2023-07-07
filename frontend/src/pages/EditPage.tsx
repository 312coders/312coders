import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { api } from "../api";
import { BlogPost } from "../api/blog";
import Editor from "../components/Editor";
import { useAlert } from "../hooks/useAlert";

const EditPage = () => {
  const data = useLoaderData() as BlogPost;
  const [post, setPost] = useState<BlogPost>(data);
  const navigate = useNavigate();
  const { setMsg } = useAlert();
  const saveBtnEnabled = () => {
    console.log(JSON.stringify(data) === JSON.stringify(post))
    return JSON.stringify(data) !== JSON.stringify(post)
  }

  useEffect(() => {
    console.log(post)
  }, [post])

  return (
    <div className="p-10 bg-gray-300 max-w-4xl m-auto">
      <div className="mb-2 space-x-2">
        <input
          className=" border rounded py-2 px-3 text-gray-700"
          id="title"
          type="text"
          placeholder="Title"
          defaultValue={post.title ?? ''}
          onInput={(e) => setPost((prevPost) => {
            prevPost.title = e.currentTarget.value;
            return prevPost;
          })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded float-right"
          onClick={() => {
            api.blog.updatePost(post).then(() => {
              setMsg('Post saved!', 'success');
            })
          }}
        >
          save
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 transition text-white font-bold py-2 px-4 rounded float-right"
          onClick={() => {
            navigate(-1);
          }}
        >
          back
        </button>
      </div>
      <div className="border-2 text-editor bg-white">
        <Editor
          value={post.content ?? ''}
          setValue={(value) => setPost((prevPost) => {
            prevPost.content = value;
            return prevPost;
          })}
        />
      </div>
      {/* <div className='ql-snow'>
        {<div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content ?? '') }} />}
      </div> */}
    </div>
  )
}

export default EditPage;