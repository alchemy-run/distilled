---
title: Get NEL setting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

[NEL](https://developers.cloudflare.com/api/resources/zones/subresources/nel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get NEL setting

GET/zones/{zone\_id}/settings/nel

Fetches the Network Error Logging (NEL) setting for a zone. NEL allows browsers to report network errors to a configured endpoint. The setting is enabled by default for free and pro zones, and disabled by default for business and enterprise zones unless the NEL product feature is enabled.

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

`Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier of the zone.

maxLength32

[Link to this property](#)%20zones.nel%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

Error or message code.

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.nel%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

Error or message code.

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.nel%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.nel%20%3E%20(model)%20setting%20%3E%20(schema)">Setting</a> { id, editable, modified\_on, value }

A zone-scoped NEL configuration setting.

</summary>

id: "nel"

Zone setting identifier.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable. This is false when the zone’s plan does not include NEL or the NEL product feature is not enabled.

<a href="#">Link to this property</a>

modified\_on: string

When the setting was last modified. A zero value (0001-01-01T00:00:00Z) indicates the setting has never been explicitly set and is using the default value.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: object {enabled }

The NEL configuration value.

</summary>

enabled: boolean

Whether Network Error Logging is enabled for the zone. When enabled, browsers report network errors to Cloudflare’s NEL endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.nel%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zones.nel%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get NEL setting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/nel \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

401 example

403 example

500 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": false,
    "id": "nel",
    "modified_on": "0001-01-01T00:00:00Z",
    "value": {
      "enabled": false
    }
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
    "id": "nel",
    "modified_on": "2024-01-15T10:30:00Z",
    "value": {
      "enabled": true
    }
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1009,
      "message": "auth.not_authorized"
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
      "code": 1010,
      "message": "auth.forbidden"
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
      "code": 1000,
      "message": "internal_error"
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

401 example

403 example

500 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": false,
    "id": "nel",
    "modified_on": "0001-01-01T00:00:00Z",
    "value": {
      "enabled": false
    }
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
    "id": "nel",
    "modified_on": "2024-01-15T10:30:00Z",
    "value": {
      "enabled": true
    }
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1009,
      "message": "auth.not_authorized"
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
      "code": 1010,
      "message": "auth.forbidden"
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
      "code": 1000,
      "message": "internal_error"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```