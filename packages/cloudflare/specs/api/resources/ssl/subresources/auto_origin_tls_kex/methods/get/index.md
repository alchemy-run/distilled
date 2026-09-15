---
title: Get Auto-Origin TLS KEX enrollment status for the given zone
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

[Auto Origin TLS Kex](https://developers.cloudflare.com/api/resources/ssl/subresources/auto_origin_tls_kex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Auto-Origin TLS KEX enrollment status for the given zone

GET/zones/{zone\_id}/settings/auto\_origin\_tls\_kex

When enabled, Cloudflare automatically selects the preferred TLS key-exchange algorithm to use when establishing the TLS connection to the zone’s origin, picking from the algorithms permitted by the zone’s `origin_tls_compliance_modes` setting. When disabled, the default key-exchange ordering is used.

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

##### P ath ParametersExpand Collapse

zone\_id: string

maxLength32

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, enabled, modified\_on }

</summary>

id: string

<a href="#">Link to this property</a>

enabled: boolean

Whether Auto-Origin TLS KEX selection is enabled for the zone.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates the API call’s success or failure.

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Auto-Origin TLS KEX enrollment status for the given zone

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/auto_origin_tls_kex \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": true,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1009,
      "message": "Missing field 'enabled' in JSON body"
    }
  ],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": false
}
```

##### Returns Examples

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": true,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1009,
      "message": "Missing field 'enabled' in JSON body"
    }
  ],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": false
}
```