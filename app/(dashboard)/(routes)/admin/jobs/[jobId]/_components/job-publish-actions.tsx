"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import router from "next/router";

interface JobPublishActionProps {
  disabled?: boolean;
  jobId: string;
  isPublished: boolean;
}

export const JobPublishAction = ({
  disabled,
  jobId,
  isPublished,
}: JobPublishActionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        // unpublish the job
        await axios.patch(`/api/jobs/${jobId}/unpublish`);
        toast.success("Job Un-Published");
      } else {
        await axios.patch(`/api/jobs/${jobId}/publish`);
        toast.success("Job Published");
      }

      router.reload();
    } catch (error) {
      // toast.error("Something went wrong");
      console.log((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/jobs/${jobId}`);
      toast.success("Job Deleted");
      router.reload();
      return router.push("/admin/jobs");
    } catch (error) {
      // toast.error("Something went wrong");
      console.log((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <Button
        variant="outline"
        onClick={onClick} // <-- Publish işlemine ait fonksiyon
        disabled={false}
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button
        variant="destructive"
        size="icon"
        disabled={isLoading}
        onClick={onDelete}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
