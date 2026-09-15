/**
 * Render a Cloudflare API method page's HTML as the Markdown its `/index.md`
 * twin serves.
 *
 * The docs site streams `/index.md` out of the same html→markdown pass, and
 * cuts it off part-way through very large pages (the Access application
 * schemas, for example). The HTML for those pages arrives complete, so the
 * downloader falls back to it and converts here.
 *
 * Only the five containers the spec converter reads are emitted — title,
 * route, description, parameter groups and returns. Everything else on the
 * page (navigation, security blurbs, per-language samples) is chrome the
 * converter discards anyway.
 */

/** Containers whose text becomes markdown; everything else is chrome. */
const CAPTURE_CLASSES = [
  "stldocs-method-title",
  "stldocs-method-route",
  "stldocs-method-description",
  "stldocs-method-parameters",
  "stldocs-method-returns",
];

/** Subtrees with no textual content of their own. */
const SKIP_TAGS = new Set(["svg", "script", "style", "noscript", "template"]);

/** The expander toggle renders as the words `Expand` / `Collapse`. */
const SKIP_CLASSES = ["stldocs-expand-toggle"];

/**
 * Section headings by `data-stldocs-property-group`. The heading element sits
 * outside the container it labels (and not always before it), so the section a
 * property list belongs to is read off the container instead.
 *
 * `models` is the shared-model list a resource index page carries; a method
 * page's type reference is only a name plus a key preview, and the model list
 * is where its fields are written out in full.
 */
const GROUP_HEADINGS: Record<string, string> = {
  p: "Path Parameters",
  h: "Header Parameters",
  q: "Query Parameters",
  body: "Body Parameters",
  returns: "Returns",
  models: "Models",
};

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/** Elements that start and end a markdown block. */
const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "details",
  "div",
  "dl",
  "dd",
  "dt",
  "fieldset",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "summary",
  "table",
  "tr",
  "ul",
]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "\u2019",
  lsquo: "\u2018",
  ldquo: "\u201c",
  rdquo: "\u201d",
};

const decodeEntities = (s: string): string =>
  s.replace(
    /&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,
    (match, body: string) => {
      if (body.startsWith("#x") || body.startsWith("#X")) {
        return String.fromCodePoint(Number.parseInt(body.slice(2), 16));
      }
      if (body.startsWith("#")) {
        return String.fromCodePoint(Number.parseInt(body.slice(1), 10));
      }
      return NAMED_ENTITIES[body] ?? match;
    },
  );

const attr = (attrs: string, name: string): string | undefined => {
  const m = attrs.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return m ? decodeEntities(m[1]) : undefined;
};

const classList = (attrs: string): string[] =>
  (attr(attrs, "class") ?? "").split(/\s+/).filter(Boolean);

interface Frame {
  readonly tag: string;
  readonly classes: string[];
  /** Buffer offset an `<a>` opened at, so its close can wrap the text. */
  readonly linkAt?: number;
  readonly href?: string;
}

const TOKEN =
  /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!DOCTYPE[^>]*>|<\/([a-zA-Z][a-zA-Z0-9-]*)\s*>|<([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;

/**
 * The page's method and model panes as markdown blocks.
 *
 * Returns undefined when the HTML holds neither (a 404 body).
 */
export const pageHtmlToMarkdown = (html: string): string | undefined => {
  const blocks: string[] = [];
  const stack: Frame[] = [];
  let buf = "";
  let captureDepth = -1;
  let skipDepth = -1;
  let preDepth = -1;
  let sawContent = false;
  let inPropertyList = false;

  const flush = () => {
    const text =
      preDepth >= 0 ? buf.replace(/\s+$/, "") : buf.replace(/\s+/g, " ").trim();
    if (text.trim()) blocks.push(text);
    buf = "";
  };

  const write = (text: string) => {
    if (captureDepth < 0 || skipDepth >= 0) return;
    buf += text;
  };

  const open = (tag: string, attrs: string) => {
    const classes = classList(attrs);
    const frame: Frame = { tag, classes };

    if (skipDepth < 0) {
      const group = attr(attrs, "data-stldocs-property-group");
      const heading = group ? GROUP_HEADINGS[group] : undefined;
      if (SKIP_TAGS.has(tag) || classes.some((c) => SKIP_CLASSES.includes(c))) {
        skipDepth = stack.length;
      } else if (
        captureDepth < 0 &&
        (classes.some((c) => CAPTURE_CLASSES.includes(c)) || group === "models")
      ) {
        captureDepth = stack.length;
        sawContent = true;
        if (heading) blocks.push(`##### ${heading}`);
        inPropertyList = heading !== undefined;
      }
    }

    if (captureDepth >= 0 && skipDepth < 0) {
      if (BLOCK_TAGS.has(tag)) flush();
      if (tag === "details" || tag === "summary") {
        blocks.push(`<${tag}>`);
      } else if (tag === "pre") {
        preDepth = stack.length;
        buf = "```\n";
      } else if (/^h[1-6]$/.test(tag)) {
        // A heading inside a property list repeats the synthesized one.
        if (inPropertyList) skipDepth = stack.length;
        else buf = `${"#".repeat(Number(tag[1]))} `;
      } else if (tag === "code" && preDepth < 0) {
        buf += "`";
      } else if (tag === "br") {
        buf += " ";
      } else if (tag === "a") {
        // The deep-link button is a bare icon; its href repeats the property's
        // full path and is worth kilobytes a page, so only the marker is kept.
        if (classes.includes("stldocs-deep-link-button")) {
          flush();
          blocks.push("[Link to this property](#)");
          skipDepth = stack.length;
        } else {
          stack.push({
            ...frame,
            linkAt: buf.length,
            href: attr(attrs, "href"),
          });
          return;
        }
      }
    }

    if (!VOID_TAGS.has(tag)) stack.push(frame);
  };

  const close = (tag: string) => {
    let at = -1;
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].tag === tag) {
        at = i;
        break;
      }
    }
    if (at < 0) return;
    const frame = stack[at];
    stack.length = at;

    if (skipDepth >= 0) {
      if (stack.length <= skipDepth) skipDepth = -1;
      return;
    }
    if (captureDepth < 0) return;

    if (tag === "pre") {
      buf += "\n```";
      flush();
      preDepth = -1;
    } else if (tag === "code" && preDepth < 0) {
      buf += "`";
    } else if (tag === "a" && frame.linkAt !== undefined) {
      const text = buf.slice(frame.linkAt).trim();
      buf = buf.slice(0, frame.linkAt);
      // An autolinked URL prints as itself, the way the markdown twin has it.
      if (frame.href && text && frame.href !== text)
        buf += `[${text}](${frame.href})`;
      else buf += text;
    } else if (tag === "details" || tag === "summary") {
      flush();
      blocks.push(`</${tag}>`);
    } else if (BLOCK_TAGS.has(tag)) {
      flush();
    }

    if (stack.length <= captureDepth) {
      flush();
      captureDepth = -1;
      inPropertyList = false;
    }
  };

  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(html)) !== null) {
    if (match.index > last)
      write(decodeEntities(html.slice(last, match.index)));
    last = TOKEN.lastIndex;
    const closing = match[1];
    const opening = match[2];
    if (closing) close(closing.toLowerCase());
    else if (opening) open(opening.toLowerCase(), match[3] ?? "");
  }
  flush();

  if (!sawContent) return undefined;
  return `${blocks.join("\n\n")}\n`;
};
