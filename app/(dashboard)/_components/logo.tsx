"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer" 
      onClick={handleClick}
    >
      <Image height={60} width={60} alt="Logo" src="/images/favicon.ico" />
      <span className="text-lg font-semibold text-black">Work Now</span>
    </div>
  );
};

export default Logo;
