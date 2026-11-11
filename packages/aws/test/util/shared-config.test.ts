import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as Effect from "effect/Effect";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import {
  getConfigFilepath,
  getCredentialsFilepath,
  getHomeDir,
  loadSharedConfigFiles,
  parseKnownFiles,
} from "../../src/util/shared-config.ts";

const ENV_KEYS = [
  "HOME",
  "USERPROFILE",
  "HOMEPATH",
  "HOMEDRIVE",
  "AWS_CONFIG_FILE",
  "AWS_SHARED_CREDENTIALS_FILE",
] as const;

let home: string;

const load = () => Effect.runPromise(loadSharedConfigFiles);
const known = () => Effect.runPromise(parseKnownFiles);
const loadError = () => Effect.runPromise(Effect.flip(loadSharedConfigFiles));
const saved: Record<string, string | undefined> = {};

const write = (name: "config" | "credentials", contents: string) => {
  mkdirSync(join(home, ".aws"), { recursive: true });
  writeFileSync(join(home, ".aws", name), contents);
};

beforeEach(() => {
  for (const key of ENV_KEYS) {
    saved[key] = process.env[key];
    delete process.env[key];
  }
  home = mkdtempSync(join(tmpdir(), "distilled-aws-ini-"));
  process.env.HOME = home;
});

afterEach(() => {
  rmSync(home, { recursive: true, force: true });
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

describe("paths", () => {
  test("default to ~/.aws", () => {
    expect(getHomeDir()).toBe(home);
    expect(getConfigFilepath()).toBe(join(home, ".aws", "config"));
    expect(getCredentialsFilepath()).toBe(join(home, ".aws", "credentials"));
  });

  test("the environment overrides both files", () => {
    process.env.AWS_CONFIG_FILE = "/etc/aws/config";
    process.env.AWS_SHARED_CREDENTIALS_FILE = "/etc/aws/credentials";
    expect(getConfigFilepath()).toBe("/etc/aws/config");
    expect(getCredentialsFilepath()).toBe("/etc/aws/credentials");
  });

  test("the Windows spellings stand in for HOME", () => {
    delete process.env.HOME;
    process.env.USERPROFILE = "C:\\Users\\jane";
    expect(getHomeDir()).toBe("C:\\Users\\jane");
    delete process.env.USERPROFILE;
    process.env.HOMEDRIVE = "D:\\";
    process.env.HOMEPATH = "Users\\jane";
    expect(getHomeDir()).toBe("D:\\Users\\jane");
  });
});

describe("loadSharedConfigFiles", () => {
  test("files that are not there read as empty", async () => {
    expect(await load()).toEqual({
      configFile: {},
      credentialsFile: {},
    });
  });

  test("config sections lose the `profile` prefix, other prefixes keep it", async () => {
    write(
      "config",
      `[default]
region = us-east-1

[profile dev]
region = us-west-2

[sso-session corp]
sso_region = us-east-1

[services local]
s3 =
  endpoint_url = http://localhost:4566

[bare]
region = eu-west-1
`,
    );
    const { configFile } = await load();
    expect(configFile).toEqual({
      default: { region: "us-east-1" },
      dev: { region: "us-west-2" },
      "sso-session.corp": { sso_region: "us-east-1" },
      "services.local": { "s3.endpoint_url": "http://localhost:4566" },
    });
  });

  test("credentials sections are taken as written", async () => {
    write(
      "credentials",
      `[default]
aws_access_key_id = AKID
aws_secret_access_key = SECRET
`,
    );
    const { credentialsFile } = await load();
    expect(credentialsFile).toEqual({
      default: { aws_access_key_id: "AKID", aws_secret_access_key: "SECRET" },
    });
  });
});

describe("parseKnownFiles", () => {
  test("merges both files, the credentials file winning on a shared key", async () => {
    write(
      "config",
      `[profile dev]
region = us-west-2
aws_access_key_id = FROM_CONFIG
`,
    );
    write(
      "credentials",
      `[dev]
aws_access_key_id = FROM_CREDENTIALS
aws_secret_access_key = SECRET
`,
    );
    expect(await known()).toEqual({
      dev: {
        region: "us-west-2",
        aws_access_key_id: "FROM_CREDENTIALS",
        aws_secret_access_key: "SECRET",
      },
    });
  });

  test("a rewritten file is read again rather than served from a cache", async () => {
    write("credentials", "[default]\naws_access_key_id = FIRST\n");
    expect((await known()).default?.aws_access_key_id).toBe("FIRST");
    write("credentials", "[default]\naws_access_key_id = SECOND\n");
    expect((await known()).default?.aws_access_key_id).toBe("SECOND");
  });
});

describe("files that cannot be read", () => {
  test("an unreadable file fails with SharedConfigError", async () => {
    write("config", "[default]\nregion = us-east-1\n");
    chmodSync(join(home, ".aws", "config"), 0o000);
    const error = await loadError();
    expect(error._tag).toBe("Alchemy::AWS::SharedConfigError");
    expect(error.path).toBe(join(home, ".aws", "config"));
  });

  test("a directory where the file should be fails with SharedConfigError", async () => {
    mkdirSync(join(home, ".aws", "credentials"), { recursive: true });
    const error = await loadError();
    expect(error._tag).toBe("Alchemy::AWS::SharedConfigError");
    expect(error.path).toBe(join(home, ".aws", "credentials"));
  });

  test("an invalid profile name fails with SharedConfigError", async () => {
    write("config", "[profile __proto__]\nregion = us-east-1\n");
    const error = await loadError();
    expect(error._tag).toBe("Alchemy::AWS::SharedConfigError");
    expect(error.message).toContain('invalid profile name "profile __proto__"');
  });

  test("a leading ~/ in AWS_CONFIG_FILE is the home directory", async () => {
    mkdirSync(join(home, "custom"), { recursive: true });
    writeFileSync(join(home, "custom", "config"), "[profile dev]\nregion = us-west-2\n");
    process.env.AWS_CONFIG_FILE = "~/custom/config";
    expect((await load()).configFile).toEqual({ dev: { region: "us-west-2" } });
  });
});
