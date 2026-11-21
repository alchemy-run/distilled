/**
 * Mollie pagination -- hand-written.
 *
 * Every Mollie list takes `from` (the id of the first item to return) and
 * `limit`, and answers HAL links beside the items:
 * `_links.next` is `{ href, type }` with a URL such as
 * `https://api.mollie.com/v2/payments?from=tr_7UhSN1zuXS&limit=5`, or `null`
 * on the last page. {@link paginateNextPage} sends that URL's `from` value as
 * the next request's `from`.
 */
import * as Pagination from "@distilled.cloud/core/pagination";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Stream from "effect/Stream";

/**
 * Follows the next-page URL at `outputToken` by sending its `inputToken`
 * query value as the next cursor. Stops when the URL is absent, malformed,
 * carries no cursor, or repeats the cursor just requested.
 */
export const paginateNextPage: Pagination.PaginationStrategy = (operation, input, pagination) => {
  const { inputToken, outputToken } = pagination;
  if (!inputToken || !outputToken) {
    return Pagination.missingPaginationConfig(
      "Mollie pagination requires inputToken and outputToken",
    );
  }
  return Stream.paginate(input, (request) =>
    Effect.map(operation(request), (page) => {
      const next = Option.fromNullishOr(
        Pagination.getPath(page, outputToken) as string | null | undefined,
      ).pipe(
        // `URL.parse` returns null for a malformed URL, which ends the stream.
        Option.flatMap((url) =>
          Option.fromNullishOr(URL.parse(url, "http://_")?.searchParams.get(inputToken)),
        ),
        Option.filter((cursor) => cursor !== "" && cursor !== request[inputToken]),
        Option.map((cursor) => ({ ...request, [inputToken]: cursor })),
      );
      return [[page], next] as const;
    }),
  );
};
