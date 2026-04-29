import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { Careers } from "./pages/Careers";
import { Blog } from "./pages/Blog";
import { BlogDynamic } from "./pages/BlogDynamic";
import { BlogArticle1 } from "./pages/BlogArticle1";
import { BlogArticle2 } from "./pages/BlogArticle2";
import { BlogArticleDynamic } from "./pages/BlogArticleDynamic";
import { MentionsLegales } from "./pages/MentionsLegales";
import { CGV } from "./pages/CGV";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminSignup } from "./pages/AdminSignup";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminArticleEditor } from "./pages/AdminArticleEditor";
import { CreateSodimaviArticle } from "./pages/CreateSodimaviArticle";
import { AdminMediaLibrary } from "./pages/AdminMediaLibrary";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
      { path: "nous-rejoindre", Component: Careers },
      { path: "mentions-legales", Component: MentionsLegales },
      { path: "cgv", Component: CGV },
      { path: "blog", Component: BlogDynamic },
      { path: "blog/entretien-poids-lourds-daf-conseils", Component: BlogArticle1 },
      { path: "blog/depannage-24-7-pourquoi-essentiel", Component: BlogArticle2 },
      { path: "blog/:slug", Component: BlogArticleDynamic },
      { path: "*", Component: NotFound },
    ],
  },
  // Admin routes (no Layout)
  {
    path: "/admin/signup",
    Component: AdminSignup,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/article/:slug",
    Component: AdminArticleEditor,
  },
  {
    path: "/admin/create-sodimavi-article",
    Component: CreateSodimaviArticle,
  },
  {
    path: "/admin/medias",
    Component: AdminMediaLibrary,
  },
]);