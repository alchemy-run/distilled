---
title: List Monitor Group References
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Monitor Groups](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups)

[References](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/subresources/references)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Monitor Group References

GET/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}/references

Get the list of resources that reference the provided monitor group.

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

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

monitor\_group\_id: string

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20monitor_group_id%20%3E%20(schema)>)

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

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {reference\_type, resource\_id, resource\_name, resource\_type }

List of resources that reference a given monitor group.

</summary>

<details>

<summary>

reference\_type: optional "\*"or "referral"or "referrer"

</summary>

One of the following:

"\*"

<a href="#">Link to this property</a>

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

<a href="#">Link to this property</a>

resource\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Monitor Group References

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID/references \
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
      "reference_type": "referrer",
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
    }
  ],
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
  "result": [
    {
      "reference_type": "referrer",
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
    }
  ],
  "success": true
}
```