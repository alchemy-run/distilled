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
 *
 * `distilled/explain-ignored-failure`: `Effect.ignore`, `Effect.ignoreCause`,
 * `Effect.orElseSucceed` and a `catch` / `catchCause` handler that never reads
 * the failure (no parameter, or one named `_...`, and not one that fails in
 * its turn with `new SomeError(...)` / `Effect.fail(...)`) turn a failure into a
 * success. Each needs a comment that says why the failure doesn't matter, on
 * the line above the statement it is in, or anywhere from there to its end.
 * `Effect.ignore({ log })` logs the failure, so it needs no comment.
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

/** Combinators that drop a failure whatever it is. */
const IGNORING = new Set(["ignore", "ignoreCause", "orElseSucceed"]);
/** Handlers that drop the failure when their callback doesn't read it. */
const CATCH_HANDLERS = new Set(["catch", "catchCause"]);

/** `new SomeError(...)` or `X.fail(...)`: a handler that fails in its turn. */
const fails = (body: Node): boolean =>
  body.type === "NewExpression" ||
  (body.type === "CallExpression" &&
    body.callee.type === "MemberExpression" &&
    body.callee.property.type === "Identifier" &&
    body.callee.property.name === "fail");

const ignoresItsArgument = (fn: Node | undefined): boolean =>
  fn !== undefined &&
  isFunction(fn) &&
  !fails(fn.body) &&
  (fn.params.length === 0 ||
    (fn.params.length === 1 &&
      fn.params[0].type === "Identifier" &&
      fn.params[0].name.startsWith("_")));

/** `Effect.ignore({ log: ... })`: the failure is logged, not lost. */
const logsIt = (member: Node): boolean => {
  const call = member.parent;
  const options = call?.type === "CallExpression" && call.callee === member ? call.arguments : [];
  return options.some(
    (arg: Node) =>
      arg.type === "ObjectExpression" &&
      arg.properties.some(
        (prop: Node) =>
          prop.type === "Property" && prop.key.type === "Identifier" && prop.key.name === "log",
      ),
  );
};

/** The nearest statement around `node` (or a class member, an object key). */
const enclosingStatement = (node: Node): Node => {
  let up: Node = node;
  while (
    up.parent &&
    !/(Statement|Declaration)$/.test(up.type) &&
    up.type !== "PropertyDefinition" &&
    up.type !== "Property"
  ) {
    up = up.parent;
  }
  return up;
};

type LintContext = {
  report(d: { node: Node; messageId: string; data?: Record<string, string> }): void;
  sourceCode: {
    getAllComments(): Array<{ loc: { start: { line: number }; end: { line: number } } }>;
  };
};

const explainIgnoredFailure = {
  meta: {
    type: "problem",
    docs: { description: "Require a comment on code that turns a failure into a success" },
    messages: {
      unexplained:
        "{{what}} drops a failure. Say why that is safe in a comment above this statement, or handle the failure (fail with a typed error, or log it with Effect.ignore({ log })).",
    },
    schema: [],
  },
  create(context: LintContext) {
    const commentLines = context.sourceCode.getAllComments().map((c) => c.loc);
    const explained = (node: Node): boolean => {
      const from = enclosingStatement(node).loc.start.line - 1;
      const to = node.loc.end.line;
      return commentLines.some((c) => c.end.line >= from && c.start.line <= to);
    };
    const check = (node: Node, what: string) => {
      if (!explained(node)) context.report({ node, messageId: "unexplained", data: { what } });
    };
    return {
      MemberExpression(node: Node) {
        if (
          node.object.type === "Identifier" &&
          EFFECT_MODULES.has(node.object.name) &&
          node.property.type === "Identifier" &&
          IGNORING.has(node.property.name) &&
          !logsIt(node)
        ) {
          check(node, `${node.object.name}.${node.property.name}`);
        }
      },
      CallExpression(node: Node) {
        const callee = node.callee;
        if (
          callee.type === "MemberExpression" &&
          callee.property.type === "Identifier" &&
          CATCH_HANDLERS.has(callee.property.name) &&
          ignoresItsArgument(node.arguments[node.arguments.length - 1])
        ) {
          check(node, `A .${callee.property.name} handler that never reads the error`);
        }
      },
    };
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
    "explain-ignored-failure": explainIgnoredFailure,
    "no-throw-in-effect": noThrowInEffect,
    "no-function-constructor": noFunctionConstructor,
  },
};
