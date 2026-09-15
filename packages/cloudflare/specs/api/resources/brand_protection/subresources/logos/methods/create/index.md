---
title: Create new saved logo queries from image files
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[Logos](https://developers.cloudflare.com/api/resources/brand_protection/subresources/logos)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create new saved logo queries from image files

POST/accounts/{account\_id}/brand-protection/logos

Return new saved logo queries created from image files

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

match\_type: optional string

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20match_type%20%3E%20(schema)>)

tag: optional string

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20tag%20%3E%20(schema)>)

threshold: optional number

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20threshold%20%3E%20(schema)>)

##### Body ParametersExpand Collapse

image: optional file

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20image%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: optional number

[Link to this property](#)%20brand_protection.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)%20%3E%20(property)%20id>)

tag: optional string

[Link to this property](#)%20brand_protection.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)%20%3E%20(property)%20tag>)

upload\_path: optional string

[Link to this property](#)%20brand_protection.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)%20%3E%20(property)%20upload_path>)

### Create new saved logo queries from image files

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logos \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": 0,
  "tag": "tag",
  "upload_path": "upload_path"
}
```

##### Returns Examples

200 example

```
{
  "id": 0,
  "tag": "tag",
  "upload_path": "upload_path"
}
```