/**
 * Whether a converted model's API is stable.
 *
 * A converter marks an API the provider does not call generally available
 * (alpha, beta, preview) with Smithy's prelude `smithy.api#unstable` trait:
 * on the model's service shape, or under the same key in `metadata` when
 * the model has no service shape (GCP's). A patch can add or remove the
 * mark like any other trait. Generate writes a marked model's module to the
 * package's `unstableOutDir` (see `./cli.ts`), imported as
 * `@distilled.cloud/<pkg>/unstable/<module>`.
 */

export const UNSTABLE_TRAIT = "smithy.api#unstable";

interface Model {
  shapes?: Record<string, any>;
  metadata?: Record<string, any>;
}

const serviceShape = (model: Model): any =>
  Object.values(model.shapes ?? {}).find((s) => s?.type === "service");

/** Mark the model's API unstable. */
export const markUnstable = (model: Model): void => {
  const service = serviceShape(model);
  if (service) service.traits = { ...service.traits, [UNSTABLE_TRAIT]: {} };
  else model.metadata = { ...model.metadata, [UNSTABLE_TRAIT]: {} };
};

/** Whether the model's API carries the unstable mark. */
export const isUnstable = (model: Model): boolean => {
  const service = serviceShape(model);
  return service
    ? service.traits?.[UNSTABLE_TRAIT] !== undefined
    : model.metadata?.[UNSTABLE_TRAIT] !== undefined;
};
