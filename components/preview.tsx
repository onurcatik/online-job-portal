"use client";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

interface PreviewProps {
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading preview...</p>,
});

export const Preview = ({ value }: PreviewProps) => {
  return (
    <div className="bg-white">
      <ReactQuill value={value} readOnly theme="snow" />
    </div>
  );
};
