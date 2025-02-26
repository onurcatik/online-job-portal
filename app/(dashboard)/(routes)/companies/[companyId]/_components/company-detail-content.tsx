// "use client";

// import { Company, Job } from "@prisma/client";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useState } from "react";
// import { Loader2, Plus } from "lucide-react";
// import React from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import axios from "axios"; // axios importu eklenmeli

// interface CompanyDetailContentPageProps {
//   userId: string | null;
//   company: Company;
//   jobs: Job[];
// }

// const CompanyDetailContentPage = ({
//   userId,
//   company,
//   jobs,
// }: CompanyDetailContentPageProps) => {
//   const isFollower = userId && company?.followers?.includes(userId);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const onClickAddRemoveFollower = async () => {
//     try {
//       setIsLoading(true);
//       isFollower
//         ? (await axios.patch(`/api/companies/${company?.id}/removeFollower`),
//            toast.success("Unfollowed"))
//         : (await axios.patch(`/api/companies/${company?.id}/addFollower`),
//            toast.success("Following"));
//       router.refresh();
//     } catch (error) {
//       console.log("Error = ", error);
//       toast.error((error as Error).message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div className="w-full rounded-2xl bg-white p-4 z-50 -mt-8">
//       <div className="flex-col w-full px-4">
//         {/* company details */}
//         <div className="w-full flex items-center justify-between -mt-12">
//           <div className="flex items-end justify-end space-x-4">
//             {company?.logo && (
//               <div className="aspect-square w-auto bg-red h-32 rounded-2xl border flex items-center justify-center relative overflow-hidden p-3">
//                 <Image
//                   width={120}
//                   height={120}
//                   alt={company?.name}
//                   src={company?.logo}
//                   className="object-contain"
//                 />
//               </div>
//             )}

//             {/* name contents etc... */}
//             <div className="flex-col space-y-1">
//               <div className="flex items-center gap-2">
//                 <h2 className="text-xl font-sans font-bold text-neutral-700 capitalize">
//                   {company?.name}
//                 </h2>
//                 <p className="text-muted-foreground text-sm">
//                   ({company?.followers?.length}) following
//                 </p>
//               </div>

//               <p className="text-sm text-muted-foreground">
//                 Leveraging Technology to Provide Better Services
//               </p>

//               <div className="flex items-center gap-2 flex-wrap">
//                 <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
//                   Management Consulting
//                 </p>
//                 <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
//                   Management Consulting
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Button
//         onClick={onClickAddRemoveFollower}
//         className={cn(
//           "w-24 rounded-full hover:shadow-md  flex items-center justify-center border bg-purple-500 ",
//           !isFollower && "bg-purple-600 hover:bg-purple-700"
//         )}
//         variant={isFollower ? "outline" : "default"}
//       >
//         {isLoading ? (
//           <Loader2 className="w-3 h-3 animate-spin" />
//         ) : (
//           <>
//             {isFollower ? (
//               "Unfollow"
//             ) : (
//               <>
//                 <Plus className="w-4 h-4 mr-2" /> Follow
//               </>
//             )}
//           </>
//         )}
//       </Button>
//     </div>
//   );
// };

// export default CompanyDetailContentPage;


"use client";

import { Company, Job } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios"; // axios importu eklenmeli

interface CompanyDetailContentPageProps {
  userId: string | null;
  company: Company;
  jobs: Job[];
}

const CompanyDetailContentPage = ({
  userId,
  company,
  jobs,
}: CompanyDetailContentPageProps) => {
  const isFollower = userId && company?.followers?.includes(userId);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClickAddRemoveFollower = async () => {
    try {
      setIsLoading(true);
      if (isFollower) {
        await axios.patch(`/api/companies/${company?.id}/removeFollower`);
        toast.success("Unfollowed");
      } else {
        await axios.patch(`/api/companies/${company?.id}/addFollower`);
        toast.success("Following");
      }
      router.refresh();
    } catch (error) {
      console.log("Error = ", error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Kapak fotoğrafı */}
      <div className="relative h-64 w-full">
        {company?.coverImage ? (
          <Image
            src={company.coverImage}
            alt={`${company.name} Cover`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>
      
      {/* Şirket detayları */}
      <div className="p-4 -mt-12 z-50 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-end space-x-4">
            {company?.logo && (
              <div className="aspect-square w-auto bg-white h-32 rounded-2xl border flex items-center justify-center relative overflow-hidden p-3">
                <Image
                  width={120}
                  height={120}
                  alt={company?.name}
                  src={company.logo}
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-sans font-bold text-neutral-700 capitalize">
                  {company?.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  ({company?.followers?.length}) following
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Leveraging Technology to Provide Better Services
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                  Management Consulting
                </p>
                <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                  Management Consulting
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={onClickAddRemoveFollower}
          className={cn(
            "w-24 rounded-full hover:shadow-md flex items-center justify-center border bg-purple-500",
            !isFollower && "bg-purple-600 hover:bg-purple-700"
          )}
          variant={isFollower ? "outline" : "default"}
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <>
              {isFollower ? (
                "Unfollow"
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Follow
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CompanyDetailContentPage;
