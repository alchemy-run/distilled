---
title: Updates a raw event
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

# Updates a raw event

PATCH/accounts/{account\_id}/cloudforce-one/events/{event\_id}/raw/{raw\_id}

Partially updates raw threat event data in Cloudforce One, modifying specific fields of the event.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

event\_id: string

Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

raw\_id: string

Raw Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20raw_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

data: optional unknown

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20data%20%3E%20(schema)>)

source: optional string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20source%20%3E%20(schema)>)

tlp: optional string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20tlp%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_edit_response%20%3E%20(schema)%20%3E%20(property)%20id>)

data: unknown

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_edit_response%20%3E%20(schema)%20%3E%20(property)%20data>)

### Updates a raw event

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/raw/$RAW_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": "1234",
  "data": {}
}
```

##### Returns Examples

200 example

```
{
  "id": "1234",
  "data": {}
}
```