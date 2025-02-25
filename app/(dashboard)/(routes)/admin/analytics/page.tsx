import { getTotalCompaniesOnPortal, getTotalCompaniesOnPortalByUserId ,getTotalJobsOnPortal, getTotalJobsOnPortalByUserId, getPieGraphJobCreatedByUser } from "@/actions/get-overview-analytics";
import Box from "@/components/box";
import OverviewPieChart from "@/components/overview-pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { BriefcaseBusiness } from "lucide-react";
import { redirect } from "next/navigation";

const DashboardAnalyticsPage = async () => {
    const { userId } = await auth(); // Await the auth function

    if (!userId) {
        redirect("/");
    }

    const totalJobsOnPortal = await getTotalJobsOnPortal();
    const totalJobsOnPortalByUser = await getTotalJobsOnPortalByUserId(userId);
    const totalCompaniesOnPortal = await getTotalCompaniesOnPortal();
    const totalCompaniesOnPortalByUser = await getTotalCompaniesOnPortalByUserId (userId);
    const graphJobTotal = await getPieGraphJobCreatedByUser (userId)
    const graphCompanyTotal = await getPieGraphJobCreatedByUser (userId)

    

    return (
        <Box className="flex-col items-start p-4">
            <div className="flex-col items-start">
                <h2 className="font-sans tracking-wider font-bold text-2xl">
                    Dashboard
                </h2>
                <p className="text-sm text-muted-foreground">
                    Overview of your account
                </p>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                <Card>
                    <CardHeader className="items-center justify-between flex-row">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <BriefcaseBusiness className="w-4 h-4" />
                    </CardHeader>
                    <CardContent>{totalJobsOnPortal}</CardContent>
                </Card> 
                <Card>
                    <CardHeader className="items-center justify-between flex-row">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <BriefcaseBusiness className="w-4 h-4" />
                    </CardHeader>
                    <CardContent>{totalJobsOnPortalByUser}</CardContent>
                </Card> 
                <Card>
                    <CardHeader className="items-center justify-between flex-row">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <BriefcaseBusiness className="w-4 h-4" />
                    </CardHeader>
                    <CardContent>{totalCompaniesOnPortal}</CardContent>
                </Card> 
                <Card>
                    <CardHeader className="items-center justify-between flex-row">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <BriefcaseBusiness className="w-4 h-4" />
                    </CardHeader>
                    <CardContent>{totalCompaniesOnPortal}</CardContent>
                </Card> 
                {/* month wise jobs count */}
<Card>
  <CardHeader className="items-center justify-between flex-row">
    <CardTitle className="text-sm font-medium">
      Total Companies By User
    </CardTitle>
    <BriefcaseBusiness className="w-4 h-4" />
  </CardHeader>
  <CardContent className="text-2xl font-bold">
    {totalCompaniesOnPortalByUser}
  </CardContent>
</Card>

{/* month wise companies count */}
<Card>
  <CardHeader className="items-center justify-between flex-row">
    <CardTitle className="text-sm font-medium">
      Total Jobs By User
    </CardTitle>
    <BriefcaseBusiness className="w-4 h-4" />
  </CardHeader>
  <CardContent className="text-2xl font-bold">
    {totalCompaniesOnPortalByUser}
  </CardContent>
</Card>
{/* month wise jobs count */}
<Card className="col-span-1 md:col-span-2">
  <CardHeader className="items-center justify-between flex-row">
    <CardTitle className="text-sm font-medium">
      Month Wise Jobs Count
    </CardTitle>
    <BriefcaseBusiness className="w-4 h-4" />
  </CardHeader>
  <CardContent className="text-2xl font-bold">
    <OverviewPieChart data={graphJobTotal} />
  </CardContent>
</Card>

{/* month wise companies count */}
<Card className="col-span-1 md:col-span-2">
  <CardHeader className="items-center justify-between flex-row">
    <CardTitle className="text-sm font-medium">
      Month Wise Companies Count
    </CardTitle>
    <BriefcaseBusiness className="w-4 h-4" />
  </CardHeader>
  <CardContent className="text-2xl font-bold">
    <OverviewPieChart data={graphCompanyTotal} />
  </CardContent>
</Card>


                
            </div>
        </Box>
    );
};

export default DashboardAnalyticsPage;
