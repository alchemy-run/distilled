---
title: Delete IPFS Universal Path Gateway Content List Entry
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Web3](https://developers.cloudflare.com/api/resources/web3)

[Hostnames](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames)

[IPFS Universal Paths](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths)

[Content Lists](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists)

[Entries](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/subresources/entries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete IPFS Universal Path Gateway Content List Entry

DELETE/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list/entries/{content\_list\_entry\_identifier}

Delete IPFS Universal Path Gateway Content List Entry

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

`Web3 Hostnames Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Specify the identifier of the hostname.

maxLength32

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

identifier: string

Specify the identifier of the hostname.

maxLength32

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

content\_list\_entry\_identifier: string

Specify the identifier of the hostname.

maxLength32

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20content_list_entry_identifier%20%3E%20(schema)>)

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

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id }

</summary>

id: string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Specifies whether the API call was successful.

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete IPFS Universal Path Gateway Content List Entry

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list/entries/$CONTENT_LIST_ENTRY_IDENTIFIER \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```