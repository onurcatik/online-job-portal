

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
    <div className="flex flex-col items-center py-6 px-4 space-y-24">
      {/* Hero Section */}
      <Box className="flex flex-col items-center justify-center w-full space-y-4 mt-12 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500">
          Find Your Dream Job Now
        </h2>
        <p className="text-xl md:text-2xl text-gray-700">
          {jobs.length}+ jobs curated just for you.
        </p>
        <HomesearchContainer />
      </Box>

      {/* Banner Section with Overlay */}
      <Box className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/img/job.jpg"
          alt="Home Banner"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 ease-in-out transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black opacity-40"></div>
      </Box>

      {/* Categories Section */}
      <section className="w-full">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
          Explore Categories
        </h3>
        <HomescreenCategoriesContainer categories={categories} />
      </section>

      {/* Companies Section */}
      <section className="w-full">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
          Top Companies
        </h3>
        <HomeCompaniesList companies={companies} />
      </section>

      {/* Recommended Jobs Section */}
      <section className="w-full">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
          Recommended for You
        </h3>
        <RecommendedJobsList jobs={jobs.splice(0, 10)} userId={userId} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardHomePage;
