import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { MlflowCredentials, mlflowCredentialsOf } from "../src/credentials.ts";
import * as mlflow from "../src/services/model_experiments_mlflow.ts";

const TOKEN = "s3cret-token";
const URL_ = "https://abc.model-experiments.eu01.onstackit.cloud";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly body: unknown;
}

/** Answers every request with `answer`, and records it. */
const fakeInstance = (answer: { readonly status: number; readonly body: unknown }) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const requestBody = request.body;
        calls.push({
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          body:
            requestBody._tag === "Uint8Array"
              ? JSON.parse(new TextDecoder().decode(requestBody.body))
              : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(answer.body), { status: answer.status }),
        );
      }),
    ),
  );
  const credentials = Layer.succeed(
    MlflowCredentials,
    mlflowCredentialsOf({ instanceUrl: `${URL_}/`, token: Redacted.make(TOKEN) }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

// The answers below are what the ghcr.io/mlflow/mlflow:v3.1.1 image returned, read 2026-11-01.
const RUN = {
  info: {
    run_uuid: "aa85",
    experiment_id: "1390",
    run_name: "r",
    user_id: "",
    status: "RUNNING",
    start_time: 1000,
    artifact_uri: "mlflow-artifacts:/1390/aa85/artifacts",
    lifecycle_stage: "active",
    run_id: "aa85",
  },
  data: { tags: [{ key: "mlflow.runName", value: "r" }] },
  inputs: {},
  outputs: {},
};

describe("mlflowCredentialsOf", () => {
  test("a token with no known value fails before the wire", async () => {
    const exit = await Effect.runPromiseExit(
      mlflowCredentialsOf({ instanceUrl: URL_, token: undefined }),
    );
    expect(Exit.isFailure(exit)).toBe(true);
    expect(JSON.stringify(exit)).toContain("no known value");
  });

  test("a bare host gets https, and a user and password are dropped", async () => {
    const config = await Effect.runPromise(
      mlflowCredentialsOf({ instanceUrl: "user:pw@abc.example.com/", token: Redacted.make(TOKEN) }),
    );
    expect(config.apiUrl).toEqual("https://abc.example.com");
  });
});

describe("the tracking API", () => {
  test("createRun posts to the instance with the tracking token", async () => {
    const instance = fakeInstance({ status: 200, body: { run: RUN } });
    const { run } = await mlflow
      .createRun({ experiment_id: "1390", run_name: "r", start_time: 1000 })
      .pipe(Effect.provide(instance.layer), Effect.runPromise);
    expect(run.info.run_id).toEqual("aa85");
    expect(instance.calls).toEqual([
      {
        method: "POST",
        url: `${URL_}/api/2.0/mlflow/runs/create`,
        authorization: `Bearer ${TOKEN}`,
        body: { experiment_id: "1390", run_name: "r", start_time: 1000 },
      },
    ]);
  });

  test("getRun puts the id in the query", async () => {
    const instance = fakeInstance({ status: 200, body: { run: RUN } });
    await mlflow.getRun({ run_id: "aa85" }).pipe(Effect.provide(instance.layer), Effect.runPromise);
    expect(instance.calls[0]?.method).toEqual("GET");
    expect(instance.calls[0]?.url).toEqual(`${URL_}/api/2.0/mlflow/runs/get?run_id=aa85`);
  });

  test("logMetric takes the empty answer", async () => {
    const instance = fakeInstance({ status: 200, body: {} });
    await mlflow
      .logMetric({ run_id: "aa85", key: "m", value: 1.5, timestamp: 1000, step: 2 })
      .pipe(Effect.provide(instance.layer), Effect.runPromise);
    expect(instance.calls[0]?.url).toEqual(`${URL_}/api/2.0/mlflow/runs/log-metric`);
    expect(instance.calls[0]?.body).toEqual({
      run_id: "aa85",
      key: "m",
      value: 1.5,
      timestamp: 1000,
      step: 2,
    });
  });

  test("searchRuns takes the empty answer of a search that found nothing", async () => {
    const instance = fakeInstance({ status: 200, body: {} });
    const found = await mlflow
      .searchRuns({ experiment_ids: ["1390"], max_results: 1 })
      .pipe(Effect.provide(instance.layer), Effect.runPromise);
    expect(found.runs).toBeUndefined();
  });
});

describe("errors", () => {
  test("a missing run is NotFound", async () => {
    const instance = fakeInstance({
      status: 404,
      body: { error_code: "RESOURCE_DOES_NOT_EXIST", message: "Run 'nope' not found" },
    });
    const error = await mlflow
      .getRun({ run_id: "nope" })
      .pipe(Effect.flip, Effect.provide(instance.layer), Effect.runPromise);
    expect(error._tag).toEqual("NotFound");
    expect(error.message).toEqual("Run 'nope' not found");
  });

  test("a taken experiment name is ExperimentAlreadyExists, not BadRequest", async () => {
    const instance = fakeInstance({
      status: 400,
      body: { error_code: "RESOURCE_ALREADY_EXISTS", message: "Experiment 'e1' already exists." },
    });
    const error = await mlflow
      .createExperiment({ name: "e1" })
      .pipe(Effect.flip, Effect.provide(instance.layer), Effect.runPromise);
    expect(error._tag).toEqual("ExperimentAlreadyExists");
  });

  test("a missing parameter stays BadRequest", async () => {
    const instance = fakeInstance({
      status: 400,
      body: { error_code: "INVALID_PARAMETER_VALUE", message: "Missing value for 'name'" },
    });
    const error = await mlflow
      .createExperiment({ name: "" })
      .pipe(Effect.flip, Effect.provide(instance.layer), Effect.runPromise);
    expect(error._tag).toEqual("BadRequest");
  });

  test("a changed param value is ParamValueConflict, not BadRequest", async () => {
    const instance = fakeInstance({
      status: 400,
      body: {
        error_code: "INVALID_PARAMETER_VALUE",
        message: "Changing param values is not allowed. Param with key='p' was already logged",
      },
    });
    const error = await mlflow
      .logParam({ run_id: "aa85", key: "p", value: "2" })
      .pipe(Effect.flip, Effect.provide(instance.layer), Effect.runPromise);
    expect(error._tag).toEqual("ParamValueConflict");
  });
});
