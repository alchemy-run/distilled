/**
 * Memory settings for bundle-lib, imported before rolldown loads (they apply
 * to the whole process, and to the per-package processes it starts).
 *
 * - rolldown's native allocator (mimalloc) returns freed pages to the OS at
 *   once instead of keeping them for reuse: a package's builds run one
 *   service after another, and the pages of a finished build otherwise stay
 *   in the process for the rest of the run.
 * - V8 grows its heap in smaller steps and collects sooner.
 *
 * Together they halve bundle-lib's peak RSS (cloudflare 1.2 GB -> 0.5 GB,
 * gcp 1.7 GB -> 0.8 GB) for about a third more build time. Set either
 * variable to override it.
 */
import { setFlagsFromString } from "node:v8";

process.env.MIMALLOC_PURGE_DELAY ??= "0";
process.env.MIMALLOC_PURGE_DECOMMITS ??= "1";
setFlagsFromString("--optimize-for-size");
