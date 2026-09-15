---
title: Reads data for a raw event
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Raw](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/raw)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Reads data for a raw event

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}/raw/{raw\_id}

Retrieves raw threat event data for a specific event in Cloudforce One.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

event\_id: string

Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

raw\_id: string

Raw Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20raw_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)%20%3E%20(property)%20id>)

accountId: number

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)%20%3E%20(property)%20accountId>)

created: string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)%20%3E%20(property)%20created>)

data: unknown

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)%20%3E%20(property)%20data>)

source: string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)%20%3E%20(property)%20source>)

tlp: string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)%20%3E%20(property)%20tlp>)

### Reads data for a raw event

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/raw/$RAW_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": "1234",
  "accountId": 1234,
  "created": "1970-01-01T00:00:00Z",
  "data": {},
  "source": "https://example.com",
  "tlp": "amber"
}
```

##### Returns Examples

200 example

```
{
  "id": "1234",
  "accountId": 1234,
  "created": "1970-01-01T00:00:00Z",
  "data": {},
  "source": "https://example.com",
  "tlp": "amber"
}
```