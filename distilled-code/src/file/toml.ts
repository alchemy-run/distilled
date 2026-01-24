import { File } from "./file.ts";

export type TomlID = `${string}.toml`;

export const Toml =
  <ID extends TomlID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "toml")(template, ...references);
