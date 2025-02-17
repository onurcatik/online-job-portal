"use client";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
};
