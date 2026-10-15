/**
 * Minimal schemas for generated SDK code: plain objects shaped like Effect
 * Schema ASTs (`_tag`, `annotations`, `propertySignatures`, `types`,
 * `thunk`, `encoding`), without Effect Schema's parser, issue and
 * transformation machinery.
 *
 * Request encoding and lenient response decoding only walk the AST: they
 * read wire names, HTTP bindings and the shape of the value. Importing
 * `effect/Schema` to build those ASTs put about 37 KB gzip of decode
 * machinery into every bundle that never decodes. These nodes carry the
 * same fields protocol code reads, so it runs unchanged.
 *
 * When a caller asks for real validation (`ResponseValidation.strict`),
 * {@link toEffect} rebuilds the equivalent Effect schema from a lite node,
 * loading `effect/Schema` only then.
 *
 * Every value here has the members generated code uses on schemas: `.ast`,
 * `.pipe(...)`, `.annotate(...)`, `.fields` (structs) and `.key`/`.value`
 * (records).
 */
import type * as Cause from "effect/Cause";
import * as Data from "effect/Data";
import { pipeArguments, type Pipeable } from "effect/Pipeable";
import type * as EffectSchema from "effect/Schema";

export type Annotations = Record<string | symbol, unknown>;

/** A lite AST node. Field names match Effect's SchemaAST where protocols read them. */
export interface Node {
  readonly _tag: string;
  readonly annotations?: Annotations;
  /**
   * The wire-side node, for nodes whose value changes on the wire (AWS
   * timestamps, blobs, sensitive values). Same shape as Effect's encoding
   * chain, so code that follows `encoding[0].to` reads the wire type.
   */
  readonly encoding?: ReadonlyArray<{ readonly to: Node }>;
  /** Declaration: the type guard strict validation applies (Unknown without one). */
  readonly check?: (u: unknown) => boolean;
  readonly context?: { readonly isOptional: boolean };
  /** Objects */
  readonly propertySignatures?: ReadonlyArray<PropertySignature>;
  readonly indexSignatures?: ReadonlyArray<{ readonly parameter: Node; readonly type: Node }>;
  /** Union */
  readonly types?: ReadonlyArray<Node>;
  /** Arrays */
  readonly elements?: ReadonlyArray<Node>;
  readonly rest?: ReadonlyArray<Node>;
  /** Suspend */
  readonly thunk?: () => Node;
  /** Literal */
  readonly literal?: unknown;
  /** Declaration */
  readonly typeParameters?: ReadonlyArray<Node>;
}

export interface PropertySignature {
  readonly name: PropertyKey;
  readonly type: Node;
}

/** A lite schema value: what generated code holds and passes around. */
export interface Lite {
  readonly ast: Node;
  readonly "~lite": true;
  pipe(...fns: ReadonlyArray<(s: any) => any>): any;
  annotate(annotations: Annotations): Lite;
}

/** Marks lite nodes so strict validation knows to convert them. */
export const liteKey = "~lite";
const node = <N extends Node>(n: N): N => Object.assign(n, { [liteKey]: true });

const Proto = {
  "~lite": true,
  pipe(this: Lite) {
    return pipeArguments(this, arguments);
  },
  annotate(this: Lite, annotations: Annotations): Lite {
    return make(
      { ...this.ast, annotations: { ...this.ast.annotations, ...annotations } } as Node,
      this,
    );
  },
};

const make = (ast: Node, from?: object): Lite => {
  const self = Object.create(Proto) as { ast: Node };
  self.ast = ast;
  // Struct `.fields` and record `.key`/`.value` travel with annotate.
  if (from)
    for (const k of ["fields", "key", "value"]) if (k in from) (self as any)[k] = (from as any)[k];
  return self as unknown as Lite;
};

/** A lite schema for a hand-built node (SDK-specific declarations). */
export const fromNode = (n: Node): Lite => make(node(n));

export const isLite = (u: unknown): u is Lite =>
  (typeof u === "object" || typeof u === "function") && u !== null && (u as Lite)["~lite"] === true;

const astOf = (s: Lite | { readonly ast: Node }): Node => s.ast;

//#region primitives

export const String: Lite = /*@__PURE__*/ make(node({ _tag: "String" }));
export const Number: Lite = /*@__PURE__*/ make(node({ _tag: "Number" }));
export const Boolean: Lite = /*@__PURE__*/ make(node({ _tag: "Boolean" }));
export const Unknown: Lite = /*@__PURE__*/ make(node({ _tag: "Unknown" }));
export const Any: Lite = /*@__PURE__*/ make(node({ _tag: "Any" }));
export const Null: Lite = /*@__PURE__*/ make(node({ _tag: "Null" }));
export const Void: Lite = /*@__PURE__*/ make(node({ _tag: "Void" }));
export const Undefined: Lite = /*@__PURE__*/ make(node({ _tag: "Undefined" }));

//#endregion

//#region combinators

export const Literal = (value: unknown): Lite => make(node({ _tag: "Literal", literal: value }));

export const Literals = (values: ReadonlyArray<unknown>): Lite =>
  make(node({ _tag: "Union", types: values.map((v) => node({ _tag: "Literal", literal: v })) }));

export const optional = (s: Lite): Lite => {
  const inner = astOf(s);
  return make(
    node({
      _tag: "Union",
      types: [inner, node({ _tag: "Undefined" })],
      context: { isOptional: true },
    }),
  );
};

export const NullOr = (s: Lite): Lite =>
  make(node({ _tag: "Union", types: [astOf(s), node({ _tag: "Null" })] }));

export const Union = (members: ReadonlyArray<Lite>): Lite =>
  make(node({ _tag: "Union", types: members.map(astOf) }));

export const Array = (item: Lite): Lite =>
  make(node({ _tag: "Arrays", elements: [], rest: [astOf(item)] }));

export const Tuple = (elements: ReadonlyArray<Lite>): Lite =>
  make(node({ _tag: "Arrays", elements: elements.map(astOf), rest: [] }));

export const Record = (key: Lite, value: Lite): Lite => {
  const s = make(
    node({
      _tag: "Objects",
      propertySignatures: [],
      indexSignatures: [{ parameter: astOf(key), type: astOf(value) }],
    }),
  );
  (s as any).key = key;
  (s as any).value = value;
  return s;
};

export const Struct = (fields: Readonly<Record<string, Lite>>): Lite => {
  const s = make(
    node({
      _tag: "Objects",
      propertySignatures: Object.keys(fields).map((name) => {
        const type = astOf(fields[name]!);
        return { name, type };
      }),
      indexSignatures: [],
    }),
  );
  (s as any).fields = fields;
  return s;
};

/** A lazily resolved schema; `.ast` is a Suspend node whose thunk resolves the target. */
export const suspend = (f: () => Lite): Lite => {
  let resolved: Node | undefined;
  return make(node({ _tag: "Suspend", thunk: () => (resolved ??= astOf(f())) }));
};

/** Rename struct keys on the wire: `{ typeKey: "wire_key" }`. */
export const encodeKeys =
  (mapping: Readonly<Record<string, string>>) =>
  (s: Lite): Lite =>
    s.annotate({ [encodeKeysKey]: mapping });
export const encodeKeysKey = "@distilled.cloud/core/schema-lite/encodeKeys";

//#endregion

//#region declarations and errors

const declaration = (identifier: string): Lite =>
  make(node({ _tag: "Declaration", typeParameters: [], annotations: { identifier } }));

export const Date: Lite = /*@__PURE__*/ declaration("Date");
export const Duration: Lite = /*@__PURE__*/ declaration("Duration");
export const Redacted = (value: Lite): Lite =>
  make(
    node({
      _tag: "Declaration",
      typeParameters: [astOf(value)],
      annotations: { identifier: "Redacted" },
    }),
  );
export const instanceOf = (cls: Function, annotations?: Annotations): Lite =>
  make(
    node({
      _tag: "Declaration",
      typeParameters: [],
      annotations: { identifier: cls.name, ...annotations },
    }),
  );
export const declare = (_is: (u: unknown) => boolean, annotations?: Annotations): Lite =>
  make(node({ _tag: "Declaration", typeParameters: [], annotations: { ...annotations } }));

/**
 * A tagged error class without Effect Schema: a yieldable `Data.TaggedError`
 * that keeps only its declared fields (as the schema class did) and carries
 * `.fields`, `.ast` and a static `.pipe` for category decorators. It does not
 * validate on construction.
 */
const tagKey = "~distilled/tag";
const keysKey = "~distilled/keys";
const astKey = "~distilled/ast";
const annotationsKey = "~distilled/annotations";
const annotationMetaKey = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/annotation-meta");

/**
 * The annotations an error class declares: a plain object, or a pipeable
 * trait (`T.all(...)`), whose own enumerable keys are its annotations.
 */
const ownAnnotations = (from: object): Annotations => {
  const out: Annotations = {};
  for (const k of Reflect.ownKeys(from))
    if (k !== annotationMetaKey && Object.prototype.propertyIsEnumerable.call(from, k))
      out[k] = (from as any)[k];
  return out;
};

/**
 * Shared base of every lite error class: a yieldable `Data.Error` that keeps
 * only the declared fields and sets `_tag` and `name` like
 * `Data.TaggedError`. One class per error costs ~0.6 KB; building a
 * `Data.TaggedError` base for each cost ~2.3 KB.
 */
let liteErrorBase: any;
const LiteErrorBase = (): any =>
  (liteErrorBase ??= class LiteError extends (Data.Error as any) {
    constructor(props?: Record<string, unknown>) {
      const keys: ReadonlyArray<string> = (new.target as any)[keysKey];
      const picked: Record<string, unknown> = {};
      if (props) for (const k of keys) if (props[k] !== undefined) picked[k] = props[k];
      super(picked);
      (this as any)._tag = (new.target as any)[tagKey];
    }
    /** The fields as a struct node carrying the tag (`identifier`) and class annotations. */
    static get ast(): Node {
      const C = this as any;
      if (Object.hasOwn(C, astKey)) return C[astKey];
      const fields: Record<string, Lite> = C.fields;
      return (C[astKey] = node({
        _tag: "Objects",
        propertySignatures: Object.keys(fields).map((name) => ({
          name,
          type: astOf(fields[name]!),
        })),
        indexSignatures: [],
        annotations: { identifier: C[tagKey], ...C[annotationsKey] },
      }));
    }
    static pipe(this: unknown) {
      return pipeArguments(this, arguments);
    }
    /** `new this(props)`, like Effect Schema's `TaggedError.make`. */
    static make(
      this: new (props?: Record<string, unknown>) => unknown,
      props?: Record<string, unknown>,
    ) {
      return new this(props);
    }
  });

/**
 * The type of a lite tagged error class: what the class really has. It is
 * not an Effect Schema, so `Schema.is(E)`, `Schema.decode(E)` and friends do
 * not compile against it -- at runtime they would fail on the lite `.ast`.
 * Match errors with `_tag` (`Effect.catchTag`) or `instanceof`.
 */
export interface TaggedErrorClass<
  Tag extends string,
  Fields extends EffectSchema.Struct.Fields,
> extends Pipeable {
  new (
    ...args: {} extends EffectSchema.Struct.MakeIn<Fields>
      ? [props?: EffectSchema.Struct.MakeIn<Fields>]
      : [props: EffectSchema.Struct.MakeIn<Fields>]
  ): Cause.YieldableError & { readonly _tag: Tag } & EffectSchema.Struct.Type<Fields>;
  /** `new this(props)`. */
  make<C extends abstract new (...args: any) => any>(
    this: C,
    ...args: ConstructorParameters<C>
  ): InstanceType<C>;
  readonly fields: Fields;
  readonly identifier: Tag;
  /** The lite struct node (not an Effect Schema AST). */
  readonly ast: Node;
}

/**
 * `TaggedError<Self>()(tag, fields)`, typed by the field schemas. `Self` is
 * accepted for source compatibility with `Schema.TaggedError` and unused.
 */
export type TaggedErrorFactory = <_Self = never>(
  identifier?: string,
) => <Tag extends string, const Fields extends EffectSchema.Struct.Fields = {}>(
  tag: Tag,
  fields?: Fields,
  annotations?: object,
) => TaggedErrorClass<Tag, Fields>;

/**
 * A tagged error class without Effect Schema. It does not validate on
 * construction. Carries `.fields` and `.identifier`, and a static `.pipe`
 * for category decorators.
 */
export const TaggedError =
  (_identifier?: string) =>
  (tag: string, fields: Readonly<Record<string, Lite>> = {}, annotations?: object): any => {
    const C = class extends LiteErrorBase() {} as any;
    C[tagKey] = tag;
    C[keysKey] = Object.keys(fields);
    if (annotations) C[annotationsKey] = ownAnnotations(annotations);
    C.fields = fields;
    C.identifier = tag;
    C.prototype.name = tag;
    return C;
  };

/**
 * Schema `j` of builder `build`, made on first use (the lite `chunks.at`).
 * Its `.ast` is the built schema's own node, not a Suspend around it, so
 * protocol code sees the same node shapes as with eager schemas.
 */
export const at = (build: (j: number) => unknown, j: number): any => {
  const self = Object.create(AtProto);
  self.b = build;
  self.j = j;
  return self;
};

interface At {
  readonly b: (j: number) => unknown;
  readonly j: number;
  s?: any;
}
const resolveAt = (self: At): any => (self.s ??= self.b(self.j));

const AtProto: object = /*@__PURE__*/ Object.create(Proto, {
  ast: {
    get(this: At) {
      return resolveAt(this).ast;
    },
  },
  fields: {
    get(this: At) {
      return resolveAt(this).fields;
    },
  },
  key: {
    get(this: At) {
      return resolveAt(this).key;
    },
  },
  value: {
    get(this: At) {
      return resolveAt(this).value;
    },
  },
});

//#endregion

//#region Effect Schema bridge (strict validation only)

/**
 * The Effect schema equivalent to a lite node, for strict decoding. Loaded
 * on demand so `effect/Schema` is only bundled/imported by callers that
 * validate.
 */
/** The Effect Schema functions the bridge uses (passed in, so callers import only these). */
export type EffectSchemaApi = Pick<
  typeof import("effect/Schema"),
  | "Any"
  | "Array"
  | "Boolean"
  | "Literal"
  | "Null"
  | "Number"
  | "Record"
  | "String"
  | "Struct"
  | "Tuple"
  | "Undefined"
  | "Union"
  | "Unknown"
  | "Void"
  | "declare"
  | "make"
  | "optional"
  | "suspend"
>;

export const toEffect = (S: EffectSchemaApi, ast: Node): unknown => {
  const memo = new Map<Node, any>();
  // Whether a lite node sits anywhere under `n` (cycles count as no).
  const liteBelow = new Map<Node, boolean>();
  const hasLite = (n: Node): boolean => {
    const known = liteBelow.get(n);
    if (known !== undefined) return known;
    liteBelow.set(n, false);
    const kids: Node[] = [
      ...(n.types ?? []),
      ...(n.elements ?? []),
      ...(n.rest ?? []),
      ...(n.typeParameters ?? []),
      ...(n.propertySignatures ?? []).map((p) => p.type),
      ...(n.indexSignatures ?? []).flatMap((i) => [i.parameter, i.type]),
      ...(((n as any).encoding ?? []) as Array<{ to: Node }>).map((l) => l.to),
      ...(n._tag === "Suspend" && n.thunk ? [n.thunk()] : []),
    ];
    const r = !!(n as any)[liteKey] || kids.some(hasLite);
    liteBelow.set(n, r);
    return r;
  };
  const build = (n: Node): any => {
    const hit = memo.get(n);
    if (hit) return hit;
    // A real Effect subtree with nothing lite below keeps its exact schema.
    if (!(n as any)[liteKey] && !hasLite(n)) {
      const real = S.make(n as any);
      memo.set(n, real);
      return real;
    }
    let out: any;
    switch (n._tag) {
      case "String":
        out = S.String;
        break;
      case "Number":
        out = S.Number;
        break;
      case "Boolean":
        out = S.Boolean;
        break;
      case "Null":
        out = S.Null;
        break;
      case "Undefined":
        out = S.Undefined;
        break;
      case "Void":
        out = S.Void;
        break;
      case "Any":
        out = S.Any;
        break;
      case "Literal":
        out = S.Literal(n.literal as any);
        break;
      case "Union":
        out = n.context?.isOptional
          ? S.optional(build(n.types![0]!))
          : S.Union(n.types!.map(build));
        break;
      case "Arrays":
        out = n.rest!.length ? S.Array(build(n.rest![0]!)) : S.Tuple(n.elements!.map(build));
        break;
      case "Objects":
        out = n.indexSignatures?.length
          ? S.Record(build(n.indexSignatures[0]!.parameter), build(n.indexSignatures[0]!.type))
          : S.Struct(Object.fromEntries(n.propertySignatures!.map((p) => [p.name, build(p.type)])));
        break;
      case "Suspend": {
        const thunk = n.thunk!;
        out = S.suspend(() => build(thunk()));
        break;
      }
      case "Declaration":
        out = n.check ? S.declare(n.check as (u: unknown) => u is unknown) : S.Unknown;
        break;
      case "Unknown":
        out = S.Unknown;
        break;
      default:
        // A lite tag with no case maps to Unknown; a real node keeps its schema.
        out = (n as any)[liteKey] ? S.Unknown : S.make(n as any);
    }
    memo.set(n, out);
    return out;
  };
  return build(ast);
};

//#endregion
