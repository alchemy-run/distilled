import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { test, getAccountId, testRunId } from "./test.ts";
import * as Pipelines from "~/services/pipelines";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic resource names for tests with a random suffix to avoid
 * collisions between parallel test runs.
 * Follows the convention: distilled_cf_pipelines_stream_{testname}_{testRunId}
 */
const streamName = (name: string) =>
  `distilled_cf_pipelines_stream_${name.replace(/-/g, "_")}_${testRunId}`;

/**
 * Delete a stream by name. Looks it up by listing, then deletes by ID.
 * Silently succeeds if the stream doesn't exist.
 * Note: Do NOT use force: "true" - it causes "Pipeline does not exist" errors
 * when there is no associated pipeline.
 */
const deleteStreamByName = (name: string) =>
  Effect.gen(function* () {
    const streams = yield* Pipelines.listStreams({
      accountId: accountId(),
    });
    const found = streams.result.find((s) => s.name === name);
    if (found) {
      yield* Pipelines.deleteStream({
        accountId: accountId(),
        streamId: found.id,
      }).pipe(Effect.catch(() => Effect.void));
    }
  }).pipe(Effect.catch(() => Effect.void));

/**
 * Create a stream, run `fn`, then delete the stream.
 * Cleanup-first pattern for idempotency.
 */
const withStream = <A, E, R>(
  name: string,
  fn: (streamId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Attempt cleanup first in case of previous failed run
    yield* deleteStreamByName(name);

    // Create stream
    const stream = yield* Pipelines.createStream({
      accountId: accountId(),
      name,
      http: {
        authentication: false,
        enabled: true,
      },
    });

    const streamId = stream.id;

    // Run the test function, ensuring cleanup
    return yield* fn(streamId).pipe(
      Effect.ensuring(
        Pipelines.deleteStream({
          accountId: accountId(),
          streamId,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

/**
 * Delete a v1 pipeline by name. Looks it up by listing, then deletes by ID.
 * Silently succeeds if the pipeline doesn't exist.
 */
const _deleteV1PipelineByName = (name: string) =>
  Effect.gen(function* () {
    const pipelines = yield* Pipelines.listV1Pipeline({
      accountId: accountId(),
    });
    const found = pipelines.result.find((p) => p.name === name);
    if (found) {
      yield* Pipelines.deleteV1Pipeline({
        accountId: accountId(),
        pipelineId: found.id,
      }).pipe(Effect.catch(() => Effect.void));
    }
  }).pipe(Effect.catch(() => Effect.void));

// ============================================================================
// Pipelines Tests
// ============================================================================

describe("Pipelines", () => {
  // ==========================================================================
  // Legacy Pipeline Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listPipelines
  // --------------------------------------------------------------------------
  describe("listPipelines", () => {
    test("happy path - lists pipelines in account", () =>
      Effect.gen(function* () {
        const result = yield* Pipelines.listPipelines({
          accountId: accountId(),
        });

        expect(result.resultInfo).toBeDefined();
        expect(Array.isArray(result.results)).toBe(true);
        for (const pipeline of result.results) {
          expect(typeof pipeline.id).toBe("string");
          expect(typeof pipeline.name).toBe("string");
        }
      }));

    test("happy path - lists pipelines with pagination", () =>
      Effect.gen(function* () {
        const result = yield* Pipelines.listPipelines({
          accountId: accountId(),
          page: "1",
          perPage: "5",
        });

        expect(Array.isArray(result.results)).toBe(true);
      }));

    test("happy path - lists pipelines with search filter", () =>
      Effect.gen(function* () {
        const result = yield* Pipelines.listPipelines({
          accountId: accountId(),
          search: "distilled_cf_pipelines",
        });

        expect(Array.isArray(result.results)).toBe(true);
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.listPipelines({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getPipeline
  // --------------------------------------------------------------------------
  describe("getPipeline", () => {
    test("error - PipelineNotExists for non-existent pipeline name", () =>
      Pipelines.getPipeline({
        accountId: accountId(),
        pipelineName: "distilled-cf-pipelines-nonexistent-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PipelineNotExists")),
      ));

    test("error - for invalid accountId", () =>
      Pipelines.getPipeline({
        accountId: "invalid-account-id-000",
        pipelineName: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "PipelineNotExists",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - for empty pipeline name", () =>
      Pipelines.getPipeline({
        accountId: accountId(),
        pipelineName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "CloudflareHttpError",
            "PipelineNotExists",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // updatePipeline
  // --------------------------------------------------------------------------
  describe("updatePipeline", () => {
    test("error - PipelineNotExists for non-existent pipeline name", () =>
      Pipelines.updatePipeline({
        accountId: accountId(),
        pipelineName: "distilled-cf-pipelines-nonexistent-xyz",
        name: "distilled-cf-pipelines-nonexistent-xyz",
        destination: {
          batch: {},
          compression: {},
          format: "json",
          path: { bucket: "test-bucket" },
          type: "r2",
        },
        source: [{ format: "json", type: "http" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PipelineNotExists")),
      ));

    test("error - for invalid accountId", () =>
      Pipelines.updatePipeline({
        accountId: "invalid-account-id-000",
        pipelineName: "test",
        name: "test",
        destination: {
          batch: {},
          compression: {},
          format: "json",
          path: { bucket: "test-bucket" },
          type: "r2",
        },
        source: [{ format: "json", type: "http" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "PipelineNotExists",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deletePipeline
  // --------------------------------------------------------------------------
  describe("deletePipeline", () => {
    test("error - PipelineNotExists for non-existent pipeline name", () =>
      Pipelines.deletePipeline({
        accountId: accountId(),
        pipelineName: "distilled-cf-pipelines-nonexistent-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PipelineNotExists")),
      ));

    test("error - for invalid accountId", () =>
      Pipelines.deletePipeline({
        accountId: "invalid-account-id-000",
        pipelineName: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "PipelineNotExists",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - for empty pipeline name", () =>
      Pipelines.deletePipeline({
        accountId: accountId(),
        pipelineName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "CloudflareHttpError",
            "PipelineNotExists",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));
  });

  // ==========================================================================
  // Stream Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // createStream
  // --------------------------------------------------------------------------
  describe("createStream", () => {
    test("happy path - creates a new stream", () =>
      Effect.gen(function* () {
        const name = streamName("create-happy");

        // Cleanup first
        yield* deleteStreamByName(name);

        const result = yield* Pipelines.createStream({
          accountId: accountId(),
          name,
          http: {
            authentication: false,
            enabled: true,
          },
        });

        expect(result).toBeDefined();
        expect(typeof result.id).toBe("string");
        expect(result.name).toBe(name);
        expect(typeof result.createdAt).toBe("string");
        expect(typeof result.modifiedAt).toBe("string");
        expect(typeof result.version).toBe("number");
        expect(result.http).toBeDefined();
        expect(typeof result.http.authentication).toBe("boolean");
        expect(typeof result.http.enabled).toBe("boolean");
        expect(result.workerBinding).toBeDefined();
        expect(typeof result.workerBinding.enabled).toBe("boolean");

        // Cleanup
        yield* Pipelines.deleteStream({
          accountId: accountId(),
          streamId: result.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("happy path - creates stream with json format", () =>
      Effect.gen(function* () {
        const name = streamName("create-json");

        yield* deleteStreamByName(name);

        const result = yield* Pipelines.createStream({
          accountId: accountId(),
          name,
          http: {
            authentication: false,
            enabled: true,
          },
          format: {
            type: "json",
            unstructured: true,
          },
        });

        expect(result).toBeDefined();
        expect(result.name).toBe(name);
        expect(typeof result.id).toBe("string");

        yield* Pipelines.deleteStream({
          accountId: accountId(),
          streamId: result.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.createStream({
        accountId: "invalid-account-id-000",
        name: streamName("create-bad-acct"),
        http: { authentication: false, enabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - InvalidStreamName for empty stream name", () =>
      Pipelines.createStream({
        accountId: accountId(),
        name: "",
        http: { authentication: false, enabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidStreamName")),
      ));

    test("error - InvalidStreamName for stream name with special characters", () =>
      Pipelines.createStream({
        accountId: accountId(),
        name: "invalid stream name!@#$%",
        http: { authentication: false, enabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidStreamName")),
      ));
  });

  // --------------------------------------------------------------------------
  // getStream
  // --------------------------------------------------------------------------
  describe("getStream", () => {
    test("happy path - retrieves an existing stream", () =>
      withStream(streamName("get-happy"), (streamId) =>
        Effect.gen(function* () {
          const result = yield* Pipelines.getStream({
            accountId: accountId(),
            streamId,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(streamId);
          expect(result.name).toBe(streamName("get-happy"));
          expect(typeof result.createdAt).toBe("string");
          expect(typeof result.modifiedAt).toBe("string");
          expect(typeof result.version).toBe("number");
          expect(result.http).toBeDefined();
          expect(typeof result.http.authentication).toBe("boolean");
          expect(typeof result.http.enabled).toBe("boolean");
          expect(result.workerBinding).toBeDefined();
          expect(typeof result.workerBinding.enabled).toBe("boolean");
        }),
      ));

    test("error - StreamNotFound for non-existent streamId", () =>
      Pipelines.getStream({
        accountId: accountId(),
        streamId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StreamNotFound")),
      ));

    test("error - for invalid accountId", () =>
      Pipelines.getStream({
        accountId: "invalid-account-id-000",
        streamId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "InvalidStreamId",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for empty streamId", () =>
      Pipelines.getStream({
        accountId: accountId(),
        streamId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "InvalidStreamId"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // listStreams
  // --------------------------------------------------------------------------
  describe("listStreams", () => {
    test("happy path - lists streams in account", () =>
      Effect.gen(function* () {
        const result = yield* Pipelines.listStreams({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(result.resultInfo).toBeDefined();
        expect(Array.isArray(result.result)).toBe(true);
        for (const stream of result.result) {
          expect(typeof stream.id).toBe("string");
          expect(typeof stream.name).toBe("string");
          expect(typeof stream.createdAt).toBe("string");
          expect(typeof stream.modifiedAt).toBe("string");
          expect(typeof stream.version).toBe("number");
          expect(stream.http).toBeDefined();
          expect(stream.workerBinding).toBeDefined();
        }
      }));

    test("happy path - lists streams includes a created stream", () =>
      withStream(streamName("list-find"), (streamId) =>
        Effect.gen(function* () {
          const result = yield* Pipelines.listStreams({
            accountId: accountId(),
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result.result)).toBe(true);
          const found = result.result.some((s) => s.id === streamId);
          expect(found).toBe(true);
        }),
      ));

    test("pages() streams listStreams response pages", () =>
      Effect.gen(function* () {
        const pages = yield* Pipelines.listStreams
          .pages({
            accountId: accountId(),
          })
          .pipe(Stream.take(1), Stream.runCollect);

        const pagesArray = Array.from(pages);
        expect(pagesArray.length).toBe(1);
        expect(Array.isArray(pagesArray[0]?.result)).toBe(true);
        expect(pagesArray[0]?.resultInfo).toBeDefined();
      }));

    test("items() streams stream items directly", () =>
      Effect.gen(function* () {
        const streams = yield* Pipelines.listStreams
          .items({
            accountId: accountId(),
          })
          .pipe(Stream.take(5), Stream.runCollect);

        for (const stream of Array.from(streams)) {
          expect(typeof stream.id).toBe("string");
          expect(typeof stream.name).toBe("string");
        }
      }));

    test("error - for invalid accountId", () =>
      Pipelines.listStreams({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // patchStream
  // --------------------------------------------------------------------------
  describe("patchStream", () => {
    test("happy path - patches stream http settings", () =>
      withStream(streamName("patch-happy"), (streamId) =>
        Effect.gen(function* () {
          const result = yield* Pipelines.patchStream({
            accountId: accountId(),
            streamId,
            http: {
              authentication: true,
              enabled: true,
            },
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(streamId);
          expect(typeof result.version).toBe("number");
          expect(result.http).toBeDefined();
          expect(result.http.authentication).toBe(true);
          expect(result.http.enabled).toBe(true);
        }),
      ));

    test("happy path - patches stream worker binding", () =>
      withStream(streamName("patch-worker"), (streamId) =>
        Effect.gen(function* () {
          const result = yield* Pipelines.patchStream({
            accountId: accountId(),
            streamId,
            workerBinding: {
              enabled: true,
            },
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(streamId);
          expect(result.workerBinding).toBeDefined();
          expect(result.workerBinding.enabled).toBe(true);
        }),
      ));

    test("error - StreamNotFound for non-existent streamId", () =>
      Pipelines.patchStream({
        accountId: accountId(),
        streamId: "00000000000000000000000000000000",
        http: { authentication: false, enabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StreamNotFound")),
      ));

    test("error - for invalid accountId", () =>
      Pipelines.patchStream({
        accountId: "invalid-account-id-000",
        streamId: "00000000000000000000000000000000",
        http: { authentication: false, enabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "StreamNotFound",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteStream
  // --------------------------------------------------------------------------
  describe("deleteStream", () => {
    test("happy path - deletes an existing stream", () =>
      Effect.gen(function* () {
        const name = streamName("delete-happy");

        yield* deleteStreamByName(name);

        const created = yield* Pipelines.createStream({
          accountId: accountId(),
          name,
          http: { authentication: false, enabled: true },
        });

        const result = yield* Pipelines.deleteStream({
          accountId: accountId(),
          streamId: created.id,
        });

        expect(result).toBeDefined();
      }));

    test("happy path - delete non-existent streamId succeeds", () =>
      Effect.gen(function* () {
        // Cloudflare deleteStream returns success even for non-existent IDs
        const result = yield* Pipelines.deleteStream({
          accountId: accountId(),
          streamId: "00000000000000000000000000000000",
        });
        expect(result).toBeDefined();
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.deleteStream({
        accountId: "invalid-account-id-000",
        streamId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for empty streamId", () =>
      Pipelines.deleteStream({
        accountId: accountId(),
        streamId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // Sink Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listSinks
  // --------------------------------------------------------------------------
  describe("listSinks", () => {
    test("happy path - lists sinks in account", () =>
      Effect.gen(function* () {
        const result = yield* Pipelines.listSinks({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(result.resultInfo).toBeDefined();
        expect(Array.isArray(result.result)).toBe(true);
        for (const sink of result.result) {
          expect(typeof sink.id).toBe("string");
          expect(typeof sink.name).toBe("string");
          expect(typeof sink.createdAt).toBe("string");
          expect(typeof sink.modifiedAt).toBe("string");
          expect(["r2", "r2_data_catalog"]).toContain(sink.type);
        }
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.listSinks({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("pages() streams listSinks response pages", () =>
      Effect.gen(function* () {
        const pages = yield* Pipelines.listSinks
          .pages({
            accountId: accountId(),
          })
          .pipe(Stream.take(1), Stream.runCollect);

        const pagesArray = Array.from(pages);
        expect(pagesArray.length).toBe(1);
        expect(Array.isArray(pagesArray[0]?.result)).toBe(true);
        expect(pagesArray[0]?.resultInfo).toBeDefined();
      }));

    test("items() streams sink items directly", () =>
      Effect.gen(function* () {
        const sinks = yield* Pipelines.listSinks
          .items({
            accountId: accountId(),
          })
          .pipe(Stream.take(5), Stream.runCollect);

        for (const sink of Array.from(sinks)) {
          expect(typeof sink.id).toBe("string");
          expect(typeof sink.name).toBe("string");
        }
      }));
  });

  // --------------------------------------------------------------------------
  // getSink
  // --------------------------------------------------------------------------
  describe("getSink", () => {
    test("error - SinkNotFound for non-existent sinkId", () =>
      Pipelines.getSink({
        accountId: accountId(),
        sinkId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("SinkNotFound")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.getSink({
        accountId: "invalid-account-id-000",
        sinkId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "InvalidSinkId",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for empty sinkId", () =>
      Pipelines.getSink({
        accountId: accountId(),
        sinkId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "InvalidSinkId"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // createSink
  // --------------------------------------------------------------------------
  describe("createSink", () => {
    test("error - validation error for missing config", () =>
      Pipelines.createSink({
        accountId: accountId(),
        name: "distilled_cf_pipelines_sink_no_config",
        type: "r2",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.createSink({
        accountId: "invalid-account-id-000",
        name: "distilled_cf_pipelines_sink_bad_acct",
        type: "r2",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - InvalidSinkId for empty sink name", () =>
      Pipelines.createSink({
        accountId: accountId(),
        name: "",
        type: "r2",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "InvalidSinkId",
            "UnknownCloudflareError",
            "CloudflareHttpError",
          ]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteSink
  // --------------------------------------------------------------------------
  describe("deleteSink", () => {
    test("happy path - delete non-existent sinkId succeeds", () =>
      Effect.gen(function* () {
        // Cloudflare deleteSink returns success even for non-existent IDs
        const result = yield* Pipelines.deleteSink({
          accountId: accountId(),
          sinkId: "00000000000000000000000000000000",
        });
        expect(result).toBeDefined();
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.deleteSink({
        accountId: "invalid-account-id-000",
        sinkId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for empty sinkId", () =>
      Pipelines.deleteSink({
        accountId: accountId(),
        sinkId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // SQL Pipeline Validation
  // ==========================================================================

  // --------------------------------------------------------------------------
  // validateSqlPipeline
  // --------------------------------------------------------------------------
  describe("validateSqlPipeline", () => {
    test("error - TableNotFound for SQL referencing non-existent table", () =>
      Pipelines.validateSqlPipeline({
        accountId: accountId(),
        sql: "SELECT * FROM stream",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("TableNotFound")),
      ));

    test("error - TableNotFound for invalid SQL syntax", () =>
      Pipelines.validateSqlPipeline({
        accountId: accountId(),
        sql: "THIS IS NOT VALID SQL ;;;",
      }).pipe(
        Effect.flip,
        // Cloudflare uses error code 1014 for all SQL validation errors
        Effect.map((e) => expect(e._tag).toBe("TableNotFound")),
      ));

    test("error - TableNotFound for empty SQL string", () =>
      Pipelines.validateSqlPipeline({
        accountId: accountId(),
        sql: "",
      }).pipe(
        Effect.flip,
        // Cloudflare uses error code 1014 for all SQL validation errors
        Effect.map((e) => expect(e._tag).toBe("TableNotFound")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.validateSqlPipeline({
        accountId: "invalid-account-id-000",
        sql: "SELECT * FROM stream",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // V1 Pipeline Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listV1Pipeline
  // --------------------------------------------------------------------------
  describe("listV1Pipeline", () => {
    test("happy path - lists v1 pipelines in account", () =>
      Effect.gen(function* () {
        const result = yield* Pipelines.listV1Pipeline({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(result.resultInfo).toBeDefined();
        expect(Array.isArray(result.result)).toBe(true);
        for (const pipeline of result.result) {
          expect(typeof pipeline.id).toBe("string");
          expect(typeof pipeline.name).toBe("string");
          expect(typeof pipeline.createdAt).toBe("string");
          expect(typeof pipeline.modifiedAt).toBe("string");
          expect(typeof pipeline.sql).toBe("string");
          expect(typeof pipeline.status).toBe("string");
        }
      }));

    test("pages() streams listV1Pipeline response pages", () =>
      Effect.gen(function* () {
        const pages = yield* Pipelines.listV1Pipeline
          .pages({
            accountId: accountId(),
          })
          .pipe(Stream.take(1), Stream.runCollect);

        const pagesArray = Array.from(pages);
        expect(pagesArray.length).toBe(1);
        expect(Array.isArray(pagesArray[0]?.result)).toBe(true);
        expect(pagesArray[0]?.resultInfo).toBeDefined();
      }));

    test("items() streams v1 pipeline items directly", () =>
      Effect.gen(function* () {
        const pipelines = yield* Pipelines.listV1Pipeline
          .items({
            accountId: accountId(),
          })
          .pipe(Stream.take(5), Stream.runCollect);

        for (const pipeline of Array.from(pipelines)) {
          expect(typeof pipeline.id).toBe("string");
          expect(typeof pipeline.name).toBe("string");
        }
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.listV1Pipeline({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getV1Pipeline
  // --------------------------------------------------------------------------
  describe("getV1Pipeline", () => {
    test("error - CloudflareHttpError for non-existent pipelineId", () =>
      Pipelines.getV1Pipeline({
        accountId: accountId(),
        pipelineId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.getV1Pipeline({
        accountId: "invalid-account-id-000",
        pipelineId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for empty pipelineId", () =>
      Pipelines.getV1Pipeline({
        accountId: accountId(),
        pipelineId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // createV1Pipeline
  // --------------------------------------------------------------------------
  describe("createV1Pipeline", () => {
    test("error - validation error for invalid SQL in pipeline", () =>
      Pipelines.createV1Pipeline({
        accountId: accountId(),
        name: "distilled_cf_pipelines_v1_bad_sql",
        sql: "NOT VALID SQL ;;;",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.createV1Pipeline({
        accountId: "invalid-account-id-000",
        name: "distilled_cf_pipelines_v1_bad_acct",
        sql: "SELECT * FROM stream",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - validation error for empty pipeline name", () =>
      Pipelines.createV1Pipeline({
        accountId: accountId(),
        name: "",
        sql: "SELECT * FROM stream",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - validation error for empty SQL string", () =>
      Pipelines.createV1Pipeline({
        accountId: accountId(),
        name: "distilled_cf_pipelines_v1_empty_sql",
        sql: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteV1Pipeline
  // --------------------------------------------------------------------------
  describe("deleteV1Pipeline", () => {
    test("error - CloudflareHttpError for non-existent pipelineId", () =>
      Pipelines.deleteV1Pipeline({
        accountId: accountId(),
        pipelineId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.deleteV1Pipeline({
        accountId: "invalid-account-id-000",
        pipelineId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for empty pipelineId", () =>
      Pipelines.deleteV1Pipeline({
        accountId: accountId(),
        pipelineId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // Legacy createPipeline Operation
  // ==========================================================================

  // --------------------------------------------------------------------------
  // createPipeline
  // --------------------------------------------------------------------------
  describe("createPipeline", () => {
    test("error - validation error for invalid credentials", () =>
      Pipelines.createPipeline({
        accountId: accountId(),
        name: "distilled-cf-pipelines-create-bad-creds",
        destination: {
          batch: {},
          compression: {},
          credentials: {
            accessKeyId: "fake-access-key",
            endpoint: "https://fake-endpoint.example.com",
            secretAccessKey: "fake-secret-key",
          },
          format: "json",
          path: { bucket: "nonexistent-bucket" },
          type: "r2",
        },
        source: [{ format: "json", type: "http" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Pipelines.createPipeline({
        accountId: "invalid-account-id-000",
        name: "distilled-cf-pipelines-create-bad-acct",
        destination: {
          batch: {},
          compression: {},
          credentials: {
            accessKeyId: "fake",
            endpoint: "https://fake.example.com",
            secretAccessKey: "fake",
          },
          format: "json",
          path: { bucket: "test" },
          type: "r2",
        },
        source: [{ format: "json", type: "http" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty pipeline name", () =>
      Pipelines.createPipeline({
        accountId: accountId(),
        name: "",
        destination: {
          batch: {},
          compression: {},
          credentials: {
            accessKeyId: "fake",
            endpoint: "https://fake.example.com",
            secretAccessKey: "fake",
          },
          format: "json",
          path: { bucket: "test" },
          type: "r2",
        },
        source: [{ format: "json", type: "http" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty source array", () =>
      Pipelines.createPipeline({
        accountId: accountId(),
        name: "distilled-cf-pipelines-create-no-source",
        destination: {
          batch: {},
          compression: {},
          credentials: {
            accessKeyId: "fake",
            endpoint: "https://fake.example.com",
            secretAccessKey: "fake",
          },
          format: "json",
          path: { bucket: "test" },
          type: "r2",
        },
        source: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });
});
