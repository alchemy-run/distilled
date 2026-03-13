import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export interface Config {
  /**
   * Bearer token for authenticating to the Kubernetes API server.
   * This can be a service account token, an OIDC token, an EKS
   * presigned STS token, or any token accepted by the cluster's
   * authentication layer.
   */
  readonly token: Redacted.Redacted<string>;

  /**
   * Base URL of the Kubernetes API server.
   *
   * There is no default — the URL must always be provided explicitly
   * because it varies per cluster (e.g. EKS endpoint, GKE endpoint,
   * `https://localhost:6443`, etc.).
   */
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "KubernetesCredentials",
) {}

/**
 * Build a credentials layer from environment variables.
 *
 * | Variable | Required | Description |
 * |---|---|---|
 * | `KUBERNETES_TOKEN` | yes | Bearer token for authentication |
 * | `KUBERNETES_API_URL` | yes | API server URL (e.g. from `kubectl cluster-info`) |
 */
export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const token = process.env.KUBERNETES_TOKEN;
    const apiBaseUrl = process.env.KUBERNETES_API_URL;

    if (!token) {
      return yield* new ConfigError({
        message:
          "KUBERNETES_TOKEN environment variable is required. " +
          "Set it to a bearer token for your Kubernetes cluster.",
      });
    }

    if (!apiBaseUrl) {
      return yield* new ConfigError({
        message:
          "KUBERNETES_API_URL environment variable is required. " +
          "Set it to the API server URL for your Kubernetes cluster " +
          "(e.g. from `kubectl cluster-info` or the EKS cluster endpoint).",
      });
    }

    return { token: Redacted.make(token), apiBaseUrl };
  }),
);
