import ReactQuill, { Quill } from "react-quill";

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import React, { useState, forwardRef, useEffect } from "react";
import { api } from "../api";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';


Quill.register("modules/imageUploader", ImageUploader);

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
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    
    ['link', 'image'],
    ['clean']
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
  }
}

type EditorProps = {
  value: string,
  setValue: (value: string) => void
}
const Editor = forwardRef((props: EditorProps, ref) => {
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

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <div className="p-4 m-4">
      <button onClick={() => api.auth.signIn('kpan8055@gmail.com', 'KP101056')}>
        sign in
      </button>
      <div className="border-2 text-editor">
        <Editor value={value} setValue={setValue}/>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save
      </button>
      <div className='ql-snow'>
        {<div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />}
      </div>
    </div>
  )
}

export default EditPage;