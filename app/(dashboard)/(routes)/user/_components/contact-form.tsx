// "use client";

// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Pencil, UserCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import Box from "@/components/box";
// import { cn } from "@/lib/utils";
// import { UserProfile } from "@prisma/client";

// interface ContactFormProps {
//   initialData: UserProfile | null;
//   userId: string;
// }

// const formSchema = z.object({
//   contact: z.string().min(1, { message: "contact is required" }),
// });

// export const ContactForm = ({ initialData, userId }: ContactFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData ? { contact: initialData.contact } : undefined,
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       await axios.patch(`/api/users/${userId}`, values);
//       toast.success("Job updated");
//       toggleEditing();
//       router.refresh();
//     } catch (error) {
//       console.error("Error updating job:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   const toggleEditing = () => setIsEditing((current) => !current);

//   return (
//     <Box>

//   <div
//     className={cn(
//       "text-lg mt-2 flex items-center gap-2",
//       !initialData?.contact && "text-neutral-500 italic"
//     )}
//   >
//     <UserCircle className="w-4 h-4 mr-2" />
//     {initialData?.contact ? initialData.contact : "No Contact"}
//   </div>

//  {/* Display the form in editing mode */}

//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 mt-4"
//           >
//             <FormField
//               control={form.control}
//               name="contact"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="e.g., 0000 00000"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Button disabled={!isValid || isSubmitting} type="submit">
//                 Save
//               </Button>
//             </div>
//           </form>
//         </Form>

//     </Box>
//   );
// };

"use client";

import axios from "axios";
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
import { Pencil, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Box from "@/components/box";
import { cn } from "@/lib/utils";
import { UserProfile } from "@prisma/client";

interface ContactFormProps {
  initialData: UserProfile | null;
  userId: string;
}

const formSchema = z.object({
  contact: z.string().min(1, { message: "Contact is required" }),
});

export const ContactForm = ({ initialData, userId }: ContactFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: initialData?.contact || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${userId}`, values);
      toast.success("Profile updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  return (
    <Box className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "text-lg flex items-center gap-2",
            !initialData?.contact && "text-neutral-500 italic",
          )}
        >
          <UserCircle className="w-6 h-6 text-primary-500" />
          {initialData?.contact ? initialData.contact : "No Contact"}
        </div>
        {!isEditing && (
          <Button
            onClick={toggleEditing}
            className="px-4 py-2 bg-primary-500 text-black hover:bg-primary-600 transition-all duration-200 rounded-md"
          >
            Edit <Pencil className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., 0000 00000"
                      className="border border-black p-3 rounded-md w-full relative top-4 left-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-3 relative left-4">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="border  border-black px-6 py-2 bg-primary-600 text-black hover:bg-primary-700 transition-all duration-200 rounded-md "
              >
                Save
              </Button>
              <Button
                onClick={toggleEditing}
                type="button"
                className="px-6 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all duration-200 rounded-md"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Box>
  );
};
