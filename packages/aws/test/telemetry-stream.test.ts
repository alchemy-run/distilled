/**
 * The operation span of a call with a streamed output (S3 GetObject's
 * `Body`) covers the whole response: it ends when the caller has read the
 * stream, not when the headers arrive (issue #979).
 */
import { setFlagsFromString } from "node:v8";
import { runInNewContext } from "node:vm";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import * as Tracer from "effect/Tracer";
import { describe, expect, test } from "vitest";
import * as Credentials from "../src/credentials.browser.ts";
import * as Retry from "../src/retry.ts";
import * as S3 from "../src/services/s3.ts";

const CHUNK_MS = 40;

/** A GetObject response whose body sends `chunks` parts, CHUNK_MS apart, then `end`s. */
const http = (chunks: number, end: "close" | "error" = "close") =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        let sent = 0;
        const body = new ReadableStream<Uint8Array>({
          async pull(controller) {
            await new Promise((resolve) => setTimeout(resolve, CHUNK_MS));
            if (sent < chunks) controller.enqueue(new TextEncoder().encode(`part${++sent};`));
            else if (end === "close") controller.close();
            else controller.error(new Error("connection reset"));
          },
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(body, {
            status: 200,
            headers: { "content-type": "application/octet-stream", "x-amz-request-id": "R1" },
          }),
        );
      }),
    ),
  );

const run = async <A>(
  program: Effect.Effect<A, unknown, any>,
  layer: Layer.Layer<HttpClient.HttpClient>,
  spans: Tracer.NativeSpan[] = [],
) => {
  const tracer = Tracer.make({
    span(options) {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);
      return span;
    },
  });
  const exit = await Effect.runPromiseExit(
    program.pipe(
      Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Credentials.fromCredentials(
            { accessKeyId: Redacted.make("AKID"), secretAccessKey: Redacted.make("secret") },
            "us-east-1",
          ),
          layer,
        ),
      ),
      Effect.provideService(Tracer.Tracer, tracer),
    ) as Effect.Effect<A, unknown>,
  );
  return { spans, exit };
};

const getObject = S3.getObject({ Bucket: "b", Key: "k" });
const read = (body: unknown) =>
  Stream.mkString(Stream.decodeText(body as Stream.Stream<Uint8Array, unknown>));
const ms = (span: Tracer.NativeSpan) => {
  const status = span.status;
  if (status._tag !== "Ended") return undefined;
  return Number(status.endTime - status.startTime) / 1e6;
};

describe("operation span of a streamed output", () => {
  test("ends when the caller has read the body", async () => {
    const spans: Tracer.NativeSpan[] = [];
    let endedBeforeRead: boolean | undefined;
    const { exit } = await run(
      Effect.gen(function* () {
        const out = yield* getObject;
        endedBeforeRead = spans[0]!.status._tag === "Ended";
        return yield* read(out.Body);
      }),
      http(3),
      spans,
    );
    expect(exit).toEqual(Exit.succeed("part1;part2;part3;"));
    expect(endedBeforeRead).toBe(false);
    expect(spans.map((s) => s.name)).toEqual(["S3.GetObject"]);
    // 3 parts and the end of the body, CHUNK_MS each.
    expect(ms(spans[0]!)).toBeGreaterThanOrEqual(4 * CHUNK_MS - 5);
    const status = spans[0]!.status;
    expect(status._tag === "Ended" && Exit.isSuccess(status.exit)).toBe(true);
    expect(spans[0]!.attributes.get("aws.request_id")).toBe("R1");
  });

  test("an error while reading fails the span", async () => {
    const { spans, exit } = await run(
      Effect.flatMap(getObject, (out) => read(out.Body)),
      http(1, "error"),
    );
    expect(Exit.isFailure(exit)).toBe(true);
    const status = spans[0]!.status;
    expect(status._tag === "Ended" && Exit.isFailure(status.exit)).toBe(true);
    expect(spans[0]!.attributes.get("error.type")).toBeDefined();
  });

  test("a caller that stops reading early ends it with success", async () => {
    const { spans, exit } = await run(
      Effect.flatMap(getObject, (out) =>
        Stream.runCollect(Stream.take(out.Body as Stream.Stream<Uint8Array>, 1)),
      ),
      http(5),
    );
    expect(Exit.isSuccess(exit)).toBe(true);
    const status = spans[0]!.status;
    expect(status._tag === "Ended" && Exit.isSuccess(status.exit)).toBe(true);
    expect(ms(spans[0]!)).toBeLessThan(5 * CHUNK_MS);
  });

  test("a body the caller drops unread ends it at the headers, once collected", async () => {
    setFlagsFromString("--expose-gc");
    const gc = runInNewContext("gc") as () => void;
    const { spans, exit } = await run(
      Effect.map(getObject, (out) => out.ContentType),
      http(3),
    );
    expect(exit).toEqual(Exit.succeed("application/octet-stream"));
    for (let i = 0; i < 20 && spans[0]!.status._tag !== "Ended"; i++) {
      gc();
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const status = spans[0]!.status;
    expect(status._tag).toBe("Ended");
    expect(ms(spans[0]!)).toBeLessThan(CHUNK_MS);
  });
});
