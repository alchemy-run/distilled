# @distilled.cloud/typesafe-ai

Effect-native [TypeSafe](https://docs.typesafe.ai/introduction) SDK. Ask a
small model typed questions about a state and get calibrated answers back in
around 100ms — the reflex judgment you put in front of a slower, deliberate
model.

```ts
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as TypesafeAi from "@distilled.cloud/typesafe-ai";

const program = TypesafeAi.query(
  {
    department: TypesafeAi.Choice("Which team should handle `message`?", {
      billing: "Charges, invoices, refunds",
      technical: "Errors, outages, how-to",
      sales: null, // the name is enough
    }),
    isUrgent: TypesafeAi.Noul("Does `message` convey time pressure?"),
    frustration: TypesafeAi.Score("How frustrated is the customer?", [
      "Calm",
      "Frustrated",
      "Very angry",
    ]),
  },
  { state: { message: "Help! My payouts have been failing for 3 days." } },
);

const verdict = await Effect.runPromise(
  program.pipe(
    Effect.provide(TypesafeAi.CredentialsFromEnv),
    Effect.provide(FetchHttpClient.layer),
  ),
);

verdict.value.department; // "billing" — decoded into the question's type
verdict.value.isUrgent; // true
verdict.answers.department?.confidence; // 0.94
```

Questions are a plain record: the question text first, the way you would read
it aloud. Every question in a request sees the same state and is evaluated in
parallel, so extra questions are nearly free — ask everything you might branch
on, including questions whose answers only matter for some inputs, and decide
in code ([speculative fan-out](https://docs.typesafe.ai/patterns/fan-out)).
State and questions share a budget of roughly 32,000 tokens.

## Spec source

Generated from TypeSafe's first-party OpenAPI document,
[`https://api.typesafe.ai/openapi.json`](https://api.typesafe.ai/openapi.json)
(OpenAPI 3.1; API docs at <https://docs.typesafe.ai/api>). Two operations:

| Operation    | Route             |
| ------------ | ----------------- |
| `systemOne`  | `POST /v1/systemone` |
| `listModels` | `GET /v1/models`  |

HTTP 529 (overloaded) maps to a retryable error; 422 bodies unpack FastAPI's
`{ detail }` into `UnprocessableEntity`.

## Auth

`CredentialsFromEnv` reads `TYPESAFE_API_KEY` (required), `TYPESAFE_BASE_URL`
and `TYPESAFE_DEFAULT_MODEL` (both optional), matching the variables the
official JS SDK uses.

The read goes through `effect/Config` and happens **when the layer builds**,
not per request. Deploy frameworks that bind environment values by watching
`Config` reads during construction — [Alchemy](https://alchemy.run), for one —
only observe a read made while the layer stack is being built; a lazily
resolved key would never be bound, and would be missing at runtime.

Pass a key directly with `fromApiKey`:

```ts
Effect.provide(TypesafeAi.fromApiKey({ apiKey: process.env.MY_KEY! }));
```

## Questions

| Builder                          | Asks                                   | Decodes to         |
| -------------------------------- | -------------------------------------- | ------------------ |
| `Noul(instructions)`             | yes/no                                 | `boolean`          |
| `Choice(instructions, criteria)` | select one named option                | the chosen key     |
| `Score(instructions, levels)`    | rate against an ordered rubric         | `number`           |

Instructions and per-option criteria accept a string or a structured rubric —
useful when a category is easy to confuse with its neighbour:

```ts
TypesafeAi.Choice("How much does `message` deserve?", {
  thread: {
    what: "Answering requires DOING something first: reading code, running commands, several steps",
    notFor: "Anything a knowledgeable person answers off the top of their head",
    examples: ["dig into why the pack ingest path OOMs on big repos"],
  },
  inline: {
    what: "A person can answer in a message or two from what they already know",
    examples: ["which port does the dev server use?"],
  },
});
```

Backtick-quoted paths in a question point at parts of the state —
`` `message` ``, or a dot-and-index path like `` `ticket.messages[0].text` ``
— so one structured state can be interrogated from several angles.

## Answers

`value` holds the decoded answers; `answers` holds the calibration, each one
already narrowed to the kind of question that produced it:

```ts
verdict.answers.department?.confidence; // choice → confidence, probabilities
verdict.answers.isUrgent?.noul; // noul → probability in [0, 1]
verdict.answers.frustration?.score; // score → weighted score, legend
```

Confidence is the point of a calibrated model: gate on it, and fall back to
something slower (or a human) when a call is close. Choice and Score carry
`confidence`; a Noul IS its own calibration — near 1 is a strong yes, near
0.5 is uncertainty.

```ts
const answer = verdict.answers.department;
if (answer === undefined || answer.confidence < 0.8) return humanReview();
```

## Schema.Struct: the advanced form

`query` also accepts any struct-shaped `Schema`, for questions worth naming
and reusing. Field types choose the question kind, and `description`
annotations become the instructions:

```ts
const Ticket = Schema.Struct({
  isUrgent: Schema.Boolean.annotate({ description: "Does this convey urgency?" }),
  department: Schema.Literals(["billing", "technical", "sales"]),
  frustration: TypesafeAi.Score("How frustrated is the customer?", [
    "Calm",
    "Very angry",
  ]),
});

const { value, answers } = yield* TypesafeAi.query(Ticket, { state });
```

| Schema                              | Question | Decoded `value`             |
| ----------------------------------- | -------- | --------------------------- |
| `Schema.Boolean`                    | noul     | `noul >= 0.5`               |
| `Schema.Number`                     | noul     | the probability in `[0, 1]` |
| string `Literals` / `Enum`          | choice   | the selected option         |
| `Score([...])`                      | score    | the weighted score          |

Override the mapping per field with the `questionTypeId`, `criteriaId`,
`instructionsId` and `noulThresholdId` annotations. A struct's question kinds
are only known once it is compiled, so its `answers` stay the wire union —
read them through `asChoice`, `asNoul` and `asScore`.

## Layout

| Path            | Holds                                                            |
| --------------- | ---------------------------------------------------------------- |
| `src/query.ts`  | the ask: `query`, `QueryOptions`, `QueryResult`, `Answers`        |
| `src/schema.ts` | the questions: `Choice` / `Noul` / `Score`, schema ↔ wire mapping |
| `src/services/` | the generated operations — regenerated, never edited by hand      |
| `test/`         | the suites, type-checked as their own project                     |

```sh
bun test                                     # unit suites
TYPESAFE_API_KEY=… bun test query.live       # against the real API
```
