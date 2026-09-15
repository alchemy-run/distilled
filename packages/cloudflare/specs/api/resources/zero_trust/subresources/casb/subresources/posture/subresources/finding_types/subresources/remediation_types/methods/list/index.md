---
title: List remediation types for a finding type
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Finding Types](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/finding_types)

[Remediation Types](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/finding_types/subresources/remediation_types)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List remediation types for a finding type

GET/accounts/{account\_id}/data-security/posture/finding\_types/{finding\_type\_id}/remediation\_types

List all remediation types for a given finding type. This endpoint supports both cursor and offset pagination. Note that `cursor` and `page` are mutually exclusive.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

finding\_type\_id: string

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20finding_type_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

A cursor for pagination.

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

integration\_id: optional string

Filter by an integration ID

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result\_info: object {count, cursor, next, 4 more }

Pagination and result information.

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

cursor: optional string

Cursor for cursor-based pagination.

<a href="#">Link to this property</a>

next: optional string

URL to the next page of results.

formaturi

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

previous: optional string

URL to the previous page of results.

formaturi

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, description, display\_name, 2 more }

Array of remediation type objects.

</summary>

id: string

The identifier for the remediation type.

formatuuid

<a href="#">Link to this property</a>

description: string

A description of the action(s) taken by the remediation type.

<a href="#">Link to this property</a>

display\_name: string

The name of the remediation type as displayed in the cloudflare dashboard.

<a href="#">Link to this property</a>

finding\_type\_id: string

The identifier of the finding\_type which this remediation type should remediate.

formatuuid

<a href="#">Link to this property</a>

remediation\_type: string

The name of the remediation type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.finding_types.remediation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List remediation types for a finding type

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/finding_types/$FINDING_TYPE_ID/remediation_types \
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
  "result_info": {
    "count": 1,
    "cursor": "eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFmZmxpY3Rpb25fZGF0ZSI6IjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwMDAwWiJ9",
    "next": "https://example.com",
    "page": 1,
    "per_page": 20,
    "previous": "https://example.com",
    "total_count": 2000
  },
  "success": true,
  "result": [
    {
      "id": "7d736ac5-ed3b-46d5-9375-7025175ba1d9",
      "description": "Remove publicly accessible URL granting edit access",
      "display_name": "Remove Publicly Accessible URL - Edit Access",
      "finding_type_id": "6a790513-bbb5-4933-8971-76a744ec5448",
      "remediation_type": "Microsoft: Remove Publicly Accessible URL - Edit Access"
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
  "result_info": {
    "count": 1,
    "cursor": "eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFmZmxpY3Rpb25fZGF0ZSI6IjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwMDAwWiJ9",
    "next": "https://example.com",
    "page": 1,
    "per_page": 20,
    "previous": "https://example.com",
    "total_count": 2000
  },
  "success": true,
  "result": [
    {
      "id": "7d736ac5-ed3b-46d5-9375-7025175ba1d9",
      "description": "Remove publicly accessible URL granting edit access",
      "display_name": "Remove Publicly Accessible URL - Edit Access",
      "finding_type_id": "6a790513-bbb5-4933-8971-76a744ec5448",
      "remediation_type": "Microsoft: Remove Publicly Accessible URL - Edit Access"
    }
  ]
}
```