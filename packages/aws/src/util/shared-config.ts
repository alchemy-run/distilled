import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, sep } from "node:path";
/**
 * The shared `~/.aws/config` and `~/.aws/credentials` files, read the way the
 * AWS CLI reads them: `AWS_CONFIG_FILE` and `AWS_SHARED_CREDENTIALS_FILE`
 * override the paths, config sections keep only `[default]` and the prefixed
 * ones (`[profile dev]`, `[sso-session x]`, `[services y]`), and a missing or
 * unreadable file is an empty file rather than an error.
 */
import type { ParsedIniData, SharedConfigFiles } from "@smithy/types";
import { IniSectionType } from "@smithy/types";
import { parseIni } from "./parse-ini.ts";

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

const readIni = async (path: string): Promise<ParsedIniData> => {
  try {
    return parseIni(await readFile(resolveHome(path), "utf8"));
  } catch {
    return {};
  }
};

/**
 * Config-file sections keyed the way callers ask for them: `[profile dev]`
 * becomes `dev`, `[sso-session x]` stays `sso-session.x`, and any other bare
 * section is dropped — in `~/.aws/config` only `[default]` may omit a prefix.
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

export const loadSharedConfigFiles = async (): Promise<SharedConfigFiles> => {
  const [configFile, credentialsFile] = await Promise.all([
    readIni(getConfigFilepath()).then(configSections),
    readIni(getCredentialsFilepath()),
  ]);
  return { configFile, credentialsFile };
};

/** Both files as one profile map, with the credentials file winning. */
export const parseKnownFiles = async (): Promise<ParsedIniData> => {
  const { configFile, credentialsFile } = await loadSharedConfigFiles();
  const merged: ParsedIniData = { ...configFile };
  for (const [profile, values] of Object.entries(credentialsFile)) {
    merged[profile] = { ...merged[profile], ...values };
  }
  return merged;
};
