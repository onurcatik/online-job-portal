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

interface JobCardItemProps {
  job: Job & { company: Company | null };
  userId: string | null;
  categories: string;
  initialData: string | null; // veya ihtiyacınıza göre uygun tip
}

const JobCardItem = ({ job, userId }: JobCardItemProps) => {
  const typeJob = job as Job & {
    company: Company | null;
    location?: { country: string; city: string } | null;
  };
  const company = typeJob.company;
  const location = job.location as { country: string; city: string } | null;

  useEffect(() => {
    console.log("job:", job);
    console.log("company:", company);
  }, [job, company]);

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
    <motion.div
      layout
      // whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden rounded-xl border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Öne Çıkan Badge */}
        <div className="absolute top-2 left-2 z-10">
          {/* <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span> */}
        </div>
        <div className="w-full h-full p-6 flex flex-col gap-y-4">
          <Box className="flex items-center justify-between w-full">
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </p>
            <Button variant="ghost" size="icon" onClick={onClickSaveJob}>
              {isBookmarkLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <SavedUsersIcon className="w-5 h-5 text-blue-500" />
              )}
            </Button>
          </Box>

          <Box className="flex items-center gap-x-6">
            <div className="w-64 h-36 min-w-12 min-h-12 border p-2 rounded-md relative flex items-center justify-center overflow-hidden">
              {company?.logo && (
                <Image
                  alt={company?.name || "Company Logo"}
                  src={company?.logo || "/default-logo.png"}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              )}
            </div>
            <div className="w-full">
              <p className="text-stone-700 font-bold text-base w-full truncate mb-0">
                {job.title}
              </p>

              {job?.location ? (
                <p className="text-sm text-gray-600">
                  {job.location.country}, {job.location.city}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Location: Not provided</p>
              )}

              <Link
                href={`/companies/${company?.id}`}
                className="text-base text-blue-600 hover:text-blue-800 transition-colors duration-300 truncate"
              >
                {company?.name}
              </Link>
              {/* Örnek Rating */}
              {/* <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.561-.955L10 1l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div> */}
            </div>
          </Box>

          <Box className="flex flex-wrap gap-4">
            {job.shiftTiming && (
              <div className="flex items-center text-sm text-gray-600">
                <BriefcaseBusiness className="w-5 h-5 mr-1" />
                {formattedString(job.shiftTiming)}
              </div>
            )}
            {job.workMode && (
              <div className="flex items-center text-sm text-gray-600">
                <Layers className="w-5 h-5 mr-1" />
                {formattedString(job.workMode)}
              </div>
            )}
            {job.hourlyRate && (
              <div className="flex items-center text-sm text-gray-600">
                <Currency className="w-5 h-5 mr-1" />
                {formattedString(job.hourlyRate)}
              </div>
            )}
            {job.yearsOfExperience && (
              <div className="flex items-center text-sm text-gray-600">
                <Network className="w-5 h-5 mr-1" />
                {formattedString(job.yearsOfExperience)}
              </div>
            )}
          </Box>

          {job.short_description && (
            <CardDescription className="text-sm text-gray-700">
              {truncate(job.short_description, {
                length: 100,
                omission: "...",
              })}
            </CardDescription>
          )}

          {job.tags.length > 0 && (
            <Box className="flex flex-wrap gap-2">
              {job.tags.slice(0, 3).map((tag, i) => (
                <p
                  key={i}
                  className="bg-blue-100 text-black text-sm rounded-full px-3 py-1 font-medium"
                >
                  {tag}
                </p>
              ))}
            </Box>
          )}

          <Box className="flex flex-col gap-3 mt-auto">
            <Link href={`/search/${job.id}`} className="w-full">
              <Button
                className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors duration-300"
                variant="outline"
              >
                More Details
              </Button>
            </Link>
            <Button
              className="w-full text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 hover:text-white transition-colors duration-300"
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
