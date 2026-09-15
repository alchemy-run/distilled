---
title: Get Automatic SSL/TLS enrollment status for the given zone
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

[Automatic Upgrader](https://developers.cloudflare.com/api/resources/ssl/subresources/automatic_upgrader)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Automatic SSL/TLS enrollment status for the given zone

GET/zones/{zone\_id}/settings/ssl\_automatic\_mode

If the system is enabled, the response will include next\_scheduled\_scan, representing the next time this zone will be scanned and the zone’s ssl/tls encryption mode is potentially upgraded by the system. If the system is disabled, next\_scheduled\_scan will not be present in the response body.

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

`Zone Settings Write``Zone Settings Read``SSL and Certificates Write``SSL and Certificates Read`

##### P ath ParametersExpand Collapse

zone\_id: string

maxLength32

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates the API call’s success or failure.

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Automatic SSL/TLS enrollment status for the given zone

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl_automatic_mode \
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
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "next_scheduled_scan": "2014-02-01T05:20:00.12345Z",
    "value": "auto"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "value": "custom"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1008,
      "message": "Invalid SSL/TLS encryption configuration value, only auto or custom accepted"
    }
  ],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "value": "custom"
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
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "next_scheduled_scan": "2014-02-01T05:20:00.12345Z",
    "value": "auto"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "value": "custom"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1008,
      "message": "Invalid SSL/TLS encryption configuration value, only auto or custom accepted"
    }
  ],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "value": "custom"
  },
  "success": false
}
```