---
title: Create Temporary Access Credentials
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Temporary Credentials](https://developers.cloudflare.com/api/resources/r2/subresources/temporary_credentials)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Temporary Access Credentials

POST/accounts/{account\_id}/r2/temp-access-credentials

Creates temporary access credentials on a bucket that can be optionally scoped to prefixes or objects.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

bucket: string

Name of the R2 bucket.

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20bucket%20%3E%20(schema)>)

parentAccessKeyId: string

The parent access key id to use for signing.

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20parentAccessKeyId%20%3E%20(schema)>)

<details>

<summary>

permission: "admin-read-write"or "admin-read-only"or "object-read-write"or "object-read-only"

Permissions allowed on the credentials.

</summary>

One of the following:

"admin-read-write"

<a href="#">Link to this property</a>

"admin-read-only"

<a href="#">Link to this property</a>

"object-read-write"

<a href="#">Link to this property</a>

"object-read-only"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20permission%20%3E%20(schema)>)

ttlSeconds: number

How long the credentials will live for in seconds.

maximum604800

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ttlSeconds%20%3E%20(schema)>)

objects: optional array of string

Optional object paths to scope the credentials to.

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20objects%20%3E%20(schema)>)

prefixes: optional array of string

Optional prefix paths to scope the credentials to.

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20prefixes%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {accessKeyId, secretAccessKey, sessionToken }

</summary>

accessKeyId: optional string

ID for new access key.

<a href="#">Link to this property</a>

secretAccessKey: optional string

Secret access key.

<a href="#">Link to this property</a>

sessionToken: optional string

Security token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Temporary Access Credentials

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/temp-access-credentials \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "example-bucket",
          "parentAccessKeyId": "example-access-key-id",
          "permission": "object-read-write",
          "ttlSeconds": 3600
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "accessKeyId": "example-access-key-id",
    "secretAccessKey": "example-secret-key",
    "sessionToken": "example-session-token"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "accessKeyId": "example-access-key-id",
    "secretAccessKey": "example-secret-key",
    "sessionToken": "example-session-token"
  },
  "success": true
}
```