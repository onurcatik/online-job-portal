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

//     const updatedValues = await req.json();

//     if (!userId) {
//       return new NextResponse("Un-Authorized");
//     }

//     if (!companyId) {
//       return new NextResponse("ID is missing");
//     }

//     const company = await db.company.update({
//       where: {
//         id: companyId,
//         userId,
//       },
//       data: {
//         ...updatedValues,
//       },
//     });

//     return NextResponse.json(company);
//   } catch (error) {
//     console.log(`[COMPANY_PATCH]: ${error}`);
//     return new NextResponse("Internal Server Error");
//   }
// };

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

//     // Cover image alanı ekleniyor
//     if (updatedValues.jobCoverImage || updatedValues.coverImage) {
//       dataToUpdate.coverImage =
//         updatedValues.jobCoverImage || updatedValues.coverImage;
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

// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export const PATCH = async (
//   req: Request,
//   { params }: { params: { companyId: string } }
// ) => {
//   try {
//     // Kullanıcı doğrulaması
//     const { userId } = await auth();
//     const { companyId } = params;
//     const updatedValues = await req.json();
//     console.log("PATCH request body:", updatedValues);

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!companyId) {
//       return new NextResponse("Company ID is missing", { status: 400 });
//     }

//     // Mevcut company kaydını getiriyoruz
//     const companyRecord = await db.company.findUnique({
//       where: { id: companyId },
//     });

//     if (!companyRecord) {
//       return new NextResponse("Company not found", { status: 404 });
//     }

//     // Kullanıcının yetkisini kontrol ediyoruz
//     if (companyRecord.userId !== userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Güncelleme yapılmasını istemediğimiz alanları çıkarıyoruz (örneğin title)
//     const { title, ...companyData } = updatedValues;

//     // Company kaydını güncelliyoruz
//     const company = await db.company.update({
//       where: { id: companyId },
//       data: {
//         ...companyData,
//       },
//     });

//     return NextResponse.json(company);
//   } catch (error) {
//     console.error("[COMPANY_PATCH_ERROR]:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// PATCH /api/companies/:companyId
export const PATCH = async (
  req: Request,
  { params }: { params: { companyId: string } },
) => {
  try {
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { companyId } = params;
    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID is missing" },
        { status: 400 },
      );
    }

    // Parse the JSON payload from the request
    const updatedValues = await req.json();
    console.log("PATCH request body:", updatedValues);

    // Fetch the existing company record from the database
    const companyRecord = await db.company.findUnique({
      where: { id: companyId },
    });
    if (!companyRecord) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Check if the authenticated user is allowed to update this company
    if (companyRecord.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Remove fields that should not be updated (e.g., title) and extract imageUrl
    const { title, imageUrl, ...otherData } = updatedValues;

    // Map imageUrl to coverImage if it exists
    const updateData = {
      ...otherData,
      ...(imageUrl && { coverImage: imageUrl }),
    };

    // Update the company record in the database
    const updatedCompany = await db.company.update({
      where: { id: companyId },
      data: updateData,
    });

    return NextResponse.json(updatedCompany);
  } catch (error: any) {
    console.error("[COMPANY_PATCH_ERROR]:", error);

    if (error.response) {
      console.error("Error response data:", error.response.data);
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

///////////////////////

export const DELETE = async (
  req: Request,
  { params }: { params: { companyId: string } },
) => {
  try {
    const { userId } = await auth();
    const { companyId } = params;

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("ID is missing", { status: 401 });
    }

    const deleteCompany = await db.company.delete({
      where: {
        id: companyId,
        userId,
      },
    });

    return NextResponse.json(deleteCompany);
  } catch (error) {
    console.error("[JOB_DELETE_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
