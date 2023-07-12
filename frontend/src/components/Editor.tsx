import { forwardRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";

// @ts-ignore
import ImageUploader from "quill-image-uploader";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';

import 'react-quill/dist/quill.snow.css';
import { api } from "../api";

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

export default Editor;