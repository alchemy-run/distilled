---
title: Delete organization.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Organizations](https://developers.cloudflare.com/api/resources/organizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete organization.

DELETE/organizations/{organization\_id}

Delete an organization. The organization MUST be empty before deleting. It must not contain any sub-organizations, accounts, members or users. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

**Access Control:** Restricted to enterprise organizations.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

organization\_id: string

[Link to this property](#)%20organizations%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20organization_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20organizations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20organizations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id }

</summary>

id: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20organizations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete organization.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [],
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
    "id": "id"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
    "id": "id"
  },
  "success": true
}
```