---
title: Update an App Config
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

[App Configuration](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update an App Config

PUT/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

Updates an App Config for a site

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

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

site\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20site_id%20%3E%20(schema)>)

app\_config\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20app_config_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

account\_app\_id: optional string

Magic account app ID.

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20account_app_id%20%3E%20(schema)>)

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20breakout%20%3E%20(schema)>)

managed\_app\_id: optional string

Managed app ID.

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20managed_app_id%20%3E%20(schema)>)

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20preferred_wans%20%3E%20(schema)>)

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20priority%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update an App Config

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true,
          "managed_app_id": "cloudflare"
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
  "result": {
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```