---
title: Delete a virtual network
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

[Virtual Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a virtual network

DELETE/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

Deletes an existing virtual network.

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

`Cloudflare One Networks Write``Cloudflare Tunnel Write`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID

maxLength32

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

virtual\_network\_id: string

UUID of the virtual network.

formatuuid

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20virtual_network_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.networks.virtual_networks%20%3E%20(model)%20virtual_network%20%3E%20(schema)">VirtualNetwork</a> { id, comment, created\_at, 3 more }

</summary>

id: string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

comment: string

Optional remark describing the virtual network.

maxLength256

<a href="#">Link to this property</a>

created\_at: string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: boolean

If <code>true</code>, this virtual network is the default for the account.

<a href="#">Link to this property</a>

name: string

A user-friendly name for the virtual network.

maxLength256

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete a virtual network

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks/$VIRTUAL_NETWORK_ID \
    -X DELETE \
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Staging VPC for data science",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "is_default_network": true,
    "name": "us-east-1-vpc",
    "deleted_at": "2009-11-10T23:00:00Z"
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Staging VPC for data science",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "is_default_network": true,
    "name": "us-east-1-vpc",
    "deleted_at": "2009-11-10T23:00:00Z"
  },
  "success": true
}
```