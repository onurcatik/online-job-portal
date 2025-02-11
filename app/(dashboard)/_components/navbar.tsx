import { MobileSideBar } from "./mobile-side-bar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
    <MobileSideBar/>
     <NavbarRoutes/>
    </div>
  );
};
