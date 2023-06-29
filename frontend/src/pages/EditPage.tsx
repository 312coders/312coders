import { useEffect, useState } from "react";
import { api } from "../api";
import Editor from "../components/Editor";
import { BlogPost } from "../api/blog";
import DOMPurify from "dompurify";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const EditPage = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost>(new BlogPost());

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading]);

  useEffect(() => {
    if (params.id) {
      api.blog.getPost(params.id ?? '').then(res => {
        console.log(res.content);
        setPost(res);
      });
    }
  }, [params])
  
  if (!user || loading) {
    return null;
  }

  return (
    <div className="p-4 m-4">
      <div className="border-2 text-editor">
        <Editor
          value={post.content ?? ''}
          setValue={(value) => setPost((prevPost) => {
            prevPost.content = value;
            return prevPost;
          })}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
        onClick={() => {
          api.blog.updatePost(post)
        }}
      >
        save
      </button>
      <div className='ql-snow'>
        {<div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content ?? '') }} />}
      </div>
    </div>
  )
}

export default EditPage;