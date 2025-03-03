// import { getTotalCompaniesOnPortal, getTotalCompaniesOnPortalByUserId ,getTotalJobsOnPortal, getTotalJobsOnPortalByUserId, getPieGraphJobCreatedByUser } from "@/actions/get-overview-analytics";
// import Box from "@/components/box";
// import OverviewPieChart from "@/components/overview-pie-chart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { auth } from "@clerk/nextjs/server";
// import { BriefcaseBusiness } from "lucide-react";
// import { redirect } from "next/navigation";

// const DashboardAnalyticsPage = async () => {
//     const { userId } = await auth(); // Await the auth function

//     if (!userId) {
//         redirect("/");
//     }

//     const totalJobsOnPortal = await getTotalJobsOnPortal();
//     const totalJobsOnPortalByUser = await getTotalJobsOnPortalByUserId(userId);
//     const totalCompaniesOnPortal = await getTotalCompaniesOnPortal();
//     const totalCompaniesOnPortalByUser = await getTotalCompaniesOnPortalByUserId (userId);
//     const graphJobTotal = await getPieGraphJobCreatedByUser (userId)
//     const graphCompanyTotal = await getPieGraphJobCreatedByUser (userId)

    

//     return (
//         <Box className="flex-col items-start p-4">
//             <div className="flex-col items-start">
//                 <h2 className="font-sans tracking-wider font-bold text-2xl">
//                     Dashboard
//                 </h2>
//                 <p className="text-sm text-muted-foreground">
//                     Overview of your account
//                 </p>
//             </div>

//             <Separator className="my-4" />

//             <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
//                 <Card>
//                     <CardHeader className="items-center justify-between flex-row">
//                         <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
//                         <BriefcaseBusiness className="w-4 h-4" />
//                     </CardHeader>
//                     <CardContent>{totalJobsOnPortal}</CardContent>
//                 </Card> 
//                 <Card>
//                     <CardHeader className="items-center justify-between flex-row">
//                         <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
//                         <BriefcaseBusiness className="w-4 h-4" />
//                     </CardHeader>
//                     <CardContent>{totalJobsOnPortalByUser}</CardContent>
//                 </Card> 
//                 <Card>
//                     <CardHeader className="items-center justify-between flex-row">
//                         <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
//                         <BriefcaseBusiness className="w-4 h-4" />
//                     </CardHeader>
//                     <CardContent>{totalCompaniesOnPortal}</CardContent>
//                 </Card> 
//                 <Card>
//                     <CardHeader className="items-center justify-between flex-row">
//                         <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
//                         <BriefcaseBusiness className="w-4 h-4" />
//                     </CardHeader>
//                     <CardContent>{totalCompaniesOnPortal}</CardContent>
//                 </Card> 
//                 {/* month wise jobs count */}
// <Card>
//   <CardHeader className="items-center justify-between flex-row">
//     <CardTitle className="text-sm font-medium">
//       Total Companies By User
//     </CardTitle>
//     <BriefcaseBusiness className="w-4 h-4" />
//   </CardHeader>
//   <CardContent className="text-2xl font-bold">
//     {totalCompaniesOnPortalByUser}
//   </CardContent>
// </Card>

// {/* month wise companies count */}
// <Card>
//   <CardHeader className="items-center justify-between flex-row">
//     <CardTitle className="text-sm font-medium">
//       Total Jobs By User
//     </CardTitle>
//     <BriefcaseBusiness className="w-4 h-4" />
//   </CardHeader>
//   <CardContent className="text-2xl font-bold">
//     {totalCompaniesOnPortalByUser}
//   </CardContent>
// </Card>
// {/* month wise jobs count */}
// <Card className="col-span-1 md:col-span-2">
//   <CardHeader className="items-center justify-between flex-row">
//     <CardTitle className="text-sm font-medium">
//       Month Wise Jobs Count
//     </CardTitle>
//     <BriefcaseBusiness className="w-4 h-4" />
//   </CardHeader>
//   <CardContent className="text-2xl font-bold">
//     <OverviewPieChart data={graphJobTotal} />
//   </CardContent>
// </Card>

// {/* month wise companies count */}
// <Card className="col-span-1 md:col-span-2">
//   <CardHeader className="items-center justify-between flex-row">
//     <CardTitle className="text-sm font-medium">
//       Month Wise Companies Count
//     </CardTitle>
//     <BriefcaseBusiness className="w-4 h-4" />
//   </CardHeader>
//   <CardContent className="text-2xl font-bold">
//     <OverviewPieChart data={graphCompanyTotal} />
//   </CardContent>
// </Card>


                
//             </div>
//         </Box>
//     );
// };

// export default DashboardAnalyticsPage;


import { getTotalCompaniesOnPortal, getTotalCompaniesOnPortalByUserId, getTotalJobsOnPortal, getTotalJobsOnPortalByUserId, getPieGraphJobCreatedByUser } from "@/actions/get-overview-analytics";
import Box from "@/components/box";
import OverviewPieChart from "@/components/overview-pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { BriefcaseBusiness } from "lucide-react";
import { redirect } from "next/navigation";

const DashboardAnalyticsPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const totalJobsOnPortal = await getTotalJobsOnPortal();
    const totalJobsOnPortalByUser = await getTotalJobsOnPortalByUserId(userId);
    const totalCompaniesOnPortal = await getTotalCompaniesOnPortal();
    const totalCompaniesOnPortalByUser = await getTotalCompaniesOnPortalByUserId(userId);
    const graphJobTotal = await getPieGraphJobCreatedByUser(userId);
    const graphCompanyTotal = await getPieGraphJobCreatedByUser(userId);

    return (
        <Box className="flex-col items-start p-6 space-y-6">
            <div className="flex-col items-start">
                <h2 className="font-serif tracking-wider font-bold text-3xl text-gray-800">
                    Dashboard
                </h2>
                <p className="text-sm text-gray-600">
                    Account overview with elegant analytics
                </p>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-6 grid-cols-1 md:grid-cols-4 relative left-[500px]">
                <Card className="shadow-xl border-0">
                    <CardHeader className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t">
                        <CardTitle className="text-sm font-medium text-white">Total Jobs on Portal</CardTitle>
                        <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </CardHeader>
                    <CardContent className="p-4 text-2xl font-bold text-gray-800">
                        {totalJobsOnPortal}
                    </CardContent>
                </Card>

                <Card className="shadow-xl border-0">
                    <CardHeader className="flex items-center justify-between bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-t">
                        <CardTitle className="text-sm font-medium text-white">My Jobs</CardTitle>
                        <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </CardHeader>
                    <CardContent className="p-4 text-2xl font-bold text-gray-800">
                        {totalJobsOnPortalByUser}
                    </CardContent>
                </Card>

                <Card className="shadow-xl border-0">
                    <CardHeader className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-t">
                        <CardTitle className="text-sm font-medium text-white">Total Companies on Portal</CardTitle>
                        <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </CardHeader>
                    <CardContent className="p-4 text-2xl font-bold text-gray-800">
                        {totalCompaniesOnPortal}
                    </CardContent>
                </Card>

                <Card className="shadow-xl border-0">
                    <CardHeader className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-t">
                        <CardTitle className="text-sm font-medium text-white">My Companies</CardTitle>
                        <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </CardHeader>
                    <CardContent className="p-4 text-2xl font-bold text-gray-800">
                        {totalCompaniesOnPortalByUser}
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
                <Card className="shadow-xl border-0 ml-36">
                    <CardHeader className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t">
                        <CardTitle className="text-sm font-medium text-white">Month Wise Jobs Count</CardTitle>
                        <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <OverviewPieChart data={graphJobTotal} />
                    </CardContent>
                </Card>

                <Card className="shadow-xl border-0">
                    <CardHeader className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-t">
                        <CardTitle className="text-sm font-medium text-white">Month Wise Companies Count</CardTitle>
                        <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <OverviewPieChart data={graphCompanyTotal} />
                    </CardContent>
                </Card>
            </div>
        </Box>
    );
};

export default DashboardAnalyticsPage;
