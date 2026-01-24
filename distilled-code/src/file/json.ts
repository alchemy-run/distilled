import { File } from "./file.ts";

export type JsonID = `${string}.json` | `${string}.jsonc`;

export const Json =
  <ID extends JsonID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "json")(template, ...references);
