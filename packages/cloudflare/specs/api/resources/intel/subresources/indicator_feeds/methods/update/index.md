---
title: Update indicator feed metadata
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update indicator feed metadata

PUT/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}

Revises details for a specific custom threat indicator feed.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

feed\_id: number

Indicator feed ID

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20feed_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

description: optional string

The new description of the feed

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

is\_attributable: optional boolean

The new is\_attributable value of the feed

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20is_attributable%20%3E%20(schema)>)

is\_downloadable: optional boolean

The new is\_downloadable value of the feed

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20is_downloadable%20%3E%20(schema)>)

is\_public: optional boolean

The new is\_public value of the feed

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20is_public%20%3E%20(schema)>)

name: optional string

The new name of the feed

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_on, description, 5 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the data entry was created

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the data entry was last modified

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update indicator feed metadata

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "This is an example description",
          "is_attributable": true,
          "is_downloadable": true,
          "is_public": true,
          "name": "indicator_list"
        }'
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
  "success": true,
  "result": {
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
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
  "success": true,
  "result": {
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
}
```