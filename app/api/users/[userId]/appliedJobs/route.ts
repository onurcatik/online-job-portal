

// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export const PATCH = async (req: Request) => {
//   try {
//     const { userId } = await auth();
//     // İstekten alınan jobId'nin başında/sonunda boşluk varsa temizleniyor.
//     const jobId = (await req.text()).trim();

//     if (!userId) {
//       return new NextResponse("Un-Authorized", { status: 401 });
//     }

//     // Kullanıcı profili sorgulanıyor
//     const profile = await db.userProfile.findUnique({
//       where: { userId },
//       include: { appliedJobs: true },
//     });

//     let updatedProfile;

//     // Sadece jobId varsa başvuru ekleme işlemi yapılacak
//     if (jobId) {
//       if (profile) {
//         // Eğer profil varsa, aynı jobId'nin daha önce eklenip eklenmediği kontrol ediliyor.
//         const jobExists = profile.appliedJobs.some(
//           (job) => job.jobId === jobId
//         );

//         if (!jobExists) {
//           updatedProfile = await db.userProfile.update({
//             where: { userId },
//             data: {
//               appliedJobs: {
//                 create: {
//                   jobId,
//                 },
//               },
//             },
//             include: { appliedJobs: true },
//           });
//         } else {
//           updatedProfile = profile;
//         }
//       } else {
//         // Profil yoksa, ilk başvuru ile birlikte profil oluşturuluyor.
//         updatedProfile = await db.userProfile.create({
//           data: {
//             userId,
//             fullName: "Örnek Kullanıcı",
//             email: "ornek@eposta.com444",
//             contact: "05195555555",
//             activeResume: "resume_örnek_id",
//             appliedJobs: {
//               create: {
//                 jobId,
//               },
//             },
//           },
//           include: { appliedJobs: true },
//         });
//       }
//     } else {
//       // jobId gönderilmediyse sadece profil oluşturuluyor ya da varolan profil geri döndürülüyor.
//       if (profile) {
//         updatedProfile = profile;
//       } else {
//         updatedProfile = await db.userProfile.create({
//           data: {
//             userId,
//             fullName: "Örnek Kullanıcı",
//             email: "ornek@eposta.com444",
//             contact: "05195555555",
//             activeResume: "resume_örnek_id",
//           },
//           include: { appliedJobs: true },
//         });
//       }
//     }

//     return new NextResponse(JSON.stringify(updatedProfile), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(`[JOB_PATCH] : ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

// app/api/users/[userId]/applyJob/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    // 1. Auth bilgilerini al ve logla
    const { userId } = await auth();
    console.log("Auth'dan gelen userId:", userId);

    // 2. İstek gövdesindeki parametreleri al ve logla
    const { jobId, userHasApplied } = await req.json();
    console.log("İstek gövdesi:", { jobId, userHasApplied });

    // 3. Gerekli kontroller
    if (!userId) {
      console.error("Auth bilgisi yok: userId missing");
      return new NextResponse("Un-Authorized", { status: 401 });
    }
    if (!jobId || !userHasApplied) {
      console.log("Parametreler eksik: jobId veya userHasApplied eksik");
      return new NextResponse("No action taken", { status: 200 });
    }

    // 4. Mevcut profili sorguluyoruz.
    let profile = await db.userProfile.findUnique({
      where: { userId },
      include: { appliedJobs: true },
    });
    console.log("Profil sorgulama sonucu:", profile);

    if (!profile) {
      // 5. Profil yoksa, yeni profil oluştur ve appliedJob ekle.
      console.log("Profil bulunamadı, yeni profil oluşturuluyor...");
      profile = await db.userProfile.create({
        data: {
          userId,
          fullName: "Örnek Kullanıcıı", // Gerçek kullanıcı bilgilerini kullanmayı düşünün.
          email: "ornek@eposta.com444",  // Gerçek e-posta bilgisini alın.
          contact: "05195555555",        // Gerçek telefon numarası.
          activeResume: "resume_örnek_id", // Gerçek resume bilgisi.
          appliedJobs: {
            create: { jobId },
          },
        },
        include: { appliedJobs: true },
      });
      console.log("Yeni profil oluşturuldu:", profile);
    } else {
      // 6. Eğer profil varsa, aynı jobId için appliedJob eklenip eklenmediğini kontrol et.
      const alreadyApplied = profile.appliedJobs.some((job) => job.jobId === jobId);
      if (!alreadyApplied) {
        console.log("Profil var fakat bu job için appliedJob eklenmemiş. Güncelleme yapılıyor...");
        profile = await db.userProfile.update({
          where: { userId },
          data: {
            appliedJobs: {
              create: { jobId },
            },
          },
          include: { appliedJobs: true },
        });
        console.log("Mevcut profile appliedJob eklendi:", profile);
      } else {
        console.log("Kullanıcı zaten bu job için başvuru yapmış.");
      }
    }

    // 7. Sonuçları JSON formatında döndür.
    return new NextResponse(JSON.stringify(profile), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AppliedJob oluşturulurken hata:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
