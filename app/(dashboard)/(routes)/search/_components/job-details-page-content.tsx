// "use client";

// import Box from "@/components/box";
// import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
// import { ApplyModal } from "@/components/ui/apply-modal";
// import { Button } from "@/components/ui/button";
// import { Company, Job, Resumes, UserProfile } from "@prisma/client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useState, useMemo, useEffect } from "react";
// import toast from "react-hot-toast";

// // Slate.js entegrasyonu
// import { Slate, Editable, withReact } from "slate-react";
// import { createEditor } from "slate";

// interface UpdatedProfile extends UserProfile {
//   resumes: Resumes[];
//   appliedJobs: { jobId: string; appliedAt?: Date }[];
// }

// interface JobDetailsPageContentProps {
//   job: Job & {
//     company: Company | null;
//     location?: { country: string; city: string } | null;
//   };
//   jobId: string;
//   userProfile:
//     | (UserProfile & {
//         resumes: Resumes[];
//         appliedJobs: { jobId: string; appliedAt?: Date }[];
//       })
//     | null;
// }

// export const JobDetailsPageContent = ({
//   job,
//   jobId,
//   userProfile,
// }: JobDetailsPageContentProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   // Profile bilgisinde appliedJobs alanı eksikse boş bir dizi atıyoruz
//   const [profile, setProfile] = useState(
//     userProfile
//       ? { ...userProfile, appliedJobs: userProfile.appliedJobs || [] }
//       : null,
//   );
//   const router = useRouter();

//   // Slate editor'ü oluşturuyoruz
//   const editor = useMemo(() => withReact(createEditor()), []);

//   // job.description değerini kontrol edip Slate formatına dönüştürüyoruz
//   const initialValue = useMemo(() => {
//     if (job?.description) {
//       try {
//         // Description geçerli JSON formatındaysa
//         const parsed = JSON.parse(job.description);
//         console.log("Parsed job.description:", parsed);
//         return parsed;
//       } catch (error) {
//         console.warn(
//           "job.description JSON parse edilemiyor, plain text kullanılıyor:",
//           error,
//         );
//         return [
//           {
//             type: "paragraph",
//             children: [{ text: job.description }],
//           },
//         ];
//       }
//     }
//     return [
//       {
//         type: "paragraph",
//         children: [{ text: "" }],
//       },
//     ];
//   }, [job?.description]);

//   useEffect(() => {
//     console.log("Job nesnesi:", job);
//   }, [job]);

//   const onApplied = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.patch<UpdatedProfile>(
//         `/api/users/${profile?.userId}/appliedJobs`,
//         { jobId, userHasApplied: true },
//       );
//       const updatedProfile = response.data;
//       toast.success("Job Başvurusu Kaydedildi");
//       setProfile((prevProfile) => {
//         if (!prevProfile) return prevProfile;
//         return {
//           ...prevProfile,
//           appliedJobs: updatedProfile.appliedJobs,
//         };
//       });
//     } catch (error) {
//       console.error(
//         "Başvuru kaydı oluşturulurken hata:",
//         (error as Error).message,
//       );
//       toast.error("Bir sorun oluştu, tekrar deneyiniz.");
//     } finally {
//       setOpen(false);
//       setIsLoading(false);
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

//       <Box className="mt-8">
//         <CustomBreadCrumb
//           breadCrumbItem={[{ label: "Search", link: "/search" }]}
//           breadCrumbPage={job?.title ?? "No Job Title Available"}
//         />
//       </Box>

//       {/* İş Kartı */}
//       <Box className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
//         {/* Kapak Görseli */}
//         <div className="relative h-80 w-full">
//           {job?.imageUrl ? (
//             <Image
//               alt={job.title}
//               src={job.imageUrl}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
//               <h2 className="text-3xl font-bold text-white">
//                 {job?.title ?? "No Job Title Available"}
//               </h2>
//             </div>
//           )}
//           <div className="absolute inset-0 bg-black opacity-25"></div>
//         </div>

//         {/* İş Bilgileri */}
//         <div className="p-6 relative">
//           <div className="flex items-center space-x-4">
//             {job?.company?.logo && (
//               <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
//                 <Image
//                   alt={job?.company?.name}
//                   src={job.company.logo}
//                   width={64}
//                   height={64}
//                   className="object-cover"
//                 />
//               </div>
//             )}
//             <div>
//               <h2 className="text-2xl font-extrabold text-gray-800">
//                 {job?.title ?? "No Job Title Available"}
//               </h2>
//               {job?.location ? (
//                 <p className="text-sm text-gray-600">
//                   {job.location.country}, {job.location.city}
//                 </p>
//               ) : (
//                 <p className="text-sm text-gray-600">Location: Not provided</p>
//               )}
//             </div>
//             <div className="ml-auto">
//               {profile ? (
//                 (profile.appliedJobs ?? []).some(
//                   (appliedJob) => appliedJob.jobId === jobId,
//                 ) ? (
//                   <Button
//                     className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
//                     variant="outline"
//                   >
//                     Already Applied
//                   </Button>
//                 ) : (
//                   <Button
//                     className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all"
//                     onClick={() => setOpen(true)}
//                   >
//                     Apply Now
//                   </Button>
//                 )
//               ) : null}
//             </div>
//           </div>

//           {/* Kısa Açıklama */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-700">Description</h3>
//             <p className="mt-2 text-gray-600">{job?.short_description}</p>
//           </div>
//         </div>
//       </Box>

//       {/* Detaylı İş Açıklaması (Slate ile) */}
//       <Box className="mt-8 p-6 bg-white shadow rounded-lg">
//         {job?.description ? (
//           <Slate
//             editor={editor}
//             initialValue={initialValue}
//             onChange={() => {}}
//           >
//             <Editable readOnly className="prose max-w-full" />
//           </Slate>
//         ) : (
//           <p className="text-gray-500">Job description is not available.</p>
//         )}
//       </Box>
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
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

// Slate.js entegrasyonu
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";

interface JobTag {
  name: string;
  initialData: any;
}

interface UpdatedProfile extends UserProfile {
  resumes: Resumes[];
  appliedJobs: { jobId: string; appliedAt?: Date }[];
}

interface JobDetailsPageContentProps {
  job: Job & {
    company: Company | null;
    location?: { country: string; city: string } | null;
    tags?: JobTag[];
  };
  jobId: string;
  userProfile:
    | (UserProfile & {
        resumes: Resumes[];
        appliedJobs: { jobId: string; appliedAt?: Date }[];
      })
    | null;
}

export const JobDetailsPageContent = ({
  job,
  jobId,
  userProfile,
}: JobDetailsPageContentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // Profile bilgisinde appliedJobs alanı eksikse boş bir dizi atıyoruz
  const [profile, setProfile] = useState(
    userProfile
      ? { ...userProfile, appliedJobs: userProfile.appliedJobs || [] }
      : null,
  );
  const router = useRouter();

  // Slate editor'ü oluşturuyoruz
  const editor = useMemo(() => withReact(createEditor()), []);

  // job.description değerini kontrol edip Slate formatına dönüştürüyoruz
  const initialValue = useMemo(() => {
    if (job?.description) {
      try {
        // Description geçerli JSON formatındaysa
        const parsed = JSON.parse(job.description);
        console.log("Parsed job.description:", parsed);
        return parsed;
      } catch (error) {
        console.warn(
          "job.description JSON parse edilemiyor, plain text kullanılıyor:",
          error,
        );
        return [
          {
            type: "paragraph",
            children: [{ text: job.description }],
          },
        ];
      }
    }
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];
  }, [job?.description]);

  useEffect(() => {
    console.log("Job nesnesi:", job);
  }, [job]);

  const onApplied = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch<UpdatedProfile>(
        `/api/users/${profile?.userId}/appliedJobs`,
        { jobId, userHasApplied: true },
      );
      const updatedProfile = response.data;
      toast.success("Job Başvurusu Kaydedildi");
      setProfile((prevProfile) => {
        if (!prevProfile) return prevProfile;
        return {
          ...prevProfile,
          appliedJobs: updatedProfile.appliedJobs,
        };
      });
    } catch (error) {
      console.error(
        "Başvuru kaydı oluşturulurken hata:",
        (error as Error).message,
      );
      toast.error("Bir sorun oluştu, tekrar deneyiniz.");
    } finally {
      setOpen(false);
      setIsLoading(false);
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

      <Box className="mt-8">
        <CustomBreadCrumb
          breadCrumbItem={[{ label: "Search", link: "/search" }]}
          breadCrumbPage={job?.title ?? "No Job Title Available"}
        />
      </Box>

      {/* İş Kartı */}
      <Box className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Kapak Görseli */}
        <div className="relative h-80 w-full">
          {job?.imageUrl ? (
            <Image
              alt={job.title}
              src={job.imageUrl}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-500 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">
                {job?.title ?? "No Job Title Available"}
              </h2>
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-25"></div>
        </div>

        {/* İş Bilgileri */}
        <div className="p-6 relative">
          <div className="flex items-center space-x-4">
            {job?.company?.logo && (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                <Image
                  alt={job?.company?.name}
                  src={job.company.logo}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">
                {job?.title ?? "No Job Title Available"}
              </h2>
              {job?.location ? (
                <p className="text-sm text-gray-600">
                  {job.location.country}, {job.location.city}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Location: Not provided</p>
              )}
            </div>
            <div className="ml-auto">
              {profile ? (
                (profile.appliedJobs ?? []).some(
                  (appliedJob) => appliedJob.jobId === jobId,
                ) ? (
                  <Button
                    className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                    variant="outline"
                  >
                    Already Applied
                  </Button>
                ) : (
                  <Button
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all"
                    onClick={() => setOpen(true)}
                  >
                    Apply Now
                  </Button>
                )
              ) : null}
            </div>
          </div>

          {/* Kısa Açıklama */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Description</h3>
            <p className="mt-2 text-gray-600">{job?.short_description}</p>
          </div>
        </div>
      </Box>

      {/* Detaylı İş Açıklaması (Slate ile) */}
      <Box className="mt-8 p-6 bg-white shadow rounded-lg">
        {job?.description ? (
          <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={() => {}}
          >
            <Editable readOnly className="prose max-w-full" />
          </Slate>
        ) : (
          <p className="text-gray-500">Job description is not available.</p>
        )}
      </Box>

      {/* Tags Bölümü */}
      {job?.tags && job.tags.length > 0 && (
        <Box className="mt-8 p-6 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mr-6">Tags</h3>
          <div className="flex flex-wrap mt-2">
            {job.tags.map((tags, index) => (
              <div
                key={index}
                className="mr-2 mb-2 flex items-center space-x-2 border rounded px-2 py-1"
              >
                <span>{tags}</span>
              </div>
            ))}
          </div>
        </Box>
      )}
    </>
  );
};
