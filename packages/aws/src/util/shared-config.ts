/**
 * The shared `~/.aws/config` and `~/.aws/credentials` files, read the way the
 * AWS CLI reads them: `AWS_CONFIG_FILE` and `AWS_SHARED_CREDENTIALS_FILE`
 * override the paths, a leading `~/` is the home directory, config sections
 * keep only `[default]` and the prefixed ones (`[profile dev]`,
 * `[sso-session x]`, `[services y]`), and a missing file is an empty file.
 * A file that exists but cannot be read or parsed fails with
 * `SharedConfigError`.
 */
import { homedir } from "node:os";
import { join, sep } from "node:path";
import * as Effect from "effect/Effect";
import { readFileString } from "../credential-providers/node-file-system.ts";
import { SharedConfigError } from "../credentials-service.ts";
import {
  IniSectionType,
  parseIni,
  type ParsedIniData,
  type SharedConfigFiles,
} from "./parse-ini.ts";

const separator = ".";
const homePrefix = "~/";

/** The home directory: the environment first, then the OS. */
export const getHomeDir = (): string => {
  const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${sep}` } = process.env;
  if (HOME) return HOME;
  if (USERPROFILE) return USERPROFILE;
  if (HOMEPATH) return `${HOMEDRIVE}${HOMEPATH}`;
  return homedir();
};

export const getConfigFilepath = (): string =>
  process.env.AWS_CONFIG_FILE || join(getHomeDir(), ".aws", "config");

export const getCredentialsFilepath = (): string =>
  process.env.AWS_SHARED_CREDENTIALS_FILE || join(getHomeDir(), ".aws", "credentials");

const resolveHome = (path: string): string =>
  path.startsWith(homePrefix) ? join(getHomeDir(), path.slice(2)) : path;

const readIni = (path: string): Effect.Effect<ParsedIniData, SharedConfigError> => {
  const resolved = resolveHome(path);
  return readFileString(resolved).pipe(
    Effect.catchReason("PlatformError", "NotFound", () => Effect.succeed("")),
    Effect.mapError(
      (cause) =>
        new SharedConfigError({
          message: `Could not read ${resolved}: ${cause.message}`,
          path: resolved,
          cause,
        }),
    ),
    Effect.flatMap((text) => parseIni(text, resolved)),
  );
};

/**
 * Config-file sections keyed the way callers ask for them: `[profile dev]`
 * becomes `dev`, `[sso-session x]` stays `sso-session.x`, and any other bare
 * section is dropped -- in `~/.aws/config` only `[default]` may omit a prefix.
 */
const configSections = (data: ParsedIniData): ParsedIniData => {
  const out: ParsedIniData = data.default ? { default: data.default } : {};
  for (const [key, value] of Object.entries(data)) {
    const index = key.indexOf(separator);
    if (index === -1) continue;
    const prefix = key.substring(0, index);
    if (!Object.values(IniSectionType).includes(prefix as IniSectionType)) {
      continue;
    }
    out[prefix === IniSectionType.PROFILE ? key.substring(index + 1) : key] = value;
  }
  return out;
};

/** Both files, read on every run so an edited file is picked up. */
export const loadSharedConfigFiles: Effect.Effect<SharedConfigFiles, SharedConfigError> =
  /*@__PURE__*/ Effect.suspend(() =>
    Effect.all(
      {
        configFile: Effect.map(readIni(getConfigFilepath()), configSections),
        credentialsFile: readIni(getCredentialsFilepath()),
      },
      { concurrency: 2 },
    ),
  );

/** Both files as one profile map, with the credentials file winning. */
export const mergeKnownFiles = ({
  configFile,
  credentialsFile,
}: SharedConfigFiles): ParsedIniData => {
  const merged: ParsedIniData = { ...configFile };
  for (const [profile, values] of Object.entries(credentialsFile)) {
    merged[profile] = { ...merged[profile], ...values };
  }
  return merged;
};

export const parseKnownFiles: Effect.Effect<ParsedIniData, SharedConfigError> =
  /*@__PURE__*/ Effect.map(loadSharedConfigFiles, mergeKnownFiles);
