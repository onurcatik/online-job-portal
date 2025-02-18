import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { companyId: string } }) => {
  try {
    const { userId } = await auth();
    const { companyId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("Company ID is missing", { status: 400 });
    }

    const updatedValues = await req.json();

    const company = await db.company.update({
      where: {
        id: companyId,
        userId, // Ensure the company belongs to the authenticated user
      },
      data: {
        ...updatedValues,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("[COMPANY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
