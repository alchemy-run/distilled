---
title: Get domain
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects)

[Domains](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get domain

GET/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

Fetch a single domain.

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

`Pages Read``Pages Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

project\_name: string

Name of the project.

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20project_name%20%3E%20(schema)>)

domain\_name: string

The domain name.

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain_name%20%3E%20(schema)>)

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

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20pages.projects.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get domain

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains/$DOMAIN_NAME \
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
    "id": "id",
    "certificate_authority": "lets_encrypt",
    "created_on": "created_on",
    "domain_id": "domain_id",
    "name": "this-is-my-domain-01.com",
    "status": "initializing",
    "validation_data": {
      "method": "http",
      "status": "initializing",
      "error_message": "error_message",
      "txt_name": "txt_name",
      "txt_value": "txt_value"
    },
    "verification_data": {
      "status": "pending",
      "error_message": "error_message"
    },
    "zone_tag": "zone_tag"
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
    "id": "id",
    "certificate_authority": "lets_encrypt",
    "created_on": "created_on",
    "domain_id": "domain_id",
    "name": "this-is-my-domain-01.com",
    "status": "initializing",
    "validation_data": {
      "method": "http",
      "status": "initializing",
      "error_message": "error_message",
      "txt_name": "txt_name",
      "txt_value": "txt_value"
    },
    "verification_data": {
      "status": "pending",
      "error_message": "error_message"
    },
    "zone_tag": "zone_tag"
  },
  "success": true
}
```