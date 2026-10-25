import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import {
  extractItems,
  getItems,
  getPath,
  paginateCursor,
  paginateLink,
  responseLinkHeaders,
  type PaginatedTrait,
} from "../src/pagination.ts";

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
        if (!page) throw new Error("Paginator made an unexpected extra request");
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
        expect(requests.map((request) => request.cursor)).toEqual(scenario.cursors);
        expect(requests.every((request) => request.limit === 1)).toBe(true);
        expect(input.cursor).toBe(scenario.start);
      }),
    ),
  );

  test.each(scenarios)("item extraction: $name", (scenario) =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests } = fixture(scenario);
        const items = yield* collect(extractItems<Page, number, never, never>(stream, "items"));
        expect(Array.from(items)).toEqual(scenario.pages.flatMap((page) => page.items ?? []));
        expect(requests.map((request) => request.cursor)).toEqual(scenario.cursors);
      }),
    ),
  );

  test("extracts every item from a large page in order", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const items = Array.from({ length: 200_000 }, (_, index) => index);
        const stream = Stream.make({ items });
        const result = yield* collect(extractItems<Page, number, never, never>(stream, "items"));
        expect(Array.from(result)).toEqual(items);
      }),
    ));

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
              if (++calls > 12) throw new Error("Paginator exceeded the request bound");
              return pages[input.cursor === "a" ? 1 : input.cursor === "b" ? 2 : 0]!;
            }),
          {},
          pagination,
        );
        expect(Array.from(yield* collect(stream))).toEqual(pages);
        expect(Array.from(yield* collect(stream))).toEqual(pages);
        const concurrent = yield* Effect.all([collect(stream), collect(stream)], {
          concurrency: "unbounded",
        });
        expect(concurrent.map((result) => Array.from(result))).toEqual([pages, pages]);
        expect(calls).toBe(12);
      }),
    ));
});

describe("link pagination", () => {
  const linkTrait: PaginatedTrait = { mode: "link", inputToken: "cursor", items: "$" };

  // A bare-array page with its Link header attached the way `API.make` does.
  const page = (items: number[], link?: string): number[] => {
    if (link !== undefined) responseLinkHeaders.set(items, link);
    return items;
  };

  const run = (pages: number[][], input: Record<string, unknown> = {}, trait = linkTrait) => {
    const requests: Record<string, unknown>[] = [];
    const stream = paginateLink(
      (request: Record<string, unknown>) =>
        Effect.sync(() => {
          const next = pages[requests.length];
          requests.push(request);
          if (!next) throw new Error("Paginator made an unexpected extra request");
          return next;
        }),
      input,
      trait,
    );
    return { stream, requests };
  };

  test("follows rel=next until the header has none, keeping other inputs", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests } = run(
          [
            page([1, 2], '<https://x.test/api/0/items/?cursor=0:2:0&query=a>; rel="next"'),
            page([3], '<https://x.test/api/0/items/?cursor=0:0:1>; rel="previous"'),
          ],
          { query: "a" },
        );
        const items = yield* collect(extractItems<number[], number, never, never>(stream, "$"));
        expect(Array.from(items)).toEqual([1, 2, 3]);
        expect(requests).toEqual([{ query: "a" }, { query: "a", cursor: "0:2:0" }]);
      }),
    ));

  test("finds next among several links with commas inside quoted parameters", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests } = run([
          page(
            [1],
            '<https://x.test/?cursor=0:0:1>; rel="previous"; title="a, b", ' +
              '<https://x.test/?cursor=0:1:0>; rel="next"; results="true"',
          ),
          page([2]),
        ]);
        yield* collect(stream);
        expect(requests.map((request) => request.cursor)).toEqual([undefined, "0:1:0"]);
      }),
    ));

  test("a response without a Link header is the last page", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests } = run([page([1])]);
        expect(Array.from(yield* collect(stream))).toEqual([[1]]);
        expect(requests).toHaveLength(1);
      }),
    ));

  test("replaces every alternative token with the one the next link carries", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream, requests } = run(
          [page([1], '<https://x.test/?after=b>; rel="next"'), page([2])],
          { before: "a" },
          { mode: "link", inputToken: "after", inputTokens: ["after", "before"], items: "$" },
        );
        yield* collect(stream);
        expect(requests).toEqual([{ before: "a" }, { after: "b" }]);
      }),
    ));

  test("dies on a repeated token instead of looping", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream } = run([
          page([1], '<https://x.test/?cursor=a>; rel="next"'),
          page([2], '<https://x.test/?cursor=a>; rel="next"'),
        ]);
        const exit = yield* Effect.exit(collect(stream));
        expect(exit._tag).toBe("Failure");
      }),
    ));

  test("dies when the next link lacks the token parameter", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream } = run([page([1], '<https://x.test/?page=2>; rel="next"')]);
        const exit = yield* Effect.exit(collect(stream));
        expect(exit._tag).toBe("Failure");
      }),
    ));

  test("dies without quoting the URL when the next link cannot be parsed", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const { stream } = run([page([1], '<https://[bad]/?cursor=fixture-cursor>; rel="next"')]);
        const exit = yield* Effect.exit(collect(stream));
        expect(exit._tag).toBe("Failure");
        if (exit._tag !== "Failure") return;
        const defect = Cause.squash(exit.cause);
        expect(defect).toBeInstanceOf(Error);
        expect((defect as Error).message).toContain("cannot be parsed");
        const props = Object.getOwnPropertyNames(defect).map((name) =>
          String((defect as unknown as Record<string, unknown>)[name]),
        );
        expect(props.join("\n")).not.toContain("fixture-cursor");
      }),
    ));

  test("`$` addresses a bare array", () => {
    expect(getItems([1, 2], "$")).toEqual([1, 2]);
    expect(getItems({ items: [1] }, "$")).toEqual([]);
    expect(getPath({ a: 1 }, "$")).toEqual({ a: 1 });
  });
});
