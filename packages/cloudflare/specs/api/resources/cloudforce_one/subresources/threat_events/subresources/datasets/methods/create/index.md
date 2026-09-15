---
title: Creates a dataset
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

# Creates a dataset

POST/accounts/{account\_id}/cloudforce-one/events/dataset/create

Creates a new threat event dataset in Cloudforce One for organizing related threat events.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

isPublic: boolean

If true, then anyone can search the dataset. If false, then its limited to the account.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20isPublic%20%3E%20(schema)>)

name: string

Used to describe the dataset within the account context.

minLength1

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

isAnalytics: boolean

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)%20%3E%20(property)%20isAnalytics>)

isPublic: boolean

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)%20%3E%20(property)%20isPublic>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

### Creates a dataset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "isPublic": true,
          "name": "x"
        }'
```

200 example

```
{
  "isAnalytics": true,
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```

##### Returns Examples

200 example

```
{
  "isAnalytics": true,
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```