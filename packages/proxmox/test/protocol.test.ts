import { ResponseValidation } from "@distilled.cloud/core";
import { traceparent } from "@distilled.cloud/core/telemetry-message-context";
import * as Effect from "effect/Effect";
import type { HttpClientRequest } from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import * as Tracer from "effect/Tracer";
import { describe, expect, it } from "vitest";
import { formEncode } from "../src/protocol.ts";
import { getClusterResources } from "../src/services/cluster.ts";
import {
  getNodesByNodeLxcByVmidConfig,
  putNodesByNodeLxcByVmidConfig,
} from "../src/services/nodes_lxc.ts";
import { mockLayer } from "./helpers.ts";

describe("Proxmox protocol", () => {
  it("authenticates and unwraps data", async () => {
    const result = await Effect.runPromise(
      getClusterResources({ type: "vm" }).pipe(
        Effect.provide(
          mockLayer((request) => {
            const authorization = request.headers.authorization;
            expect(
              Redacted.isRedacted(authorization) ? Redacted.value(authorization) : authorization,
            ).toBe("PVEAPIToken=test@pve!reader=test-secret");
            expect(request.url).toBe(
              "https://pve.example.com:8006/api2/json/cluster/resources?type=vm",
            );
            return { body: { data: [] } };
          }),
        ),
      ),
    );
    expect(result).toEqual([]);
  });

  it("encodes booleans, reserved characters and repeated array parameters", () => {
    expect(
      formEncode({
        enabled: true,
        disabled: false,
        text: "a=b & c",
        list: ["a", "b"],
        omitted: undefined,
      }),
    ).toBe("enabled=1&disabled=0&text=a%3Db+%26+c&list=a&list=b");
  });

  it("sends indexed families as form fields, not literal [n] keys", async () => {
    await Effect.runPromise(
      putNodesByNodeLxcByVmidConfig({
        node: "test",
        vmid: 4242,
        onboot: true,
        net0: "name=eth0,ip=dhcp",
      }).pipe(
        Effect.provide(
          mockLayer((request) => {
            expect(request.method).toBe("PUT");
            expect(request.body._tag).toBe("Uint8Array");
            if (request.body._tag === "Uint8Array") {
              expect(request.body.contentType).toBe("application/x-www-form-urlencoded");
              const form = new URLSearchParams(new TextDecoder().decode(request.body.body));
              expect(form.get("onboot")).toBe("1");
              expect(form.get("net0")).toBe("name=eth0,ip=dhcp");
              expect(form.has("node")).toBe(false);
            }
            return { body: { data: null } };
          }),
        ),
      ),
    );
  });

  it("encodes query booleans as 0/1", async () => {
    await Effect.runPromise(
      getNodesByNodeLxcByVmidConfig({ node: "test", vmid: 4242, current: true }).pipe(
        Effect.provide(
          mockLayer((request) => {
            expect(new URL(request.url).searchParams.get("current")).toBe("1");
            return { body: { data: {} } };
          }),
        ),
      ),
    );
  });

  it.each([
    [403, { message: "Permission check failed (/vms/4242, VM.Audit)\n", data: null }, "Forbidden"],
    [
      400,
      {
        message: "Parameter verification failed.\n",
        errors: { type: "value is not in the enumeration" },
        data: null,
      },
      "ParameterValidationError",
    ],
    [400, { message: "Bad request", data: null }, "BadRequest"],
    [404, { message: "Not found", data: null }, "NotFound"],
    [
      500,
      { data: null, message: "Configuration file 'nodes/example/lxc/4242.conf' does not exist\n" },
      "GuestNotFound",
    ],
    [
      500,
      {
        data: null,
        message: "Configuration file 'nodes/example/qemu-server/4242.conf' does not exist\n",
      },
      "GuestNotFound",
    ],
    [
      500,
      { data: null, message: "hostname lookup 'example' failed - not found" },
      "InternalServerError",
    ],
    [
      500,
      {
        data: null,
        message: "Configuration file 'nodes/example/storage/4242.conf' does not exist\n",
      },
      "InternalServerError",
    ],
    [418, { message: "Unexpected failure", data: null }, "UnknownProxmoxError"],
  ])("maps HTTP %i", async (status, body, tag) => {
    const error = await Effect.runPromise(
      getClusterResources({}).pipe(
        Effect.flip,
        Effect.provide(mockLayer(() => ({ status, body }))),
      ),
    );
    expect(error._tag).toBe(tag);
    if (error._tag === "ParameterValidationError")
      expect(error.errors).toEqual({ type: "value is not in the enumeration" });
  });

  it("validates indexed config fields and numeric boolean flags", async () => {
    const config = { digest: "test", net0: "name=eth0,ip=dhcp", onboot: 1 };
    const result = await Effect.runPromise(
      getNodesByNodeLxcByVmidConfig({ node: "test", vmid: 4242 }).pipe(
        Effect.provide(ResponseValidation.strict),
        Effect.provide(mockLayer(() => ({ body: { data: config } }))),
      ),
    );
    expect(result).toEqual(config);
  });

  it("rejects keys outside indexed families in strict mode", async () => {
    const error = await Effect.runPromise(
      getNodesByNodeLxcByVmidConfig({ node: "test", vmid: 4242 }).pipe(
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
        Effect.provide(mockLayer(() => ({ body: { data: { digest: "test", netx: "x" } } }))),
      ),
    );
    expect(error._tag).toBe("ProxmoxParseError");
  });

  it("uses core response validation and exposes a typed parse error", async () => {
    const error = await Effect.runPromise(
      getClusterResources({}).pipe(
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
        Effect.provide(mockLayer(() => ({ body: { data: "invalid" } }))),
      ),
    );
    expect(error._tag).toBe("ProxmoxParseError");
  });

  it("records the operation span and propagates its context", async () => {
    const spans: Tracer.NativeSpan[] = [];
    const requests: HttpClientRequest[] = [];
    const tracer = Tracer.make({
      span(options) {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    await Effect.runPromise(
      getClusterResources({}).pipe(
        Effect.provide(
          mockLayer((request) => {
            requests.push(request);
            return { body: { data: [] } };
          }),
        ),
        Effect.provideService(Tracer.Tracer, tracer),
      ),
    );
    expect(spans[0]?.name).toBe("Proxmox.GetClusterResources");
    expect(spans[0]?.attributes.get("http.response.status_code")).toBe(200);
    expect(requests[0]?.headers.traceparent).toBe(traceparent(spans[0]!));
  });
});
