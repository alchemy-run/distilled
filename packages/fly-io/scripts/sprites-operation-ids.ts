/**
 * Sprites operation names. The published spec's operationIds are
 * generated (`sprites_index_get`, `sprite_env_list__checkpoints`, …); these
 * keep the SDK's existing names for the routes it had before the published
 * spec, and give the rest verbNoun names in the same style.
 *
 * Keys are `"METHOD path"` after convert strips the `/v1` prefix.
 */
export const SPRITES_OPERATION_NAMES: Readonly<Record<string, string>> = {
  "GET /sprites": "listSprites",
  "POST /sprites": "createSprite",
  "GET /sprites/{name}": "getSprite",
  "PUT /sprites/{name}": "updateSprite",
  "DELETE /sprites/{name}": "deleteSprite",
  "GET /sprites/{name}/exec": "listExecSessions",
  "POST /sprites/{name}/exec": "execCommand",
  "POST /sprites/{name}/exec/{session_id}/kill": "killExecSession",
  "POST /sprites/{name}/checkpoint": "createCheckpoint",
  "GET /sprites/{name}/checkpoints": "listCheckpoints",
  "GET /sprites/{name}/checkpoints/{checkpoint_id}": "getCheckpoint",
  "POST /sprites/{name}/checkpoints/{checkpoint_id}/restore": "restoreCheckpoint",
  "POST /sprites/{name}/fs/chmod": "changeFileMode",
  "POST /sprites/{name}/fs/chown": "changeFileOwner",
  "POST /sprites/{name}/fs/copy": "copyFile",
  "DELETE /sprites/{name}/fs/delete": "deleteFile",
  "GET /sprites/{name}/fs/list": "listDirectory",
  "GET /sprites/{name}/fs/read": "readFile",
  "POST /sprites/{name}/fs/rename": "renameFile",
  "PUT /sprites/{name}/fs/write": "writeFile",
  "GET /sprites/{name}/policy/network": "getNetworkPolicy",
  "POST /sprites/{name}/policy/network": "setNetworkPolicy",
  "GET /sprites/{name}/policy/privileges": "getPrivilegesPolicy",
  "POST /sprites/{name}/policy/privileges": "setPrivilegesPolicy",
  "DELETE /sprites/{name}/policy/privileges": "deletePrivilegesPolicy",
  "GET /sprites/{name}/policy/resources": "getResourcesPolicy",
  "POST /sprites/{name}/policy/resources": "setResourcesPolicy",
  "DELETE /sprites/{name}/policy/resources": "deleteResourcesPolicy",
  "GET /sprites/{name}/services": "listServices",
  "GET /sprites/{name}/services/{service_name}": "getService",
  "PUT /sprites/{name}/services/{service_name}": "putService",
  "GET /sprites/{name}/services/{service_name}/logs": "getServiceLogs",
  "POST /sprites/{name}/services/{service_name}/restart": "restartService",
  "POST /sprites/{name}/services/{service_name}/start": "startService",
  "POST /sprites/{name}/services/{service_name}/stop": "stopService",
  "GET /oauth/connections": "listOAuthConnections",
  "POST /oauth/connections/api_key": "createOAuthApiKeyConnection",
  "POST /oauth/connections/provision": "provisionOAuthConnection",
  "GET /oauth/connections/{id}": "getOAuthConnection",
  "PUT /oauth/connections/{id}": "updateOAuthConnection",
  "PATCH /oauth/connections/{id}": "patchOAuthConnection",
  "DELETE /oauth/connections/{id}": "deleteOAuthConnection",
  "GET /oauth/{provider}/authorize": "authorizeOAuthConnection",
  "POST /oauth/{provider}/callback": "oauthConnectionCallback",
};

/**
 * The published spec's paths carry `/v1` and its server is the bare host;
 * the SDK's Sprites base URL is `https://api.sprites.dev/v1`, so routes are
 * written without the prefix.
 */
export const stripSpritesV1 = (spec: any): void => {
  const paths: Record<string, unknown> = {};
  for (const [p, item] of Object.entries<unknown>(spec.paths ?? {})) {
    if (!p.startsWith("/v1/")) throw new Error(`sprites: path ${p} has no /v1 prefix`);
    paths[p.slice(3)] = item;
  }
  spec.paths = paths;
  spec.servers = [{ url: "https://api.sprites.dev/v1" }];
};
