/**
 * No call ends in a defect (issue #1227). One operation per protocol of
 * every SDK runs against a fake HttpClient: with responses a provider
 * should not send, then with inputs the types forbid. A call may succeed or
 * fail with a typed error. It must not crash the fiber, and it must not
 * fail with `SdkError`: that is the defect boundary (core/api `failed`)
 * reporting a line that threw, and the failure here names the line.
 *
 * The operations are the programs of the SDK benchmarks
 * (`benches/sdks/targets.json`): a credentials layer and one call for each
 * protocol, with dummy credentials. Nothing reaches the network.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as Cause from "effect/Cause";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";
import { getProps } from "../src/annotations.ts";

const REPO = join(import.meta.dirname, "..", "..", "..");
const PACKAGES = join(REPO, "packages");

//#region The programs

interface Reply {
  readonly status: number;
  readonly headers: Record<string, string>;
  readonly body: string;
}

interface Target {
  readonly pkg: string;
  readonly protocol: string;
  readonly label: string;
  /** Alias -> `pkg:<module>` or `core:<module>`. */
  readonly imports: Record<string, string>;
  /** Layer expression for the SDK's credentials. */
  readonly auth: string;
  /** Effect expression for one call, `Op.<name>(<JSON input>)` for all but the GraphQL SDKs. */
  readonly call: string;
  readonly env: Record<string, string>;
  /** A response the call succeeds with. */
  readonly response: Reply;
}

const targets = Object.values(
  JSON.parse(readFileSync(join(REPO, "benches", "sdks", "targets.json"), "utf8")) as Record<
    string,
    Record<string, Target>
  >,
).flatMap((byProtocol) => Object.values(byProtocol));

/** The expressions of a target name their imports and these. */
const evaluate = (expression: string, scope: Record<string, unknown>): any =>
  new Function(...Object.keys(scope), `return (${expression});`)(...Object.values(scope));

const stateKey = Symbol.for("@distilled.cloud/core/api/OperationState");
type Operation = ((input: unknown) => Effect.Effect<unknown, unknown, unknown>) & {
  readonly input: { readonly ast: Parameters<typeof getProps>[0] };
};
const isOperation = (value: unknown): value is Operation =>
  typeof value === "function" && stateKey in value;

interface Program {
  readonly name: string;
  /** `<pkg> <protocol>`: what {@link SELF_CONTAINING} lists. */
  readonly key: string;
  /** The operation and the target's input for it; `undefined` for a GraphQL query. */
  readonly operation: Operation | undefined;
  readonly input: Record<string, unknown>;
  /** The target names an operation that no longer exists: another one of its module stands in. */
  readonly stale: boolean;
  /** One call with the target's own input. */
  readonly call: () => Effect.Effect<unknown, unknown, unknown>;
  readonly good: Reply;
  /** What the fake HttpClient answers from now on. */
  reply(reply: Reply): void;
  /** `effect` with the SDK's credentials and the fake HttpClient. */
  run(effect: Effect.Effect<unknown, unknown, unknown>): Promise<Exit.Exit<unknown, unknown>>;
}

/** Sleeps return at once, for the GraphQL client: its retries have no policy to turn off. */
const noSleep = Layer.effect(
  Clock.Clock,
  Effect.clockWith((clock) =>
    Effect.succeed(Object.assign(Object.create(clock), { sleep: () => Effect.void })),
  ),
);

/** The program of `target`, or `undefined` when a spec update removed the module of its operation. */
const load = async (target: Target): Promise<Program | undefined> => {
  const scope: Record<string, unknown> = { Effect, Layer, Redacted };
  for (const [alias, spec] of Object.entries(target.imports)) {
    const [from, module] = spec.split(":") as [string, string];
    const file = join(PACKAGES, from === "core" ? "core" : target.pkg, "src", `${module}.ts`);
    if (alias === "Op" && !existsSync(file)) return undefined;
    scope[alias] = await import(file);
  }
  let current = target.response;
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(current.status === 204 ? null : current.body, {
            status: current.status,
            headers: current.headers,
          }),
        ),
      ),
    ),
  );
  let layer: Layer.Layer<any, any, any> = Layer.mergeAll(evaluate(target.auth, scope), client);
  // No retries, so a 5xx is one request and no backoff sleep: the SDK's own
  // retry tag, and S3's, which the AWS operations use.
  for (const pkg of [target.pkg, "s3"]) {
    const file = join(PACKAGES, pkg, "src", "retry.ts");
    if (!existsSync(file)) continue;
    const retry = await import(file);
    if (retry.Retry !== undefined) {
      layer = Layer.mergeAll(layer, Layer.succeed(retry.Retry, { while: () => false }));
    }
  }
  const named = /^Op\.(\w+)\(([\s\S]*)\)$/.exec(target.call);
  let operation: Operation | undefined;
  let input: Record<string, unknown> = {};
  let stale = false;
  if (named !== null) {
    const module = scope.Op as Record<string, unknown>;
    const own = module[named[1]!];
    if (isOperation(own)) {
      operation = own;
      input = JSON.parse(named[2] || "{}");
    } else {
      // A spec update removed the operation, and the benchmarks have not
      // picked another yet: any operation of the module runs the same
      // protocol code.
      stale = true;
      operation = Object.keys(module)
        .sort()
        .map((name) => module[name])
        .find(isOperation);
    }
  } else {
    layer = Layer.mergeAll(layer, noSleep);
  }
  const context = await Effect.runPromise(
    Effect.scoped(Layer.build(layer as Layer.Layer<unknown, unknown>)),
  );
  return {
    name: `${target.pkg} ${target.label}`,
    key: `${target.pkg} ${target.protocol}`,
    operation,
    input,
    stale,
    call: operation ? () => operation(input) : () => evaluate(target.call, scope),
    good: target.response,
    reply: (reply) => {
      current = reply;
    },
    run: (effect) => Effect.runPromiseExit(Effect.provideContext(effect, context as never)),
  };
};

// The dummy credentials the layers read (`RESEND_API_KEY=bench-secret`, ...).
for (const target of targets) Object.assign(process.env, target.env);

const programs = Promise.all(targets.map(load)).then((loaded) =>
  loaded.filter((program) => program !== undefined),
);

//#endregion

//#region What a call did

/** The first line of `stack` in this repo's own code. */
const lineOf = (stack: unknown): string => {
  const frame = String(stack)
    .split("\n")
    .find((line) => line.includes("/packages/") && !line.includes("/node_modules/"));
  return frame === undefined ? "?" : frame.trim().replace(`${REPO}/`, "").replace(/^at /, "");
};

/** What went wrong in a call, or `undefined`: it succeeded or failed with a typed error. */
const defectOf = async (
  program: Program,
  make: () => Effect.Effect<unknown, unknown, unknown>,
): Promise<string | undefined> => {
  let effect: Effect.Effect<unknown, unknown, unknown>;
  try {
    effect = make();
  } catch (thrown) {
    return `the call threw before it returned an Effect: ${String(thrown)}`;
  }
  const exit = await program.run(effect);
  if (Exit.isSuccess(exit)) return undefined;
  if (Cause.hasDies(exit.cause)) {
    const defect = Cause.squash(exit.cause);
    return `the fiber died at ${lineOf((defect as Error)?.stack)}: ${String(defect)}`;
  }
  const error = Cause.squash(exit.cause) as { _tag?: string; message?: string; cause?: Error };
  if (error?._tag !== "SdkError") return undefined;
  return error.cause === undefined
    ? `SdkError: ${error.message}`
    : `${lineOf(error.cause.stack)} threw ${String(error.cause)}`;
};

/** Defects by what went wrong, each with how often, in which programs and one case. */
class Found {
  readonly byWhat = new Map<string, { calls: number; programs: Set<string>; first: string }>();
  add(what: string, program: Program, on: string): void {
    const found = this.byWhat.get(what) ?? { calls: 0, programs: new Set(), first: on };
    found.calls++;
    found.programs.add(program.name);
    this.byWhat.set(what, found);
  }
  report(): string[] {
    return [...this.byWhat].map(
      ([what, { calls, programs, first }]) =>
        `${what} (${calls} calls in ${programs.size} programs, first: ${[...programs][0]} with ${first})`,
    );
  }
}

//#endregion

const STATUSES = [200, 201, 204, 400, 404, 429, 500, 503];
const BODIES = [
  "",
  "null",
  "[]",
  "{}",
  '"x"',
  "0",
  "true",
  "{",
  "[1,",
  '{"data":null,"result":null,"results":null,"items":null,"errors":null,"error":null,"message":null,"code":null,"success":true}',
  '{"data":[],"result":"x","errors":"x","error":"x","message":{},"code":{},"success":"no","result_info":"x"}',
  '{"errors":[null,1,"x",{"code":null,"message":null}],"error":{"message":[],"code":{},"type":7,"errors":[null]},"messages":null}',
  '[null,1,{"id":null}]',
  '{"__type":null,"message":null,"Message":7,"code":[],"Error":null}',
  "<html><body>502 Bad Gateway</body></html>",
  "<",
  '<?xml version="1.0"?><Error><Code/><Message/></Error>',
  "<Error><Code>X",
  "<a/>",
  "<ErrorResponse><Error><Code>Throttling</Code></Error>",
  "\u0000\u0001\ufffd binary",
  "not json at all",
  // gRPC frames: one that is longer than the body, a compressed one, and
  // messages cut off inside a varint and inside a string.
  "\u0000\u0000\u0000\u0000\u0005ab",
  "\u0001\u0000\u0000\u0000\u0000",
  "\u0000\u0000\u0000\u0000\u0002\u0008\u0080",
  "\u0000\u0000\u0000\u0000\u0002\u000a\u007f",
];
/** Headers a response parser reads, with values it can't parse. */
const HEADERS = { "retry-after": "soon", "x-ratelimit-reset": "NaN" };

test("every program runs: its own call succeeds with its own response", async () => {
  const broken: string[] = [];
  for (const program of await programs) {
    if (program.stale) continue;
    program.reply(program.good);
    const exit = await program.run(program.call());
    if (Exit.isFailure(exit)) {
      // Most often the SDK's credentials changed: the target needs the new layer.
      broken.push(
        `${program.name}: ${String(Cause.squash(exit.cause))}. Update its target in benches/sdks/targets.json.`,
      );
    }
  }
  expect(broken).toEqual([]);
}, 120_000);

test("a response the provider should not send fails the call with a typed error", async () => {
  const found = new Found();
  for (const program of await programs) {
    // Every body under every status with the content type the call expects;
    // under another type and under none, each body with one status of each class.
    const own = program.good.headers["content-type"] ?? "application/json";
    for (const type of [own, "text/html", undefined]) {
      for (const status of type === own ? STATUSES : [200, 404, 500]) {
        for (const body of BODIES) {
          program.reply({
            status,
            body,
            headers: type === undefined ? {} : { ...HEADERS, "content-type": type },
          });
          const defect = await defectOf(program, program.call);
          if (defect !== undefined) {
            found.add(
              defect,
              program,
              `${status} ${type ?? "no content type"} ${JSON.stringify(body)}`,
            );
          }
        }
      }
    }
  }
  expect(found.report()).toEqual([]);
}, 120_000);

const itself: Record<string, unknown> = {};
itself.self = itself;
const listOfItself: unknown[] = [];
listOfItself.push(listOfItself);

/** Values of the wrong type or shape, by what they are; the last two contain themselves. */
const VALUES: ReadonlyArray<readonly [string, unknown]> = [
  ["null", null],
  ["a lone surrogate", "\ud800"],
  ['""', ""],
  ["a path", "a/b/../c?d=1#e"],
  ["a header line", "a\r\nX-Injected: 1"],
  ["0", 0],
  ["-1", -1],
  ["NaN", NaN],
  ["Infinity", Infinity],
  ["true", true],
  ["{}", {}],
  ["[]", []],
  ["[null]", [null]],
  ["an invalid Date", new Date(NaN)],
  ["a BigInt", 10n],
  ["a list with a BigInt", [10n]],
  ["an object with a BigInt", { n: 10n }],
  ["a list with a lone surrogate", ["\ud800"]],
  ["an object with lone surrogates", { "\ud800": "\udfff" }],
  ["a symbol", Symbol("s")],
  ["a function", () => 1],
  ["an object that contains itself", itself],
  ["a list that contains itself", listOfItself],
];
const SELF = new Set<unknown>([itself, listOfItself]);

/**
 * Programs whose call throws on an input that contains itself: the SDK's own
 * protocol walks the input with `unwrapRedactedDeep`, which overflows the
 * stack. (`restProtocol` refuses such an input with `InvalidInput`.) Read as
 * scripts/compat/bun-failures.txt: the test fails on a throw missing from
 * the list, and on a listed program that no longer throws.
 */
const SELF_CONTAINING = new Set([
  "azure AzureDataPlaneProtocol",
  "azure AzureProtocol",
  "cloudflare CloudflarePaginatedProtocol",
  "cloudflare CloudflareProtocol",
  "coinbase CoinbaseProtocol",
  "fly-io SpritesProtocol",
  "gcp GcpProtocol",
  "google-workspace GoogleWorkspaceProtocol",
  "microsoft-graph MicrosoftGraphProtocol",
  "mongodb-atlas MongodbAtlasProtocol",
  "slack SlackProtocol",
  "stackit StackitProtocol",
  "stripe StripeProtocol",
  "supabase SupabaseProtocol",
  "zerossl ZeroSslProtocol",
]);

test("an input the types forbid fails the call with a typed error", async () => {
  const found = new Found();
  /** The listed programs that ran, and whether each still throws. */
  const listed = new Map<string, boolean>();
  for (const program of await programs) {
    const operation = program.operation;
    // A GraphQL query has no input object.
    if (operation === undefined) continue;
    program.reply(program.good);
    if (SELF_CONTAINING.has(program.key)) listed.set(program.key, false);
    const members = new Set([
      ...getProps(operation.input.ast).map((member) => String(member.name)),
      ...Object.keys(program.input),
    ]);
    // What the input is, the input, and whether it contains itself.
    const inputs: Array<readonly [string, unknown, boolean]> = [
      ["the input null", null, false],
      ["the input undefined", undefined, false],
      ["the input 0", 0, false],
      ['the input "x"', "x", false],
      ["the input []", [], false],
      ["an input that contains itself", itself, true],
    ];
    for (const member of members) {
      for (const [what, value] of VALUES) {
        inputs.push([
          `${member} = ${what}`,
          { ...program.input, [member]: value },
          SELF.has(value),
        ]);
      }
    }
    for (const [what, input, self] of inputs) {
      const defect = await defectOf(program, () => operation(input));
      if (defect === undefined) continue;
      if (self && listed.has(program.key) && defect.includes("Maximum call stack size exceeded")) {
        listed.set(program.key, true);
      } else {
        found.add(defect, program, what);
      }
    }
  }
  expect({
    defects: found.report(),
    // Remove these from SELF_CONTAINING: they no longer throw.
    fixed: [...listed].filter(([, throws]) => !throws).map(([key]) => key),
  }).toEqual({ defects: [], fixed: [] });
}, 120_000);
