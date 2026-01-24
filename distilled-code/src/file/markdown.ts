import { File } from "./file.ts";

export type MarkdownID = `${string}.md`;

export const Markdown =
  <ID extends MarkdownID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "markdown")(template, ...references);
