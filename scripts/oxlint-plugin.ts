/**
 * Repo lint rules oxlint has no built-in for (`oxlint.config.ts` loads this
 * as the `distilled` JS plugin).
 *
 * `distilled/no-throw-in-effect`: a `throw` that runs inside Effect code
 * (a callback given to `Effect.*`, `Stream.*`, `Layer.*`, ..., or an
 * `Effect.fn` / `Effect.gen` generator) is a defect -- `Effect.catch` can't
 * handle it, and retry and telemetry see a crash. Fail with a typed error
 * instead. Plain helpers may throw; the Effect code that calls them wraps the
 * call in `Effect.try` / `Effect.tryPromise` (whose `try` may throw) or a
 * `try` block.
 */

const EFFECT_MODULES = new Set(["Effect", "Stream", "Layer", "Channel", "Sink", "STM", "Micro"]);
/** Combinators whose callback is caught and turned into a typed failure. */
const CATCHING = new Set(["try", "tryPromise", "tryMap", "tryMapPromise"]);

type Node = { type: string; parent?: Node; [key: string]: any };

const isFunction = (node: Node): boolean =>
  node.type === "ArrowFunctionExpression" ||
  node.type === "FunctionExpression" ||
  node.type === "FunctionDeclaration";

/** `Effect.map`, ... -> `["Effect", "map"]`; `Effect.fn("x")` -> the same for `fn`. */
const effectCallee = (callee: Node | undefined): [string, string] | undefined => {
  if (callee?.type === "CallExpression") return effectCallee(callee.callee);
  if (
    callee?.type === "MemberExpression" &&
    callee.object.type === "Identifier" &&
    EFFECT_MODULES.has(callee.object.name) &&
    callee.property.type === "Identifier"
  ) {
    return [callee.object.name, callee.property.name];
  }
  return undefined;
};

/** Whether `fn` is the callback of `Effect.try` / `Effect.tryPromise`, either form. */
const isCaughtCallback = (fn: Node): boolean => {
  let call = fn.parent;
  if (call?.type === "Property" && call.key.type === "Identifier" && call.key.name === "try") {
    call = call.parent?.parent;
  }
  const callee = call?.type === "CallExpression" ? effectCallee(call.callee) : undefined;
  return callee !== undefined && CATCHING.has(callee[1]);
};

/**
 * Whether `fn` runs as Effect code: an argument of an Effect-module call
 * that does not catch, or a generator given to any call (`Effect.gen`,
 * `Effect.fnUntraced`, `Effect.fn("name")`).
 */
const isEffectCallback = (fn: Node): boolean => {
  const call = fn.parent;
  if (call?.type !== "CallExpression" || !call.arguments.includes(fn)) return false;
  const callee = effectCallee(call.callee);
  if (callee) return !CATCHING.has(callee[1]);
  return fn.generator === true && call.callee.type === "MemberExpression";
};

const noThrowInEffect = {
  meta: {
    type: "problem",
    docs: { description: "Disallow `throw` inside Effect code (it is a defect)" },
    messages: {
      throwInEffect:
        "`throw` inside Effect code is a defect. Fail with a typed error (Effect.fail), or move the throwing code into Effect.try / Effect.tryPromise.",
    },
    schema: [],
  },
  create(context: { report(d: { node: Node; messageId: string }): void }) {
    return {
      ThrowStatement(node: Node) {
        let child: Node = node;
        for (let up = node.parent; up; child = up, up = up.parent) {
          // Thrown inside a `try` block: the matching `catch` handles it.
          if (up.type === "TryStatement" && up.block === child) return;
          if (isFunction(up) && isCaughtCallback(up)) return;
          if (isFunction(up) && isEffectCallback(up)) {
            context.report({ node, messageId: "throwInEffect" });
            return;
          }
        }
      },
    };
  },
};

const isFunctionConstructor = (callee: Node): boolean =>
  (callee.type === "Identifier" && callee.name === "Function") ||
  (callee.type === "MemberExpression" &&
    callee.object.type === "Identifier" &&
    (callee.object.name === "globalThis" || callee.object.name === "window") &&
    callee.property.type === "Identifier" &&
    callee.property.name === "Function");

const noFunctionConstructor = {
  meta: {
    type: "problem",
    docs: { description: "Disallow `Function(...)` / `new Function(...)` (code from a string)" },
    messages: {
      functionConstructor:
        "`Function(...)` compiles code from a string. Only core's distilled-lazy loader may (with a disable comment).",
    },
    schema: [],
  },
  create(context: { report(d: { node: Node; messageId: string }): void }) {
    const check = (node: Node) => {
      if (isFunctionConstructor(node.callee)) {
        context.report({ node, messageId: "functionConstructor" });
      }
    };
    return { CallExpression: check, NewExpression: check };
  },
};

/** `no-empty` lets a comment stand in for handling; this rule wants a statement. */
const noSwallowedCatch = {
  meta: {
    type: "problem",
    docs: { description: "Disallow a `catch` block with no statement (comments don't count)" },
    messages: {
      swallowedCatch:
        "This `catch` swallows the failure. Handle it: fail with a typed error, return the fallback explicitly, or rethrow.",
    },
    schema: [],
  },
  create(context: { report(d: { node: Node; messageId: string }): void }) {
    return {
      CatchClause(node: Node) {
        if (node.body.body.length === 0) context.report({ node, messageId: "swallowedCatch" });
      },
    };
  },
};

export default {
  meta: { name: "distilled" },
  rules: {
    "no-swallowed-catch": noSwallowedCatch,
    "no-throw-in-effect": noThrowInEffect,
    "no-function-constructor": noFunctionConstructor,
  },
};
