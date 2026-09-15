---
title: List instances of a finding
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Findings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings)

[Instances](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List instances of a finding

GET/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/instances

Lists all security finding instances for a given security finding.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

finding\_id: string

formatbyte

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20finding_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

archived: optional boolean

Archived

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20archived%20%3E%20(schema)>)

asset\_ids: optional array of string

Filter finding instances by an array of asset IDs. Supports multiple comma-separated values.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20asset_ids%20%3E%20(schema)>)

cursor: optional string

A cursor for pagination. Obtained from the `result_info.cursor` field of a previous response.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order results.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

finding\_instance\_ids: optional array of string

Filter finding instances by an array of finding instance IDs. Supports multiple comma-separated values.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20finding_instance_ids%20%3E%20(schema)>)

max\_affliction\_date: optional string

Filter to view findings that occurred on or before the affliction date. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_affliction_date%20%3E%20(schema)>)

min\_affliction\_date: optional string

Filter to view findings that occurred on or after the affliction date. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_affliction_date%20%3E%20(schema)>)

<details>

<summary>

order: optional "affliction\_date"or "asset.name"or "remediation.status"

Which field to use when ordering the Finding’s instances. When ordering by ‘remediation.status’, only the most recent non-stale remediation job is considered. Stale jobs (created before the instance’s affliction\_date) are treated as having no status for ordering purposes.

</summary>

One of the following:

"affliction\_date"

<a href="#">Link to this property</a>

"asset.name"

<a href="#">Link to this property</a>

"remediation.status"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

remediation\_statuses: optional array of "none"or "pending"or "processing"or 3 more

Filter finding instances by most recent remediation job status. Supports multiple comma-separated values. Use ‘none’ to filter instances with no remediation jobs or instances where the most recent job is stale. Note: Stale jobs (created before the instance’s affliction\_date) are ignored for filtering purposes, but are still included in the ‘remediations’ array with stale=true.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"validating"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20remediation_statuses%20%3E%20(schema)>)

search: optional string

A search term.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {affliction\_date, asset, dlp\_contexts, 4 more }

Array of finding instance objects.

</summary>

affliction\_date: string

When this specific instance was identified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

asset: object {category, external\_id, fields, 3 more }

Asset information including metadata and categorization.

</summary>

<details>

<summary>

category: object {service, type, vendor, id }

Category information for an asset.

</summary>

service: string

The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.

<a href="#">Link to this property</a>

type: string

The type of asset.

<a href="#">Link to this property</a>

vendor: string

The vendor the asset is part of.

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the asset category.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

external\_id: string

External identifier from the source system.

maxLength512

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {name, value, link }

The fields associated with the asset.

</summary>

name: string

The name of the field.

<a href="#">Link to this property</a>

value: string

The value of the field.

<a href="#">Link to this property</a>

link: optional string

Optional link associated with the field.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Human-readable name of the asset.

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

link: optional string

Direct link to the asset.

formaturi

maxLength2048

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dlp\_contexts: array of object {created, entry\_ids, profile\_id, 6 more }

DLP context information if this is a content finding.

</summary>

created: string

When the DLP context was created.

formatdate-time

<a href="#">Link to this property</a>

entry\_ids: array of string

DLP Entry IDs.

<a href="#">Link to this property</a>

profile\_id: string

DLP Profile ID.

formatuuid

<a href="#">Link to this property</a>

updated: string

When the DLP context was last updated.

formatdate-time

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the DLP context.

formatuuid

<a href="#">Link to this property</a>

deleted: optional string

When the DLP context was deleted.

formatdate-time

<a href="#">Link to this property</a>

match\_context\_max\_extent: optional number

DLP Right Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_min\_extent: optional number

DLP Left Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_payload: optional map\[unknown]

DLP Match context payload that matched the profile in question.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

remediations: array of object {id, created\_at, stale, status }

A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The ‘stale’ field indicates whether the remediation job was created before the finding instance’s affliction\_date (true) or after it (false). If there has never been a remediation job for this finding instance, this field will be an empty array.

</summary>

id: string

Unique identifier for the remediation job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the remediation job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this remediation job is stale (created before the finding instance’s affliction\_date).

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"or 2 more

Status of a remediation job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"validating"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhooks: array of object {latest\_job, webhook\_id, webhook\_label }

The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the latest job (any status) per webhook config. The ‘stale’ field indicates whether the job was invoked before the finding instance’s current affliction\_date. If no webhook jobs have been created, this field will be an empty array.

</summary>

<details>

<summary>

latest\_job: object {id, created\_at, stale, status }

The most recent webhook job for this webhook configuration.

</summary>

id: string

Unique identifier for the webhook job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the webhook job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this webhook job is stale (created before the finding instance’s current affliction\_date).

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"

Current status of the webhook job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

webhook\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

webhook\_label: string

Account-specified display label for the webhook configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the finding instance.

formatuuid

<a href="#">Link to this property</a>

is\_archived: optional boolean

Whether this finding instance has been archived.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List instances of a finding

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/findings/$FINDING_ID/instances \
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
      "affliction_date": "2025-03-18T17:25:38.700541Z",
      "asset": {
        "category": {
          "service": null,
          "type": "file",
          "vendor": "Slack",
          "id": "1a78cbf3-b98f-4289-b1f2-22db64130f4f"
        },
        "external_id": "external-file-id-123",
        "fields": [
          {
            "name": "Credential name",
            "value": "Test asset 2",
            "link": "https://example.com"
          }
        ],
        "name": "Public.svg",
        "id": "8a043daf-def4-403e-9d28-da2e93d9b824",
        "link": "https://slack-files.com/TYJH37DCK-E0238GG6B8-92fd5y5674"
      },
      "dlp_contexts": [
        {
          "created": "2025-03-18T17:25:38.695977Z",
          "entry_ids": [
            "21befc68-a297-4090-ac10-17a051b901cd",
            "d6dd1e16-f78c-401a-b564-45c4e44aa467"
          ],
          "profile_id": "ab20a60b-21f2-4b13-ac98-24dcee27ac0e",
          "updated": "2025-03-18T17:25:38.695977Z",
          "id": "7653ff3a-d25e-4c10-8034-3460937c045b",
          "deleted": "2025-03-18T17:25:38.695977Z",
          "match_context_max_extent": 512,
          "match_context_min_extent": 1,
          "match_context_payload": {}
        }
      ],
      "remediations": [
        {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "created_at": "2025-03-18T18:30:15.123456Z",
          "stale": false,
          "status": "pending"
        }
      ],
      "webhooks": [
        {
          "latest_job": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "created_at": "2025-03-18T18:30:15.123456Z",
            "stale": false,
            "status": "pending"
          },
          "webhook_id": "550e8400-e29b-41d4-a716-446655440000",
          "webhook_label": "Send to Gmail"
        }
      ],
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "is_archived": false
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
      "affliction_date": "2025-03-18T17:25:38.700541Z",
      "asset": {
        "category": {
          "service": null,
          "type": "file",
          "vendor": "Slack",
          "id": "1a78cbf3-b98f-4289-b1f2-22db64130f4f"
        },
        "external_id": "external-file-id-123",
        "fields": [
          {
            "name": "Credential name",
            "value": "Test asset 2",
            "link": "https://example.com"
          }
        ],
        "name": "Public.svg",
        "id": "8a043daf-def4-403e-9d28-da2e93d9b824",
        "link": "https://slack-files.com/TYJH37DCK-E0238GG6B8-92fd5y5674"
      },
      "dlp_contexts": [
        {
          "created": "2025-03-18T17:25:38.695977Z",
          "entry_ids": [
            "21befc68-a297-4090-ac10-17a051b901cd",
            "d6dd1e16-f78c-401a-b564-45c4e44aa467"
          ],
          "profile_id": "ab20a60b-21f2-4b13-ac98-24dcee27ac0e",
          "updated": "2025-03-18T17:25:38.695977Z",
          "id": "7653ff3a-d25e-4c10-8034-3460937c045b",
          "deleted": "2025-03-18T17:25:38.695977Z",
          "match_context_max_extent": 512,
          "match_context_min_extent": 1,
          "match_context_payload": {}
        }
      ],
      "remediations": [
        {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "created_at": "2025-03-18T18:30:15.123456Z",
          "stale": false,
          "status": "pending"
        }
      ],
      "webhooks": [
        {
          "latest_job": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "created_at": "2025-03-18T18:30:15.123456Z",
            "stale": false,
            "status": "pending"
          },
          "webhook_id": "550e8400-e29b-41d4-a716-446655440000",
          "webhook_label": "Send to Gmail"
        }
      ],
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "is_archived": false
    }
  ]
}
```