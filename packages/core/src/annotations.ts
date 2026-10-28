/**
 * Reading schema annotations through the wrappers a generated schema has:
 * Suspend, encodings, and `S.optional` / nullable unions. Shared by the
 * protocols (via `./protocol-http.ts`) and by `./telemetry.ts`, which
 * derives span facts from the same annotations.
 */
import type * as AST from "effect/SchemaAST";

/**
 * Marks a response schema whose entire value is the response body (see
 * `RawResponseRoot` in `./protocol-rest.ts`).
 */
export const rawResponseRootSymbol = /*@__PURE__*/ Symbol.for(
  "@distilled.cloud/core/raw-response-root",
);

export const getProps = (ast: AST.AST): readonly AST.PropertySignature[] => {
  if (ast._tag === "Objects") return ast.propertySignatures;
  if (ast._tag === "Suspend") return getProps(ast.thunk());
  if (ast.encoding && ast.encoding.length > 0) return getProps(ast.encoding[0]!.to);
  return [];
};

export const getAnn = (ast: AST.AST, symbol: symbol): unknown => {
  const direct = (ast.annotations as Record<symbol, unknown> | undefined)?.[symbol];
  if (direct !== undefined) return direct;
  if (ast._tag === "Suspend") return getAnn(ast.thunk(), symbol);
  if (ast.encoding && ast.encoding.length > 0) return getAnn(ast.encoding[0]!.to, symbol);
  // S.optional -> Union[self, Undefined]; descend into the single real member.
  if (ast._tag === "Union") {
    const real = (ast as AST.Union).types.filter(
      (t) => t._tag !== "Undefined" && !(t._tag === "Literal" && (t as any).literal === null),
    );
    if (real.length === 1) return getAnn(real[0]!, symbol);
  }
  return undefined;
};
