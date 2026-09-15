---
title: List Deployments
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

[Deployments](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Deployments

GET/accounts/{account\_id}/workers/scripts/{script\_name}/deployments

List of Worker Deployments. The first deployment in the list is the latest deployment actively serving traffic.

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

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {deployments }

</summary>

<details>

<summary>

deployments: array of <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.scripts.deployments%20%3E%20(model)%20deployment%20%3E%20(schema)">Deployment</a> { id, created\_on, source, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

strategy: "percentage"

<a href="#">Link to this property</a>

<details>

<summary>

versions: array of object {percentage, version\_id }

</summary>

percentage: number

maximum100

minimum0.01

<a href="#">Link to this property</a>

version\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {"workers/message", "workers/triggered\_by" }

</summary>

"workers/message": optional string

Human-readable message about the deployment. Truncated to 1000 bytes if longer.

maxLength1000

<a href="#">Link to this property</a>

"workers/triggered\_by": optional string

Operation that triggered the creation of the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

author\_email: optional string

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Deployments

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments \
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
    "deployments": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_on": "2019-12-27T18:11:19.117Z",
        "source": "api",
        "strategy": "percentage",
        "versions": [
          {
            "percentage": 100,
            "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        ],
        "annotations": {
          "workers/message": "Deploy bug fix.",
          "workers/triggered_by": "deployment"
        },
        "author_email": "dev@stainless.com"
      }
    ]
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
    "deployments": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_on": "2019-12-27T18:11:19.117Z",
        "source": "api",
        "strategy": "percentage",
        "versions": [
          {
            "percentage": 100,
            "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        ],
        "annotations": {
          "workers/message": "Deploy bug fix.",
          "workers/triggered_by": "deployment"
        },
        "author_email": "dev@stainless.com"
      }
    ]
  },
  "success": true
}
```