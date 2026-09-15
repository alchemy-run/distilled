---
title: Lists attackers across multiple datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Attackers](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/attackers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists attackers across multiple datasets

GET/accounts/{account\_id}/cloudforce-one/events/attackers

Lists known threat attackers tracked in Cloudforce One threat intelligence.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.attackers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

datasetIds: optional array of string

Array of dataset IDs to query attackers from. If not provided, uses the default dataset.

[Link to this property](#)%20cloudforce_one.threat_events.attackers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetIds%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.attackers%20%3E%20(model)%20attacker_list_response%20%3E%20(schema)%20%3E%20(property)%20items>)

type: string

[Link to this property](#)%20cloudforce_one.threat_events.attackers%20%3E%20(model)%20attacker_list_response%20%3E%20(schema)%20%3E%20(property)%20type>)

### Lists attackers across multiple datasets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/attackers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```

##### Returns Examples

200 example

```
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```