import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    // Authenticate user and retrieve the userId
    const { userId } = await auth();

    // If there's no userId, return an Unauthorized error
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    // Parse the incoming JSON data for the update
    const values = await req.json();

    // Fetch the user's profile from the database
    const profile = await db.userProfile.findUnique({
      where: {
        userId, // Using userId to locate the profile
      },
    });

    let userProfile;

    if (profile) {
      userProfile = await db.userProfile.update({
        where: {
          userId,
        },
        data: {
          ...values,
        },
      });
    } else {
      userProfile = await db.userProfile.create({
        data: {
          userId,
          ...values,
        },
      });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.log(`[JOB_PATCH] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
