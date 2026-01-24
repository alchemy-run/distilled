import type { Fragment } from "../fragment.ts";

export const isFile = (x: any): x is File => x?.type === "file";

export interface IFile<
  Name extends string,
  Language extends string,
  References extends any[],
> extends Fragment<"file", Name, References> {
  readonly language: Language;
}

export type File<
  Name extends string = string,
  Language extends string = string,
  References extends any[] = any[],
> = IFile<Name, Language, References> & {
  new (_: never): IFile<Name, Language, References>;
};

export const File =
  <Name extends string, Language extends string>(
    name: Name,
    language: Language,
  ) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    class {
      static readonly type = "file";
      static readonly id = name;
      static readonly references = references;
      static readonly template = template;
      static readonly language = language;
      constructor(_: never) {}
    } as any as File<Name, Language, References>;
