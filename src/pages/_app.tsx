import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col w-screen h-screen p-5">
      <Outlet />
    </div>
  );
}
