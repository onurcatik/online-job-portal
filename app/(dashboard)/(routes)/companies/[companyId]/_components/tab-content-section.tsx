// "use client";

// import { Company, Job } from "@prisma/client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { JobsTabContent } from "./jobs-tab-content";
// import { createEditor, Descendant, Text } from "slate";
// import { Slate, Editable, withReact } from "slate-react";
// import { useMemo, useState } from "react";

// // Slate'de kullanılan leaf render fonksiyonu
// function renderLeaf(props: any) {
//   let { children, leaf } = props;
//   if (leaf.bold) {
//     children = <strong>{children}</strong>;
//   }
//   if (leaf.italic) {
//     children = <em>{children}</em>;
//   }
//   if (leaf.underline) {
//     children = <u>{children}</u>;
//   }
//   return <span {...props.attributes}>{children}</span>;
// }

// interface TabContentSectionProps {
//   userId: string | null;
//   company: Company;
//   jobs: Job[];
// }

// export const TabContentSection = ({
//   userId,
//   company,
//   jobs,
// }: TabContentSectionProps) => {
//   // Debug: Company verisini kontrol edin
//   console.log("Company Object:", company);

//   // Slate editörü oluştur
//   const editor = useMemo(() => withReact(createEditor()), []);

//   // company.overview bilgisini Slate için uygun formata dönüştürün
//   const initialSlateValue: Descendant[] = useMemo(() => {
//     if (!company.overview) {
//       return [
//         {
//           type: "paragraph",
//           children: [{ text: "" }],
//         },
//       ];
//     }
//     try {
//       const parsed = JSON.parse(company.overview);
//       if (Array.isArray(parsed)) {
//         return parsed;
//       }
//       return [
//         {
//           type: "paragraph",
//           children: [{ text: company.overview }],
//         },
//       ];
//     } catch {
//       return [
//         {
//           type: "paragraph",
//           children: [{ text: company.overview }],
//         },
//       ];
//     }
//   }, [company.overview]);

//   // ReadOnly modda Slate editörü için state
//   const [editorValue, setEditorValue] = useState<Descendant[]>(initialSlateValue);

//   return (
//     <div className="w-full my-4 mt-12">
//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="bg-transparent shadow-md">
//           <TabsTrigger
//             value="overview"
//             className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
//           >
//             Overview
//           </TabsTrigger>
//           <TabsTrigger
//             value="whyJoinUs"
//             className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
//           >
//             Why Join Us
//           </TabsTrigger>
//           <TabsTrigger
//             value="jobs"
//             className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
//           >
//             Jobs
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview">
//           {company.overview ? (
//             <Slate
//               editor={editor}
//               initialValue={editorValue}
//               onChange={(value) => setEditorValue(value)}
//             >
//               <Editable
//                 readOnly
//                 renderLeaf={renderLeaf}
//                 className="min-h-[100px]"
//               />
//             </Slate>
//           ) : (
//             "No overview"
//           )}
//         </TabsContent>

//         <TabsContent value="whyJoinUs">
//           {company.whyJoinUs && company.whyJoinUs.trim().length > 0
//             ? company.whyJoinUs
//             : "No 'Why Join Us' content available."}
//         </TabsContent>

//         <TabsContent value="jobs">
//           <JobsTabContent userId={userId} jobs={jobs} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

"use client";

import { Company, Job } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobsTabContent } from "./jobs-tab-content";
import { createEditor, Descendant, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useMemo, useState } from "react";

// Slate'de kullanılan leaf render fonksiyonu
function renderLeaf(props: any) {
  let { children, leaf } = props;
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...props.attributes}>{children}</span>;
}

interface TabContentSectionProps {
  userId: string | null;
  company: Company;
  jobs: Job[];
}

export const TabContentSection = ({
  userId,
  company,
  jobs,
}: TabContentSectionProps) => {
  // Debug: Company verisini kontrol edin
  console.log("Company Object:", company);

  // Overview için Slate editörü
  const overviewEditor = useMemo(() => withReact(createEditor()), []);
  // Why Join Us için Slate editörü
  const whyJoinUsEditor = useMemo(() => withReact(createEditor()), []);

  // company.overview bilgisini Slate formatına dönüştürün
  const initialOverviewValue: Descendant[] = useMemo(() => {
    if (!company.overview) {
      return [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];
    }
    try {
      const parsed = JSON.parse(company.overview);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [
        {
          type: "paragraph",
          children: [{ text: company.overview }],
        },
      ];
    } catch {
      return [
        {
          type: "paragraph",
          children: [{ text: company.overview }],
        },
      ];
    }
  }, [company.overview]);

  // company.whyJoinUs bilgisini Slate formatına dönüştürün
  const initialWhyJoinUsValue: Descendant[] = useMemo(() => {
    if (!company.whyJoinUs) {
      return [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];
    }
    try {
      const parsed = JSON.parse(company.whyJoinUs);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [
        {
          type: "paragraph",
          children: [{ text: company.whyJoinUs }],
        },
      ];
    } catch {
      return [
        {
          type: "paragraph",
          children: [{ text: company.whyJoinUs }],
        },
      ];
    }
  }, [company.whyJoinUs]);

  // ReadOnly modda Slate editörleri için state
  const [overviewValue, setOverviewValue] =
    useState<Descendant[]>(initialOverviewValue);
  const [whyJoinUsValue, setWhyJoinUsValue] = useState<Descendant[]>(
    initialWhyJoinUsValue,
  );

  return (
    <div className="w-full my-4 mt-12">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-transparent shadow-md">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="whyJoinUs"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Why Join Us
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Jobs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {company.overview ? (
            <Slate
              editor={overviewEditor}
              initialValue={overviewValue}
              onChange={(value) => setOverviewValue(value)}
            >
              <Editable
                readOnly
                renderLeaf={renderLeaf}
                className="min-h-[100px]"
              />
            </Slate>
          ) : (
            "No overview"
          )}
        </TabsContent>

        <TabsContent value="whyJoinUs">
          {company.whyJoinUs && company.whyJoinUs.trim().length > 0 ? (
            <Slate
              editor={whyJoinUsEditor}
              initialValue={whyJoinUsValue}
              onChange={(value) => setWhyJoinUsValue(value)}
            >
              <Editable
                readOnly
                renderLeaf={renderLeaf}
                className="min-h-[100px]"
              />
            </Slate>
          ) : (
            "No 'Why Join Us' content available."
          )}
        </TabsContent>

        <TabsContent value="jobs">
          <JobsTabContent userId={userId} jobs={jobs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
