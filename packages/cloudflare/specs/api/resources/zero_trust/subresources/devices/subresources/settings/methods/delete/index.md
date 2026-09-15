---
title: Reset device settings for a Zero Trust account with defaults. This turns off all proxying.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Reset device settings for a Zero Trust account with defaults. This turns off all proxying.

DELETE/accounts/{account\_id}/devices/settings

Resets the current device settings for a Zero Trust account.

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

[Link to this property](#)%20zero_trust.devices.settings%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.settings%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.devices.settings%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.settings%20%3E%20(model)%20device_settings%20%3E%20(schema)">DeviceSettings</a> { disable\_for\_time, external\_emergency\_signal\_enabled, external\_emergency\_signal\_fingerprint, 6 more }

</summary>

disable\_for\_time: optional number

Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

<a href="#">Link to this property</a>

external\_emergency\_signal\_enabled: optional boolean

Controls whether the external emergency disconnect feature is enabled.

<a href="#">Link to this property</a>

external\_emergency\_signal\_fingerprint: optional string

The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external\_emergency\_signal\_url. If provided, the WARP client will use this value to verify the server’s identity. The device will ignore any response if the server’s certificate fingerprint does not exactly match this value.

<a href="#">Link to this property</a>

external\_emergency\_signal\_interval: optional string

The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., “5m”, “2m30s”, “1h”). Minimum 30 seconds.

<a href="#">Link to this property</a>

external\_emergency\_signal\_url: optional string

The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

<a href="#">Link to this property</a>

gateway\_proxy\_enabled: optional boolean

Enable gateway proxy filtering on TCP.

<a href="#">Link to this property</a>

gateway\_udp\_proxy\_enabled: optional boolean

Enable gateway proxy filtering on UDP.

<a href="#">Link to this property</a>

root\_certificate\_installation\_enabled: optional boolean

Enable installation of cloudflare managed root certificate.

<a href="#">Link to this property</a>

use\_zt\_virtual\_ip: optional boolean

Enable using CGNAT virtual IPv4.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.settings%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.settings%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Reset device settings for a Zero Trust account with defaults. This turns off all proxying.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/settings \
    -X DELETE \
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
  "result": {
    "disable_for_time": 0,
    "external_emergency_signal_enabled": true,
    "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "external_emergency_signal_interval": "5m",
    "external_emergency_signal_url": "https://192.0.2.1/signal",
    "gateway_proxy_enabled": true,
    "gateway_udp_proxy_enabled": true,
    "root_certificate_installation_enabled": true,
    "use_zt_virtual_ip": true
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
    "disable_for_time": 0,
    "external_emergency_signal_enabled": true,
    "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "external_emergency_signal_interval": "5m",
    "external_emergency_signal_url": "https://192.0.2.1/signal",
    "gateway_proxy_enabled": true,
    "gateway_udp_proxy_enabled": true,
    "root_certificate_installation_enabled": true,
    "use_zt_virtual_ip": true
  },
  "success": true
}
```