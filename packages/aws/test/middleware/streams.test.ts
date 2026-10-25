import * as S from "@distilled.cloud/core/schema-lite";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import { describe, expect, test } from "vitest";
import type { Request } from "../../src/client/request.ts";
import { Crc32 } from "../../src/hash/crc32.ts";
import { createAwsChunkedStream } from "../../src/middleware/checksum.ts";
import { makeStreamingBodyMiddleware } from "../../src/middleware/streaming-body.ts";
import * as T from "../../src/traits.ts";
import { createBufferedReadableStream } from "../../src/util/stream.ts";

/** The unhandled rejections `run` leaves behind. */
const unhandledRejectionsOf = async (run: () => Promise<unknown>) => {
  const seen: unknown[] = [];
  const onRejection = (reason: unknown) => {
    seen.push(reason);
  };
  process.on("unhandledRejection", onRejection);
  try {
    await run();
    await new Promise((resolve) => setTimeout(resolve, 20));
  } finally {
    process.off("unhandledRejection", onRejection);
  }
  return seen;
};

const erroredStream = (error: unknown) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(error);
    },
  });

describe("streams over an errored source", () => {
  test("buffering a streaming body that errors leaves no unhandled rejection", async () => {
    const middleware = makeStreamingBodyMiddleware(
      S.Struct({ Body: T.StreamingInput.pipe(T.HttpPayload()) }),
    );
    const request: Request = {
      method: "PUT",
      path: "/",
      query: {},
      headers: {},
      body: new ReadableStream<Uint8Array>({
        pull(controller) {
          controller.error(new Error("upload source failed"));
        },
      }),
    };
    let exit: Exit.Exit<Request> | undefined;
    const rejections = await unhandledRejectionsOf(async () => {
      exit = await Effect.runPromiseExit(middleware(request));
    });
    expect(rejections).toEqual([]);
    expect(exit && Exit.isFailure(exit)).toBe(true);
  });

  test("cancelling an aws-chunked stream over an errored source leaves no unhandled rejection", async () => {
    const rejections = await unhandledRejectionsOf(() =>
      createAwsChunkedStream(
        erroredStream(new Error("source failed")),
        Crc32,
        "x-amz-checksum-crc32",
      ).cancel("stop"),
    );
    expect(rejections).toEqual([]);
  });

  test("cancelling a buffered stream over an errored source leaves no unhandled rejection", async () => {
    const rejections = await unhandledRejectionsOf(() =>
      createBufferedReadableStream(erroredStream(new Error("source failed")), 8).cancel("stop"),
    );
    expect(rejections).toEqual([]);
  });
});
