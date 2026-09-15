---
title: Create impersonation registry entry
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Impersonation Registry](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/impersonation_registry)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create impersonation registry entry

POST/accounts/{account\_id}/email-security/settings/impersonation\_registry

Creates a new entry in the impersonation registry to protect against impersonation. Emails attempting to impersonate this identity will be flagged. Supports regex patterns for flexible email matching.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Cloud Email Security: Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

email: string

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20email%20%3E%20(schema)>)

is\_email\_regex: boolean

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20is_email_regex%20%3E%20(schema)>)

name: string

maxLength1024

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

comments: optional string

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20comments%20%3E%20(schema)>)

directory\_id: optional number

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20directory_id%20%3E%20(schema)>)

directory\_node\_id: optional number

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20directory_node_id%20%3E%20(schema)>)

Deprecatedexternal\_directory\_node\_id: optional string

This field is deprecated.

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20external_directory_node_id%20%3E%20(schema)>)

<details>

<summary>

provenance: optional "A1S\_INTERNAL"or "SNOOPY-CASB\_OFFICE\_365"or "SNOOPY-OFFICE\_365"or "SNOOPY-GOOGLE\_DIRECTORY"

</summary>

One of the following:

"A1S\_INTERNAL"

<a href="#">Link to this property</a>

"SNOOPY-CASB\_OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-GOOGLE\_DIRECTORY"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20provenance%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, comments, created\_at, 9 more }

An impersonation registry entry.

</summary>

id: optional string

Impersonation registry entry identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

directory\_id: optional number

<a href="#">Link to this property</a>

directory\_node\_id: optional number

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

Deprecatedexternal\_directory\_node\_id: optional string

This field is deprecated.

<a href="#">Link to this property</a>

is\_email\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

provenance: optional "A1S\_INTERNAL"or "SNOOPY-CASB\_OFFICE\_365"or "SNOOPY-OFFICE\_365"or "SNOOPY-GOOGLE\_DIRECTORY"

</summary>

One of the following:

"A1S\_INTERNAL"

<a href="#">Link to this property</a>

"SNOOPY-CASB\_OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-GOOGLE\_DIRECTORY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create impersonation registry entry

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "john.doe@example.com",
          "is_email_regex": false,
          "name": "John Doe"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```