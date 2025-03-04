// src/types/slate.d.ts
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  // Diğer stil özelliklerini ekleyebilirsiniz.
  [key: string]: any; // Bu satır, string index ile erişime izin verir.
};

export type CustomElement = {
  type: "paragraph" | string;
  children: CustomText[];
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
