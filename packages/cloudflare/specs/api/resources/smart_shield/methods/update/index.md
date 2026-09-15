---
title: Patch Smart Shield Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Smart Shield](https://developers.cloudflare.com/api/resources/smart_shield)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch Smart Shield Settings

PATCH/zones/{zone\_id}/smart\_shield

Set Smart Shield Settings.

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

`Zone Settings Write``Zone Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

cache\_reserve: optional object {value }

</summary>

<details>

<summary>

value: optional "on"or "off"

Specifies the enablement value of Cache Reserve.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20cache_reserve%20%3E%20(schema)>)

<details>

<summary>

regional\_tiered\_cache: optional object {value }

</summary>

<details>

<summary>

value: optional "on"or "off"

Specifies the enablement value of Regional Tiered Cache.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20regional_tiered_cache%20%3E%20(schema)>)

<details>

<summary>

smart\_routing: optional object {value }

</summary>

<details>

<summary>

value: optional "on"or "off"

Specifies the enablement value of Smart Routing.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20smart_routing%20%3E%20(schema)>)

<details>

<summary>

smart\_tiered\_cache: optional object {value }

</summary>

<details>

<summary>

value: optional "on"or "off"

Specifies the enablement value of Smart Tiered Cache.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20smart_tiered_cache%20%3E%20(schema)>)

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

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {smart\_tiered\_cache }

A consolidated object containing settings from multiple APIs for partial updates.

</summary>

<details>

<summary>

smart\_tiered\_cache: object {id, editable, modified\_on, value }

</summary>

id: optional string

The id of the Smart Tiered Cache setting.

<a href="#">Link to this property</a>

editable: optional boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

modified\_on: optional string

The last time the setting was modified.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

Specifies the enablement value of Tiered Cache.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20smart_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Patch Smart Shield Settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

200 example

500 example

502 example

4XX example

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
  "result": {
    "smart_tiered_cache": {
      "id": "smart_tiered_cache",
      "editable": true,
      "modified_on": "2025-09-10T22:53:22.946098Z",
      "value": "on"
    }
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1137,
      "message": "Unable to process request. Internal error."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1016,
      "message": "Unable to update smart_tiered_cache."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock smart_tiered_cache."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock argo_smart_routing."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock regional_tiered_cache."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock cache_reserve."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock healthchecks_count."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

500 example

502 example

4XX example

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
  "result": {
    "smart_tiered_cache": {
      "id": "smart_tiered_cache",
      "editable": true,
      "modified_on": "2025-09-10T22:53:22.946098Z",
      "value": "on"
    }
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1137,
      "message": "Unable to process request. Internal error."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1016,
      "message": "Unable to update smart_tiered_cache."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock smart_tiered_cache."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock argo_smart_routing."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock regional_tiered_cache."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock cache_reserve."
    },
    {
      "code": 1034,
      "message": "Upgrade Smart Shield to unlock healthchecks_count."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```