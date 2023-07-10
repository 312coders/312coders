import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { api } from "../api";
import { BlogPost } from "../api/blog";
import Editor from "../components/Editor";
import { useAlert } from "../hooks/useAlert";
import Chip from "../components/Chip";

const EditPage = () => {
  const data = useLoaderData() as BlogPost;
  const revalidator = useRevalidator();
  const [post, setPost] = useState<BlogPost>(structuredClone(data));
  const [tagText, setTagText] = useState('');

  const navigate = useNavigate();
  const { setMsg } = useAlert();

  useEffect(() => {
    console.log(revalidator.state)
    if (revalidator.state === 'idle') {
      setPost(structuredClone(data));
    }
  }, [revalidator.state]);

  const saveDisabled = useMemo(() => {
    return JSON.stringify(post) === JSON.stringify(data);
  }, [post, data]);

  return (
    <div className="p-10 bg-gray-300 max-w-4xl m-auto">
      <div className="mb-2 space-x-4">
        <label className="space-x-1 align-middle">
          <span className="font-bold">title:</span>
          <input
            className=" border rounded py-2 px-3 text-gray-700"
            id="title"
            type="text"
            placeholder="Title"
            defaultValue={post.title ?? ''}
            onInput={(e) => {
              const prevPost = structuredClone(post);
              prevPost.title = e.currentTarget?.value ?? '';
              setPost(prevPost);
            }}
          />
        </label>
        <label className="space-x-1 align-middle">
          <span className="font-bold">public:</span>
          <input
            className="rounded-full h-5 w-5 align-middle"
            type="checkbox"
            defaultChecked={post.isPublic}
            onChange={(e) => {
              const prevPost = structuredClone(post);
              prevPost.isPublic = e.target.checked;
              setPost(prevPost);
            }}
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 transition text-white font-bold py-2 px-4 rounded float-right"
          onClick={() => {
            api.blog.updatePost(post).then(() => {
              revalidator.revalidate();
              setMsg('Post saved!', 'success');
            })
          }}
          disabled={saveDisabled}
        >
          save
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 transition text-white font-bold py-2 px-4 rounded float-right"
          onClick={() => {
            api.blog.deletePost(post.id ?? '').then(() => {
              navigate('/blog/admin-posts');
              setMsg('Post deleted!', 'success');
            })
          }}
        >
          delete
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
      <div className="flex flex-wrap mb-2 space-x-2">
        <label className="space-x-1 align-middle">
          <span className="font-bold">tags:</span>
          <input
            className=" border rounded py-2 px-3 text-gray-700"
            id="tags"
            type="text"
            placeholder="tag"
            value={tagText}
            onInput={(e) => setTagText(e.currentTarget.value)}
          />
        </label>
        <button
          className="bg-gray-500 hover:bg-gray-700 transition text-white font-bold py-2 px-4 rounded float-right justify-center"
          onClick={() => {
            const prevPost = structuredClone(post);
            prevPost.tags.push(tagText);
            setPost(prevPost);
            setTagText('');
          }}
        >
          +
        </button>
        {post.tags?.map((tag, i) => {
          return (
            <Chip
              key={i}
              text={tag}
              onClose={() => {
                const prevPost = structuredClone(post);
                prevPost.tags.splice(i, 1);
                setPost(prevPost);
              }}
            />
          )
        })}
      </div>
      <div className="border-2 text-editor bg-white">
        <Editor
          value={post.content ?? ''}
          setValue={(value) => {
            const prevPost = structuredClone(post);
            prevPost.content = value;
            setPost(prevPost);
          }}
        />
      </div>
    </div>
  )
}

export default EditPage;