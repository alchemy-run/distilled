import { Link, Meta, Title } from "@solidjs/meta";
import { SITE_URL } from "../../lib/site.ts";

/**
 * Per-page head tags. `og:*` / `twitter:*` URLs are absolute against
 * production; `src/worker.ts` rewrites them to the request host on mirrors,
 * while the canonical link is left pointing at production everywhere.
 */
export const Seo = (props: {
  title: string;
  description: string;
  /** Path of this page, e.g. `/shame`. */
  path: string;
  /** Shorter description for social cards; defaults to `description`. */
  social?: string;
}) => {
  const url = () => `${SITE_URL}${props.path}`;
  const social = () => props.social ?? props.description;
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Link rel="canonical" href={url()} />
      <Meta property="og:site_name" content="Distilled" />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={social()} />
      <Meta property="og:url" content={url()} />
      <Meta property="og:type" content="website" />
      <Meta property="og:image" content={`${SITE_URL}/og.png`} />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={social()} />
      <Meta name="twitter:image" content={`${SITE_URL}/og.png`} />
    </>
  );
};
