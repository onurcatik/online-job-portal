"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export type ApplicantColumns = {
  id: string;
  fullname: string;
  email: string;
  contact: string;
  appliedAt: string;
  resume: string;
  resumeName: string;
};

export const columns: ColumnDef<ApplicantColumns>[] = [
  {
    accessorKey: "fullname",
    id: "fullname", // Benzersiz id ekleniyor
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    id: "email", // Benzersiz id ekleniyor
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    // Boş accessorKey kullanımı yerine, ilgili veri alanını tanımlayın.
    accessorKey: "contact",
    id: "contact", // Benzersiz id ekleniyor
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "appliedAt",
    id: "appliedAt", // Benzersiz id ekleniyor
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Applied At
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // satırın orijinal verisini alıyoruz
      const job = row.original;
      // job.id ile link oluşturuyoruz
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/admin/jobs/${job.id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/jobs/${job.id}/applicants`}>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Applicants
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
