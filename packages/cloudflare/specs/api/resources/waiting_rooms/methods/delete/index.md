---
title: Delete waiting room
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete waiting room

DELETE/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}

Deletes a waiting room.

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

`Waiting Rooms Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20waiting_rooms%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

waiting\_room\_id: string

[Link to this property](#)%20waiting_rooms%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20waiting_room_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete waiting room

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252"
  }
}
```