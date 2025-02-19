

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Job } from "@prisma/client";

type GetJobs = {
  title?: string;
  categoryId?: string;
  createdAtFilter?: string;
  shiftTiming?: string;
  workMode?: string;
  yearsOfExperience?: string;
  savedJobs?: boolean;
};

export const getJobs = async ({
  title,
  categoryId,
  createdAtFilter,
  shiftTiming,
  workMode,
  yearsOfExperience,
  savedJobs,
}: GetJobs): Promise<Job[]> => {
  const { userId } = await auth();

  try {
    // Initialize the query object with common options
    let query: any = {
      where: {
        isPublished: true, // Ensure this is always present
      },
      include: {
        company: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    };
    
    if (typeof title !== "undefined" || typeof categoryId !== "undefined") {
      // Ensure that the published condition is always included
      query.where = {
        AND: [
          { isPublished: true }, // Keep the isPublished condition here
          typeof title !== "undefined" && {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          typeof categoryId !== "undefined" && {
            categoryId: {
              equals: categoryId,
            },
          },
        ].filter(Boolean),
      };
    }

    // let query: any = {
    //   where: {
    //     isPublished: false,
    //   },
    //   include : {
    //     company: true,
    //     category: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // };

    // if (typeof title !== "undefined" || typeof categoryId !== "undefined") {
    //   query.where = {
    //     AND: [
    //       typeof title !== "undefined" && {
    //         title: {
    //           contains: title,
    //           mode: "insensitive",
    //         },
    //       },
    //       typeof categoryId !== "undefined" && {
    //         categoryId: {
    //           equals: categoryId,
    //         },
    //       },
    //     ].filter(Boolean),
    //   };
    // }

    

    // check whether the createdAtFilter is provided or not
    if (createdAtFilter) {
      const currentDate = new Date();
      let startDate: Date;
      
      switch (createdAtFilter) {
        case "today":
          // Bugünün başlangıcını ayarla (00:00:00)
          startDate = new Date(currentDate);
          startDate.setHours(0, 0, 0, 0);
          break;
    
        case "yesterday":
          // Dün başlangıç (00:00:00)
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          break;
    
        case "thisWeek":
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - currentDate.getDay());
          startDate.setHours(0, 0, 0, 0);
          break;
    
        case "lastWeek":
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - currentDate.getDay() - 7);
          startDate.setHours(0, 0, 0, 0);
          break;
    
        case "thisMonth":
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          break;
    
        default:
          startDate = new Date(0);
      }
      
      query.where.createdAt = {
        gte: startDate,
      };
    }
    

  // filter the data based on the shift timing
let formattedShiftTiming = shiftTiming?.split(",");

if (formattedShiftTiming && formattedShiftTiming.length > 0) {
  query.where.shiftTiming = {
    in: formattedShiftTiming,
  };
}

let formattedWorkingModes = workMode?.split(",");

if (formattedWorkingModes && formattedWorkingModes.length > 0) {
  query.where.workMode = {
    in: formattedWorkingModes,
  };
}

let formattedYOExperience = yearsOfExperience?.split(",");

if (formattedYOExperience && formattedYOExperience.length > 0) {
  query.where.yearsOfExperience = {
    in: formattedYOExperience,
  };
}


    

    const jobs = await db.job.findMany(query)
    return jobs

  } catch (error) {
    console.log("GET_JOBS:", error);
    return [];
  }
};

