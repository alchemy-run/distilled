/**
 * Pagination utilities for streaming through paginated API responses.
 *
 * Supports multiple pagination styles:
 * - Page-based: page/per_page with a page number that advances
 * - Cursor-based: cursor/limit with an opaque next-cursor string
 * - Token-based (AWS style): NextToken/MaxResults continuation tokens
 * - Relay (GraphQL connections): after/first with a `pageInfo` block whose
 *   `hasNextPage` -- not the cursor -- marks the end
 * - Link: the next page's token is a query parameter of the `rel="next"` URL
 *   in the `Link` response header (RFC 8288; GitHub, Okta, Sentry)
 * - Single: one-shot list endpoints that still expose the paginated surface
 *
 * Each SDK stores a {@link PaginatedTrait} on its operations (sourced from the
 * `smithy.api#paginated` trait in its models) and picks a
 * {@link PaginationStrategy}; these shared utilities handle the streaming.
 * Ported from the distilled repo's `core/pagination`.
 */
import type * as Arr from "effect/Array";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

/**
 * Get a value from an object using a dot-separated path (e.g.
 * `"resultInfo.page"`). Used for pagination traits and nested access.
 */
export const getPath = (obj: unknown, path: string): unknown => {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/**
 * Collect the items a dot-separated path selects, flattening arrays as it
 * goes. Unlike {@link getPath} (which walks a single value and is used for
 * cursors/tokens), every segment here fans out over whatever the previous one
 * produced, so a path may cross a list:
 *
 * - `"items"` on `{ items: [a, b] }` -> `[a, b]` (the common flat case)
 * - `"edges.node"` on a Relay connection -> every edge's `node`
 *
 * `null`/`undefined` links are dropped rather than propagated, so a partially
 * null page yields the items it does have instead of nothing.
 */
export const getItems = (obj: unknown, path: string): readonly unknown[] => {
  let current: unknown[] = [obj];
  for (const part of path.split(".")) {
    const next: unknown[] = [];
    for (const value of current) {
      if (value == null || typeof value !== "object") continue;
      const child = (value as Record<string, unknown>)[part];
      if (Array.isArray(child)) {
        for (const item of child) next.push(item);
      } else if (child != null) next.push(child);
    }
    current = next;
  }
  return current;
};

// ============================================================================
// Pagination Trait
// ============================================================================

/** Pagination trait describing how to navigate between pages. */
export interface PaginatedTrait {
  /** Pagination strategy */
  readonly mode?: "token" | "page" | "cursor" | "relay" | "link" | "single";
  /**
   * The name of the input member containing the page/cursor token. In link
   * mode it is also the query parameter read from the `rel="next"` URL.
   */
  readonly inputToken?: string;
  /** The path to the output member containing the next page/cursor token */
  readonly outputToken?: string;
  /**
   * The path to the output member containing the paginated items. Segments
   * may cross arrays -- `"edges.node"` walks every edge and collects its
   * `node` (see {@link getItems}).
   */
  readonly items?: string;
  /** The name of the input member that limits page size */
  readonly pageSize?: string;
  /**
   * Relay extension: the path to the boolean that says whether another page
   * exists (`"pageInfo.hasNextPage"`). Relay connections keep returning the
   * last page's `endCursor` after the end, so the cursor alone can't
   * terminate traversal -- see {@link paginateRelay}.
   */
  readonly hasNextPage?: string;
}

export type PaginationStrategy = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
) => Stream.Stream<Output, E, R>;

const missingPaginationConfig = (kind: string) => Stream.die(new Error(kind));

/**
 * Whether a continuation token/cursor returned by a paginated operation
 * means "no more pages".
 *
 * APIs mark the terminal page by omitting the output token, returning it
 * as `null`, or -- for several services (e.g. SSM, CloudWatch Logs) -- as an
 * empty string. Treating `""` as a live token re-requests the first page
 * forever (or fails with a ValidationException). Object tokens (e.g.
 * DynamoDB's `LastEvaluatedKey`) are always truthy and unaffected.
 */
export const isTerminalToken = (token: unknown): boolean =>
  token === undefined || token === null || token === "";

/**
 * Stream for single-shot list endpoints that still expose the paginated
 * surface -- emits exactly one page.
 */
export const paginateSingle: PaginationStrategy = (operation, input) =>
  // `Stream.fromEffect` keeps `mapEffect`'s concurrency machinery out of bundles.
  Stream.fromEffect(Effect.suspend(() => operation(input)));

// ============================================================================
// Page-based Pagination
// ============================================================================

/**
 * Stream of pages using page-number pagination. The next page is taken from
 * `outputToken` when it advances; otherwise the page number is incremented,
 * terminating when a page comes back with no items (or no token).
 */
export const paginatePageNumber = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const inputToken = pagination.inputToken;
  const outputToken = pagination.outputToken;
  if (!inputToken || !outputToken) {
    return missingPaginationConfig("Page-number pagination requires inputToken and outputToken");
  }
  type State = { page: number; done: boolean };
  const startPage = typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;

  return Stream.unfold({ page: startPage, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = { ...input, [inputToken]: state.page } as Input;
      const response = yield* operation(requestPayload);

      const nextPage = getPath(response, outputToken) as number | null | undefined;

      // Some APIs report the CURRENT page at `outputToken` rather than the
      // next one (e.g. Cloudflare's `result_info.page`). Taking that value as
      // the next page re-requests the same page forever. Only accept an
      // *advancing* page number; otherwise advance by one and terminate when
      // a page comes back with no items (or the token is absent). A `null`
      // items member (e.g. `result: null`) is an empty page, as in `getItems`.
      const items = pagination.items
        ? (getPath(response, pagination.items) as readonly unknown[] | null | undefined)
        : undefined;

      const nextState: State = {
        page: typeof nextPage === "number" && nextPage > state.page ? nextPage : state.page + 1,
        done:
          nextPage === null ||
          nextPage === undefined ||
          items === null ||
          (items !== undefined && items.length === 0),
      };

      return [response, nextState] as const;
    }),
  );
};

// ============================================================================
// Cursor-based Pagination
// ============================================================================

/**
 * Stream of pages using cursor-based pagination -- follow `outputToken`
 * cursors until one comes back absent or repeats a previously requested cursor.
 * Empty pages still advance when they return a new cursor.
 */
export const paginateCursor = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const inputToken = pagination.inputToken;
  const outputToken = pagination.outputToken;
  if (!inputToken || !outputToken) {
    return missingPaginationConfig("Cursor pagination requires inputToken and outputToken");
  }
  type State = { cursor: string | undefined; done: boolean };
  const startCursor =
    typeof input[inputToken] === "string" ? (input[inputToken] as string) : undefined;

  return Stream.suspend(() => {
    // Cursor history belongs to this traversal, not to the reusable stream.
    const requestedCursors = new Set<string>();
    return Stream.unfold({ cursor: startCursor, done: false } as State, (state) =>
      Effect.gen(function* () {
        if (state.done) return undefined;
        if (state.cursor !== undefined) requestedCursors.add(state.cursor);

        const requestPayload = {
          ...input,
          ...(state.cursor ? { [inputToken]: state.cursor } : {}),
        } as Input;

        const response = yield* operation(requestPayload);

        const nextCursor = getPath(response, outputToken) as string | null | undefined;

        const nextState: State = {
          cursor: nextCursor ?? undefined,
          done:
            isTerminalToken(nextCursor) || (nextCursor != null && requestedCursors.has(nextCursor)),
        };

        return [response, nextState] as const;
      }),
    );
  });
};

// ============================================================================
// Token-based Pagination (AWS style)
// ============================================================================

/**
 * Stream of pages using token-based pagination -- pass `outputToken` back as
 * `inputToken` until it comes back absent.
 */
export const paginateToken = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const inputToken = pagination.inputToken;
  const outputToken = pagination.outputToken;
  if (!inputToken || !outputToken) {
    return missingPaginationConfig("Token pagination requires inputToken and outputToken");
  }
  type State = { token: unknown; done: boolean };
  const startToken = input[inputToken];

  return Stream.unfold({ token: startToken, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload =
        state.token !== undefined ? ({ ...input, [inputToken]: state.token } as Input) : input;

      const response = yield* operation(requestPayload);

      const nextToken = getPath(response, outputToken);

      const nextState: State = {
        token: nextToken,
        done: isTerminalToken(nextToken),
      };

      return [response, nextState] as const;
    }),
  );
};

// ============================================================================
// Relay Pagination (GraphQL connections)
// ============================================================================

/**
 * Stream of pages over a Relay connection -- pass `pageInfo.endCursor` back as
 * `after` for as long as `pageInfo.hasNextPage` is true.
 *
 * Relay is cursor pagination with one twist that breaks
 * {@link paginateCursor}: the terminal page still carries an `endCursor` (it
 * points at the last edge, not at "nothing left"). Only `hasNextPage`
 * distinguishes "more to fetch" from "that was everything", so this strategy
 * reads the boolean and treats the cursor as a pure position marker. A
 * connection that omits `pageInfo` entirely (or returns an empty page) also
 * terminates, so a malformed response can't spin forever.
 */
export const paginateRelay = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const inputToken = pagination.inputToken;
  const outputToken = pagination.outputToken;
  if (!inputToken || !outputToken) {
    return missingPaginationConfig("Relay pagination requires inputToken and outputToken");
  }
  // `pageInfo.endCursor` -> `pageInfo.hasNextPage` when the trait doesn't say.
  const hasNextPath =
    pagination.hasNextPage ??
    `${outputToken.split(".").slice(0, -1).concat("hasNextPage").join(".")}`;

  type State = { cursor: string | undefined; done: boolean };
  const startCursor =
    typeof input[inputToken] === "string" ? (input[inputToken] as string) : undefined;

  return Stream.unfold({ cursor: startCursor, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = {
        ...input,
        ...(state.cursor ? { [inputToken]: state.cursor } : {}),
      } as Input;

      const response = yield* operation(requestPayload);

      const nextCursor = getPath(response, outputToken) as string | null | undefined;
      const hasNext = getPath(response, hasNextPath) === true;
      // An empty page means the connection is exhausted regardless of what
      // `hasNextPage` claims -- re-requesting the same cursor would loop.
      const emptyPage =
        pagination.items !== undefined && getItems(response, pagination.items).length === 0;
      // A connection that keeps returning the same `endCursor` with
      // `hasNextPage: true` (Railway `projects` has done this) would
      // otherwise paginate forever.
      const stuckCursor =
        state.cursor !== undefined &&
        nextCursor !== undefined &&
        nextCursor !== null &&
        nextCursor === state.cursor;

      const nextState: State = {
        cursor: nextCursor ?? undefined,
        done: !hasNext || isTerminalToken(nextCursor) || emptyPage || stuckCursor,
      };

      return [response, nextState] as const;
    }),
  );
};

// ============================================================================
// Link-header Pagination (RFC 8288)
// ============================================================================

/** Where the protocol puts a call's response headers during a link traversal. */
interface PageHeadersSlot {
  headers: Readonly<Record<string, string | undefined>> | undefined;
}

const PageHeaders = /*@__PURE__*/ Context.Reference<PageHeadersSlot | undefined>(
  "@distilled.cloud/core/Pagination/PageHeaders",
  { defaultValue: () => undefined },
);

/**
 * Hand a response's headers to the link traversal running on this fiber, if
 * any. Protocols call it for every response they decode; outside
 * {@link paginateLink} it does nothing.
 */
export const recordPageHeaders = (
  context: Context.Context<never>,
  headers: Readonly<Record<string, string | undefined>>,
): void => {
  const slot = Context.get(context, PageHeaders);
  if (slot !== undefined) slot.headers = headers;
};

/**
 * The URL of the `rel="next"` link in a `Link` header value, e.g.
 * `<https://api.github.com/repositories/1/issues?page=2>; rel="next", <...>; rel="last"`.
 */
export const nextLink = (header: string | undefined): string | undefined => {
  if (header === undefined) return undefined;
  for (const link of header.split(/,\s*(?=<)/)) {
    const match = /^\s*<([^>]*)>(.*)$/.exec(link);
    const rel = match && /;\s*rel\s*=\s*"?([^";]*)"?/i.exec(match[2]!);
    if (rel && rel[1]!.toLowerCase().split(/\s+/).includes("next")) return match![1];
  }
  return undefined;
};

/**
 * Stream of pages that follows the `Link` response header: each request
 * takes `inputToken` from the query of the previous response's `rel="next"`
 * URL, and traversal ends when a response has no next link (or its token
 * repeats the current one). The response body carries no token, so this
 * works for APIs whose list responses are bare arrays.
 *
 * The protocol must report response headers through
 * {@link recordPageHeaders} (the REST protocol does); otherwise traversal
 * stops after the first page.
 */
export const paginateLink = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const inputToken = pagination.inputToken;
  if (!inputToken) {
    return missingPaginationConfig("Link pagination requires inputToken");
  }
  type State = { token: unknown; done: boolean };

  return Stream.unfold({ token: input[inputToken], done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload =
        state.token !== undefined ? ({ ...input, [inputToken]: state.token } as Input) : input;
      const slot: PageHeadersSlot = { headers: undefined };
      const response = yield* Effect.provideService(operation(requestPayload), PageHeaders, slot);

      const next = nextLink(slot.headers?.["link"]);
      // The token goes back as the query text it came as (`page=2` -> "2");
      // query members are sent as text either way.
      const token =
        next === undefined
          ? undefined
          : (new URL(next, "http://_").searchParams.get(inputToken) ?? undefined);

      const nextState: State = {
        token,
        done:
          isTerminalToken(token) || (state.token !== undefined && token === String(state.token)),
      };

      return [response, nextState] as const;
    }),
  );
};

/**
 * Shared default pagination dispatcher for SDKs that use generic
 * token/cursor/page traversal.
 */
export const paginateWithDefaults: PaginationStrategy = (operation, input, pagination) => {
  const mode = pagination.mode ?? "token";

  switch (mode) {
    case "page":
      return paginatePageNumber(operation, input, pagination);
    case "cursor":
      return paginateCursor(operation, input, pagination);
    case "relay":
      return paginateRelay(operation, input, pagination);
    case "link":
      return paginateLink(operation, input, pagination);
    case "single":
      return paginateSingle(operation, input, pagination);
    case "token":
    default:
      return paginateToken(operation, input, pagination);
  }
};

// ============================================================================
// Item extraction
// ============================================================================

/**
 * Extracts individual items from a page stream.
 *
 * @param pages - A stream of page responses
 * @param itemsPath - Dot-separated path to the items in the page; segments may
 *   cross arrays (see {@link getItems})
 * @returns A Stream of individual items
 */
export const extractItems = <Output, Item, E, R>(
  pages: Stream.Stream<Output, E, R>,
  itemsPath: string,
): Stream.Stream<Item, E, R> => flattenPages(pages, (page) => getItems(page, itemsPath));

/**
 * The items of a stream of pages that are themselves the lists (bare-array
 * responses).
 */
export const extractArrayItems = <Output, Item, E, R>(
  pages: Stream.Stream<Output, E, R>,
): Stream.Stream<Item, E, R> => flattenPages(pages, (page) => (Array.isArray(page) ? page : []));

const flattenPages = <Output, Item, E, R>(
  pages: Stream.Stream<Output, E, R>,
  itemsOf: (page: Output) => readonly unknown[],
): Stream.Stream<Item, E, R> =>
  // Flattens each pulled chunk of pages directly, skipping pages with no
  // items. `Stream.flatMap` / `flattenIterable` would do the same but pull in
  // Effect's concurrent-merge machinery (Queue, Semaphore, ...): about 5 KB
  // gzip in every bundle that uses a paginated operation.
  Stream.transformPull(pages, (pull) => {
    // Same error channel as `pull` (its `Done` included), so the stream ends where the pages end.
    const next: Effect.Effect<Arr.NonEmptyReadonlyArray<Item>, unknown> = Effect.flatMap(
      pull,
      (chunk) => {
        const items: Item[] = [];
        for (const page of chunk) for (const item of itemsOf(page)) items.push(item as Item);
        return items.length > 0
          ? Effect.succeed(items as unknown as Arr.NonEmptyReadonlyArray<Item>)
          : next;
      },
    );
    return Effect.succeed(next);
  }) as unknown as Stream.Stream<Item, E, R>;
