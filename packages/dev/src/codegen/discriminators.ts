/**
 * Discriminated hierarchies → `oneOf` unions, before OpenAPI conversion.
 *
 * Specs model polymorphism two ways. A `oneOf` with a `discriminator`
 * already converts to a union. The other way is a base schema with a
 * `discriminator` and subtypes that extend it with
 * `allOf: [{ $ref: <base> }, …]` (Swagger 2 and Java-generated documents:
 * Azure, Okta, Iceberg, …). Nothing points at a subtype except the
 * `discriminator.mapping`, `x-ms-discriminator-value`, or the subtype's own
 * name, so a converter that does not read `discriminator` turns every use of
 * the base into the base's own members only: a request built from Azure's
 * `ApplicationGroupPolicy` loses the ThrottlingPolicy fields, and a
 * subtype's members are not in the SDK's types at all.
 *
 * {@link unionizeDiscriminators} rewrites the document so the shared
 * converter sees plain unions:
 *
 *   • a hierarchy node with subtypes (the base, or an intermediate subtype)
 *     becomes `oneOf` over its concrete subtypes ("arms"). The arms are the
 *     `discriminator.mapping` targets when the base has a mapping, and
 *     otherwise every leaf below it (Swagger's implicit mapping);
 *   • every subtype gets its ancestors' members inline instead of its
 *     `allOf` `$ref` to them, which also breaks the subtype → base → subtype
 *     cycle the union would create. Other `allOf` entries (Azure's
 *     `TrackedResource`) stay `$ref`s;
 *   • the discriminator member of each arm is pinned to the arm's key
 *     (`enum: [key]`), so the arms are distinguishable in TypeScript;
 *   • an inline copy of a discriminated schema with a mapping (a property
 *     that repeats the base instead of `$ref`ing it), anywhere in the
 *     document, becomes `oneOf` over its mapping targets, including one
 *     inside an arm's own members;
 *   • an inline `enum` member of a base is hoisted to a `<Base><Member>`
 *     component the arms share, so it converts once and not once per arm.
 *
 * A mapping target that is not a subtype of the base (Okta's
 * `CreateOrUpdatePolicy` maps to the `Policy` subtypes, MongoDB Atlas maps to
 * standalone schemas) is used as it is. A base that maps a key to itself
 * (Okta's `UserFactorPushTransaction` → `SUCCESS`) gets its own arm,
 * `<Base><Key>`.
 */

type Json = any;

/** What the rewrite did, for the convert log. */
export interface DiscriminatorStats {
  /** Schemas that became a union (component hierarchy nodes and inline copies). */
  readonly unions: number;
  /** Subtypes rewritten with their ancestors' members inline. */
  readonly subtypes: number;
  /** Arms whose discriminator two mappings give different keys (the first is kept). */
  readonly conflicts: readonly string[];
}

const isObject = (v: unknown): v is Record<string, any> =>
  v !== null && typeof v === "object" && !Array.isArray(v);

/** The discriminator property of a schema that is a base (not already a `oneOf`). */
const discriminatorOf = (node: unknown): string | undefined => {
  if (!isObject(node) || node.oneOf !== undefined || node.anyOf !== undefined) return undefined;
  const d = node.discriminator;
  if (typeof d === "string") return d;
  if (isObject(d) && typeof d.propertyName === "string") return d.propertyName;
  return undefined;
};

const mappingOf = (node: Json): Record<string, unknown> | undefined =>
  isObject(node?.discriminator) && isObject(node.discriminator.mapping)
    ? node.discriminator.mapping
    : undefined;

/** Keys that hold example data, never schemas. */
const NON_SCHEMA_KEYS = new Set(["example", "examples", "x-ms-examples", "enum"]);

const hasDiscriminator = (node: unknown): boolean => {
  if (Array.isArray(node)) return node.some(hasDiscriminator);
  if (!isObject(node)) return false;
  if (discriminatorOf(node) !== undefined) return true;
  for (const [k, v] of Object.entries(node)) {
    if (!NON_SCHEMA_KEYS.has(k) && hasDiscriminator(v)) return true;
  }
  return false;
};

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/** `Waiting (with number matching challenge)` → `WaitingWithNumberMatchingChallenge`. */
const pascalKey = (key: string): string =>
  key
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => capitalize(w.toLowerCase()))
    .join("");

/**
 * Rewrite every discriminated hierarchy of an OpenAPI 3 or Swagger 2
 * document into `oneOf` unions (see the module doc). Returns the input
 * unchanged when it has no `discriminator`; otherwise a rewritten copy.
 */
export const unionizeDiscriminators = (
  spec: unknown,
): { spec: unknown; stats: DiscriminatorStats } => {
  const none = { spec, stats: { unions: 0, subtypes: 0, conflicts: [] } };
  const input = spec as Json;
  const swagger = isObject(input) && input.swagger !== undefined;
  const inputSchemas = swagger ? input?.definitions : input?.components?.schemas;
  if (!isObject(inputSchemas) || !hasDiscriminator(input)) return none;

  const doc = structuredClone(input);
  const schemas: Record<string, Json> = swagger ? doc.definitions : doc.components.schemas;
  const prefix = swagger ? "#/definitions/" : "#/components/schemas/";
  const refTo = (name: string) => ({ $ref: `${prefix}${name}` });
  const nameOf = (ref: unknown): string | undefined => {
    if (typeof ref !== "string") return undefined;
    const name = ref.startsWith(prefix)
      ? ref.slice(prefix.length).replace(/~1/g, "/").replace(/~0/g, "~")
      : ref.includes("/") || ref.includes("#")
        ? undefined
        : ref; // OpenAPI allows a bare schema name as a mapping value
    return name !== undefined && name in schemas ? name : undefined;
  };

  // --- the inheritance graph (component `allOf` $refs) ---------------------
  const children = new Map<string, string[]>();
  const parents = new Map<string, string[]>();
  for (const [name, s] of Object.entries(schemas)) {
    if (!Array.isArray(s?.allOf)) continue;
    for (const entry of s.allOf) {
      const parent = nameOf(entry?.$ref);
      if (parent === undefined || parent === name) continue;
      children.set(parent, [...(children.get(parent) ?? []), name]);
      parents.set(name, [...(parents.get(name) ?? []), parent]);
    }
  }
  const descendants = (name: string): Set<string> => {
    const out = new Set<string>();
    const walk = (n: string) => {
      for (const c of children.get(n) ?? []) {
        if (out.has(c) || c === name) continue;
        out.add(c);
        walk(c);
      }
    };
    walk(name);
    return out;
  };

  // Hierarchy members: every component base with subtypes, and everything
  // below it. `inner` members have subtypes of their own and become unions.
  const bases = Object.keys(schemas).filter((n) => discriminatorOf(schemas[n]) !== undefined);
  const below = new Map<string, Set<string>>();
  const hierarchy = new Set<string>();
  for (const base of bases) {
    const d = descendants(base);
    if (d.size === 0) continue;
    below.set(base, d);
    hierarchy.add(base);
    for (const n of d) hierarchy.add(n);
  }
  const inner = new Set([...hierarchy].filter((n) => (children.get(n) ?? []).length > 0));
  const leaves = [...hierarchy].filter((n) => !inner.has(n));

  // --- hoist a base's inline enums ------------------------------------------
  for (const base of new Set([...bases, ...inner])) {
    const s = schemas[base];
    const discriminator = discriminatorOf(s);
    for (const [prop, def] of Object.entries<any>(s?.properties ?? {})) {
      if (prop === discriminator || !Array.isArray(def?.enum)) continue;
      const hoisted = `${base}${capitalize(prop)}`;
      if (hoisted in schemas) continue;
      schemas[hoisted] = def;
      s.properties[prop] = {
        ...refTo(hoisted),
        ...(def.description === undefined ? {} : { description: def.description }),
      };
    }
  }

  // --- discriminator keys ----------------------------------------------------
  // `pins[arm]`: discriminator property → the value that selects the arm.
  // Explicit mappings first (component bases and inline copies), then
  // `x-ms-discriminator-value`, then Swagger's implicit schema name.
  const pins = new Map<string, Map<string, string>>();
  const conflicts: string[] = [];
  const pin = (arm: string, prop: string, key: string) => {
    const own = pins.get(arm) ?? new Map<string, string>();
    pins.set(arm, own);
    const seen = own.get(prop);
    if (seen === undefined) own.set(prop, key);
    else if (seen !== key) conflicts.push(`${arm}.${prop}: ${seen} / ${key}`);
  };
  const selfArms = new Map<string, { name: string; key: string }>();
  const visitMappings = (node: unknown): void => {
    if (Array.isArray(node)) return node.forEach(visitMappings);
    if (!isObject(node)) return;
    const prop = discriminatorOf(node);
    const mapping = mappingOf(node);
    if (prop !== undefined && mapping !== undefined) {
      for (const [key, ref] of Object.entries(mapping)) {
        const target = nameOf(ref);
        if (target === undefined || !hierarchy.has(target)) continue;
        if (!inner.has(target)) pin(target, prop, key);
        else if (schemas[target] === node && !selfArms.has(target)) {
          let name = `${target}${pascalKey(key) || "Self"}`;
          for (let i = 2; name in schemas; i++) name = `${target}${pascalKey(key)}${i}`;
          selfArms.set(target, { name, key });
        }
      }
    }
    for (const [k, v] of Object.entries(node)) if (!NON_SCHEMA_KEYS.has(k)) visitMappings(v);
  };
  visitMappings(doc);
  for (const [base, d] of below) {
    const prop = discriminatorOf(schemas[base])!;
    const mapped = mappingOf(schemas[base]) !== undefined;
    for (const n of d) {
      if (inner.has(n)) continue;
      const msValue = schemas[n]?.["x-ms-discriminator-value"];
      if (typeof msValue === "string") pin(n, prop, msValue);
      else if (!mapped) pin(n, prop, n);
    }
  }

  // --- members of a hierarchy node, its ancestors inline --------------------
  const original = new Map([...hierarchy].map((n) => [n, structuredClone(schemas[n])]));
  const pinProperties = (block: Json, own: Map<string, string>, applied: Set<string>): Json => {
    if (!isObject(block?.properties)) return block;
    let properties = block.properties;
    let required: string[] | undefined;
    for (const [prop, key] of own) {
      const decl = properties[prop];
      if (decl === undefined) continue;
      const resolved = nameOf(decl?.$ref) !== undefined ? schemas[nameOf(decl.$ref)!] : decl;
      const { $ref: _ref, "x-ms-enum": _msEnum, ...rest } = isObject(resolved) ? resolved : {};
      properties = {
        ...properties,
        [prop]: {
          ...rest,
          ...(typeof decl.description === "string" ? { description: decl.description } : {}),
          enum: [key],
        },
      };
      required = [...new Set([...(required ?? block.required ?? []), prop])];
      applied.add(prop);
    }
    return required === undefined ? block : { ...block, properties, required };
  };
  const membersOf = (
    name: string,
    own: Map<string, string>,
    applied: Set<string>,
    stack: ReadonlySet<string>,
  ): Json => {
    const {
      discriminator: _d,
      "x-ms-discriminator-value": _v,
      ...body
    } = original.get(name) ?? schemas[name];
    const next = new Set([...stack, name]);
    if (Array.isArray(body.allOf)) {
      body.allOf = body.allOf.map((entry: Json) => {
        const parent = nameOf(entry?.$ref);
        if (parent !== undefined && hierarchy.has(parent) && !next.has(parent)) {
          return membersOf(parent, own, applied, next);
        }
        return entry?.$ref === undefined ? pinProperties(entry, own, applied) : entry;
      });
    }
    return pinProperties(body, own, applied);
  };
  /**
   * A subtype's description: its own, then the first of its own inline
   * `allOf` blocks', then its nearest ancestor's.
   */
  const descriptionOf = (name: string, stack: ReadonlySet<string>): string | undefined => {
    const node = original.get(name) ?? schemas[name];
    if (typeof node?.description === "string") return node.description;
    const entries: Json[] = Array.isArray(node?.allOf) ? node.allOf : [];
    for (const entry of entries) {
      if (entry?.$ref === undefined && typeof entry?.description === "string") {
        return entry.description;
      }
    }
    for (const entry of entries) {
      const parent = nameOf(entry?.$ref);
      if (parent === undefined || !hierarchy.has(parent) || stack.has(parent)) continue;
      const d = descriptionOf(parent, new Set([...stack, name]));
      if (d !== undefined) return d;
    }
    return undefined;
  };
  const armOf = (name: string, own: Map<string, string>): Json => {
    const applied = new Set<string>();
    const arm = membersOf(name, own, applied, new Set());
    const description = descriptionOf(name, new Set());
    // A discriminator no ancestor declares (one Azure base) is added.
    let properties = arm.properties;
    let required = arm.required;
    for (const [prop, key] of own) {
      if (applied.has(prop)) continue;
      properties = { ...properties, [prop]: { type: "string", enum: [key] } };
      required = [...new Set([...(required ?? []), prop])];
    }
    return {
      ...arm,
      ...(description === undefined ? {} : { description }),
      ...(properties === undefined ? {} : { properties }),
      ...(required === undefined ? {} : { required }),
    };
  };

  // --- rewrite the components ----------------------------------------------
  const armsOf = (name: string): string[] => {
    const mapping = mappingOf(original.get(name));
    if (mapping !== undefined) {
      const arms: string[] = [];
      for (const ref of Object.values(mapping)) {
        const target = nameOf(ref);
        const arm = target === name ? selfArms.get(name)?.name : target;
        if (arm !== undefined && !arms.includes(arm)) arms.push(arm);
      }
      return arms;
    }
    const d = descendants(name);
    return leaves.filter((n) => d.has(n));
  };
  let unions = 0;
  for (const name of leaves) schemas[name] = armOf(name, pins.get(name) ?? new Map());
  for (const [name, { name: arm, key }] of selfArms) {
    schemas[arm] = armOf(name, new Map([[discriminatorOf(original.get(name))!, key]]));
  }
  for (const name of inner) {
    const arms = armsOf(name);
    const s = original.get(name);
    if (arms.length === 0) {
      schemas[name] = membersOf(name, new Map(), new Set(), new Set());
      continue;
    }
    unions++;
    schemas[name] = {
      ...(typeof s.description === "string" ? { description: s.description } : {}),
      ...(s.nullable === true ? { nullable: true } : {}),
      ...(s["x-nullable"] === true ? { "x-nullable": true } : {}),
      oneOf: arms.map(refTo),
    };
  }

  // --- the rest of the document ----------------------------------------------
  // Inline copies of a discriminated schema, and component bases whose
  // mapping names standalone schemas, become a `oneOf` over the mapping. An
  // inline `allOf` that extends a hierarchy node takes its members inline,
  // as a component subtype does.
  const rewrite = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(rewrite);
    if (!isObject(node)) return node;
    const mapping = discriminatorOf(node) === undefined ? undefined : mappingOf(node);
    if (mapping !== undefined) {
      const arms = [
        ...new Set(
          Object.values(mapping)
            .map(nameOf)
            .filter((n) => n !== undefined),
        ),
      ];
      if (arms.length > 0) {
        unions++;
        return {
          ...(typeof node.description === "string" ? { description: node.description } : {}),
          ...(node.nullable === true ? { nullable: true } : {}),
          oneOf: arms.map((n) => refTo(n!)),
        };
      }
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      if (NON_SCHEMA_KEYS.has(k)) out[k] = v;
      else if (k === "allOf" && Array.isArray(v) && (v.length > 1 || node.properties)) {
        out[k] = v.map((entry: Json) => {
          const parent = nameOf(entry?.$ref);
          return parent !== undefined && inner.has(parent)
            ? membersOf(parent, new Map(), new Set(), new Set())
            : rewrite(entry);
        });
      } else out[k] = rewrite(v);
    }
    return out;
  };
  const rewritten = rewrite(doc) as Json;
  return {
    spec: rewritten,
    stats: { unions, subtypes: leaves.length + selfArms.size, conflicts },
  };
};
