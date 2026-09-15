---
title: Purge Cached Content
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Purge Cached Content

POST/zones/{zone\_id}/purge\_cache

### Purge All Cached Content

Removes ALL files from Cloudflare’s cache. All tiers can purge everything.

```plaintext
{"purge_everything": true}
```

### Purge Cached Content by URL

Granularly removes one or more files from Cloudflare’s cache by specifying URLs. All tiers can purge by URL.

To purge files with custom cache keys, include the headers used to compute the cache key as in the example. If you have a device type or geo in your cache key, you will need to include the CF-Device-Type or CF-IPCountry headers. If you have lang in your cache key, you will need to include the Accept-Language header.

**NB:** When including the Origin header, be sure to include the **scheme** and **hostname**. The port number can be omitted if it is the default port (80 for http, 443 for https), but must be included otherwise.

Single file purge example with files:

```plaintext
{"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}
```

Single file purge example with url and header pairs:

```plaintext
{"files": [{"url": "http://www.example.com/cat_picture.jpg", "headers": {"CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN"}}, {"url": "http://www.example.com/dog_picture.jpg", "headers": {"CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US"}}]}
```

### Purge Cached Content by Tag, Host or Prefix

Granularly removes one or more files from Cloudflare’s cache either by specifying the host, the associated Cache-Tag, or a Prefix.

Flex purge with tags:

```plaintext
{"tags": ["a-cache-tag", "another-cache-tag"]}
```

Flex purge with hosts:

```plaintext
{"hosts": ["www.example.com", "images.example.com"]}
```

Flex purge with prefixes:

```plaintext
{"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}
```

### Availability and limits

Please refer to [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).

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

`Cache Purge`

##### P ath ParametersExpand Collapse

zone\_id: string

maxLength32

[Link to this property](#)%20cache%20%3E%20(method)%20purge%20%3E%20(params)%200%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {tags } or object {hosts } or object {prefixes } or 3 more

</summary>

One of the following:

<details>

<summary>

CachePurgeFlexPurgeByTags object {tags }

</summary>

tags: optional array of string

For more information on cache tags and purging by tags, please refer to <a href="https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/">purge by cache-tags documentation page</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CachePurgeFlexPurgeByHostnames object {hosts }

</summary>

hosts: optional array of string

For more information purging by hostnames, please refer to <a href="https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/">purge by hostname documentation page</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CachePurgeFlexPurgeByPrefixes object {prefixes }

</summary>

prefixes: optional array of string

For more information on purging by prefixes, please refer to <a href="https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/">purge by prefix documentation page</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CachePurgeEverything object {purge\_everything }

</summary>

purge\_everything: optional boolean

For more information, please refer to <a href="https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/">purge everything documentation page</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CachePurgeSingleFile object {files }

</summary>

files: optional array of string

For more information on purging files, please refer to <a href="https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/">purge by single-file documentation page</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CachePurgeSingleFileWithURLAndHeaders object {files }

</summary>

<details>

<summary>

files: optional array of object {headers, url }

For more information on purging files with URL and headers, please refer to <a href="https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/">purge by single-file documentation page</a>.

</summary>

headers: optional map\[string]

<a href="#">Link to this property</a>

url: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache%20%3E%20(method)%20purge%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20cache%20%3E%20(method)%20purge%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache%20%3E%20(method)%20purge%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Indicates the API call’s success or failure.

[Link to this property](#)%20cache%20%3E%20(method)%20purge%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id }

</summary>

id: string

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache%20%3E%20(method)%20purge%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Purge Cached Content

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "a-cache-tag",
            "another-cache-tag"
          ]
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```