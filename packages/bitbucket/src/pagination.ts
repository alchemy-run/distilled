/**
 * Bitbucket pagination -- hand-written.
 *
 * Every Bitbucket collection answers one envelope:
 * `{ values, next?, page?, pagelen?, size?, previous? }`. `next` is the URL
 * of the next page and is absent on the last one
 * (https://developer.atlassian.com/cloud/bitbucket/rest/intro/#pagination).
 * Its `page` query value is a page number on list collections
 * (`...?page=3`) and an opaque cursor on iterator collections such as
 * commits. {@link paginateNextPage} sends that value as the next request's
 * `page`.
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
      "Bitbucket pagination requires inputToken and outputToken",
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
        Option.filter((cursor) => cursor !== "" && cursor !== String(request[inputToken])),
        Option.map((cursor) => ({ ...request, [inputToken]: cursor })),
      );
      return [[page], next] as const;
    }),
  );
};
