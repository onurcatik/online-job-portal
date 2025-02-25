
import Box from "./box";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
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
    <Box className="h-72 p-4 items-start flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {/* First section */}
        <div className="flex-col items-start gap-6">
          <div className="flex items-center gap-5">
            <Logo />
            <h2 className="text-xl font-semibold text-muted-foreground">
              WorkNow
            </h2>
          </div>

          <p className="font-semibold text-base">Connect with us</p>
          <div className="flex items-center gap-6 w-full">
            <Link href="www.facebook.com">
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
            </Link>

            <Link href="www.twitter.com">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
            </Link>

            <Link href="www.linkedin.com">
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
            </Link>

            <Link href="www.youtube.com">
              <Youtube className="w-5 h-5 text-muted-foreground hover:text-purple-500 hover:scale-125 transition-all" />
            </Link>
          </div>
        </div>

        {/* Second section */}
        <div className="flex-col items-start justify-between gap-y-4 w-4/5">
          {menu.map((item) => (
            <Link key={item.label} href={item.href}>
              <p className="text-sm font-sans text-neutral-500 hover:text-purple-500">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
};
