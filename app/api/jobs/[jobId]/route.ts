// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export const PATCH = async (
//   req: Request,
//   { params }: { params: { jobId: string } }
// ) => {
//   try {
//     const { userId } = await auth();
//     const {jobId} =  params;

//     const updatedValues = await req.json();

//     if (!userId) {
//         return new NextResponse("Un-Authorized", { status: 401 });
//       }

//     if (!jobId) {
//       return new NextResponse("ID is missing", { status: 401 });
//     }

//     const job = await db.job.update({
//     where: {
//         id : jobId,
//         userId,
//     },
//     data: {
//         ...updatedValues,
//       }
//     });

//     return NextResponse.json(job);
//   } catch (error) {
//     console.log(`[JOB_PATCH] : ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { jobId: string } },
) => {
  try {
    const { userId } = await auth();
    const { jobId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("Job ID is missing", { status: 400 });
    }

    // İstekten gelen verileri parse et
    const updatedValues = await req.json();
    const { companyId, ...jobData } = updatedValues;

    // Önce mevcut Job kaydını getirelim ve kullanıcının yetkisini kontrol edelim.
    const existingJob = await db.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return new NextResponse("Job not found", { status: 404 });
    }

    if (existingJob.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Güncelleme işlemi:
    // Eğer companyId gelmişse, Job kaydını ilgili Company ile ilişkilendir (connect)
    const updatedJob = await db.job.update({
      where: { id: jobId },
      data: {
        ...jobData,
        ...(companyId
          ? {
              company: {
                connect: { id: companyId },
              },
            }
          : {}),
      },
      include: {
        company: true, // İlişkili Company bilgisini de getirir
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("[JOB_PATCH] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// delete the job id

export const DELETE = async (
  req: Request,
  { params }: { params: { jobId: string } },
) => {
  try {
    const { userId } = await auth();
    const { jobId } = params;

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("ID is missing", { status: 401 });
    }

    const deleteJob = await db.job.delete({
      where: {
        id: jobId,
        userId,
      },
    });

    return NextResponse.json(deleteJob);
  } catch (error) {
    console.error("[JOB_DELETE_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
