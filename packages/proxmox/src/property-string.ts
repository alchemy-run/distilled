/**
 * Property strings (hand-written runtime).
 *
 * Many Proxmox settings are strings of comma-separated `key=value` pairs
 * (`name=eth0,bridge=vmbr0,ip=dhcp`), with an optional unnamed first value
 * and key aliases. {@link propertyString} builds a codec from a format's
 * structure; `property-strings.ts` holds the generated one for every
 * property-string member.
 */

/** The fields of a property-string format that the codec reads. */
export interface PropertyField {
  readonly type?: string;
  readonly optional?: number | boolean;
  readonly default_key?: number;
  readonly alias?: string;
  readonly keyAlias?: string;
  readonly enum?: readonly (string | number)[];
}
export type PropertyFormat = Readonly<Record<string, PropertyField>>;
type Value<F extends PropertyField> = F extends { type: "boolean" }
  ? boolean
  : F extends { type: "integer" | "number" }
    ? number
    : F extends { enum: readonly (infer E)[] }
      ? E
      : string;
type Canonical<F extends PropertyFormat> = {
  [K in keyof F as F[K] extends { alias: string } ? never : K]: Value<F[K]>;
};
export type PropertyValue<F extends PropertyFormat> = {
  [K in keyof Canonical<F> as F[K] extends { optional: 1 | true } ? never : K]: Canonical<F>[K];
} & {
  [K in keyof Canonical<F> as F[K] extends { optional: 1 | true } ? K : never]?: Canonical<F>[K];
};

/** A malformed property string. Values are deliberately excluded from the error. */
export class PropertyStringError extends Error {
  readonly key: string;
  constructor(key: string, reason: string) {
    super(`Invalid property string field ${key}: ${reason}`);
    this.name = "PropertyStringError";
    this.key = key;
  }
}

/** One parser for all schema-defined formats, including default keys and aliases. */
export function propertyString<const F extends PropertyFormat>(format: F) {
  const defaultKey = Object.keys(format).find((key) => format[key].default_key);
  function decode(input: string): PropertyValue<F> {
    const result: Record<string, string | number | boolean> = {};
    const assign = (key: string, value: string) => {
      if (Object.hasOwn(result, key)) throw new PropertyStringError(key, "duplicate key");
      const field = format[key];
      if (!field) throw new PropertyStringError(key, "unknown key");
      if (field.type === "boolean") {
        if (!/^(?:0|1|true|false|on|off|yes|no)$/.test(value))
          throw new PropertyStringError(key, "expected boolean");
        result[key] = /^(?:1|true|on|yes)$/.test(value);
      } else if (field.type === "integer" || field.type === "number") {
        const number = Number(value);
        if (
          !value.trim() ||
          !Number.isFinite(number) ||
          (field.type === "integer" && !Number.isInteger(number))
        )
          throw new PropertyStringError(key, "expected finite number");
        result[key] = number;
      } else result[key] = value;
      const parsed = result[key];
      if (field.enum && (typeof parsed === "boolean" || !field.enum.includes(parsed)))
        throw new PropertyStringError(key, "unexpected enum member");
    };
    for (const [index, part] of (input === "" ? [] : input.split(",")).entries()) {
      const equals = part.indexOf("=");
      const key = equals < 0 ? defaultKey : part.slice(0, equals);
      const value = equals < 0 ? part : part.slice(equals + 1);
      if (!key || (equals < 0 && index !== 0))
        throw new PropertyStringError("", "unnamed value must be first");
      const field = format[key];
      if (field?.alias) {
        if (field.keyAlias) assign(field.keyAlias, key);
        assign(field.alias, value);
      } else assign(key, value);
    }
    for (const [key, field] of Object.entries(format)) {
      if (!field.alias && !field.optional && !Object.hasOwn(result, key))
        throw new PropertyStringError(key, "required key missing");
    }
    // The schema-driven checks above establish the generated type at this boundary.
    return result as PropertyValue<F>;
  }
  function encode(input: PropertyValue<F>): string {
    const parts: string[] = [];
    const entries = Object.entries(input).sort(([a], [b]) =>
      a === defaultKey ? -1 : b === defaultKey ? 1 : a.localeCompare(b),
    );
    for (const [key, value] of entries) {
      if (value === undefined) continue;
      if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean")
        throw new PropertyStringError(key, "expected scalar");
      const text = typeof value === "boolean" ? (value ? "1" : "0") : String(value);
      if (text.includes(",") || (key === defaultKey && text.includes("=")))
        throw new PropertyStringError(key, "ambiguous delimiter");
      parts.push(key === defaultKey ? text : `${key}=${text}`);
    }
    const encoded = parts.join(",");
    decode(encoded);
    return encoded;
  }
  return { format, decode, encode };
}
