"use client";

import { Bookmark, Compass, Home, List, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarRouteItem } from "./side-bar-route-item";
import Box from "@/components/box";
import { CheckboxItem, Separator } from "@radix-ui/react-dropdown-menu";
import { DateFilter } from "./date-filter";

import { CheckBoxContainer } from "@/app/(dashboard)/_components/checkbox-container";
import qs from "query-string";

const adminRoutes = [
  {
    icon: List,
    label: "Jobs",
    href: "/admin/jobs",
  },
  {
    icon: List,
    label: "Companies",
    href: "/admin/companies",
  },
  {
    icon: Compass,
    label: "Analytics",
    href: "/admin/analytics",
  },
];

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
  {
    icon: User,
    label: "Profile",
    href: "/user",
  },
  {
    icon: Bookmark,
    label: "Saved Jobs",
    href: "/savedJobs",
  },
];

interface AppliedFilter {
  value: string;
  label: string;
  checked: boolean;
}

const shiftTimingsData: AppliedFilter[] = [
  {
    value: "full-time",
    label: "Full Time",
    checked: false,
  },
  {
    value: "part-time",
    label: "Part Time",
    checked: false,
  },
  {
    value: "contract",
    label: "Contract",
    checked: false,
  },
];

const workingModesData: AppliedFilter[] = [
  { value: "remote", label: "Remote", checked: false },
  { value: "hybrid", label: "Hybrid", checked: false },
  { value: "office", label: "Office", checked: false },
];

const experienceData: AppliedFilter[] = [
  { value: "0", label: "Fresher", checked: false },
  { value: "2", label: "0-2 years", checked: false },
  { value: "3", label: "2-4 years", checked: false },
  { value: "5", label: "5+ years", checked: false },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminPage = pathname?.startsWith("/admin");
  const isSearchPage = pathname?.startsWith("/search");

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  const handleShiftTimingChange = (shiftTimings: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updateQueryParams = {
      ...currentQueryParams,
      shiftTiming: shiftTimings,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);
  };

  const handleWorkingModes = (workingModes: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updateQueryParams = {
      ...currentQueryParams,
      workMode: workingModes,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
      },
    );

    router.push(url);
  };

  const handleExperience = (experience: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updateQueryParams = {
      ...currentQueryParams,
      yearsOfExperience: experience,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
      },
    );

    router.push(url);
  };

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarRouteItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      {isSearchPage && (
        <Box className="px-4 py-4 items-start justify-start space-x-4 flex-col gap-y-4">
          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">
            Filters
          </h2>

          {/* filter the data by createdAt */}
          <DateFilter />
          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">
            Working Schedule
          </h2>
          <CheckBoxContainer
            data={shiftTimingsData}
            onChange={handleShiftTimingChange}
          />
          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">
            Working Mode
          </h2>
          <CheckBoxContainer
            data={workingModesData}
            onChange={handleWorkingModes}
          />
          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">
            Experience
          </h2>
          <CheckBoxContainer
            data={experienceData}
            onChange={handleExperience}
          />
        </Box>
      )}
    </div>
  );
};
