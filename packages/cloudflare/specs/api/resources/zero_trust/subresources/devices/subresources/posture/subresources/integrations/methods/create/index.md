---
title: Create a device posture integration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture)

[Integrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture/subresources/integrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a device posture integration

POST/accounts/{account\_id}/devices/posture/integration

Create a new device posture integration.

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

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

config: object {api\_url, auth\_url, client\_id, client\_secret } or object {api\_url, client\_id, client\_secret, customer\_id } or object {api\_url, client\_key, client\_secret, customer\_id } or 5 more

The configuration object containing third-party integration information.

</summary>

One of the following:

<details>

<summary>

TeamsDevicesWorkspaceOneConfigRequest object {api\_url, auth\_url, client\_id, client\_secret }

</summary>

api\_url: string

The Workspace One API URL provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

auth\_url: string

The Workspace One Authorization URL depending on your region.

<a href="#">Link to this property</a>

client\_id: string

The Workspace One client ID provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

client\_secret: string

The Workspace One client secret provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesCrowdstrikeConfigRequest object {api\_url, client\_id, client\_secret, customer\_id }

</summary>

api\_url: string

The Crowdstrike API URL.

<a href="#">Link to this property</a>

client\_id: string

The Crowdstrike client ID.

<a href="#">Link to this property</a>

client\_secret: string

The Crowdstrike client secret.

<a href="#">Link to this property</a>

customer\_id: string

The Crowdstrike customer ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesUptycsConfigRequest object {api\_url, client\_key, client\_secret, customer\_id }

</summary>

api\_url: string

The Uptycs API URL.

<a href="#">Link to this property</a>

client\_key: string

The Uptycs client secret.

<a href="#">Link to this property</a>

client\_secret: string

The Uptycs client secret.

<a href="#">Link to this property</a>

customer\_id: string

The Uptycs customer ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesIntuneConfigRequest object {client\_id, client\_secret, customer\_id }

</summary>

client\_id: string

The Intune client ID.

<a href="#">Link to this property</a>

client\_secret: string

The Intune client secret.

<a href="#">Link to this property</a>

customer\_id: string

The Intune customer ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesKolideConfigRequest object {client\_id, client\_secret }

</summary>

client\_id: string

The Kolide client ID.

<a href="#">Link to this property</a>

client\_secret: string

The Kolide client secret.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesTaniumConfigRequest object {api\_url, client\_secret, access\_client\_id, access\_client\_secret }

</summary>

api\_url: string

The Tanium API URL.

<a href="#">Link to this property</a>

client\_secret: string

The Tanium client secret.

<a href="#">Link to this property</a>

access\_client\_id: optional string

If present, this id will be passed in the <code>CF-Access-Client-ID</code> header when hitting the <code>api_url</code>.

<a href="#">Link to this property</a>

access\_client\_secret: optional string

If present, this secret will be passed in the <code>CF-Access-Client-Secret</code> header when hitting the <code>api_url</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesSentineloneS2sConfigRequest object {api\_url, client\_secret }

</summary>

api\_url: string

The SentinelOne S2S API URL.

<a href="#">Link to this property</a>

client\_secret: string

The SentinelOne S2S client secret.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesCustomS2sConfigRequest object {access\_client\_id, access\_client\_secret, api\_url }

</summary>

access\_client\_id: string

This id will be passed in the <code>CF-Access-Client-ID</code> header when hitting the <code>api_url</code>.

<a href="#">Link to this property</a>

access\_client\_secret: string

This secret will be passed in the <code>CF-Access-Client-Secret</code> header when hitting the <code>api_url</code>.

<a href="#">Link to this property</a>

api\_url: string

The Custom Device Posture Integration API URL.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20config%20%3E%20(schema)>)

interval: string

The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20interval%20%3E%20(schema)>)

name: string

The name of the device posture integration.

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

type: "workspace\_one"or "crowdstrike\_s2s"or "uptycs"or 5 more

The type of device posture integration.

</summary>

One of the following:

"workspace\_one"

<a href="#">Link to this property</a>

"crowdstrike\_s2s"

<a href="#">Link to this property</a>

"uptycs"

<a href="#">Link to this property</a>

"intune"

<a href="#">Link to this property</a>

"kolide"

<a href="#">Link to this property</a>

"tanium\_s2s"

<a href="#">Link to this property</a>

"sentinelone\_s2s"

<a href="#">Link to this property</a>

"custom\_s2s"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture.integrations%20%3E%20(model)%20integration%20%3E%20(schema)">Integration</a> { id, config, interval, 2 more }

</summary>

id: optional string

API UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {api\_url, auth\_url, client\_id }

The configuration object containing third-party integration information.

</summary>

api\_url: string

The Workspace One API URL provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

auth\_url: string

The Workspace One Authorization URL depending on your region.

<a href="#">Link to this property</a>

client\_id: string

The Workspace One client ID provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

The interval between each posture check with the third-party API. Use <code>m</code> for minutes (e.g. <code>5m</code>) and <code>h</code> for hours (e.g. <code>12h</code>).

<a href="#">Link to this property</a>

name: optional string

The name of the device posture integration.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "workspace\_one"or "crowdstrike\_s2s"or "uptycs"or 5 more

The type of device posture integration.

</summary>

One of the following:

"workspace\_one"

<a href="#">Link to this property</a>

"crowdstrike\_s2s"

<a href="#">Link to this property</a>

"uptycs"

<a href="#">Link to this property</a>

"intune"

<a href="#">Link to this property</a>

"kolide"

<a href="#">Link to this property</a>

"tanium\_s2s"

<a href="#">Link to this property</a>

"sentinelone\_s2s"

<a href="#">Link to this property</a>

"custom\_s2s"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a device posture integration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "api_url": "https://as123.awmdm.com/API",
            "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
            "client_id": "example client id",
            "client_secret": "example client secret"
          },
          "interval": "10m",
          "name": "My Workspace One Integration",
          "type": "workspace_one"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```