---
title: Get device (deprecated)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get device (deprecated)

Deprecated

GET/accounts/{account\_id}/devices/{device\_id}

Fetches a single WARP device. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.

**Deprecated**: please use one of the following endpoints instead:

- GET /accounts/{account\_id}/devices/physical-devices/{device\_id}
- GET /accounts/{account\_id}/devices/registrations/{registration\_id}

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

account\_id: string

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

device\_id: string

Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

maxLength36

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20device_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, account, created, 16 more }

</summary>

id: optional string

Registration ID. Equal to Device ID except for accounts which enabled <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/">multi-user mode</a>.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

account: optional object {id, account\_type, name }

</summary>

Deprecatedid: optional string

<a href="#">Link to this property</a>

Deprecatedaccount\_type: optional string

<a href="#">Link to this property</a>

name: optional string

The name of the enrolled account.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: optional string

When the device was created.

formatdate-time

<a href="#">Link to this property</a>

deleted: optional boolean

True if the device was deleted.

<a href="#">Link to this property</a>

device\_type: optional string

<a href="#">Link to this property</a>

Deprecatedgateway\_device\_id: optional string

<a href="#">Link to this property</a>

ip: optional string

IPv4 or IPv6 address.

<a href="#">Link to this property</a>

key: optional string

The device’s public key.

<a href="#">Link to this property</a>

key\_type: optional string

Type of the key.

<a href="#">Link to this property</a>

last\_seen: optional string

When the device last connected to Cloudflare services.

formatdate-time

<a href="#">Link to this property</a>

mac\_address: optional string

The device mac address.

<a href="#">Link to this property</a>

model: optional string

The device model name.

<a href="#">Link to this property</a>

name: optional string

The device name.

<a href="#">Link to this property</a>

os\_version: optional string

The operating system version.

<a href="#">Link to this property</a>

serial\_number: optional string

The device serial number.

<a href="#">Link to this property</a>

tunnel\_type: optional string

Type of the tunnel connection used.

<a href="#">Link to this property</a>

updated: optional string

When the device was updated.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {id, email, name }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

name: optional string

The enrolled device user’s name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: optional string

The WARP client version.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get device (deprecated)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/$DEVICE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "account": {
      "id": "id",
      "account_type": "account_type",
      "name": "Company"
    },
    "created": "2017-06-14T00:00:00Z",
    "deleted": true,
    "device_type": "windows",
    "gateway_device_id": "PD33E90AXfafe14643cbbbc-4a0ed4fc8415Q",
    "ip": "1.1.1.1",
    "key": "yek0SUYoOQ10vMGsIYAevozXUQpQtNFJFfFGqER/BGc=",
    "key_type": "curve25519",
    "last_seen": "2017-06-14T00:00:00Z",
    "mac_address": "00-00-5E-00-53-00",
    "model": "MyPhone(pro-X)",
    "name": "My mobile device",
    "os_version": "10.0.0",
    "serial_number": "EXAMPLEHMD6R",
    "tunnel_type": "masque",
    "updated": "2017-06-14T00:00:00Z",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "version": "1.0.0"
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
    "account": {
      "id": "id",
      "account_type": "account_type",
      "name": "Company"
    },
    "created": "2017-06-14T00:00:00Z",
    "deleted": true,
    "device_type": "windows",
    "gateway_device_id": "PD33E90AXfafe14643cbbbc-4a0ed4fc8415Q",
    "ip": "1.1.1.1",
    "key": "yek0SUYoOQ10vMGsIYAevozXUQpQtNFJFfFGqER/BGc=",
    "key_type": "curve25519",
    "last_seen": "2017-06-14T00:00:00Z",
    "mac_address": "00-00-5E-00-53-00",
    "model": "MyPhone(pro-X)",
    "name": "My mobile device",
    "os_version": "10.0.0",
    "serial_number": "EXAMPLEHMD6R",
    "tunnel_type": "masque",
    "updated": "2017-06-14T00:00:00Z",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "version": "1.0.0"
  },
  "success": true
}
```