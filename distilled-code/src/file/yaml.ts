import { File } from "./file.ts";

export type YamlID = `${string}.yaml` | `${string}.yml`;

export const Yaml =
  <ID extends YamlID>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    File(id, "yaml")(template, ...references);
