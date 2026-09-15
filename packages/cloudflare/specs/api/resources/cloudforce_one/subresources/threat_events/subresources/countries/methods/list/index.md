---
title: Retrieves countries information for all countries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Countries](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/countries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieves countries information for all countries

GET/accounts/{account\_id}/cloudforce-one/events/countries

Lists countries referenced in Cloudforce One threat intelligence data.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.countries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {alpha2, alpha3, name }

</summary>

alpha2: string

<a href="#">Link to this property</a>

alpha3: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.countries%20%3E%20(model)%20country_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20result>)

success: string

[Link to this property](#)%20cloudforce_one.threat_events.countries%20%3E%20(model)%20country_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20success>)

### Retrieves countries information for all countries

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/countries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "result": [
      {
        "alpha2": "AF",
        "alpha3": "AF",
        "name": "Afghanistan"
      }
    ],
    "success": "true"
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "result": [
      {
        "alpha2": "AF",
        "alpha3": "AF",
        "name": "Afghanistan"
      }
    ],
    "success": "true"
  }
]
```