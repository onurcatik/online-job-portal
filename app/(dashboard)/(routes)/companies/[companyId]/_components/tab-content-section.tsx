"use client";

import { Company, Job } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobsTabContent } from "./jobs-tab-content";

interface TabContentSectionProps {
  userId: string | null;
  company: Company;
  jobs: Job[];
}

export const TabContentSection = ({
  userId,
  company,
  jobs,
}: TabContentSectionProps) => {
  // Debug: Company verisini kontrol edin
  console.log("Company Object:", company);

  return (
    <div className="w-full my-4 mt-12">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-transparent shadow-md">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="whyJoinUs"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Why Join Us
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {company.overview}
        </TabsContent>

        <TabsContent value="whyJoinUs">
  {company.whyJoinUs && company.whyJoinUs.trim().length > 0
    ? company.whyJoinUs
    : "No 'Why Join Us' content available."}
</TabsContent>

        <TabsContent value="jobs">
        <JobsTabContent userId={userId} jobs={jobs}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};
