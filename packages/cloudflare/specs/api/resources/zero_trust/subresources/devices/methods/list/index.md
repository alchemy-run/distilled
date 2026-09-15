---
title: List devices (deprecated)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List devices (deprecated)

Deprecated

GET/accounts/{account\_id}/devices

List WARP devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.

**Deprecated**: please use one of the following endpoints instead:

- GET /accounts/{account\_id}/devices/physical-devices
- GET /accounts/{account\_id}/devices/registrations

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

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices%20%3E%20(model)%20device%20%3E%20(schema)">Device</a> { id, created, deleted, 17 more }

</summary>

id: optional string

Registration ID. Equal to Device ID except for accounts which enabled <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/">multi-user mode</a>.

maxLength36

<a href="#">Link to this property</a>

created: optional string

When the device was created.

formatdate-time

<a href="#">Link to this property</a>

deleted: optional boolean

True if the device was deleted.

<a href="#">Link to this property</a>

<details>

<summary>

device\_type: optional "windows"or "mac"or "linux"or 3 more

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"android"

<a href="#">Link to this property</a>

"ios"

<a href="#">Link to this property</a>

"chromeos"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

IPv4 or IPv6 address.

<a href="#">Link to this property</a>

key: optional string

The device’s public key.

<a href="#">Link to this property</a>

last\_seen: optional string

When the device last connected to Cloudflare services.

formatdate-time

<a href="#">Link to this property</a>

mac\_address: optional string

The device mac address.

<a href="#">Link to this property</a>

manufacturer: optional string

The device manufacturer name.

<a href="#">Link to this property</a>

model: optional string

The device model name.

<a href="#">Link to this property</a>

name: optional string

The device name.

<a href="#">Link to this property</a>

os\_distro\_name: optional string

The Linux distro name.

<a href="#">Link to this property</a>

os\_distro\_revision: optional string

The Linux distro revision.

<a href="#">Link to this property</a>

os\_version: optional string

The operating system version.

<a href="#">Link to this property</a>

os\_version\_extra: optional string

Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

<a href="#">Link to this property</a>

revoked\_at: optional string

When the device was revoked.

formatdate-time

<a href="#">Link to this property</a>

serial\_number: optional string

The device serial number.

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

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List devices (deprecated)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices \
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created": "2017-06-14T00:00:00Z",
      "deleted": true,
      "device_type": "windows",
      "ip": "1.1.1.1",
      "key": "yek0SUYoOQ10vMGsIYAevozXUQpQtNFJFfFGqER/BGc=",
      "last_seen": "2017-06-14T00:00:00Z",
      "mac_address": "00-00-5E-00-53-00",
      "manufacturer": "My phone corp",
      "model": "MyPhone(pro-X)",
      "name": "My mobile device",
      "os_distro_name": "ubuntu",
      "os_distro_revision": "1.0.0",
      "os_version": "10.0.0",
      "os_version_extra": "(a) or 6889 or Ubuntu 24.04",
      "revoked_at": "2017-06-14T00:00:00Z",
      "serial_number": "EXAMPLEHMD6R",
      "updated": "2017-06-14T00:00:00Z",
      "user": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "email": "user@example.com",
        "name": "John Appleseed"
      },
      "version": "1.0.0"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created": "2017-06-14T00:00:00Z",
      "deleted": true,
      "device_type": "windows",
      "ip": "1.1.1.1",
      "key": "yek0SUYoOQ10vMGsIYAevozXUQpQtNFJFfFGqER/BGc=",
      "last_seen": "2017-06-14T00:00:00Z",
      "mac_address": "00-00-5E-00-53-00",
      "manufacturer": "My phone corp",
      "model": "MyPhone(pro-X)",
      "name": "My mobile device",
      "os_distro_name": "ubuntu",
      "os_distro_revision": "1.0.0",
      "os_version": "10.0.0",
      "os_version_extra": "(a) or 6889 or Ubuntu 24.04",
      "revoked_at": "2017-06-14T00:00:00Z",
      "serial_number": "EXAMPLEHMD6R",
      "updated": "2017-06-14T00:00:00Z",
      "user": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "email": "user@example.com",
        "name": "John Appleseed"
      },
      "version": "1.0.0"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```