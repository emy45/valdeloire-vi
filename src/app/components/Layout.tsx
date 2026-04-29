import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCallButton } from "./FloatingCallButton";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}