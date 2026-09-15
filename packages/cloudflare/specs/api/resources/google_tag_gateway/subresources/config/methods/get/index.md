---
title: Get Google Tag Gateway configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Google Tag Gateway](https://developers.cloudflare.com/api/resources/google_tag_gateway)

[Config](https://developers.cloudflare.com/api/resources/google_tag_gateway/subresources/config)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Google Tag Gateway configuration

GET/zones/{zone\_id}/settings/google-tag-gateway/config

Gets the Google Tag Gateway configuration for a zone.

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

`Zaraz Edit``Zaraz Read``Zaraz Admin`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20google_tag_gateway.config%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20google_tag_gateway.config%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20google_tag_gateway.config%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20google_tag_gateway.config%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/google_tag_gateway#(resource)%20google_tag_gateway.config%20%3E%20(model)%20config%20%3E%20(schema)">Config</a> { enabled, endpoint, hideOriginalIp, 2 more }

Google Tag Gateway configuration for a zone.

</summary>

enabled: boolean

Enables or disables Google Tag Gateway for this zone.

<a href="#">Link to this property</a>

endpoint: string

Specifies the endpoint path for proxying Google Tag Manager requests. Use an absolute path starting with ’/’, with no nested paths and alphanumeric characters only (e.g. /metrics).

<a href="#">Link to this property</a>

hideOriginalIp: boolean

Hides the original client IP address from Google when enabled.

<a href="#">Link to this property</a>

measurementId: string

Specify the Google Tag Manager container or measurement ID (e.g. GTM-XXXXXXX or G-XXXXXXXXXX).

<a href="#">Link to this property</a>

setUpTag: optional boolean

Set up the associated Google Tag on the zone automatically when enabled.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20google_tag_gateway.config%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Google Tag Gateway configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/google-tag-gateway/config \
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
    "enabled": true,
    "endpoint": "/metrics",
    "hideOriginalIp": true,
    "measurementId": "GTM-P2F3N47Q",
    "setUpTag": true
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
    "enabled": true,
    "endpoint": "/metrics",
    "hideOriginalIp": true,
    "measurementId": "GTM-P2F3N47Q",
    "setUpTag": true
  }
}
```