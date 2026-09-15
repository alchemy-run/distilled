---
title: Adds a tag to an event
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Event Tags](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/event_tags)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Adds a tag to an event

POST/accounts/{account\_id}/cloudforce-one/events/event\_tag/{event\_id}/create

Adds a tag to a threat event in Cloudforce One for classification and filtering.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

event\_id: string

Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

tags: array of string

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tags%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Adds a tag to an event

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/event_tag/$EVENT_ID/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "botnet"
          ]
        }'
```

200 example

```
{
  "result": {
    "success": true
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "success": true
  },
  "success": true
}
```