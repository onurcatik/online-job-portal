import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    const { userId } = await auth();
    const { companyId } = params;

    const updatedValues = await req.json();

    if (!userId) {
      return new NextResponse("Un-Authorized");
    }

    if (!companyId) {
      return new NextResponse("ID is missing");
    }

    const company = await db.company.update({
      where: {
        id: companyId,
        userId,
      },
      data: {
        ...updatedValues,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log(`[COMPANY_PATCH]: ${error}`);
    return new NextResponse("Internal Server Error");
  }
};


// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // PATCH handler for updating company data
// export const PATCH = async (
//   req: Request,
//   { params }: { params: { companyId: string } }
// ) => {
//   try {
//     // Authenticate user
//     const { userId } = await auth();
//     const { companyId } = params;

//     // Read the JSON payload from the request
//     const updatedValues = await req.json();

//     // Validate required fields
//     if (!userId) {
//       return new NextResponse("Un-Authorized", { status: 401 });
//     }
//     if (!companyId) {
//       return new NextResponse("ID is missing", { status: 400 });
//     }

//     // Map the incoming field "title" to the "name" field in the database,
//     // since the Prisma model doesn't have a "title" field.
//     const dataToUpdate: {
//       name?: string;
//       logo?: string;
//       // add any other fields as necessary
//     } = {};

//     // Update the name if a title is provided
//     if (updatedValues.title) {
//       dataToUpdate.name = updatedValues.title;
//     }
//     // Update the logo if provided
//     if (updatedValues.logo) {
//       dataToUpdate.logo = updatedValues.logo;
//     }

//     // You can add more fields here as needed,
//     // for example, description, coverImage, etc.

//     // Update the company record in the database
//     const company = await db.company.update({
//       where: {
//         id: companyId,
//         userId: userId,
//       },
//       data: dataToUpdate,
//     });

//     // Return the updated company record as JSON
//     return NextResponse.json(company);
//   } catch (error) {
//     console.error(`[COMPANY_PATCH]: ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };
