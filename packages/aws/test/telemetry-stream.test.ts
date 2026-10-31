/**
 * When an operation span ends for a streamed response (issue #979), as the
 * OpenTelemetry AWS SDK instrumentations do: a GenAI stream (Bedrock
 * ConverseStream) keeps the span open until the caller has read it; an S3
 * object body does not, so GetObject ends at the response headers.
 */
import { TelemetryDebug } from "@distilled.cloud/core/telemetry-debug";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import * as Tracer from "effect/Tracer";
import { beforeAll, describe, expect, test } from "vitest";
import * as Credentials from "../src/credentials.browser.ts";
import { encodeEvent } from "../src/eventstream/codec.ts";
import { serializeInputEvent } from "../src/eventstream/serializer.ts";
import * as Retry from "../src/retry.ts";
import * as Bedrock from "../src/services/bedrock-runtime.ts";
import * as S3 from "../src/services/s3.ts";

const PART_MS = 40;

/** A 200 response whose body sends `parts`, PART_MS apart, then ends with `end`. */
const http = (
  parts: ReadonlyArray<Uint8Array>,
  headers: Record<string, string>,
  end: "close" | "error" = "close",
) =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        let sent = 0;
        const body = new ReadableStream<Uint8Array>({
          async pull(controller) {
            await new Promise((resolve) => setTimeout(resolve, PART_MS));
            if (sent < parts.length) controller.enqueue(parts[sent++]!);
            else if (end === "close") controller.close();
            else controller.error(new Error("connection reset"));
          },
        });
        return HttpClientResponse.fromWeb(request, new Response(body, { status: 200, headers }));
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

const ms = (span: Tracer.NativeSpan) => {
  const status = span.status;
  return status._tag === "Ended" ? Number(status.endTime - status.startTime) / 1e6 : undefined;
};
const ok = (span: Tracer.NativeSpan) =>
  span.status._tag === "Ended" && Exit.isSuccess(span.status.exit);
const failed = (span: Tracer.NativeSpan) =>
  span.status._tag === "Ended" && Exit.isFailure(span.status.exit);

describe("S3 GetObject", () => {
  const body = ["part1;", "part2;", "part3;"].map((s) => new TextEncoder().encode(s));
  const s3 = http(body, { "content-type": "application/octet-stream", "x-amz-request-id": "R1" });

  test("the span ends at the response headers; reading the body is the caller's", async () => {
    const spans: Tracer.NativeSpan[] = [];
    let endedBeforeRead: boolean | undefined;
    const { exit } = await run(
      Effect.gen(function* () {
        const out = yield* S3.getObject({ Bucket: "b", Key: "k" });
        endedBeforeRead = spans[0]!.status._tag === "Ended";
        return yield* Stream.mkString(Stream.decodeText(out.Body as Stream.Stream<Uint8Array>));
      }),
      s3,
      spans,
    );
    expect(exit).toEqual(Exit.succeed("part1;part2;part3;"));
    expect(endedBeforeRead).toBe(true);
    expect(spans.map((s) => s.name)).toEqual(["S3.GetObject"]);
    expect(ms(spans[0]!)).toBeLessThan(PART_MS);
  });
});

describe("Bedrock ConverseStream", () => {
  let events: Uint8Array[] = [];
  beforeAll(async () => {
    events = await Promise.all(
      [
        { messageStart: { role: "assistant" } },
        { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "hi" } } },
        { messageStop: { stopReason: "end_turn" } },
      ].map((event) => Effect.runPromise(encodeEvent(serializeInputEvent(event)))),
    );
  });
  const bedrock = (end: "close" | "error" = "close") =>
    http(
      events,
      { "content-type": "application/vnd.amazon.eventstream", "x-amzn-requestid": "B1" },
      end,
    );
  const converse = Bedrock.converseStream({
    modelId: "m",
    messages: [{ role: "user", content: [{ text: "hi" }] }],
  } as never);
  const readAll = Effect.flatMap(converse, (out) =>
    Stream.runCollect(out.stream as Stream.Stream<unknown, unknown>),
  );

  test("the span stays open until the caller has read every event", async () => {
    const spans: Tracer.NativeSpan[] = [];
    let endedBeforeRead: boolean | undefined;
    const { exit } = await run(
      Effect.flatMap(converse, (out) => {
        endedBeforeRead = spans[0]!.status._tag === "Ended";
        return Stream.runCollect(out.stream as Stream.Stream<unknown, unknown>);
      }),
      bedrock(),
      spans,
    );
    expect(Exit.isSuccess(exit)).toBe(true);
    expect(endedBeforeRead).toBe(false);
    const span = spans[0]!;
    expect(span.name).toBe("chat m");
    expect(ok(span)).toBe(true);
    // 3 events and the end of the body, PART_MS each.
    expect(ms(span)).toBeGreaterThanOrEqual(4 * PART_MS - 5);
    const first = span.attributes.get("gen_ai.response.time_to_first_chunk") as number;
    expect(first).toBeGreaterThanOrEqual((PART_MS - 5) / 1000);
    expect(first).toBeLessThan((2 * PART_MS) / 1000);
    expect(span.attributes.get("aws.request_id")).toBe("B1");
  });

  test("an error while reading fails the span", async () => {
    const { spans, exit } = await run(readAll, bedrock("error"));
    expect(Exit.isFailure(exit)).toBe(true);
    expect(failed(spans[0]!)).toBe(true);
    expect(spans[0]!.attributes.get("error.type")).toBeDefined();
  });

  test("a caller that stops reading early ends it with success", async () => {
    const { spans, exit } = await run(
      Effect.flatMap(converse, (out) =>
        Stream.runCollect(Stream.take(out.stream as Stream.Stream<unknown, unknown>, 1)),
      ),
      bedrock(),
    );
    expect(Exit.isSuccess(exit)).toBe(true);
    expect(ok(spans[0]!)).toBe(true);
    expect(ms(spans[0]!)).toBeLessThan(3 * PART_MS);
  });

  test("debug mode shows the read as its own span under the operation", async () => {
    const { spans, exit } = await run(
      readAll.pipe(Effect.provide(TelemetryDebug.layer)),
      bedrock(),
    );
    expect(Exit.isSuccess(exit)).toBe(true);
    const op = spans.find((s) => s.name === "chat m")!;
    const read = spans.find((s) => s.name === "distilled.read_stream")!;
    expect(read.parent._tag === "Some" && read.parent.value.spanId).toBe(op.spanId);
    expect(Object.fromEntries(read.attributes)).toMatchObject({
      "distilled.stream.member": "stream",
      "distilled.stream.items": 3,
    });
    expect(ms(read)).toBeGreaterThanOrEqual(4 * PART_MS - 5);
  });
});
