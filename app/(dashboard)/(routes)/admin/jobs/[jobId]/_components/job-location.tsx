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

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Select from "react-select";
import { FaMapMarkerAlt } from "react-icons/fa";

interface LocationFormProps {
  initialData: {
    // title: string;
    location: {
      country: string;
      city: string;
    } | null;
  };
  jobId: string;
}

const formSchema = z.object({
  // title: z.string().min(1, { message: "Title is required" }),
  location: z.object({
    country: z.string().min(1, { message: "Country is required" }),
    city: z.string().min(1, { message: "City is required" }),
  }),
});

const countryOptions = [
  { value: "USA", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "Germany", label: "Germany" },
  { value: "Turkey", label: "Turkey" },
  { value: "France", label: "France" },
];

const cityOptions: Record<string, { value: string; label: string }[]> = {
  USA: [
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
  ],
  UK: [
    { value: "London", label: "London" },
    { value: "Manchester", label: "Manchester" },
  ],
  Germany: [
    { value: "Berlin", label: "Berlin" },
    { value: "Munich", label: "Munich" },
  ],
  Turkey: [
    { value: "Istanbul", label: "Istanbul" },
    { value: "Ankara", label: "Ankara" },
  ],
  France: [
    { value: "Paris", label: "Paris" },
    { value: "Lyon", label: "Lyon" },
  ],
};

export const LocationForm = ({ initialData, jobId }: LocationFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // title: initialData.title,
      location: initialData.location ?? { country: "", city: "" },
    },
  });

  // const { isSubmitting, isValid } = form.formState;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Job updated successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Job Location
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

      {!isEditing && (
        <div className="text-sm mt-2 flex items-center space-x-2">
          <p>
            <strong>Location:</strong>{" "}
            {initialData.location ? (
              <>
                <FaMapMarkerAlt className="inline-block text-red-500" />{" "}
                {`${initialData.location.country}, ${initialData.location.city}`}
              </>
            ) : (
              "Not set"
            )}
          </p>
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., 'Full-stack Developer'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Country Selection */}
            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      isDisabled={isSubmitting}
                      options={countryOptions}
                      placeholder="Select Country"
                      value={countryOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(selected) =>
                        form.setValue("location.country", selected?.value || "")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City Selection */}
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      isDisabled={isSubmitting}
                      options={
                        cityOptions[
                          form.watch(
                            "location.country",
                          ) as keyof typeof cityOptions
                        ] || []
                      }
                      placeholder="Select City"
                      value={
                        cityOptions[
                          form.watch(
                            "location.country",
                          ) as keyof typeof cityOptions
                        ]?.find(
                          (option: { value: string; label: string }) =>
                            option.value === field.value,
                        ) || null
                      }
                      onChange={(selected) =>
                        form.setValue("location.city", selected?.value || "")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
