---
title: Removes an event reference
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Relate](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/relate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Removes an event reference

DELETE/accounts/{account\_id}/cloudforce-one/events/relate/{event\_id}

Removes a reference link between related threat events in Cloudforce One.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.relate%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

event\_id: string

Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.relate%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.relate%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20cloudforce_one.threat_events.relate%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Removes an event reference

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/relate/$EVENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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