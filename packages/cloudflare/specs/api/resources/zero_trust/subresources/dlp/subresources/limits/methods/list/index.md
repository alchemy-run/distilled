---
title: Fetch limits associated with DLP for account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Limits](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/limits)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch limits associated with DLP for account

GET/accounts/{account\_id}/dlp/limits

Retrieves current DLP usage limits and quotas for the account, including maximum allowed counts and current usage for custom entries, dataset cells, and document fingerprints.

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

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.dlp.limits%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dlp.limits%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dlp.limits%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.limits%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {max\_custom\_regex\_entries, max\_dataset\_cells, max\_document\_fingerprints, 3 more }

</summary>

max\_custom\_regex\_entries: number

Maximum number of custom regex entries allowed for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

max\_dataset\_cells: number

Maximum number of dataset cells allowed for the account, across all EDM and CWL datasets.

formatint64

minimum0

<a href="#">Link to this property</a>

max\_document\_fingerprints: number

Maximum number of document fingerprints allowed for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

used\_custom\_regex\_entries: number

Number of custom regex entries currently configured for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

used\_dataset\_cells: number

Number of dataset cells currently configured for the account, across all EDM and CWL datasets. Document fingerprints do not count towards this limit.

formatint64

minimum0

<a href="#">Link to this property</a>

used\_document\_fingerprints: number

Number of document fingerprints currently configured for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.limits%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Fetch limits associated with DLP for account

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/limits \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "max_custom_regex_entries": 0,
    "max_dataset_cells": 0,
    "max_document_fingerprints": 0,
    "used_custom_regex_entries": 0,
    "used_dataset_cells": 0,
    "used_document_fingerprints": 0
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
    "max_custom_regex_entries": 0,
    "max_dataset_cells": 0,
    "max_document_fingerprints": 0,
    "used_custom_regex_entries": 0,
    "used_dataset_cells": 0,
    "used_document_fingerprints": 0
  }
}
```