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
      return new NextResponse("Id Is Missing", { status: 404 });
    }

    const job = await db.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      return new NextResponse("Job Not Found", { status: 404 });
    }

    const publishJob = await db.job.update({
      where: {
        id: jobId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(publishJob);
  } catch (error) {
    console.error("[JOB_PUBLISH_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
