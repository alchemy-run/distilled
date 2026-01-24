import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import type { YieldWrap } from "effect/Utils";
import type { Fragment } from "../fragment.ts";
import { isInput, type Input } from "../input.ts";
import { isOutput, type Output } from "../output.ts";

export const isTool = (x: any): x is Tool => x?.type === "tool";

export interface ITool<
  ID extends string,
  Input,
  Output,
  Err = never,
  Req = never,
  References extends any[] = any[],
> extends Fragment<"tool", ID, References> {
  readonly input: S.Schema<Input>;
  readonly output: S.Schema<Output>;
  readonly alias: ((model: string) => string | undefined) | undefined;
  readonly handler: (
    ...args: void extends Input ? [] : [Input]
  ) => Effect.Effect<Output, Err, Req>;
  /** @internal phantom */
  readonly Req: Req;
}

export interface Tool<
  ID extends string = string,
  Input = any,
  Output = any,
  Err = any,
  Req = any,
  References extends any[] = any[],
> extends ITool<ID, Input, Output, Err, Req, References> {
  new (_: never): ITool<ID, Input, Output, Err, Req, References>;
}

export declare namespace Tools {
  export type Of<References extends any[]> = References extends [
    infer Ref,
    ...infer Rest,
  ]
    ? Ref extends ITool<
        infer _ID extends string,
        infer _Input,
        infer _Output,
        infer _Err,
        infer _Req,
        infer _References
      >
      ? [Ref, ...Tools.Of<Rest>]
      : Tools.Of<Rest>
    : [];
}

export const tool =
  <ID extends string>(
    id: ID,
    options?: {
      alias?: (model: string) => string | undefined;
    },
  ) =>
  <const References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
  <Eff extends YieldWrap<Effect.Effect<any, any, any>>>(
    handler: (
      input: Input.Of<References>,
    ) => Generator<Eff, NoInfer<Output.Of<References>>, never>,
  ) =>
    ({
      type: "tool",
      id,
      alias: options?.alias,
      input: deriveSchema(references, isInput),
      output: deriveSchema(references, isOutput) ?? S.Any,
      references,
      template,
      handler: Effect.fn(handler),
    }) as any as Tool<
      ID,
      {
        [prop in keyof Input.Of<References>]: Input.Of<References>[prop];
      },
      Output.Of<References>,
      [Eff] extends [never]
        ? never
        : [Eff] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
          ? E
          : never,
      [Eff] extends [never]
        ? never
        : [Eff] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
          ? R
          : never,
      References
    >;

const deriveSchema = (
  references: any[],
  predicate: (artifact: any) => boolean,
) => {
  const matches = references.filter(predicate);
  if (matches.length === 0) {
    return undefined;
  }
  return S.Struct(
    Object.fromEntries(
      references.filter(predicate).map((artifact) => {
        // Get the description from the template if available
        const description = artifact.template
          ? artifact.template.join("").trim()
          : undefined;
        // Annotate the schema with the description if present
        const schema = description
          ? artifact.schema.annotations({ description })
          : artifact.schema;
        return [artifact.id, schema];
      }),
    ),
  );
};
