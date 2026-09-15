---
title: Lists all datasets in an account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists all datasets in an account

GET/accounts/{account\_id}/cloudforce-one/events/dataset

Lists all threat event datasets configured in Cloudforce One.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

includeDeleted: optional boolean

When true, include soft-deleted datasets in the response. Each item includes a `deletedAt` field (ISO 8601 or null). Default: false.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20includeDeleted%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

indicatorWriteMode: "read\_only"or "create\_only"or "full"

Effective indicator mutation capability after account/dataset authorization and dataset storage capability are applied. API Gateway method permissions are separate and must also allow the requested operation.

</summary>

One of the following:

"read\_only"

<a href="#">Link to this property</a>

"create\_only"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicatorWriteMode>)

isAnalytics: boolean

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20isAnalytics>)

isPublic: boolean

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20isPublic>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20uuid>)

deletedAt: optional string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20deletedAt>)

### Lists all datasets in an account

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "indicatorWriteMode": "full",
    "isAnalytics": true,
    "isPublic": true,
    "name": "friendly dataset name",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "deletedAt": "deletedAt"
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "indicatorWriteMode": "full",
    "isAnalytics": true,
    "isPublic": true,
    "name": "friendly dataset name",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "deletedAt": "deletedAt"
  }
]
```