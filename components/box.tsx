"use client";

import { cn } from "@/lib/utils";

interface BoxProps {
  children: React.ReactNode;
  className?: string; // `className?` olarak düzeltilerek opsiyonel hale getirildi
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      {children}
    </div>
  );
};

export default Box;
