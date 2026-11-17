/**
 * GraphQL introspection reading (dev-time only).
 *
 * The types of a GraphQL introspection result and {@link readIntrospection},
 * which accepts the shapes real spec mirrors ship. The Query SDK generator
 * (`graphql-client.ts`) builds its model from these.
 */

// ============================================================================
// GraphQL introspection types (subset of the canonical spec)
// ============================================================================

export type TypeKind =
  | "SCALAR"
  | "OBJECT"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "INPUT_OBJECT"
  | "LIST"
  | "NON_NULL";

export interface TypeRef {
  kind: TypeKind;
  name?: string | null;
  ofType?: TypeRef | null;
}

export interface InputValue {
  name: string;
  description?: string | null;
  type: TypeRef;
  defaultValue?: string | null;
}

export interface Field {
  name: string;
  description?: string | null;
  args: InputValue[];
  type: TypeRef;
  isDeprecated?: boolean;
}

export interface IntrospectionType {
  kind: TypeKind;
  name: string;
  description?: string | null;
  fields?: Field[] | null;
  inputFields?: InputValue[] | null;
  enumValues?: Array<{ name: string; isDeprecated?: boolean }> | null;
  possibleTypes?: TypeRef[] | null;
}

export interface IntrospectionSchema {
  queryType: { name: string };
  mutationType?: { name: string } | null;
  subscriptionType?: { name: string } | null;
  types: IntrospectionType[];
}

/**
 * Pull the `__schema` out of an introspection response, accepting either the
 * bare schema, `{ __schema }`, or a full `{ data: { __schema } }` envelope —
 * all three are shipped by real mirrors.
 */
export const readIntrospection = (json: unknown): IntrospectionSchema => {
  const j = json as {
    data?: { __schema?: IntrospectionSchema };
    __schema?: IntrospectionSchema;
    types?: unknown;
  };
  const schema = j?.data?.__schema ?? j?.__schema ?? (j?.types ? (j as any) : undefined);
  if (!schema) {
    throw new Error(
      "introspection JSON has none of `data.__schema`, `__schema`, or a top-level `types`",
    );
  }
  return schema as IntrospectionSchema;
};
