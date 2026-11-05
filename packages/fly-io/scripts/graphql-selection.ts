/**
 * A subset of Fly's GraphQL schema (the spec mirror's `graphql.json`, the
 * full introspection of https://api.fly.io/graphql): types mapped to `null`
 * are kept whole; otherwise only the listed fields, each mapped to `null` to
 * keep all of its arguments or to the argument names to keep. Everything
 * about a kept field (type, nullability, arguments) comes from the schema.
 */
export type GraphQLSelection = Readonly<
  Record<string, Readonly<Record<string, readonly string[] | null>> | null>
>;

/** The schema reduced to `selection`, in selection order. */
export const selectSchema = (schema: any, selection: GraphQLSelection, label: string): any => {
  const byName = new Map<string, any>(schema.types.map((t: any) => [t.name, t]));
  const types = Object.entries(selection).map(([name, fields]) => {
    const type = byName.get(name);
    if (type === undefined)
      throw new Error(`${label}: type ${name} is not in the Fly GraphQL schema`);
    if (fields === null) return type;
    const key = type.inputFields ? "inputFields" : "fields";
    const byField = new Map<string, any>(type[key].map((f: any) => [f.name, f]));
    return {
      ...type,
      [key]: Object.entries(fields).map(([fieldName, args]) => {
        const field = byField.get(fieldName);
        if (field === undefined) {
          throw new Error(`${label}: ${name}.${fieldName} is not in the Fly GraphQL schema`);
        }
        return args === null
          ? field
          : { ...field, args: field.args.filter((a: any) => args.includes(a.name)) };
      }),
    };
  });
  return { ...schema, types };
};
