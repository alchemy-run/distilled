---
title: Create new URL submissions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create new URL submissions

POST/accounts/{account\_id}/brand-protection/submit

Return new URL submissions

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection%20%3E%20(method)%20submit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

skipped\_urls: optional array of map\[unknown]

[Link to this property](#)%20brand_protection%20%3E%20(model)%20brand_protection_submit_response%20%3E%20(schema)%20%3E%20(property)%20skipped_urls>)

submitted\_urls: optional array of map\[unknown]

[Link to this property](#)%20brand_protection%20%3E%20(model)%20brand_protection_submit_response%20%3E%20(schema)%20%3E%20(property)%20submitted_urls>)

### Create new URL submissions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/submit \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "skipped_urls": [
    {
      "foo": "bar"
    }
  ],
  "submitted_urls": [
    {
      "foo": "bar"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "skipped_urls": [
    {
      "foo": "bar"
    }
  ],
  "submitted_urls": [
    {
      "foo": "bar"
    }
  ]
}
```