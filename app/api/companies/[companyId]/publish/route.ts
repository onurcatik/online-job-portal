import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    // Kullanıcı kimliğini doğrula
    const { userId } = await auth();
    const { companyId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("Company ID is missing", { status: 400 });
    }

    // İlgili şirketi kullanıcıya göre sorgula
    const company = await db.company.findFirst({
      where: {
        id: companyId,
        userId: userId,
      },
    });

    if (!company) {
      return new NextResponse("Company Not Found", { status: 404 });
    }

    // Şirketin isPublished alanını güncelle
    const publishCompany = await db.company.update({
      where: { id: companyId },
      data: { isPublished: true },
    });

    return NextResponse.json(publishCompany);
  } catch (error) {
    console.error("[COMPANY_PUBLISH_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
