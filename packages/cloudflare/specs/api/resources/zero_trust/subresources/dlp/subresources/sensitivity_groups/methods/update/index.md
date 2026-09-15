---
title: Update the attributes of a single sensitivity group.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Sensitivity Groups](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update the attributes of a single sensitivity group.

PUT/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}

Updates a sensitivity group and its levels.

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

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

sensitivity\_group\_id: string

formatuuid

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20sensitivity_group_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

description: optional string

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

levels: optional array of object {id, description, name }

The desired final state of levels.

- <code>None</code> (omitted): no level changes.
- <code>Some([])</code>: delete all levels.
- <code>Some([...])</code>: desired final set + order.

</summary>

id: optional string

If <code>None</code> (omitted), a new level will be created. Otherwise, an existing level will be updated.

formatuuid

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20levels%20%3E%20(schema)>)

name: optional string

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, levels, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

levels: array of object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

template\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update the attributes of a single sensitivity group.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "success": true,
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "levels": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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
  "success": true,
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "levels": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```