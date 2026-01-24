import { File } from "./file.ts";

export type FolderID = `${string}/`;

export const Folder =
  <ID extends FolderID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "folder")(template, ...references);
