

import Box from "@/components/box";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getJobs } from "@/actions/get-jobs";
import { HomesearchContainer } from "../_components/home-search-container";
import Image from "next/image";
import { HomescreenCategoriesContainer } from "../_components/home-screen-categories-container";
import { HomeCompaniesList } from "../_components/home-companies-list";
import { RecommendedJobsList } from "../_components/recommended-jobs";
import { Footer } from "@/components/footer";

const DashboardHomePage = async () => {
  const authData = await auth(); // Await the promise
  const { userId } = authData; // Extract userId safely

  const jobs = await getJobs(userId); // Pass userId if required

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    orderBy: { created: "desc" },
  });

  return (
    <div className="flex-col py-6 px-4 space-y-24">
      <Box className="flex-col justify-center w-full space-y-4 mt-12">
        <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-wide text-neutral-600">
          Find your dream job now
        </h2>

        <p className="text-2xl text-muted-foreground">
          {jobs.length} + jobs for you to explore{" "}
        </p>
      </Box>
    <HomesearchContainer/>
    

    <Box className="relative overflow-hidden h-64 justify-center rounded-lg mt-12">
  <Image
    src="/img/job.jpg"
    alt="Home Banner"
    width={5000}
    height={5000}
    className="object-cover rounded-lg"

  />
</Box>

<HomescreenCategoriesContainer categories={categories} />

<HomeCompaniesList companies={companies}/>

<RecommendedJobsList jobs= {jobs.splice(0,6)} userId={userId}/>
<Footer/>

    </div>
  );
};

export default DashboardHomePage;
