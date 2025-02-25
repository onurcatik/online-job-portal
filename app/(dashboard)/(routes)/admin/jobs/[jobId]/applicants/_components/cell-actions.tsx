"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";


interface CellActionsProps {
    id: string;
    fullName: string;
    email: string;
  }
  

export const CellActions = ({ id, fullname, email}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRejection, setIsRejection] = useState(false);
    


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        
            
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
