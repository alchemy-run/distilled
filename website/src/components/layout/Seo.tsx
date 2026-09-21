import { Link, Meta, Title } from "@solidjs/meta";
import { getRequestEvent, isServer } from "solid-js/web";
import { SITE_URL } from "../../lib/site.ts";

/**
 * Origin the social card advertises. Production HTML is prerendered against
 * `SITE_URL` and `worker.ts` rewrites it to the request host on mirrors, but
 * `alchemy dev` tunnels straight to this server with no worker in front, so
 * a tunnelled page would point scrapers at production — which serves a
 * different build. Derive it from the request in dev instead.
 */
const socialOrigin = (): string => {
  if (!import.meta.env.DEV) return SITE_URL;
  if (!isServer) return window.location.origin;
  const headers = getRequestEvent()?.request.headers;
  const host = headers?.get("x-forwarded-host") ?? headers?.get("host");
  if (!host) return SITE_URL;
  // Tunnels terminate TLS at Cloudflare and forward over http.
  const proto =
    headers?.get("x-forwarded-proto") ??
    (/^(localhost|127\.|\[::1\])/.test(host) ? "http" : "https");
  return `${proto}://${host}`;
};

/**
 * Per-page head tags. The canonical link always points at production; the
 * `og:*` / `twitter:*` URLs follow whichever host is serving the page.
 */
export const Seo = (props: {
  title: string;
  description: string;
  /** Path of this page, e.g. `/shame`. */
  path: string;
  /** Shorter description for social cards; defaults to `description`. */
  social?: string;
  /** Absolute path of this page's social card; defaults to the generic one. */
  card?: string;
  cardAlt?: string;
  /**
   * Page search engines should treat as the original. The 79 `/p/<provider>`
   * pages are the homepage pinned to one provider — a share target, not 79
   * near-identical pages to index — so they point back at `/`.
   */
  canonicalPath?: string;
}) => {
  const canonical = () => `${SITE_URL}${props.canonicalPath ?? props.path}`;
  const url = () => `${socialOrigin()}${props.path}`;
  const image = () => `${socialOrigin()}${props.card ?? "/og.png"}`;
  const social = () => props.social ?? props.description;
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Link rel="canonical" href={canonical()} />
      <Meta property="og:site_name" content="Distilled" />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={social()} />
      <Meta property="og:url" content={url()} />
      <Meta property="og:type" content="website" />
      <Meta property="og:image" content={image()} />
      <Meta property="og:image:type" content="image/png" />
      {/* The card is laid out at 1200×630 and rendered at 2× by
          `scripts/og.ts`; these must state the file's real pixel size. */}
      <Meta property="og:image:width" content="2400" />
      <Meta property="og:image:height" content="1260" />
      <Meta
        property="og:image:alt"
        content={props.cardAlt ?? "Distilled — Cloud APIs, distilled into Effect."}
      />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={social()} />
      <Meta name="twitter:image" content={image()} />
    </>
  );
};
