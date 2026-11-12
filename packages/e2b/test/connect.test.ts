import { expect, test } from "vitest";
import {
  connectError,
  decodeProcessEvent,
  decodeWatchDirEvent,
  encodeEnvelope,
  takeEnvelopes,
} from "../src/connect.ts";

const endFrame = (json: unknown): Uint8Array => {
  const frame = encodeEnvelope(json);
  frame[0] = 0x02;
  return frame;
};

const concat = (...parts: Uint8Array[]): Uint8Array => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
};

test("encodeEnvelope frames JSON with a zero flag and a big-endian length", () => {
  const frame = encodeEnvelope({ a: 1 });
  const payload = new TextEncoder().encode(JSON.stringify({ a: 1 }));
  expect(frame[0]).toBe(0);
  expect(new DataView(frame.buffer).getUint32(1, false)).toBe(payload.length);
  expect(frame.subarray(5)).toEqual(payload);
});

test("takeEnvelopes decodes messages and the end-of-stream trailer across arbitrary chunk splits", () => {
  const wire = concat(
    encodeEnvelope({ event: { start: { pid: 7 } } }),
    encodeEnvelope({ event: { data: { stdout: btoa("hi") } } }),
    endFrame({}),
  );
  // Split at every byte boundary: the decoder must carry partial headers and payloads.
  for (let split = 0; split <= wire.length; split++) {
    const [rest, first] = takeEnvelopes(new Uint8Array(0), wire.subarray(0, split));
    const [remainder, second] = takeEnvelopes(rest, wire.subarray(split));
    expect(remainder.length).toBe(0);
    expect([...first, ...second]).toEqual([
      { _tag: "Message", json: { event: { start: { pid: 7 } } } },
      { _tag: "Message", json: { event: { data: { stdout: btoa("hi") } } } },
      { _tag: "End", json: {} },
    ]);
  }
});

test("decodeProcessEvent decodes each oneof case and base64 output", () => {
  expect(decodeProcessEvent({ event: { start: { pid: 42 } } })).toEqual({ _tag: "Start", pid: 42 });
  expect(decodeProcessEvent({ event: { data: { stderr: btoa("oops") } } })).toEqual({
    _tag: "Stderr",
    data: new TextEncoder().encode("oops"),
  });
  expect(
    decodeProcessEvent({ event: { end: { exitCode: 3, exited: true, status: "exit status 3" } } }),
  ).toEqual({ _tag: "End", exitCode: 3, exited: true, status: "exit status 3" });
  expect(decodeProcessEvent({ event: { keepalive: {} } })).toEqual({ _tag: "KeepAlive" });
  expect(decodeProcessEvent({ nope: true })._tag).toBe("E2BParseError");
});

test("decodeWatchDirEvent decodes filesystem events", () => {
  expect(decodeWatchDirEvent({ filesystem: { name: "a.txt", type: "EVENT_TYPE_CREATE" } })).toEqual(
    {
      _tag: "Filesystem",
      name: "a.txt",
      type: "EVENT_TYPE_CREATE",
    },
  );
  expect(decodeWatchDirEvent({ start: {} })).toEqual({ _tag: "Start" });
});

test("connectError maps Connect codes onto the SDK's error classes", () => {
  expect(connectError({ code: "not_found", message: "no process" }, {}, 200)._tag).toBe("NotFound");
  expect(connectError({ code: "unauthenticated" }, {}, 200)._tag).toBe("Unauthorized");
  expect(connectError({ code: "resource_exhausted", message: "x" }, {}, 200)._tag).toBe(
    "UnknownE2BError",
  );
});
