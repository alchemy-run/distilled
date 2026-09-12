import type { WorkerEnv } from "../alchemy.run.ts";

// Minimal `HTMLRewriter` shape — the workers runtime exposes it as a
// global, but we don't pull in `@cloudflare/workers-types`, so declare
// just what this file uses.
declare class HTMLRewriter {
  on(
    selector: string,
    handler: { element(el: HTMLRewriterElement): void },
  ): HTMLRewriter;
  transform(response: Response): Response;
}
interface HTMLRewriterElement {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): HTMLRewriterElement;
}

/**
 * `https://distilled.cloud` is the one indexable origin. Every other host
 * this worker answers on — `main.distilled.cloud`, PR previews on
 * `*.workers.dev` — is a mirror of the same build:
 *
 * - `<link rel="canonical">` is baked at build time against production and
 *   is left alone, so mirrors point search engines back at production.
 * - Every mirror response carries `X-Robots-Tag: noindex` and its
 *   `robots.txt` advertises no sitemap, so a mirror URL that leaks (a PR
 *   comment, a shared link) never becomes a duplicate search result.
 * - `og:*` / `twitter:*` card URLs ARE rewritten to the request host, so a
 *   Slack/X unfurl of a preview URL shows that preview's card, not
 *   production's.
 */
const CANONICAL_HOST = "distilled.cloud";

export default {
  fetch: async (request: Request, env: WorkerEnv) => {
    const url = new URL(request.url);
    const canonical = url.host === CANONICAL_HOST;
    if (url.pathname === "/robots.txt" && !canonical) {
      return new Response(MIRROR_ROBOTS_TXT, {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-robots-tag": "noindex",
        },
      });
    }
    const res = await env.ASSETS.fetch(request);
    return withoutIndexing(
      withUtf8Charset(rewriteSocialCardHost(request, res)),
      canonical,
    );
  },
};

/**
 * Served as `robots.txt` on every non-canonical host. Crawlable on purpose:
 * a `Disallow` would stop crawlers from ever seeing the `noindex` header, and
 * a blocked URL can still be indexed by URL alone. No `Sitemap:` line, so the
 * mirror never advertises itself.
 */
const MIRROR_ROBOTS_TXT = `# Mirror of https://${CANONICAL_HOST} — every response is noindex.
User-agent: *
Allow: /
`;

const withoutIndexing = (res: Response, canonicalHost: boolean): Response => {
  if (canonicalHost) return res;
  const next = new Response(res.body, res);
  next.headers.set("x-robots-tag", "noindex");
  return next;
};

/**
 * Stamp `charset=utf-8` on text responses that omit it, so UTF-8 bytes are
 * not decoded as latin-1.
 */
const withUtf8Charset = (res: Response): Response => {
  const ct = res.headers.get("content-type");
  if (!ct || !ct.startsWith("text/") || /charset=/i.test(ct)) return res;
  const next = new Response(res.body, res);
  next.headers.set("content-type", `${ct}; charset=utf-8`);
  return next;
};

/**
 * Absolute `og:*` / `twitter:*` URLs are baked against production. Rewrite
 * those to the request's host so each deployment unfurls itself.
 * `<link rel="canonical">` is deliberately NOT rewritten — it must keep
 * pointing at production on every mirror.
 */
const rewriteSocialCardHost = (request: Request, res: Response): Response => {
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("text/html")) return res;
  const reqUrl = new URL(request.url);
  if (reqUrl.host === CANONICAL_HOST) return res;

  const content = {
    element(el: HTMLRewriterElement) {
      const value = el.getAttribute("content");
      if (!value) return;
      let u: URL;
      try {
        u = new URL(value);
      } catch {
        return;
      }
      if (u.host !== CANONICAL_HOST) return;
      u.protocol = reqUrl.protocol;
      u.host = reqUrl.host;
      el.setAttribute("content", u.toString());
    },
  };

  return new HTMLRewriter()
    .on('meta[property="og:image"]', content)
    .on('meta[property="og:url"]', content)
    .on('meta[name="twitter:image"]', content)
    .transform(res);
};
