// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";
// import { format } from "date-fns";
// import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
// import Box from "@/components/box";
// import { DataTable } from "@/components/data-table";
// import { columns } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/applicants/columns";
// import { NextResponse } from "next/server";

// const JobApplicantsPage = async (props: { params: { jobId: string } }) => {
//   const { jobId } = props.params;

//   if (!jobId) {
//     redirect("/admin/jobs");
//   }

//   // Örnek kullanıcı id'si (her kullanıcı için benzersiz olmalı)
//   const userId = "TEst12311";

//   /*
//     Kullanıcının bu işe gerçekten başvurup başvurmadığını belirleyen kontrol.
//     Gerçek senaryoda bu değer form verisi, API isteği veya başka bir mantıkla belirlenir.
//   */
//   const userHasApplied = true; // true ise başvuru işlemi yapılır

//   // Profil sorgulaması
// let profile = await db.userProfile.findUnique({
//   where: { userId },
//   include: { appliedJobs: true },
// });

// if (!profile) {
//   // Profil yoksa, oluştur ve başvuru bilgilerini ekle.
//   if (userHasApplied) {
//     profile = await db.userProfile.create({
//       data: {
//         userId,
//         fullName: "Örnek Kullanıcıı",
//         email: "ornek@eposta.com444",
//         contact: "06195555555",
//         activeResume: "resume_örnek_id",
//         appliedJobs: {
//           create: { jobId },
//         },
//       },
//       include: { appliedJobs: true },
//     });
//   }
// } else if (userHasApplied) {
//   // Profil varsa, aynı jobId'nin daha önce eklenip eklenmediğini kontrol et.
//   const alreadyApplied = profile.appliedJobs.some((job) => job.jobId === jobId);

//   if (!alreadyApplied) {
//     // Eğer başvuru eklenmemişse, yalnızca appliedJobs alanını güncelle.
//     profile = await db.userProfile.update({
//       where: { userId },
//       data: {
//         appliedJobs: {
//           create: { jobId },
//         },
//       },
//       include: { appliedJobs: true },
//     });
//   }
// }

//   // İlgili jobId ile eşleşen profilleri sorguluyoruz.
//   const filteredProfiles = await db.userProfile.findMany({
//     where: {
//       appliedJobs: {
//         some: { jobId },
//       },
//     },
//     include: {
//       appliedJobs: {
//         where: { jobId },
//       },
//     },
//   });

//   // Her profilden yalnızca ilgili jobId'ye ait appliedJob bilgilerini alıyoruz.
//   const formattedProfiles = filteredProfiles.flatMap((profile) =>
//     profile.appliedJobs.map((appliedJob) => ({
//       id: profile.userId,
//       fullname: profile.fullName,
//       email: profile.email,
//       contact: profile.contact,
//       appliedAt: appliedJob?.appliedAt
//         ? format(new Date(appliedJob.appliedAt), "MMMM do, yyyy")
//         : "",
//       resume: profile.activeResume ?? "",
//       resumeName: profile.activeResume ?? "",
//     }))
//   );

//   try {
//     // console.log("jobId param:", jobId);
//     // console.log("profile.appliedJobs:", profile?.appliedJobs);
//   } catch (error) {
//     console.error("Hata oluştu while formatting profiles:", error);
//   }

//   return (
//     <div className="flex-col p-4 md:p-8 items-center justify-center flex">
//       <Box>
//         <CustomBreadCrumb
//           breadCrumbPage="Applicants"
//           breadCrumbItem={[
//             { link: "/admin/jobs", label: "Jobs" },
//             { link: `/admin/jobs/${jobId}`, label: "Job Details" },
//           ]}
//         />
//       </Box>

//       <div className="mt-6 w-full">
//         <DataTable columns={columns} data={formattedProfiles} searchKey="fullname" />
//       </div>
//     </div>
//   );
// };

// export default JobApplicantsPage;

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import Box from "@/components/box";
import { DataTable } from "@/components/data-table";
import { columns } from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/applicants/_components/columns";

const JobApplicantsPage = async (props: { params: { jobId: string } }) => {
  const { jobId } = props.params;
  if (!jobId) {
    redirect("/admin/jobs");
  }

  // Authenticated kullanıcı bilgisini alıyoruz
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  /**
   * Burada gerçek senaryoda kullanıcı uygulama butonuna bastığında veya
   * form gönderdiğinde true olacak şekilde belirlenir.
   */
  const userHasApplied = true;

  // Kullanıcıya ait profili (varsa) ve ilgili job başvurularını sorguluyoruz.
  try {
    let profile = await db.userProfile.findUnique({
      where: { userId },
      include: {
        appliedJobs: { where: { jobId } },
      },
    });
    console.log("Profil sorgulama sonucu:", profile);

    if (!profile) {
      profile = await db.userProfile.create({
        data: {
          userId,
          fullName: "Gerçek Kullanıcı Adı", // Clerk'den alınan bilgiyi kullanın
          email: "gercek@eposta.com", // Clerk'den alınan bilgiyi kullanın
          contact: "Kullanıcı Telefonu", // Gerçek değeri kullanın
          activeResume: "resume_örnek_id",
          appliedJobs: { create: { jobId } },
        },
        include: { appliedJobs: true },
      });
      console.log("Yeni profil oluşturuldu:", profile);
    } else if (profile && profile.appliedJobs.length === 0) {
      profile = await db.userProfile.update({
        where: { userId },
        data: { appliedJobs: { create: { jobId } } },
        include: { appliedJobs: true },
      });
      console.log("Mevcut profile appliedJob eklendi:", profile);
    }
  } catch (error) {
    console.error("AppliedJob oluşturulurken hata:", error);
  }

  // Bu jobId'ye başvuran tüm profilleri çekiyoruz
  const filteredProfiles = await db.userProfile.findMany({
    where: {
      appliedJobs: {
        some: { jobId },
      },
    },
    include: {
      appliedJobs: {
        where: { jobId },
      },
    },
  });

  // Tabloya uygun veriyi oluşturuyoruz
  const formattedProfiles = filteredProfiles.flatMap((profile) =>
    profile.appliedJobs.map((appliedJob) => ({
      id: profile.userId,
      fullname: profile.fullName,
      email: profile.email,
      contact: profile.contact,
      appliedAt: appliedJob?.appliedAt
        ? format(new Date(appliedJob.appliedAt), "MMMM do, yyyy")
        : "",
      resume: profile.activeResume ?? "",
      resumeName: profile.activeResume ?? "",
    })),
  );

  return (
    <div className="flex-col p-4 md:p-8 items-center justify-center flex">
      <Box>
        <CustomBreadCrumb
          breadCrumbPage="Applicants"
          breadCrumbItem={[
            { link: "/admin/jobs", label: "Jobs" },
            { link: `/admin/jobs/${jobId}`, label: "Job Details" },
          ]}
        />
      </Box>

      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={formattedProfiles}
          searchKey="fullname"
        />
      </div>
    </div>
  );
};

export default JobApplicantsPage;
