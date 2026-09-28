/**
 * Descriptor compiler: turns a Smithy model into the minimal runtime data
 * each operation needs (see `../shape.ts`).
 *
 * A member is emitted only when the wire protocol cannot handle it from the
 * JavaScript value alone:
 *
 * - responses: timestamps, blobs, sensitive values; in text formats (XML,
 *   headers) also numbers, booleans, lists, maps and structures
 * - requests: timestamps with a non-default format, string-encoded
 *   booleans, idempotency tokens; maps in form/XML bodies
 * - both: HTTP bindings at the operation root, wire names that break the
 *   protocol's naming rule, XML attributes/flattening/item names
 *
 * Structures that need nothing are pruned. Structures used from several
 * places (or recursively) are hoisted to top-level lazy consts so bundlers
 * keep only what the imported operations reference; the rest are inlined.
 */
import { q, tsKey } from "./naming.ts";

type Shapes = Record<string, any>;
export type Direction = "in" | "out";
type Location = "body" | "header" | "query" | "label";

const S = "smithy.api#";
const NUMERIC = new Set([
  "byte",
  "short",
  "integer",
  "long",
  "float",
  "double",
  "bigInteger",
  "bigDecimal",
  "intEnum",
]);
const PRELUDE_TYPES: Record<string, string> = {
  String: "string",
  Boolean: "boolean",
  PrimitiveBoolean: "boolean",
  Blob: "blob",
  Timestamp: "timestamp",
  Document: "document",
  Unit: "structure",
};

export interface DescriptorProtocol {
  /** Text body format (XML): responses mark numbers, booleans, lists, maps, structures. */
  readonly xml: boolean;
  /** Operation-root members may carry HTTP bindings. */
  readonly rest: boolean;
  /**
   * Request structures list every member in model order: encoders drop keys
   * the model doesn't have, and XML schemas validate element order.
   */
  readonly closedRequests: boolean;
  /** Request maps must be marked (form/XML bodies can't tell a map from a structure). */
  readonly markRequestMaps: boolean;
  /** List item element names (`xmlName` on list members) are honored. */
  readonly listItemNames: boolean;
  /** Default timestamp format of body members. */
  readonly bodyTimestamp: "date-time" | "http-date" | "epoch-seconds";
  /**
   * The wire name of a member and the name the runtime derives by default;
   * a rename is emitted when they differ.
   */
  readonly wireName: (
    member: string,
    traits: Record<string, any>,
    direction: Direction,
  ) => { readonly wire: string; readonly fallback: string };
  /** Namespace of the shape `D` the combinators are imported as. */
  readonly ns?: string;
}

export interface OperationIo {
  readonly input?: string;
  readonly output?: string;
}

/** A compiled operation: descriptor expressions for its input and output. */
export interface CompiledIo {
  readonly input?: string;
  readonly output?: string;
}

export interface DescriptorCompiler {
  /** Compile one operation's root structures (call for every operation first). */
  readonly operation: (io: OperationIo) => { render: () => CompiledIo };
  /** Hoisted shape declarations, once every operation has been compiled. */
  readonly hoisted: () => string[];
}

const hole = (id: string, dir: Direction) => `\u0000${dir}\u0001${id}\u0000`;
const HOLE = /\u0000(in|out)\u0001([^\u0000]+)\u0000/g;

export const makeDescriptorCompiler = (
  shapes: Shapes,
  protocol: DescriptorProtocol,
): DescriptorCompiler => {
  const D = protocol.ns ?? "D";

  const shape = (target: string): any => {
    if (target.startsWith(S)) {
      const local = target.slice(S.length);
      return { type: PRELUDE_TYPES[local] ?? "integer", members: {} };
    }
    return shapes[target] ?? { type: "string" };
  };
  const typeOf = (target: string): string => shape(target).type;
  const isStructLike = (target: string) => {
    const t = typeOf(target);
    return t === "structure" || t === "union";
  };
  const isEventStream = (target: string) =>
    typeOf(target) === "union" &&
    shape(target).traits?.[`${S}streaming`] !== undefined;

  // ---------------------------------------------------------------------
  // Which structures need a descriptor (fixpoint over recursive shapes)
  // ---------------------------------------------------------------------
  const needs = new Map<string, boolean>();
  const key = (id: string, dir: Direction) => `${dir}|${id}`;
  const alwaysStruct = (dir: Direction) =>
    dir === "in" && protocol.closedRequests;
  const structNeeded = (id: string, dir: Direction): boolean =>
    alwaysStruct(dir) || needs.get(key(id, dir)) === true;

  // ---------------------------------------------------------------------
  // Expressions
  // ---------------------------------------------------------------------

  const timestampExpr = (
    traits: Record<string, any>,
    dir: Direction,
    location: Location,
  ): string | undefined => {
    if (dir === "out") return `${D}.ts`;
    // Headers default to http-date; body, query and label members use the
    // protocol's body format (epoch-seconds for JSON protocols).
    const format =
      (traits[`${S}timestampFormat`] as string | undefined) ??
      (location === "header" ? "http-date" : protocol.bodyTimestamp);
    // The runtime's own default for this location; emit only a difference.
    const runtimeDefault =
      location === "header"
        ? "http-date"
        : location === "body"
          ? protocol.bodyTimestamp
          : "date-time";
    return format !== runtimeDefault ? `${D}.tsAs(${q(format)})` : undefined;
  };

  /** Expression for a value of `target` (undefined: no data needed). */
  const valueExpr = (
    target: string,
    memberTraits: Record<string, any>,
    dir: Direction,
    location: Location,
    payload: boolean,
  ): string | undefined => {
    const def = shape(target);
    const type = def.type as string;
    const traits = { ...(def.traits ?? {}), ...memberTraits };
    const sensitive = traits[`${S}sensitive`] !== undefined;
    const text = protocol.xml || location !== "body";

    switch (type) {
      case "timestamp":
        return timestampExpr(traits, dir, location);
      case "blob":
        // Payload blobs targeting a named shape travel as streams (the
        // generated type is a stream); prelude `smithy.api#Blob` payloads
        // are raw bytes (Uint8Array).
        if (
          traits[`${S}streaming`] !== undefined ||
          (payload && !target.startsWith(S))
        ) {
          return `${D}.stream`;
        }
        if (dir === "out") return sensitive ? `${D}.secretBlob` : `${D}.blob`;
        // A non-streaming payload blob is sent as raw bytes (not base64 JSON)
        return payload ? `${D}.blob` : undefined;
      case "string":
      case "enum":
        if (payload) return `${D}.text`;
        return dir === "out" && sensitive ? `${D}.secret` : undefined;
      case "boolean":
        if (dir === "in" && "distilled.protocols#stringEncoded" in traits) {
          return `${D}.str`;
        }
        return dir === "out" && text ? `${D}.bool` : undefined;
      case "document":
        return undefined;
      case "list":
      case "set": {
        const member = def.member;
        const el = valueExpr(
          member.target,
          member.traits ?? {},
          dir,
          location === "header" ? "header" : "body",
          false,
        );
        const item = protocol.listItemNames
          ? (member.traits?.[`${S}xmlName`] as string | undefined)
          : undefined;
        const flat = protocol.xml && `${S}xmlFlattened` in memberTraits;
        const opts = [
          ...(item !== undefined ? [`item: ${q(item)}`] : []),
          ...(flat ? ["flat: true"] : []),
        ];
        if (el === undefined && opts.length === 0 && !(dir === "out" && text)) {
          return undefined;
        }
        const args = [
          el ?? "0",
          ...(opts.length ? [`{ ${opts.join(", ")} }`] : []),
        ];
        return args.length === 1 && args[0] === "0"
          ? `${D}.list()`
          : `${D}.list(${args.join(", ")})`;
      }
      case "map": {
        const v = valueExpr(
          def.value.target,
          def.value.traits ?? {},
          dir,
          "body",
          false,
        );
        const mark = protocol.xml || (dir === "in" && protocol.markRequestMaps);
        if (v === undefined && !mark) return undefined;
        const opts: string[] = [];
        if (mark) {
          const k = def.key.traits?.[`${S}xmlName`];
          const vn = def.value.traits?.[`${S}xmlName`];
          if (k) opts.push(`key: ${q(k)}`);
          if (vn) opts.push(`value: ${q(vn)}`);
          if (`${S}xmlFlattened` in memberTraits) opts.push("flat: true");
        }
        const args = [
          v ?? "0",
          ...(opts.length ? [`{ ${opts.join(", ")} }`] : []),
        ];
        return args.length === 1 && args[0] === "0"
          ? `${D}.map()`
          : `${D}.map(${args.join(", ")})`;
      }
      case "structure":
      case "union":
        if (isEventStream(target)) return eventsExpr(target, dir);
        if (structNeeded(target, dir)) return hole(target, dir);
        // XML: mark the structure so an empty element decodes to `{}`
        return dir === "out" && protocol.xml ? "{}" : undefined;
      default:
        // numbers
        if (NUMERIC.has(type)) {
          return dir === "out" && text ? `${D}.num` : undefined;
        }
        return undefined;
    }
  };

  const eventsExpr = (target: string, dir: Direction): string => {
    const def = shape(target);
    const events: string[] = [];
    const payloads: string[] = [];
    for (const [name, m] of Object.entries<any>(def.members ?? {})) {
      const ev =
        isStructLike(m.target) && structNeeded(m.target, dir)
          ? hole(m.target, dir)
          : undefined;
      events.push(`${tsKey(name)}: ${ev ?? "0"}`);
      for (const [pm, pmDef] of Object.entries<any>(
        shape(m.target).members ?? {},
      )) {
        if (pmDef.traits?.[`${S}eventPayload`] !== undefined) {
          payloads.push(`${tsKey(name)}: ${q(pm)}`);
        }
      }
    }
    return `${D}.events({ ${events.join(", ")} }${
      payloads.length ? `, { ${payloads.join(", ")} }` : ""
    })`;
  };

  /** Expression for one member of a structure. */
  const memberExpr = (
    name: string,
    member: any,
    dir: Direction,
    root: boolean,
  ): string | undefined => {
    const traits: Record<string, any> = member.traits ?? {};
    const fields: string[] = [];
    let location: Location = "body";
    let payload = false;

    if (root && protocol.rest) {
      if (`${S}httpLabel` in traits) location = "label";
      else if (`${S}httpHeader` in traits) {
        location = "header";
        fields.push(`header: ${q(traits[`${S}httpHeader`])}`);
      } else if (`${S}httpQuery` in traits) {
        location = "query";
        fields.push(`query: ${q(traits[`${S}httpQuery`])}`);
      } else if (`${S}httpPrefixHeaders` in traits) {
        location = "header";
        fields.push(`prefix: ${q(traits[`${S}httpPrefixHeaders`])}`);
      } else if (`${S}httpQueryParams` in traits) {
        location = "query";
        fields.push("queryParams: true");
      } else if (`${S}httpResponseCode` in traits) {
        fields.push("status: true");
      } else if (`${S}httpPayload` in traits) {
        payload = true;
        fields.push("payload: true");
      }
    }
    if (root && dir === "in") {
      const context = traits["smithy.rules#contextParam"]?.name;
      if (context !== undefined) fields.push(`context: ${q(context)}`);
      if (`${S}idempotencyToken` in traits) fields.push("idempotency: true");
    }

    const bound =
      location !== "body" || fields.some((f) => f.startsWith("status"));
    const value = fields.some(
      (f) =>
        f.startsWith("prefix") ||
        f.startsWith("queryParams") ||
        f.startsWith("status"),
    )
      ? undefined
      : valueExpr(member.target, traits, dir, location, payload);

    // Wire names apply to body members (and to the payload root element).
    if (!bound) {
      const { wire, fallback } = protocol.wireName(name, traits, dir);
      if (payload && protocol.xml && dir === "in") {
        // XML payload root: member xmlName, else target xmlName, else target name
        const root =
          traits[`${S}xmlName`] ??
          shape(member.target).traits?.[`${S}xmlName`] ??
          member.target.split("#")[1];
        fields.push(`wire: ${q(root)}`);
      } else if (wire !== fallback) {
        fields.push(`wire: ${q(wire)}`);
      }
      if (protocol.xml && `${S}xmlAttribute` in traits)
        fields.push("attr: true");
    }
    if (
      payload &&
      shape(member.target).traits?.[`${S}requiresLength`] !== undefined
    ) {
      fields.push("requiresLength: true");
    }

    if (fields.length === 0) return value;
    if (value !== undefined) fields.push(`shape: ${value}`);
    return `${D}.m({ ${fields.join(", ")} })`;
  };

  /** Structure body (members only), with holes for nested structures. */
  const structBody = (
    id: string,
    dir: Direction,
    root: boolean,
  ): string | undefined => {
    const def = shape(id);
    const parts: string[] = [];
    let any = false;
    if (protocol.closedRequests && dir === "in") {
      const ns = def.traits?.[`${S}xmlNamespace`];
      if (ns !== undefined) {
        parts.push(`"@xmlns": ${q(ns.uri)}`);
        if (ns.prefix) parts.push(`"@xmlnsPrefix": ${q(ns.prefix)}`);
      }
    }
    for (const [name, member] of Object.entries<any>(def.members ?? {})) {
      const expr = memberExpr(name, member, dir, root);
      if (expr !== undefined) {
        parts.push(`${tsKey(name)}: ${expr}`);
        any = true;
      } else if (protocol.closedRequests && dir === "in") {
        // Closed structure: list plain members too
        parts.push(`${tsKey(name)}: 0`);
      }
    }
    if (!any && !alwaysStruct(dir)) return undefined;
    return `{ ${parts.join(", ")} }`;
  };

  // Fixpoint: a structure needs a descriptor when any member does.
  const structs = Object.entries(shapes)
    .filter(([, d]) => d?.type === "structure" || d?.type === "union")
    .map(([id]) => id);
  for (let pass = 0; pass < 50; pass++) {
    let changed = false;
    for (const id of structs) {
      for (const dir of ["in", "out"] as const) {
        if (alwaysStruct(dir)) continue;
        const n = structBody(id, dir, false) !== undefined;
        if (n !== (needs.get(key(id, dir)) === true)) {
          needs.set(key(id, dir), n);
          changed = true;
        }
      }
    }
    if (!changed) break;
  }

  // ---------------------------------------------------------------------
  // Rendering: inline single-use structures, hoist shared/recursive ones
  // ---------------------------------------------------------------------
  const bodies = new Map<string, string>();
  const refs = new Map<string, number>();
  const bodyOf = (id: string, dir: Direction): string => {
    const k = key(id, dir);
    let body = bodies.get(k);
    if (body === undefined) {
      bodies.set(k, "{}"); // recursion guard
      body = structBody(id, dir, false) ?? "{}";
      bodies.set(k, body);
      for (const m of body.matchAll(HOLE)) {
        const rk = key(m[2]!, m[1] as Direction);
        refs.set(rk, (refs.get(rk) ?? 0) + 1);
        bodyOf(m[2]!, m[1] as Direction);
      }
    }
    return body;
  };
  const countRefs = (expr: string | undefined) => {
    if (expr === undefined) return;
    for (const m of expr.matchAll(HOLE)) {
      const rk = key(m[2]!, m[1] as Direction);
      refs.set(rk, (refs.get(rk) ?? 0) + 1);
      bodyOf(m[2]!, m[1] as Direction);
    }
  };

  const hoisted = new Set<string>();
  const ident = (k: string) => {
    const [dir, id] = [k.slice(0, k.indexOf("|")), k.slice(k.indexOf("|") + 1)];
    return `${dir === "in" ? "i" : "o"}_${id.split("#")[1]}`;
  };

  const render = (expr: string, stack: string[] = []): string =>
    expr.replace(HOLE, (_, dir: Direction, id: string) => {
      const k = key(id, dir);
      if (hoisted.has(k)) return ident(k);
      if ((refs.get(k) ?? 0) > 1 || stack.includes(k)) {
        hoisted.add(k);
        return ident(k);
      }
      return render(bodyOf(id, dir), [...stack, k]);
    });

  return {
    operation: (io) => {
      const input =
        io.input !== undefined ? structBody(io.input, "in", true) : undefined;
      const output =
        io.output !== undefined
          ? structBody(io.output, "out", true)
          : undefined;
      countRefs(input);
      countRefs(output);
      return {
        render: () => ({
          input: input !== undefined ? render(input) : undefined,
          output: output !== undefined ? render(output) : undefined,
        }),
      };
    },
    hoisted: () => {
      const out: string[] = [];
      const done = new Set<string>();
      // Rendering a hoisted body can hoist more shapes; iterate to a fixpoint.
      for (;;) {
        const pending = [...hoisted].filter((k) => !done.has(k)).sort();
        if (pending.length === 0) break;
        for (const k of pending) {
          done.add(k);
          const [dir, id] = [
            k.slice(0, k.indexOf("|")) as Direction,
            k.slice(k.indexOf("|") + 1),
          ];
          out.push(
            `const ${ident(k)}: ${D}.LazyStruct = () => (${render(bodyOf(id, dir), [k])});`,
          );
        }
      }
      return out;
    },
  };
};
