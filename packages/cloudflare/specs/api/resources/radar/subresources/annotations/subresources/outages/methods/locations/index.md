---
title: Get the number of outages by location
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Annotations](https://developers.cloudflare.com/api/resources/radar/subresources/annotations)

[Outages](https://developers.cloudflare.com/api/resources/radar/subresources/annotations/subresources/outages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get the number of outages by location

GET/radar/annotations/outages/locations

Retrieves the number of outages by location.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`User Details Write``User Details Read`

##### Q uery ParametersExpand Collapse

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional string

Filters results by a relative date range ending at the current time. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`), e.g. `7d`. Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `3dcontrol` covers days -10 to -7, `7dcontrol` covers days -14 to -7, `28dcontrol` covers days -56 to -28, and `10dcontrol` covers days -24 to -14). Mutually exclusive with `dateStart`/`dateEnd`.

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {annotations }

</summary>

<details>

<summary>

annotations: array of object {clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

<a href="#">Link to this property</a>

clientCountryName: string

<a href="#">Link to this property</a>

value: string

A numeric string.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.annotations.outages%20%3E%20(method)%20locations%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get the number of outages by location

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/annotations/outages/locations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "annotations": [
      {
        "clientCountryAlpha2": "PT",
        "clientCountryName": "Portugal",
        "value": "10"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "annotations": [
      {
        "clientCountryAlpha2": "PT",
        "clientCountryName": "Portugal",
        "value": "10"
      }
    ]
  },
  "success": true
}
```