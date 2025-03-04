import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { columns } from "./create/_components/columns";
import { CompanyColumns } from "./create/_components/columns";

const CompaniesOverviewPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      created: "desc",
    },
  });

  const formattedCompanies: CompanyColumns[] = companies.map((company) => ({
    id: company.id,
    name: company.name || "",
    logo: company.logo || "",
    createdAt: company.created
      ? format(new Date(company.created), "MMMM do, yyyy")
      : "N/A",
    title: company.name, // "title" alanını company.name ile doldurduk
    company: company.name, // Eğer farklı bir değer kullanmak isterseniz burayı güncelleyin
    category: "Default Category", // Uygun değeri ekleyin
    isPublished: true, // Uygun değeri ekleyin
  }));

  return (
    <div className="p-6">
      <div className="flex items-end justify-end">
        <Link href="/admin/companies/create">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Company
          </Button>
        </Link>
      </div>

      {/* DataTable - List of Jobs */}
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={formattedCompanies}
          searchKey="title"
        />
      </div>
    </div>
  );
};

export default CompaniesOverviewPage;
