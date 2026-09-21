import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Footer } from "./components/layout/Footer.tsx";
import { Header } from "./components/layout/Header.tsx";
import { SkipLink } from "./components/ui/SkipLink.tsx";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <SkipLink href="#main">Skip to content</SkipLink>
          <Header />
          <Suspense>{props.children}</Suspense>
          <Footer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
