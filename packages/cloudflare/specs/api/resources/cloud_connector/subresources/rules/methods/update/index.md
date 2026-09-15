---
title: Put Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloud Connector](https://developers.cloudflare.com/api/resources/cloud_connector)

[Rules](https://developers.cloudflare.com/api/resources/cloud_connector/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Put Rules

PUT/zones/{zone\_id}/cloud\_connector/rules

Updates Cloud Connector rules for a zone, replacing the existing rule configuration.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloud Connector Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cloud_connector.rules%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

rules: optional array of object {id, description, enabled, 3 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

expression: optional string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: optional object {host }

Parameters of Cloud Connector Rule

</summary>

host: optional string

Host to perform Cloud Connection to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional "aws\_s3"or "cloudflare\_r2"or "gcp\_storage"or 2 more

Cloud Provider type

</summary>

One of the following:

"aws\_s3"

<a href="#">Link to this property</a>

"cloudflare\_r2"

<a href="#">Link to this property</a>

"gcp\_storage"

<a href="#">Link to this property</a>

"azure\_storage"

<a href="#">Link to this property</a>

"oci\_storage"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloud_connector.rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rules%20%3E%20(schema)>)

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

[Link to this property](#)%20cloud_connector.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloud_connector.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloud_connector.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, description, enabled, 3 more }

List of Cloud Connector rules

</summary>

id: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

expression: optional string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: optional object {host }

Parameters of Cloud Connector Rule

</summary>

host: optional string

Host to perform Cloud Connection to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional "aws\_s3"or "cloudflare\_r2"or "gcp\_storage"or 2 more

Cloud Provider type

</summary>

One of the following:

"aws\_s3"

<a href="#">Link to this property</a>

"cloudflare\_r2"

<a href="#">Link to this property</a>

"gcp\_storage"

<a href="#">Link to this property</a>

"azure\_storage"

<a href="#">Link to this property</a>

"oci\_storage"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloud_connector.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Put Rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cloud_connector/rules \
    -X PUT \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "95c365e17e1b46599cd99e5b231fac4e",
      "description": "Rule description",
      "enabled": true,
      "expression": "http.cookie eq \"a=b\"",
      "parameters": {
        "host": "examplebucket.s3.eu-north-1.amazonaws.com"
      },
      "provider": "aws_s3"
    }
  ]
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
  "result": [
    {
      "id": "95c365e17e1b46599cd99e5b231fac4e",
      "description": "Rule description",
      "enabled": true,
      "expression": "http.cookie eq \"a=b\"",
      "parameters": {
        "host": "examplebucket.s3.eu-north-1.amazonaws.com"
      },
      "provider": "aws_s3"
    }
  ]
}
```