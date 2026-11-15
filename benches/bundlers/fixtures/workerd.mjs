// The shared calls inside workerd, as a Worker's `test` handler: `workerd test`
// runs it and fails when it throws. `expected` is what the unbundled program
// printed in Node; the harness writes it before it bundles this file.
import expected from "./expected.json";
import { lines, runShared } from "./shared.mjs";

export default {
  async test() {
    await runShared();
    const got = JSON.stringify(lines, null, 2);
    const want = JSON.stringify(expected, null, 2);
    if (got !== want) throw new Error(`workerd printed\n${got}\nNode printed\n${want}`);
  },
};
