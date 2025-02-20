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

interface NameFormProps {
  initialData: UserProfile | null;
  userId: string;
}

const formSchema = z.object({
  fullName: z.string().min(1, { message: "fullName is required" }),
});

export const NameForm = ({ initialData, userId }: NameFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { fullName: initialData.fullName } : undefined,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${userId}`, values);
      toast.success("Job updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  return (
    
    <Box>

  <div
    className={cn(
      "text-lg mt-2 flex items-center gap-2",
      !initialData?.fullName && "text-neutral-500 italic"
    )}
  >
    <UserCircle className="w-4 h-4 mr-2" />
    {initialData?.fullName ? initialData.fullName : "No full name"}
  </div>

 {/* Display the form in editing mode */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., 'Full-stack developer'"
                      {...field}
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

    </Box>
  );
};
