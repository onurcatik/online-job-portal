// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export const PATCH = async (
//   req: Request,
//   { params }: { params: { companyId: string } }
// ) => {
//   try {
//     const { userId } = await auth();
//     const { companyId } = params;

//     if (!userId) {
//       return new NextResponse("Un-Authorized", { status: 401 });
//     }

//     if (!companyId) {
//       return new NextResponse("ID is missing", { status: 401 });
//     }

//     const company = await db.company.findUnique({
//       where: { id: companyId },
//     });

//     if (!company) {
//       return new NextResponse("Company Not Found", { status: 404 });
//     }

//     // Ensure followers array exists
//     if (!company.followers || !Array.isArray(company.followers)) {
//       return new NextResponse("Followers data is invalid", { status: 400 });
//     }

//     // Find user index in followers array
//     const userIndex = company.followers.indexOf(userId);

//     if (userIndex !== -1) {
//       const updatedCompany = await db.company.update({
//         where: { id: companyId }, // userId should not be part of the where clause
//         data: {
//           followers: {
//             set: company.followers.filter((followerId) => followerId !== userId),
//           },
//         },
//       });

//       return new NextResponse(JSON.stringify(updatedCompany), { status: 200 });
//     } else {
//       return new NextResponse("User not found in the followers", { status: 404 });
//     }
//   } catch (error) {
//     console.error(`[COMPANY_PATCH] ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  context: { params: { companyId: string } },
) => {
  try {
    console.log("PATCH işlemi başlatıldı.");

    const { userId } = await auth();
    // Dinamik parametreyi await ederek alıyoruz
    const params = await Promise.resolve(context.params);
    const { companyId } = params;
    console.log("Kullanıcı kimliği:", userId, " - Şirket kimliği:", companyId);

    if (!userId) {
      console.error("Kullanıcı kimliği bulunamadı.");
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!companyId) {
      console.error("Şirket kimliği eksik.");
      return new NextResponse("ID is missing", { status: 401 });
    }

    const company = await db.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      console.error("Şirket bulunamadı:", companyId);
      return new NextResponse("Company Not Found", { status: 404 });
    }
    console.log("Şirket bulundu:", company);

    // Followers verisinin geçerli olup olmadığını kontrol et
    if (!company.followers || !Array.isArray(company.followers)) {
      console.error("Followers verisi geçersiz:", company.followers);
      return new NextResponse("Followers data is invalid", { status: 400 });
    }

    // Kullanıcının takipçiler arasında olup olmadığını kontrol et
    const userIndex = company.followers.indexOf(userId);
    console.log("Kullanıcının takipçiler içindeki indexi:", userIndex);

    if (userIndex !== -1) {
      const updatedCompany = await db.company.update({
        where: { id: companyId }, // userId where clause'da yer almamalı
        data: {
          followers: {
            set: company.followers.filter(
              (followerId) => followerId !== userId,
            ),
          },
        },
      });
      console.log("Güncellenen şirket:", updatedCompany);
      return new NextResponse(JSON.stringify(updatedCompany), { status: 200 });
    } else {
      console.error("Kullanıcı takipçiler arasında bulunamadı.");
      return new NextResponse("User not found in the followers", {
        status: 404,
      });
    }
  } catch (error) {
    console.error("[COMPANY_PATCH] Hata:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
