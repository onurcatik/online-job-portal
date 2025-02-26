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
// import { Job } from "@prisma/client";
// import axios from "axios";
// import { Lightbulb, Loader2, Pencil, Copy } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { Editor } from "@/components/editor";
// import { Preview } from "@/components/preview";
// import "react-quill";
// import { Textarea } from "@/components/ui/textarea";

// interface JobDescriptionProps {
//   initialData: Job;
//   jobId: string;
// }

// const formSchema = z.object({
//   description: z.string().min(1),
// });

// export const JobDescription = ({
//   initialData,
//   jobId,
// }: JobDescriptionProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [rollname, setRollname] = useState("");
//   const [skills, setSkills] = useState("");
//   const [aiValue, setAiValue] = useState("");
//   const router = useRouter();
//   const [isPrompting, setIsPrompting] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       description: initialData?.description || "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       await axios.patch(`/api/jobs/${jobId}`, values);
//       toast.success("Job updated");
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

//       const customPrompt = `Could you please draft a job requirements document for the position of ${sanitizedRollname}? The job description should include roles & responsibilities, key features, and details about the role. The required skills should include proficiency in ${sanitizedSkills}. Additionally, you can list any optional skill related to the job. Thanks!`;

//       const data = await getGenerativeAIResponse(customPrompt);
//       const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");
//       form.setValue("description", cleanedText);
//       setAiValue(cleanedText);
//       setIsPrompting(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong...");
//       setIsPrompting(false);
//     }
//   };

//   const onCopy = () => {
//     navigator.clipboard.writeText(aiValue);
//     toast.success("Copied to clipboard");
//   };

//   return (
//     <div className="mt-6 border bg-neutral-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Job Description
//         <Button onClick={toggleEditing} variant={"ghost"}>
//           {isEditing ? "Cancel" : (
//             <>
//               <Pencil className="w-4 h-4 mr-2" />
//               Edit
//             </>
//           )}
//         </Button>
//       </div>

//       {/* Display description if not editing */}
//       {!isEditing && (
//         <div className={cn("text-sm mt-2", !initialData.description && "text-neutral-500 italic")}>
//           {!initialData.description ? "No Description" : initialData.description}
//         </div>
//       )}

//       {/* Editing mode */}
//       {isEditing && (
//         <>
//           <div className="flex items-center gap-2 my-2">
//             <input
//               type="text"
//               placeholder="e.g 'Full-Stack Developer'"
//               value={rollname}
//               onChange={(e) => setRollname(e.target.value)}
//               className="w-full p-2 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Required Skills Set"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
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



//           {/* Display the AI-generated description */}
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
//                 name="description"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormControl>
//                       <Textarea
//                         disabled={isSubmitting}
//                         placeholder="Short Description"
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
import { Job } from "@prisma/client";
import axios from "axios";
import { Lightbulb, Loader2, Pencil, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
// Slate.js importları
import { createEditor, Descendant, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface JobDescriptionProps {
  initialData: Job;
  jobId: string;
}

const formSchema = z.object({
  description: z.string().min(1),
});

export const JobDescription = ({
  initialData,
  jobId,
}: JobDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rollname, setRollname] = useState("");
  const [skills, setSkills] = useState("");
  const [aiValue, setAiValue] = useState("");
  const router = useRouter();
  const [isPrompting, setIsPrompting] = useState(false);

  // Slate editor'ü oluştur
  const editor = useMemo(() => withReact(createEditor()), []);

  // initialData.description değerini Slate editor değeri olarak belirle
  const initialEditorValue: Descendant[] = useMemo(() => {
    if (!initialData.description) {
      return [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];
    }
    try {
      const parsed = JSON.parse(initialData.description);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [
        {
          type: "paragraph",
          children: [{ text: initialData.description }],
        },
      ];
    } catch {
      return [
        {
          type: "paragraph",
          children: [{ text: initialData.description }],
        },
      ];
    }
  }, [initialData.description]);

  // Slate editor state
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialEditorValue);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Job updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);
      const sanitizedRollname = rollname.replace(/[^a-zA-Z0-9 ]/g, "");
      const sanitizedSkills = skills.replace(/[^a-zA-Z0-9, ]/g, "");

      const customPrompt = `Could you please draft a job requirements document for the position of ${sanitizedRollname}? The job description should include roles & responsibilities, key features, and details about the role. The required skills should include proficiency in ${sanitizedSkills}. Additionally, you can list any optional skill related to the job. Thanks!`;

      const data = await getGenerativeAIResponse(customPrompt);
      const cleanedText = data.replace(/^\s+|\s+$/g, "").replace(/[\*\#]/g, "");
      form.setValue("description", cleanedText);
      setAiValue(cleanedText);
      setIsPrompting(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
      setIsPrompting(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(aiValue);
    toast.success("Copied to clipboard");
  };

  // Slate: Mark toggle fonksiyonları
  function toggleMark(editor: Editor, format: string) {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }

  function isMarkActive(editor: Editor, format: string) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n[format] === true,
      universal: true,
    });
    return !!match;
  }

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

  // Slate araç çubuğu
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
        Job Description
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Display description if not editing */}
      {!isEditing && (
        <div className={cn("text-sm mt-2", !initialData.description && "text-neutral-500 italic")}>
          {!initialData.description ? "No Description" : initialData.description}
        </div>
      )}

      {/* Editing mode */}
      {isEditing && (
        <>
          <div className="flex items-center gap-2 my-2">
            <input
              type="text"
              placeholder="e.g 'Full-Stack Developer'"
              value={rollname}
              onChange={(e) => setRollname(e.target.value)}
              className="w-full p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Required Skills Set"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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

          {/* Slate.js editörü ile AI tarafından oluşturulan description */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slate
                        editor={editor}
                        initialValue={editorValue}
                        onChange={(value) => {
                          setEditorValue(value);
                          // JSON olarak form alanına kaydet
                          field.onChange(JSON.stringify(value));
                        }}
                      >
                        <Toolbar />
                        <Editable
                          placeholder="Short Description"
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
