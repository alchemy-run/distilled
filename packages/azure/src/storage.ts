/**
 * Storage data-plane codec -- hand-written.
 *
 * Azure Storage (Blob, Queue, File, Data Lake) speaks a REST dialect the ARM
 * JSON path does not cover. `protocol.ts` hands these pieces to the request
 * builder and response decoder for operations whose version header is
 * `x-ms-version`:
 *
 *   XML bodies       request bodies are built from the input schema under the
 *                    operation's `xmlRoot`; response bodies are read back
 *                    against the output schema. Member traits from the
 *                    swagger's `xml` objects name elements (`XmlName`),
 *                    attributes (`XmlAttribute`), text content (`XmlText`),
 *                    repeated items (`XmlFlattened`) and wrapped list items
 *                    (`XmlItemName`).
 *   header maps      `HeaderPrefix("x-ms-meta-")` members are sent and read
 *                    as one header per key.
 *   headers          header-bound output members are parsed as numbers and
 *                    booleans where the schema says so.
 *   errors           `<Error><Code>...</Code><Message>...</Message></Error>`, or
 *                    the `x-ms-error-code` header when there is no body
 *                    (`HEAD`).
 *   SAS URLs         an account/container URL that already carries a SAS
 *                    query (`?sv=...&sig=...`) authenticates the request by
 *                    itself.
 */
import {
  getPropAnn,
  getProps,
  hasPropAnn,
  nameOf,
  resolveNode,
} from "@distilled.cloud/core/protocol-http";
import {
  bodySymbol,
  headerSymbol,
  httpBodySymbol,
  labelSymbol,
  querySymbol,
} from "@distilled.cloud/core/trait";
import { escapeXml, parseXmlSync, type XmlObject, type XmlValue } from "@distilled.cloud/core/xml";
import type * as AST from "effect/SchemaAST";
import {
  headerPrefixSymbol,
  hostLabelSymbol,
  xmlAttributeSymbol,
  xmlFlattenedSymbol,
  xmlItemNameSymbol,
  xmlNameSymbol,
  xmlTextSymbol,
} from "./traits.ts";

// ---------------------------------------------------------------------------
// Member plans (read once per schema)
// ---------------------------------------------------------------------------

type Kind = "attribute" | "text" | "flattened" | "wrapped" | "element";

interface XmlMember {
  readonly key: string;
  readonly name: string;
  readonly kind: Kind;
  readonly type: AST.AST;
  /** Lists: the item schema. */
  readonly item: AST.AST | undefined;
  /** Wrapped lists: the item element name. */
  readonly itemName: string | undefined;
}

interface XmlPlan {
  readonly members: ReadonlyArray<XmlMember>;
  readonly known: ReadonlySet<string>;
  /** The object also carries keys it does not declare (`additionalProperties`). */
  readonly open: boolean;
}

/** A member bound to the URL or a header: never part of an XML body. */
const isWireBound = (prop: AST.PropertySignature): boolean =>
  hasPropAnn(prop, labelSymbol) ||
  hasPropAnn(prop, querySymbol) ||
  hasPropAnn(prop, headerSymbol) ||
  hasPropAnn(prop, hostLabelSymbol) ||
  hasPropAnn(prop, headerPrefixSymbol) ||
  hasPropAnn(prop, httpBodySymbol);

const arrayItem = (ast: AST.AST): AST.AST | undefined => {
  const node = resolveNode(ast);
  return node._tag === "Arrays" ? (node as AST.Arrays).rest[0] : undefined;
};

const plans = /*@__PURE__*/ new WeakMap<AST.AST, XmlPlan>();

const planOf = (ast: AST.AST): XmlPlan => {
  const node = resolveNode(ast);
  let plan = plans.get(node);
  if (plan !== undefined) return plan;
  const members: XmlMember[] = [];
  const known = new Set<string>();
  for (const prop of getProps(node)) {
    const key = String(prop.name);
    known.add(key);
    if (isWireBound(prop)) continue;
    const xmlName = getPropAnn(prop, xmlNameSymbol);
    const name = typeof xmlName === "string" ? xmlName : nameOf(prop, bodySymbol);
    const item = arrayItem(prop.type);
    const itemName = getPropAnn(prop, xmlItemNameSymbol);
    const kind: Kind = hasPropAnn(prop, xmlAttributeSymbol)
      ? "attribute"
      : hasPropAnn(prop, xmlTextSymbol)
        ? "text"
        : item !== undefined
          ? hasPropAnn(prop, xmlFlattenedSymbol)
            ? "flattened"
            : "wrapped"
          : "element";
    members.push({
      key,
      name,
      kind,
      type: prop.type,
      item,
      itemName: typeof itemName === "string" ? itemName : undefined,
    });
  }
  const open = node._tag === "Objects" && (node as AST.Objects).indexSignatures.length > 0;
  plan = { members, known, open };
  plans.set(node, plan);
  return plan;
};

// ---------------------------------------------------------------------------
// Encode
// ---------------------------------------------------------------------------

const text = (value: unknown): string =>
  escapeXml(value instanceof Date ? value.toUTCString() : String(value));

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);

/** `<name>...</name>` for one value of `ast`. */
const element = (name: string, ast: AST.AST, value: unknown): string => {
  if (value === undefined || value === null) return "";
  if (isPlainObject(value) && resolveNode(ast)._tag === "Objects") {
    return objectElement(name, ast, value);
  }
  if (Array.isArray(value)) {
    const item = arrayItem(ast) ?? ast;
    return value.map((v) => element(name, item, v)).join("");
  }
  return `<${name}>${text(value)}</${name}>`;
};

const objectElement = (name: string, ast: AST.AST, value: Record<string, unknown>): string => {
  const plan = planOf(ast);
  let attrs = "";
  let content = "";
  let children = "";
  for (const m of plan.members) {
    const v = value[m.key];
    if (v === undefined || v === null) continue;
    switch (m.kind) {
      case "attribute":
        attrs += ` ${m.name}="${text(v)}"`;
        break;
      case "text":
        content += text(v);
        break;
      case "flattened":
        for (const item of Array.isArray(v) ? v : [v]) children += element(m.name, m.item!, item);
        break;
      case "wrapped": {
        const itemName = m.itemName ?? m.name;
        const items = (Array.isArray(v) ? v : [v]).map((i) => element(itemName, m.item!, i));
        children += `<${m.name}>${items.join("")}</${m.name}>`;
        break;
      }
      default:
        children += element(m.name, m.type, v);
    }
  }
  if (plan.open) {
    for (const [k, v] of Object.entries(value)) {
      if (plan.known.has(k) || v === undefined || v === null) continue;
      children += `<${k}>${text(v)}</${k}>`;
    }
  }
  return `<${name}${attrs}>${content}${children}</${name}>`;
};

/**
 * The XML request body: the input's body members (everything not bound to
 * the URL or a header) under `root`, or a whole-body list/struct member.
 */
export const encodeXmlBody = (
  root: string,
  inputAst: AST.AST,
  input: Record<string, unknown>,
): string => {
  const payload = getProps(resolveNode(inputAst)).find((p) => hasPropAnn(p, httpBodySymbol));
  let xml: string;
  if (payload !== undefined) {
    const value = input[String(payload.name)];
    const itemName = getPropAnn(payload, xmlItemNameSymbol);
    const item = arrayItem(payload.type);
    xml =
      Array.isArray(value) && item !== undefined
        ? `<${root}>${value
            .map((v) => element(typeof itemName === "string" ? itemName : root, item, v))
            .join("")}</${root}>`
        : element(root, payload.type, value ?? {});
  } else {
    xml = objectElement(root, inputAst, input);
  }
  return `<?xml version="1.0" encoding="utf-8"?>${xml}`;
};

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

const asArray = (value: XmlValue | undefined): XmlValue[] =>
  value === undefined || value === "" ? [] : Array.isArray(value) ? value : [value];

/** The element's text: a bare string, or `#text` next to attributes. */
const textOf = (value: XmlValue | undefined): string | undefined =>
  typeof value === "string"
    ? value
    : isPlainObject(value)
      ? typeof (value as XmlObject)["#text"] === "string"
        ? ((value as XmlObject)["#text"] as string)
        : ""
      : undefined;

/** The children of a wrapped list element (`<Containers><Container/>...`). */
const wrappedItems = (value: XmlValue | undefined, itemName: string | undefined): XmlValue[] => {
  if (value === undefined || typeof value === "string" || Array.isArray(value)) return [];
  const obj = value as XmlObject;
  const key = itemName ?? Object.keys(obj).find((k) => !k.startsWith("@_") && k !== "#text");
  return key === undefined ? [] : asArray(obj[key]);
};

const decodeValue = (ast: AST.AST, value: XmlValue | undefined): unknown => {
  if (value === undefined) return undefined;
  const node = resolveNode(ast);
  switch (node._tag) {
    case "Objects": {
      const obj: XmlObject = isPlainObject(value) ? (value as XmlObject) : {};
      const decoded = decodeObject(node, obj);
      // `<Name>a</Name>` with no attributes parses to a bare string.
      if (typeof value === "string" && value !== "") {
        const t = planOf(node).members.find((m) => m.kind === "text");
        if (t !== undefined) decoded[t.key] = decodeValue(t.type, value);
      }
      return decoded;
    }
    case "Arrays":
      return wrappedItems(value, undefined).map((v) => decodeValue(arrayItem(node)!, v));
    case "Number": {
      const t = textOf(value);
      return t === undefined || t.trim() === "" ? undefined : Number(t);
    }
    case "Boolean": {
      const t = textOf(value)?.trim();
      return t === undefined || t === "" ? undefined : t === "true";
    }
    default:
      return textOf(value) ?? value;
  }
};

const decodeObject = (ast: AST.AST, obj: XmlObject): Record<string, unknown> => {
  const plan = planOf(ast);
  const out: Record<string, unknown> = {};
  const consumed = new Set<string>();
  for (const m of plan.members) {
    switch (m.kind) {
      case "attribute": {
        consumed.add(`@_${m.name}`);
        const v = decodeValue(m.type, obj[`@_${m.name}`]);
        if (v !== undefined) out[m.key] = v;
        break;
      }
      case "text": {
        consumed.add("#text");
        const v = decodeValue(m.type, obj["#text"]);
        if (v !== undefined) out[m.key] = v;
        break;
      }
      case "flattened":
        // No elements means no items.
        consumed.add(m.name);
        out[m.key] = asArray(obj[m.name]).map((v) => decodeValue(m.item!, v));
        break;
      case "wrapped": {
        consumed.add(m.name);
        if (obj[m.name] === undefined) break;
        out[m.key] = wrappedItems(obj[m.name], m.itemName).map((v) => decodeValue(m.item!, v));
        break;
      }
      default: {
        consumed.add(m.name);
        const v = decodeValue(m.type, obj[m.name]);
        if (v !== undefined) out[m.key] = v;
      }
    }
  }
  if (plan.open) {
    for (const [k, v] of Object.entries(obj)) {
      if (consumed.has(k) || k.startsWith("@_") || k === "#text") continue;
      out[k] = textOf(v) ?? v;
    }
  }
  return out;
};

/**
 * Parse an XML response body against the output schema: the document's
 * root element is the output (a struct, or a bare list such as
 * `<QueueMessagesList>`). Throws `XmlParseError` on malformed XML.
 */
export const decodeXmlBody = (outputAst: AST.AST, xml: string): unknown => {
  const doc = parseXmlSync(xml);
  const [rootValue] = Object.values(doc);
  const node = resolveNode(outputAst);
  if (node._tag === "Arrays") return decodeValue(node, rootValue);
  return decodeObject(node, isPlainObject(rootValue) ? (rootValue as XmlObject) : {});
};

/** The output is a struct or list (not a raw string payload), so an XML body maps onto it. */
export const isXmlShaped = (outputAst: AST.AST): boolean => {
  const tag = resolveNode(outputAst)._tag;
  return tag === "Objects" || tag === "Arrays";
};

/** `{ code, message }` of a Storage XML error body (`<Error><Code>...`), if it is one. */
export const parseXmlError = (xml: string): { code?: string; message?: string } | undefined => {
  let doc: XmlObject;
  try {
    doc = parseXmlSync(xml);
  } catch {
    return undefined;
  }
  const error = doc.Error;
  if (!isPlainObject(error)) return undefined;
  const code = textOf((error as XmlObject).Code);
  // Service Bus / Event Hubs: `<Error><Code>404</Code><Detail>...</Detail></Error>`.
  const message = textOf((error as XmlObject).Message) ?? textOf((error as XmlObject).Detail);
  if (code === undefined && message === undefined) return undefined;
  return {
    ...(code ? { code } : {}),
    ...(message !== undefined ? { message: message.trim() } : {}),
  };
};

// ---------------------------------------------------------------------------
// Headers
// ---------------------------------------------------------------------------

interface HeaderMember {
  readonly key: string;
  /** Lowercase header name, or the lowercase prefix of a header map. */
  readonly wire: string;
  readonly prefix: boolean;
  readonly type: "number" | "boolean" | "string";
}

const headerPlans = /*@__PURE__*/ new WeakMap<AST.AST, ReadonlyArray<HeaderMember>>();

const headerMembers = (ast: AST.AST): ReadonlyArray<HeaderMember> => {
  let members = headerPlans.get(ast);
  if (members !== undefined) return members;
  const found: HeaderMember[] = [];
  for (const prop of getProps(resolveNode(ast))) {
    const prefix = getPropAnn(prop, headerPrefixSymbol);
    if (typeof prefix === "string") {
      found.push({
        key: String(prop.name),
        wire: prefix.toLowerCase(),
        prefix: true,
        type: "string",
      });
      continue;
    }
    if (!hasPropAnn(prop, headerSymbol)) continue;
    const tag = resolveNode(prop.type)._tag;
    found.push({
      key: String(prop.name),
      wire: nameOf(prop, headerSymbol).toLowerCase(),
      prefix: false,
      type: tag === "Number" ? "number" : tag === "Boolean" ? "boolean" : "string",
    });
  }
  members = found;
  headerPlans.set(ast, members);
  return members;
};

/** The output members read from response headers: typed scalars and prefix maps. */
export const readStorageHeaders = (
  outputAst: AST.AST,
  headers: Record<string, string | undefined>,
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const m of headerMembers(outputAst)) {
    if (m.prefix) {
      const map: Record<string, string> = {};
      let any = false;
      for (const [name, value] of Object.entries(headers)) {
        if (value === undefined || !name.toLowerCase().startsWith(m.wire)) continue;
        map[name.slice(m.wire.length)] = value;
        any = true;
      }
      if (any) out[m.key] = map;
      continue;
    }
    const raw = headers[m.wire];
    if (raw === undefined) continue;
    if (m.type === "number") {
      const n = raw.trim() === "" ? Number.NaN : Number(raw);
      out[m.key] = Number.isNaN(n) ? raw : n;
    } else if (m.type === "boolean") {
      out[m.key] = raw.trim().toLowerCase() === "true";
    } else {
      out[m.key] = raw;
    }
  }
  return out;
};

/**
 * Split the input's header maps off into headers (`metadata: { a: "1" }` ->
 * `x-ms-meta-a: 1`); returns the input without them.
 */
export const takePrefixHeaders = (
  inputAst: AST.AST,
  input: Record<string, unknown>,
): { readonly input: Record<string, unknown>; readonly headers: Record<string, string> } => {
  const headers: Record<string, string> = {};
  let rest: Record<string, unknown> | undefined;
  for (const prop of getProps(resolveNode(inputAst))) {
    const prefix = getPropAnn(prop, headerPrefixSymbol);
    if (typeof prefix !== "string") continue;
    const key = String(prop.name);
    const value = input[key];
    rest ??= { ...input };
    delete rest[key];
    if (!isPlainObject(value)) continue;
    for (const [k, v] of Object.entries(value)) {
      if (v !== undefined && v !== null) headers[`${prefix}${k}`] = String(v);
    }
  }
  return { input: rest ?? input, headers };
};

/** The input without its XML body members (sent separately by `encodeXmlBody`). */
export const withoutXmlBodyMembers = (
  inputAst: AST.AST,
  input: Record<string, unknown>,
): Record<string, unknown> => {
  const rest = { ...input };
  for (const m of planOf(inputAst).members) delete rest[m.key];
  const payload = getProps(resolveNode(inputAst)).find((p) => hasPropAnn(p, httpBodySymbol));
  if (payload !== undefined) delete rest[String(payload.name)];
  return rest;
};

/** The input sets its whole-body (`T.HttpBody()`) member. */
export const hasPayloadValue = (inputAst: AST.AST, input: unknown): boolean => {
  if (!isPlainObject(input)) return false;
  const payload = getProps(resolveNode(inputAst)).find((p) => hasPropAnn(p, httpBodySymbol));
  return payload !== undefined && input[String(payload.name)] !== undefined;
};

/** The output declares a raw-bytes body (`T.HttpBody()` on a `Uint8Array` output member). */
export const binaryBodyMember = (outputAst: AST.AST): string | undefined => {
  const prop = bodyMemberOf(outputAst);
  return prop !== undefined && resolveNode(prop.type)._tag === "Declaration"
    ? String(prop.name)
    : undefined;
};

/**
 * The output declares a JSON body carried in one member (`T.HttpBody()` on a
 * non-bytes member, e.g. a Cosmos DB document next to its response headers).
 */
export const jsonBodyMember = (outputAst: AST.AST): string | undefined => {
  const prop = bodyMemberOf(outputAst);
  return prop !== undefined && resolveNode(prop.type)._tag !== "Declaration"
    ? String(prop.name)
    : undefined;
};

const bodyMemberOf = (outputAst: AST.AST): AST.PropertySignature | undefined =>
  getProps(resolveNode(outputAst)).find((p) => hasPropAnn(p, httpBodySymbol));

// ---------------------------------------------------------------------------
// SAS URLs
// ---------------------------------------------------------------------------

/**
 * Split a SAS query off an endpoint URL
 * (`https://acct.blob.core.windows.net/?sv=...&sig=...`). Undefined when the URL
 * carries no `sig=` signature, so a plain endpoint keeps bearer auth.
 */
export const splitSas = (
  url: string,
): { readonly base: string; readonly sas: string } | undefined => {
  const q = url.indexOf("?");
  if (q < 0) return undefined;
  const sas = url.slice(q + 1).replace(/^&+|&+$/g, "");
  if (!new URLSearchParams(sas).has("sig")) return undefined;
  return { base: url.slice(0, q), sas };
};
