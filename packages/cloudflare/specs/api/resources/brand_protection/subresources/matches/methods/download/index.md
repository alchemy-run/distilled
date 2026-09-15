---
title: Download matches for string queries by ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[Matches](https://developers.cloudflare.com/api/resources/brand_protection/subresources/matches)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Download matches for string queries by ID

GET/accounts/{account\_id}/brand-protection/matches/download

Return matches as CSV for string queries based on ID

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.matches%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

[Link to this property](#)%20brand_protection.matches%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

include\_dismissed: optional boolean

[Link to this property](#)%20brand_protection.matches%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20include_dismissed%20%3E%20(schema)>)

include\_domain\_id: optional boolean

[Link to this property](#)%20brand_protection.matches%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20include_domain_id%20%3E%20(schema)>)

limit: optional number

[Link to this property](#)%20brand_protection.matches%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

[Link to this property](#)%20brand_protection.matches%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

matches: optional array of map\[unknown]

[Link to this property](#)%20brand_protection.matches%20%3E%20(model)%20match_download_response%20%3E%20(schema)%20%3E%20(property)%20matches>)

total: optional number

[Link to this property](#)%20brand_protection.matches%20%3E%20(model)%20match_download_response%20%3E%20(schema)%20%3E%20(property)%20total>)

### Download matches for string queries by ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/matches/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```

##### Returns Examples

200 example

```
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```