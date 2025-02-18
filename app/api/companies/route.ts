import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return new NextResponse("Name is missing", { status: 400 });
    }

    const company = await db.company.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("[COMPANY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
