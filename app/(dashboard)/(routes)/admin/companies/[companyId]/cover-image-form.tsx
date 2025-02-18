"use client";

import axios from "axios"; // Added missing axios import
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Pencil } from "lucide-react"; // Removed unused PencilIcon
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { ImageUpload } from "@/components/image-upload";

interface CompanyCoverImageFormProps {
  initialData: {
    [x: string]: any;
    title: string;
  };
  companiesId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
});

export const CompanyCoverImageForm = ({ initialData, companiesId }: CompanyCoverImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/companies/${companiesId}`, values);
      toast.success("Job updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.error("Error updating job:", error); // Optional: log error details
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Company Cover Image
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

{/* display the imageUrl if not editing */}
{!isEditing &&
  (!initialData.imageUrl ? (
    <div className="flex items-center justify-center h-60 bg-neutral-200">
      <ImageIcon className="h-10 w-10 text-neutral-500" />
    </div>
  ) : (
    <div className="relative w-full h-60 aspect-video mt-2">
      <Image
      alt="Cover Image"
      fill
      className="w-full h-full object-cover"
      src={initialData.imageUrl}/>
    </div>
  ))}


      {/* Display the form in editing mode */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value || ''}
                      disabled= {isSubmitting
                      }
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
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
      )}
    </div>
  );
};
