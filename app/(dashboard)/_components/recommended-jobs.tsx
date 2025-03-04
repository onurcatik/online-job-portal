"use client";

import Box from "@/components/box";
import { Job } from "@prisma/client";
import PageContent from "../(routes)/search/_components/page-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RecommendedJobsListProps {
  jobs: Job[];
  userId: string | null;
}

export const RecommendedJobsList = ({
  jobs,
  userId,
}: RecommendedJobsListProps) => {
  return (
    <Box className="flex flex-col items-center justify-center gap-y-6 my-8 px-4">
      <h2 className="text-3xl font-bold tracking-wide text-gray-900 dark:text-white">
        Recommended Jobs
      </h2>

      <div className="w-full mt-6">
        <PageContent jobs={jobs} userId={userId} />
      </div>

      <Link href="/search" className="mt-8">
        <Button className="w-48 h-12 rounded-xl border border-blue-500 text-blue-500 bg-white dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow hover:shadow-lg">
          View All Jobs
        </Button>
      </Link>
    </Box>
  );
};
