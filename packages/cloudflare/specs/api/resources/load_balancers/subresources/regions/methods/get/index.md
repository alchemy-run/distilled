---
title: Get Region
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Regions](https://developers.cloudflare.com/api/resources/load_balancers/subresources/regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Region

GET/accounts/{account\_id}/load\_balancers/regions/{region\_id}

Get a single region mapping.

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

`Load Balancing: Monitors and Pools Write``Load Balancing: Monitors and Pools Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.regions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

<details>

<summary>

region\_id: "WNAM"or "ENAM"or "WEU"or 10 more

A list of Cloudflare regions. WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia).

</summary>

One of the following:

"WNAM"

<a href="#">Link to this property</a>

"ENAM"

<a href="#">Link to this property</a>

"WEU"

<a href="#">Link to this property</a>

"EEU"

<a href="#">Link to this property</a>

"NSAM"

<a href="#">Link to this property</a>

"SSAM"

<a href="#">Link to this property</a>

"OC"

<a href="#">Link to this property</a>

"ME"

<a href="#">Link to this property</a>

"NAF"

<a href="#">Link to this property</a>

"SAF"

<a href="#">Link to this property</a>

"SAS"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.regions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20region_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: unknownor string

A list of countries and subdivisions mapped to a region.

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Region

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/regions/$REGION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "iso_standard": "Country and subdivision codes follow ISO 3166-1 alpha-2 and ISO 3166-2",
    "regions": [
      {
        "countries": [
          {
            "country_code_a2": "CA",
            "country_name": "Canada",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AB",
                "subdivision_name": "Alberta"
              },
              {
                "subdivision_code_a2": "BC",
                "subdivision_name": "British Columbia"
              }
            ]
          },
          {
            "country_code_a2": "HT",
            "country_name": "Haiti"
          },
          {
            "country_code_a2": "MX",
            "country_name": "Mexico"
          },
          {
            "country_code_a2": "US",
            "country_name": "United States",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AZ",
                "subdivision_name": "Arizona"
              },
              {
                "subdivision_code_a2": "CA",
                "subdivision_name": "California"
              },
              {
                "subdivision_code_a2": "CO",
                "subdivision_name": "Colorado"
              },
              {
                "subdivision_code_a2": "HI",
                "subdivision_name": "Hawaii"
              },
              {
                "subdivision_code_a2": "MN",
                "subdivision_name": "Minnesota"
              },
              {
                "subdivision_code_a2": "MO",
                "subdivision_name": "Missouri"
              },
              {
                "subdivision_code_a2": "NV",
                "subdivision_name": "Nevada"
              },
              {
                "subdivision_code_a2": "OR",
                "subdivision_name": "Oregon"
              },
              {
                "subdivision_code_a2": "TX",
                "subdivision_name": "Texas"
              },
              {
                "subdivision_code_a2": "UT",
                "subdivision_name": "Utah"
              },
              {
                "subdivision_code_a2": "WA",
                "subdivision_name": "Washington"
              }
            ]
          }
        ],
        "region_code": "WNAM"
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
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "iso_standard": "Country and subdivision codes follow ISO 3166-1 alpha-2 and ISO 3166-2",
    "regions": [
      {
        "countries": [
          {
            "country_code_a2": "CA",
            "country_name": "Canada",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AB",
                "subdivision_name": "Alberta"
              },
              {
                "subdivision_code_a2": "BC",
                "subdivision_name": "British Columbia"
              }
            ]
          },
          {
            "country_code_a2": "HT",
            "country_name": "Haiti"
          },
          {
            "country_code_a2": "MX",
            "country_name": "Mexico"
          },
          {
            "country_code_a2": "US",
            "country_name": "United States",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AZ",
                "subdivision_name": "Arizona"
              },
              {
                "subdivision_code_a2": "CA",
                "subdivision_name": "California"
              },
              {
                "subdivision_code_a2": "CO",
                "subdivision_name": "Colorado"
              },
              {
                "subdivision_code_a2": "HI",
                "subdivision_name": "Hawaii"
              },
              {
                "subdivision_code_a2": "MN",
                "subdivision_name": "Minnesota"
              },
              {
                "subdivision_code_a2": "MO",
                "subdivision_name": "Missouri"
              },
              {
                "subdivision_code_a2": "NV",
                "subdivision_name": "Nevada"
              },
              {
                "subdivision_code_a2": "OR",
                "subdivision_name": "Oregon"
              },
              {
                "subdivision_code_a2": "TX",
                "subdivision_name": "Texas"
              },
              {
                "subdivision_code_a2": "UT",
                "subdivision_name": "Utah"
              },
              {
                "subdivision_code_a2": "WA",
                "subdivision_name": "Washington"
              }
            ]
          }
        ],
        "region_code": "WNAM"
      }
    ]
  },
  "success": true
}
```