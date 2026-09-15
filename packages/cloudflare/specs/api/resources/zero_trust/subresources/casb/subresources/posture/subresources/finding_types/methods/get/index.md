---
title: Get finding by ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Finding Types](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/finding_types)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get finding by ID

GET/accounts/{account\_id}/data-security/posture/finding\_types/{finding\_type\_id}

Retrieve a specific finding type by its unique identifier.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.finding_types%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

finding\_type\_id: string

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.finding_types%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20finding_type_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

Error or message code.

minimum1000

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

documentation\_url: optional string

Link to relevant documentation.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

JSON pointer to the source of the error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.finding_types%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

Error or message code.

minimum1000

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

documentation\_url: optional string

Link to relevant documentation.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

JSON pointer to the source of the error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.finding_types%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.finding_types%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, category, name, 3 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.finding_types%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get finding by ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/finding_types/$FINDING_TYPE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "a20895dd-9c3b-43bd-a608-71c98c6c2d94",
    "category": {
      "observation": "Issue",
      "product": "SaaS",
      "type": "Posture"
    },
    "name": "Slack File Publicly Accessible",
    "severity": "High",
    "vendor": "Google Workspace",
    "description": "This finding indicates that a file in your Slack workspace is publicly accessible."
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
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "a20895dd-9c3b-43bd-a608-71c98c6c2d94",
    "category": {
      "observation": "Issue",
      "product": "SaaS",
      "type": "Posture"
    },
    "name": "Slack File Publicly Accessible",
    "severity": "High",
    "vendor": "Google Workspace",
    "description": "This finding indicates that a file in your Slack workspace is publicly accessible."
  }
}
```