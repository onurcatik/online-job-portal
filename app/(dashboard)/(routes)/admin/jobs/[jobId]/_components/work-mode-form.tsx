"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { ComboBox } from "@/components/ui/combo-box";

interface WorkModeFormProps {
  initialData: Job;
  jobId: string;
}

const options = [
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
  {
    value: "office",
    label: "Office",
  },
];

const formSchema = z.object({
  workMode: z.string().min(1),
});

export const WorkModeForm = ({ initialData, jobId }: WorkModeFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workMode: initialData.workMode || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Job updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  const selectedOption = options.find(
    (option) => option.value === initialData.workMode,
  );
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Job Work Mode
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? (
            <span>Cancel</span>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* display the workMode if not editing */}
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            initialData?.workMode && "text-neutral-500 italic",
          )}
        >
          {selectedOption?.label || "No Work added"}
        </p>
      )}
      {/* on editing mode display the input */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="workMode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox
                      options={options}
                      value={field.value}
                      onChange={(value: string) => field.onChange(value)}
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
