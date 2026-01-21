/**
 * Format a tool call into a CLI-friendly string.
 * Has built-in support for standard tools, falls back to abbreviated JSON for unknown tools.
 */
export const formatToolCall = (name: string, params: unknown): string => {
  const p = params as Record<string, unknown>;

  switch (name) {
    case "AnthropicBash":
    case "bash": {
      const cmd = String(p.command ?? "");
      const firstLine = cmd.split("\n")[0];
      return `$ ${firstLine.length > 80 ? firstLine.slice(0, 77) + "..." : firstLine}`;
    }

    case "read":
      return `read ${p.filePath}`;

    case "glob":
      return `glob ${p.pattern}${p.path ? ` in ${p.path}` : ""}`;

    case "grep":
      return `grep "${p.pattern}"${p.path ? ` in ${p.path}` : ""}`;

    case "edit": {
      const lines = String(p.newString ?? "").split("\n").length;
      return `edit ${p.filePath} (${p.oldString === "" ? "+" : "~"}${lines} lines)`;
    }

    case "todowrite": {
      const todos = (p.todos as unknown[]) ?? [];
      const inProgress = todos.filter(
        (t: any) => t.status === "in_progress",
      ).length;
      return `todo ${todos.length} items${inProgress ? ` (${inProgress} in_progress)` : ""}`;
    }

    case "todoread":
      return "todoread";

    case "readlints": {
      const paths = (p.paths as string[]) ?? [];
      return `readlints ${paths.length ? paths.join(", ") : "(all)"}`;
    }

    case "task":
      return `task "${String(p.description ?? "").slice(0, 50)}..."`;

    default: {
      // Fallback: abbreviated JSON for unknown tools
      const json = JSON.stringify(params);
      return `${name}(${json.length > 60 ? json.slice(0, 57) + "..." : json})`;
    }
  }
};
