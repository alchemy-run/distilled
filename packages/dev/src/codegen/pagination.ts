/**
 * Shared pagination-trait handling for the SDK generators (dev-time only).
 *
 * Both SDKs source `smithy.api#paginated`; AWS merges operation-level
 * config over service-level defaults, cloudflare validates the trait
 * against the operation's actual members (degrading to a plain op when it
 * can't work). Both behaviors live here.
 */
import type { PaginatedTrait } from "@distilled.cloud/core/pagination";

/**
 * Merge an operation-level paginated trait over service-level defaults
 * (Smithy semantics: operations may specify partial pagination and inherit
 * the rest from the service).
 */
export const mergePaginated = (
  op: Partial<PaginatedTrait> | undefined,
  service: Partial<PaginatedTrait> | undefined,
): PaginatedTrait | undefined => {
  if (!op) return undefined;
  const merged = {
    mode: op.mode ?? service?.mode,
    inputToken: op.inputToken ?? service?.inputToken,
    outputToken: op.outputToken ?? service?.outputToken,
    items: op.items ?? service?.items,
    pageSize: op.pageSize ?? service?.pageSize,
  };
  return Object.fromEntries(
    Object.entries(merged).filter(([, v]) => v !== undefined),
  ) as PaginatedTrait;
};

export interface ValidatePaginatedOptions {
  readonly trait: Partial<PaginatedTrait>;
  /** TS-facing member names of the operation input shape. */
  readonly inputNames: ReadonlySet<string>;
  /** TS-facing member names of the operation output shape. */
  readonly outputNames: ReadonlySet<string>;
  /** Items path fallback when the trait omits `items` (e.g. `"result"`). */
  readonly itemsFallback?: string;
  /** Output names accepted even when not modeled (e.g. `"resultInfo"`). */
  readonly syntheticOutputs?: ReadonlySet<string>;
}

export interface ValidatedPagination {
  readonly ok: boolean;
  /** Root member of the items path (`"result.items"` → `"result"`). */
  readonly itemsRoot: string;
}

/** A trait field a pagination strategy reads to walk the pages. */
export type PaginationField = "inputToken" | "outputToken" | "items";

/**
 * The trait fields each core strategy reads (`core/src/pagination.ts`).
 * A strategy given a trait without them dies on the first page.
 */
export const CORE_STRATEGY_FIELDS: Readonly<Record<string, readonly PaginationField[]>> = {
  paginateToken: ["inputToken", "outputToken"],
  paginatePageNumber: ["inputToken", "outputToken"],
  paginateCursor: ["inputToken", "outputToken"],
  paginateRelay: ["inputToken", "outputToken"],
  paginateKeyset: ["inputToken", "outputToken", "items"],
  paginateLink: ["inputToken"],
  paginateSingle: [],
};

const MODE_STRATEGY: Readonly<Record<string, string>> = {
  token: "paginateToken",
  page: "paginatePageNumber",
  cursor: "paginateCursor",
  relay: "paginateRelay",
  link: "paginateLink",
  keyset: "paginateKeyset",
  single: "paginateSingle",
};

/** The fields core's `paginateWithDefaults` reads for the trait's mode (default `token`). */
export const defaultStrategyFields = (trait: Partial<PaginatedTrait>): readonly PaginationField[] =>
  CORE_STRATEGY_FIELDS[MODE_STRATEGY[trait.mode ?? "token"] ?? "paginateToken"]!;

/**
 * Throws when a paginated op's trait lacks a field its strategy reads: the
 * op would otherwise ship and die on its first `.pages()` call.
 */
export const assertPaginationFields = (
  operation: string,
  strategy: string,
  fields: readonly PaginationField[],
  trait: Partial<PaginatedTrait>,
): void => {
  const missing = fields.filter((f) => typeof trait[f] !== "string" || trait[f] === "");
  if (missing.length > 0) {
    throw new Error(
      `${operation}: ${strategy} needs ${missing.join(", ")} in smithy.api#paginated ` +
        `(has ${JSON.stringify(trait)}). Patch the operation's trait.`,
    );
  }
};

/**
 * A paginated op must actually carry its page/cursor token on the input
 * and its items member on the output — otherwise `.pages()` would loop or
 * yield nothing. Returns the items-path root for emitters that promote it
 * to required.
 */
export const validatePaginated = (o: ValidatePaginatedOptions): ValidatedPagination => {
  const itemsRoot = String(o.trait.items ?? o.itemsFallback ?? "").split(".")[0];
  const tokenOk =
    o.trait.mode === "single" ||
    // A dotted token (`pagination.createdBefore`) lives in a nested input member.
    (typeof o.trait.inputToken === "string" && o.inputNames.has(o.trait.inputToken.split(".")[0]!));
  const itemsOk = o.outputNames.has(itemsRoot) || (o.syntheticOutputs?.has(itemsRoot) ?? false);
  return { ok: tokenOk && itemsOk, itemsRoot };
};
