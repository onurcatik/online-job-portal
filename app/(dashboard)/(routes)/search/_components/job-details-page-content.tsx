// "use client";

// import Box from "@/components/box";
// import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
// // import { Preview } from "@/components/preview";
// import { ApplyModal } from "@/components/ui/apply-modal";
// import { Button } from "@/components/ui/button";
// import { Company, Job, Resumes, UserProfile } from "@prisma/client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// interface JobDetailsPageContentProps {
//   job: Job & { company: Company | null };
//   jobId: string;
//   userProfile: (UserProfile & { resumes: Resumes[]; appliedJobs: { jobId: string }[] }) | null;
// }

// export const JobDetailsPageContent = ({
//   job,
//   jobId,
//   userProfile,
// }: JobDetailsPageContentProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   // Yerel state'e atıyoruz ki, uygulama sonrası güncelleme kullanıcıya yansısın.
//   const [profile, setProfile] = useState(userProfile);
//   const router = useRouter();

//   const onApplied = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/users/${profile?.userId}/appliedJobs`,
//         job
//       );
//       toast.success("Job Saved");

//       // API isteğinin başarılı olduğunu varsayarak,
//       // hem backend’de güncellendiğini hem de yerel state’i güncelliyoruz.
//       setProfile((prevProfile) => {
//         if (!prevProfile) return prevProfile;
//         return {
//           ...prevProfile,
//           appliedJobs: [...(prevProfile.appliedJobs || []), { jobId, appliedAt: new Date() }],
//         };
//       });
      

//       /* 
//         Eğer API güncellemesi başarılı ve kalıcı olarak veri tabanına yansıyorsa,
//         sayfa tam refresh yapıldığında sunucudan gelen userProfile içinde yeni appliedJob yer almalıdır.
//         Bu durumda router.refresh()'a ihtiyaç kalmayacaktır.
//       */
//     } catch (error) {
//       console.log((error as Error)?.message);
//       toast.error("Something went wrong.");
//     } finally {
//       setOpen(false);
//       setIsLoading(false);
//       // router.refresh();  <-- Bu satırı kaldırdık.
//     }
//   };

//   return (
//     <>
//       <ApplyModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={onApplied}
//         loading={isLoading}
//         userProfile={profile}
//       />

//       <Box className="mt-4">
//         <CustomBreadCrumb
//           breadCrumbItem={[{ label: "Search", link: "/search" }]}
//           breadCrumbPage={job?.title ?? "No Job Title Available"}
//         />
//       </Box>

//       {/* Job cover image */}
//       <Box className="mt-4 relative">
//         <div className="w-full flex items-center h-72 relative rounded-md overflow-hidden">
//           {job?.imageUrl ? (
//             <Image
//               alt={job.title}
//               fill
//               src={job?.imageUrl}
//               className="object-cover w-full h-full"
//             />
//           ) : (
//             <div className="w-full h-full bg-purple-100 flex items-center justify-center">
//               <h2 className="text-3xl font-semibold tracking-wider text-gray-700">
//                 {job?.title ?? "No Job Title Available"}
//               </h2>
//             </div>
//           )}
//         </div>
//       </Box>

//       {/* Job Title & Company */}
//       <Box className="mt-4">
//         <div className="space-y-2">
//           <h2 className="text-2xl font-semibold text-neutral-600">
//             {job?.title ?? "No Job Title Available"}
//           </h2>

//           <div className="flex items-center gap-2">
//             {job?.company?.logo && (
//               <div className="w-10 h-10 relative">
//                 <Image
//                   alt={job?.company?.name}
//                   src={job?.company?.logo}
//                   width={40}
//                   height={40}
//                   className="object-cover rounded-full"
//                 />
//               </div>
//             )}
//             <span className="text-neutral-500">
//               {job?.company?.name ?? "No Company Name"}
//             </span>
//           </div>
//           {/* action button */}
//           <div>
//           {profile ? (
//   (profile.appliedJobs ?? []).some(
//     (appliedJob) => appliedJob.jobId === jobId
//   ) ? (
//     <Button
//       className="text-sm text-purple-700 border-purple-500 hover:bg-purple-900 hover:text-white hover:shadow-sm"
//       variant={"outline"}
//     >
//       Already Applied
//     </Button>
//   ) : (
//     <Button
//       className="text-sm bg-purple-700 hover:bg-purple-900 hover:shadow-sm"
//       onClick={() => setOpen(true)}
//     >
//       Apply
//     </Button>
//   )
// ) : null}

//           </div>
//         </div>
//       </Box>
//       {/* Description */}
//       <Box className="flex-col my-4 items-start justify-start px-4 gap-2">
//         <h2 className="text-lg font-semibold">Description :</h2>
//         <p className="font-sans">{job?.short_description}</p>
//       </Box>

//       {job?.description && (
//         <Box>
//           {job?.description}
//         </Box>
//       )}
//     </>
//   );
// };


"use client";

import Box from "@/components/box";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { ApplyModal } from "@/components/ui/apply-modal";
import { Button } from "@/components/ui/button";
import { Company, Job, Resumes, UserProfile } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface UpdatedProfile extends UserProfile {
  resumes: Resumes[];
  appliedJobs: { jobId: string; appliedAt?: Date }[];
}


interface JobDetailsPageContentProps {
  job: Job & { company: Company | null };
  jobId: string;
  userProfile: (UserProfile & { resumes: Resumes[]; appliedJobs: { jobId: string; appliedAt?: Date }[] }) | null;
}

export const JobDetailsPageContent = ({
  job,
  jobId,
  userProfile,
}: JobDetailsPageContentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // Yerel state'e atıyoruz ki, uygulama sonrası güncelleme kullanıcıya yansısın.
  const [profile, setProfile] = useState(userProfile);
  const router = useRouter();

  const onApplied = async () => {
    setIsLoading(true);
    try {
      // API çağrısı: backend PATCH endpoint'i, auth'dan gelen userId'yi kullanarak güncelleme yapıyor.
      const response = await axios.patch<UpdatedProfile>(
        `/api/users/${profile?.userId}/appliedJobs`,
        { jobId, userHasApplied: true }
      );
      const updatedProfile = response.data;
      
  
      
      
      // API'den dönen güncellenmiş profile verisini alıyoruz.

      toast.success("Job Başvurusu Kaydedildi");
      
      // Yerel state güncellemesi: Eğer backend güncellemesi başarılı ise,
      // uygulanan job bilgilerini profile state'ine ekliyoruz.
      setProfile((prevProfile) => {
        if (!prevProfile) return prevProfile;
        // API'den gelen güncel appliedJobs dizisini kullanabilirsiniz.
        return {
          ...prevProfile,
          appliedJobs: updatedProfile.appliedJobs,
        };
      });
    } catch (error) {
      console.error("Başvuru kaydı oluşturulurken hata:", (error as Error).message);
      toast.error("Bir sorun oluştu, tekrar deneyiniz.");
    } finally {
      setOpen(false);
      setIsLoading(false);
      // İsterseniz router.refresh() ile sayfa yeniden verileri çekebilirsiniz.
      // router.refresh();
    }
  };

  return (
    <>
      <ApplyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onApplied}
        loading={isLoading}
        userProfile={profile}
      />

      <Box className="mt-4">
        <CustomBreadCrumb
          breadCrumbItem={[{ label: "Search", link: "/search" }]}
          breadCrumbPage={job?.title ?? "No Job Title Available"}
        />
      </Box>

      {/* Job cover image */}
      <Box className="mt-4 relative">
        <div className="w-full flex items-center h-72 relative rounded-md overflow-hidden">
          {job?.imageUrl ? (
            <Image
              alt={job.title}
              fill
              src={job?.imageUrl}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-purple-100 flex items-center justify-center">
              <h2 className="text-3xl font-semibold tracking-wider text-gray-700">
                {job?.title ?? "No Job Title Available"}
              </h2>
            </div>
          )}
        </div>
      </Box>

      {/* Job Title & Company */}
      <Box className="mt-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-neutral-600">
            {job?.title ?? "No Job Title Available"}
          </h2>

          <div className="flex items-center gap-2">
            {job?.company?.logo && (
              <div className="w-10 h-10 relative">
                <Image
                  alt={job?.company?.name}
                  src={job?.company?.logo}
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <span className="text-neutral-500">
              {job?.company?.name ?? "No Company Name"}
            </span>
          </div>

          {/* Action Button */}
          <div>
            {profile ? (
              (profile.appliedJobs ?? []).some(
                (appliedJob) => appliedJob.jobId === jobId
              ) ? (
                <Button
                  className="text-sm text-purple-700 border-purple-500 hover:bg-purple-900 hover:text-white hover:shadow-sm"
                  variant={"outline"}
                >
                  Already Applied
                </Button>
              ) : (
                <Button
                  className="text-sm bg-purple-700 hover:bg-purple-900 hover:shadow-sm"
                  onClick={() => setOpen(true)}
                >
                  Apply
                </Button>
              )
            ) : null}
          </div>
        </div>
      </Box>

      {/* Description */}
      <Box className="flex-col my-4 items-start justify-start px-4 gap-2">
        <h2 className="text-lg font-semibold">Description :</h2>
        <p className="font-sans">{job?.short_description}</p>
      </Box>

      {job?.description && <Box>{job?.description}</Box>}
    </>
  );
};
