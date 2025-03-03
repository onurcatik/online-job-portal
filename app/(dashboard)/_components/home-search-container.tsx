"use client";

import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Box from "@/components/box";
import Input_ from "postcss/lib/input";
import { Input } from "@/components/ui/input"

export const HomesearchContainer = () => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleClick = () => {
    const href = qs.stringifyUrl({
      url: "/search",
      query: {
        title: title || undefined,
      },
    });

    router.push(href);
  };

  return (
    <div className="w-full items-center justify-center hidden md:flex mt-8 px-4">
      <Box className="w-3/4 p-4 rounded-full h-16 shadow-lg px-12 text-muted-foreground gap-3 bg-neutral-50">
        <Input
          placeholder="Search by job name..."
          type="text"
          value={title}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
          className="flex-1 text-lg font-sans bg-transparent outline-none border-none min-w-72 focus:outline-none focus:border-none"
        />
  
        <Button
          onClick={handleClick}
          disabled={!title}
          className="bg-purple-600 hover:bg-purple-700"
          size="icon"
        >
          <Search className="w-5 h-5 min-w-5" />
        </Button>
      </Box>
    </div>
  );
  
};


// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { SetStateAction, useState, useEffect } from "react";
// import qs from "query-string";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
// import Box from "@/components/box";
// import { Input } from "@/components/ui/input";

// export const HomesearchContainer = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");

//   // URL'deki mevcut parametreleri state'e aktarabilirsiniz:
//   useEffect(() => {
//     const currentTitle = searchParams.get("title") || "";
//     const currentCity = searchParams.get("location.city") || "";
//     const currentCountry = searchParams.get("location.country") || "";
//     setTitle(currentTitle);
//     setCity(currentCity);
//     setCountry(currentCountry);
//   }, [searchParams]);

//   const handleClick = () => {
//     const href = qs.stringifyUrl({
//       url: "/search",
//       query: {
//         title: title || undefined,
//         "location.city": city || undefined,
//         "location.country": country || undefined,
//       },
//     });
//     router.push(href);
//   };

//   return (
//     <div className="w-full items-center justify-center hidden md:flex mt-8 px-4">
//       <Box className="w-3/4 p-4 rounded-full h-auto shadow-lg px-12 text-muted-foreground gap-3 bg-neutral-50">
//         <Input
//           placeholder="Search by job name..."
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="flex-1 text-lg font-sans bg-transparent outline-none border-none min-w-72 focus:outline-none focus:border-none"
//         />
//         <Input
//           placeholder="City..."
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="flex-1 text-lg font-sans bg-transparent outline-none border-none min-w-72 focus:outline-none focus:border-none"
//         />
//         <Input
//           placeholder="Country..."
//           type="text"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           className="flex-1 text-lg font-sans bg-transparent outline-none border-none min-w-72 focus:outline-none focus:border-none"
//         />
//         <Button
//           onClick={handleClick}
//           disabled={!title && !city && !country}
//           className="bg-purple-600 hover:bg-purple-700"
//           size="icon"
//         >
//           <Search className="w-5 h-5 min-w-5" />
//         </Button>
//       </Box>
//     </div>
//   );
// };
