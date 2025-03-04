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
    <Image
      height={60}
      width={60}
      alt="Logo"
      src="/images/favicon.ico"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Logo;
