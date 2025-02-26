import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, context: { params: { companyId: string } }) => {
  try {
    console.log("PATCH işlemi başlatıldı.");

    const { userId } = await auth();
    // Dinamik parametreyi await ederek alıyoruz:
    const params = await Promise.resolve(context.params);
    const { companyId } = params;
    console.log("Kullanıcı kimliği:", userId, " - Şirket kimliği:", companyId);

    // İstek body'si varsa JSON olarak parse etmeye çalışıyoruz:
    let updatedValues = {};
    try {
      updatedValues = await req.json();
      console.log("Gelen JSON verisi:", updatedValues);
    } catch (e) {
      console.warn("JSON body boş ya da geçersiz:", e);
    }

    if (!userId) {
      console.error("Kullanıcı kimliği bulunamadı.");
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!companyId) {
      console.error("Şirket kimliği eksik.");
      return new NextResponse("ID Is missing", { status: 401 });
    }

    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      console.error("Şirket bulunamadı:", companyId);
      return new NextResponse("Company Not Found", { status: 401 });
    }
    console.log("Şirket bulundu:", company);

    // Şirketin kullanıcının sahibi olup olmadığını kontrol et
    if (company.userId !== userId) {
      console.error("Kullanıcının şirket üzerinde yetkisi yok. Şirket sahibi:", company.userId);
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Takipçi (followers) güncelleme verisini hazırla
    const updatedData = {
      followers: company.followers 
        ? { push: userId } 
        : [userId]
    };
    console.log("Güncellenen veri:", updatedData);

    const updatedCompany = await db.company.update({
      where: {
        id: companyId,
      },
      data: updatedData
    });

    console.log("Şirket güncellendi:", updatedCompany);
    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("[COMPANY_PATCH] Hata:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
