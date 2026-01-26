import * as S from "effect/Schema";
import type { Fragment } from "./fragment.ts";
import type { IsNever } from "./util/types.ts";

export const isOutput = (
  artifact: any,
): artifact is Output<any, any, any[]> => {
  return artifact?.type === "output";
};
export interface IOutput<
  Name extends string,
  Schema extends S.Schema<any>,
  References extends any[],
> extends Fragment<"output", Name, References> {
  readonly schema: Schema;
}

export interface Output<
  Name extends string,
  Schema extends S.Schema<any>,
  References extends any[],
> extends IOutput<Name, Schema, References> {
  new (_: never): IOutput<Name, Schema, References>;
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ): Output<Name, Schema, References>;
}

export declare namespace Output {
  export type Of<
    References extends any[],
    Outputs = never,
    Primitives = never,
  > = References extends []
    ? Outputs | Primitives extends never
      ? void
      : Outputs | Primitives
    : References extends [infer Ref, ...infer Rest]
      ? Ref extends IOutput<
          infer Name extends string,
          infer Schema,
          // TODO(sam): do anything with this?
          infer _References
        >
        ? Output.Of<
            Rest,
            (IsNever<Outputs> extends true ? {} : Outputs) & {
              [name in Name]: Schema["Type"];
            },
            Primitives
          >
        : Ref extends S.Schema<infer T>
          ? Output.Of<Rest, Outputs, Primitives | T>
          : Output.Of<Rest, Outputs, Primitives>
      : [];
}

export const output = <
  ID extends string,
  Schema extends S.Schema<any> = S.Schema<string>,
>(
  id: ID,
  schema: Schema = S.String as any as Schema,
): Output<ID, Schema, []> => {
  const props = (
    template: TemplateStringsArray | undefined,
    references: any[],
  ) => ({
    type: "output",
    id,
    schema,
    template,
    references,
  });
  const output = (template: TemplateStringsArray, ...references: any[]) =>
    Object.assign(output, props(template, references));
  return Object.assign(output, props(undefined, [])) as any as Output<
    ID,
    Schema,
    []
  >;
};
