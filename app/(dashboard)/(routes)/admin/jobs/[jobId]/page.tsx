import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard, ListChecks, File } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { JobPublishAction } from "./_components/job-publish-actions";
import { CategoryForm } from "./_components/category-form";
import { ImageForm } from "./_components/image-form";
import { ShortDescription } from "./_components/short-description";
import { ShiftTimingForm } from "./_components/shift-timing-mode";
import { HourlyRateForm } from "./_components/hourly-rate-form";
import { WorkModeForm } from "./_components/work-mode-form";
import { YearsOfExperienceForm } from "./_components/work-experience-form";
import { JobDescription } from "./_components/job-description";
import { TagsForm } from "./_components/tags-form";
import { CompanyForm } from "../../companies/[companyId]/company-form";
import { LocationForm } from "./_components/job-location";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  // Destructure the jobId synchronously
  const { jobId } = await params;

  // verify the MongoDB ID
  const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!validObjectIdRegex.test(jobId)) {
    return redirect("/admin/jobs");
  }

  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const job = await db.job.findUnique({
    where: {
      id: jobId,
      userId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      name: "desc",
    },
  });

  if (!job) {
    return redirect("/admin/jobs");
  }

  const requiredFields = [
    job.title,
    job.description,
    job.imageUrl,
    job.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      <Link href="/admin/jobs">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <ArrowLeft className="w-4 h-4" />
          Back
        </div>
      </Link>

      {/* title */}
      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Job Setup</h1>
          <span className="text-sm text-neutral-500">
            Complete All Fields {completionText}
          </span>
        </div>
        {/* action button */}
        <JobPublishAction
          jobId={jobId} // use the destructured jobId here
          isPublished={job.isPublished}
          disabled={!isComplete}
        />
      </div>
      {/* warning before publishing the course */}
      {!job.isPublished && (
        <Banner
          variant="warning"
          label="This job is unpublished. It will not be visible in the jobs list"
        />
      )}

      {/* container layout */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            {/* title */}
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl text-neutral-700">Customize your job</h2>
            </div>
            {/* title form */}
            <TitleForm initialData={job} jobId={job.id} />

            <CategoryForm
              initialData={job}
              jobId={job.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <div>
              <LocationForm initialData={job} jobId={job.id} />

              <ImageForm initialData={job} jobId={job.id} />

              <ShortDescription initialData={job} jobId={job.id} />

              <ShiftTimingForm initialData={job} jobId={job.id} />

              <HourlyRateForm initialData={job} jobId={job.id} />

              <WorkModeForm initialData={job} jobId={job.id} />

              <YearsOfExperienceForm initialData={job} jobId={job.id} />

              <JobDescription initialData={job} jobId={job.id} />
            </div>
          </div>
          {/* right container */}

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl text-neutral-700">Job Requirements</h2>
              </div>
              <TagsForm initialData={job} jobId={job.id} />
            </div>

            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl text-neutral-700">Company Details</h2>
            </div>

            {/* company details */}

            <CompanyForm
              initialData={job}
              companyId={job.companyId ?? ""}
              jobId={job.id}
              options={companies.map((company) => ({
                label: company.name,
                value: company.id,
              }))}
            />
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl text-neutral-700">Job Attachments</h2>
            </div>
          </div>

          <div>
            {/* attachements */}

            {/* company details */}
          </div>

          {/* description */}
          {/* <div className="col-span-2">
            <JobDescription initialData={job} jobId={job.id} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
