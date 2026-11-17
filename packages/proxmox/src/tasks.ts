/**
 * Waiting for Proxmox tasks (hand-written).
 *
 * Most write operations start a task and return its ID (a UPID).
 * {@link waitForTask} polls the task's status until it stops.
 */
import * as Data from "effect/Data";
import type * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
import { getNodesByNodeTasksByUpidStatus } from "./services/nodes_tasks.ts";

export class TaskFailed extends Data.TaggedError("TaskFailed")<{
  readonly node: string;
  readonly upid: string;
  readonly message: string;
}> {}

export class TaskTimeout extends Data.TaggedError("TaskTimeout")<{
  readonly node: string;
  readonly upid: string;
}> {}

class TaskPending extends Data.TaggedError("TaskPending") {}

export interface WaitForTaskOptions {
  /** Wall-clock limit for the whole wait. Defaults to 2 minutes. */
  readonly timeout?: Duration.Input;
}

/**
 * Polls with exponential backoff from 500ms, capped at 5s, until the task
 * stops or the timeout passes. A task that stops with warnings succeeds and
 * reports how many there were.
 */
export const waitForTask = (node: string, upid: string, options: WaitForTaskOptions = {}) => {
  const timeout = () => new TaskTimeout({ node, upid });
  return getNodesByNodeTasksByUpidStatus({ node, upid }).pipe(
    Effect.flatMap((task) =>
      Effect.gen(function* () {
        if (task.status !== "stopped") return yield* Effect.fail(new TaskPending());
        if (task.exitstatus === "OK") return { ...task, warnings: 0 };
        const warnings = task.exitstatus?.match(/^WARNINGS: (\d+)$/);
        if (warnings) return { ...task, warnings: Number(warnings[1]) };
        return yield* Effect.fail(
          new TaskFailed({
            node,
            upid,
            message: task.exitstatus ?? "Stopped task has no exit status",
          }),
        );
      }),
    ),
    Effect.retry({
      while: (error) => error._tag === "TaskPending",
      schedule: Schedule.min([
        Schedule.exponential("500 millis", 1.5),
        Schedule.spaced("5 seconds"),
      ]),
    }),
    // Unreachable: the retry only stops on other errors. Keeps TaskPending out of the type.
    Effect.catchTag("TaskPending", () => Effect.fail(timeout())),
    Effect.timeoutOrElse({
      duration: options.timeout ?? "2 minutes",
      orElse: () => Effect.fail(timeout()),
    }),
  );
};
