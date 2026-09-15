---
title: List service tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Service Tokens](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List service tokens

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/service\_tokens

Lists all service tokens.

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

`Access: Service Tokens Write``Access: Service Tokens Read`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

name: optional string

The name of the service token.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

Page number of results.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum1000

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search for service tokens by other listed query parameters.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.service_tokens%20%3E%20(model)%20service_token%20%3E%20(schema)">ServiceToken</a> { id, client\_id, duration, 3 more }

</summary>

id: optional string

The ID of the service token.

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

expires\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List service tokens

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/service_tokens \
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "duration": "60m",
      "enabled": true,
      "expires_at": "2014-01-01T05:20:00.12345Z",
      "last_seen_at": "2014-01-01T05:20:00.12345Z",
      "name": "CI/CD token",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "duration": "60m",
      "enabled": true,
      "expires_at": "2014-01-01T05:20:00.12345Z",
      "last_seen_at": "2014-01-01T05:20:00.12345Z",
      "name": "CI/CD token",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```