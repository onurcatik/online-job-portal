// import Box from "./box";
// import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
// import Link from "next/link";
// import { Card, CardDescription, CardTitle } from "./ui/card";
// import Image from "next/image";
// import Logo from "@/app/(dashboard)/_components/logo";

// const menu = [
//   { href: "#", label: "About Us" },
//   { href: "#", label: "Careers" },
//   { href: "#", label: "Help Center" },
//   { href: "#", label: "Sitemap" },
//   { href: "#", label: "Legal" },
// ];

// export const Footer = () => {
//   return (
//     <Box className="h-72 p-4 items-start flex-col">
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
//         {/* First section */}
//         <div className="flex-col items-start gap-6">
//           <div className="flex items-center gap-5">
//             <Logo />
//             <h2 className="text-xl font-semibold text-muted-foreground">
//               WorkNow
//             </h2>
//           </div>

//           <p className="font-semibold text-base">Connect with us</p>
//           <div className="flex items-center gap-6 w-full">
//             <Link href="www.facebook.com">
//               <Facebook className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
//             </Link>

//             <Link href="www.twitter.com">
//               <Twitter className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
//             </Link>

//             <Link href="www.linkedin.com">
//               <Linkedin className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
//             </Link>

//             <Link href="www.youtube.com">
//               <Youtube className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
//             </Link>
//           </div>
//         </div>

//         {/* Second section */}
//         <div className="flex-col items-start justify-between gap-y-4 w-4/5">
//           {menu.map((item) => (
//             <Link key={item.label} href={item.href}>
//               <p className="text-sm font-sans text-neutral-500 hover:text-purple-500">
//                 {item.label}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </Box>
//   );
// };
import Box from "./box";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "@/app/(dashboard)/_components/logo";

const menu = [
  { href: "#", label: "About Us" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Help Center" },
  { href: "#", label: "Sitemap" },
  { href: "#", label: "Legal" },
];

export const Footer = () => {
  return (
    <Box className="bg-white text-gray-200 py-12">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center lg:items-start">
        {/* Logo ve sosyal medya */}
        <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 relative lg:right-0">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <p className="mt-2 text-sm text-black">Connect with us</p>
          <div className="flex gap-4 mt-4">
            <Link href="https://www.facebook.com">
              <Facebook className="w-6 h-6 hover:text-blue-500 transition-transform transform hover:scale-110 text-black" />
            </Link>
            <Link href="https://www.twitter.com">
              <Twitter className="w-6 h-6 hover:text-blue-400 transition-transform transform hover:scale-110 text-black" />
            </Link>
            <Link href="https://www.linkedin.com">
              <Linkedin className="w-6 h-6 hover:text-blue-700 transition-transform transform hover:scale-110 text-black" />
            </Link>
            <Link href="https://www.youtube.com">
              <Youtube className="w-6 h-6 hover:text-red-600 transition-transform transform hover:scale-110 text-black" />
            </Link>
          </div>
        </div>
        {/* Menü */}
        <div className="flex flex-wrap justify-center lg:justify-end gap-6 mt-4 lg:mt-12 relative lg:mr-[270px] xl:right-64">
          {menu.map((item) => (
            <Link key={item.label} href={item.href}>
              <span className="text-sm text-black hover:underline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
};
