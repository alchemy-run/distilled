/**
 * Whether a converted model's API, or one of its operations, is stable.
 *
 * A converter marks what the provider does not call generally available
 * (alpha, beta, preview) with Smithy's prelude `smithy.api#unstable` trait:
 *   - the whole API: on the model's service shape, or under the same key in
 *     `metadata` when the model has no service shape (GCP's);
 *   - one operation: on its operation shape.
 * A patch can add or remove the mark like any other trait. Generate splits
 * a model by the marks (see {@link splitByStability}): the unstable
 * operations go to a module in the package's `unstableOutDir` (see
 * `./cli.ts`), imported as `@distilled.cloud/<pkg>/unstable/<module>`, and
 * the rest to the module of the same name on the stable path.
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

/** Mark one operation shape unstable. */
export const markOperationUnstable = (operation: { traits?: Record<string, unknown> }): void => {
  operation.traits = { ...operation.traits, [UNSTABLE_TRAIT]: {} };
};

/** Whether the model's API carries the unstable mark. */
export const isUnstable = (model: Model): boolean => {
  const service = serviceShape(model);
  return service
    ? service.traits?.[UNSTABLE_TRAIT] !== undefined
    : model.metadata?.[UNSTABLE_TRAIT] !== undefined;
};

/** Resource members that name one operation. */
const LIFECYCLE = ["create", "put", "read", "update", "delete", "list"] as const;

/** Delete the operations in `drop`, and every reference to them. */
const dropOperations = (model: Model, drop: ReadonlySet<string>): void => {
  const shapes = model.shapes ?? {};
  for (const id of drop) delete shapes[id];
  for (const shape of Object.values(shapes)) {
    if (shape?.type !== "service" && shape?.type !== "resource") continue;
    for (const key of ["operations", "collectionOperations"]) {
      if (Array.isArray(shape[key])) {
        shape[key] = shape[key].filter((ref: any) => !drop.has(ref?.target));
      }
    }
    for (const key of LIFECYCLE) {
      if (drop.has(shape[key]?.target)) delete shape[key];
    }
  }
};

/**
 * The model's stable and unstable halves. A model whose API is marked is
 * all unstable; otherwise each operation goes by its own mark. A half with
 * no operation is `undefined`, except that a model with no operations at
 * all (types only) is stable. Mutates `model` and returns it as one half
 * when it does not need splitting.
 */
export const splitByStability = (
  model: Model,
): { readonly stable: Model | undefined; readonly unstable: Model | undefined } => {
  if (isUnstable(model)) return { stable: undefined, unstable: model };
  const operations = Object.entries(model.shapes ?? {}).filter(([, s]) => s?.type === "operation");
  const marked = new Set(
    operations.filter(([, s]) => s.traits?.[UNSTABLE_TRAIT] !== undefined).map(([id]) => id),
  );
  if (marked.size === 0) return { stable: model, unstable: undefined };
  if (marked.size === operations.length) return { stable: undefined, unstable: model };
  const unstable = structuredClone(model);
  dropOperations(unstable, new Set(operations.map(([id]) => id).filter((id) => !marked.has(id))));
  dropOperations(model, marked);
  return { stable: model, unstable };
};
