import { db } from "@/lib/db";

export const getTotalJobsOnPortal = async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs.length;
};

export const getTotalJobsOnPortalByUserId = async (userId: string | null) => {
  if (!userId) {
    return 0;
  }

  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs.length;
};

export const getTotalCompaniesOnPortal = async () => {
  const companies = await db.company.findMany({
    orderBy: {
      created: "desc",
    },
  });

  return companies.length;
};

export const getTotalCompaniesOnPortalByUserId = async (userId: string | null) => {
  if (!userId) {
    return 0;
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      created: "desc",
    },
  });

  return companies.length;
};

interface PieChartMonthlyCount {
  name: string;
  value: number;
}

export const getPieGraphJobCreatedByUser = async (
  userId: string | null
): Promise<PieChartMonthlyCount[]> => {
  if (!userId) {
    return [];
  }

  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentYear = new Date().getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // initialize result array with all months of the current year
  const monthlyCount: PieChartMonthlyCount[] = months.map((month, index) => ({
    name: month,
    value: 0,
  }));

  const monthlyCountLookup: { [key: string]: PieChartMonthlyCount } =
    monthlyCount.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {} as { [key: string]: PieChartMonthlyCount });

  jobs.forEach((job) => {
    const createdAt = new Date(job.createdAt);
    const month = createdAt.toLocaleString("default", { month: "short" });
    const year = createdAt.getFullYear();

    if (year === currentYear) {
      if (monthlyCountLookup[month]) {
        monthlyCountLookup[month].value++;
      }
    }
  });

  return monthlyCount;
};

// Yeni eklenen portal istatistiklerini döndüren fonksiyon
export const getPortalStatistics = async (userId: string | null) => {
  const totalJobs = await getTotalJobsOnPortal();
  const totalJobsUser = await getTotalJobsOnPortalByUserId(userId);
  const totalCompanies = await getTotalCompaniesOnPortal();
  const totalCompaniesUser = await getTotalCompaniesOnPortalByUserId(userId);

  return {
    totalJobs,
    totalJobsUser,
    totalCompanies,
    totalCompaniesUser,
  };
};
