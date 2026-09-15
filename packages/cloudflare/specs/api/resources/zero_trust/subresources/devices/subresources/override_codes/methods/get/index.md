---
title: Get override codes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Override Codes](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/override_codes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get override codes

GET/accounts/{account\_id}/devices/registrations/{registration\_id}/override\_codes

Fetches one-time use admin override codes for a registration. This relies on the **Admin Override** setting being enabled in your device configuration.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.override_codes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

registration\_id: string

[Link to this property](#)%20zero_trust.devices.override_codes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20registration_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.override_codes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.override_codes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {disable\_for\_time }

</summary>

disable\_for\_time: optional map\[string]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.override_codes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.override_codes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get override codes

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID/override_codes \
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
  "result": {
    "disable_for_time": {
      "foo": "string"
    }
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
  "result": {
    "disable_for_time": {
      "foo": "string"
    }
  },
  "success": true
}
```