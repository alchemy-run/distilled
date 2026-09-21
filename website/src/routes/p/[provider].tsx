import { useParams } from "@solidjs/router";
import { Home } from "../../components/home/Home.tsx";

/**
 * The homepage pinned to one provider. Every provider gets a prerendered file
 * (see `prerender.routes` in vite.config.ts) because social scrapers read the
 * card tags straight out of the HTML and never run the router.
 */
export default function Provider() {
  const params = useParams<{ provider: string }>();
  return <Home provider={params.provider} />;
}
