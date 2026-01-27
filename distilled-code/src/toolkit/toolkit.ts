import type { Fragment } from "../fragment.ts";
import { isTool, type Tool } from "../tool/tool.ts";
import { collectFlat } from "../util/collect-references.ts";

export const isToolkit = (x: any): x is Toolkit => x?.type === "toolkit";

export type IToolkit<
  ID extends string,
  Tools extends Tool[],
  References extends any[] = any[],
> = Fragment<"toolkit", ID, References> & {
  readonly tools: Tools;
};

export type Toolkit<
  Name extends string = string,
  Tools extends Tool[] = Tool[],
  References extends any[] = any[],
> = IToolkit<Name, Tools, References> & {
  new (_: never): IToolkit<Name, Tools, References>;
};

export const Toolkit =
  <ID extends string>(id: ID) =>
  <const References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) => {
    const tools = collectFlat(references, isTool);
    return class {
      static readonly type = "toolkit";
      static readonly id = id;
      static readonly tools = tools;
      static readonly template = template;
      static readonly references = references;
      constructor(_: never) {}
    } as any as Toolkit<ID, ExtractTools<References>, References>;
  };

type ExtractTools<
  References extends any[],
  Tools extends Tool[] = [],
> = References extends [infer x, ...infer xs]
  ? x extends Tool
    ? ExtractTools<xs, [...Tools, x]>
    : ExtractTools<xs, Tools>
  : Tools;
