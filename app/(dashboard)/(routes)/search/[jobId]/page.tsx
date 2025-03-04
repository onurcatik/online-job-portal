import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { JobDetailsPageContent } from "../_components/job-details-page-content";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getJobs } from "@/actions/get-jobs";
import Box from "@/components/box";
import PageContent from "../_components/page-content";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const { userId } = await auth();

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      company: true,
      // attachments: true,
    },
  });

  if (!job) {
    redirect("/search");
  }

  const profile = await db.userProfile.findUnique({
    where: {
      userId: userId as string,
    },
    include: {
      resumes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const jobs = await getJobs({});

  const filteredJobs = jobs.filter(
    (j) => j.id !== job?.id && j.categoryId === job?.categoryId,
  );

  return (
    <div className="flex-col p-4 md:p-8">
      <JobDetailsPageContent job={job} jobId={job.id} userProfile={profile} />

      {/* {filteredJobs && filteredJobs.length > 0 && ( */}
      <>
        <Separator />
        <Box className="flex-col my-4 items-start justify-start px-4 gap-2">
          <h2 className="text-lg font-semibold">Related Jobs :</h2>
          {/* <p className="font-sans">{job?.short_description}</p> */}
        </Box>

        <PageContent jobs={filteredJobs} userId={userId} />
      </>
      {/* )} */}
    </div>
  );
};

export default JobDetailsPage;
