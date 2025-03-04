import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  context: { params: { companyId: string } },
) => {
  try {
    // Await the dynamic params before usage.
    const { params } = await Promise.resolve(context);
    const { companyId } = params;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("Id Is Missing", { status: 404 });
    }

    const job = await db.company.findFirst({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!job) {
      return new NextResponse("Job Not Found", { status: 404 });
    }

    const updatedJob = await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("[JOB_PUBLISH_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
