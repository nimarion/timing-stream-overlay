import { Outlet } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

export default function Layout() {
  useTheme();

  return (
    <div className="flex flex-col w-full h-full px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 box-border justify-end">
      <Outlet />
    </div>
  );
}
