import { NodeContext } from "@effect/platform-node";
import * as FileSystem from "@effect/platform/FileSystem";
import { describe, expect, it } from "@effect/vitest";
import { JSONSchema } from "effect";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import { Agent } from "../src/agent.ts";
import { createContext, createPreamble } from "../src/context.ts";
import * as File from "../src/file/index.ts";
import { input } from "../src/input.ts";
import { output } from "../src/output.ts";
import { tool } from "../src/tool/tool.ts";
import * as Toolkit from "../src/toolkit/index.ts";
import { Toolkit as ToolkitFactory } from "../src/toolkit/toolkit.ts";

// Test layer with real filesystem for reading fixture files
const TestLayer = NodeContext.layer;

describe("createContext", () => {
  it.effect("renders simple agent with no references", () =>
    Effect.gen(function* () {
      class SimpleAgent extends Agent("simple")`Hello world` {}

      const ctx = yield* createContext(SimpleAgent);

      expect(ctx.system).toEqual(`${createPreamble("simple")}Hello world`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders agent with file reference including content", () =>
    Effect.gen(function* () {
      // Create a test fixture file
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString(
        "test/fixtures/app.ts",
        "export const app = 'hello';",
      );

      class MyFile extends File.TypeScript(
        "test/fixtures/app.ts",
      )`App entry point` {}
      class MyAgent extends Agent("app")`Uses ${MyFile} for main logic` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("app")}Uses [app.ts](test/fixtures/app.ts) for main logic

---

## Files

In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.

### test/fixtures/app.ts

App entry point

\`\`\`typescript
export const app = 'hello';
\`\`\`
`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders agent with nested agent reference", () =>
    Effect.gen(function* () {
      class ChildAgent extends Agent("child")`I am the child` {}
      class ParentAgent extends Agent("parent")`Delegates to ${ChildAgent}` {}

      const ctx = yield* createContext(ParentAgent);

      expect(ctx.system).toEqual(`${createPreamble("parent")}Delegates to @child

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### child

I am the child
`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders toolkit with tool references", () =>
    Effect.gen(function* () {
      class MyAgent extends Agent("worker")`Uses ${Toolkit.Coding}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(`${createPreamble("worker")}Uses 🧰Coding

---

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### Coding

A set of tools for reading, writing, and editing code:

- 🛠️bash
- 🛠️readlints
- 🛠️edit
- 🛠️glob
- 🛠️grep
- 🛠️read
- 🛠️write
`);

      // Verify the toolkit contains the expected tools
      expect(Object.keys(ctx.toolkit.tools).sort()).toEqual([
        "bash",
        "edit",
        "glob",
        "grep",
        "read",
        "readlints",
        "write",
      ]);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("does not visit same reference twice", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/shared.ts", "// shared");

      class SharedFile extends File.TypeScript(
        "test/fixtures/shared.ts",
      )`Shared` {}
      class Agent1 extends Agent("a1")`Uses ${SharedFile}` {}
      class Agent2 extends Agent("a2")`Also uses ${SharedFile}` {}
      class Root extends Agent("root")`Has ${Agent1} and ${Agent2}` {}

      const ctx = yield* createContext(Root);

      expect(ctx.system).toEqual(`${createPreamble("root")}Has @a1 and @a2

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### a1

Uses [shared.ts](test/fixtures/shared.ts)

### a2

Also uses [shared.ts](test/fixtures/shared.ts)

## Files

In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.

### test/fixtures/shared.ts

Shared

\`\`\`typescript
// shared
\`\`\`
`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("maintains order of first encounter", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/a.ts", "// a");
      yield* fs.writeFileString("test/fixtures/b.ts", "// b");
      yield* fs.writeFileString("test/fixtures/c.ts", "// c");

      class FileA extends File.TypeScript("test/fixtures/a.ts")`A` {}
      class FileB extends File.TypeScript("test/fixtures/b.ts")`B` {}
      class FileC extends File.TypeScript("test/fixtures/c.ts")`C` {}
      class MyAgent extends Agent(
        "order",
      )`${FileA} then ${FileB} then ${FileC}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("order")}[a.ts](test/fixtures/a.ts) then [b.ts](test/fixtures/b.ts) then [c.ts](test/fixtures/c.ts)

---

## Files

In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.

### test/fixtures/a.ts

A

\`\`\`typescript
// a
\`\`\`

### test/fixtures/b.ts

B

\`\`\`typescript
// b
\`\`\`

### test/fixtures/c.ts

C

\`\`\`typescript
// c
\`\`\`
`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("handles missing files gracefully", () =>
    Effect.gen(function* () {
      class MissingFile extends File.TypeScript(
        "does/not/exist.ts",
      )`Missing file` {}
      class MyAgent extends Agent("missing")`Uses ${MissingFile}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("missing")}Uses [exist.ts](does/not/exist.ts)

---

## Files

In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.

### does/not/exist.ts

Missing file

\`\`\`typescript
// File not found
\`\`\`
`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders primitive values inline", () =>
    Effect.gen(function* () {
      const count = 42;
      const name = "Alice";
      const active = true;
      class MyAgent extends Agent(
        "primitives",
      )`Count: ${count}, Name: ${name}, Active: ${active}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(
        `${createPreamble("primitives")}Count: 42, Name: Alice, Active: true`,
      );
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders arrays as YAML lists", () =>
    Effect.gen(function* () {
      const items = ["hello", "world"];
      class MyAgent extends Agent("arrays")`Items:${items}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(`${createPreamble("arrays")}Items:
- hello
- world`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders Sets as YAML lists", () =>
    Effect.gen(function* () {
      const tags = new Set(["typescript", "effect"]);
      class MyAgent extends Agent("sets")`Tags:${tags}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(`${createPreamble("sets")}Tags:
- typescript
- effect`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders objects as YAML key-value pairs", () =>
    Effect.gen(function* () {
      const config = { host: "localhost", port: 3000 };
      class MyAgent extends Agent("objects")`Config:${config}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(`${createPreamble("objects")}Config:
host: localhost
port: 3000`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders nested structures as YAML", () =>
    Effect.gen(function* () {
      const data = {
        names: ["Sam", "John"],
        settings: { debug: true },
      };
      class MyAgent extends Agent("nested")`Data:${data}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(`${createPreamble("nested")}Data:
names:
  - Sam
  - John
settings:
  debug: true`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders array of objects as YAML", () =>
    Effect.gen(function* () {
      const users = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ];
      class MyAgent extends Agent("array-objects")`Users:${users}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toEqual(`${createPreamble("array-objects")}Users:
- name: Alice
  age: 30
- name: Bob
  age: 25`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders custom toolkit with tools and includes tool schemas", () =>
    Effect.gen(function* () {
      const message = input("message")`The message to echo`;
      const result = output("result")`The echoed message`;

      const echoTool = tool("echo")`Echoes the ${message} back.
Returns the ${result}.`(function* ({ message }) {
        return { result: message };
      });

      class EchoToolkit extends ToolkitFactory("EchoToolkit")`
A simple echo toolkit:
- ${echoTool}
` {}

      class MyAgent extends Agent("echo-agent")`Uses ${EchoToolkit}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify system prompt
      expect(ctx.system)
        .toEqual(`${createPreamble("echo-agent")}Uses 🧰EchoToolkit

---

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### EchoToolkit

A simple echo toolkit:
- 🛠️echo
`);

      // Verify toolkit contains the echo tool
      expect(Object.keys(ctx.toolkit.tools)).toEqual(["echo"]);

      // Verify tool description
      expect(ctx.toolkit.tools.echo).toMatchObject({
        name: "echo",
        description:
          "Echoes the ${input:message} back.\nReturns the ${output:result}.",
      });

      // Verify tool parameters schema
      expect(JSONSchema.make(ctx.toolkit.tools.echo.parametersSchema)).toEqual({
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        required: ["message"],
        properties: {
          message: {
            type: "string",
            description: "The message to echo",
          },
        },
        additionalProperties: false,
      });
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders tool that references a file", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString(
        "test/fixtures/config.json",
        '{ "key": "value" }',
      );

      class ConfigFile extends File.Json(
        "test/fixtures/config.json",
      )`Configuration file` {}

      const configPath = input("configPath")`Path to config`;
      const configResult = output("config")`The loaded config`;

      const loadConfigTool = tool(
        "loadConfig",
      )`Loads configuration from ${ConfigFile}.
Takes ${configPath} and returns ${configResult}.`(function* () {
        return { config: "value" };
      });

      class ConfigToolkit extends ToolkitFactory("ConfigToolkit")`
Configuration tools:
- ${loadConfigTool}
` {}

      class MyAgent extends Agent("config-agent")`Uses ${ConfigToolkit}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("config-agent")}Uses 🧰ConfigToolkit

---

## Files

In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.

### test/fixtures/config.json

Configuration file

\`\`\`json
{ "key": "value" }
\`\`\`

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### ConfigToolkit

Configuration tools:
- 🛠️loadConfig
`);

      // Verify tool description includes file reference
      expect(ctx.toolkit.tools.loadConfig).toMatchObject({
        name: "loadConfig",
        description:
          "Loads configuration from [config.json](test/fixtures/config.json).\nTakes ${input:configPath} and returns ${output:config}.",
      });
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders tool that references an agent", () =>
    Effect.gen(function* () {
      class HelperAgent extends Agent("helper")`I help with tasks` {}

      const task = input("task")`The task to delegate`;
      const result = output("result")`The result from helper`;

      const delegateTool = tool("delegate")`Delegates a task to ${HelperAgent}.
Takes ${task} and returns ${result}.`(function* ({ task }) {
        return { result: `Completed: ${task}` };
      });

      class DelegationToolkit extends ToolkitFactory("DelegationToolkit")`
Delegation tools:
- ${delegateTool}
` {}

      class MyAgent extends Agent(
        "delegator",
      )`Uses ${DelegationToolkit} to work with ${HelperAgent}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("delegator")}Uses 🧰DelegationToolkit to work with @helper

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### helper

I help with tasks

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### DelegationToolkit

Delegation tools:
- 🛠️delegate
`);

      // Verify tool description includes agent reference
      expect(ctx.toolkit.tools.delegate).toMatchObject({
        name: "delegate",
        description:
          "Delegates a task to @helper.\nTakes ${input:task} and returns ${output:result}.",
      });
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders tool that references both file and agent", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/data.json", '{ "items": [] }');

      class DataFile extends File.Json(
        "test/fixtures/data.json",
      )`Data storage file` {}
      class ProcessorAgent extends Agent("processor")`Processes data` {}

      const dataInput = input("data")`The data to process`;
      const processedOutput = output("processed")`The processed result`;

      const processTool = tool(
        "process",
      )`Reads from ${DataFile} and sends to ${ProcessorAgent}.
Takes ${dataInput} and returns ${processedOutput}.`(function* ({ data }) {
        return { processed: data };
      });

      class DataToolkit extends ToolkitFactory("DataToolkit")`
Data processing tools:
- ${processTool}
` {}

      class MyAgent extends Agent("data-agent")`Uses ${DataToolkit}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("data-agent")}Uses 🧰DataToolkit

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### processor

Processes data

## Files

In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.

### test/fixtures/data.json

Data storage file

\`\`\`json
{ "items": [] }
\`\`\`

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### DataToolkit

Data processing tools:
- 🛠️process
`);

      // Verify tool description includes both references
      expect(ctx.toolkit.tools.process).toMatchObject({
        name: "process",
        description:
          "Reads from [data.json](test/fixtures/data.json) and sends to @processor.\nTakes ${input:data} and returns ${output:processed}.",
      });
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders toolkit with multiple typed parameters", () =>
    Effect.gen(function* () {
      const a = input("a", S.Number)`First number`;
      const b = input("b", S.Number)`Second number`;
      const sum = output("sum", S.Number)`The sum`;

      const addTool = tool("add")`Adds ${a} and ${b}.
Returns the ${sum}.`(function* ({ a, b }) {
        return { sum: a + b };
      });

      class MathToolkit extends ToolkitFactory("MathToolkit")`
Math operations:
- ${addTool}
` {}

      class MyAgent extends Agent("math-agent")`Uses ${MathToolkit}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("math-agent")}Uses 🧰MathToolkit

---

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### MathToolkit

Math operations:
- 🛠️add
`);

      // Verify toolkit contains the add tool with correct schema
      expect(JSONSchema.make(ctx.toolkit.tools.add.parametersSchema)).toEqual({
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        required: ["a", "b"],
        properties: {
          a: {
            type: "number",
            description: "First number",
          },
          b: {
            type: "number",
            description: "Second number",
          },
        },
        additionalProperties: false,
      });
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("merges multiple toolkits into one context", () =>
    Effect.gen(function* () {
      const inp1 = input("a")`Input A`;
      const out1 = output("b")`Output B`;
      const inp2 = input("c")`Input C`;
      const out2 = output("d")`Output D`;

      const toolA = tool("toolA")`Takes ${inp1}, returns ${out1}.`(function* ({
        a,
      }) {
        return { b: a };
      });

      const toolB = tool("toolB")`Takes ${inp2}, returns ${out2}.`(function* ({
        c,
      }) {
        return { d: c };
      });

      class ToolkitA extends ToolkitFactory("ToolkitA")`Has ${toolA}` {}
      class ToolkitB extends ToolkitFactory("ToolkitB")`Has ${toolB}` {}

      class MultiAgent extends Agent(
        "multi",
      )`Uses ${ToolkitA} and ${ToolkitB}` {}

      const ctx = yield* createContext(MultiAgent);

      expect(ctx.system)
        .toEqual(`${createPreamble("multi")}Uses 🧰ToolkitA and 🧰ToolkitB

---

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### ToolkitA

Has 🛠️toolA

### ToolkitB

Has 🛠️toolB
`);

      // Verify both tools are merged into the toolkit
      expect(Object.keys(ctx.toolkit.tools).sort()).toEqual(["toolA", "toolB"]);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("collects toolkit from nested agent", () =>
    Effect.gen(function* () {
      const inp = input("x")`Input`;
      const out = output("y")`Output`;

      const nestedTool = tool("nestedTool")`Takes ${inp}, returns ${out}.`(
        function* ({ x }) {
          return { y: x };
        },
      );

      class NestedToolkit extends ToolkitFactory("NestedToolkit")`
Nested toolkit with ${nestedTool}
` {}

      class ChildAgent extends Agent("child")`Uses ${NestedToolkit}` {}
      class ParentAgent extends Agent("parent")`Delegates to ${ChildAgent}` {}

      const ctx = yield* createContext(ParentAgent);

      expect(ctx.system).toEqual(`${createPreamble("parent")}Delegates to @child

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### child

Uses 🧰NestedToolkit

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### NestedToolkit

Nested toolkit with 🛠️nestedTool
`);

      // Verify the nested tool is included
      expect(Object.keys(ctx.toolkit.tools)).toEqual(["nestedTool"]);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("returns empty toolkit for agent without toolkits", () =>
    Effect.gen(function* () {
      class SimpleAgent extends Agent("simple")`No toolkits here` {}

      const ctx = yield* createContext(SimpleAgent);

      expect(ctx.system).toEqual(`${createPreamble("simple")}No toolkits here`);

      expect(ctx.toolkit.tools).toEqual({});
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("does not duplicate toolkit referenced multiple times", () =>
    Effect.gen(function* () {
      const inp = input("s")`String`;
      const out = output("r")`Result`;

      const sharedTool = tool("shared")`Takes ${inp}, returns ${out}.`(
        function* ({ s }) {
          return { r: s };
        },
      );

      class SharedToolkit extends ToolkitFactory("SharedToolkit")`
Shared: ${sharedTool}
` {}

      class Agent1 extends Agent("a1")`Uses ${SharedToolkit}` {}
      class Agent2 extends Agent("a2")`Also uses ${SharedToolkit}` {}
      class RootAgent extends Agent("root")`Has ${Agent1} and ${Agent2}` {}

      const ctx = yield* createContext(RootAgent);

      expect(ctx.system).toEqual(`${createPreamble("root")}Has @a1 and @a2

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### a1

Uses 🧰SharedToolkit

### a2

Also uses 🧰SharedToolkit

## Toolkits

You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.

### SharedToolkit

Shared: 🛠️shared
`);

      // Verify tool is included once
      expect(Object.keys(ctx.toolkit.tools)).toEqual(["shared"]);
    }).pipe(Effect.provide(TestLayer)),
  );

  // ============================================================
  // Tests for agents/files embedded in arrays and objects
  // ============================================================

  it.effect(
    "renders array of agents as YAML list with @ symbols (quoted)",
    () =>
      Effect.gen(function* () {
        class AgentA extends Agent("worker-a")`I handle task A` {}
        class AgentB extends Agent("worker-b")`I handle task B` {}
        class MyAgent extends Agent(
          "orchestrator",
        )`Available workers:${[AgentA, AgentB]}` {}

        const ctx = yield* createContext(MyAgent);

        // Note: References embedded in arrays are serialized as quoted strings
        // and are NOT automatically collected into the Agents section
        expect(ctx.system).toEqual(
          `${createPreamble("orchestrator")}Available workers:
- "@worker-a"
- "@worker-b"`,
        );
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders array of agents inline in sentence", () =>
    Effect.gen(function* () {
      class Alpha extends Agent("alpha")`Alpha agent` {}
      class Beta extends Agent("beta")`Beta agent` {}
      class Gamma extends Agent("gamma")`Gamma agent` {}
      class MyAgent extends Agent(
        "coordinator",
      )`Coordinate between these agents:${[Alpha, Beta, Gamma]} to complete tasks.` {}

      const ctx = yield* createContext(MyAgent);

      // Verify the array is rendered as YAML with quoted references
      expect(ctx.system).toContain(`these agents:
- "@alpha"
- "@beta"
- "@gamma" to complete tasks.`);

      // Note: Agents embedded in arrays are NOT collected into the Agents section
      // Only direct template references trigger collection
      expect(ctx.system).not.toContain("## Agents");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders array of files as YAML list with markdown links", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/main.ts", "// main entry");
      yield* fs.writeFileString("test/fixtures/utils.ts", "// utilities");

      class MainFile extends File.TypeScript(
        "test/fixtures/main.ts",
      )`Main entry point` {}
      class UtilsFile extends File.TypeScript(
        "test/fixtures/utils.ts",
      )`Utility functions` {}
      class MyAgent extends Agent(
        "codebase",
      )`Important files:${[MainFile, UtilsFile]}` {}

      const ctx = yield* createContext(MyAgent);

      // Note: Files embedded in arrays are serialized as quoted markdown links
      // but are NOT collected into the Files section
      expect(ctx.system).toEqual(
        `${createPreamble("codebase")}Important files:
- "[main.ts](test/fixtures/main.ts)"
- "[utils.ts](test/fixtures/utils.ts)"`,
      );
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders array of files with mixed types", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/config.json", '{"debug": true}');
      yield* fs.writeFileString("test/fixtures/styles.css", "body {}");

      class ConfigFile extends File.Json(
        "test/fixtures/config.json",
      )`Configuration` {}
      class StylesFile extends File.Css(
        "test/fixtures/styles.css",
      )`Stylesheet` {}
      class MyAgent extends Agent(
        "assets",
      )`Required assets:${[ConfigFile, StylesFile]}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify array is rendered as YAML list with quoted links
      expect(ctx.system).toContain(`Required assets:
- "[config.json](test/fixtures/config.json)"
- "[styles.css](test/fixtures/styles.css)"`);

      // Note: Files embedded in arrays are NOT collected into Files section
      expect(ctx.system).not.toContain("## Files");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders object with agent values as YAML", () =>
    Effect.gen(function* () {
      class LeaderAgent extends Agent("leader")`I lead the team` {}
      class WorkerAgent extends Agent("worker")`I do the work` {}
      class MyAgent extends Agent("team")`Team structure:${{
        leader: LeaderAgent,
        worker: WorkerAgent,
      }}` {}

      const ctx = yield* createContext(MyAgent);

      // Note: Agents embedded in objects are serialized as quoted strings
      // but are NOT collected into the Agents section
      expect(ctx.system).toEqual(
        `${createPreamble("team")}Team structure:
leader: "@leader"
worker: "@worker"`,
      );
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders object with multiple agent roles", () =>
    Effect.gen(function* () {
      class Frontend extends Agent("frontend")`Frontend development` {}
      class Backend extends Agent("backend")`Backend development` {}
      class DevOps extends Agent("devops")`Infrastructure and deployment` {}
      class MyAgent extends Agent("project")`Project roles:${{
        ui: Frontend,
        api: Backend,
        infra: DevOps,
      }}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify object is rendered as YAML with quoted agent references
      expect(ctx.system).toContain(`Project roles:
ui: "@frontend"
api: "@backend"
infra: "@devops"`);

      // Note: Agents embedded in objects are NOT collected into Agents section
      expect(ctx.system).not.toContain("## Agents");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders object with file values as YAML", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString(
        "test/fixtures/schema.json",
        '{"type": "object"}',
      );
      yield* fs.writeFileString("test/fixtures/readme.md", "# Readme");

      class SchemaFile extends File.Json(
        "test/fixtures/schema.json",
      )`JSON Schema` {}
      class ReadmeFile extends File.Markdown(
        "test/fixtures/readme.md",
      )`Documentation` {}
      class MyAgent extends Agent("docs")`Documentation files:${{
        schema: SchemaFile,
        readme: ReadmeFile,
      }}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify object is rendered as YAML with quoted file links
      expect(ctx.system).toContain(`Documentation files:
schema: "[schema.json](test/fixtures/schema.json)"
readme: "[readme.md](test/fixtures/readme.md)"`);

      // Note: Files embedded in objects are NOT collected into Files section
      expect(ctx.system).not.toContain("## Files");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders object with file values (direct refs get content)", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString(
        "test/fixtures/app.config.ts",
        "export default { port: 3000 };",
      );

      class AppConfig extends File.TypeScript(
        "test/fixtures/app.config.ts",
      )`Application config` {}

      // Direct reference (not in object) DOES get collected and content shown
      class MyAgent extends Agent("config")`Configuration file: ${AppConfig}` {}

      const ctx = yield* createContext(MyAgent);

      // Direct reference includes file content
      expect(ctx.system).toContain(
        "```typescript\nexport default { port: 3000 };\n```",
      );
      expect(ctx.system).toContain("## Files");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders nested object with arrays of agents", () =>
    Effect.gen(function* () {
      class ReviewerA extends Agent("reviewer-a")`Code reviewer A` {}
      class ReviewerB extends Agent("reviewer-b")`Code reviewer B` {}
      class ApproverA extends Agent("approver-a")`Approver A` {}
      class MyAgent extends Agent("workflow")`Workflow:${{
        reviewers: [ReviewerA, ReviewerB],
        approvers: [ApproverA],
      }}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify nested structure is rendered correctly with quoted references
      expect(ctx.system).toContain(`Workflow:
reviewers:
  - "@reviewer-a"
  - "@reviewer-b"
approvers:
  - "@approver-a"`);

      // Note: Agents embedded in nested structures are NOT collected
      expect(ctx.system).not.toContain("## Agents");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders nested object with files grouped by category", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      // Use flat path to avoid directory creation issues
      yield* fs.writeFileString("test/fixtures/index-src.ts", "// index");
      yield* fs.writeFileString("test/fixtures/types-src.ts", "// types");
      yield* fs.writeFileString("test/fixtures/main-test.ts", "// tests");

      class IndexFile extends File.TypeScript(
        "test/fixtures/index-src.ts",
      )`Main entry` {}
      class TypesFile extends File.TypeScript(
        "test/fixtures/types-src.ts",
      )`Type definitions` {}
      class TestFile extends File.TypeScript(
        "test/fixtures/main-test.ts",
      )`Test suite` {}

      class MyAgent extends Agent("codebase")`Code structure:${{
        source: {
          entry: IndexFile,
          types: TypesFile,
        },
        tests: [TestFile],
      }}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify deeply nested structure with quoted links
      expect(ctx.system).toContain(`Code structure:
source:
  entry: "[index-src.ts](test/fixtures/index-src.ts)"
  types: "[types-src.ts](test/fixtures/types-src.ts)"
tests:
  - "[main-test.ts](test/fixtures/main-test.ts)"`);

      // Note: Files embedded in nested structures are NOT collected
      expect(ctx.system).not.toContain("## Files");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "renders mixed references (agents, files, toolkits) in nested structure",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        yield* fs.writeFileString("test/fixtures/spec.md", "# Spec");

        class SpecFile extends File.Markdown(
          "test/fixtures/spec.md",
        )`Specification` {}
        class ImplementerAgent extends Agent(
          "implementer",
        )`Implements features` {}

        const taskInput = input("task")`Task to run`;
        const taskOutput = output("result")`The task result`;
        const runTool = tool(
          "run",
        )`Runs the ${taskInput}. Returns ${taskOutput}.`(function* ({ task }) {
          return { result: task };
        });
        class TaskToolkit extends ToolkitFactory(
          "TaskToolkit",
        )`Task tools: ${runTool}` {}

        class MyAgent extends Agent("project")`Project:${{
          spec: SpecFile,
          agent: ImplementerAgent,
          toolkit: TaskToolkit,
        }}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify mixed references in object with appropriate symbols
        expect(ctx.system).toContain(`Project:
spec: "[spec.md](test/fixtures/spec.md)"
agent: "@implementer"
toolkit: 🧰TaskToolkit`);

        // Note: References embedded in objects are NOT collected into sections
        expect(ctx.system).not.toContain("## Agents");
        expect(ctx.system).not.toContain("## Files");
        expect(ctx.system).not.toContain("## Toolkits");
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders array of objects each containing references", () =>
    Effect.gen(function* () {
      class AgentA extends Agent("agent-a")`Agent A` {}
      class AgentB extends Agent("agent-b")`Agent B` {}
      class MyAgent extends Agent("manager")`Tasks:${[
        { name: "Task 1", assignee: AgentA },
        { name: "Task 2", assignee: AgentB },
      ]}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify array of objects with references
      expect(ctx.system).toContain(`Tasks:
- name: Task 1
  assignee: "@agent-a"
- name: Task 2
  assignee: "@agent-b"`);
    }).pipe(Effect.provide(TestLayer)),
  );

  // ============================================================
  // Tests for tool descriptions with embedded references
  // ============================================================

  it.effect("renders tool description with array of agents", () =>
    Effect.gen(function* () {
      class WorkerA extends Agent("worker-a")`Worker A tasks` {}
      class WorkerB extends Agent("worker-b")`Worker B tasks` {}

      const taskInput = input("task")`The task to dispatch`;
      const dispatchOutput = output("dispatched")`The dispatched task`;
      const dispatchTool = tool(
        "dispatch",
      )`Dispatches tasks to workers:${[WorkerA, WorkerB]}. Takes ${taskInput}. Returns ${dispatchOutput}.`(
        function* ({ task }) {
          return { dispatched: task };
        },
      );

      class DispatchToolkit extends ToolkitFactory(
        "DispatchToolkit",
      )`Dispatch tools: ${dispatchTool}` {}
      class MyAgent extends Agent("dispatcher")`Uses ${DispatchToolkit}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify tool description contains array of quoted agent references
      // Note: YAML serialization puts last item on same line as following text
      expect(ctx.toolkit.tools.dispatch.description)
        .toContain(`Dispatches tasks to workers:
- "@worker-a"
- "@worker-b". Takes \${input:task}. Returns \${output:dispatched}.`);

      // Note: Agents embedded in arrays in tool descriptions are NOT collected
      expect(ctx.system).not.toContain("## Agents");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders tool description with array of files", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/template1.html", "<html>");
      yield* fs.writeFileString("test/fixtures/template2.html", "<body>");

      class Template1 extends File.Html(
        "test/fixtures/template1.html",
      )`First template` {}
      class Template2 extends File.Html(
        "test/fixtures/template2.html",
      )`Second template` {}

      const nameInput = input("name")`Template name`;
      const htmlOutput = output("html")`The rendered HTML`;
      const renderTool = tool(
        "render",
      )`Renders one of these templates:${[Template1, Template2]}. Takes ${nameInput}. Returns ${htmlOutput}.`(
        function* ({ name }) {
          return { html: `<html>${name}</html>` };
        },
      );

      class RenderToolkit extends ToolkitFactory(
        "RenderToolkit",
      )`Render tools: ${renderTool}` {}
      class MyAgent extends Agent("renderer")`Uses ${RenderToolkit}` {}

      const ctx = yield* createContext(MyAgent);

      // Verify tool description contains array of quoted file references
      // Note: YAML serialization puts last item on same line as following text
      expect(ctx.toolkit.tools.render.description)
        .toContain(`Renders one of these templates:
- "[template1.html](test/fixtures/template1.html)"
- "[template2.html](test/fixtures/template2.html)". Takes \${input:name}. Returns \${output:html}.`);

      // Note: Files embedded in arrays in tool descriptions are NOT collected
      expect(ctx.system).not.toContain("## Files");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "renders tool description with object containing agent references",
    () =>
      Effect.gen(function* () {
        class Encoder extends Agent("encoder")`Encodes data` {}
        class Decoder extends Agent("decoder")`Decodes data` {}

        const dataInput = input("data")`Data to transform`;
        const transformedOutput = output("transformed")`The transformed data`;
        const transformTool = tool("transform")`Transforms data using:${{
          encode: Encoder,
          decode: Decoder,
        }}. Takes ${dataInput}. Returns ${transformedOutput}.`(function* ({
          data,
        }) {
          return { transformed: data };
        });

        class TransformToolkit extends ToolkitFactory(
          "TransformToolkit",
        )`Transform tools: ${transformTool}` {}
        class MyAgent extends Agent("transformer")`Uses ${TransformToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify tool description contains object with quoted agent references
        // Note: YAML serialization puts last item on same line as following text
        expect(ctx.toolkit.tools.transform.description)
          .toContain(`Transforms data using:
encode: "@encoder"
decode: "@decoder". Takes \${input:data}.`);

        // Note: Agents embedded in objects in tool descriptions are NOT collected
        expect(ctx.system).not.toContain("## Agents");
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "renders tool description with object containing file references",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        yield* fs.writeFileString("test/fixtures/input.json", "{}");
        yield* fs.writeFileString("test/fixtures/output.json", "{}");

        class InputFile extends File.Json(
          "test/fixtures/input.json",
        )`Input schema` {}
        class OutputFile extends File.Json(
          "test/fixtures/output.json",
        )`Output schema` {}

        const validateInput = input("payload")`Payload to validate`;
        const validateTool = tool("validate")`Validates against schemas:${{
          input: InputFile,
          output: OutputFile,
        }}. Takes ${validateInput}.`(function* ({ payload: _ }) {});

        class ValidateToolkit extends ToolkitFactory(
          "ValidateToolkit",
        )`Validate tools: ${validateTool}` {}
        class MyAgent extends Agent("validator")`Uses ${ValidateToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify tool description contains object with quoted file references
        // Note: YAML serialization puts last item on same line as following text
        expect(ctx.toolkit.tools.validate.description)
          .toContain(`Validates against schemas:
input: "[input.json](test/fixtures/input.json)"
output: "[output.json](test/fixtures/output.json)". Takes \${input:payload}.`);

        // Note: Files embedded in objects in tool descriptions are NOT collected
        expect(ctx.system).not.toContain("## Files");
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "renders tool description with nested structure of references",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        yield* fs.writeFileString("test/fixtures/rules.json", '{"rules": []}');

        class RulesFile extends File.Json(
          "test/fixtures/rules.json",
        )`Validation rules` {}
        class ValidatorAgent extends Agent("validator")`Validates data` {}
        class FormatterAgent extends Agent("formatter")`Formats output` {}

        const dataInput = input("data")`Data to process`;
        const processTool = tool("process")`Processes data with:${{
          config: RulesFile,
          pipeline: [ValidatorAgent, FormatterAgent],
        }}. Takes ${dataInput}.`(function* () {});

        class ProcessToolkit extends ToolkitFactory(
          "ProcessToolkit",
        )`Process tools: ${processTool}` {}
        class MyAgent extends Agent("processor")`Uses ${ProcessToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify tool description contains nested structure with quoted refs
        // Note: YAML serialization puts last item on same line as following text
        expect(ctx.toolkit.tools.process.description)
          .toContain(`Processes data with:
config: "[rules.json](test/fixtures/rules.json)"
pipeline:
  - "@validator"
  - "@formatter". Takes \${input:data}.`);

        // Note: References embedded in nested structures are NOT collected
        expect(ctx.system).not.toContain("## Files");
        expect(ctx.system).not.toContain("## Agents");
      }).pipe(Effect.provide(TestLayer)),
  );

  // ============================================================
  // Tests for JSON Schema generation with embedded references
  // ============================================================

  it.effect(
    "JSON Schema is valid when tool description contains agent array",
    () =>
      Effect.gen(function* () {
        class WorkerA extends Agent("worker-a")`Worker A` {}
        class WorkerB extends Agent("worker-b")`Worker B` {}

        const taskInput = input("task")`Task description`;
        const priorityInput = input("priority", S.Number)`Priority level`;
        const assignTool = tool(
          "assign",
        )`Assigns to workers:${[WorkerA, WorkerB]}. Takes ${taskInput} with ${priorityInput}.`(
          function* ({ task: _task, priority: _priority }) {},
        );

        class AssignToolkit extends ToolkitFactory(
          "AssignToolkit",
        )`Assign tools: ${assignTool}` {}
        class MyAgent extends Agent("assigner")`Uses ${AssignToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify JSON Schema is correct and not affected by agent references in description
        expect(
          JSONSchema.make(ctx.toolkit.tools.assign.parametersSchema),
        ).toEqual({
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          required: ["task", "priority"],
          properties: {
            task: {
              type: "string",
              description: "Task description",
            },
            priority: {
              type: "number",
              description: "Priority level",
            },
          },
          additionalProperties: false,
        });
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "JSON Schema is valid when tool description contains file object",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        yield* fs.writeFileString("test/fixtures/schema.json", "{}");

        class SchemaFile extends File.Json(
          "test/fixtures/schema.json",
        )`Schema definition` {}

        const nameInput = input("name")`Resource name`;
        const tagsInput = input("tags", S.Array(S.String))`Resource tags`;
        const createTool = tool(
          "create",
        )`Creates resource following:${{ schema: SchemaFile }}. Takes ${nameInput} and ${tagsInput}.`(
          function* ({ name: _name, tags: _tags }) {},
        );

        class CreateToolkit extends ToolkitFactory(
          "CreateToolkit",
        )`Create tools: ${createTool}` {}
        class MyAgent extends Agent("creator")`Uses ${CreateToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify JSON Schema has correct structure
        expect(
          JSONSchema.make(ctx.toolkit.tools.create.parametersSchema),
        ).toEqual({
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          required: ["name", "tags"],
          properties: {
            name: {
              type: "string",
              description: "Resource name",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Resource tags",
            },
          },
          additionalProperties: false,
        });
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "JSON Schema is valid when tool description contains complex nested references",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        yield* fs.writeFileString("test/fixtures/config.yaml", "key: value");

        class ConfigFile extends File.Yaml(
          "test/fixtures/config.yaml",
        )`Config file` {}
        class ProcessorAgent extends Agent("processor")`Processes data` {}

        const idInput = input("id")`Unique identifier`;
        const countInput = input("count", S.Number)`Number of items`;
        const enabledInput = input("enabled", S.Boolean)`Whether enabled`;
        const runTool = tool("run")`Runs with context:${{
          config: ConfigFile,
          workers: [ProcessorAgent],
        }}. Takes ${idInput}, ${countInput}, ${enabledInput}.`(function* ({
          id: _id,
          count: _count,
          enabled: _enabled,
        }) {});

        class RunToolkit extends ToolkitFactory(
          "RunToolkit",
        )`Run tools: ${runTool}` {}
        class MyAgent extends Agent("runner")`Uses ${RunToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Verify JSON Schema has all input parameters correctly typed
        expect(JSONSchema.make(ctx.toolkit.tools.run.parametersSchema)).toEqual(
          {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            required: ["id", "count", "enabled"],
            properties: {
              id: {
                type: "string",
                description: "Unique identifier",
              },
              count: {
                type: "number",
                description: "Number of items",
              },
              enabled: {
                type: "boolean",
                description: "Whether enabled",
              },
            },
            additionalProperties: false,
          },
        );
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "JSON Schema input descriptions use template strings only (not rendered refs)",
    () =>
      Effect.gen(function* () {
        class HelperAgent extends Agent("helper")`Helper agent` {}

        // Input with agent reference in description
        // Note: deriveSchema uses template.join("") which doesn't render refs
        const targetInput = input("target")`Target to send to ${HelperAgent}`;
        const messageInput = input("message")`Message content`;

        const sendTool = tool(
          "send",
        )`Sends message. Takes ${targetInput} and ${messageInput}.`(function* ({
          target: _target,
          message: _message,
        }) {});

        class SendToolkit extends ToolkitFactory(
          "SendToolkit",
        )`Send tools: ${sendTool}` {}
        class MyAgent extends Agent("sender")`Uses ${SendToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Input descriptions are generated from template.join("")
        // which only concatenates template strings, not rendered references
        const schema = JSONSchema.make(ctx.toolkit.tools.send.parametersSchema);
        expect(schema).toEqual({
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          required: ["target", "message"],
          properties: {
            target: {
              type: "string",
              // Note: Reference is NOT included in description (template.join behavior)
              description: "Target to send to",
            },
            message: {
              type: "string",
              description: "Message content",
            },
          },
          additionalProperties: false,
        });

        // Note: References in input templates are NOT collected into system prompt
        // The collection only walks direct references, not nested in input templates
        expect(ctx.system).not.toContain("## Agents");
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "JSON Schema input descriptions with file refs use template strings only",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        yield* fs.writeFileString(
          "test/fixtures/format.json",
          '{"format": "v1"}',
        );

        class FormatFile extends File.Json(
          "test/fixtures/format.json",
        )`Format specification` {}

        // Input with file reference in description
        const dataInput = input("data")`Data formatted per ${FormatFile}`;
        const outputInput = input("outputPath")`Path to write output`;

        const formatTool = tool(
          "format",
        )`Formats data. Takes ${dataInput} and ${outputInput}.`(function* ({
          data: _data,
          outputPath: _outputPath,
        }) {});

        class FormatToolkit extends ToolkitFactory(
          "FormatToolkit",
        )`Format tools: ${formatTool}` {}
        class MyAgent extends Agent("formatter")`Uses ${FormatToolkit}` {}

        const ctx = yield* createContext(MyAgent);

        // Input descriptions are generated from template.join("")
        // which only concatenates template strings, not rendered references
        const schema = JSONSchema.make(
          ctx.toolkit.tools.format.parametersSchema,
        );
        expect(schema).toEqual({
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          required: ["data", "outputPath"],
          properties: {
            data: {
              type: "string",
              // Note: Reference is NOT included in description (template.join behavior)
              description: "Data formatted per",
            },
            outputPath: {
              type: "string",
              description: "Path to write output",
            },
          },
          additionalProperties: false,
        });

        // Note: References in input templates are NOT collected into system prompt
        // The collection only walks direct references, not nested in input templates
        expect(ctx.system).not.toContain("## Files");
      }).pipe(Effect.provide(TestLayer)),
  );

  // ============================================================
  // Tests for forward references (thunks)
  // ============================================================

  it.effect("renders forward reference to agent declared later", () =>
    Effect.gen(function* () {
      // ParentAgent references ChildAgent via thunk - enabling forward reference
      class ParentAgent extends Agent(
        "parent",
      )`Delegates to ${() => ChildAgent}` {}
      class ChildAgent extends Agent("child")`I am the child` {}

      const ctx = yield* createContext(ParentAgent);

      expect(ctx.system).toEqual(`${createPreamble("parent")}Delegates to @child

---

## Agents

Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.

### child

I am the child
`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders multiple forward references to agents", () =>
    Effect.gen(function* () {
      // Orchestrator references Worker agents via thunks
      class Orchestrator extends Agent(
        "orchestrator",
      )`Coordinates ${() => WorkerA} and ${() => WorkerB}` {}
      class WorkerA extends Agent("worker-a")`I handle task A` {}
      class WorkerB extends Agent("worker-b")`I handle task B` {}

      const ctx = yield* createContext(Orchestrator);

      expect(ctx.system).toContain("Coordinates @worker-a and @worker-b");
      expect(ctx.system).toContain("### worker-a");
      expect(ctx.system).toContain("I handle task A");
      expect(ctx.system).toContain("### worker-b");
      expect(ctx.system).toContain("I handle task B");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders forward reference to file declared later", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString(
        "test/fixtures/forward-ref.ts",
        "export const value = 42;",
      );

      // Agent references file via thunk
      class MyAgent extends Agent("reader")`Reads ${() => ConfigFile}` {}
      class ConfigFile extends File.TypeScript(
        "test/fixtures/forward-ref.ts",
      )`Config file` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toContain(
        "Reads [forward-ref.ts](test/fixtures/forward-ref.ts)",
      );
      expect(ctx.system).toContain("### test/fixtures/forward-ref.ts");
      expect(ctx.system).toContain("export const value = 42;");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders forward reference to toolkit declared later", () =>
    Effect.gen(function* () {
      const inp = input("x")`Input`;
      const out = output("y")`Output`;
      const myTool = tool("myTool")`Takes ${inp}, returns ${out}.`(function* ({
        x,
      }) {
        return { y: x };
      });

      // Agent references toolkit via thunk
      class MyAgent extends Agent("worker")`Uses ${() => MyToolkit}` {}
      class MyToolkit extends ToolkitFactory("MyToolkit")`Tools: ${myTool}` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toContain("Uses 🧰MyToolkit");
      expect(ctx.system).toContain("### MyToolkit");
      expect(Object.keys(ctx.toolkit.tools)).toEqual(["myTool"]);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders mixed direct and forward references", () =>
    Effect.gen(function* () {
      class DirectAgent extends Agent("direct")`I am direct` {}
      class MyAgent extends Agent(
        "mixed",
      )`Has ${DirectAgent} and ${() => ForwardAgent}` {}
      class ForwardAgent extends Agent("forward")`I am forward` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toContain("Has @direct and @forward");
      expect(ctx.system).toContain("### direct");
      expect(ctx.system).toContain("I am direct");
      expect(ctx.system).toContain("### forward");
      expect(ctx.system).toContain("I am forward");
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders forward reference in array", () =>
    Effect.gen(function* () {
      class MyAgent extends Agent(
        "coordinator",
      )`Workers:${[() => WorkerX, () => WorkerY]}` {}
      class WorkerX extends Agent("worker-x")`Worker X` {}
      class WorkerY extends Agent("worker-y")`Worker Y` {}

      const ctx = yield* createContext(MyAgent);

      // Forward refs in arrays are resolved and serialized
      expect(ctx.system).toContain(`Workers:
- "@worker-x"
- "@worker-y"`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders forward reference in object", () =>
    Effect.gen(function* () {
      class MyAgent extends Agent("team")`Team:${{
        leader: () => LeaderAgent,
        member: () => MemberAgent,
      }}` {}
      class LeaderAgent extends Agent("leader")`I lead` {}
      class MemberAgent extends Agent("member")`I follow` {}

      const ctx = yield* createContext(MyAgent);

      // Forward refs in objects are resolved and serialized
      expect(ctx.system).toContain(`Team:
leader: "@leader"
member: "@member"`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders forward reference in nested structure", () =>
    Effect.gen(function* () {
      class MyAgent extends Agent("workflow")`Workflow:${{
        stages: [
          { name: "build", agent: () => BuildAgent },
          { name: "deploy", agent: () => DeployAgent },
        ],
      }}` {}
      class BuildAgent extends Agent("build")`I build things` {}
      class DeployAgent extends Agent("deploy")`I deploy things` {}

      const ctx = yield* createContext(MyAgent);

      expect(ctx.system).toContain(`Workflow:
stages:
  - name: build
    agent: "@build"
  - name: deploy
    agent: "@deploy"`);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("does not visit forward-referenced agent twice", () =>
    Effect.gen(function* () {
      // Both agents reference the same shared agent via forward ref
      class Agent1 extends Agent("a1")`Uses ${() => SharedAgent}` {}
      class Agent2 extends Agent("a2")`Also uses ${() => SharedAgent}` {}
      class Root extends Agent("root")`Has ${Agent1} and ${Agent2}` {}
      class SharedAgent extends Agent("shared")`I am shared` {}

      const ctx = yield* createContext(Root);

      // SharedAgent should only appear once in the output
      const sharedMatches = ctx.system.match(/### shared/g);
      expect(sharedMatches?.length).toBe(1);
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect(
    "collects toolkit from forward-referenced agent in nested structure",
    () =>
      Effect.gen(function* () {
        const inp = input("s")`String`;
        const out = output("r")`Result`;
        const sharedTool = tool("sharedTool")`Takes ${inp}, returns ${out}.`(
          function* ({ s }) {
            return { r: s };
          },
        );

        class SharedToolkit extends ToolkitFactory("SharedToolkit")`
Tools: ${sharedTool}
` {}

        // Forward reference to child agent which has a toolkit
        class Parent extends Agent("parent")`Uses ${() => Child}` {}
        class Child extends Agent("child")`Has ${SharedToolkit}` {}

        const ctx = yield* createContext(Parent);

        // Toolkit from forward-referenced agent should be collected
        expect(Object.keys(ctx.toolkit.tools)).toEqual(["sharedTool"]);
      }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders tool description with forward reference to agent", () =>
    Effect.gen(function* () {
      const taskInput = input("task")`The task`;
      const taskOutput = output("result")`The result`;
      const delegateTool = tool(
        "delegate",
      )`Delegates to ${() => HelperAgent}. Takes ${taskInput}. Returns ${taskOutput}.`(
        function* ({ task }) {
          return { result: task };
        },
      );

      class DelegateToolkit extends ToolkitFactory(
        "DelegateToolkit",
      )`Tools: ${delegateTool}` {}
      class MyAgent extends Agent("delegator")`Uses ${DelegateToolkit}` {}
      class HelperAgent extends Agent("helper")`I help` {}

      const ctx = yield* createContext(MyAgent);

      // Tool description should contain resolved forward reference
      expect(ctx.toolkit.tools.delegate.description).toContain(
        "Delegates to @helper",
      );
    }).pipe(Effect.provide(TestLayer)),
  );

  it.effect("renders tool description with forward reference to file", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("test/fixtures/schema-forward.json", "{}");

      const dataInput = input("data")`Data`;
      const validateTool = tool(
        "validate",
      )`Validates against ${() => SchemaFile}. Takes ${dataInput}.`(function* ({
        data: _,
      }) {});

      class ValidateToolkit extends ToolkitFactory(
        "ValidateToolkit",
      )`Tools: ${validateTool}` {}
      class MyAgent extends Agent("validator")`Uses ${ValidateToolkit}` {}
      class SchemaFile extends File.Json(
        "test/fixtures/schema-forward.json",
      )`Schema` {}

      const ctx = yield* createContext(MyAgent);

      // Tool description should contain resolved forward reference
      expect(ctx.toolkit.tools.validate.description).toContain(
        "Validates against [schema-forward.json](test/fixtures/schema-forward.json)",
      );
    }).pipe(Effect.provide(TestLayer)),
  );
});
