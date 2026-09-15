---
title: List tenant memberships
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Tenants](https://developers.cloudflare.com/api/resources/tenants)

[Memberships](https://developers.cloudflare.com/api/resources/tenants/subresources/memberships)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tenant memberships

GET/tenants/{tenant\_id}/memberships

List of active members (Cloudflare users) for the Tenant.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

tenant\_id: string

[Link to this property](#)%20tenants.memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tenant_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20tenants.memberships%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20tenants.memberships%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/tenants#(resource)%20tenants.memberships%20%3E%20(model)%20tenant_membership%20%3E%20(schema)">TenantMembership</a> { user\_email, user\_name, user\_tag }

</summary>

user\_email: string

<a href="#">Link to this property</a>

user\_name: string

<a href="#">Link to this property</a>

user\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenants.memberships%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20tenants.memberships%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List tenant memberships

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/memberships \
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
  "result": [
    {
      "user_email": "user_email",
      "user_name": "user_name",
      "user_tag": "user_tag"
    }
  ],
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
  "result": [
    {
      "user_email": "user_email",
      "user_name": "user_name",
      "user_tag": "user_tag"
    }
  ],
  "success": true
}
```