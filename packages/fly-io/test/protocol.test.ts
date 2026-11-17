import { inspect } from "node:util";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import { BadRequest, FlyIoParseError, UnknownFlyIoError } from "../src/errors.ts";
import type { FlyIoOpContext } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import {
  MachineStartFromCreatedState,
  MachineWaitTimeout,
  startMachine,
  stopMachine,
  waitMachine,
} from "../src/services/machines.ts";
import { createOrganizationToken, deleteSprite } from "../src/services/sprites.ts";

const recordedMessage =
  "failed_precondition: unable to start machine from current state: 'created'";
const machine = { app_name: "decoder-test", machine_id: "machine-test" };
const SECRET = "sentinel-secret-7f3a";

const respondWith = (status: number, body: string) =>
  Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => HttpClientResponse.fromWeb(request, new Response(body, { status }))),
      ),
    ),
    credentials({
      apiKey: Redacted.make("decoder-test"),
      apiBaseUrl: "https://fly.test",
    }),
  );

const decodeError = <A, E>(
  operation: Effect.Effect<A, E, FlyIoOpContext>,
  status: number,
  body: string,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(respondWith(status, body)), Effect.flip),
  );

// The suite recorded the message, but not the HTTP status or raw envelope.
const envelopes = [
  { name: "error", body: JSON.stringify({ error: recordedMessage }) },
  { name: "message", body: JSON.stringify({ message: recordedMessage }) },
  {
    name: "errors.detail",
    body: JSON.stringify({ errors: { detail: recordedMessage } }),
  },
  { name: "plain text", body: recordedMessage },
];

describe("Machines start precondition decoding", () => {
  for (const status of [400, 412]) {
    for (const { name, body } of envelopes) {
      test(`decodes the exact recorded message from ${name} at ${status}`, async () => {
        const error = await decodeError(startMachine(machine), status, body);
        expect(error).toBeInstanceOf(MachineStartFromCreatedState);
        expect(error).toMatchObject({ message: recordedMessage });
      });
    }

    test(`does not specialize unrelated ${status} errors`, async () => {
      for (const message of [
        "invalid machine configuration",
        "failed_precondition: unable to start machine from current state: 'destroyed'",
        "failed_precondition: unable to stop machine from current state: 'created'",
      ]) {
        const error = await decodeError(
          startMachine(machine),
          status,
          JSON.stringify({ error: message }),
        );
        expect(error).toBeInstanceOf(status === 400 ? BadRequest : UnknownFlyIoError);
        expect(error).toMatchObject({ message });
      }
    });
  }

  test("only specializes startMachine", async () => {
    const error = await decodeError(
      stopMachine(machine),
      412,
      JSON.stringify({ error: recordedMessage }),
    );
    expect(error).toBeInstanceOf(UnknownFlyIoError);
    expect(error).toMatchObject({ message: recordedMessage });
  });
});

describe("Machines wait timeout decoding", () => {
  const recordedWaitMessage =
    "deadline_exceeded: machine failed to reach desired state, started, currently stopped";

  // Statuses are synthetic; the live failure only captured the message.
  for (const status of [408, 412]) {
    test(`decodes the recorded waiter failure at ${status}`, async () => {
      const error = await decodeError(
        waitMachine(machine),
        status,
        JSON.stringify({ error: recordedWaitMessage }),
      );
      expect(error).toBeInstanceOf(MachineWaitTimeout);
      expect(error).toMatchObject({ message: recordedWaitMessage });
    });
  }

  test("decodes the recorded waiter failure from plain text", async () => {
    const error = await decodeError(waitMachine(machine), 412, recordedWaitMessage);
    expect(error).toBeInstanceOf(MachineWaitTimeout);
    expect(error).toMatchObject({ message: recordedWaitMessage });
  });

  test("matches other desired and current machine states", async () => {
    const message =
      "deadline_exceeded: machine failed to reach desired state, stopped, currently stopping";
    const error = await decodeError(waitMachine(machine), 412, JSON.stringify({ error: message }));
    expect(error).toBeInstanceOf(MachineWaitTimeout);
    expect(error).toMatchObject({ message });
  });

  for (const status of [400, 412]) {
    test(`does not specialize unrelated waiter errors at ${status}`, async () => {
      for (const message of [
        "deadline_exceeded: request timed out",
        "failed_precondition: machine failed to reach desired state, started, currently stopped",
        "machine failed to reach desired state, started, currently stopped",
        `other failure: ${recordedWaitMessage}`,
        `${recordedWaitMessage}; invalid configuration`,
      ]) {
        const error = await decodeError(
          waitMachine(machine),
          status,
          JSON.stringify({ error: message }),
        );
        expect(error).toBeInstanceOf(status === 400 ? BadRequest : UnknownFlyIoError);
        expect(error).toMatchObject({ message });
      }
    });
  }

  test("only specializes waitMachine", async () => {
    const error = await decodeError(
      startMachine(machine),
      412,
      JSON.stringify({ error: recordedWaitMessage }),
    );
    expect(error).toBeInstanceOf(UnknownFlyIoError);
    expect(error).toMatchObject({ message: recordedWaitMessage });
  });
});

describe("Sprites success decoding", () => {
  const mint = createOrganizationToken({ org: "personal" });

  test("a body cut off mid-secret fails in both modes without exposing it", async () => {
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const error = await decodeError(mint.pipe(Effect.provide(mode)), 200, `{"token":"${SECRET}`);
      expect(error).toBeInstanceOf(FlyIoParseError);
      expect(error).toMatchObject({ body: "[REDACTED]" });
      expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
    }
  });

  test("a strict mismatch with a sensitive output fails without exposing the body", async () => {
    const error = await decodeError(
      mint.pipe(Effect.provide(ResponseValidation.strict)),
      200,
      JSON.stringify({ token: [SECRET] }),
    );
    expect(error).toBeInstanceOf(FlyIoParseError);
    expect(error).toMatchObject({ body: "[REDACTED]" });
    expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
  });

  test("an operation whose token mint reply is cut off fails without exposing it", async () => {
    // Every Sprites operation but the mint itself first mints a bearer.
    const mintCutOff = Layer.mergeAll(
      Layer.succeed(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.sync(() => {
            const body = request.url.endsWith("/v1/tokens/current")
              ? JSON.stringify({ tokens: [{ org_slug: "personal" }] })
              : `{"token":"${SECRET}`;
            return HttpClientResponse.fromWeb(request, new Response(body, { status: 200 }));
          }),
        ),
      ),
      credentials({
        apiKey: Redacted.make("decoder-test-mint"),
        apiBaseUrl: "https://fly.test",
      }),
    );
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const error = await Effect.runPromise(
        deleteSprite({ name: "decoder-test" }).pipe(
          Retry.none,
          Effect.provide(mode),
          Effect.provide(mintCutOff),
          Effect.flip,
        ),
      );
      expect(error).toBeInstanceOf(FlyIoParseError);
      expect(error).toMatchObject({ body: "[REDACTED]" });
      expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
    }
  });

  test("a 200 response whose body is JSON null returns null", async () => {
    const result = await Effect.runPromise(
      createOrganizationToken({ org: "decoder-test" }).pipe(
        Effect.provide(respondWith(200, "null")),
      ),
    );
    expect(result).toBeNull();
  });
});
