import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard, ListChecks, Network } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/title-form";
import { JobPublishAction } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/job-publish-actions";
import { CategoryForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/category-form";
import { ImageForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/image-form"; // Ensure this path is correct and the file exists
import { ShiftTimingForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/shift-timing-mode";
import { HourlyRateForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/hourly-rate-form";
import { WorkModeForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/work-mode-form";
import { YearsOfExperienceForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/work-experience-form";
import { TagsForm } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/tags-form";
import { JobDescription } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/_components/job-description";
import { CompanyName } from "./name-form";
import { CompanyDescription } from "./description-form";
import { CompanyLogoForm } from "./logo-form";
import { CompanySocialContactsForm } from "./social-contacts-form";
import { CompanyCoverImageForm } from "./cover-image-form";
import CompaniesOverviewPage from "../page";
import { CompanyOverviewForm } from "./company-overview";
import { WhyJoinUsForm } from "./why-join-us";

const CompanyEditPage = async ({
  params,
}: {
  params: { companyId: string };
}) => {
  const { companyId } = params;

  // verify the MongoDB ID
  const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!validObjectIdRegex.test(companyId)) {
    return redirect("/admin/companies");
  }

  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const company = await db.company.findUnique({
    where: {
      id: companyId,
      userId,
    },
    select: {
      name: true,
      id: true,
      userId: true,
      description: true,
      logo: true,
      coverImage: true,
      mail: true,
      website: true,
      linkedIn: true,
      address_line_1: true,
      city: true,
      state: true,
      address_line_2: true,
      zipcode: true,
      followers: true,
      created: true,
      overview: true,
      whyJoinUs: true,
      updated: true,
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!company) {
    return redirect(`/admin/companies`);
  }

  const requiredFields = [
    company?.name,
    company?.description,
    company?.logo,
    company?.coverImage,
    company?.mail,
    company?.website,
    company?.linkedIn,
    company?.address_line_1,
    company?.city,
    company?.state,
    company?.overview,
    company?.whyJoinUs,
  ].filter(Boolean); // Removes falsy values (null, undefined, empty string)

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
          <h1 className="text-2xl font-medium">Company Setup</h1>
          <span className="text-sm text-neutral-500">
            Complete All Fields {completionText}
          </span>
        </div>
        {/* action button */}
      </div>
      {/* warning before publishing the course */}
      {/* {!company.isPublished && (
        <Banner
          variant="warning"
          label="This company is unpublished. It will not be visible in the companys list"
        />  */}

      {/* container layout */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            {/* title */}
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl text-neutral-700">
                Customize your company
              </h2>
            </div>

            {/* title form */}

            <CompanyName
              initialData={{ ...company, title: company.name }}
              companyId={company.id}
            />

            <CompanyDescription
              initialData={{
                ...company,
                description: company.description || "",
              }}
              companyId={company.id}
            />

<CompanyLogoForm
  initialData={{
    ...company,
    logo: company.logo || "",
    title: company.name,
  }}
  companyId={company.id}  // doğru prop ismi ve değeri
/>
           
          </div>

          {/* right container */}
          <div className="space-y-6">
            {/* right container */}
            <div className="space-y-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Network} />
                <h2 className="text-xl">Company Social Contacts</h2>
              </div>
              
              
              <CompanySocialContactsForm
                initialData={company}
                companyId={company.id}
              />

              {/* <CompanyCoverImageForm
                initialData={{
                  ...company,
                  coverImage: company.coverImage || "",
                  title: company.name,
                }}
                companyId={company.id}
              /> */}
            </div>
            <div>
              <div className="col-span-2">
                <CompanyOverviewForm
                  initialData={{
                    ...company,
                    overview: company.overview || "",
                    followers: company.followers.length,
                  }}
                  companyId={company.id}
                />
              </div>
              <div className="col-span-2">
                <WhyJoinUsForm
                  initialData={{
                    ...company,
                    overview: company.overview || "",
                    followers: company.followers,
                  }}
                  companyId={company.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEditPage;