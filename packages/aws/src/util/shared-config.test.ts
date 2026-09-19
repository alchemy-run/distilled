import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  getConfigFilepath,
  getCredentialsFilepath,
  getHomeDir,
  loadSharedConfigFiles,
  parseKnownFiles,
} from "./shared-config.ts";

const ENV_KEYS = [
  "HOME",
  "USERPROFILE",
  "HOMEPATH",
  "HOMEDRIVE",
  "AWS_CONFIG_FILE",
  "AWS_SHARED_CREDENTIALS_FILE",
] as const;

let home: string;
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
    expect(await loadSharedConfigFiles()).toEqual({
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
    const { configFile } = await loadSharedConfigFiles();
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
    const { credentialsFile } = await loadSharedConfigFiles();
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
    expect(await parseKnownFiles()).toEqual({
      dev: {
        region: "us-west-2",
        aws_access_key_id: "FROM_CREDENTIALS",
        aws_secret_access_key: "SECRET",
      },
    });
  });

  test("a rewritten file is read again rather than served from a cache", async () => {
    write("credentials", "[default]\naws_access_key_id = FIRST\n");
    expect((await parseKnownFiles()).default?.aws_access_key_id).toBe("FIRST");
    write("credentials", "[default]\naws_access_key_id = SECOND\n");
    expect((await parseKnownFiles()).default?.aws_access_key_id).toBe("SECOND");
  });
});
