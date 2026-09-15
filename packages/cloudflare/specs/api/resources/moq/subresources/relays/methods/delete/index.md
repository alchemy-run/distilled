---
title: Delete a relay
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[MoQ](https://developers.cloudflare.com/api/resources/moq)

[Relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a relay

DELETE/accounts/{account\_id}/moq/relays/{relay\_id}

Soft-deletes a MoQ relay. The relay ID goes in the URL path — `DELETE /accounts/{account_id}/moq/relays/{relay_id}` — not the request body; there is no collection-level delete endpoint.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account identifier.

[Link to this property](#)%20moq.relays%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

relay\_id: string

[Link to this property](#)%20moq.relays%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20relay_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20moq.relays%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional unknown

[Link to this property](#)%20moq.relays%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete a relay

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID \
    -X DELETE \
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
  "success": true,
  "result": {}
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
  "success": true,
  "result": {}
}
```