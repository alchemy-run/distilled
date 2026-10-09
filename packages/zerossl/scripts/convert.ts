#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the ZeroSSL API reference (Markdown) → `.generated-specs/zerossl.json`.
 *
 * ZeroSSL publishes no OpenAPI document. Its reference is one Markdown page
 * per endpoint in github.com/zerossl/documentation, snapshotted daily by the
 * spec mirror (`specs/spec-mirror-zerossl/specs/{api,acme}/*.md`). Every
 * endpoint page has the same parts, and each becomes part of the model:
 *
 *   <span class="method">HTTPS POST</span>     → the HTTP method
 *   **API Request URL:** ``api.zerossl.com/…`` → the URI (`{id}` → label)
 *   **HTTPS GET|POST Request Parameters:**     → query | JSON body members
 *   **API Response:** the first JSON example   → the output shape (types
 *                                                from the example values)
 *   **Response Objects:** table                → member documentation
 *
 * The error pages (`api/error-codes.md`, `acme/error-codes.md`) list every
 * `{ success: false, error: { code, type } }` failure in tables, one per
 * endpoint ("Errors - Create Certificate") plus "Errors - General". Each
 * error type becomes a typed error matched on `type` and `code`; an
 * operation gets the general errors plus its own table.
 *
 * `access_key` is never a member: the protocol sends it as the
 * `Authorization: ApiKey` header. What the docs do not say (the rate-limit
 * error, `success` being a boolean, the HMAC key being a secret) is in
 * `patches/`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { ERROR_MATCHERS_TRAIT, NULLABLE_TRAIT } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const specsDir = resolveSpecPath(root, "specs/spec-mirror-zerossl/specs");
const outDir = path.join(root, ".generated-specs");
const NS = "com.zerossl.api";
const id = (name: string) => `${NS}#${name}`;

/** Endpoint pages and the operation each becomes. */
const ENDPOINTS: ReadonlyArray<{ readonly page: string; readonly name: string }> = [
  { page: "api/create-certificate.md", name: "CreateCertificate" },
  { page: "api/verify-domains.md", name: "VerifyDomains" },
  { page: "api/download-certificate-inline.md", name: "DownloadCertificateInline" },
  { page: "api/get-certificate.md", name: "GetCertificate" },
  { page: "api/list-certificates.md", name: "ListCertificates" },
  { page: "api/verification-status.md", name: "GetVerificationStatus" },
  { page: "api/resend-verification.md", name: "ResendVerification" },
  { page: "api/cancel-certificate.md", name: "CancelCertificate" },
  { page: "api/revoke-certificate.md", name: "RevokeCertificate" },
  { page: "api/validate-csr.md", name: "ValidateCsr" },
  { page: "acme/generate-eab-credentials.md", name: "GenerateEabCredentials" },
];

/**
 * Pages that are not converted, and why. Every endpoint page must be in
 * {@link ENDPOINTS} or here, so a new upstream page fails convert.
 */
const SKIPPED_PAGES: Readonly<Record<string, string>> = {
  "api/index.md": "section index",
  "api/overview.md": "general notes (auth, request formats)",
  "api/error-codes.md": "read as the error tables",
  "acme/index.md": "section index",
  "acme/error-codes.md": "read as the error tables",
  "api/generate-eab-credentials.md": "moved to acme/generate-eab-credentials.md",
  "api/download-certificate.md":
    "returns a ZIP archive; downloadCertificateInline returns the same files as JSON",
};

/** Output shape names that differ from `<Operation>Response`. */
const OUTPUT_NAMES: Readonly<Record<string, string>> = {
  GenerateEabCredentials: "EabCredentials",
};

/** Error tables ("Errors - <section>") → the operations they belong to. */
const ERROR_SECTIONS: Readonly<Record<string, readonly string[]>> = {
  // The REST pages; acme/error-codes.md lists the EAB endpoint's own.
  General: ENDPOINTS.filter((e) => e.page.startsWith("api/")).map((e) => e.name),
  "Create Certificate": ["CreateCertificate"],
  "Verify Domains": ["VerifyDomains"],
  "Download Certificate": ["DownloadCertificateInline"],
  "Revoke Certificate": ["RevokeCertificate"],
  "Cancel Certificate": ["CancelCertificate"],
  "Resend Verification": ["ResendVerification"],
  "Get Verification Status": ["GetVerificationStatus"],
  // Account email verification has no endpoint in the reference.
  "Email verification": [],
  // acme/error-codes.md has one untitled table.
  ACME: ["GenerateEabCredentials"],
};

// ============================================================================
// Markdown
// ============================================================================

const read = (page: string) =>
  fs.readFileSync(path.join(specsDir, page), "utf8").replace(/\r\n/g, "\n");

/** Collapse runs of whitespace, strip HTML tags. */
const clean = (s: string) =>
  s
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** The lines after a `**Heading**` up to the next bold heading. */
const section = (md: string, heading: RegExp): string | undefined => {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => heading.test(l));
  if (start === -1) return undefined;
  const end = lines.findIndex((l, i) => i > start && /^\*\*[^*]+:\*\*\s*$/.test(l.trim()));
  return lines.slice(start + 1, end === -1 ? undefined : end).join("\n");
};

interface Row {
  readonly name: string;
  readonly required: boolean;
  readonly doc: string;
}

/**
 * Parameter-style table rows: `` | `name` | `name`**[Required]** text | ``.
 * Rows whose description does not start with the name (nested enum tables)
 * are skipped.
 */
const tableRows = (text: string | undefined): Row[] => {
  if (text === undefined) return [];
  const rows: Row[] = [];
  for (const line of text.split("\n")) {
    const m = /^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`(.*)\|\s*$/.exec(line.trim());
    if (!m || m[1] !== m[2]) continue;
    const rest = m[3]!;
    rows.push({
      name: m[1]!,
      required: /\*\*\[Required\]\*\*/.test(rest),
      doc: clean(rest.replace(/\*\*\[(Required|Optional)\]\*\*/g, "")),
    });
  }
  return rows;
};

const firstCodeBlock = (text: string | undefined): string | undefined =>
  text === undefined ? undefined : /```[a-z]*\n([\s\S]*?)```/.exec(text)?.[1];

/** The docs' JSON examples are hand-typed: tolerate stray spaces, `{...}` and a missing comma. */
const parseExample = (raw: string): unknown => {
  // Non-breaking spaces trail some lines; `{...}` stands for more items.
  const src = raw.replace(/\u00a0/g, " ").replace(/,\s*\{\.\.\.\}/g, "");
  try {
    return JSON.parse(src);
  } catch {
    return JSON.parse(src.replace(/("[^"]*"|\d|true|false|null)\s*\n(\s*")/g, "$1,\n$2"));
  }
};

const pascal = (s: string) =>
  s
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join("");

// ============================================================================
// Model
// ============================================================================

const shapes: Record<string, any> = {};
const operations: string[] = [];

/** Shape for an example value; objects keyed by domain names become maps. */
const shapeFor = (value: unknown, name: string, docs: Map<string, string>): string => {
  if (typeof value === "string" || value === null) return "smithy.api#String";
  if (typeof value === "boolean") return "smithy.api#Boolean";
  if (typeof value === "number")
    return Number.isInteger(value) ? "smithy.api#Integer" : "smithy.api#Double";
  if (Array.isArray(value)) {
    shapes[id(`${name}List`)] = {
      type: "list",
      member: { target: shapeFor(value[0] ?? "", `${name}Item`, docs) },
    };
    return id(`${name}List`);
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > 0 && entries.every(([k]) => k.includes("."))) {
    // `{ "domain.com": … }` and file names (`certificate.crt`) are data.
    const values = entries.map(([, v]) => v);
    if (values.every((v) => typeof v === "string")) {
      // Fixed file names: keep them as members.
    } else {
      shapes[id(`${name}Map`)] = {
        type: "map",
        key: { target: "smithy.api#String" },
        value: { target: shapeFor(values[0], `${name}Value`, docs) },
      };
      return id(`${name}Map`);
    }
  }
  const members: Record<string, any> = {};
  for (const [key, v] of entries) {
    const doc = docs.get(key);
    members[key] = {
      target: shapeFor(v, `${name}${pascal(key)}`, docs),
      traits: {
        ...(doc ? { "smithy.api#documentation": doc } : {}),
        ...(v === null ? { [NULLABLE_TRAIT]: {} } : { "smithy.api#required": {} }),
      },
    };
  }
  shapes[id(name)] = { type: "structure", members, traits: {} };
  return id(name);
};

const pages = new Set<string>();
for (const dir of ["api", "acme"]) {
  for (const f of fs.readdirSync(path.join(specsDir, dir))) pages.add(`${dir}/${f}`);
}
const unknown = [...pages].filter(
  (p) => !ENDPOINTS.some((e) => e.page === p) && !(p in SKIPPED_PAGES),
);
if (unknown.length > 0) {
  throw new Error(
    `new ZeroSSL reference page(s): ${unknown.join(", ")} — add them to ENDPOINTS or SKIPPED_PAGES`,
  );
}

for (const { page, name } of ENDPOINTS) {
  const md = read(page);
  const method = /class="method">HTTPS (GET|POST|PUT|DELETE)</.exec(md)?.[1];
  const url = /\*\*API Request URL:\*\*\s*```[a-z]*\n\s*api\.zerossl\.com(\S+)\s*\n```/.exec(
    md,
  )?.[1];
  const title = /<h2>([^<]+)<\/h2>/.exec(md)?.[1]?.trim();
  if (!method || !url || !title) throw new Error(`${page}: no method, request URL or title`);
  const intro = clean(
    md
      .slice(md.indexOf("</div>") + 6, md.indexOf("**API Request URL:**"))
      .replace(/:::[\s\S]*?:::/g, ""),
  );

  // Input
  const members: Record<string, any> = {};
  const addParams = (rows: Row[], binding: "query" | "body") => {
    for (const row of rows) {
      if (row.name === "access_key") continue;
      const label = /^\{(.+)\}$/.exec(row.name)?.[1];
      members[label ?? row.name] = {
        target: "smithy.api#String",
        traits: {
          ...(label
            ? { "smithy.api#httpLabel": {}, "smithy.api#required": {} }
            : binding === "query"
              ? { "smithy.api#httpQuery": row.name }
              : {}),
          ...(row.doc ? { "smithy.api#documentation": row.doc } : {}),
          ...(row.required && !label ? { "smithy.api#required": {} } : {}),
        },
      };
    }
  };
  addParams(tableRows(section(md, /\*\*HTTPS GET Request Parameters:\*\*/)), "query");
  addParams(tableRows(section(md, /\*\*HTTPS POST Request Parameters:\*\*/)), "body");
  const input =
    Object.keys(members).length > 0
      ? ((shapes[id(`${name}Request`)] = { type: "structure", members, traits: {} }),
        { target: id(`${name}Request`) })
      : { target: "smithy.api#Unit" };

  // Output
  const docs = new Map(
    tableRows(section(md, /\*\*Response Objects:\*\*/)).map((r) => [r.name, r.doc]),
  );
  const example = firstCodeBlock(
    section(md, /\*\*API Response:\*\*/) ?? md.slice(md.indexOf("**API Response")),
  );
  const outName = OUTPUT_NAMES[name] ?? `${name}Response`;
  const output =
    example === undefined
      ? ((shapes[id(outName)] = { type: "structure", members: {}, traits: {} }),
        { target: id(outName) })
      : { target: shapeFor(parseExample(example), outName, docs) };

  shapes[id(name)] = {
    type: "operation",
    input,
    output,
    traits: {
      "smithy.api#http": { method, uri: url, code: 200 },
      "smithy.api#documentation": intro ? `${title}\n\n${intro}` : title,
    },
  };
  operations.push(name);
}

// Errors
const errorsOf = new Map<string, string[]>();
const errorPages: Array<[string, string]> = [
  ["api/error-codes.md", ""],
  ["acme/error-codes.md", "ACME"],
];
for (const [page, fixedSection] of errorPages) {
  const md = read(page);
  const parts = fixedSection
    ? [[fixedSection, md] as const]
    : [...md.matchAll(/\*\*Errors - ([^:*]+):\*\*([\s\S]*?)(?=\*\*Errors - |$)/g)].map(
        (m) => [m[1]!.trim(), m[2]!] as const,
      );
  for (const [sectionName, body] of parts) {
    const ops = ERROR_SECTIONS[sectionName];
    if (ops === undefined) throw new Error(`${page}: unknown error section "${sectionName}"`);
    for (const line of body.split("\n")) {
      const m = /^\|\s*`(\d+)`\s+`([a-z0-9_]+)`\s*\|(.*)\|\s*$/.exec(line.trim());
      if (!m) continue;
      const [, code, type, rest] = m;
      const errName = pascal(type!);
      const doc = clean(rest!.replace(/^\s*`[^`]*`\s*/, ""));
      const existing = shapes[id(errName)];
      if (existing) {
        existing.traits[ERROR_MATCHERS_TRAIT].push({ code: Number(code) });
      } else {
        shapes[id(errName)] = {
          type: "structure",
          members: {
            code: { target: "smithy.api#Integer" },
            message: { target: "smithy.api#String" },
          },
          traits: {
            "smithy.api#error": "client",
            "smithy.api#documentation": `${doc.replace(/\.$/, "")} (\`${type}\`, code ${code}).`,
            [ERROR_MATCHERS_TRAIT]: [{ message: type }, { code: Number(code) }],
          },
        };
      }
      for (const op of ops) {
        const list = errorsOf.get(op) ?? [];
        if (!list.includes(errName)) list.push(errName);
        errorsOf.set(op, list);
      }
    }
  }
}
for (const [op, errs] of errorsOf) {
  shapes[id(op)].errors = errs.map((e) => ({ target: id(e) }));
}

shapes[id("ZeroSsl")] = {
  type: "service",
  version: "v1",
  operations: operations.map((o) => ({ target: id(o) })),
  traits: {
    "smithy.api#title": "ZeroSSL REST API",
    "smithy.api#documentation":
      "Converted from the ZeroSSL API reference (github.com/zerossl/documentation). Auth is the account's access key, sent in the `Authorization: ApiKey` header by the protocol (never modeled as an input). Failures come back as `{ success: false, error: { code, type, info } }`, usually with HTTP 200 — the protocol treats `success: false` as an error and matches on `error.type`.",
  },
};

const manifest = JSON.parse(fs.readFileSync(path.join(specsDir, "_manifest.json"), "utf8"));
const model = {
  smithy: "2.0",
  metadata: { zerossl: { repository: manifest.repository, commit: manifest.commit } },
  shapes,
};
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "zerossl.json"), `${JSON.stringify(model, null, 2)}\n`);
console.log(
  `✅ zerossl: ${operations.length} operations from ${manifest.repository}@${manifest.commit.slice(0, 7)}`,
);

await finalizeConvert({ root, operationNaming: "as-is", patchesFor: () => "" });
