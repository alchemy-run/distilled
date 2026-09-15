---
title: List logo matches
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

[Logo Matches](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logo_matches)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List logo matches

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/matches

Get paginated list of logo matches for a specific brand protection logo query

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

query\_id: string

minLength1

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20query_id%20%3E%20(schema)>)

download: optional string

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20download%20%3E%20(schema)>)

limit: optional string

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional string

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

<details>

<summary>

order: optional "asc"or "desc"

Sort order. Options: ‘asc’ (ascending) or ‘desc’ (descending)

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

<details>

<summary>

orderBy: optional "matchedAt"or "domain"or "similarityScore"or "registrar"

Column to sort by. Options: ‘matchedAt’, ‘domain’, ‘similarityScore’, or ‘registrar’

</summary>

One of the following:

"matchedAt"

<a href="#">Link to this property</a>

"domain"

<a href="#">Link to this property</a>

"similarityScore"

<a href="#">Link to this property</a>

"registrar"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

matches: array of object {id, domain, matched\_at, 6 more }

</summary>

id: number

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

matched\_at: string

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

similarity\_score: number

<a href="#">Link to this property</a>

url\_scan\_id: string

<a href="#">Link to this property</a>

content\_type: optional string

<a href="#">Link to this property</a>

image\_data: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(model)%20logo_match_get_response%20%3E%20(schema)%20%3E%20(property)%20matches>)

total: number

minimum0

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(model)%20logo_match_get_response%20%3E%20(schema)%20%3E%20(property)%20total>)

### List logo matches

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/matches \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "matches": [
    {
      "id": 0,
      "domain": "domain",
      "matched_at": "matched_at",
      "query_id": 0,
      "registrar": "registrar",
      "similarity_score": 0,
      "url_scan_id": "url_scan_id",
      "content_type": "content_type",
      "image_data": "image_data"
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
      "id": 0,
      "domain": "domain",
      "matched_at": "matched_at",
      "query_id": 0,
      "registrar": "registrar",
      "similarity_score": 0,
      "url_scan_id": "url_scan_id",
      "content_type": "content_type",
      "image_data": "image_data"
    }
  ],
  "total": 0
}
```