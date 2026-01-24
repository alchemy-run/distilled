import { File } from "./file.ts";

export type CssID = `${string}.css`;

export const Css =
  <ID extends CssID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "css")(template, ...references);
