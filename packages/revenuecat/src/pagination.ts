import * as Pagination from "@distilled.cloud/core/pagination";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Stream from "effect/Stream";

/**
 * Follows `next_page`, a URL such as `/v2/projects?starting_after=proj1`,
 * by sending its `starting_after` query value as the next cursor.
 */
export const paginateNextPage: Pagination.PaginationStrategy = (operation, input, pagination) => {
  const { inputToken, outputToken } = pagination;
  if (!inputToken || !outputToken) {
    return Stream.die(new Error("RevenueCat pagination requires inputToken and outputToken"));
  }
  return Stream.paginate(input, (request) =>
    Effect.map(operation(request), (page) => {
      const next = Option.fromNullishOr(
        Pagination.getPath(page, outputToken) as string | null | undefined,
      ).pipe(
        Option.flatMap((url) =>
          Option.fromNullishOr(new URL(url, "http://_").searchParams.get(inputToken)),
        ),
        Option.filter((cursor) => cursor !== "" && cursor !== request[inputToken]),
        Option.map((cursor) => ({ ...request, [inputToken]: cursor })),
      );
      return [[page], next] as const;
    }),
  );
};
