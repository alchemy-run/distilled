/**
 * Lightweight SDK error classes.
 *
 * Every modeled error is one small class: a `_tag` discriminator, the
 * categories the retry policy and `Category.catch*` helpers read, and the
 * wire metadata the protocols use to match a response onto the class. The
 * class carries no schema; the response's error fields are assigned as-is.
 */
import type * as Cause from "effect/Cause";
import * as Data from "effect/Data";
import type * as Types from "effect/Types";
import { categoriesKey, type Category } from "./category.ts";

/**
 * Wire facts a provider's protocol uses to match a response onto an error
 * class (status codes, wire codes, message matchers, header-bound members).
 * The shape is owned by each provider's protocol; core only stores it.
 */
export type ErrorMeta = object;

export const errorMetaKey: unique symbol = Symbol.for(
  "@distilled.cloud/core/error-meta",
) as any;

export type CategoryBrand<Cats extends readonly Category[]> = [
  Cats[number],
] extends [never]
  ? {}
  : { readonly [categoriesKey]: { readonly [K in Cats[number]]: true } };

export interface TaggedErrorClass<
  Tag extends string,
  Cats extends readonly Category[],
> {
  new <A extends Record<string, any> = {}>(
    args: Types.VoidIfEmpty<{
      readonly [P in keyof A as P extends "_tag" ? never : P]: A[P];
    }>,
  ): Cause.YieldableError & { readonly _tag: Tag } & Readonly<A> &
    CategoryBrand<Cats>;
  readonly _tag: Tag;
  readonly [errorMetaKey]: ErrorMeta | undefined;
}

/** Any error class created by {@link TaggedError}. */
export interface AnyErrorClass {
  new (args: any): Cause.YieldableError & { readonly _tag: string };
  readonly _tag: string;
  readonly [errorMetaKey]?: ErrorMeta | undefined;
}

const Base = Data.Error as new (args: any) => Cause.YieldableError;

/**
 * Create an error class.
 *
 * ```ts
 * export class NoSuchBucket extends TaggedError("NoSuchBucket", ["NotFoundError"], { status: 404 })<{
 *   message?: string;
 * }> {}
 * ```
 */
export const TaggedError = <
  const Tag extends string,
  const Cats extends readonly Category[] = readonly [],
>(
  tag: Tag,
  categories?: Cats,
  meta?: ErrorMeta,
): TaggedErrorClass<Tag, Cats> => {
  const C = class extends Base {
    constructor(args: any) {
      super(args);
      (this as any)._tag = tag;
    }
  };
  const proto = C.prototype as any;
  proto.name = tag;
  if (categories !== undefined && categories.length > 0) {
    const cats: Record<string, true> = {};
    for (const c of categories) cats[c] = true;
    proto[categoriesKey] = cats;
  }
  (C as any)._tag = tag;
  (C as any)[errorMetaKey] = meta;
  return C as any;
};

/** The wire metadata of an error class, typed by the calling protocol. */
export const metaOf = <M extends ErrorMeta = ErrorMeta>(
  cls: AnyErrorClass,
): M | undefined => cls[errorMetaKey] as M | undefined;
