---
title: Creates bulk DOS event with relationships and indicators
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Creates bulk DOS event with relationships and indicators

Deprecated: This endpoint is deprecated and will be removed in a future version.

POST/accounts/{account\_id}/cloudforce-one/events/create/bulk/relationships

This method is deprecated. Please use `event_create_bulk` instead

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20bulk_create_relationships%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

data: array of object {category, date, event, 13 more }

</summary>

category: string

<a href="#">Link to this property</a>

date: string

formatdate-time

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

<details>

<summary>

raw: object {data, source, tlp }

</summary>

data: map\[unknown]

<a href="#">Link to this property</a>

source: optional string

<a href="#">Link to this property</a>

tlp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

accountId: optional number

<a href="#">Link to this property</a>

attacker: optional string

<a href="#">Link to this property</a>

attackerCountry: optional string

<a href="#">Link to this property</a>

datasetId: optional string

<a href="#">Link to this property</a>

indicator: optional string

<a href="#">Link to this property</a>

<details>

<summary>

indicators: optional array of object {indicatorType, value }

Array of indicators for this event. Supports multiple indicators per event for complex scenarios.

</summary>

indicatorType: string

The type of indicator (e.g., DOMAIN, IP, JA3, HASH)

<a href="#">Link to this property</a>

value: string

The indicator value (e.g., domain name, IP address, hash)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

indicatorType: optional string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

targetCountry: optional string

<a href="#">Link to this property</a>

targetIndustry: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20bulk_create_relationships%20%3E%20(params)%200%20%3E%20(param)%20data%20%3E%20(schema)>)

datasetId: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20bulk_create_relationships%20%3E%20(params)%200%20%3E%20(param)%20datasetId%20%3E%20(schema)>)

##### ReturnsExpand Collapse

createdEventsCount: number

Number of events created

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_relationships_response%20%3E%20(schema)%20%3E%20(property)%20createdEventsCount>)

createdIndicatorsCount: number

Number of indicators created

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_relationships_response%20%3E%20(schema)%20%3E%20(property)%20createdIndicatorsCount>)

createdRelationshipsCount: number

Number of relationships created

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_relationships_response%20%3E%20(schema)%20%3E%20(property)%20createdRelationshipsCount>)

errorCount: number

Number of errors encountered

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_relationships_response%20%3E%20(schema)%20%3E%20(property)%20errorCount>)

<details>

<summary>

errors: optional array of object {error, eventIndex }

Array of error details

</summary>

error: string

Error message

<a href="#">Link to this property</a>

eventIndex: number

Index of the event that caused the error

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_relationships_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

### Creates bulk DOS event with relationships and indicators

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/create/bulk/relationships \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "data": [
            {
              "category": "Domain Resolution",
              "date": "2022-04-01T00:00:00Z",
              "event": "An attacker registered the domain domain.com",
              "raw": {
                "data": {
                  "foo": "bar"
                }
              },
              "tlp": "amber"
            }
          ],
          "datasetId": "durableObjectName"
        }'
```

200 example

```
{
  "createdEventsCount": 0,
  "createdIndicatorsCount": 0,
  "createdRelationshipsCount": 0,
  "errorCount": 0,
  "errors": [
    {
      "error": "error",
      "eventIndex": 0
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "createdEventsCount": 0,
  "createdIndicatorsCount": 0,
  "createdRelationshipsCount": 0,
  "errorCount": 0,
  "errors": [
    {
      "error": "error",
      "eventIndex": 0
    }
  ]
}
```