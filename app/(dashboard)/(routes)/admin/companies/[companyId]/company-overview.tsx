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
// import { Lightbulb, Loader2, Pencil, Copy } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { Editor } from "@/components/editor";
// // import { Preview } from "@/components/preview";
// // import "react-quill";
// import { Textarea } from "@/components/ui/textarea";


// interface CompaniesOverviewPageProps {

//     initialData: {
  
//       overview: string;
  
//       name: string;
  
//       id: string;
  
//       userId: string;
  
//       description: string | null;
  
//       logo: string | null;
  
//       coverImage: string | null;
  
//       mail: string | null;
  
//       website: string | null;
  
//       linkedIn: string | null;
  
//       address_line_1: string | null;
  
//       city: string | null;
  
//       state: string | null;
  
//       address_line_2: string | null;
  
//       zipcode: string | null;
  
//       followers: number;
  
//       created: Date;
  
//       updated: Date;
  
//     };
  
//     companyId: string;
  
//   }
  
  
  
  

// const formSchema = z.object({
//   overview: z.string().min(1),
// });

// export const CompanyOverviewForm = ({
//   initialData,
//   companyId,
// }: CompaniesOverviewPageProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [rollname, setRollname] = useState("");
//   const [skills, setSkills] = useState("");
//   const [aiValue, setAiValue] = useState("");
//   const router = useRouter();
//   const [isPrompting, setIsPrompting] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       overview: initialData?.overview || "",
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
//       const sanitizedSkills = skills.replace(/[^a-zA-Z0-9, ]/g, "");

//       const customPrompt = `Could you please draft a job requirements document for the position of ${rollname}? `;

//       const data = await getGenerativeAIResponse(customPrompt);
//       const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");
//       form.setValue("overview", cleanedText);
//       setAiValue(cleanedText);
//       setIsPrompting(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong...");
//       setIsPrompting(false);
//     }
//   };

// //   const onCopy = () => {
// //     navigator.clipboard.writeText(aiValue);
// //     toast.success("Copied to clipboard");
// //   };

//   return (
//     <div className="mt-6 border bg-neutral-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Company overview
//         <Button onClick={toggleEditing} variant={"ghost"}>
//           {isEditing ? "Cancel" : (
//             <>
//               <Pencil className="w-4 h-4 mr-2" />
//               Edit
//             </>
//           )}
//         </Button>
//       </div>

//       {/* Display overview if not editing */}
//       {/* {!isEditing && (
//         <div className={cn("text-sm mt-2", !initialData.overview && "text-neutral-500 italic")}>
//           {!initialData.overview ? "No overview" : <Preview value={initialData.overview} />}
//         </div>
//       )} */}

//       {/* Editing mode */}
//       {isEditing && (
//         <>
//           <div className="flex items-center gap-2 my-2">
//             <input
//               type="text"
//               placeholder="Design Studio"
//               value={rollname}
//               onChange={(e) => setRollname(e.target.value)}
//               className="w-full p-2 rounded-md"
//             />
//             {/* <input
//               type="text"
//               placeholder="Required Skills Set"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//               className="w-full p-2 rounded-md"
//             /> */}
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



//           {/* Display the AI-generated overview */}
//           {/* {aiValue && (
//             <div className="w-full h-96 max-h-96 rounded-md bg-white overflow-y-scroll p-3 relative mt-4 text-muted-foreground">
//               {aiValue}
//               <Button
//                 className="absolute top-3 right-3 z-10"
//                 variant="outline"
//                 size="icon"
//                 onClick={onCopy}
//               >
//                 <Copy className="w-4 h-4" />
//               </Button>
//             </div>
//           )} */}

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
//               <FormField
//                 control={form.control}
//                 name="overview"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormControl>
//                       <Textarea
//                         disabled={isSubmitting}
//                         placeholder="Short overview"
//                         {...field}
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
//       )}
//     </div>
//   );
// };
  

// "use client";

// import React, { useMemo, useState, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { createEditor, Descendant, Editor, Text } from "slate";
// import { Slate, Editable, withReact } from "slate-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Pencil, Loader2, Lightbulb } from "lucide-react";
// import { useRouter } from "next/navigation";
// import getGenerativeAIResponse from "@/scripts/aistudio";
// import { cn } from "@/lib/utils";

// /* ----------------------------
//    1) Şema ve arayüz tanımı
// ---------------------------- */
// interface CompaniesOverviewPageProps {
//   initialData: {
//     overview: string;
//     name: string;
//     id: string;
//     userId: string;
//     // ... diğer alanlar
//   };
//   companyId: string;
// }

// // overview alanını JSON olarak tutacağımızı belirtiyoruz
// const formSchema = z.object({
//   overview: z.string().min(1),
// });

// /* ----------------------------
//    2) Yardımcı fonksiyonlar
// ---------------------------- */
// // Mark'ları toggle etmek için
// function toggleMark(editor: Editor, format: string) {
//   const isActive = isMarkActive(editor, format);
//   if (isActive) {
//     Editor.removeMark(editor, format);
//   } else {
//     Editor.addMark(editor, format, true);
//   }
// }

// // Mark aktif mi?
// function isMarkActive(editor: Editor, format: string) {
//   const [match] = Editor.nodes(editor, {
//     match: (n) => Text.isText(n) && n[format] === true,
//     universal: true,
//   });
//   return !!match;
// }

// // Leaf'i renderlarken (bold, italic vb.) stilleri uygula
// function renderLeaf(props: any) {
//   let { children, leaf } = props;
//   if (leaf.bold) {
//     children = <strong>{children}</strong>;
//   }
//   if (leaf.italic) {
//     children = <em>{children}</em>;
//   }
//   if (leaf.underline) {
//     children = <u>{children}</u>;
//   }
//   return <span {...props.attributes}>{children}</span>;
// }

// /* ----------------------------
//    3) Asıl bileşen
// ---------------------------- */
// export const CompanyOverviewForm = ({
//   initialData,
//   companyId,
// }: CompaniesOverviewPageProps) => {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isPrompting, setIsPrompting] = useState(false);
//   const [rollname, setRollname] = useState("");
//   const [aiValue, setAiValue] = useState("");

//   // 3.1) Slate editörü oluştur
//   const editor = useMemo(() => withReact(createEditor()), []);

//   // 3.2) initialValue oluştur: overview undefined veya geçerli JSON değilse boş paragraf döndür
//   const initialEditorValue: Descendant[] = useMemo(() => {
//     if (!initialData.overview) {
//       return [
//         {
//           type: "paragraph",
//           children: [{ text: "" }],
//         },
//       ];
//     }
//     try {
//       const parsed = JSON.parse(initialData.overview);
//       if (Array.isArray(parsed)) {
//         return parsed;
//       }
//       return [
//         {
//           type: "paragraph",
//           children: [{ text: initialData.overview }],
//         },
//       ];
//     } catch {
//       return [
//         {
//           type: "paragraph",
//           children: [{ text: initialData.overview }],
//         },
//       ];
//     }
//   }, [initialData.overview]);

//   // 3.3) React Hook Form ayarları
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       overview: initialData?.overview || "",
//     },
//   });
//   const { isSubmitting, isValid } = form.formState;

//   // 3.4) Local state: editorValue
//   const [editorValue, setEditorValue] = useState<Descendant[]>(initialEditorValue);

//   // 3.5) Kaydet
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

//   // 3.6) Edit modunu aç/kapa
//   const toggleEditing = () => setIsEditing((current) => !current);

//   // 3.7) Prompt ile AI verisi getir
//   const handlePromptGeneration = async () => {
//     try {
//       setIsPrompting(true);
//       const sanitizedRollname = rollname.replace(/[^a-zA-Z0-9 ]/g, "");
//       const customPrompt = `Could you please draft a job requirements document for the position of ${sanitizedRollname}? `;
//       const data = await getGenerativeAIResponse(customPrompt);
//       const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");

//       // AI yanıtını Slate formatına çevir
//       const newValue: Descendant[] = [
//         {
//           type: "paragraph",
//           children: [{ text: cleanedText }],
//         },
//       ];

//       // Hem form hem de state güncelle
//       form.setValue("overview", JSON.stringify(newValue));
//       setEditorValue(newValue);
//       setAiValue(cleanedText);
//       setIsPrompting(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong...");
//       setIsPrompting(false);
//     }
//   };

//   // 3.8) Araç çubuğu bileşeni
//   const Toolbar = useCallback(() => {
//     return (
//       <div className="flex gap-2 mb-2">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => toggleMark(editor, "bold")}
//         >
//           <b>B</b>
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => toggleMark(editor, "italic")}
//         >
//           <i>I</i>
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => toggleMark(editor, "underline")}
//         >
//           <u>U</u>
//         </Button>
//       </div>
//     );
//   }, [editor]);

//   /* -------------------------------------
//      4) Render
//   -------------------------------------- */
//   return (
//     <div className="mt-6 border bg-neutral-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Company overview
//         <Button onClick={toggleEditing} variant="ghost">
//           {isEditing ? "Cancel" : (
//             <>
//               <Pencil className="w-4 h-4 mr-2" />
//               Edit
//             </>
//           )}
//         </Button>
//       </div>

//       {/* Eğer düzenleme modu pasifse, readOnly Slate gösterelim */}
//       {!isEditing && (
//         <div
//           className={cn(
//             "text-sm mt-2",
//             !initialData.overview && "text-neutral-500 italic"
//           )}
//         >
//           {initialData.overview ? (
//             <Slate
//               editor={editor}
//               initialValue={editorValue}
//               onChange={(value) => {
//                 setEditorValue(value);
//               }}
//             >
//               <Editable
//                 readOnly
//                 renderLeaf={renderLeaf}
//                 className="min-h-[100px]"
//               />
//             </Slate>
//           ) : (
//             "No overview"
//           )}
//         </div>
//       )}

//       {/* Düzenleme modu */}
//       {isEditing && (
//         <>
//           {/* Örnek: Prompt */}
//           <div className="flex items-center gap-2 my-2">
//             <input
//               type="text"
//               placeholder="Design Studio"
//               value={rollname}
//               onChange={(e) => setRollname(e.target.value)}
//               className="w-full p-2 rounded-md"
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
//                 name="overview"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       {/* Slate Editörü (edit modunda) */}
//                       <Slate
//                         editor={editor}
//                         initialValue={editorValue}
//                         onChange={(value) => {
//                           setEditorValue(value);
//                           // JSON olarak form alanına kaydediyoruz
//                           field.onChange(JSON.stringify(value));
//                         }}
//                       >
//                         {/* Basit bir araç çubuğu */}
//                         <Toolbar />
//                         <Editable
//                           placeholder="Short overview..."
//                           renderLeaf={renderLeaf}
//                           className="p-2 border rounded-md bg-white min-h-[150px]"
//                         />
//                       </Slate>
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEditor, Descendant, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Loader2, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { cn } from "@/lib/utils";

/* ----------------------------
   1) Şema ve arayüz tanımı
---------------------------- */
interface CompaniesOverviewPageProps {
  initialData: {
    overview: string;
    name: string;
    id: string;
    userId: string;
    // ... diğer alanlar
  };
  companyId: string;
}

// overview alanını JSON olarak tutacağımızı belirtiyoruz
const formSchema = z.object({
  overview: z.string().min(1),
});

/* ----------------------------
   2) Yardımcı fonksiyonlar
---------------------------- */
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

// Leaf'i renderlarken (bold, italic vb.) stilleri uygula
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

/* ----------------------------
   3) Asıl bileşen
---------------------------- */
export const CompanyOverviewForm = ({
  initialData,
  companyId,
}: CompaniesOverviewPageProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPrompting, setIsPrompting] = useState(false);
  const [rollname, setRollname] = useState("");
  const [aiValue, setAiValue] = useState("");

  // 3.1) Slate editörü oluştur
  const editor = useMemo(() => withReact(createEditor()), []);

  // 3.2) initialValue oluştur: overview undefined veya geçerli JSON değilse boş paragraf döndür
  const initialEditorValue: Descendant[] = useMemo(() => {
    if (!initialData.overview) {
      return [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];
    }
    try {
      const parsed = JSON.parse(initialData.overview);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [
        {
          type: "paragraph",
          children: [{ text: initialData.overview }],
        },
      ];
    } catch {
      return [
        {
          type: "paragraph",
          children: [{ text: initialData.overview }],
        },
      ];
    }
  }, [initialData.overview]);

  // 3.3) React Hook Form ayarları
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      overview: initialData?.overview || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  // 3.4) Local state: editorValue
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialEditorValue);

  // 3.5) Kaydet
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

  // 3.6) Edit modunu aç/kapa
  const toggleEditing = () => setIsEditing((current) => !current);

  // 3.7) Prompt ile AI verisi getir
  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);
      const sanitizedRollname = rollname.replace(/[^a-zA-Z0-9 ]/g, "");
      const customPrompt = `Could you please draft a job requirements document for the position of ${sanitizedRollname}? `;
      const data = await getGenerativeAIResponse(customPrompt);
      const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");

      // AI yanıtını Slate formatına çevir
      const newValue: Descendant[] = [
        {
          type: "paragraph",
          children: [{ text: cleanedText }],
        },
      ];

      // Hem form hem de state güncelle
      form.setValue("overview", JSON.stringify(newValue));
      setEditorValue(newValue);
      setAiValue(cleanedText);
      setIsPrompting(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
      setIsPrompting(false);
    }
  };

  // 3.8) Araç çubuğu bileşeni
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

  /* -------------------------------------
     4) Render
  -------------------------------------- */
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Company overview
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Eğer düzenleme modu pasifse, readOnly Slate gösterelim */}
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.overview && "text-neutral-500 italic"
          )}
        >
          {initialData.overview ? (
            <Slate
              editor={editor}
              initialValue={editorValue}
              onChange={(value) => {
                setEditorValue(value);
              }}
            >
              <Editable
                readOnly
                renderLeaf={renderLeaf}
                className="min-h-[100px]"
              />
            </Slate>
          ) : (
            "No overview"
          )}
        </div>
      )}

      {/* Düzenleme modu */}
      {isEditing && (
        <>
          {/* Örnek: Prompt */}
          <div className="flex items-center gap-2 my-2">
            <input
              type="text"
              placeholder="Design Studio"
              value={rollname}
              onChange={(e) => setRollname(e.target.value)}
              className="w-full p-2 rounded-md"
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
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* Slate Editörü (edit modunda) */}
                      <Slate
                        editor={editor}
                        initialValue={editorValue}
                        onChange={(value) => {
                          setEditorValue(value);
                          // JSON olarak form alanına kaydediyoruz
                          field.onChange(JSON.stringify(value));
                        }}
                      >
                        {/* Basit bir araç çubuğu */}
                        <Toolbar />
                        <Editable
                          placeholder="Short overview..."
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
      )}
    </div>
  );
};
