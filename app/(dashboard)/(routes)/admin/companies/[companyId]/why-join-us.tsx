// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import getGenerativeAIResponse from "@/scripts/aistudio";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Company, Job } from "@prisma/client";
// import axios from "axios";
// import { Lightbulb, Loader2, Pencil } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { Textarea } from "@/components/ui/textarea";

// interface WhyJoinUsFormProps {
//   initialData: Company;
//   companyId: string;
// }

// const formSchema = z.object({
//   whyJoinUs: z.string().min(1, "This field is required"),
// });

// export const WhyJoinUsForm = ({ initialData, companyId }: WhyJoinUsFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [rollname, setRollname] = useState("");
//   const [aiValue, setAiValue] = useState("");
//   const router = useRouter();
//   const [isPrompting, setIsPrompting] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       // Eğer whyJoinUs değeri null ise boş string atanır
//       whyJoinUs: initialData?.whyJoinUs || "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       await axios.patch(`/api/companies/${companyId}`, values);
//       toast.success("Company updated");
//       toggleEditing();
//       router.refresh();
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const toggleEditing = () => setIsEditing((current) => !current);

//   const handlePromptGeneration = async () => {
//     try {
//       setIsPrompting(true);
//       const sanitizedRollname = rollname.replace(/[^a-zA-Z0-9 ]/g, "");

//       const customPrompt = `Create a compelling "Why join us" content piece 
// for ${sanitizedRollname}. Highlight the unique opportunities, benefits, and 
// experiences that ${sanitizedRollname} offers to its users. Emphasize the 
// platform's value proposition, such as access to a vast music library, 
// personalized recommendations, exclusive content, community features, 
// and career opportunities for musicians and creators. Tailor the 
// content to attract potential users and illustrate why ${sanitizedRollname} 
// stands out among other music streaming platforms.`;

//       const data = await getGenerativeAIResponse(customPrompt);
//       const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");
//       form.setValue("whyJoinUs", cleanedText);
//       setAiValue(cleanedText);
//       setIsPrompting(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong...");
//       setIsPrompting(false);
//     }
//   };

//   return (
//     <div className="mt-6 border bg-neutral-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Why Join Us
//         <Button onClick={toggleEditing} variant="ghost">
//           {isEditing ? "Cancel" : (
//             <>
//               <Pencil className="w-4 h-4 mr-2" />
//               Edit
//             </>
//           )}
//         </Button>
//       </div>

//       {isEditing ? (
//         <>
//           <div className="flex items-center gap-2 my-2">
//             <input
//               type="text"
//               placeholder="Company Name"
//               value={rollname}
//               onChange={(e) => setRollname(e.target.value)}
//               className="w-full p-2 rounded-md border"
//             />
//             {isPrompting ? (
//               <Button disabled>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               </Button>
//             ) : (
//               <Button onClick={handlePromptGeneration}>
//                 <Lightbulb className="w-4 h-4" />
//               </Button>
//             )}
//           </div>
//           <p className="text-xs text-muted-foreground text-right">
//             Note: Profession Name & Required skills delimited by comma
//           </p>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
//               <FormField
//                 control={form.control}
//                 name="whyJoinUs"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Textarea
//                         disabled={isSubmitting}
//                         placeholder="Short Why Join Us content"
//                         value={field.value}
//                         onChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex items-center gap-x-2">
//                 <Button disabled={!isValid || isSubmitting} type="submit">
//                   Save
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </>
//       ) : (
//         <div className={cn("text-sm mt-2", !initialData.whyJoinUs && "text-neutral-500 italic")}>
//           {initialData.whyJoinUs || "No Why Join Us content available."}
//         </div>
//       )}
//     </div>
//   );
// };


"use client";

import React, { useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import axios from "axios";
import { Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createEditor, Descendant, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

/* -------------------------------------
   1) Şema ve arayüz tanımı
------------------------------------- */
interface WhyJoinUsFormProps {
  initialData: Company;
  companyId: string;
}

const formSchema = z.object({
  whyJoinUs: z.string().min(1, "This field is required"),
});

/* -------------------------------------
   2) Yardımcı Fonksiyonlar
------------------------------------- */
// Mark'ları toggle etmek için
function toggleMark(editor: Editor, format: string) {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

// Mark aktif mi?
function isMarkActive(editor: Editor, format: string) {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n[format] === true,
    universal: true,
  });
  return !!match;
}

// Leaf render'ı: stillere göre render et
function renderLeaf(props: any) {
  let { children, leaf } = props;
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...props.attributes}>{children}</span>;
}

/* -------------------------------------
   3) Asıl Bileşen
------------------------------------- */
export const WhyJoinUsForm = ({ initialData, companyId }: WhyJoinUsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rollname, setRollname] = useState("");
  const [aiValue, setAiValue] = useState("");
  const [isPrompting, setIsPrompting] = useState(false);
  const router = useRouter();

  // Slate editörü oluştur
  const editor = useMemo(() => withReact(createEditor()), []);

  // initialData.whyJoinUs alanını Slate editor value'ya çevir
  const initialEditorValue: Descendant[] = useMemo(() => {
    if (!initialData.whyJoinUs) {
      return [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];
    }
    try {
      const parsed = JSON.parse(initialData.whyJoinUs);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [
        {
          type: "paragraph",
          children: [{ text: initialData.whyJoinUs }],
        },
      ];
    } catch {
      return [
        {
          type: "paragraph",
          children: [{ text: initialData.whyJoinUs }],
        },
      ];
    }
  }, [initialData.whyJoinUs]);

  // React Hook Form ayarları
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whyJoinUs: initialData?.whyJoinUs || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  // Slate editor state
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialEditorValue);

  // Form gönderimi
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/companies/${companyId}`, values);
      toast.success("Company updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  // AI prompt fonksiyonu
  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);
      const sanitizedRollname = rollname.replace(/[^a-zA-Z0-9 ]/g, "");
      const customPrompt = `Create a compelling "Why join us" content piece 
for ${sanitizedRollname}. Highlight the unique opportunities, benefits, and 
experiences that ${sanitizedRollname} offers to its users. Emphasize the 
platform's value proposition, such as access to a vast music library, 
personalized recommendations, exclusive content, community features, 
and career opportunities for musicians and creators. Tailor the 
content to attract potential users and illustrate why ${sanitizedRollname} 
stands out among other music streaming platforms.`;

      const data = await getGenerativeAIResponse(customPrompt);
      const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");
      
      // Slate formatına çevirme: yalnızca bir paragraf oluşturuyoruz
      const newValue: Descendant[] = [
        {
          type: "paragraph",
          children: [{ text: cleanedText }],
        },
      ];
      
      // Form ve state güncellemesi
      form.setValue("whyJoinUs", JSON.stringify(newValue));
      setEditorValue(newValue);
      setAiValue(cleanedText);
      setIsPrompting(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
      setIsPrompting(false);
    }
  };

  // Araç çubuğu bileşeni (bold, italic, underline)
  const Toolbar = useCallback(() => {
    return (
      <div className="flex gap-2 mb-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleMark(editor, "bold")}
        >
          <b>B</b>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleMark(editor, "italic")}
        >
          <i>I</i>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleMark(editor, "underline")}
        >
          <u>U</u>
        </Button>
      </div>
    );
  }, [editor]);

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Why Join Us
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <>
          <div className="flex items-center gap-2 my-2">
            <input
              type="text"
              placeholder="Company Name"
              value={rollname}
              onChange={(e) => setRollname(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
            {isPrompting ? (
              <Button disabled>
                <Loader2 className="w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button onClick={handlePromptGeneration}>
                <Lightbulb className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-right">
            Note: Profession Name & Required skills delimited by comma
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="whyJoinUs"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* Slate Editörü (edit modunda) */}
                      <Slate
                        editor={editor}
                        initialValue={editorValue}
                        onChange={(value) => {
                          setEditorValue(value);
                          // Form alanına JSON olarak kaydet
                          field.onChange(JSON.stringify(value));
                        }}
                      >
                        <Toolbar />
                        <Editable
                          placeholder="Enter Why Join Us content..."
                          renderLeaf={renderLeaf}
                          className="p-2 border rounded-md bg-white min-h-[150px]"
                        />
                      </Slate>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <div className={cn("text-sm mt-2", !initialData.whyJoinUs && "text-neutral-500 italic")}>
          {initialData.whyJoinUs ? (
            <Slate editor={editor} initialValue={editorValue} onChange={() => {}}>
              <Editable
                readOnly
                renderLeaf={renderLeaf}
                className="min-h-[100px]"
              />
            </Slate>
          ) : (
            "No Why Join Us content available."
          )}
        </div>
      )}
    </div>
  );
};

