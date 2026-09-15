---
title: GraphQL endpoint for event aggregation
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Graphql](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/graphql)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# GraphQL endpoint for event aggregation

POST/accounts/{account\_id}/cloudforce-one/events/graphql

Execute GraphQL aggregations over threat events. Supports multi-dimensional group-bys, optional date range filtering, and multi-dataset aggregation.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.graphql%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

data: optional unknown

[Link to this property](#)%20cloudforce_one.threat_events.graphql%20%3E%20(model)%20graphql_create_response%20%3E%20(schema)%20%3E%20(property)%20data>)

errors: optional array of unknown

[Link to this property](#)%20cloudforce_one.threat_events.graphql%20%3E%20(model)%20graphql_create_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

### GraphQL endpoint for event aggregation

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/graphql \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {},
  "errors": [
    {}
  ]
}
```

##### Returns Examples

200 example

```
{
  "data": {},
  "errors": [
    {}
  ]
}
```