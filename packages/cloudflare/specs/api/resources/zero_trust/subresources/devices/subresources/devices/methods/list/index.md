---
title: List devices
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List devices

GET/accounts/{account\_id}/devices/physical-devices

Lists WARP devices.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional array of string

Filter by a one or more device IDs.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

active\_registrations: optional "include"or "only"or "exclude"

Include or exclude devices with active registrations. The default is “only” - return only devices with active registrations.

</summary>

One of the following:

"include"

<a href="#">Link to this property</a>

"only"

<a href="#">Link to this property</a>

"exclude"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20active_registrations%20%3E%20(schema)>)

cursor: optional string

Opaque token indicating the starting position when requesting the next set of records. A cursor value can be obtained from the result\_info.cursor field in the response.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

include: optional string

Comma-separated list of additional information that should be included in the device response. Supported values are: “last\_seen\_registration.policy”.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include%20%3E%20(schema)>)

<details>

<summary>

last\_seen\_registration: optional object {policy }

</summary>

policy: optional string

Filter by the ID of the device settings profile assigned to the device registration.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20last_seen_registration%20%3E%20(schema)>)

<details>

<summary>

last\_seen\_user: optional object {email }

</summary>

email: optional string

Filter by the last seen user’s email.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20last_seen_user%20%3E%20(schema)>)

per\_page: optional number

The maximum number of devices to return in a single response.

formatuint64

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search by device details.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

seen\_after: optional string

Filter by the last\_seen timestamp - returns only devices last seen after this timestamp.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20seen_after%20%3E%20(schema)>)

seen\_before: optional string

Filter by the last\_seen timestamp - returns only devices last seen before this timestamp.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20seen_before%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "name"or "id"or "client\_version"or 4 more

The device field to order results by.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"id"

<a href="#">Link to this property</a>

"client\_version"

<a href="#">Link to this property</a>

"last\_seen\_user.email"

<a href="#">Link to this property</a>

"last\_seen\_at"

<a href="#">Link to this property</a>

"active\_registrations"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "asc"or "desc"

Sort direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, active\_registrations, created\_at, 16 more }

</summary>

id: string

The unique ID of the device.

<a href="#">Link to this property</a>

active\_registrations: number

The number of active registrations for the device. Active registrations are those which haven’t been revoked or deleted.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339 timestamp when the device was created.

<a href="#">Link to this property</a>

last\_seen\_at: string

The RFC3339 timestamp when the device was last seen.

<a href="#">Link to this property</a>

name: string

The name of the device.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp when the device was last updated.

<a href="#">Link to this property</a>

client\_version: optional string

Version of the WARP client.

<a href="#">Link to this property</a>

deleted\_at: optional string

The RFC3339 timestamp when the device was deleted.

<a href="#">Link to this property</a>

device\_type: optional string

The device operating system.

<a href="#">Link to this property</a>

hardware\_id: optional string

A string that uniquely identifies the hardware or virtual machine (VM).

<a href="#">Link to this property</a>

<details>

<summary>

last\_seen\_registration: optional object {policy }

The last seen registration for the device.

</summary>

<details>

<summary>

policy: optional object {id, default, deleted, 2 more }

A summary of the device profile evaluated for the registration.

</summary>

id: string

The ID of the device settings profile.

<a href="#">Link to this property</a>

default: boolean

Whether the device settings profile is the default profile for the account.

<a href="#">Link to this property</a>

deleted: boolean

Whether the device settings profile was deleted.

<a href="#">Link to this property</a>

name: string

The name of the device settings profile.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp of when the device settings profile last changed for the registration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_seen\_user: optional object {id, email, name }

The last user to use the WARP device.

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

mac\_address: optional string

The device MAC address.

<a href="#">Link to this property</a>

manufacturer: optional string

The device manufacturer.

<a href="#">Link to this property</a>

model: optional string

The model name of the device.

<a href="#">Link to this property</a>

os\_version: optional string

The device operating system version number.

<a href="#">Link to this property</a>

os\_version\_extra: optional string

Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

<a href="#">Link to this property</a>

Deprecatedpublic\_ip: optional string

**Deprecated**: IP information is provided by DEX - see <a href="https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/">https://developers.cloudflare.com/api/resources/zero\_trust/subresources/dex/subresources/fleet\_status/subresources/devices/methods/list/</a>

<a href="#">Link to this property</a>

serial\_number: optional string

The device serial number.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, cursor, per\_page, total\_count }

V4 public API Pagination/Cursor info.

</summary>

count: number

Number of records in the response.

<a href="#">Link to this property</a>

cursor: string

Opaque token to request the next set of records.

<a href="#">Link to this property</a>

per\_page: number

The limit for the number of records in the response.

<a href="#">Link to this property</a>

total\_count: optional number

Total number of records available.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List devices

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/physical-devices \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "fc9ab6ab-3b94-4319-9941-459462b3d73e",
      "active_registrations": 1,
      "created_at": "2025-02-14T13:17:00Z",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "name": "My Device",
      "updated_at": "2025-02-14T13:17:00Z",
      "client_version": "1.0.0",
      "deleted_at": "2025-02-14T13:17:00Z",
      "device_type": "linux",
      "hardware_id": "hardware_id",
      "last_seen_registration": {
        "policy": {
          "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
          "default": true,
          "deleted": true,
          "name": "name",
          "updated_at": "2025-02-14T13:17:00Z"
        }
      },
      "last_seen_user": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "email": "user@example.com",
        "name": "John Appleseed"
      },
      "mac_address": "f5:01:73:cf:12:23",
      "manufacturer": "ACME",
      "model": "Mark VII",
      "os_version": "os_version",
      "os_version_extra": "os_version_extra",
      "public_ip": "1.1.1.1",
      "serial_number": "ABS765ASD8A"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "fc9ab6ab-3b94-4319-9941-459462b3d73e",
      "active_registrations": 1,
      "created_at": "2025-02-14T13:17:00Z",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "name": "My Device",
      "updated_at": "2025-02-14T13:17:00Z",
      "client_version": "1.0.0",
      "deleted_at": "2025-02-14T13:17:00Z",
      "device_type": "linux",
      "hardware_id": "hardware_id",
      "last_seen_registration": {
        "policy": {
          "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
          "default": true,
          "deleted": true,
          "name": "name",
          "updated_at": "2025-02-14T13:17:00Z"
        }
      },
      "last_seen_user": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "email": "user@example.com",
        "name": "John Appleseed"
      },
      "mac_address": "f5:01:73:cf:12:23",
      "manufacturer": "ACME",
      "model": "Mark VII",
      "os_version": "os_version",
      "os_version_extra": "os_version_extra",
      "public_ip": "1.1.1.1",
      "serial_number": "ABS765ASD8A"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```