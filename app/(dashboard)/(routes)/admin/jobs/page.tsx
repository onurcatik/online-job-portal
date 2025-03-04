import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns, JobsColumns } from "./[jobId]/_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { format } from "date-fns";

const JobsPageOverview = async () => {
  const authUser = await auth();
  const { userId } = authUser;

  if (!userId) {
    return redirect("/");
  }

  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    include: {
      category: true,
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log("Jobs :", jobs);

  const formattedJobs: JobsColumns[] = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company ? job.company?.name : "N/A",
    category: job.category ? job.category?.name : "N/A",
    isPublished: job.isPublished,
    createdAt: job.createdAt
      ? format(new Date(job.createdAt), "MMMM do, yyyy")
      : "N/A",
    job: job.title, // Assuming the job title is appropriate for the job property
  }));

  return (
    <div className="p-6">
      <div className="flex items-end justify-end">
        <Link href="/admin/create">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Job
          </Button>
        </Link>
      </div>

      {/* datatable - List of jobs */}
      <div>
        {formattedJobs.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <DataTable columns={columns} data={formattedJobs} searchKey="title" />
        )}
      </div>
    </div>
  );
};

export default JobsPageOverview;
