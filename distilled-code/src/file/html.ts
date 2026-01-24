import { File } from "./file.ts";

export type HtmlID = `${string}.html` | `${string}.htm`;

export const Html =
  <ID extends HtmlID>(ID: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(ID, "html")(template, ...references);
