import type { SmithyModel } from "@distilled.cloud/core/codegen/openapi";

/** Mark unambiguous list responses whose inputs model GitHub pagination. */
export const addPagination = (model: SmithyModel): void => {
  for (const op of Object.values(model.shapes)) {
    if (
      op.type !== "operation" ||
      op.traits?.["smithy.api#http"]?.method !== "GET"
    )
      continue;
    const input = model.shapes[op.input?.target];
    const output = model.shapes[op.output?.target];
    if (!input?.members || !output?.members) continue;
    const inputTokens = ["page", "after", "before", "since", "cursor"].filter(
      (name) => {
        const member = input.members[name];
        return (
          member?.traits?.["smithy.api#httpQuery"] === name &&
          (name !== "since" || member.target === "smithy.api#Integer") &&
          // Repository/notification before/after timestamps are filters, not cursors.
          ((name !== "after" && name !== "before") ||
            /\bcursor\b/i.test(
              member.traits?.["smithy.api#documentation"] ?? "",
            ))
        );
      },
    );
    const inputToken = inputTokens[0];
    if (!inputToken) continue;
    const arrays = Object.entries<{
      target: string;
      traits?: Record<string, unknown>;
    }>(output.members).filter(
      ([, member]) => model.shapes[member.target]?.type === "list",
    );
    // Multiple arrays are often a detail response (e.g. commit files and
    // parents). Do not guess which collection the endpoint paginates.
    if (arrays.length !== 1) continue;
    const [name, member] = arrays[0]!;
    const raw =
      member.traits?.["com.distilled.openapi#rawResponse"] !== undefined;
    if (raw && Object.keys(output.members).length !== 1) continue;
    op.traits["smithy.api#paginated"] = {
      mode: "link",
      inputToken,
      ...(inputTokens.length > 1 ? { inputTokens } : {}),
      items: raw ? "$" : name,
      ...(input.members.per_page ? { pageSize: "per_page" } : {}),
    };
  }
};
