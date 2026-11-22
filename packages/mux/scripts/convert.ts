#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Mux API OpenAPI document into Smithy 2.0 JSON models,
 * one per service.
 *
 * Input:  specs/spec-mirror-mux/specs/api-spec.json  (spec submodule — the
 *         https://www.mux.com/api-spec.json document Mux's own SDKs and API
 *         reference are generated from)
 *         patches/<service>/*.json  (RFC-6902 patches to the Smithy models)
 * Output: .generated-specs/{video,data,system,robots}.json
 *
 * SERVICES. The document groups its tags with `x-tagGroups` — `Video`,
 * `Data`, `System`, `Robots` and `Robots v0` — which is how Mux's API
 * reference and its official SDKs split the API. Each group becomes one
 * service, read straight off the document so a tag Mux adds to a group joins
 * that service without an edit here. A tag that belongs to no group, or a
 * group this script does not know, fails the conversion rather than
 * dropping operations.
 *
 * DEPRECATED. Every operation marked `deprecated` is skipped (the converter
 * default). All of them have a generated replacement: `Robots v0` (the
 * whole group) → `Robots`; URL Signing Keys → System Signing Keys; Real-Time
 * → Monitoring; Filters → Dimensions; `list-exports` → `list-exports-views`;
 * `update-asset-mp4-support` → static renditions.
 *
 * NOT GENERATED. Mux's `full-combined-spec.json` adds image.mux.com
 * (thumbnails, GIFs, storyboards) and stream.mux.com (HLS manifests, MP4
 * renditions, text tracks). Those are unauthenticated playback URLs answering
 * images, video and VTT, not JSON API calls, so they are not mirrored. The
 * webhook spec is AsyncAPI: events Mux sends, not operations.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const SPEC_PATH = "specs/spec-mirror-mux/specs/api-spec.json";

const METHODS = ["get", "put", "post", "patch", "delete"] as const;

/** `x-tagGroups` name → service (output model and module name). */
const SERVICES: Readonly<Record<string, { name: string; serviceName: string } | null>> = {
  Video: { name: "video", serviceName: "MuxVideo" },
  Data: { name: "data", serviceName: "MuxData" },
  System: { name: "system", serviceName: "MuxSystem" },
  Robots: { name: "robots", serviceName: "MuxRobots" },
  // Every operation in it is deprecated in favour of `Robots`.
  "Robots v0": null,
};

/** Tag → service name, built from the document's `x-tagGroups`. */
const serviceOfTag = (spec: any): Map<string, string | null> => {
  const groups = spec["x-tagGroups"];
  if (!Array.isArray(groups) || groups.length === 0) {
    throw new Error(`${SPEC_PATH}: no x-tagGroups — cannot split the API into services`);
  }
  const byTag = new Map<string, string | null>();
  for (const group of groups) {
    if (!(group.name in SERVICES)) {
      throw new Error(`${SPEC_PATH}: unknown x-tagGroups entry "${group.name}"`);
    }
    const service = SERVICES[group.name];
    for (const tag of group.tags ?? []) byTag.set(tag, service?.name ?? null);
  }
  return byTag;
};

/**
 * Keep only the operations whose first tag belongs to `service`. Path items
 * left with no operation are dropped.
 */
const selectService =
  (service: string) =>
  (spec: any): void => {
    const byTag = serviceOfTag(spec);
    for (const [route, item] of Object.entries<any>(spec.paths ?? {})) {
      for (const method of METHODS) {
        const op = item?.[method];
        if (op === undefined) continue;
        const tag = op.tags?.[0];
        if (!byTag.has(tag)) {
          throw new Error(`${method.toUpperCase()} ${route}: tag "${tag}" is in no x-tagGroups`);
        }
        if (byTag.get(tag) !== service) delete item[method];
      }
      if (!METHODS.some((m) => item?.[m] !== undefined)) delete spec.paths[route];
    }
  };

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: Object.values(SERVICES)
    .filter((s) => s !== null)
    .map(({ name, serviceName }) => ({
      name,
      specPath: SPEC_PATH,
      preprocess: selectService(name),
      options: { namespace: `com.mux.${name}`, serviceName },
    })),
  patchesDir: "patches",
  options: {
    namespace: "com.mux",
    serviceName: "Mux",
    skipDeprecated: true,
    // The converter defaults, plus 412: `list-usage-exports` answers it while
    // the timeframe's usage CSVs are still being generated ("Retry after a
    // short delay"), which no core status class models.
    statusToErrorClass: {
      400: "BadRequest",
      403: "Forbidden",
      404: "NotFound",
      409: "Conflict",
      412: "PreconditionFailed",
      422: "UnprocessableEntity",
    },
  },
});
