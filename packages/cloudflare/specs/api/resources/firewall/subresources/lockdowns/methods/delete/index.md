---
title: Delete a Zone Lockdown rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[Lockdowns](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a Zone Lockdown rule

DELETE/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

Deletes an existing Zone Lockdown rule.

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

`Firewall Services Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

lock\_downs\_id: string

The unique identifier of the Zone Lockdown rule.

maxLength32

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20lock_downs_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: optional object {id }

</summary>

id: optional string

The unique identifier of the Zone Lockdown rule.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete a Zone Lockdown rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns/$LOCK_DOWNS_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```