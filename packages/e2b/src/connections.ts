/**
 * Data-plane connections from control-plane results -- hand-written.
 *
 * `createSandbox`, `connectSandbox` and `getSandbox` return the sandbox's
 * envd access token; `getVolume` returns the volume's content token. These
 * turn those results into the {@link SandboxConnection} /
 * {@link VolumeConnection} layers the envd and volume-content services read.
 */
import type { ConfigError } from "@distilled.cloud/core/errors";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  sandboxConnection,
  type SandboxConnection,
  volumeConnection,
  type VolumeConnection,
} from "./credentials.ts";
import type { Sandbox, SandboxDetail } from "./services/sandboxes.ts";
import type { VolumeAndToken } from "./services/volumes.ts";

/** A generated sensitive member, as a `Redacted`. */
const redact = (value: NonNullable<Sandbox["envdAccessToken"]>): Redacted.Redacted<string> =>
  Redacted.isRedacted(value) ? value : Redacted.make(value);

/**
 * Addresses the envd services below it to a sandbox the control plane
 * returned. The sandbox is checked once, when the layer is built.
 */
export const sandboxConnectionFor = (
  sandbox: Pick<Sandbox | SandboxDetail, "sandboxID" | "envdAccessToken" | "domain">,
): Layer.Layer<SandboxConnection, ConfigError> =>
  sandboxConnection({
    sandboxId: sandbox.sandboxID,
    accessToken:
      sandbox.envdAccessToken === undefined || sandbox.envdAccessToken === null
        ? undefined
        : redact(sandbox.envdAccessToken),
    domain: sandbox.domain ?? undefined,
  });

/**
 * Authenticates the `volumeContent` calls below it with a volume `getVolume`
 * returned. The volume is checked once, when the layer is built.
 */
export const volumeConnectionFor = (
  volume: Pick<VolumeAndToken, "token" | "domain">,
): Layer.Layer<VolumeConnection, ConfigError> =>
  volumeConnection({ token: redact(volume.token), domain: volume.domain ?? undefined });
