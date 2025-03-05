// "use client"

// import { Card } from "@/components/ui/card";
// import  Box  from "@/components/box";
// import { useRouter } from "next/navigation";
// import { IconName } from "@/lib/utils";  // IconName türü içe aktarıldı
// import { Category } from "@prisma/client";
// import { Icon, ChevronRight } from "lucide-react";

// export const CategoryListItemCard = ({ data }: { data: Category }) => {
//   const router = useRouter();

//   const handleClick = (categoryId: string) => {
//     console.log("Clicked category ID:", categoryId);
//     router.push(`/search?categoryId=${categoryId}`);
//   };

//   return (
//     <Card
//       className="flex items-center gap-2 p-2 text-muted-foreground hover:text-purple-500
//                  hover:border-purple-500 hover:shadow-md cursor-pointer"
//       onClick={() => handleClick(data.id)}
//     >
//       <Icon name={data.name as IconName} iconNode={[]} />
//       <span className="w-28 truncate whitespace-nowrap">{data.name}</span>
//       <ChevronRight className="w-4 h-4" />
//     </Card>
//   );
// };

// export const HomescreenCategoriesContainer = ({
//   categories,
// }: { categories: Category[] }) => {
//   return (
//     <Box className="flex-col mt-12">
//       <div className="w-full flex flex-wrap items-center justify-center gap-4">
//         {categories.map((item) => (
//           <CategoryListItemCard key={item.id} data={item} />
//         ))}
//       </div>
//     </Box>
//   );
// };

"use client";

import { Card } from "@/components/ui/card";
import Box from "@/components/box";
import { useRouter } from "next/navigation";
import { IconName } from "@/lib/utils"; // IconName türü içe aktarıldı
import { Category } from "@prisma/client";
import { Icon, ChevronRight } from "lucide-react";

export const CategoryListItemCard = ({ data }: { data: Category }) => {
  const router = useRouter();

  const handleClick = (categoryId: string) => {
    console.log("Clicked category ID:", categoryId);
    router.push(`/search?categoryId=${categoryId}`);
  };

  return (
    <Card
      onClick={() => handleClick(data.id)}
      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transform transition duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <Icon
        name={data.name as IconName}
        iconNode={[]}
        className="text-blue-500 w-6 h-6"
      />
      <span className="flex-1 font-semibold text-gray-700 dark:text-gray-300 truncate ">
        {data.name}
      </span>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </Card>
  );
};

export const HomescreenCategoriesContainer = ({
  categories,
}: {
  categories: Category[];
}) => {
  return (
    <Box className="flex flex-col items-center mt-16 px-4">
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-center gap-6">
        {categories.map((item) => (
          <CategoryListItemCard key={item.id} data={item} />
        ))}
      </div>
    </Box>
  );
};
