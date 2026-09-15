---
title: List saved query matches
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

[Matches](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/matches)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List saved query matches

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/domain/matches

Get paginated list of domain matches for one or more brand protection queries. When multiple query\_ids are provided (comma-separated), matches are deduplicated across queries and each match includes a match\_details array with per-match query metadata and individual dismissed state.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

query\_id: array of string

Query ID or comma-separated list of Query IDs. When multiple IDs are provided, matches are deduplicated across queries and each match includes a match\_details array with per-match query metadata and dismissed state.

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20query_id%20%3E%20(schema)>)

domain\_search: optional string

Filter matches by domain name (substring match)

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain_search%20%3E%20(schema)>)

include\_dismissed: optional string

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_dismissed%20%3E%20(schema)>)

include\_domain\_id: optional string

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_domain_id%20%3E%20(schema)>)

limit: optional string

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional string

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

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

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

<details>

<summary>

orderBy: optional "domain"or "first\_seen"or "registrar"

Column to sort by. Options: ‘domain’, ‘first\_seen’, or ‘registrar’

</summary>

One of the following:

"domain"

<a href="#">Link to this property</a>

"first\_seen"

<a href="#">Link to this property</a>

"registrar"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

matches: array of object {domain, first\_seen, public\_scans, 6 more }

</summary>

domain: string

<a href="#">Link to this property</a>

first\_seen: string

<a href="#">Link to this property</a>

<details>

<summary>

public\_scans: object {submission\_id }

</summary>

submission\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

scan\_status: string

<a href="#">Link to this property</a>

scan\_submission\_id: number

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

dismissed: optional boolean

Whether the match is dismissed. Only present for single-query requests. For multi-query requests, use the dismissed field in each match\_details entry.

<a href="#">Link to this property</a>

<details>

<summary>

match\_details: optional array of object {dismissed, match\_id, query\_id, query\_tag }

Per-match detail objects with query metadata and individual dismissed state. Only present when multiple query\_ids are requested.

</summary>

dismissed: boolean

Individual dismissed state for this specific match.

<a href="#">Link to this property</a>

match\_id: number

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

Tag associated with the query, if one exists.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(model)%20match_get_response%20%3E%20(schema)%20%3E%20(property)%20matches>)

total: number

minimum0

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(model)%20match_get_response%20%3E%20(schema)%20%3E%20(property)%20total>)

### List saved query matches

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/domain/matches \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "matches": [
    {
      "domain": "domain",
      "first_seen": "first_seen",
      "public_scans": {
        "submission_id": "submission_id"
      },
      "registrar": "registrar",
      "scan_status": "scan_status",
      "scan_submission_id": 0,
      "source": "source",
      "dismissed": true,
      "match_details": [
        {
          "dismissed": true,
          "match_id": 0,
          "query_id": 0,
          "query_tag": "query_tag"
        }
      ]
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
      "domain": "domain",
      "first_seen": "first_seen",
      "public_scans": {
        "submission_id": "submission_id"
      },
      "registrar": "registrar",
      "scan_status": "scan_status",
      "scan_submission_id": 0,
      "source": "source",
      "dismissed": true,
      "match_details": [
        {
          "dismissed": true,
          "match_id": 0,
          "query_id": 0,
          "query_tag": "query_tag"
        }
      ]
    }
  ],
  "total": 0
}
```