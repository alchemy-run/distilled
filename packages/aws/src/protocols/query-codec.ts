/**
 * Form-encoded request bodies for awsQuery and ec2Query, driven by the
 * operation descriptor.
 *
 * - awsQuery: keys are member names (or xmlName); lists are `Key.member.N`
 *   (or `Key.N` when flattened); maps are `Key.entry.N.key/value`.
 * - ec2Query: keys are capitalized member names (or ec2QueryName); every
 *   list is flattened as `Key.N`.
 *
 * Descriptors only mention members whose key breaks those rules; timestamps
 * (ISO 8601 by default), bytes and Redacted values are recognised by type.
 */
import {
  formatTimestamp,
  isStruct,
  ListShape,
  MapShape,
  resolve,
  shapeOf,
  specOf,
  timestampFormatOf,
  toBase64,
  unwrapRedacted,
  type Shape,
} from "@distilled.cloud/core/shape";

export type QueryDialect = "awsQuery" | "ec2Query";

const encode = (key: string, value: string) =>
  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const serializeQuery = (
  dialect: QueryDialect,
  value: unknown,
  shape: Shape | undefined,
  key: string,
  params: string[],
): void => {
  const v = unwrapRedacted(value);
  if (v === undefined || v === null) return;
  const s = resolve(shape);

  if (v instanceof Date) {
    params.push(
      encode(
        key,
        String(formatTimestamp(v, timestampFormatOf(s) ?? "date-time")),
      ),
    );
    return;
  }
  if (v instanceof Uint8Array) {
    params.push(encode(key, toBase64(v)));
    return;
  }
  if (typeof v !== "object") {
    params.push(encode(key, String(v)));
    return;
  }

  if (Array.isArray(v)) {
    // Empty lists are not serialized
    if (v.length === 0) return;
    const list = s instanceof ListShape ? s : undefined;
    const flat = dialect === "ec2Query" || list?.flat === true;
    const item = list?.item ?? "member";
    for (let i = 0; i < v.length; i++) {
      const itemKey = flat ? `${key}.${i + 1}` : `${key}.${item}.${i + 1}`;
      serializeQuery(dialect, v[i], list?.element, itemKey, params);
    }
    return;
  }

  if (s instanceof MapShape) {
    const entries = Object.entries(v as Record<string, unknown>).filter(
      ([, item]) => item !== undefined,
    );
    const keyName = s.keyName ?? "key";
    const valueName = s.valueName ?? "value";
    entries.forEach(([k, item], i) => {
      const prefix = s.flat ? `${key}.${i + 1}` : `${key}.entry.${i + 1}`;
      params.push(encode(`${prefix}.${keyName}`, k));
      serializeQuery(dialect, item, s.value, `${prefix}.${valueName}`, params);
    });
    return;
  }

  serializeQueryMembers(
    dialect,
    v as Record<string, unknown>,
    isStruct(s) ? s : undefined,
    key,
    params,
  );
};

export const serializeQueryMembers = (
  dialect: QueryDialect,
  value: Record<string, unknown>,
  struct: Readonly<Record<string, unknown>> | undefined,
  prefix: string,
  params: string[],
): void => {
  for (const name in value) {
    // Closed structure: keys the model doesn't have are dropped
    if (struct !== undefined && !(name in struct)) continue;
    const member = struct?.[name];
    const spec = specOf(member as never);
    const wire =
      spec?.wire ?? (dialect === "ec2Query" ? upperFirst(name) : name);
    serializeQuery(
      dialect,
      value[name],
      shapeOf(member as never),
      prefix ? `${prefix}.${wire}` : wire,
      params,
    );
  }
};
