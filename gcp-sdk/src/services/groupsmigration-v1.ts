// ==========================================================================
// Groups Migration API (groupsmigration v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "groupsmigration",
  version: "v1",
  rootUrl: "https://groupsmigration.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Groups {
  /** The status of the insert request. */
  responseCode?: string;
  /** The kind of insert resource this is. */
  kind?: string;
}

export const Groups: Schema.Schema<Groups> = Schema.suspend(() => Schema.Struct({
  responseCode: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Groups" }) as any as Schema.Schema<Groups>;

// ==========================================================================
// Operations
// ==========================================================================

export interface InsertArchiveRequest {
  /** The group ID */
  groupId: string;
}

export const InsertArchiveRequest = Schema.Struct({
  groupId: Schema.String.pipe(T.HttpPath("groupId")),
}).pipe(
  T.Http({ method: "POST", path: "groups/v1/groups/{groupId}/archive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertArchiveRequest>;

export type InsertArchiveResponse = Groups;
export const InsertArchiveResponse = Groups;

export type InsertArchiveError = DefaultErrors;

/** Inserts a new mail into the archive of the Google group. */
export const insertArchive: API.OperationMethod<InsertArchiveRequest, InsertArchiveResponse, InsertArchiveError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertArchiveRequest,
  output: InsertArchiveResponse,
  errors: [],
}));

