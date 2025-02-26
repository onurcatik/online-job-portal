import { getJobs } from "@/actions/get-jobs";
import Box from "@/components/box";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import CompanyDetailContentPage from "./_components/company-detail-content"; // Ensure correct import
import { TabContentSection } from "./_components/tab-content-section";

const CompanyDetailPage = async ({
  params,
}: { params: { companyId: string } }) => {
  const { userId } = await auth();

  const company = await db.company.findUnique({
    where: {
      id: params.companyId,
    },
  });

  if (!company || !userId) {
    redirect("/");
  }

  const jobs = await db.job.findMany({
    where: {
      companyId: params.companyId,
    },
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  





  return (
    <div className="flex-col">
      <Box className="mt-4 items-center justify-start gap-2 mb-4 px-2">
        <CustomBreadCrumb
          breadCrumbItem={[{ label: "Search", link: "/search" }]}
          breadCrumbPage={company?.name ?? ""} // Provide a valid fallback
        />
      </Box>

      {/* company image */}
      {company?.logo && (
        <div className="w-full flex items-center justify-center overflow-hidden relative h-98 z-10">
          <Image alt={company?.name ?? "Company Logo"} src={company.logo} fill className="w-full h-full object-cover" />
        </div>
      )}
      <CompanyDetailContentPage userId={userId} company={company} jobs={jobs} />
      <TabContentSection userId={userId} company={company} jobs={jobs}/>
    </div>
  );
};

export default CompanyDetailPage;
