"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";

export type CompanyColumns = {
    id: string;
    title: string;
    company: string;
    category: string;
    createdAt: string;
    isPublished: boolean;
  };
  

export const columns: ColumnDef<CompanyColumns>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  
   


  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => {
      const { isPublished } = row.original;
      return (
        <div
          className={cn(
            "border px-2 py-1 text-xs rounded-md w-24 text-center",
            isPublished
              ? "border-emerald-500 bg-emerald-100/80"
              : "border-red-500 bg-red-100/80"
          )}
        >
          {isPublished ? "Published" : "Unpublished"}
        </div>
      );
    },
  },

  
  

  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/admin/compaines/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/compaines/${id}/applicants`}>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Applicants
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }
  
];
