/** What the test checks and the bench measures: a bundler, a target, a fixture. */
import { BUNDLERS, esbuild, type Bundler, type Target } from "./bundlers.ts";

export type Fixture = "node" | "browser" | "grpc-sockets";

export interface Case {
  readonly bundler: Bundler;
  readonly target: Target;
  readonly fixture: Fixture;
  /**
   * The bundle runs in Node. Browser output that needs a DOM is only built:
   * webpack loads its chunks with `<script>` tags, and Vite preloads each
   * dynamic import's chunks with `<link>` tags.
   */
  readonly runs: boolean;
}

export const caseId = (c: Case) => `${c.bundler.name} ${c.target} (${c.fixture})`;

export const CASES: ReadonlyArray<Case> = [
  ...BUNDLERS.flatMap((bundler): Case[] => [
    { bundler, target: "node", fixture: "node", runs: true },
    {
      bundler,
      target: "browser",
      fixture: "browser",
      runs: bundler.name !== "webpack" && bundler.name !== "vite",
    },
  ]),
  // wrangler: esbuild with the Worker conditions.
  { bundler: esbuild, target: "workerd", fixture: "node", runs: true },
];

/** The gRPC transport for Workers, through every bundler and through wrangler. */
export const SOCKETS_CASES: ReadonlyArray<Case> = [
  ...BUNDLERS.map((bundler): Case => ({
    bundler,
    target: "node",
    fixture: "grpc-sockets",
    runs: true,
  })),
  { bundler: esbuild, target: "workerd", fixture: "grpc-sockets", runs: true },
];
