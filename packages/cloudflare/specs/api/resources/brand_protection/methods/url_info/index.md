---
title: Read submitted URLs by ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Read submitted URLs by ID

GET/accounts/{account\_id}/brand-protection/url-info

Return submitted URLs based on ID

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection%20%3E%20(method)%20url_info%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

result: optional array of map\[unknown]

[Link to this property](#)%20brand_protection%20%3E%20(method)%20url_info%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Read submitted URLs by ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/url-info \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
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
  "result": [
    {
      "foo": "bar"
    }
  ]
}
```