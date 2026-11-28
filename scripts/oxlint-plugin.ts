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
 *
 * `distilled/or-throw`: lint can't follow a call, so a function that throws
 * says so in its name. A `throw` is allowed only in a function whose name
 * ends in `OrThrow` (or where it is caught at once: in a `try` block, or in
 * the callback of `Effect.try` / `Effect.tryPromise`). An `...OrThrow`
 * function is used only inside another `...OrThrow` function or inside the
 * callback of `Effect.try` / `Effect.tryPromise`: there the failure becomes
 * a typed one. A plain `try` around the call does not count.
 *
 * `distilled/no-unguarded-throwing-builtin`: `JSON.parse`, `JSON.stringify`,
 * `new URL`, `encodeURIComponent`, `decodeURIComponent`, `BigInt`, `atob`
 * and `new RegExp` throw on a value they can't handle (cut-off JSON, a
 * cycle, a lone surrogate, ...). A call to one is allowed in a `try` block,
 * in the callback of `Effect.try` / `Effect.tryPromise`, in an `...OrThrow`
 * function, or where it can't throw (see `cannotThrow`).
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

/** A function that throws says so in its name (`distilled/or-throw`). */
const OR_THROW = /OrThrow$/;

/** `x`, `this.x`, `a.b.x`: the last name of what a value is assigned to or called as. */
const lastName = (node: Node | undefined): string | undefined => {
  if (node?.type === "Identifier" || node?.type === "PrivateIdentifier") return node.name;
  if (node?.type === "MemberExpression" && !node.computed) return lastName(node.property);
  return undefined;
};

/** The name `fn` is defined under: its own, or the variable, member or key it is assigned to. */
const functionName = (fn: Node): string | undefined => {
  if (fn.id) return lastName(fn.id);
  const parent = fn.parent;
  switch (parent?.type) {
    case "VariableDeclarator":
      return parent.init === fn ? lastName(parent.id) : undefined;
    case "AssignmentExpression":
      return parent.right === fn ? lastName(parent.left) : undefined;
    case "Property":
    case "MethodDefinition":
    case "PropertyDefinition":
      return parent.value === fn && !parent.computed ? lastName(parent.key) : undefined;
    default:
      return undefined;
  }
};

/** Array and string methods that run their callback before they return. */
const RUNS_ITS_CALLBACK = new Set([
  "every",
  "filter",
  "find",
  "findIndex",
  "findLast",
  "flatMap",
  "forEach",
  "map",
  "reduce",
  "replace",
  "replaceAll",
  "some",
  "sort",
  "toSorted",
]);

/** Whether `fn` runs where it is written: called at once, or the callback of `xs.map(...)`, ... */
const runsInPlace = (fn: Node): boolean => {
  const call = fn.parent;
  if (call?.type !== "CallExpression") return false;
  if (call.callee === fn) return true;
  const method = call.callee.type === "MemberExpression" ? lastName(call.callee) : undefined;
  return method !== undefined && RUNS_ITS_CALLBACK.has(method) && call.arguments.includes(fn);
};

/**
 * What makes code that throws at `node` safe, if anything: it is in an
 * `...OrThrow` function (whose users are checked in their turn), in the
 * callback of `Effect.try` / `Effect.tryPromise`, or in a `try` block with a
 * `catch`. A `try` around a function does not catch what the function
 * throws when it runs later, so it counts only up to the function `node` is
 * in, and through callbacks that run in place.
 */
const guardOf = (node: Node): "orThrow" | "caught" | "try" | undefined => {
  let child: Node = node;
  let inPlace = true;
  for (let up = node.parent; up; child = up, up = up.parent) {
    if (inPlace && up.type === "TryStatement" && up.block === child && up.handler) return "try";
    if (!isFunction(up)) continue;
    if (isCaughtCallback(up)) return "caught";
    if (OR_THROW.test(functionName(up) ?? "")) return "orThrow";
    inPlace &&= runsInPlace(up);
  }
  return undefined;
};

/** Where an identifier names a thing without using it: a declaration, a key, an import, a type. */
const namesOnly = (node: Node): boolean => {
  const parent = node.parent!;
  switch (parent.type) {
    case "VariableDeclarator":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ClassDeclaration":
      return parent.id === node;
    case "Property":
    case "MethodDefinition":
    case "PropertyDefinition":
      // `{ decodeOrThrow }` is a use as well as a key.
      return parent.key === node && !parent.computed && parent.shorthand !== true;
    case "AssignmentExpression":
    case "AssignmentPattern":
      return parent.left === node;
    case "MemberExpression":
      // `x.decodeOrThrow = ...` defines it; anything else reads it.
      return (
        parent.property === node &&
        parent.parent?.type === "AssignmentExpression" &&
        parent.parent.left === parent
      );
    case "ImportSpecifier":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ExportSpecifier":
      return true;
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSNonNullExpression":
      return false;
    default:
      // A parameter, or a name in a type.
      return parent.type.startsWith("TS") || (isFunction(parent) && parent.params.includes(node));
  }
};

const orThrow = {
  meta: {
    type: "problem",
    docs: {
      description:
        "A function that throws is named `...OrThrow`, and is used only in another one or in Effect.try",
    },
    messages: {
      throwOutside:
        "A `throw` belongs in a function whose name ends in `OrThrow`, so its callers know to catch. Rename this function, or fail with a typed error.",
      useOutside:
        "`{{name}}` throws. Use it inside another `...OrThrow` function, or inside the callback of Effect.try / Effect.tryPromise, which turns the throw into a typed failure.",
    },
    schema: [],
  },
  create(context: LintContext) {
    return {
      ThrowStatement(node: Node) {
        if (guardOf(node) === undefined) context.report({ node, messageId: "throwOutside" });
      },
      Identifier(node: Node) {
        if (!OR_THROW.test(node.name) || namesOnly(node)) return;
        const guard = guardOf(node);
        if (guard !== "orThrow" && guard !== "caught") {
          context.report({ node, messageId: "useOutside", data: { name: node.name } });
        }
      },
    };
  },
};

/** Globals that throw on a value they can't handle, by how they are called. */
const THROWING_CALLS = new Set(["encodeURIComponent", "decodeURIComponent", "BigInt", "atob"]);
const THROWING_JSON = new Set(["parse", "stringify"]);
const THROWING_CONSTRUCTORS = new Set(["URL", "RegExp"]);

/** `x` for `x` and for `globalThis.x`. */
const globalName = (node: Node): string | undefined =>
  node.type === "Identifier"
    ? node.name
    : node.type === "MemberExpression" &&
        !node.computed &&
        node.object.type === "Identifier" &&
        node.object.name === "globalThis"
      ? lastName(node.property)
      : undefined;

/** The built-in a call or `new` runs, if it is one that throws: `JSON.parse`, `new URL`, ... */
const throwingBuiltin = (node: Node): string | undefined => {
  const callee: Node = node.callee;
  const name = globalName(callee);
  if (node.type === "NewExpression") {
    return name !== undefined && THROWING_CONSTRUCTORS.has(name) ? `new ${name}` : undefined;
  }
  if (name !== undefined) return THROWING_CALLS.has(name) ? name : undefined;
  if (
    callee.type === "MemberExpression" &&
    !callee.computed &&
    globalName(callee.object) === "JSON" &&
    THROWING_JSON.has(lastName(callee.property) ?? "")
  ) {
    return `JSON.${lastName(callee.property)}`;
  }
  return undefined;
};

/** A value written out in the call: it is the same on every run, so the call throws always or never. */
const isLiteral = (node: Node): boolean =>
  node.type === "Literal" || (node.type === "TemplateLiteral" && node.expressions.length === 0);

/** `x.method(...)` */
const isMethodCall = (node: Node | undefined, method: string): boolean =>
  node?.type === "CallExpression" &&
  node.callee.type === "MemberExpression" &&
  lastName(node.callee) === method;

/**
 * A statement that leaves the function when `test` holds: `if (test) return ...;`
 * (or `throw`), with or without braces.
 */
const leavesWhen = (statement: Node, test: (node: Node) => boolean): boolean => {
  if (statement.type !== "IfStatement" || !test(statement.test)) return false;
  const body: Node = statement.consequent;
  const last = body.type === "BlockStatement" ? body.body[body.body.length - 1] : body;
  return last?.type === "ReturnStatement" || last?.type === "ThrowStatement";
};

/**
 * Whether the call can't throw because of what it is given, or of a check
 * the code makes first:
 *
 *   JSON.stringify(String(x))  JSON.stringify(`...`)   a string always serializes
 *   encodeURIComponent(x.toWellFormed())               no lone surrogate is left
 *   URL.canParse(x) ? new URL(x) : ...                 also `&&`, `if (URL.canParse(x))`,
 *                                                      and after `if (!URL.canParse(x)) return`
 */
const cannotThrow = (node: Node, name: string, text: (node: Node) => string): boolean => {
  const args: Node[] = node.arguments;
  if (args.every(isLiteral)) return true;
  const first = args[0]!;
  if (name === "JSON.stringify") {
    return (
      first.type === "TemplateLiteral" ||
      (first.type === "CallExpression" && globalName(first.callee) === "String")
    );
  }
  if (name === "encodeURIComponent") return isMethodCall(first, "toWellFormed");
  if (name !== "new URL") return false;
  const given = args.map(text).join(", ");
  const canParse = (test: Node): boolean => text(test).includes(`URL.canParse(${given})`);
  const cannotParse = (test: Node): boolean => text(test) === `!URL.canParse(${given})`;
  let child: Node = node;
  for (let up = node.parent; up && !isFunction(child); child = up, up = up.parent) {
    if (
      (up.type === "ConditionalExpression" || up.type === "IfStatement") &&
      up.consequent === child &&
      canParse(up.test)
    ) {
      return true;
    }
    if (up.type === "LogicalExpression" && up.operator === "&&" && up.right === child) {
      if (canParse(up.left)) return true;
    }
    if (up.type === "BlockStatement" || up.type === "Program") {
      const before: Node[] = up.body.slice(0, up.body.indexOf(child));
      if (before.some((statement) => leavesWhen(statement, cannotParse))) return true;
    }
  }
  return false;
};

const noUnguardedThrowingBuiltin = {
  meta: {
    type: "problem",
    docs: { description: "Disallow built-ins that throw on bad data where nothing catches" },
    messages: {
      unguarded:
        "`{{name}}` throws on a value it can't handle, and nothing here catches it. Call it in a `try` block, in Effect.try, or in a function named `...OrThrow`.",
    },
    schema: [],
  },
  create(context: LintContext) {
    const text = (node: Node): string => context.sourceCode.getText(node);
    const check = (node: Node) => {
      const name = throwingBuiltin(node);
      if (name !== undefined && !cannotThrow(node, name, text) && guardOf(node) === undefined) {
        context.report({ node, messageId: "unguarded", data: { name } });
      }
      // `xs.map(encodeURIComponent)`, `.then(JSON.parse)`: the call happens in there.
      for (const argument of node.arguments as Node[]) {
        const passed = throwingBuiltin({ type: "CallExpression", callee: argument });
        if (passed !== undefined && guardOf(argument) === undefined) {
          context.report({ node: argument, messageId: "unguarded", data: { name: passed } });
        }
      }
    };
    return { CallExpression: check, NewExpression: check };
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
    getText(node: Node): string;
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
    "or-throw": orThrow,
    "no-unguarded-throwing-builtin": noUnguardedThrowingBuiltin,
  },
};
