import { spawnSync } from "node:child_process";

export interface ExecResult {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
}

export interface ExecOptions {
  readonly cwd?: string;
  /** Capture stdout/stderr instead of passing them through to the terminal. */
  readonly quiet?: boolean;
  /** Return a non-zero exit instead of throwing. */
  readonly nothrow?: boolean;
}

/**
 * Run a command without a shell. Throws on a non-zero exit unless `nothrow`;
 * always throws when the command cannot be started.
 */
export const exec = (cmd: string, args: readonly string[], options: ExecOptions = {}) => {
  const result = spawnSync(cmd, args, {
    cwd: options.cwd,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: options.quiet ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.error) throw result.error;
  const out: ExecResult = {
    exitCode: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
  if (out.exitCode !== 0 && !options.nothrow) {
    throw new Error(
      `${[cmd, ...args].join(" ")} failed (exit ${out.exitCode})${out.stderr ? `: ${out.stderr.trim()}` : ""}`,
    );
  }
  return out;
};
