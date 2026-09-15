---
title: List IP profiles
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[IP Profiles](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/ip_profiles)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List IP profiles

GET/accounts/{account\_id}/devices/ip-profiles

Lists WARP Device IP profiles.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

The page number to return.

minimum1

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

The number of IP profiles to return per page.

maximum100

minimum1

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.ip_profiles%20%3E%20(model)%20ip_profile%20%3E%20(schema)">IPProfile</a> { id, created\_at, description, 6 more }

</summary>

id: string

The ID of the Device IP profile.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339Nano timestamp when the Device IP profile was created.

<a href="#">Link to this property</a>

description: string

An optional description of the Device IP profile.

<a href="#">Link to this property</a>

enabled: boolean

Whether the Device IP profile is enabled.

<a href="#">Link to this property</a>

match: string

The wirefilter expression to match registrations. Available values: “identity.name”, “identity.email”, “identity.groups.id”, “identity.groups.name”, “identity.groups.email”, “identity.saml\_attributes”.

maxLength10000

<a href="#">Link to this property</a>

name: string

A user-friendly name for the Device IP profile.

<a href="#">Link to this property</a>

precedence: number

The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

<a href="#">Link to this property</a>

subnet\_id: string

The ID of the Subnet.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339Nano timestamp when the Device IP profile was last updated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: number

Number of records in the response.

<a href="#">Link to this property</a>

page: number

The page size number of the response.

<a href="#">Link to this property</a>

per\_page: number

The limit for the number of records in the response.

<a href="#">Link to this property</a>

total\_count: number

Total number of records available.

<a href="#">Link to this property</a>

total\_pages: optional number

Total number of pages available.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List IP profiles

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles \
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
      "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "created_at": "2025-02-14T13:17:00.123456789Z",
      "description": "example comment",
      "enabled": true,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "IPv4 Cloudflare Source IPs",
      "precedence": 100,
      "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2025-02-14T13:17:00.123456789Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 10,
    "total_count": 10,
    "total_pages": 1
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
      "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "created_at": "2025-02-14T13:17:00.123456789Z",
      "description": "example comment",
      "enabled": true,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "IPv4 Cloudflare Source IPs",
      "precedence": 100,
      "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2025-02-14T13:17:00.123456789Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 10,
    "total_count": 10,
    "total_pages": 1
  }
}
```