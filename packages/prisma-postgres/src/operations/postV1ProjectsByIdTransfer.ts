import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ProjectsByIdTransferInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    recipientAccessToken: Schema.String,
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{id}/transfer" }));
export type PostV1ProjectsByIdTransferInput =
  typeof PostV1ProjectsByIdTransferInput.Type;

// Output Schema
export const PostV1ProjectsByIdTransferOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PostV1ProjectsByIdTransferOutput =
  typeof PostV1ProjectsByIdTransferOutput.Type;

// The operation
/**
 * Transfer project
 *
 * Transfer the project with the given ID to the new owner's workspace
 */
export const postV1ProjectsByIdTransfer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV1ProjectsByIdTransferInput,
    outputSchema: PostV1ProjectsByIdTransferOutput,
  }),
);
