import * as EffectTool from "@effect/ai/Tool";
import * as EffectToolkit from "@effect/ai/Toolkit";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as yaml from "yaml";
import { isAgent, type Agent } from "./agent.ts";
import { isFile, type File } from "./file/file.ts";
import { isInput } from "./input.ts";
import { isOutput } from "./output.ts";
import { isTool, type Tool } from "./tool/tool.ts";
import { isToolkit, type Toolkit } from "./toolkit/toolkit.ts";
export type { Toolkit } from "./toolkit/toolkit.ts";

/**
 * A thunk is a function that returns a reference, enabling forward references.
 * This allows agents to reference other agents that are declared later in the code.
 */
export type Thunk<T = unknown> = () => T;

/**
 * Checks if a value is a thunk (a function that returns a reference).
 * Thunks are zero-argument arrow functions that return references.
 * They are distinguished from other function-like constructs by:
 * - Not being agents, files, toolkits, tools, inputs, outputs, or Effect Schemas
 * - Having no arguments (length === 0)
 */
export const isThunk = (value: unknown): value is Thunk =>
  typeof value === "function" &&
  (value as Function).length === 0 &&
  !isAgent(value) &&
  !isFile(value) &&
  !isToolkit(value) &&
  !isTool(value) &&
  !isInput(value) &&
  !isOutput(value) &&
  !S.isSchema(value);

/**
 * Resolves a value that may be a thunk to its actual value.
 * If the value is a thunk, calls it to get the resolved value.
 * Otherwise, returns the value as-is.
 */
export const resolveThunk = <T>(value: T | Thunk<T>): T =>
  isThunk(value) ? value() : value;

export interface AgentContext {
  system: string;
  toolkit: EffectToolkit.Toolkit<Record<string, EffectTool.Any>>;
}

interface FileEntry {
  id: string;
  language: string;
  description: string;
  content: string;
}

export const createContext: (agent: Agent) => Effect.Effect<
  {
    system: string;
    toolkit: EffectToolkit.Toolkit<{
      readonly [x: string]: EffectTool.Any;
    }>;
  },
  never,
  FileSystem.FileSystem
> = Effect.fn(function* (agent: Agent) {
  const fs = yield* FileSystem.FileSystem;

  const visited = new Set<string>();
  const agents: Array<{ id: string; content: string }> = [];
  const files: Array<FileEntry> = [];
  const toolkits: Array<{ id: string; content: string }> = [];

  // Collect all references first (sync), then read files (async)
  const pendingFiles: Array<{ ref: File }> = [];

  const collect = (rawRef: any): void => {
    // Resolve thunks to get the actual reference
    const ref = resolveThunk(rawRef);

    if (!ref) return;
    // Skip primitives - only process objects and classes (functions with type/id)
    if (typeof ref !== "object" && typeof ref !== "function") return;
    const key = `${ref.type}:${ref.id}`;
    if (visited.has(key)) return;
    visited.add(key);

    if (isAgent(ref)) {
      agents.push({
        id: ref.id,
        content: renderTemplate(ref.template, ref.references),
      });
      ref.references.forEach(collect);
    } else if (isFile(ref)) {
      pendingFiles.push({ ref });
      ref.references.forEach(collect);
    } else if (isToolkit(ref)) {
      toolkits.push({
        id: ref.id,
        content: renderTemplate(ref.template, ref.references).trim(),
      });
      ref.references.forEach(collect);
    } else if (isTool(ref)) {
      // Tools can reference files, agents, etc. in their descriptions
      ref.references?.forEach(collect);
    }
  };

  // Render the root agent template
  const rootContent = renderTemplate(agent.template, agent.references);

  // Collect all references from root
  agent.references.forEach(collect);

  // Read all files in parallel
  for (const { ref } of pendingFiles) {
    const content = yield* fs
      .readFileString(ref.id)
      .pipe(Effect.catchAll(() => Effect.succeed("// File not found")));
    files.push({
      id: ref.id,
      language: ref.language,
      description: renderTemplate(ref.template, ref.references),
      content,
    });
  }

  // Build sections
  const sections: string[] = [createPreamble(agent.id), rootContent];

  if (agents.length > 0 || files.length > 0 || toolkits.length > 0) {
    sections.push("\n\n---\n");
  }

  if (agents.length > 0) {
    sections.push("\n## Agents\n\n");
    sections.push(
      "Below is a list and description of each agent you can delegate tasks to, their role, and their capabilities.\n\n",
    );
    sections.push(
      agents.map((a) => `### ${a.id}\n\n${a.content}`).join("\n\n"),
    );
    sections.push("\n");
  }
  if (files.length > 0) {
    sections.push("\n## Files\n\n");
    sections.push(
      "In this section, we document important files that you must be aware of and may need to read, write, or request another agent interact with.\n\n",
    );
    sections.push(
      files
        .map(
          (f) =>
            `### ${f.id}\n\n${f.description}\n\n\`\`\`${f.language}\n${f.content}\n\`\`\``,
        )
        .join("\n\n"),
    );
    sections.push("\n");
  }
  if (toolkits.length > 0) {
    sections.push("\n## Toolkits\n\n");
    sections.push(
      "You can (and should) use the following tools to accomplish your tasks. Tool definitions are provided separately.\n\n",
    );
    sections.push(
      toolkits.map((t) => `### ${t.id}\n\n${t.content}`).join("\n\n"),
    );
    sections.push("\n");
  }

  // Build the combined Effect toolkit from all collected toolkits
  const collectedToolkits = collectToolkits(agent);
  const effectToolkit =
    collectedToolkits.length > 0
      ? EffectToolkit.merge(...collectedToolkits.map(createEffectToolkit))
      : EffectToolkit.empty;

  return {
    system: sections.join(""),
    toolkit: effectToolkit,
  } satisfies AgentContext;
});

/**
 * Creates the preamble for an agent context, including the agent identifier and symbol reference.
 */
export const createPreamble = (agentId: string): string =>
  `You are @${agentId}, an agent configured with the following context.

## Symbol Reference

Throughout this context, you will see the following symbols:

- \`@name\` - References an agent you can delegate tasks to
- \`🧰name\` - References a toolkit containing related tools
- \`🛠️name\` - References a tool you can use
- \`[filename](path)\` - References a file in the codebase
- \`\${input:name}\` - References a tool input parameter
- \`\${output:name}\` - References a tool output field

---

`;

/**
 * Recursively serialize a value, replacing references with their string representations.
 * This produces a plain JSON-serializable object that can be passed to yaml.stringify.
 */
function serialize(rawValue: unknown): unknown {
  // Resolve thunks first to get the actual value
  const value = resolveThunk(rawValue);

  // Handle Agent, File, Toolkit, Tool, Input, Output references
  // These can be classes (functions) so check before typeof checks
  if (isAgent(value)) return `@${value.id}`;
  if (isFile(value)) {
    const filename = value.id.split("/").pop() || value.id;
    return `[${filename}](${value.id})`;
  }
  if (isToolkit(value)) return `🧰${value.id}`;
  if (isTool(value)) return `🛠️${value.id}`;
  if (isInput(value)) return `\${input:${value.id}}`;
  if (isOutput(value)) return `\${output:${value.id}}`;

  // Handle primitives and functions
  if (value === null || value === undefined) return value;
  if (typeof value === "function") return String(value);
  if (typeof value !== "object") return value;

  // Handle Set - convert to array
  if (value instanceof Set) return Array.from(value).map(serialize);

  // Handle Array
  if (Array.isArray(value)) return value.map(serialize);

  // Handle plain objects only - for other object types (classes, Schemas, etc.),
  // fall back to string representation to avoid YAML serialization issues
  const proto = Object.getPrototypeOf(value);
  if (proto !== null && proto !== Object.prototype) {
    return String(value);
  }

  // Handle plain Object
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, serialize(v)]),
  );
}

/**
 * Stringifies a value for use in agent context.
 * - Primitives: converted to string
 * - Arrays/Sets/Objects: serialized to YAML
 * - Agent: @{id} reference link
 * - File: [filename](path) markdown link
 * - Toolkit: 🧰{id}
 * - Tool: 🛠️{id}
 * - Input: ${input:{id}}
 * - Output: ${output:{id}}
 * - Thunk: resolved to its actual value first
 */
function stringify(rawValue: unknown): string {
  // Resolve thunks first to get the actual value
  const value = resolveThunk(rawValue);

  // Handle Agent, File, Toolkit, Tool, Input, Output references
  if (isAgent(value)) return `@${value.id}`;
  if (isFile(value)) {
    const filename = value.id.split("/").pop() || value.id;
    return `[${filename}](${value.id})`;
  }
  if (isToolkit(value)) return `🧰${value.id}`;
  if (isTool(value)) return `🛠️${value.id}`;
  if (isInput(value)) return `\${input:${value.id}}`;
  if (isOutput(value)) return `\${output:${value.id}}`;

  // Handle primitives
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return String(value);

  // Handle complex types with YAML
  const serialized = serialize(value);
  return "\n" + yaml.stringify(serialized).trimEnd();
}

/**
 * Renders a template string array with its references, replacing references with stringified values.
 */
function renderTemplate(
  template: TemplateStringsArray,
  references: any[],
): string {
  let result = template[0];
  for (let i = 0; i < references.length; i++) {
    const ref = references[i];
    result += stringify(ref) + template[i + 1];
  }
  return result;
}

/**
 * Collects all toolkits from an agent's reference tree.
 * Walks through the agent and all nested agents to find toolkit references.
 */
export const collectToolkits = (agent: Agent): Toolkit[] => {
  const toolkits: Toolkit[] = [];
  const visited = new Set<string>();

  const collect = (rawRef: any): void => {
    // Resolve thunks to get the actual reference
    const ref = resolveThunk(rawRef);

    if (!ref) return;
    // Check for both objects and classes (functions with type/id properties)
    if (typeof ref !== "object" && typeof ref !== "function") return;
    const key = `${ref.type}:${ref.id}`;
    if (visited.has(key)) return;
    visited.add(key);

    if (isToolkit(ref)) {
      toolkits.push(ref);
      ref.references?.forEach(collect);
    } else if (isAgent(ref)) {
      ref.references?.forEach(collect);
    } else if (isFile(ref)) {
      ref.references?.forEach(collect);
    } else if (isTool(ref)) {
      ref.references?.forEach(collect);
    }
  };

  agent.references?.forEach(collect);
  return toolkits;
};

/**
 * Converts a distilled-code Toolkit to an @effect/ai Toolkit.
 */
export const createEffectToolkit = <T extends Toolkit>(
  toolkit: T,
): EffectToolkit.Toolkit<EffectToolkit.ToolsByName<EffectTool.Any[]>> => {
  const effectTools = toolkit.tools.map(createEffectTool);
  return EffectToolkit.make(...effectTools);
};

/**
 * Converts a distilled-code Tool to an @effect/ai Tool.
 * Extracts the description from the template and maps input/output schemas.
 */
export const createEffectTool = <T extends Tool>(tool: T): EffectTool.Any => {
  // Render the description from the tool's template
  const description = renderTemplate(tool.template, tool.references);

  // Get the input schema fields - tool.input is a Schema.Struct created by deriveSchema
  // We need to extract the fields from it
  const inputSchema = tool.input;
  const parameters =
    inputSchema && "fields" in inputSchema
      ? (inputSchema as any as S.Struct<S.Struct.Fields>).fields
      : {};

  // Get the output schema
  const outputSchema = tool.output ?? S.Any;

  return EffectTool.make(tool.id, {
    description,
    parameters,
    success: outputSchema,
  });
};
