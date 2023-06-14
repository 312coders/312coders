import ReactQuill, { Quill } from "react-quill";
import { useState, forwardRef, useEffect } from "react";

// @ts-ignore
import ImageUploader from "quill-image-uploader";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';

import { api, firebaseAuth } from "../api";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register('modules/imageResize', ImageResize);

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'list',
  'bullet',
  'code-block',
  'blockquote',
  'image',
  'imageBlot'
];

const modules = {
  syntax: true,

  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    
    ['link', 'image'],
  ],

  history: {
    delay: 1000,
    maxStack: 500,
    userOnly: true
  },

  imageUploader: {
    upload: (file: File) => {
      console.log(file);
      return new Promise((resolve, reject) => {
        api.storage.uploadImage(file)
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          })
      });
    }
  },

  imageResize: {
    parchment: Quill.import('parchment'),
    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
  }
}

type EditorProps = {
  value: string,
  setValue: (value: string) => void
}
const Editor = forwardRef((props: EditorProps, _ref) => {
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={props.value}
      onChange={props.setValue}
    />
  );
})

const EditPage = () => {
  const [value, setValue] = useState('');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading])
  
  if (!user || loading) {
    return null;
  }

  return (
    <div className="p-4 m-4">
      <div className="border-2 text-editor">
        <Editor value={value} setValue={setValue}/>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">
        save
      </button>
      <div className='ql-snow'>
        {<div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />}
      </div>
    </div>
  )
}

export default EditPage;