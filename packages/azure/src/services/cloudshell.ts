/**
 * Azure Cloudshell API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DeleteConsoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.Portal/consoles/{consoleName}",
  }),
);
export type DeleteConsoleInput = typeof DeleteConsoleInput.Type;

// Output Schema
export const DeleteConsoleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteConsoleOutput = typeof DeleteConsoleOutput.Type;

// The operation
/**
 * Delete console
 *
 * Deletes the console
 */
export const DeleteConsole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteConsoleInput,
  outputSchema: DeleteConsoleOutput,
}));
// Input Schema
export const DeleteConsoleWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Portal/locations/{location}/consoles/{consoleName}",
    }),
  );
export type DeleteConsoleWithLocationInput =
  typeof DeleteConsoleWithLocationInput.Type;

// Output Schema
export const DeleteConsoleWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteConsoleWithLocationOutput =
  typeof DeleteConsoleWithLocationOutput.Type;

// The operation
/**
 * Delete console
 *
 * Deletes the console
 */
export const deleteConsoleWithLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteConsoleWithLocationInput,
    outputSchema: DeleteConsoleWithLocationOutput,
  }),
);
// Input Schema
export const DeleteUserSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Portal/userSettings/{userSettingsName}",
    }),
  );
export type DeleteUserSettingsInput = typeof DeleteUserSettingsInput.Type;

// Output Schema
export const DeleteUserSettingsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteUserSettingsOutput = typeof DeleteUserSettingsOutput.Type;

// The operation
/**
 * delete user settings.
 *
 * Delete cloud shell settings for current signed in user
 */
export const DeleteUserSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteUserSettingsInput,
  outputSchema: DeleteUserSettingsOutput,
}));
// Input Schema
export const DeleteUserSettingsWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Portal/locations/{location}/userSettings/{userSettingsName}",
    }),
  );
export type DeleteUserSettingsWithLocationInput =
  typeof DeleteUserSettingsWithLocationInput.Type;

// Output Schema
export const DeleteUserSettingsWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteUserSettingsWithLocationOutput =
  typeof DeleteUserSettingsWithLocationOutput.Type;

// The operation
/**
 * delete user settings.
 *
 * Delete cloud shell settings for current signed in user
 */
export const deleteUserSettingsWithLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteUserSettingsWithLocationInput,
    outputSchema: DeleteUserSettingsWithLocationOutput,
  }));
// Input Schema
export const GetConsoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Portal/consoles/{consoleName}",
  }),
);
export type GetConsoleInput = typeof GetConsoleInput.Type;

// Output Schema
export const GetConsoleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GetConsoleOutput = typeof GetConsoleOutput.Type;

// The operation
/**
 * Get console
 *
 * Gets the console for the user.
 */
export const GetConsole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetConsoleInput,
  outputSchema: GetConsoleOutput,
}));
// Input Schema
export const GetConsoleWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Portal/locations/{location}/consoles/{consoleName}",
    }),
  );
export type GetConsoleWithLocationInput =
  typeof GetConsoleWithLocationInput.Type;

// Output Schema
export const GetConsoleWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GetConsoleWithLocationOutput =
  typeof GetConsoleWithLocationOutput.Type;

// The operation
/**
 * Get console
 *
 * Gets the console for the user.
 */
export const getConsoleWithLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetConsoleWithLocationInput,
    outputSchema: GetConsoleWithLocationOutput,
  }),
);
// Input Schema
export const GetUserSettingsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Portal/userSettings/{userSettingsName}",
  }),
);
export type GetUserSettingsInput = typeof GetUserSettingsInput.Type;

// Output Schema
export const GetUserSettingsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type GetUserSettingsOutput = typeof GetUserSettingsOutput.Type;

// The operation
/**
 * Get user settings.
 *
 * Get current user settings for current signed in user. This operation returns settings for the user's cloud shell preferences including preferred location, storage profile, shell type, font and size settings.
 */
export const GetUserSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetUserSettingsInput,
  outputSchema: GetUserSettingsOutput,
}));
// Input Schema
export const GetUserSettingsWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Portal/locations/{location}/userSettings/{userSettingsName}",
    }),
  );
export type GetUserSettingsWithLocationInput =
  typeof GetUserSettingsWithLocationInput.Type;

// Output Schema
export const GetUserSettingsWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GetUserSettingsWithLocationOutput =
  typeof GetUserSettingsWithLocationOutput.Type;

// The operation
/**
 * Get user settings.
 *
 * Get current user settings for current signed in user. This operation returns settings for the user's cloud shell preferences including preferred location, storage profile, shell type, font and size settings.
 */
export const getUserSettingsWithLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetUserSettingsWithLocationInput,
    outputSchema: GetUserSettingsWithLocationOutput,
  }),
);
// Input Schema
export const KeepAliveInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Portal/consoles/{consoleName}/keepAlive",
  }),
);
export type KeepAliveInput = typeof KeepAliveInput.Type;

// Output Schema
export const KeepAliveOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KeepAliveOutput = typeof KeepAliveOutput.Type;

// The operation
/**
 * Keep alive
 *
 * Keep console alive
 */
export const KeepAlive = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeepAliveInput,
  outputSchema: KeepAliveOutput,
}));
// Input Schema
export const KeepAliveWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Portal/locations/{location}/consoles/{consoleName}/keepAlive",
    }),
  );
export type KeepAliveWithLocationInput = typeof KeepAliveWithLocationInput.Type;

// Output Schema
export const KeepAliveWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KeepAliveWithLocationOutput =
  typeof KeepAliveWithLocationOutput.Type;

// The operation
/**
 * Keep alive
 *
 * Keep console alive
 */
export const keepAliveWithLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KeepAliveWithLocationInput,
    outputSchema: KeepAliveWithLocationOutput,
  }),
);
// Input Schema
export const PatchUserSettingsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/providers/Microsoft.Portal/userSettings/{userSettingsName}",
  }),
);
export type PatchUserSettingsInput = typeof PatchUserSettingsInput.Type;

// Output Schema
export const PatchUserSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PatchUserSettingsOutput = typeof PatchUserSettingsOutput.Type;

// The operation
/**
 * patch user settings.
 *
 * Patch cloud shell settings for current signed in user
 */
export const PatchUserSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PatchUserSettingsInput,
  outputSchema: PatchUserSettingsOutput,
}));
// Input Schema
export const PatchUserSettingsWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Portal/locations/{location}/userSettings/{userSettingsName}",
    }),
  );
export type PatchUserSettingsWithLocationInput =
  typeof PatchUserSettingsWithLocationInput.Type;

// Output Schema
export const PatchUserSettingsWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PatchUserSettingsWithLocationOutput =
  typeof PatchUserSettingsWithLocationOutput.Type;

// The operation
/**
 * patch user settings.
 *
 * Patch cloud shell settings for current signed in user
 */
export const patchUserSettingsWithLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchUserSettingsWithLocationInput,
    outputSchema: PatchUserSettingsWithLocationOutput,
  }));
// Input Schema
export const PutConsoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/providers/Microsoft.Portal/consoles/{consoleName}",
  }),
);
export type PutConsoleInput = typeof PutConsoleInput.Type;

// Output Schema
export const PutConsoleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PutConsoleOutput = typeof PutConsoleOutput.Type;

// The operation
/**
 * Put console
 *
 * Puts a request for a console
 */
export const PutConsole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PutConsoleInput,
  outputSchema: PutConsoleOutput,
}));
// Input Schema
export const PutConsoleWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Portal/locations/{location}/consoles/{consoleName}",
    }),
  );
export type PutConsoleWithLocationInput =
  typeof PutConsoleWithLocationInput.Type;

// Output Schema
export const PutConsoleWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PutConsoleWithLocationOutput =
  typeof PutConsoleWithLocationOutput.Type;

// The operation
/**
 * Put console
 *
 * Puts a request for a console
 */
export const putConsoleWithLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PutConsoleWithLocationInput,
    outputSchema: PutConsoleWithLocationOutput,
  }),
);
// Input Schema
export const PutUserSettingsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/providers/Microsoft.Portal/userSettings/{userSettingsName}",
  }),
);
export type PutUserSettingsInput = typeof PutUserSettingsInput.Type;

// Output Schema
export const PutUserSettingsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type PutUserSettingsOutput = typeof PutUserSettingsOutput.Type;

// The operation
/**
 * put user settings.
 *
 * Create or update cloud shell settings for current signed in user
 */
export const PutUserSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PutUserSettingsInput,
  outputSchema: PutUserSettingsOutput,
}));
// Input Schema
export const PutUserSettingsWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Portal/locations/{location}/userSettings/{userSettingsName}",
    }),
  );
export type PutUserSettingsWithLocationInput =
  typeof PutUserSettingsWithLocationInput.Type;

// Output Schema
export const PutUserSettingsWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PutUserSettingsWithLocationOutput =
  typeof PutUserSettingsWithLocationOutput.Type;

// The operation
/**
 * put user settings.
 *
 * Create or update cloud shell settings for current signed in user
 */
export const putUserSettingsWithLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PutUserSettingsWithLocationInput,
    outputSchema: PutUserSettingsWithLocationOutput,
  }),
);
