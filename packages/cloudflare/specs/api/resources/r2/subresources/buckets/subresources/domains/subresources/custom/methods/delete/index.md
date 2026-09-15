---
title: Remove Custom Domain From Bucket
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Domains](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains)

[Custom](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Remove Custom Domain From Bucket

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

Remove custom domain registration from an existing R2 bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Workers R2 Storage Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

domain: string

Name of the custom domain.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

<details>

<summary>

"cf-r2-jurisdiction": optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {domain }

</summary>

domain: string

Name of the removed custom domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Remove Custom Domain From Bucket

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
    -X DELETE \
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
    "string"
  ],
  "result": {
    "domain": "example-domain/custom-domain.com"
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
    "string"
  ],
  "result": {
    "domain": "example-domain/custom-domain.com"
  },
  "success": true
}
```