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
//     // Kullanıcı doğrulaması
//     const { userId } = await auth();
//     const { companyId } = params;

//     // İstek gövdesinden gelen veriler
//     const updatedValues = await req.json();

//     // Gerekli alanların kontrolü
//     if (!userId) {
//       return new NextResponse("Un-Authorized", { status: 401 });
//     }
//     if (!companyId) {
//       return new NextResponse("ID is missing", { status: 400 });
//     }

//     // dataToUpdate nesnesini oluşturuyoruz. Tüm güncellemek istediğimiz alanlar burada toplanır.
//     const dataToUpdate: {
//       name?: string;
//       logo?: string;
//       coverImage?: string;
//       description?: string;
//       overview?: string;
//       mail?: string;
//       linkedIn?: string;
//       website?: string;
//       address_line_1?: string;
//       address_line_2?: string;
//       city?: string;
//       state?: string;
//       zipcode?: string;
//     } = {};

//     // "title" varsa, veritabanında "name" alanına aktar; aksi halde gelen "name" değeri kullanılsın.
//     if (updatedValues.title) {
//       dataToUpdate.name = updatedValues.title;
//     } else if (updatedValues.name) {
//       dataToUpdate.name = updatedValues.name;
//     }

//     // Logo alanı ekleniyor
//     if (updatedValues.logo) {
//       dataToUpdate.logo = updatedValues.logo;
//     }

//     // Job cover image varsa, coverImage olarak aktar; yoksa coverImage varsa onu kullan.
//     if (updatedValues.jobCoverImage) {
//       dataToUpdate.coverImage = updatedValues.jobCoverImage;
//     } else if (updatedValues.coverImage) {
//       dataToUpdate.coverImage = updatedValues.coverImage;
//     }

//     // Description alanı
//     if (updatedValues.description) {
//       dataToUpdate.description = updatedValues.description;
//     }

//     // Overview alanı
//     if (updatedValues.overview) {
//       dataToUpdate.overview = updatedValues.overview;
//     }

//     // Ek alanlar
//     if (updatedValues.mail) {
//       dataToUpdate.mail = updatedValues.mail;
//     }
//     if (updatedValues.linkedIn) {
//       dataToUpdate.linkedIn = updatedValues.linkedIn;
//     }
//     if (updatedValues.website) {
//       dataToUpdate.website = updatedValues.website;
//     }
//     if (updatedValues.address_line_1) {
//       dataToUpdate.address_line_1 = updatedValues.address_line_1;
//     }
//     if (updatedValues.address_line_2) {
//       dataToUpdate.address_line_2 = updatedValues.address_line_2;
//     }
//     if (updatedValues.city) {
//       dataToUpdate.city = updatedValues.city;
//     }
//     if (updatedValues.state) {
//       dataToUpdate.state = updatedValues.state;
//     }
//     if (updatedValues.zipcode) {
//       dataToUpdate.zipcode = updatedValues.zipcode;
//     }

//     // Veritabanındaki şirket kaydını güncelle
//     const company = await db.company.update({
//       where: {
//         id: companyId,
//         userId,
//       },
//       data: dataToUpdate,
//     });

//     // Güncellenmiş şirket kaydını JSON olarak döndür
//     return NextResponse.json(company);
//   } catch (error) {
//     console.error(`[COMPANY_PATCH]: ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };
