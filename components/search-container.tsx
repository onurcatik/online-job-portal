"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce}  from "@/hooks/use-debounce";
import qs from "query-string";

export const SearchContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const createdAtFilter = searchParams.get("createdAtFilter");
  const currentShiftTiming = searchParams.get("shiftTiming");
  const currentWorkMode = searchParams.get("workMode");

  const [value, setValue] = useState(currentTitle || "");
  const debounceValue = useDebounce(value);

  // Additional logic or rendering can be added here

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debounceValue,
          categoryId: currentCategoryId,
          createdAtFilter: createdAtFilter,
          shiftTiming: currentShiftTiming,
          workMode: currentWorkMode,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
  
    router.push(url);
  }, [
    debounceValue,
    currentCategoryId,
    router,
    pathname,
    createdAtFilter,
    currentShiftTiming,
    currentWorkMode,
  ]);
  



  return (
    <div className="flex items-center gap-x-2 relative flex-1">
      <Search className="h-4 w-4 text-neutral-600 absolute left-3" />

      <Input
        placeholder="Search for a job using title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-9 rounded-lg bg-purple-50/80 focus-visible:"
      />

      {value && (
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => setValue("")}
          className="cursor-pointer absolute right-3 hover:scale-125 hover:bg-transparent"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
