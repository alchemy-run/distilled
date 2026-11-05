#!/usr/bin/env node
/**
 * Fetches the structure of the Technitium DNS Server HTTP API to ../specs/.
 *
 * Technitium publishes no machine-readable description of its API. Two files
 * in its repository describe it: `APIDOCS.md` documents every call (its URL,
 * a list of parameters marked `(optional)`, enum values and an example
 * response), and the server's route table and request handlers
 * (`DnsServerCore/DnsWebService.cs` and `DnsServerCore/WebService*.cs`) show
 * how each parameter is parsed. The documentation decides which calls and
 * parameters exist; the handlers decide each parameter's type.
 *
 * Both are GPL-3.0, so this mirror holds only the structure of the API:
 * paths, permission names, parameter and member names, types, enum values and
 * the section headings. Example values and every sentence of the
 * documentation are dropped before anything is written; the downloaded files
 * are only held in memory.
 *
 * The release is pinned by tag and commit. Files are downloaded by commit,
 * so they cannot change, and the tag must still point at the commit.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Output:
 *   ../specs/api-structure.json   the API structure
 *   ../specs/provenance.json      the release, the commit and every file's SHA-256
 */
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";

const REPOSITORY = "TechnitiumSoftware/DnsServer";
const TAG = "v15.5.0";
const COMMIT = "68ef950e4d2999f3dc19d75e4e32383633adf3e5";
const SPECS_DIR = "../specs";
const STRUCTURE_FILE = "api-structure.json";
/** Documented calls in v15.5.0. Fewer means the documentation did not parse. */
const MIN_OPERATIONS = 100;

/** A value shape inferred from example JSON. Example values themselves are dropped. */
export type Shape =
  | { readonly type: "string" | "number" | "boolean" | "unknown" }
  | { readonly type: "array"; readonly items: Shape }
  | { readonly type: "object"; readonly properties: Readonly<Record<string, Shape>> }
  /** An object keyed by data, such as zone names, rather than by member names. */
  | { readonly type: "map"; readonly values: Shape };

export type ParameterType = "string" | "integer" | "boolean";

export interface Parameter {
  readonly name: string;
  readonly required: boolean;
  readonly type: ParameterType;
  readonly enum?: readonly string[];
}

export type Response =
  /** A JSON payload. `wrapped` payloads sit under `response` in the envelope. */
  | { readonly kind: "json"; readonly wrapped: boolean; readonly shape: Shape }
  /** A file download (`Content-Disposition: attachment`) instead of JSON. */
  | { readonly kind: "file"; readonly contentType: string };

export interface Operation {
  /** `/api/zones/records/add`. */
  readonly path: string;
  /** The section heading, for example `Add Record`. Operation names derive from it. */
  readonly title: string;
  /** Required permissions as `Section: Flag`, for example `Zone: Modify`. */
  readonly permissions: readonly string[];
  readonly parameters: readonly Parameter[];
  readonly response: Response;
  /** `upload` calls need a file in the request body (multipart or raw text). */
  readonly request: "form" | "upload";
}

export interface ApiStructure {
  readonly operations: readonly Operation[];
  /** Routes the server maps that the documentation does not describe. Not generated. */
  readonly undocumentedRoutes: readonly string[];
}

// ---------------------------------------------------------------------------
// Explicit adapters. Each covers a documentation section that the general rules cannot read,
// and each is checked against the inputs so it fails instead of going stale.
// ---------------------------------------------------------------------------

/**
 * Responses documented by reference to another call instead of an example. `settings/set`
 * returns the updated settings in the format of `settings/get` (`SetDnsSettingsAsync` ends by
 * writing the same settings object as `GetDnsSettings`).
 */
export const SAME_RESPONSE: Readonly<Record<string, string>> = {
  "/api/settings/set": "/api/settings/get",
  "/api/settings/restore": "/api/settings/get",
};

/**
 * Calls whose request body must carry a file: a zone file (`zones/import`), an app archive
 * (`apps/install`, `apps/update`) or a backup archive (`settings/restore`). Their sections
 * document a multipart or `text/plain` request body.
 */
export const UPLOADS: ReadonlySet<string> = new Set([
  "/api/zones/import",
  "/api/apps/install",
  "/api/apps/update",
  "/api/settings/restore",
]);

/**
 * Calls that accept a file body but work without one. `zones/create` can import a zone file
 * while creating a zone; without the file it creates the zone from its parameters.
 */
export const OPTIONAL_UPLOADS: ReadonlySet<string> = new Set(["/api/zones/create"]);

/** Envelope members the middleware writes around every payload. They are not payload. */
const ENVELOPE = new Set(["status", "server", "errorMessage", "stackTrace", "innerErrorMessage"]);

// ---------------------------------------------------------------------------
// Documentation
// ---------------------------------------------------------------------------

export interface DocParameter {
  readonly name: string;
  readonly optional: boolean;
  readonly obsolete: boolean;
  readonly enum?: readonly string[];
}

export interface DocSection {
  readonly title: string;
  readonly path: string | undefined;
  readonly permissions: readonly string[];
  readonly parameters: readonly DocParameter[];
  /** The fenced blocks of the response part, verbatim. Some calls show one per variant. */
  readonly responseExamples: readonly string[];
  /** A non-JSON `Content-Type` named in the response part. */
  readonly responseContentType: string | undefined;
  /** Whether the request part mentions a file body. */
  readonly mentionsUpload: boolean;
}

const LABEL = /^([A-Z][A-Z ]*[A-Z]|Response|URL)(?: \([^)]*\))?\\?:\\?\s*(.*)$/;

/**
 * Splits `APIDOCS.md` into one section per `###` heading and reads the parts every section
 * shares: `URL:`, `PERMISSIONS:`, the first `WHERE:` list (the parameters) and `RESPONSE:`.
 * Prose is read only to locate these parts; it is not returned.
 */
export function parseDocs(markdown: string): DocSection[] {
  type Draft = {
    title: string;
    path?: string;
    permissions: string[];
    parameters: DocParameter[];
    responseExamples: string[];
    responseContentType?: string;
    mentionsUpload: boolean;
    part: string;
    sawResponse: boolean;
  };
  const sections: Draft[] = [];
  let current: Draft | undefined;
  let fence: string[] | undefined;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      if (fence === undefined) {
        fence = [];
        continue;
      }
      if (current?.part === "RESPONSE") current.responseExamples.push(fence.join("\n"));
      fence = undefined;
      continue;
    }
    if (fence !== undefined) {
      fence.push(line);
      continue;
    }
    if (line.startsWith("## ")) {
      current = undefined;
      continue;
    }
    if (line.startsWith("### ")) {
      current = {
        title: line.slice(4).trim(),
        permissions: [],
        parameters: [],
        responseExamples: [],
        mentionsUpload: false,
        part: "",
        sawResponse: false,
      };
      sections.push(current);
      continue;
    }
    if (current === undefined) continue;
    // A few sections describe a file response in a sentence instead of under `RESPONSE:`.
    if (/^Response (?:is|data)\b/.test(line)) {
      current.part = "RESPONSE";
      current.sawResponse = true;
      readContentType(current, line);
      continue;
    }
    const label = LABEL.exec(line);
    if (label) {
      const name = label[1]!.toUpperCase();
      // `WHERE:` after the response describes response members, not parameters.
      current.part = name === "WHERE" && current.sawResponse ? "RESPONSE-WHERE" : name;
      if (name === "RESPONSE") current.sawResponse = true;
      const rest = label[2] ?? "";
      if (name === "RESPONSE") readContentType(current, rest);
      if (name === "REQUEST" && /multi-?part|text\/plain/i.test(rest))
        current.mentionsUpload = true;
      continue;
    }
    switch (current.part) {
      case "URL": {
        const url = /^`(?:https?:\/\/[^/`\s]+)?(\/api\/[^?`\s]*)/.exec(line);
        if (url && current.path === undefined) current.path = url[1];
        break;
      }
      case "PERMISSIONS": {
        const permission = /^([A-Za-z]+): ([A-Za-z]+)\\?$/.exec(line.trim());
        if (permission) current.permissions.push(`${permission[1]}: ${permission[2]}`);
        break;
      }
      case "WHERE": {
        const parameter = parseParameterLine(line);
        if (parameter) current.parameters.push(parameter);
        break;
      }
      case "RESPONSE":
        readContentType(current, line);
        break;
      case "REQUEST":
        if (/multi-?part|text\/plain/i.test(line)) current.mentionsUpload = true;
        break;
    }
  }
  return sections.map(({ part: _part, sawResponse: _saw, ...section }) => ({
    ...section,
    path: section.path,
    responseContentType: section.responseContentType,
  }));
}

function readContentType(section: { responseContentType?: string }, text: string) {
  const type =
    /`Content-Type: ([a-z]+\/[a-z0-9.+-]+)/i.exec(text)?.[1] ??
    /content type `([a-z]+\/[a-z0-9.+-]+)`/i.exec(text)?.[1];
  if (type && !/json/i.test(type)) section.responseContentType ??= type.toLowerCase();
}

/**
 * `` - `name` (optional): ... `` -> the name, whether it is optional or obsolete and the enum
 * values listed as ``Valid values are [`A`, `B`]``. Record types are listed as
 * ``Supported record types are [`A`, ...] and proprietary types [`APP`, ...]``.
 */
export function parseParameterLine(line: string): DocParameter | undefined {
  const match = /^- `(\w+)` ?((?:\([^)]*\))*)\s*[:.]/.exec(line);
  if (!match) return undefined;
  const qualifiers = [...(match[2] ?? "").matchAll(/\(([^)]*)\)/g)].map((m) => m[1]!.toLowerCase());
  const values =
    /Valid (?:values|options|value) (?:are|is) \[([^\]]+)\]/.exec(line)?.[1] ??
    /Supported record types are ((?:[^[\]]*\[[^\]]+\])+)/.exec(line)?.[1];
  return {
    name: match[1]!,
    optional: qualifiers.some((q) => q.startsWith("optional")),
    obsolete: qualifiers.some((q) => q.includes("obsolete")),
    ...(values ? { enum: [...values.matchAll(/`([^`]+)`/g)].map((m) => m[1]!) } : {}),
  };
}

/**
 * Parses an example response. Four examples in 15.5.0 are not valid JSON: three have a
 * trailing comma and one lacks a comma between two members. Both slips are repaired; anything
 * else fails.
 */
export function parseExample(text: string): { value: unknown; repaired: boolean } {
  try {
    return { value: JSON.parse(text), repaired: false };
  } catch {
    const repairedText = text
      .replace(/,(\s*[}\]])/g, "$1")
      .replace(/("|\d|true|false|null)(\s*\n\s*")/g, "$1,$2");
    return { value: JSON.parse(repairedText), repaired: true };
  }
}

/** The shape of an example value. Array items merge into one shape. */
export function shapeOf(value: unknown): Shape {
  if (typeof value === "string") return { type: "string" };
  if (typeof value === "number") return { type: "number" };
  if (typeof value === "boolean") return { type: "boolean" };
  if (Array.isArray(value)) {
    const items = value.map(shapeOf);
    return {
      type: "array",
      items: items.length === 0 ? { type: "unknown" } : items.reduce(mergeShapes),
    };
  }
  if (
    value !== null &&
    typeof value === "object" &&
    Object.keys(value).some((key) => !MEMBER_NAME.test(key))
  ) {
    const values = Object.values(value).map(shapeOf);
    return {
      type: "map",
      values: values.length === 0 ? { type: "unknown" } : values.reduce(mergeShapes),
    };
  }
  if (value !== null && typeof value === "object")
    return {
      type: "object",
      properties: Object.fromEntries(
        Object.entries(value)
          .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
          .map(([key, member]) => [key, shapeOf(member)]),
      ),
    };
  return { type: "unknown" };
}

/** Member names are identifiers. Other keys, such as `example.com`, are example data. */
const MEMBER_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** Two observations of the same member: the union of object members, `unknown` on conflict. */
export function mergeShapes(a: Shape, b: Shape): Shape {
  if (a.type === "unknown") return b.type === "unknown" ? a : b;
  if (b.type === "unknown") return a;
  if (a.type === "object" && b.type === "object") {
    const keys = [...new Set([...Object.keys(a.properties), ...Object.keys(b.properties)])].sort();
    return {
      type: "object",
      properties: Object.fromEntries(
        keys.map((key) => {
          const left = a.properties[key];
          const right = b.properties[key];
          return [key, left && right ? mergeShapes(left, right) : (left ?? right)!];
        }),
      ),
    };
  }
  if (a.type === "array" && b.type === "array")
    return { type: "array", items: mergeShapes(a.items, b.items) };
  if (a.type === "map" && b.type === "map")
    return { type: "map", values: mergeShapes(a.values, b.values) };
  return a.type === b.type ? a : { type: "unknown" };
}

// ---------------------------------------------------------------------------
// Server source
// ---------------------------------------------------------------------------

export interface Route {
  /** The handler's class, for example `WebServiceZonesApi`. */
  readonly className: string;
  readonly method: string;
  /** Mapped with `MapPost` only (no GET). */
  readonly postOnly: boolean;
}

/** Reads `DnsWebService.cs`: the API route table and the classes behind its handler fields. */
export function parseRoutes(webService: string): Map<string, Route> {
  const fields = new Map<string, string>();
  for (const m of webService.matchAll(/readonly (\w+) (_\w+);/g)) fields.set(m[2]!, m[1]!);
  const routes = new Map<string, Route>();
  const route =
    /_webService\.Map(GetAndPost|Post)\("(\/api\/[^"]+)",\s*(?:delegate \(HttpContext context\) \{ (?:return )?)?(_\w+)\.(\w+)/g;
  for (const m of webService.matchAll(route)) {
    const className = fields.get(m[3]!);
    if (className === undefined) throw new Error(`Route ${m[2]}: unknown handler field ${m[3]}`);
    routes.set(m[2]!, { className, method: m[4]!, postOnly: m[1] === "Post" });
  }
  if (routes.size === 0) throw new Error("No API routes found in DnsWebService.cs");
  return routes;
}

/** The text of a method's body, found by brace matching outside strings and comments. */
export function methodBody(source: string, name: string): string | undefined {
  const declaration = new RegExp(
    `(?:public|private|internal|protected)[^;{}=]*?\\b${name}\\s*\\(`,
    "g",
  );
  const match = declaration.exec(source);
  if (!match) return undefined;
  let depth = 0;
  for (let i = source.indexOf("{", match.index); i >= 0 && i < source.length; i++) {
    const c = source[i];
    if (c === '"' || c === "'") {
      for (i++; i < source.length && source[i] !== c; i++) if (source[i] === "\\") i++;
    } else if (c === "/" && source[i + 1] === "/") {
      i = source.indexOf("\n", i);
      if (i < 0) return undefined;
    } else if (c === "{") depth++;
    else if (c === "}" && --depth === 0)
      return source.slice(source.indexOf("{", match.index), i + 1);
  }
  return undefined;
}

/**
 * One parameter read: `request.GetQueryOrForm("ttl", ZoneFile.ParseTtl, 3600)`,
 * `request.GetQueryOrFormEnum<T>("type")`, `request.TryGetQueryOrForm("disable", bool.Parse, ...)`
 * or `request.GetQueryOrFormAlt("ipAddress", "value")`, also through `context.Request`.
 */
const READ =
  /\b(?:request|context\.Request)\.(?:Get|Try|TryGet)?QueryOrForm(Enum|Alt|Array)?(?:<[\w.]+>)?\(\s*"(\w+)"(?:\s*,\s*"(\w+)")?(?:\s*,\s*([\w.]+))?/g;
const INTEGER_PARSERS =
  /^(?:byte|sbyte|short|ushort|int|uint|long|ulong)\.Parse$|^ZoneFile\.ParseTtl$/;

/** The wire type of every parameter a handler (and the helpers it calls with the request) reads. */
export function parameterTypes(source: string, method: string): Map<string, Set<ParameterType>> {
  const bodies = new Set<string>();
  const visit = (name: string, depth: number) => {
    const body = methodBody(source, name);
    if (body === undefined || bodies.has(body)) return;
    bodies.add(body);
    if (depth === 0) return;
    for (const call of body.matchAll(/\b([A-Z]\w+)\(\s*(?:context|request|HttpContext)\b/g))
      visit(call[1]!, depth - 1);
  };
  visit(method, 2);
  const types = new Map<string, Set<ParameterType>>();
  for (const body of bodies)
    for (const m of body.matchAll(READ)) {
      const parser = m[4];
      const type: ParameterType =
        m[1] === undefined && parser === "bool.Parse"
          ? "boolean"
          : m[1] === undefined && parser !== undefined && INTEGER_PARSERS.test(parser)
            ? "integer"
            : "string";
      // Only the `Alt` methods take a second parameter name; elsewhere a string is a default.
      const names = m[1] === "Alt" && m[3] !== undefined ? [m[2]!, m[3]] : [m[2]!];
      for (const name of names) {
        const set = types.get(name) ?? new Set<ParameterType>();
        set.add(type);
        types.set(name, set);
      }
    }
  return types;
}

// ---------------------------------------------------------------------------
// Structure
// ---------------------------------------------------------------------------

export interface ExtractInput {
  readonly docs: string;
  /** `DnsWebService.cs`. */
  readonly webService: string;
  /** The handler classes by class name, for example `WebServiceZonesApi`. */
  readonly handlers: Readonly<Record<string, string>>;
}

export interface ExtractReport {
  readonly sections: number;
  readonly repairedExamples: readonly string[];
  /** Parameters no handler parses directly; they stay strings. */
  readonly untypedParameters: number;
}

/** The explicit adapters for Technitium's documentation. Tests pass their own. */
export interface Adapters {
  readonly sameResponse: Readonly<Record<string, string>>;
  readonly uploads: ReadonlySet<string>;
  readonly optionalUploads: ReadonlySet<string>;
}
export const ADAPTERS: Adapters = {
  sameResponse: SAME_RESPONSE,
  uploads: UPLOADS,
  optionalUploads: OPTIONAL_UPLOADS,
};

export function extract(
  input: ExtractInput,
  adapters: Adapters = ADAPTERS,
): { structure: ApiStructure; report: ExtractReport } {
  const sections = parseDocs(input.docs);
  const routes = parseRoutes(input.webService);
  const repairedExamples: string[] = [];
  let untypedParameters = 0;
  const examples = new Map<string, { wrapped: boolean; shape: Shape }>();
  const seen = new Set<string>();
  const drafts = sections.map((section) => {
    const { path } = section;
    if (path === undefined) throw new Error(`Section "${section.title}" has no URL`);
    if (seen.has(path)) throw new Error(`${path} is documented twice`);
    seen.add(path);
    const route = routes.get(path);
    if (route === undefined)
      throw new Error(`${path} is documented but the server maps no such route`);
    if (
      (adapters.uploads.has(path) || adapters.optionalUploads.has(path)) !== section.mentionsUpload
    )
      throw new Error(`${path}: UPLOADS and the documented request body disagree`);
    const source = input.handlers[route.className];
    if (source === undefined) throw new Error(`${path}: missing handler source ${route.className}`);
    const types = parameterTypes(source, route.method);
    const parameters = section.parameters
      // The token travels in the Authorization header only.
      .filter((p) => p.name !== "token" && !p.obsolete)
      .map((p): Parameter => {
        const parsed = types.get(p.name);
        if (parsed === undefined) untypedParameters++;
        // A parameter parsed in several ways (rare) stays a string.
        const type = parsed?.size === 1 ? [...parsed][0]! : "string";
        return {
          name: p.name,
          required: !p.optional,
          type: p.enum && type === "string" ? "string" : type,
          ...(p.enum && type === "string" ? { enum: p.enum } : {}),
        };
      });
    if (new Set(parameters.map((p) => p.name)).size !== parameters.length)
      throw new Error(`${path}: a parameter is listed twice`);
    if (section.responseExamples.length > 0 && section.responseContentType === undefined) {
      const observed = section.responseExamples.map((text) => {
        const { value, repaired } = parseExample(text);
        if (repaired) repairedExamples.push(path);
        if (value === null || typeof value !== "object" || Array.isArray(value))
          throw new Error(`${path}: the example response is not a JSON object`);
        const wrapped = "response" in value;
        const payload = wrapped
          ? Reflect.get(value, "response")
          : Object.fromEntries(Object.entries(value).filter(([key]) => !ENVELOPE.has(key)));
        return { wrapped, shape: shapeOf(payload) };
      });
      examples.set(path, {
        wrapped: observed.some((o) => o.wrapped),
        shape: observed.map((o) => o.shape).reduce(mergeShapes),
      });
    }
    return { section, path, parameters, upload: adapters.uploads.has(path) };
  });
  for (const [path, target] of Object.entries(adapters.sameResponse))
    if (!seen.has(path) || !examples.has(target) || examples.has(path))
      throw new Error(
        `SAME_RESPONSE entry ${path} -> ${target} no longer matches the documentation`,
      );
  const operations = drafts.map(({ section, path, parameters, upload }): Operation => {
    const example = examples.get(path) ?? examples.get(adapters.sameResponse[path] ?? "");
    const response: Response | undefined =
      section.responseContentType !== undefined
        ? { kind: "file", contentType: section.responseContentType }
        : example && { kind: "json", ...example };
    if (response === undefined) throw new Error(`${path}: no example response and no content type`);
    return {
      path,
      title: section.title,
      permissions: section.permissions,
      parameters,
      response,
      request: upload ? "upload" : "form",
    };
  });
  return {
    structure: {
      operations,
      undocumentedRoutes: [...routes.keys()].filter((path) => !seen.has(path)).sort(),
    },
    report: { sections: sections.length, repairedExamples, untypedParameters },
  };
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

const fetchOk = async (url: string) => {
  const response = await fetch(url, { headers: { "User-Agent": "spec-mirror-technitium" } });
  if (!response.ok) throw new Error(`GET ${url}: HTTP ${response.status}`);
  return response;
};

async function main() {
  const resolved = (
    (await (await fetchOk(`https://api.github.com/repos/${REPOSITORY}/commits/${TAG}`)).json()) as {
      sha: string;
    }
  ).sha;
  if (resolved !== COMMIT) throw new Error(`${TAG} now points at ${resolved}, not ${COMMIT}`);

  const download = async (path: string) => {
    const text = await (
      await fetchOk(`https://raw.githubusercontent.com/${REPOSITORY}/${COMMIT}/${path}`)
    ).text();
    return { path, sha256: sha256(text), text };
  };
  const license = await download("LICENSE");
  if (!/GNU GENERAL PUBLIC LICENSE\s+Version 3, 29 June 2007/.test(license.text))
    throw new Error(`LICENSE at ${TAG} is no longer GPL-3.0; review what this mirror keeps`);
  const docs = await download("APIDOCS.md");
  const webService = await download("DnsServerCore/DnsWebService.cs");
  const classes = [
    ...new Set([...parseRoutes(webService.text).values()].map((r) => r.className)),
  ].sort();
  const handlers = await Promise.all(classes.map((name) => download(`DnsServerCore/${name}.cs`)));

  const { structure, report } = extract({
    docs: docs.text,
    webService: webService.text,
    handlers: Object.fromEntries(handlers.map((file, i) => [classes[i]!, file.text])),
  });
  // A rate-limit page or a rewritten document still parses as Markdown.
  if (structure.operations.length < MIN_OPERATIONS)
    throw new Error(`Only ${structure.operations.length} operations extracted from APIDOCS.md`);

  const payload = `${JSON.stringify(structure, null, 2)}\n`;
  const provenance = {
    repository: REPOSITORY,
    tag: TAG,
    commit: COMMIT,
    license: "GPL-3.0",
    files: [license, docs, webService, ...handlers].map(({ path, sha256 }) => ({ path, sha256 })),
    structure: {
      file: STRUCTURE_FILE,
      sha256: sha256(payload),
      operations: structure.operations.length,
      undocumentedRoutes: structure.undocumentedRoutes.length,
      repairedExamples: report.repairedExamples,
      untypedParameters: report.untypedParameters,
    },
  };
  await mkdir(SPECS_DIR, { recursive: true });
  await writeFile(`${SPECS_DIR}/${STRUCTURE_FILE}`, payload);
  await writeFile(`${SPECS_DIR}/provenance.json`, `${JSON.stringify(provenance, null, 2)}\n`);
  console.log(
    `Technitium ${TAG}: ${structure.operations.length} operations, ` +
      `${structure.undocumentedRoutes.length} undocumented routes, ` +
      `${report.repairedExamples.length} repaired examples`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
