---
title: Get Cache Reserve Clear
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Cache Reserve](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Cache Reserve Clear

GET/zones/{zone\_id}/cache/cache\_reserve\_clear

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

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

`Zone Settings Write``Zone Settings Read``Zone Read``Zone Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cache.cache_reserve%20%3E%20(method)%20status%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.cache_reserve%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.cache_reserve%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.cache_reserve%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

state: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)">State</a>

The current state of the Cache Reserve Clear operation.

</summary>

One of the following:

"In-progress"

<a href="#">Link to this property</a>

"Completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end\_ts: optional string

The time that the latest Cache Reserve Clear operation completed.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Cache Reserve Clear

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve_clear \
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
    "end_ts": "2023-10-02T12:00:00.12345Z",
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "Completed"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "In-progress"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1142,
      "message": "Unable to retrieve cache_reserve_clear setting value. The zone setting does not exist because you never performed a Cache Reserve Clear operation."
    }
  ],
  "messages": [],
  "result": null,
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
    "end_ts": "2023-10-02T12:00:00.12345Z",
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "Completed"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "In-progress"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1142,
      "message": "Unable to retrieve cache_reserve_clear setting value. The zone setting does not exist because you never performed a Cache Reserve Clear operation."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```