---
title: Data security findings timeseries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Analytics Query](https://developers.cloudflare.com/api/resources/analytics_query)

[Data Security](https://developers.cloudflare.com/api/resources/analytics_query/subresources/data_security)

[Findings](https://developers.cloudflare.com/api/resources/analytics_query/subresources/data_security/subresources/findings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Data security findings timeseries

POST/accounts/{account\_id}/analytics/query/data-security/findings/timeseries

Returns merged time-bucketed CASB findings.

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

`Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

filters: array of object {name, op, values }

Filters to apply.

</summary>

name: string

Specifies the column name to filter on. Requires a valid column for the target dataset (e.g. <code>country</code>, <code>allowed</code>, <code>appId</code>).

<a href="#">Link to this property</a>

op: string

Filter operator. Common values: <code>eq</code>, <code>neq</code>, <code>in</code>, <code>not_in</code>, <code>gt</code>, <code>lt</code>, <code>gte</code>, <code>lte</code>.

<a href="#">Link to this property</a>

<details>

<summary>

values: array of stringor booleanor number

Values to match against. Type depends on the column.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(params)%200%20%3E%20(param)%20filters%20%3E%20(schema)>)

from: string

Start of the query time range (inclusive). RFC3339.

formatdate-time

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(params)%200%20%3E%20(param)%20from%20%3E%20(schema)>)

to: string

End of the query time range (exclusive). RFC3339.

formatdate-time

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(params)%200%20%3E%20(param)%20to%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {slots, resolution }

Merged CASB and CDE findings timeseries result.

</summary>

slots: array of map\[unknown]

Contains time-bucketed result rows. Each slot includes a <code>timestamp</code> plus <code>content</code> and <code>posture</code> maps with <code>cloud</code> and <code>saas</code> keys.

<a href="#">Link to this property</a>

resolution: optional string

Always null for this endpoint.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Data security findings timeseries

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/analytics/query/data-security/findings/timeseries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "filters": [
            {
              "name": "country",
              "op": "in",
              "values": [
                "US",
                "CA",
                "GB"
              ]
            }
          ],
          "from": "2024-11-01T00:00:00Z",
          "to": "2024-11-08T00:00:00Z"
        }'
```

200 example

400 example

400 example

401 example

403 example

403 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": {
    "slots": [
      {
        "content": {
          "cloud": 150,
          "saas": 23
        },
        "posture": {
          "cloud": 0,
          "saas": 5
        },
        "timestamp": "2024-11-05T00:00:00Z"
      },
      {
        "content": {
          "cloud": 180,
          "saas": 30
        },
        "posture": {
          "cloud": 0,
          "saas": 7
        },
        "timestamp": "2024-11-06T00:00:00Z"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1002,
      "message": "Parameter 'from' has invalid value '2024-11-05 00:00:00'. Should be of type: 'RFC3339'"
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

400 example

400 example

401 example

403 example

403 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": {
    "slots": [
      {
        "content": {
          "cloud": 150,
          "saas": 23
        },
        "posture": {
          "cloud": 0,
          "saas": 5
        },
        "timestamp": "2024-11-05T00:00:00Z"
      },
      {
        "content": {
          "cloud": 180,
          "saas": 30
        },
        "posture": {
          "cloud": 0,
          "saas": 7
        },
        "timestamp": "2024-11-06T00:00:00Z"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1002,
      "message": "Parameter 'from' has invalid value '2024-11-05 00:00:00'. Should be of type: 'RFC3339'"
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```