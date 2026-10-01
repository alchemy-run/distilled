import { describe, expect, test } from "bun:test";
import { matchTypedError } from "@distilled.cloud/core/protocol-http";
import { RepositoryConfigNotFound } from "./services/workers_builds.ts";

const errors = [{ code: 12000, message: "Not found" }];

describe("Workers Builds repository configuration errors", () => {
  test("matches the observed repository configuration rejection", () => {
    const error = matchTypedError([RepositoryConfigNotFound], 404, errors);
    expect(error).toBeInstanceOf(RepositoryConfigNotFound);
    expect(error).toMatchObject({
      _tag: "RepositoryConfigNotFound",
      code: 12000,
      message: "Not found",
    });
  });

  test("does not classify a different status as missing configuration", () => {
    expect(
      matchTypedError([RepositoryConfigNotFound], 403, errors),
    ).toBeUndefined();
  });

  test("does not classify another error code as missing configuration", () => {
    expect(
      matchTypedError([RepositoryConfigNotFound], 404, [
        { code: 12005, message: "Missing token from authorization header" },
      ]),
    ).toBeUndefined();
  });
});
