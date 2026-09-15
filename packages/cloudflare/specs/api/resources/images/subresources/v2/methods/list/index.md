---
title: List images V2
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Images](https://developers.cloudflare.com/api/resources/images)

[V2](https://developers.cloudflare.com/api/resources/images/subresources/v2)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List images V2

GET/accounts/{account\_id}/images/v2

List up to 10000 images from CF Images, with up to 1000 results per page. Use the optional parameters below to get a specific range of images. Pagination is supported via continuation\_token.

**Metadata Filtering (Optional):**

You can optionally filter images by custom metadata fields using the `meta.<field>[<operator>]=<value>` syntax.

**Supported Operators:**

- `eq` / `eq:string` / `eq:number` / `eq:boolean` - Exact match
- `gt` / `gt:number` - Greater than (number only)
- `gte` / `gte:number` - Greater than or equal (number only)
- `lt` / `lt:number` - Less than (number only)
- `lte` / `lte:number` - Less than or equal (number only)
- `in` / `in:string` / `in:number` - Match any value in list (pipe-separated)

**Metadata Filter Constraints:**

- Maximum 5 metadata filters per request
- Maximum 5 levels of nesting (e.g., `meta.first.second.third.fourth.fifth`)
- Maximum 10 elements for list operators ( `in`)
- Supports string, number, and boolean value types
- Range operators ( `gt`, `gte`, `lt`, `lte`) only accept numeric values

**Filter Consistency:** Filters are combined with AND logic. The system does not validate whether filter combinations are logically consistent. For example, `meta.priority[eq:number]=5&meta.priority[lte:number]=3` will return zero results because no value can satisfy both conditions simultaneously. It is the caller’s responsibility to ensure filter combinations make sense.

**Examples:**

```plaintext
# List all images
/images/v2

# Filter by metadata [eq]
/images/v2?meta.status[eq:string]=active

# Filter by metadata [in]
/images/v2?meta.status[in]=pending|deleted|flagged

# Filter by metadata [in:number]
/images/v2?meta.ratings[in:number]=4|5

# Filter by metadata range [gte:number]
/images/v2?meta.priority[gte:number]=1

# Filter by bounded range
/images/v2?meta.priority[gte:number]=1&meta.priority[lte:number]=5

# Filter by nested metadata
/images/v2?meta.region.name[eq]=eu-west

# Combine metadata filters with creator
/images/v2?meta.status[eq]=active&creator=user123

# Multiple metadata filters (AND logic)
/images/v2?meta.status[eq]=active&meta.priority[eq:number]=5
```

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

`Images Read``Images Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

continuation\_token: optional string

Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint.

maxLength32

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20continuation_token%20%3E%20(schema)>)

creator: optional string

Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20creator%20%3E%20(schema)>)

<details>

<summary>

meta: optional object {"&lt;field&gt;\[&lt;operator&gt;]" }

</summary>

"&lt;field&gt;\[&lt;operator&gt;]": optional string

Optional metadata filter(s). Multiple filters can be combined with AND logic.

**Operators:**

- <code>eq</code>, <code>eq:string</code>, <code>eq:number</code>, <code>eq:boolean</code> - Exact match
- <code>gt</code>, <code>gt:number</code> - Greater than (number only)
- <code>gte</code>, <code>gte:number</code> - Greater than or equal (number only)
- <code>lt</code>, <code>lt:number</code> - Less than (number only)
- <code>lte</code>, <code>lte:number</code> - Less than or equal (number only)
- <code>in</code>, <code>in:string</code>, <code>in:number</code> - Match any value in pipe-separated list

**Examples:**

- <code>meta.status[eq]=active</code>
- <code>meta.priority[eq:number]=5</code>
- <code>meta.enabled[eq:boolean]=true</code>
- <code>meta.priority[gte:number]=1</code>
- <code>meta.score[lt:number]=100</code>
- <code>meta.region[in]=us-east|us-west|eu-west</code>

**Note:** Filter consistency is not validated. Contradictory filters (e.g., <code>meta.priority[eq:number]=5&amp;meta.priority[lte:number]=3</code>) will return zero results.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20meta%20%3E%20(schema)>)

per\_page: optional number

Number of items per page

maximum10000

minimum10

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "asc"or "desc"

Sorting order by upload time

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

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

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {continuation\_token, images }

</summary>

continuation\_token: optional string

Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

images: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1%20%3E%20(model)%20image%20%3E%20(schema)">Image</a> { id, creator, filename, 4 more }

</summary>

id: optional string

Image unique identifier.

maxLength32

<a href="#">Link to this property</a>

creator: optional string

Can set the creator field with an internal user ID.

maxLength1024

<a href="#">Link to this property</a>

filename: optional string

Image file name.

maxLength255

<a href="#">Link to this property</a>

meta: optional unknown

User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes.

<a href="#">Link to this property</a>

requireSignedURLs: optional boolean

Indicates whether the image can be a accessed only using it’s UID. If set to true, a signed token needs to be generated with a signing key to view the image.

<a href="#">Link to this property</a>

uploaded: optional string

When the media item was uploaded.

formatdate-time

<a href="#">Link to this property</a>

variants: optional array of string

Object specifying available variants for an image.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20images.v2%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List images V2

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v2 \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

400 example

400 example

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
    "continuation_token": "continuation_token",
    "images": [
      {
        "id": "id",
        "creator": "107b9558-dd06-4bbd-5fef-9c2c16bb7900",
        "filename": "logo.png",
        "meta": {
          "key": "value"
        },
        "requireSignedURLs": true,
        "uploaded": "2014-01-02T02:20:00.123Z",
        "variants": [
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/thumbnail",
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/hero",
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/original"
        ]
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
      "code": 5400,
      "message": "Unsupported metadata filter operator: 'not-eq'"
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
      "code": 5400,
      "message": "Too many metadata filters: 6 provided, maximum 5 allowed"
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
    "continuation_token": "continuation_token",
    "images": [
      {
        "id": "id",
        "creator": "107b9558-dd06-4bbd-5fef-9c2c16bb7900",
        "filename": "logo.png",
        "meta": {
          "key": "value"
        },
        "requireSignedURLs": true,
        "uploaded": "2014-01-02T02:20:00.123Z",
        "variants": [
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/thumbnail",
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/hero",
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/original"
        ]
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
      "code": 5400,
      "message": "Unsupported metadata filter operator: 'not-eq'"
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
      "code": 5400,
      "message": "Too many metadata filters: 6 provided, maximum 5 allowed"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```