// import Box from "@/components/box";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { getJobs } from "@/actions/get-jobs";
// import { HomesearchContainer } from "../_components/home-search-container";
// import Image from "next/image";
// import { HomescreenCategoriesContainer } from "../_components/home-screen-categories-container";
// import { HomeCompaniesList } from "../_components/home-companies-list";
// import { RecommendedJobsList } from "../_components/recommended-jobs";
// import { Footer } from "@/components/footer";

// const DashboardHomePage = async () => {
//   const authData = await auth(); // Await the promise
//   const { userId } = authData; // Extract userId safely

//   const jobs = await getJobs(userId); // Pass userId if required

//   const categories = await db.category.findMany({
//     orderBy: { name: "asc" },
//   });

//   const companies = await db.company.findMany({
//     orderBy: { created: "desc" },
//   });

//   return (
//     <div className="flex-col py-6 px-4 space-y-24">
//       <Box className="flex-col justify-center w-full space-y-4 mt-12">
//         <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-wide text-neutral-600">
//           Find your dream job now
//         </h2>

//         <p className="text-2xl text-muted-foreground">
//           {jobs.length} + jobs for you to explore{" "}
//         </p>
//       </Box>
//     <HomesearchContainer/>

//     <Box className="relative overflow-hidden h-64 justify-center rounded-lg mt-12">
//   <Image
//     src="/img/job.jpg"
//     alt="Home Banner"
//     width={5000}
//     height={5000}
//     className="object-cover rounded-lg"

//   />
// </Box>

// <HomescreenCategoriesContainer categories={categories} />

// <HomeCompaniesList companies={companies}/>

// <RecommendedJobsList jobs= {jobs.splice(0,6)} userId={userId}/>
// <Footer/>

//     </div>
//   );
// };

// export default DashboardHomePage;

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
  const authData = await auth();
  const { userId } = authData;

  const jobs = await getJobs(userId);

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    orderBy: { created: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 space-y-16">
      {/* HERO BANNER */}
      <Box className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/img/job3.png"
          alt="Home Banner"
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out hover:scale-105"
        />
        {/* Koyu bir gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-black opacity-50" />
        {/* Banner içi metin */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Find Your Dream Job Now
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-lg">
            Over {jobs.length}+ jobs curated just for you
          </p>
          <div className="mt-6 w-full max-w-xl">
            <HomesearchContainer />
          </div>
        </div>
      </Box>

      {/* Banner Section with Overlay */}
      

      {/* Categories Section */}
      <section className="w-full">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Explore Categories
        </h3>
        <HomescreenCategoriesContainer categories={categories} />
      </section>

      {/* Companies Section */}
      <section className="w-full">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Top Companies
        </h3>
        <HomeCompaniesList companies={companies} />
      </section>

      {/* Recommended Jobs Section */}
      <section className="w-full">
      
        <RecommendedJobsList jobs={jobs.splice(0, 10)} userId={userId} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardHomePage;
