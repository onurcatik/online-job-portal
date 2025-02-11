import Sidebar from "@/app/(dashboard)/_components/sidebar"

import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full">
        {/* header */}
        <header className="h-20 fixed inset-y-0 w-full z-50">
        <Navbar/>

        </header>
  
        {/* sidebar */}
        <div className="hidde md:flex h-full w-56 flex-col fixed inset-y-0 z-50"><Sidebar/></div>
  
        <main>{children}</main>
      </div>
    );
  };
  
  export default DashboardLayout;
  