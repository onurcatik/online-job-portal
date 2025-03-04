"use client";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil } from "lucide-react";

// import { CellActions } from "./cell-actions";

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
    cell: ({ row }) => {
      const { id, fullname, email } = row.original;
      // return <CellActions id={id} fullname={fullname} email={email} />;
    },
  },
];
