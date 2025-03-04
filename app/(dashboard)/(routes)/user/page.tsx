import Box from "@/components/box";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { NameForm } from "@/app/(dashboard)/(routes)/user/_components/name-form";
import { Prisma, UserProfile } from "@prisma/client";
import { db } from "@/lib/db";
import { EmailForm } from "@/app/(dashboard)/(routes)/user/_components/email-form";
import { ContactForm } from "./_components/contact-form";
import { columns } from "@/app/(dashboard)/(routes)/user/_components/columns";
import { DataTable } from "@/components/data-table";
import { format } from "date-fns"; // Eksik import eklendi
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// AppliedJobsColumns türü tanımlandı
type AppliedJobsColumns = {
  id: string;
  title: string;
  company: string;
  category: string;
  appliedAt: string;
};

const ProfilePage = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Kullanıcı profili verisini getiriyoruz (appliedJobs eklendi)
  const profile = await db.userProfile.findUnique({
    where: { userId },
    include: {
      resumes: {
        orderBy: { createdAt: "desc" },
      },
      appliedJobs: true, // Eksik ilişki eklendi
    },
  });

  // Kullanıcının ilanlarını getiriyoruz
  const jobs = await db.job.findMany({
    where: { userId },
    include: {
      company: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Başvurulan ilanları filtreleme
  const filteredAppliedJobs =
    profile && profile.appliedJobs && profile.appliedJobs.length > 0
      ? jobs
          .filter((job) =>
            profile.appliedJobs.some(
              (appliedJob: { jobId: string }) => appliedJob.jobId === job.id,
            ),
          )
          .map((job) => ({
            ...job,
            appliedAt: profile.appliedJobs.find(
              (appliedJob: { jobId: string; appliedAt?: Date }) =>
                appliedJob.jobId === job.id,
            )?.appliedAt,
          }))
      : [];

  // Veriyi tablo için formatlıyoruz
  const formattedJobs: AppliedJobsColumns[] = filteredAppliedJobs.map(
    (job) => ({
      id: job.id,
      title: job.title,
      company: job.company ? job.company.name : "",
      category: job.category ? job.category.name : "",
      appliedAt: job.appliedAt
        ? format(new Date(job.appliedAt), "yyyy-MM-dd")
        : "",
    }),
  );

  const followedCompanies = await db.company.findMany({
    where: {
      followers: {
        has: userId,
      },
    },
    orderBy: {
      created: "desc",
    },
  });

  return (
    <div className="flex-col p-4 md:p-8 items-center justify-center flex">
      <div className="flex-col p-4 md:p-8 items-center justify-center flex mr-[1800px]">
        <Box className="">
          <CustomBreadCrumb breadCrumbPage="My Profile" breadCrumbItem={[]} />
        </Box>
      </div>

      <Box className="flex-col p-4 rounded-md border-2 mt-8 w-full space-y-6">
        {user && user.hasImage && (
          <div className="aspect-square w-24 h-24 rounded-full shadow-md relative">
            <Image
              fill
              className="w-full h-full object-cover"
              alt="User Profile Pic"
              src={user.imageUrl}
            />
          </div>
        )}

        <NameForm initialData={profile} userId={userId} />
        <EmailForm initialData={profile} userId={userId} />
        <ContactForm initialData={profile} userId={userId} />
      </Box>

      <Box className="flex-col items-start justify-start mt-12">
        <h2 className="text-2xl text-muted-foreground font-semibold">
          Applied Jobs
        </h2>

        <div className="w-full mt-6">
          <DataTable
            columns={columns}
            searchKey="company"
            data={formattedJobs}
          />
        </div>
      </Box>

      <Box className="flex-col items-start justify-start mt-12">
        <h2 className="text-2xl text-muted-foreground font-semibold">
          Followed Companies
        </h2>

        <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-6 gap-2">
          {followedCompanies.length === 0 ? (
            <p>No Companies followed yet</p>
          ) : (
            <React.Fragment>
              {followedCompanies.map((com) => (
                <Card className="p-3 space-y-2 relative" key={com.id}>
                  {/* Şirket detaylarına yönlendiren buton */}
                  <div className="w-full flex items-center justify-end">
                    {com.id && (
                      <Link href={`/companies/${com.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Şirket Logosu */}
                  {com.logo && (
                    <div className="w-full h-24 flex items-center justify-center relative overflow-hidden">
                      <Image
                        fill
                        alt="Logo"
                        src={com.logo}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </Card>
              ))}
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
};

export default ProfilePage;
