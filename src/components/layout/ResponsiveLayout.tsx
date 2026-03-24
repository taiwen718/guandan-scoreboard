import { Outlet } from "react-router-dom";

export function ResponsiveLayout() {
  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-muted/20">
      <main className="flex-1 overflow-hidden flex flex-col min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
