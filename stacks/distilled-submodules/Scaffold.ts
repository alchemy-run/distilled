import { createHash } from "node:crypto";
import * as GitHub from "@alchemy.run/github";
import * as Alchemy from "alchemy";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";

/**
 * The exact set of files a spec-mirror repository must contain, committed by
 * an {@link Alchemy.Action} rather than by hand.
 *
 * A spec mirror only earns its keep if it holds the specs and the machinery
 * to refresh them — and nothing else. So the Action is authoritative in both
 * directions: it writes the managed files, and it DELETES anything else that
 * has appeared under a managed prefix. `specs/` is deliberately not a managed
 * prefix: that is the payload the repository's own `update-specs` workflow
 * produces, and this stack must never touch it.
 */

/** A repository path whose content the stack owns. */
export interface ScaffoldFiles {
  readonly [path: string]: string;
}

/**
 * Directory prefixes the Action owns. Any blob under one of these that is not
 * in the desired file set is deleted — that is what makes "and nothing extra"
 * enforceable rather than aspirational. Case-variants of a managed path are
 * deleted too; see the `deleted` computation below.
 */
const MANAGED_PREFIXES = [".github/", ".meta/"] as const;

/**
 * Paths under a managed prefix that survive anyway.
 *
 * `.meta/pnpm-lock.yaml` is written by the repository's own workflow (the
 * first run after a dependency changes commits it), so the stack has no
 * correct value for it and must not delete the one that is there.
 */
const PRESERVED = new Set([".meta/pnpm-lock.yaml"]);

/** Git's blob object id for `content` — the same hash the tree API returns. */
const blobSha = (content: string) => {
  const bytes = Buffer.from(content, "utf-8");
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
};

/**
 * A digest over the whole desired file set. It goes into the Action's input so
 * that changing a scaffold template re-runs the Action, without pushing every
 * file's content through the state store on every deploy.
 */
export const scaffoldDigest = (files: ScaffoldFiles) => {
  const hash = createHash("sha256");
  for (const path of Object.keys(files).sort()) {
    hash.update(path).update("\0").update(files[path]!).update("\0");
  }
  return hash.digest("hex");
};

/** Split an `owner/name` full name, failing loudly on anything else. */
const splitFullName = (fullName: string): readonly [string, string] => {
  const slash = fullName.indexOf("/");
  if (slash <= 0 || slash === fullName.length - 1) {
    throw new Error(`Expected an \`owner/name\` full name, got "${fullName}"`);
  }
  return [fullName.slice(0, slash), fullName.slice(slash + 1)] as const;
};

export interface ScaffoldInput {
  /**
   * `owner/name` of the repository to scaffold.
   *
   * One field rather than a separate `owner` and `repository`, because it is
   * fed the `GitHub.Repository` resource's `fullName` OUTPUT. That is what
   * makes this Action depend on the repository: alchemy builds its dependency
   * graph from the Outputs referenced in an input, so passing plain strings
   * here leaves the Action with no upstream and it runs CONCURRENTLY with the
   * repository it is trying to commit into. On a from-scratch deploy that is a
   * guaranteed 404 — the symptom is every scaffold failing at `getRef` while
   * the repositories are still being created.
   */
  readonly fullName: string;
  /**
   * Branch to commit on — the repository's resolved `defaultBranch` Output,
   * which is both the correct value and a second dependency edge.
   */
  readonly branch: string;
  /** Managed paths, sorted — recorded in state so a plan diff is readable. */
  readonly paths: readonly string[];
  /** {@link scaffoldDigest} of the content behind {@link paths}. */
  readonly digest: string;
}

export interface ScaffoldOutput {
  readonly commit: string | undefined;
  readonly written: readonly string[];
  readonly deleted: readonly string[];
}

/**
 * Build the Action. The file contents live in the closure rather than in the
 * input: the input carries only the paths and a digest of the content, so
 * state stays small while a template edit still re-runs the body.
 *
 * @param resolve the desired files for a repository, by repository name.
 */
export const makeSyncScaffold = (resolve: (repository: string) => ScaffoldFiles) =>
  Alchemy.Action(
    "SyncScaffold",
    Effect.gen(function* () {
      // Provided at runtime by `GitHub.providers()`.
      const { token, apiBaseUrl, userAgent } = yield* yield* GitHub.Credentials;

      /** One GitHub REST call; a non-2xx response throws an error carrying `status`. */
      const github = async (method: string, path: string, body?: unknown): Promise<any> => {
        const response = await fetch(`${apiBaseUrl}${path}`, {
          method,
          headers: {
            accept: "application/vnd.github+json",
            authorization: `Bearer ${Redacted.value(token)}`,
            "user-agent": userAgent,
            "x-github-api-version": "2022-11-28",
            ...(body === undefined ? {} : { "content-type": "application/json" }),
          },
          body: body === undefined ? undefined : JSON.stringify(body),
        });
        if (!response.ok) {
          throw Object.assign(
            new Error(`GitHub ${method} ${path}: ${response.status} ${await response.text()}`),
            { status: response.status },
          );
        }
        return response.status === 204 ? undefined : response.json();
      };

      const api = <A>(call: () => Promise<A>) =>
        Effect.tryPromise({ try: call, catch: (e) => e as Error });

      return Effect.fn(function* (input: ScaffoldInput) {
        const { branch } = input;
        const [owner, repo] = splitFullName(input.fullName);
        const files = resolve(repo);

        // The commit the branch is on, and the tree it points at.
        const ref = yield* api(async () => {
          try {
            const data = await github("GET", `/repos/${owner}/${repo}/git/ref/heads/${branch}`);
            return data.object.sha as string;
          } catch (error: any) {
            // A repository created without `autoInit` has no commit yet.
            if (error.status === 404 || error.status === 409) return undefined;
            throw error;
          }
        });

        const existing = new Map<string, string>();
        if (ref !== undefined) {
          const tree = yield* api(async () => {
            return github("GET", `/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`);
          });
          for (const entry of tree.tree as Array<{
            path?: string;
            type?: string;
            sha?: string;
          }>) {
            if (entry.type === "blob" && entry.path && entry.sha) {
              existing.set(entry.path, entry.sha);
            }
          }
        }

        // Write what differs. Comparing blob ids (not content) means an
        // unchanged file costs one hash locally and no API call at all.
        const written = Object.keys(files)
          .sort()
          .filter((path) => existing.get(path) !== blobSha(files[path]!));

        // Delete what the stack owns but no longer wants: anything under a
        // managed prefix, plus any case-variant of a managed path. That second
        // rule is what removes the `README.md` GitHub writes when a repository
        // is created with `autoInit` — it sits next to the scaffold's
        // `readme.md` rather than replacing it. `specs/` is not a managed
        // prefix and collides with nothing, so the payload is never at risk.
        const managedLower = new Set(Object.keys(files).map((path) => path.toLowerCase()));
        const deleted = [...existing.keys()]
          .filter(
            (path) =>
              (MANAGED_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
                managedLower.has(path.toLowerCase())) &&
              !PRESERVED.has(path) &&
              files[path] === undefined,
          )
          .sort();

        if (written.length === 0 && deleted.length === 0) {
          yield* Console.log(`  ${repo}: scaffold already up to date`);
          return { commit: ref, written, deleted } satisfies ScaffoldOutput;
        }

        const blobs = yield* Effect.all(
          written.map((path) =>
            api(async () => {
              const data = await github("POST", `/repos/${owner}/${repo}/git/blobs`, {
                content: Buffer.from(files[path]!, "utf-8").toString("base64"),
                encoding: "base64",
              });
              return { path, sha: data.sha as string };
            }),
          ),
          { concurrency: 5 },
        );

        const tree = yield* api(async () => {
          const data = await github("POST", `/repos/${owner}/${repo}/git/trees`, {
            // Without a base tree on an empty repository there is nothing to
            // extend; with one, only the entries below change.
            ...(ref === undefined ? {} : { base_tree: ref }),
            tree: [
              ...blobs.map(({ path, sha }) => ({
                path,
                mode: "100644" as const,
                type: "blob" as const,
                sha,
              })),
              // A null sha removes the path from the resulting tree.
              ...deleted.map((path) => ({
                path,
                mode: "100644" as const,
                type: "blob" as const,
                sha: null,
              })),
            ],
          });
          return data.sha as string;
        });

        const summary = [
          written.length > 0 ? `${written.length} written` : undefined,
          deleted.length > 0 ? `${deleted.length} deleted` : undefined,
        ]
          .filter((part) => part !== undefined)
          .join(", ");

        const commit = yield* api(async () => {
          const data = await github("POST", `/repos/${owner}/${repo}/git/commits`, {
            message: `chore: sync spec-mirror scaffold (${summary})\n\nManaged by the distilled-submodules Alchemy stack in alchemy-run/distilled.`,
            tree,
            parents: ref === undefined ? [] : [ref],
          });
          return data.sha as string;
        });

        yield* api(async () => {
          if (ref === undefined) {
            await github("POST", `/repos/${owner}/${repo}/git/refs`, {
              ref: `refs/heads/${branch}`,
              sha: commit,
            });
          } else {
            await github("PATCH", `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
              sha: commit,
            });
          }
        });

        yield* Console.log(`  ${repo}: ${summary} (${commit.slice(0, 8)})`);
        return { commit, written, deleted } satisfies ScaffoldOutput;
      });
    }),
  );
