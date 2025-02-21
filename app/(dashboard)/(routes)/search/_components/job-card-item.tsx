"use client";

import axios from "axios";
import { Company, Job } from "@prisma/client";
import { Card, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Currency,
  Layers,
  Layers2,
  Loader2,
  Network,
} from "lucide-react";
import { BriefcaseBusiness } from "lucide-react/icons";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn, formattedString } from "@/lib/utils";
import Box from "@/components/box";
import Link from "next/link";
import { truncate } from "lodash";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { title } from "process";

interface JobCardItemProps {
  job: Job & { company: Company | null };
  userId: string | null;
  categories: string  ;
  initialData: string | null; // veya ihtiyacınıza göre uygun tip
}

const JobCardItem = ({ job, userId }: JobCardItemProps) => {

  useEffect(() => {
    console.log("job:", job);
    console.log("company:", company);
    console.log("job.imageUrl:", job?.imageUrl);
    console.log("company.logo:", company?.logo);
  }, );
  const typeJob = job as Job & { company: Company | null };
  const company = typeJob.company;

  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const isSavedByUser = userId && job.savedUsers?.includes(userId);
  const SavedUsersIcon = isSavedByUser ? BookmarkCheck : Bookmark;
  const router = useRouter();
  
  const onClickSaveJob = async () => {
    try {
      setIsBookmarkLoading(true);
      if (isSavedByUser) {
        await axios.patch(`/api/jobs/${job.id}/removeJobFromCollection`);
        toast.success("Job Removed");
      } else {
        await axios.patch(`/api/jobs/${job.id}/saveJobToCollection`);
        toast.success("Job Saved");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error: ${(error as Error)?.message}`);
    } finally {
      setIsBookmarkLoading(false);
    }
  };
  
  

  return (
    <motion.div layout>
      <Card >
        <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-y-6">
          <Box className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </p>

            <Button variant="ghost" size="icon">
              {isBookmarkLoading ? (
                <Loader2 className="w-12 h- animate-spin" />
              ) : (
                <SavedUsersIcon className={cn("w-4 h-4")} />
              )}
            </Button>
          </Box>
          <Box className="items-center justify-start gap-x-4">
            <div className="w-64 h-36 min-w-12 min-h-12 border p-2 rounded-md relative flex items-center justify-center overflow-hidden">
              {company?.logo&& (
              <Image
                alt={job?.title || "Company Logo"}
                src={company?.logo || "/default-logo.png"}
                width={100}
                height={100}
                className="object-contain"
              />
              )}
            </div>
            <div className="w-full">
              <p className="text-stone-700 font-bold text-base w-full truncate mb-12">
                {job.title}
              </p>
              
              <Link
                href={`/jobs/${company?.id}`}
                className="text-xs text-purple-500 w-full truncate"
              >
                {company?.name}
              </Link>
            </div>
          </Box>
          <Box className="ml-4">
            {job.shiftTiming && (
              <div className="text-xs text-muted-foreground flex items-center relative right-[70px] ">
                <BriefcaseBusiness className="w-3 h-3 mr-2" />
                {formattedString(job.shiftTiming)}
              </div>
            )}
            {job.workMode && (
              <div className="text-xs text-muted-foreground flex items-center relative right-[50px]">
                <Layers className="w-3 h-3 mr-1" />
                {formattedString(job.workMode)}
              </div>
            )}

            {job.hourlyRate && (
              <div className="text-xs text-muted-foreground flex items-center relative right-[20px]">
                <Currency className="w-3 h-3 mr-1" />
                {formattedString(job.hourlyRate)}
              </div>
            )}

            {job.yearsOfExperience && (
              <div className="text-xs text-muted-foreground flex items-center relative left-[20px]">
                <Network className="w-3 h-3 mr-2" />
                {formattedString(job.yearsOfExperience)}
              </div>
            )}
          </Box>
          {job.short_description && (
            <CardDescription className="text-xs">
              {truncate(job.short_description, {
                length: 180,
                omission: "...",
              })}
            </CardDescription>
          )}

          {job.tags.length > 0 && (
            <Box className="flex-wrap justify-start gap-1">
              {job.tags.slice(0, 6).map((tag, i) => (
                <p
                  key={i}
                  className="bg-gray-100 text-xs rounded-md px-2 py-[2px] font-semibold text-neutral-500"
                >
                  {tag}
                </p>
              ))}
            </Box>
          )}

          <Box className="gap-2 mt-auto">
            <Link href={`/search/${job.id}`} className="w-full">
              <Button
                className="w-full border-purple-500 text-purple-500 hover:bg-transparent hover:text-purple-600"
                variant="outline"
              >
                Details
              </Button>
            </Link>
            <Button
  className="w-full text-white hover:bg-purple-800 bg-purple-500 hover:text-white"
  variant="outline"
  onClick={onClickSaveJob}
>
  {isSavedByUser ? "Saved" : "Save For Later"}
</Button>

          </Box>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCardItem;
