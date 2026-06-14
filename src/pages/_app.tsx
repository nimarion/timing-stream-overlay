import { Outlet } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

export default function Layout() {
  useTheme();

  return (
    <div className="flex flex-col w-full h-full p-5 box-border justify-end">
      <Outlet />
    </div>
  );
}
