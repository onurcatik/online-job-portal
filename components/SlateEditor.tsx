// components/SlateEditor.tsx
"use client";

import React, { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface SlateEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  placeholder?: string;
}

export function SlateEditor({ value, onChange, placeholder = "Metninizi buraya yazın..." }: SlateEditorProps) {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable placeholder={placeholder} />
    </Slate>
  );
}
