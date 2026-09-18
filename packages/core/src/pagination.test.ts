import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import {
  extractItems,
  paginateCursor,
  type PaginatedTrait,
} from "./pagination.ts";

const pagination: PaginatedTrait = {
  mode: "cursor",
  inputToken: "cursor",
  outputToken: "pagination.cursor",
  items: "items",
  pageSize: "limit",
};

type Page = {
  items?: number[];
  pagination?: { cursor?: string | null };
};

type Scenario = {
  name: string;
  start?: string;
  pages: Page[];
  cursors: Array<string | undefined>;
};

const scenarios: Scenario[] = [
  {
    name: "advances normally until the cursor is omitted",
    pages: [
      { items: [1], pagination: { cursor: "a" } },
      { items: [2], pagination: { cursor: "b" } },
      { items: [3] },
    ],
    cursors: [undefined, "a", "b"],
  },
  ...([null, ""] as const).map((cursor) => ({
    name: `terminates on ${JSON.stringify(cursor)}`,
    pages: [
      { items: [1], pagination: { cursor: "a" } },
      { items: [2], pagination: { cursor } },
    ],
    cursors: [undefined, "a"],
  })),
  {
    name: "terminates on an empty page echoing the requested cursor",
    pages: [
      { items: [1], pagination: { cursor: "a" } },
      { items: [], pagination: { cursor: "a" } },
    ],
    cursors: [undefined, "a"],
  },
  {
    name: "emits a nonempty page before stopping on a repeated cursor",
    pages: [
      { items: [1], pagination: { cursor: "a" } },
      { items: [2], pagination: { cursor: "a" } },
    ],
    cursors: [undefined, "a"],
  },
  {
    name: "terminates when the first response echoes the initial cursor",
    start: "initial",
    pages: [{ items: [1], pagination: { cursor: "initial" } }],
    cursors: ["initial"],
  },
  {
    name: "terminates a multi-cursor cycle",
    pages: [
      { items: [1], pagination: { cursor: "a" } },
      { items: [2], pagination: { cursor: "b" } },
      { items: [3], pagination: { cursor: "a" } },
    ],
    cursors: [undefined, "a", "b"],
  },
  {
    name: "terminates a cycle returning to the initial cursor",
    start: "initial",
    pages: [
      { items: [1], pagination: { cursor: "a" } },
      { items: [2], pagination: { cursor: "initial" } },
    ],
    cursors: ["initial", "a"],
  },
  {
    name: "preserves empty and sparse pages whose cursors advance",
    pages: [
      { items: [], pagination: { cursor: "a" } },
      { pagination: { cursor: "b" } },
      { items: [1], pagination: { cursor: "c" } },
      { items: [], pagination: { cursor: "d" } },
      { items: [2] },
    ],
    cursors: [undefined, "a", "b", "c", "d"],
  },
];

const fixture = ({ pages, start }: Scenario) => {
  const requests: Array<{ cursor?: string; limit: number }> = [];
  const input = { ...(start === undefined ? {} : { cursor: start }), limit: 1 };
  const stream = paginateCursor(
    (request) =>
      Effect.sync(() => {
        const page = pages[requests.length];
        requests.push(request);
        if (!page)
          throw new Error("Paginator made an unexpected extra request");
        return page;
      }),
    input,
    pagination,
  );
  return { stream, requests, input };
};

const collect = <A>(stream: Stream.Stream<A>) =>
  Stream.runCollect(stream).pipe(Effect.timeout("1 second"));

describe("cursor pagination", () => {
  test.each(scenarios)("$name", (scenario) =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests, input } = fixture(scenario);
        const pages = yield* collect(stream);
        expect(Array.from(pages)).toEqual(scenario.pages);
        expect(requests.map((request) => request.cursor)).toEqual(
          scenario.cursors,
        );
        expect(requests.every((request) => request.limit === 1)).toBe(true);
        expect(input.cursor).toBe(scenario.start);
      }),
    ),
  );

  test.each(scenarios)("item extraction: $name", (scenario) =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests } = fixture(scenario);
        const items = yield* collect(
          extractItems<Page, number, never, never>(stream, "items"),
        );
        expect(Array.from(items)).toEqual(
          scenario.pages.flatMap((page) => page.items ?? []),
        );
        expect(requests.map((request) => request.cursor)).toEqual(
          scenario.cursors,
        );
      }),
    ),
  );

  test("cursor history is isolated across repeated and concurrent stream runs", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        let calls = 0;
        const pages: Page[] = [
          { items: [1], pagination: { cursor: "a" } },
          { items: [2], pagination: { cursor: "b" } },
          { items: [], pagination: { cursor: "b" } },
        ];
        const stream = paginateCursor(
          (input: { cursor?: string }) =>
            Effect.sync(() => {
              if (++calls > 12)
                throw new Error("Paginator exceeded the request bound");
              return pages[
                input.cursor === "a" ? 1 : input.cursor === "b" ? 2 : 0
              ]!;
            }),
          {},
          pagination,
        );
        expect(Array.from(yield* collect(stream))).toEqual(pages);
        expect(Array.from(yield* collect(stream))).toEqual(pages);
        const concurrent = yield* Effect.all(
          [collect(stream), collect(stream)],
          {
            concurrency: "unbounded",
          },
        );
        expect(concurrent.map((result) => Array.from(result))).toEqual([
          pages,
          pages,
        ]);
        expect(calls).toBe(12);
      }),
    ));
});
