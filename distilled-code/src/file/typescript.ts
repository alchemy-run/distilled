import { File } from "./file.ts";

export type TypeScriptID = `${string}.ts` | `${string}.tsx`;

export const TypeScript =
  <ID extends TypeScriptID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "typescript")(template, ...references);
