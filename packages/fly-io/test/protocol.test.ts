import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials, spritesCredentials } from "../src/credentials.ts";
import { BadRequest, UnknownFlyIoError } from "../src/errors.ts";
import type { FlyIoOpContext } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import {
  MachineStartFromCreatedState,
  MachineWaitTimeout,
  startMachine,
  stopMachine,
  waitMachine,
} from "../src/services/machines.ts";
import { getSprite } from "../src/services/sprites.ts";

const recordedMessage =
  "failed_precondition: unable to start machine from current state: 'created'";
const machine = { app_name: "decoder-test", machine_id: "machine-test" };

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
  test("a 200 response whose body is JSON null returns null", async () => {
    const result = await Effect.runPromise(
      getSprite({ name: "decoder-test" }).pipe(
        Effect.provide(
          Layer.mergeAll(
            Layer.succeed(
              HttpClient.HttpClient,
              HttpClient.make((request) =>
                Effect.sync(() =>
                  HttpClientResponse.fromWeb(request, new Response("null", { status: 200 })),
                ),
              ),
            ),
            spritesCredentials({ token: Redacted.make("decoder-test") }),
          ),
        ),
      ),
    );
    expect(result).toBeNull();
  });
});
