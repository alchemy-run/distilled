---
title: Check source connectivity
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Super Slurper](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper)

[Connectivity Precheck](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/connectivity_precheck)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Check source connectivity

PUT/accounts/{account\_id}/slurper/source/connectivity-precheck

Check whether tokens are valid against the source bucket

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

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(method)%20source%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {bucket, secret, vendor, 4 more } or object {bucket, secret, vendor, 2 more } or object {bucket, secret, vendor, 3 more }

</summary>

One of the following:

<details>

<summary>

R2SlurperS3SourceSchema object {bucket, secret, vendor, 4 more }

</summary>

bucket: string

<a href="#">Link to this property</a>

<details>

<summary>

secret: object {accessKeyId, secretAccessKey }

</summary>

accessKeyId: string

<a href="#">Link to this property</a>

secretAccessKey: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: "s3"

<a href="#">Link to this property</a>

endpoint: optional string

Custom S3-compatible endpoint that must use https://.

formaturi

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

region: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SlurperGcsSourceSchema object {bucket, secret, vendor, 2 more }

</summary>

bucket: string

<a href="#">Link to this property</a>

<details>

<summary>

secret: object {clientEmail, privateKey }

</summary>

clientEmail: string

<a href="#">Link to this property</a>

privateKey: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: "gcs"

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SlurperR2SourceSchema object {bucket, secret, vendor, 3 more }

</summary>

bucket: string

<a href="#">Link to this property</a>

<details>

<summary>

secret: object {accessKeyId, secretAccessKey }

</summary>

accessKeyId: string

<a href="#">Link to this property</a>

secretAccessKey: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

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

</details>

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(method)%20source%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

minLength1

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

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(method)%20source%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(method)%20source%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional object {connectivityStatus }

</summary>

<details>

<summary>

connectivityStatus: optional "success"or "error"

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(method)%20source%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(method)%20source%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Check source connectivity

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/source/connectivity-precheck \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "bucket",
          "secret": {
            "accessKeyId": "accessKeyId",
            "secretAccessKey": "secretAccessKey"
          },
          "vendor": "s3"
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
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
    "connectivityStatus": "success"
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
      "code": 7003,
      "message": "No route for the URI",
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
    "connectivityStatus": "success"
  },
  "success": true
}
```