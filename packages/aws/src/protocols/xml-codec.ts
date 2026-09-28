/**
 * XML body codec for restXml, awsQuery and ec2Query, driven by the
 * operation descriptor.
 *
 * Decoding: a text format cannot say whether `<Size>3</Size>` is a number or
 * whether `<Tags><Tag/></Tags>` is a one-item list, so descriptors mark
 * lists, maps, structures, numbers, booleans, timestamps and blobs. Elements
 * the descriptor does not mention are strings (or all-string structures)
 * and pass through, renamed by the service's naming rule.
 */
import {
  decodeLeaf,
  formatTimestamp,
  isStruct,
  ListShape,
  MapShape,
  membersOf,
  resolve,
  shapeOf,
  specOf,
  timestampFormatOf,
  toBase64,
  unwrapRedacted,
  type Shape,
  type Struct,
} from "@distilled.cloud/core/shape";
import { escapeXml } from "@distilled.cloud/core/xml";

/** Member name ↔ element name rule of a service. */
export interface XmlNaming {
  /** Default element name of a member. */
  readonly wire: (member: string) => string;
  /** Default member name of an unmodeled element. */
  readonly member: (element: string) => string;
  /** An empty list element decodes to `[]` (query protocols) or is absent (restXml). */
  readonly emptyListAsArray: boolean;
}

export const identityNaming: XmlNaming = {
  wire: (m) => m,
  member: (e) => e,
  emptyListAsArray: false,
};

export const queryNaming: XmlNaming = {
  ...identityNaming,
  emptyListAsArray: true,
};

/** ec2Query responses use lowerCamel element names. */
export const ec2Naming: XmlNaming = {
  wire: (m) => m.charAt(0).toLowerCase() + m.slice(1),
  member: (e) => e.charAt(0).toUpperCase() + e.slice(1),
  emptyListAsArray: true,
};

// =============================================================================
// Decoding
// =============================================================================

const isAttrKey = (k: string) => k.startsWith("@_");

/** Unmodeled content: strings stay strings, elements keep their text. */
const passthrough = (value: unknown, naming: XmlNaming): unknown => {
  if (typeof value !== "object" || value === null) return value;
  if (Array.isArray(value)) return value.map((v) => passthrough(v, naming));
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).filter((k) => !isAttrKey(k));
  if (keys.length === 1 && keys[0] === "#text") return obj["#text"];
  const out: Record<string, unknown> = {};
  for (const k of keys) {
    if (k === "#text") continue;
    out[naming.member(k)] = passthrough(obj[k], naming);
  }
  return out;
};

/** The items of a (possibly wrapped) XML list value. */
const listItems = (value: unknown, flat: boolean): unknown[] => {
  if (value === "" || value === null || value === undefined) return [];
  if (flat) return Array.isArray(value) ? value : [value];
  if (Array.isArray(value)) return value;
  if (typeof value !== "object") return [value];
  // Wrapped: <Wrapper><item/>…</Wrapper> — the wrapper holds one item name
  const keys = Object.keys(value as object).filter(
    (k) => !isAttrKey(k) && k !== "#text",
  );
  if (keys.length === 0) return [];
  const inner = (value as Record<string, unknown>)[keys[0]!];
  return Array.isArray(inner) ? inner : [inner];
};

export const decodeXmlValue = (
  value: unknown,
  shape: Shape | undefined,
  naming: XmlNaming,
): unknown => {
  const s = resolve(shape);
  if (s === undefined) return passthrough(value, naming);
  if (typeof s === "string") {
    const text = passthrough(value, naming);
    if (text === "" && s !== "text" && s !== "secret") return undefined;
    return decodeLeaf(s, text);
  }
  if (s instanceof ListShape) {
    const items = listItems(value, s.flat);
    if (items.length === 0 && !naming.emptyListAsArray) return undefined;
    const out: unknown[] = [];
    for (const item of items) {
      if (item === undefined || item === null) continue;
      const decoded = decodeXmlValue(item, s.element, naming);
      if (decoded !== undefined) out.push(decoded);
    }
    return out;
  }
  if (s instanceof MapShape) {
    const out: Record<string, unknown> = {};
    if (typeof value !== "object" || value === null) return undefined;
    const entries = s.flat
      ? value
      : ((value as Record<string, unknown>).entry ??
        (value as Record<string, unknown>).Entry);
    if (entries === undefined || entries === null) return undefined;
    const keyName = s.keyName ?? "key";
    const valueName = s.valueName ?? "value";
    for (const entry of Array.isArray(entries) ? entries : [entries]) {
      if (!entry || typeof entry !== "object") continue;
      const e = entry as Record<string, unknown>;
      const k = passthrough(e[keyName], naming);
      if (typeof k !== "string") continue;
      const v = e[valueName];
      out[k] =
        v === undefined || v === null || v === ""
          ? ""
          : (decodeXmlValue(v, s.value, naming) ?? "");
    }
    return out;
  }
  if (isStruct(s)) {
    // An empty element is a present, empty structure
    if (typeof value !== "object" || value === null) return {};
    return decodeXmlStruct(value as Record<string, unknown>, s, naming);
  }
  return passthrough(value, naming);
};

/** Decode an element's children into a structure. */
export const decodeXmlStruct = (
  value: Record<string, unknown>,
  struct: Struct | undefined,
  naming: XmlNaming,
  skipBound = false,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const consumed = new Set<string>();
  if (struct !== undefined) {
    for (const [name, member] of membersOf(struct)) {
      const spec = specOf(member);
      if (
        skipBound &&
        spec !== undefined &&
        (spec.header !== undefined ||
          spec.query !== undefined ||
          spec.prefix !== undefined ||
          spec.status === true ||
          spec.queryParams === true ||
          spec.payload === true)
      ) {
        consumed.add(naming.wire(name));
        continue;
      }
      const wire = spec?.wire ?? naming.wire(name);
      let key = spec?.attr ? `@_${wire}` : wire;
      // Some services (EC2) are inconsistent about element casing: fall
      // back to the member name itself.
      if (!(key in value) && !spec?.attr) {
        const alt = [name, naming.wire(wire)].find((k) => k in value);
        if (alt !== undefined) key = alt;
      }
      consumed.add(key);
      if (!(key in value)) continue;
      const decoded = decodeXmlValue(value[key], shapeOf(member), naming);
      if (decoded !== undefined) result[name] = decoded;
    }
  }
  for (const key in value) {
    if (consumed.has(key) || isAttrKey(key) || key === "#text") continue;
    const name = naming.member(key);
    if (name in result) continue;
    result[name] = passthrough(value[key], naming);
  }
  return result;
};

/** The single root element of a parsed document. */
export const xmlRoot = (
  parsed: Record<string, unknown>,
): { name: string | undefined; content: unknown } => {
  for (const name in parsed) {
    if (name.startsWith("?")) continue;
    return { name, content: parsed[name] };
  }
  return { name: undefined, content: undefined };
};

// =============================================================================
// Encoding (restXml bodies)
// =============================================================================

const nsAttr = (struct: Struct | undefined, inherited?: string): string => {
  const uri = (struct?.["@xmlns"] as string | undefined) ?? inherited;
  if (uri === undefined) return "";
  const prefix = struct?.["@xmlnsPrefix"] as string | undefined;
  return prefix
    ? ` xmlns:${prefix}="${escapeXml(uri)}"`
    : ` xmlns="${escapeXml(uri)}"`;
};

const scalarText = (value: unknown, shape: Shape | undefined): string => {
  const v = unwrapRedacted(value);
  if (v instanceof Date) {
    return String(formatTimestamp(v, timestampFormatOf(shape) ?? "date-time"));
  }
  if (v instanceof Uint8Array) return toBase64(v);
  return escapeXml(String(v));
};

/** Serialize one value as `<tag>…</tag>`. */
export const encodeXmlElement = (
  value: unknown,
  shape: Shape | undefined,
  tag: string,
  xmlns?: string,
): string => {
  const v = unwrapRedacted(value);
  if (v === null || v === undefined) return "";
  const s = resolve(shape);
  if (typeof v !== "object" || v instanceof Date || v instanceof Uint8Array) {
    const ns = xmlns ? ` xmlns="${escapeXml(xmlns)}"` : "";
    return `<${tag}${ns}>${scalarText(v, s)}</${tag}>`;
  }
  if (Array.isArray(v)) {
    const list = s instanceof ListShape ? s : undefined;
    const items = v
      .map((item) =>
        encodeXmlElement(item, list?.element, list?.item ?? "member"),
      )
      .join("");
    return `<${tag}>${items}</${tag}>`;
  }
  if (s instanceof MapShape) {
    const keyName = s.keyName ?? "key";
    const valueName = s.valueName ?? "value";
    const entries = Object.entries(v as Record<string, unknown>)
      .filter(([, item]) => item !== undefined)
      .map(
        ([k, item]) =>
          `<entry><${keyName}>${escapeXml(k)}</${keyName}>${encodeXmlElement(item, s.value, valueName)}</entry>`,
      )
      .join("");
    return `<${tag}>${entries}</${tag}>`;
  }
  const struct = isStruct(s) ? s : undefined;
  const { attrs, children } = encodeXmlMembers(
    v as Record<string, unknown>,
    struct,
  );
  return `<${tag}${nsAttr(struct, xmlns)}${attrs}>${children}</${tag}>`;
};

/**
 * Serialize a structure's members in model order (XML schemas validate
 * element order); keys the model doesn't have are dropped.
 */
export const encodeXmlMembers = (
  value: Record<string, unknown>,
  struct: Struct | undefined,
): { attrs: string; children: string } => {
  let attrs = "";
  let children = "";
  const one = (name: string, member: unknown) => {
    const item = value[name];
    if (item === undefined || item === null) return;
    const spec = specOf(member as never);
    const shape = shapeOf(member as never);
    const wire = spec?.wire ?? name;
    if (spec?.attr) {
      attrs += ` ${wire}="${scalarText(item, shape)}"`;
      return;
    }
    const list = resolve(shape);
    if (Array.isArray(item) && list instanceof ListShape && list.flat) {
      for (const el of item)
        children += encodeXmlElement(el, list.element, wire);
      return;
    }
    children += encodeXmlElement(item, shape, wire);
  };
  if (struct !== undefined) {
    // Closed structure: model order, unmodeled keys dropped
    for (const [name, member] of membersOf(struct)) one(name, member);
  } else {
    for (const name in value) one(name, undefined);
  }
  return { attrs, children };
};
