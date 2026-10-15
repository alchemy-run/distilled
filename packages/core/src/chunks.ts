/**
 * Generated schema consts built from chunked builder functions.
 *
 * A generated service module declares thousands of schema consts. Evaluating
 * each initializer at import allocated a thunk closure, its compiled-function
 * record, a lazy wrapper and an annotation object -- about 330 bytes a
 * schema. The generator now moves the initializers into builder functions
 * of a few schemas each (`switch (j) { case 0: return S.Struct(...) }`), and
 * every const is a small lazy schema holding its builder and index:
 *
 *   const Customer = /*@__PURE__*\/ __L.at(__c12, 3) as any as S.Schema<Customer>;
 *   function __c12(j: number) { switch (j) { case 3: return S.suspend(...) } }
 *
 * The initializer runs on first use, exactly as written, so the schema is
 * the same. V8 compiles a builder only when one of its schemas is first
 * used, and the code text lives only in the module source.
 */
import type * as S from "effect/Schema";
import { lazyFrom, type LazyBuilder } from "./schema.ts";

const builders = /*@__PURE__*/ new WeakMap<(j: number) => unknown, LazyBuilder>();

/** Schema `j` of the chunk `build`, built on first use. */
// `any`: each const keeps the type it declares or casts to.
export const at = (build: (j: number) => unknown, j: number): any => {
  let builder = builders.get(build);
  if (!builder)
    builders.set(build, (builder = { build: (data) => build(data as number) as S.Top }));
  return lazyFrom(builder, j);
};
