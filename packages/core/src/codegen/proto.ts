/**
 * Proto3 → Smithy 2.0 JSON converter (dev-time only, provider-agnostic).
 *
 * Turns one or more `.proto` files (a package of messages, enums, and gRPC
 * services) into the same Smithy JSON model shape the other spec converters
 * produce (`{ smithy: "2.0", metadata, shapes }`), so a proto-sourced
 * provider flows through the shared `generateService` compiler.
 *
 * Mapping (proto3 JSON encoding on the wire):
 *
 *   • each selected unary `rpc` → a Smithy operation, `POST /<package>.<Service>/<Method>`
 *   • request/response messages → structures; members are camelCase (proto3 JSON)
 *   • `repeated` → list, `map<k,v>` → map (JSON object keys are strings)
 *   • `oneof` fields flatten onto the parent (proto3 JSON is untagged)
 *   • enums → string enums (proto3 JSON emits the name)
 *   • 64-bit integers → `smithy.api#String` (proto3 JSON encodes them as strings)
 *   • `bytes` → `smithy.api#Blob` (base64 on the JSON wire)
 *   • `google.protobuf.Empty` I/O → `smithy.api#Unit`
 *   • streaming RPCs are skipped by default (they are not request/response POSTs)
 *
 * The converter does not speak binary protobuf. Generated SDKs send proto3
 * JSON at the gRPC method path — Connect-JSON / grpc-JSON transcoding shape.
 */

import { SENSITIVE_FIELD_PATTERNS } from "./openapi.ts";

// ============================================================================
// Prelude
// ============================================================================

export const PRELUDE = {
  String: "smithy.api#String",
  Boolean: "smithy.api#Boolean",
  Integer: "smithy.api#Integer",
  Long: "smithy.api#Long",
  Float: "smithy.api#Float",
  Double: "smithy.api#Double",
  Timestamp: "smithy.api#Timestamp",
  Blob: "smithy.api#Blob",
  Document: "smithy.api#Document",
  Unit: "smithy.api#Unit",
} as const;

const SCALAR_TARGETS: Record<string, string> = {
  double: PRELUDE.Double,
  float: PRELUDE.Float,
  int32: PRELUDE.Integer,
  int64: PRELUDE.String,
  uint32: PRELUDE.Integer,
  uint64: PRELUDE.String,
  sint32: PRELUDE.Integer,
  sint64: PRELUDE.String,
  fixed32: PRELUDE.Integer,
  fixed64: PRELUDE.String,
  sfixed32: PRELUDE.Integer,
  sfixed64: PRELUDE.String,
  bool: PRELUDE.Boolean,
  string: PRELUDE.String,
  bytes: PRELUDE.Blob,
};

const WKT_TARGETS: Record<string, string> = {
  "google.protobuf.Timestamp": PRELUDE.Timestamp,
  "google.protobuf.Duration": PRELUDE.String,
  "google.protobuf.Any": PRELUDE.Document,
  "google.protobuf.Struct": PRELUDE.Document,
  "google.protobuf.Value": PRELUDE.Document,
  "google.protobuf.ListValue": PRELUDE.Document,
  "google.protobuf.BoolValue": PRELUDE.Boolean,
  "google.protobuf.StringValue": PRELUDE.String,
  "google.protobuf.BytesValue": PRELUDE.Blob,
  "google.protobuf.Int32Value": PRELUDE.Integer,
  "google.protobuf.UInt32Value": PRELUDE.Integer,
  "google.protobuf.Int64Value": PRELUDE.String,
  "google.protobuf.UInt64Value": PRELUDE.String,
  "google.protobuf.FloatValue": PRELUDE.Float,
  "google.protobuf.DoubleValue": PRELUDE.Double,
  "google.protobuf.FieldMask": PRELUDE.String,
  "google.protobuf.Empty": PRELUDE.Unit,
};

// ============================================================================
// AST
// ============================================================================

export interface ProtoField {
  readonly name: string;
  readonly type: string;
  readonly repeated: boolean;
  readonly optional: boolean;
  readonly mapKey?: string;
  readonly mapValue?: string;
  readonly jsonName?: string;
  readonly deprecated: boolean;
  readonly documentation?: string;
}

export interface ProtoEnumValue {
  readonly name: string;
  readonly number: number;
  readonly deprecated: boolean;
  readonly documentation?: string;
}

export interface ProtoEnum {
  readonly name: string;
  readonly fullName: string;
  readonly values: ProtoEnumValue[];
  readonly documentation?: string;
}

export interface ProtoMessage {
  readonly name: string;
  readonly fullName: string;
  readonly fields: ProtoField[];
  readonly messages: ProtoMessage[];
  readonly enums: ProtoEnum[];
  readonly documentation?: string;
}

export interface ProtoRpc {
  readonly name: string;
  readonly requestType: string;
  readonly responseType: string;
  readonly requestStream: boolean;
  readonly responseStream: boolean;
  readonly deprecated: boolean;
  readonly documentation?: string;
}

export interface ProtoService {
  readonly name: string;
  readonly fullName: string;
  readonly rpcs: ProtoRpc[];
  readonly documentation?: string;
}

export interface ProtoFile {
  readonly filename: string;
  readonly package: string;
  readonly syntax: string;
  readonly imports: string[];
  readonly messages: ProtoMessage[];
  readonly enums: ProtoEnum[];
  readonly services: ProtoService[];
}

export interface ProtoConvertOptions {
  readonly files: readonly ProtoFile[];
  readonly namespace: string;
  readonly serviceName: string;
  readonly serviceTitle?: string;
  readonly serviceDocumentation?: string;
  readonly serviceVersion?: string;
  /** Fully-qualified proto service (`modal.client.ModalClient`). */
  readonly protoService: string;
  /** Keep only these RPC names. Default: every unary RPC. */
  readonly rpcNames?: ReadonlySet<string>;
  readonly skipStreaming?: boolean;
  readonly skipDeprecated?: boolean;
}

export interface ProtoConvertResult {
  readonly model: {
    smithy: "2.0";
    metadata: Record<string, unknown>;
    shapes: Record<string, any>;
  };
  readonly converted: number;
  readonly skippedStreaming: number;
  readonly skippedDeprecated: number;
  readonly shapeCount: number;
}

// ============================================================================
// Lexer / parser
// ============================================================================

class ProtoParseError extends Error {
  constructor(filename: string, line: number, col: number, message: string) {
    super(`${filename}:${line}:${col}: ${message}`);
    this.name = "ProtoParseError";
  }
}

class Parser {
  readonly filename: string;
  readonly src: string;
  i = 0;
  line = 1;
  col = 1;
  lastComment = "";

  constructor(src: string, filename: string) {
    this.src = src;
    this.filename = filename;
  }

  fail(message: string): never {
    throw new ProtoParseError(this.filename, this.line, this.col, message);
  }

  peekChar(): string {
    return this.src[this.i] ?? "";
  }

  bump(): string {
    const ch = this.src[this.i] ?? "";
    this.i++;
    if (ch === "\n") {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }
    return ch;
  }

  skipTrivia(): void {
    const comments: string[] = [];
    while (this.i < this.src.length) {
      const ch = this.peekChar();
      if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") {
        this.bump();
        continue;
      }
      if (ch === "/" && this.src[this.i + 1] === "/") {
        this.bump();
        this.bump();
        let text = "";
        while (this.i < this.src.length && this.peekChar() !== "\n") {
          text += this.bump();
        }
        comments.push(text.trim());
        continue;
      }
      if (ch === "/" && this.src[this.i + 1] === "*") {
        this.bump();
        this.bump();
        let text = "";
        while (this.i < this.src.length) {
          if (this.peekChar() === "*" && this.src[this.i + 1] === "/") {
            this.bump();
            this.bump();
            break;
          }
          text += this.bump();
        }
        for (const line of text.split("\n")) {
          const t = line.replace(/^\s*\*?\s?/, "").trim();
          if (t) comments.push(t);
        }
        continue;
      }
      break;
    }
    if (comments.length > 0) this.lastComment = comments.join(" ");
  }

  takeDoc(): string | undefined {
    const d = this.lastComment.trim();
    this.lastComment = "";
    return d || undefined;
  }

  peekIdent(): boolean {
    this.skipTrivia();
    const ch = this.peekChar();
    return /[A-Za-z_]/.test(ch);
  }

  ident(): string {
    this.skipTrivia();
    const ch = this.peekChar();
    if (!/[A-Za-z_]/.test(ch))
      this.fail(`expected identifier, got ${JSON.stringify(ch)}`);
    let out = this.bump();
    while (/[A-Za-z0-9_]/.test(this.peekChar())) out += this.bump();
    return out;
  }

  tryIdent(want: string): boolean {
    this.skipTrivia();
    const start = this.i;
    const line = this.line;
    const col = this.col;
    const comment = this.lastComment;
    if (!this.peekIdent()) return false;
    const got = this.ident();
    if (got === want) return true;
    this.i = start;
    this.line = line;
    this.col = col;
    this.lastComment = comment;
    return false;
  }

  dotted(): string {
    let name = this.ident();
    while (this.tryChar(".")) name += `.${this.ident()}`;
    return name;
  }

  tryChar(ch: string): boolean {
    this.skipTrivia();
    if (this.peekChar() === ch) {
      this.bump();
      return true;
    }
    return false;
  }

  expect(ch: string): void {
    this.skipTrivia();
    if (this.peekChar() !== ch) {
      this.fail(
        `expected ${JSON.stringify(ch)}, got ${JSON.stringify(this.peekChar())}`,
      );
    }
    this.bump();
  }

  stringLit(): string {
    this.skipTrivia();
    const q = this.peekChar();
    if (q !== '"' && q !== "'") this.fail("expected string literal");
    this.bump();
    let out = "";
    while (this.i < this.src.length && this.peekChar() !== q) {
      const ch = this.bump();
      if (ch === "\\" && this.i < this.src.length) {
        const n = this.bump();
        const esc: Record<string, string> = {
          n: "\n",
          t: "\t",
          r: "\r",
          '"': '"',
          "'": "'",
          "\\": "\\",
        };
        out += esc[n] ?? n;
      } else {
        out += ch;
      }
    }
    if (this.peekChar() !== q) this.fail("unterminated string");
    this.bump();
    return out;
  }

  number(): number {
    this.skipTrivia();
    let s = "";
    if (this.peekChar() === "-") s += this.bump();
    if (!/[0-9]/.test(this.peekChar())) this.fail("expected number");
    while (/[0-9]/.test(this.peekChar())) s += this.bump();
    return Number(s);
  }

  skipUntil(ch: string): void {
    this.skipTrivia();
    while (this.i < this.src.length && this.peekChar() !== ch) {
      if (this.peekChar() === '"' || this.peekChar() === "'") this.stringLit();
      else if (this.peekChar() === "{") {
        this.bump();
        this.skipUntil("}");
        this.expect("}");
      } else {
        this.bump();
      }
    }
  }

  parseOptions(): { jsonName?: string; deprecated: boolean } {
    let jsonName: string | undefined;
    let deprecated = false;
    if (!this.tryChar("[")) return { deprecated };
    while (true) {
      this.skipTrivia();
      if (this.peekChar() === "]") break;
      const key = this.tryChar("(") ? `(${this.dotted()})` : this.dotted();
      this.expect("=");
      this.skipTrivia();
      let value: unknown;
      if (this.peekChar() === '"' || this.peekChar() === "'")
        value = this.stringLit();
      else if (this.tryIdent("true")) value = true;
      else if (this.tryIdent("false")) value = false;
      else if (/[0-9-]/.test(this.peekChar())) value = this.number();
      else value = this.ident();
      if (key === "json_name" && typeof value === "string") jsonName = value;
      if (key === "deprecated" && value === true) deprecated = true;
      this.tryChar(",");
    }
    this.expect("]");
    return { jsonName, deprecated };
  }

  parseField(): ProtoField {
    const documentation = this.takeDoc();
    let repeated = false;
    let optional = false;
    if (this.tryIdent("repeated")) repeated = true;
    else if (this.tryIdent("optional")) optional = true;
    let mapKey: string | undefined;
    let mapValue: string | undefined;
    let type: string;
    if (this.tryIdent("map")) {
      this.expect("<");
      mapKey = this.dotted();
      this.expect(",");
      mapValue = this.dotted();
      this.expect(">");
      type = `map<${mapKey},${mapValue}>`;
    } else {
      type = this.dotted();
    }
    const name = this.ident();
    this.expect("=");
    this.number();
    const opts = this.parseOptions();
    this.expect(";");
    return {
      name,
      type,
      repeated,
      optional,
      mapKey,
      mapValue,
      jsonName: opts.jsonName,
      deprecated: opts.deprecated,
      documentation,
    };
  }

  parseEnum(pkg: string, prefix: string): ProtoEnum {
    const documentation = this.takeDoc();
    const name = this.ident();
    const fullName = prefix ? `${prefix}.${name}` : `${pkg}.${name}`;
    this.expect("{");
    const values: ProtoEnumValue[] = [];
    while (true) {
      this.skipTrivia();
      if (this.peekChar() === "}") break;
      if (this.tryIdent("option") || this.tryIdent("reserved")) {
        this.skipUntil(";");
        this.expect(";");
        continue;
      }
      const vdoc = this.takeDoc();
      const vname = this.ident();
      this.expect("=");
      const number = this.number();
      const opts = this.parseOptions();
      this.expect(";");
      values.push({
        name: vname,
        number,
        deprecated: opts.deprecated,
        documentation: vdoc,
      });
    }
    this.expect("}");
    this.tryChar(";");
    return { name, fullName, values, documentation };
  }

  parseMessage(pkg: string, prefix: string): ProtoMessage {
    const documentation = this.takeDoc();
    const name = this.ident();
    const fullName = prefix ? `${prefix}.${name}` : `${pkg}.${name}`;
    this.expect("{");
    const fields: ProtoField[] = [];
    const messages: ProtoMessage[] = [];
    const enums: ProtoEnum[] = [];
    while (true) {
      this.skipTrivia();
      if (this.peekChar() === "}") break;
      if (
        this.tryIdent("option") ||
        this.tryIdent("reserved") ||
        this.tryIdent("extensions")
      ) {
        this.skipUntil(";");
        this.expect(";");
        continue;
      }
      if (this.tryIdent("message")) {
        messages.push(this.parseMessage(pkg, fullName));
        continue;
      }
      if (this.tryIdent("enum")) {
        enums.push(this.parseEnum(pkg, fullName));
        continue;
      }
      if (this.tryIdent("oneof")) {
        this.ident();
        this.expect("{");
        while (true) {
          this.skipTrivia();
          if (this.peekChar() === "}") break;
          if (this.tryIdent("option")) {
            this.skipUntil(";");
            this.expect(";");
            continue;
          }
          fields.push({ ...this.parseField(), optional: true });
        }
        this.expect("}");
        continue;
      }
      if (this.peekChar() === ";") {
        this.bump();
        continue;
      }
      fields.push(this.parseField());
    }
    this.expect("}");
    this.tryChar(";");
    return { name, fullName, fields, messages, enums, documentation };
  }

  parseRpc(): ProtoRpc {
    const documentation = this.takeDoc();
    const name = this.ident();
    this.expect("(");
    const requestStream = this.tryIdent("stream");
    const requestType = this.dotted();
    this.expect(")");
    if (!this.tryIdent("returns")) this.fail("expected `returns`");
    this.expect("(");
    const responseStream = this.tryIdent("stream");
    const responseType = this.dotted();
    this.expect(")");
    let deprecated = false;
    if (this.tryChar("{")) {
      while (true) {
        this.skipTrivia();
        if (this.peekChar() === "}") break;
        if (this.tryIdent("option")) {
          const start = this.i;
          this.skipUntil(";");
          const body = this.src.slice(start, this.i);
          if (/deprecated\s*=\s*true/.test(body)) deprecated = true;
          this.expect(";");
          continue;
        }
        this.skipUntil("}");
      }
      this.expect("}");
    } else {
      this.expect(";");
    }
    return {
      name,
      requestType,
      responseType,
      requestStream,
      responseStream,
      deprecated,
      documentation,
    };
  }

  parseService(pkg: string): ProtoService {
    const documentation = this.takeDoc();
    const name = this.ident();
    this.expect("{");
    const rpcs: ProtoRpc[] = [];
    while (true) {
      this.skipTrivia();
      if (this.peekChar() === "}") break;
      if (this.tryIdent("option") || this.tryIdent("reserved")) {
        this.skipUntil(";");
        this.expect(";");
        continue;
      }
      if (this.tryIdent("rpc")) {
        rpcs.push(this.parseRpc());
        continue;
      }
      this.fail(`unexpected token in service ${name}`);
    }
    this.expect("}");
    this.tryChar(";");
    return { name, fullName: `${pkg}.${name}`, rpcs, documentation };
  }

  parseFile(): ProtoFile {
    let syntax = "proto2";
    let pkg = "";
    const imports: string[] = [];
    const messages: ProtoMessage[] = [];
    const enums: ProtoEnum[] = [];
    const services: ProtoService[] = [];
    this.skipTrivia();
    while (this.i < this.src.length) {
      this.skipTrivia();
      if (this.i >= this.src.length) break;
      if (this.tryIdent("syntax")) {
        this.expect("=");
        syntax = this.stringLit();
        this.expect(";");
        continue;
      }
      if (this.tryIdent("package")) {
        pkg = this.dotted();
        this.expect(";");
        continue;
      }
      if (this.tryIdent("import")) {
        this.tryIdent("public");
        this.tryIdent("weak");
        imports.push(this.stringLit());
        this.expect(";");
        continue;
      }
      if (this.tryIdent("option")) {
        this.skipUntil(";");
        this.expect(";");
        continue;
      }
      if (this.tryIdent("message")) {
        messages.push(this.parseMessage(pkg, ""));
        continue;
      }
      if (this.tryIdent("enum")) {
        enums.push(this.parseEnum(pkg, ""));
        continue;
      }
      if (this.tryIdent("service")) {
        services.push(this.parseService(pkg));
        continue;
      }
      this.fail(`unexpected token ${JSON.stringify(this.peekChar())}`);
    }
    return {
      filename: this.filename,
      package: pkg,
      syntax,
      imports,
      messages,
      enums,
      services,
    };
  }
}

/** Parse a proto3 source file into an AST. */
export const parseProto = (
  text: string,
  filename = "input.proto",
): ProtoFile => {
  const file = new Parser(text, filename).parseFile();
  if (file.syntax !== "proto3") {
    throw new Error(
      `${filename}: expected proto3, got ${JSON.stringify(file.syntax)}`,
    );
  }
  return file;
};

// ============================================================================
// Type universe
// ============================================================================

interface TypeIndex {
  messages: Map<string, ProtoMessage>;
  enums: Map<string, ProtoEnum>;
  services: ProtoService[];
}

const walkMessage = (msg: ProtoMessage, index: TypeIndex): void => {
  index.messages.set(msg.fullName, msg);
  for (const nested of msg.messages) walkMessage(nested, index);
  for (const en of msg.enums) index.enums.set(en.fullName, en);
};

const indexFiles = (files: readonly ProtoFile[]): TypeIndex => {
  const index: TypeIndex = {
    messages: new Map(),
    enums: new Map(),
    services: [],
  };
  for (const file of files) {
    for (const msg of file.messages) walkMessage(msg, index);
    for (const en of file.enums)
      index.enums.set(en.fullName, index.enums.get(en.fullName) ?? en);
    index.services.push(...file.services);
  }
  return index;
};

const resolveName = (
  name: string,
  pkg: string,
  scope: string | undefined,
  index: TypeIndex,
): string => {
  const stripped = name.startsWith(".") ? name.slice(1) : name;
  if (SCALAR_TARGETS[stripped]) return stripped;
  if (WKT_TARGETS[stripped] || stripped.startsWith("google.protobuf."))
    return stripped;
  const candidates: string[] = [];
  if (name.startsWith(".")) {
    candidates.push(stripped);
  } else {
    if (scope) {
      const parts = scope.split(".");
      for (let i = parts.length; i >= 0; i--) {
        const prefix = parts.slice(0, i).join(".");
        candidates.push(prefix ? `${prefix}.${stripped}` : stripped);
      }
    }
    if (pkg) candidates.push(`${pkg}.${stripped}`);
    candidates.push(stripped);
  }
  for (const c of candidates) {
    if (index.messages.has(c) || index.enums.has(c)) return c;
  }
  throw new Error(
    `unresolved proto type ${JSON.stringify(name)} (package ${pkg}, scope ${scope})`,
  );
};

// ============================================================================
// Smithy emission
// ============================================================================

interface Bag {
  shapes: Record<string, any>;
  names: Set<string>;
  namespace: string;
}

const capitalize = (s: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const ident = (s: string): string => {
  let out = s.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

const camel = (s: string): string =>
  s.replace(/[_-]+([A-Za-z0-9])/g, (_, c: string) => c.toUpperCase());

const shapeNameFor = (fullName: string): string => {
  const parts = fullName.split(".").filter(Boolean);
  // Drop the proto package (everything before the first PascalCase type).
  const start = parts.findIndex((p) => /^[A-Z]/.test(p));
  const typeParts = start >= 0 ? parts.slice(start) : parts.slice(-1);
  return ident(typeParts.join(""));
};

const addExact = (bag: Bag, name: string, def: any): string => {
  const id = `${bag.namespace}#${name}`;
  if (bag.shapes[id] !== undefined) {
    throw new Error(`smithy shape ${id} already exists`);
  }
  bag.shapes[id] = def;
  bag.names.add(name);
  return id;
};

const addShape = (bag: Bag, base: string, def: any): string => {
  let want = ident(capitalize(base));
  let name = want;
  let n = 2;
  while (bag.names.has(name)) name = `${want}${n++}`;
  return addExact(bag, name, def);
};

const oneLineDoc = (s: string | undefined): string | undefined => {
  const t = s?.replace(/\s+/g, " ").trim();
  return t ? t : undefined;
};

const isSensitive = (name: string): boolean =>
  SENSITIVE_FIELD_PATTERNS.some((re) => re.test(name));

const EMPTY_STRUCT_ID = "GoogleProtobufEmpty";

type EmitCtx = {
  bag: Bag;
  index: TypeIndex;
  pkg: string;
  memo: Map<string, string>;
  listMemo: Map<string, string>;
  mapMemo: Map<string, string>;
};

const emitEnum = (ctx: EmitCtx, en: ProtoEnum): string => {
  const cached = ctx.memo.get(en.fullName);
  if (cached) return cached;
  const members: Record<string, any> = {};
  const used = new Set<string>();
  for (const v of en.values) {
    let mn = ident(v.name);
    let k = 2;
    while (used.has(mn)) mn = `${ident(v.name)}_${k++}`;
    used.add(mn);
    const traits: Record<string, any> = { "smithy.api#enumValue": v.name };
    const doc = oneLineDoc(v.documentation);
    if (doc) traits["smithy.api#documentation"] = doc;
    if (v.deprecated) traits["smithy.api#deprecated"] = {};
    members[mn] = { target: "smithy.api#Unit", traits };
  }
  const def: any = { type: "enum", members };
  const doc = oneLineDoc(en.documentation);
  if (doc) def.traits = { "smithy.api#documentation": doc };
  const id = addShape(ctx.bag, shapeNameFor(en.fullName), def);
  ctx.memo.set(en.fullName, id);
  return id;
};

const emitEmptyStruct = (ctx: EmitCtx): string => {
  const cached = ctx.memo.get("google.protobuf.Empty.struct");
  if (cached) return cached;
  const id = addShape(ctx.bag, EMPTY_STRUCT_ID, {
    type: "structure",
    members: {},
    traits: {
      "smithy.api#documentation": "google.protobuf.Empty as a nested field.",
    },
  });
  ctx.memo.set("google.protobuf.Empty.struct", id);
  return id;
};

const emitType = (
  ctx: EmitCtx,
  raw: string,
  scope: string | undefined,
  asField: boolean,
): string => {
  if (SCALAR_TARGETS[raw]) return SCALAR_TARGETS[raw]!;
  const resolved = resolveName(raw, ctx.pkg, scope, ctx.index);
  if (SCALAR_TARGETS[resolved]) return SCALAR_TARGETS[resolved]!;
  if (resolved === "google.protobuf.Empty") {
    return asField ? emitEmptyStruct(ctx) : PRELUDE.Unit;
  }
  if (WKT_TARGETS[resolved]) return WKT_TARGETS[resolved]!;
  const cached = ctx.memo.get(resolved);
  if (cached) return cached;
  const en = ctx.index.enums.get(resolved);
  if (en) return emitEnum(ctx, en);
  const msg = ctx.index.messages.get(resolved);
  if (!msg) throw new Error(`no message or enum for ${resolved}`);
  return emitMessage(ctx, msg);
};

const listOf = (ctx: EmitCtx, elem: string): string => {
  const cached = ctx.listMemo.get(elem);
  if (cached) return cached;
  const local = elem.split("#")[1] ?? "Value";
  const id = addShape(ctx.bag, `${local}List`, {
    type: "list",
    member: { target: elem },
  });
  ctx.listMemo.set(elem, id);
  return id;
};

const mapOf = (ctx: EmitCtx, value: string): string => {
  const cached = ctx.mapMemo.get(value);
  if (cached) return cached;
  const local = value.split("#")[1] ?? "Value";
  const id = addShape(ctx.bag, `${local}Map`, {
    type: "map",
    key: { target: PRELUDE.String },
    value: { target: value },
  });
  ctx.mapMemo.set(value, id);
  return id;
};

const fieldTarget = (
  ctx: EmitCtx,
  field: ProtoField,
  scope: string,
): string => {
  if (field.mapKey && field.mapValue) {
    const value = emitType(ctx, field.mapValue, scope, true);
    return mapOf(ctx, value);
  }
  const inner = emitType(ctx, field.type, scope, true);
  return field.repeated ? listOf(ctx, inner) : inner;
};

const memberTraits = (
  field: ProtoField,
  tsName: string,
): Record<string, any> => {
  const traits: Record<string, any> = {};
  const doc = oneLineDoc(field.documentation);
  if (doc) traits["smithy.api#documentation"] = doc;
  const wire = field.jsonName ?? camel(field.name);
  if (wire !== tsName) traits["smithy.api#jsonName"] = wire;
  if (isSensitive(field.name) || isSensitive(tsName)) {
    traits["smithy.api#sensitive"] = {};
  }
  if (field.deprecated) traits["smithy.api#deprecated"] = {};
  return traits;
};

const emitMembers = (
  ctx: EmitCtx,
  fields: readonly ProtoField[],
  scope: string,
): Record<string, any> => {
  const members: Record<string, any> = {};
  const used = new Set<string>();
  for (const field of fields) {
    let tsName = ident(camel(field.name));
    let k = 2;
    while (used.has(tsName)) tsName = `${ident(camel(field.name))}${k++}`;
    used.add(tsName);
    const traits = memberTraits(field, tsName);
    members[tsName] = {
      target: fieldTarget(ctx, field, scope),
      ...(Object.keys(traits).length ? { traits } : {}),
    };
  }
  return members;
};

const emitMessage = (ctx: EmitCtx, msg: ProtoMessage): string => {
  const cached = ctx.memo.get(msg.fullName);
  if (cached) return cached;
  const def: any = { type: "structure", members: {} };
  const doc = oneLineDoc(msg.documentation);
  if (doc) def.traits = { "smithy.api#documentation": doc };
  const id = addShape(ctx.bag, shapeNameFor(msg.fullName), def);
  ctx.memo.set(msg.fullName, id);
  def.members = emitMembers(ctx, msg.fields, msg.fullName);
  return id;
};

const copyIo = (
  ctx: EmitCtx,
  rpcName: string,
  side: "Request" | "Response",
  typeName: string,
): string => {
  if (SCALAR_TARGETS[typeName]) {
    return addShape(ctx.bag, `${rpcName}${side}`, {
      type: "structure",
      members: {
        value: {
          target: SCALAR_TARGETS[typeName],
          traits: { "smithy.api#required": {} },
        },
      },
      traits: {
        [side === "Request" ? "smithy.api#input" : "smithy.api#output"]: {},
      },
    });
  }
  const resolved = resolveName(typeName, ctx.pkg, undefined, ctx.index);
  if (resolved === "google.protobuf.Empty") return PRELUDE.Unit;
  if (WKT_TARGETS[resolved] && resolved !== "google.protobuf.Empty") {
    return addShape(ctx.bag, `${rpcName}${side}`, {
      type: "structure",
      members: {
        value: {
          target: WKT_TARGETS[resolved],
          traits: { "smithy.api#required": {} },
        },
      },
      traits: {
        [side === "Request" ? "smithy.api#input" : "smithy.api#output"]: {},
      },
    });
  }
  const en = ctx.index.enums.get(resolved);
  if (en) {
    return addShape(ctx.bag, `${rpcName}${side}`, {
      type: "structure",
      members: {
        value: {
          target: emitEnum(ctx, en),
          traits: { "smithy.api#required": {} },
        },
      },
      traits: {
        [side === "Request" ? "smithy.api#input" : "smithy.api#output"]: {},
      },
    });
  }
  const msg = ctx.index.messages.get(resolved);
  if (!msg)
    throw new Error(
      `rpc ${rpcName}: ${side} type ${typeName} is not a message`,
    );
  return addShape(ctx.bag, `${rpcName}${side}`, {
    type: "structure",
    members: emitMembers(ctx, msg.fields, msg.fullName),
    traits: {
      [side === "Request" ? "smithy.api#input" : "smithy.api#output"]: {},
    },
  });
};

/** Leading PascalCase token of an RPC name (`AppCreate` → `App`). */
export const rpcGroupName = (rpcName: string): string => {
  const m = rpcName.match(/^([A-Z][a-z]+|[A-Z]+(?![a-z]))/);
  return m?.[1] ?? rpcName;
};

export const convertProtoToSmithy = (
  options: ProtoConvertOptions,
): ProtoConvertResult => {
  const index = indexFiles(options.files);
  const service = index.services.find(
    (s) => s.fullName === options.protoService,
  );
  if (!service) {
    throw new Error(
      `proto service ${options.protoService} not found (have ${index.services
        .map((s) => s.fullName)
        .join(", ")})`,
    );
  }
  const file = options.files.find((f) =>
    f.services.some((s) => s.fullName === service.fullName),
  );
  const pkg =
    file?.package ?? service.fullName.split(".").slice(0, -1).join(".");

  const bag: Bag = {
    shapes: {},
    names: new Set(),
    namespace: options.namespace,
  };
  const ctx: EmitCtx = {
    bag,
    index,
    pkg,
    memo: new Map(),
    listMemo: new Map(),
    mapMemo: new Map(),
  };

  const skipStreaming = options.skipStreaming ?? true;
  const skipDeprecated = options.skipDeprecated ?? true;
  let converted = 0;
  let skippedStreaming = 0;
  let skippedDeprecated = 0;
  const serviceOps: Array<{ target: string }> = [];

  // Reserve RPC local names so message/enum shapes that share an RPC's
  // PascalCase name (`AppDeploymentHistory`, `DomainList`) uniquify instead
  // of being overwritten when the operation is addExact'd. The Smithy
  // service shape is `${serviceName}Service` for the same reason (`Image`
  // the message vs Image the RPC group).
  const serviceShapeName = options.serviceName.endsWith("Service")
    ? options.serviceName
    : `${options.serviceName}Service`;
  bag.names.add(serviceShapeName);
  for (const rpc of service.rpcs) {
    if (options.rpcNames && !options.rpcNames.has(rpc.name)) continue;
    bag.names.add(rpc.name);
  }

  for (const rpc of service.rpcs) {
    if (options.rpcNames && !options.rpcNames.has(rpc.name)) continue;
    if (rpc.requestStream || rpc.responseStream) {
      if (skipStreaming) {
        skippedStreaming++;
        continue;
      }
    }
    if (rpc.deprecated && skipDeprecated) {
      skippedDeprecated++;
      continue;
    }

    const input = copyIo(ctx, rpc.name, "Request", rpc.requestType);
    const output = copyIo(ctx, rpc.name, "Response", rpc.responseType);
    const httpUri = `/${service.fullName}/${rpc.name}`;
    const traits: Record<string, any> = {
      "smithy.api#http": { method: "POST", uri: httpUri, code: 200 },
    };
    const doc = oneLineDoc(rpc.documentation);
    if (doc) traits["smithy.api#documentation"] = doc;
    if (rpc.deprecated) traits["smithy.api#deprecated"] = {};

    const opId = addExact(bag, rpc.name, {
      type: "operation",
      input: { target: input },
      output: { target: output },
      traits,
    });
    serviceOps.push({ target: opId });
    converted++;
  }

  addExact(bag, serviceShapeName, {
    type: "service",
    version: options.serviceVersion ?? "1.0",
    operations: serviceOps,
    traits: {
      "smithy.api#title": options.serviceTitle ?? options.serviceName,
      ...(options.serviceDocumentation
        ? { "smithy.api#documentation": options.serviceDocumentation }
        : {}),
    },
  });

  return {
    model: {
      smithy: "2.0",
      metadata: {
        suppressions: [
          { id: "HttpUriConflict", namespace: "*" },
          { id: "HttpMethodSemantics", namespace: "*" },
          { id: "UnreferencedShape", namespace: "*" },
        ],
      },
      shapes: bag.shapes,
    },
    converted,
    skippedStreaming,
    skippedDeprecated,
    shapeCount: Object.keys(bag.shapes).length,
  };
};
