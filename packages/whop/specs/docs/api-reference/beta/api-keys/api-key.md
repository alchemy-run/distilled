> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Key

An API Key is a programmatic credential owned by an account or app. Each key carries its own permissions policy — explicit permission statements or an inherited system role — and can be restricted with an expiration date and an IP allowlist.

Use the API Keys API to list an account or app's keys, create a key (the full secret is returned once, on creation), inspect a key's effective grants, update its name or restrictions, rotate its secret, and revoke it. These endpoints require a user session — they cannot be called with an API key.

## Version pinning

Each API key stores an `api_version_date`. Requests authenticated with the key use that version when they omit the `Api-Version-Date` header. An explicit header takes precedence. New keys default to the latest released version, while legacy keys without a stored pin use `2025-01-01`.

## Endpoints

| Endpoint                                                                                | Request                                                                    |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [List API Keys](/api-reference/beta/api-keys/list-api-keys)                             | <Badge color="blue" size="sm" stroke>GET</Badge> `/api_keys`               |
| [Create API Key](/api-reference/beta/api-keys/create-api-key)                           | <Badge color="green" size="sm" stroke>POST</Badge> `/api_keys`             |
| [Retrieve API Key](/api-reference/beta/api-keys/retrieve-api-key)                       | <Badge color="blue" size="sm" stroke>GET</Badge> `/api_keys/{id}`          |
| [Update API Key](/api-reference/beta/api-keys/update-api-key)                           | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/api_keys/{id}`      |
| [Delete API Key](/api-reference/beta/api-keys/delete-api-key)                           | <Badge color="red" size="sm" stroke>DELETE</Badge> `/api_keys/{id}`        |
| [Rotate API Key](/api-reference/beta/api-keys/rotate-api-key)                           | <Badge color="green" size="sm" stroke>POST</Badge> `/api_keys/{id}/rotate` |
| [List the Permission Catalog](/api-reference/beta/api-keys/list-the-permission-catalog) | <Badge color="blue" size="sm" stroke>GET</Badge> `/api_keys/permissions`   |
