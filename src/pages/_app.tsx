import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col w-full h-full p-5 box-border justify-end">
      <Outlet />
    </div>
  );
}
