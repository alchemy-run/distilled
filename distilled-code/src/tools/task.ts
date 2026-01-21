import { Tool, Toolkit } from "@effect/ai";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";

const DESCRIPTION = `Launch a new agent to handle complex, multistep tasks autonomously.

Available agent types and the tools they have access to:
{agents}

When using the Task tool, you must specify a subagent_type parameter to select which agent type to use.

When to use the Task tool:
- When you are instructed to execute custom slash commands. Use the Task tool with the slash command invocation as the entire prompt. The slash command can take arguments. For example: Task(description="Check the file", prompt="/check-file path/to/file.py")

When NOT to use the Task tool:
- If you want to read a specific file path, use the Read or Glob tool instead of the Task tool, to find the match more quickly
- If you are searching for a specific class definition like "class Foo", use the Glob tool instead, to find the match more quickly
- If you are searching for code within a specific file or set of 2-3 files, use the Read tool instead of the Task tool, to find the match more quickly
- Other tasks that are not related to the agent descriptions above


Usage notes:
1. Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses
2. When the agent is done, it will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.
3. Each agent invocation is stateless unless you provide a session_id. Your prompt should contain a highly detailed task description for the agent to perform autonomously and you should specify exactly what information the agent should return back to you in its final and only message to you.
4. The agent's outputs should generally be trusted
5. Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since it is not aware of the user's intent
6. If the agent description mentions that it should be used proactively, then you should try your best to use it without the user having to ask for it first. Use your judgement.

Example usage (NOTE: The agents below are fictional examples for illustration only - use the actual agents listed above):

<example_agent_descriptions>
"code-reviewer": use this agent after you are done writing a significant piece of code
"greeting-responder": use this agent when to respond to user greetings with a friendly joke
</example_agent_description>

<example>
user: "Please write a function that checks if a number is prime"
assistant: Sure let me write a function that checks if a number is prime
assistant: First let me use the Write tool to write a function that checks if a number is prime
assistant: I'm going to use the Write tool to write the following code:
<code>
function isPrime(n) {
  if (n <= 1) return false
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false
  }
  return true
}
</code>
<commentary>
Since a significant piece of code was written and the task was completed, now use the code-reviewer agent to review the code
</commentary>
assistant: Now let me use the code-reviewer agent to review the code
assistant: Uses the Task tool to launch the code-reviewer agent
</example>

<example>
user: "Hello"
<commentary>
Since the user is greeting, use the greeting-responder agent to respond with a friendly joke
</commentary>
assistant: "I'm going to use the Task tool to launch the with the greeting-responder agent"
</example>
`;

export const task = Tool.make("task", {
  description: DESCRIPTION,
  parameters: {
    description: S.String.annotations({
      description: "A short (3-5 words) description of the task",
    }),
    prompt: S.String.annotations({
      description: "The task for the agent to perform",
    }),
    subagent_type: S.optional(S.String).annotations({
      description:
        "The type of specialized agent to use for this task. If not specified, uses the default coding agent.",
    }),
    session_id: S.optional(S.String).annotations({
      description:
        "Optional session ID for stateful agent sessions. If provided, the agent will persist state across invocations.",
    }),
  },
  success: S.String,
  failure: S.Never,
});

export const taskToolkit = Toolkit.make(task);

/**
 * Create a layer for the task toolkit.
 * Note: The actual implementation requires access to the agent spawning mechanism,
 * which will be provided at a higher level in the architecture.
 */
export const taskToolkitLayer = (
  spawnSubAgent: (params: {
    description: string;
    prompt: string;
    subagent_type?: string;
    session_id?: string;
  }) => Effect.Effect<string, never, never>,
) =>
  taskToolkit.toLayer(
    Effect.succeed({
      task: Effect.fn(function* (params) {
        yield* Effect.logInfo(
          `[task] Spawning sub-agent: ${params.description}`,
        );
        const result = yield* spawnSubAgent(params);
        return result;
      }),
    }),
  );

/**
 * Default task toolkit layer that returns a placeholder message.
 * Replace this with an actual implementation that spawns sub-agents.
 */
export const defaultTaskToolkitLayer = taskToolkit.toLayer(
  Effect.succeed({
    task: Effect.fn(function* (params) {
      yield* Effect.logInfo(
        `[task] Sub-agent spawning not implemented: ${params.description}`,
      );
      return `Task "${params.description}" would spawn a sub-agent with prompt: ${params.prompt.slice(0, 100)}...`;
    }),
  }),
);
