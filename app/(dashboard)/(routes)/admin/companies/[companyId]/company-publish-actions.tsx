"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
// import { useRouter } from "next/router";

interface CompanyPublishActionProps {
  disabled?: boolean;
  companyId: string;
  isPublished: boolean;
}

export const CompanyPublishAction = ({
  disabled,
  companyId,
  isPublished,
}: CompanyPublishActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // Yerel state oluşturuyoruz
  const [published, setPublished] = useState(isPublished);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (published) {
        // Unpublish
        await axios.patch(`/api/companies/${companyId}/unpublish`);
        toast.success("Job Un-Published");
        setPublished(false);
      } else {
        // Publish
        await axios.patch(`/api/companies/${companyId}/publish`);
        toast.success("Job Published");
        setPublished(true);
      }
    } catch (error) {
      console.log((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/companies/${companyId}`);
      toast.success("Job Deleted");
    } catch (error) {
      console.log((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <Button
        variant="outline"
        onClick={onClick}
        disabled={isLoading || disabled}
        size="sm"
      >
        {published ? "Unpublish" : "Publish"}
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
