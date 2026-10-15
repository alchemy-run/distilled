/**
 * Pick a target for every (SDK, protocol) pair that does not have one in
 * targets.json: rank that protocol's operations statically, then trial-run
 * the best candidates in a probe against canned responses and keep the
 * first call that succeeds.
 */
import { join } from "node:path";
import type { ProbeRequest } from "./probe.ts";
import {
  CANDIDATE_RESPONSES,
  FIXED_PROTOCOL,
  fixedTarget,
  listOperations,
  type OpInfo,
  OVERRIDES,
  primaryOf,
  PROTOCOL_OVERRIDES,
  protocolsOf,
  rankOperations,
  resolveImports,
  targetFor,
  type Target,
  type TargetsFile,
} from "./targets.ts";
import { BENCH_DIR, lastJsonLine, log, PACKAGES, pool, run } from "./util.ts";

const PROBE = join(BENCH_DIR, "src", "probe.ts");
const CANDIDATES = 12;

export interface DiscoverResult {
  readonly target?: Target;
  readonly error?: string;
}

const discoverOne = async (
  pkg: string,
  protocol: string,
  ops: ReadonlyArray<OpInfo>,
  primary: boolean,
): Promise<DiscoverResult> => {
  const o = OVERRIDES[pkg] ?? {};
  const po = primary ? undefined : PROTOCOL_OVERRIDES[pkg]?.[protocol];
  const module = primary ? o.module : po?.module;
  const opName = primary ? o.op : po?.op;
  let ranked = rankOperations(
    ops.filter((x) => x.protocol === protocol),
    module,
  );
  if (opName) ranked = ranked.filter((r) => r.op === opName);
  const candidates = ranked.slice(0, CANDIDATES);
  if (candidates.length === 0) return { error: `no ${protocol} operations found in src/services` };

  const responses = po ? [po.response] : primary && o.response ? [o.response] : CANDIDATE_RESPONSES;
  // Resolve auth/imports with the first candidate's Op; discover swaps Op per candidate.
  const draft = targetFor(pkg, candidates[0]!, responses[0]!, primary);
  const req: ProbeRequest = {
    mode: "discover",
    imports: resolveImports(draft),
    auth: draft.auth,
    env: draft.env,
    candidates: candidates.map((c) => ({
      op: c.op,
      module: join(PACKAGES, pkg, "lib", `${c.module}.js`),
      call: targetFor(pkg, c, responses[0]!, primary).call,
    })),
    responses,
  };
  const res = await run("node", ["--expose-gc", PROBE, JSON.stringify(req)], {
    timeoutMs: 180_000,
  });
  const out = lastJsonLine<any>(res.stdout);
  if (!out)
    return { error: `probe crashed: ${res.stderr.trim().split("\n").slice(-3).join(" | ")}` };
  if (out.fatal) return { error: out.fatal };
  if (!out.ok)
    return { error: `no candidate succeeded: ${(out.tried ?? []).slice(0, 4).join(" || ")}` };
  const chosen = candidates.find((c) => c.op === out.op)!;
  return { target: targetFor(pkg, chosen, out.response, primary) };
};

/**
 * Fills `targets` in place. Returns errors keyed by pkg, then protocol.
 * A package's primary protocol is its pinned module's protocol, else the
 * protocol most of its operations use.
 */
export const discoverMissing = async (
  sdks: ReadonlyArray<string>,
  targets: TargetsFile,
  opts: { rediscover: boolean; jobs: number },
): Promise<Record<string, Record<string, string>>> => {
  const errors: Record<string, Record<string, string>> = {};
  const todo: Array<{ pkg: string; protocol: string; ops: OpInfo[]; primary: boolean }> = [];
  for (const pkg of sdks) {
    const have = (targets[pkg] ??= {});
    const fixed = fixedTarget(pkg);
    if (fixed) {
      have[FIXED_PROTOCOL] ??= fixed;
      continue;
    }
    const ops = listOperations(pkg);
    const protocols = protocolsOf(ops).map(([p]) => p);
    // Protocols the SDK no longer uses drop out of the program list.
    for (const p of Object.keys(have)) if (!protocols.includes(p)) delete have[p];
    const o = OVERRIDES[pkg];
    const pinnedProtocol = o?.module && ops.find((x) => x.module === o.module)?.protocol;
    const primaryProtocol = primaryOf(have)?.protocol ?? pinnedProtocol ?? protocols[0];
    for (const protocol of protocols) {
      const t = have[protocol];
      if (t && !(opts.rediscover && !t.pinned)) continue;
      todo.push({ pkg, protocol, ops, primary: protocol === primaryProtocol });
    }
  }
  if (todo.length === 0) return errors;
  log(`discover: picking ${todo.length} target(s)`);
  await pool(todo, opts.jobs, async ({ pkg, protocol, ops, primary }) => {
    const r = await discoverOne(pkg, protocol, ops, primary);
    if (r.target) {
      targets[pkg]![protocol] = r.target;
      log(`  ${pkg} [${protocol}]: ${r.target.label}`);
    } else {
      (errors[pkg] ??= {})[protocol] = r.error!;
      log(`  ${pkg} [${protocol}]: FAILED ${r.error}`);
    }
  });
  return errors;
};
