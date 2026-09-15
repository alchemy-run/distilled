---
title: Update indicator feed data
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

[Snapshots](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/snapshots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update indicator feed data

PUT/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}/snapshot

Revises the raw data entries in a custom threat indicator feed.

Accepts both plain and gzipped STIX2/CRDF bodies. Gzip is detected by RFC 1952 magic bytes (`0x1f 0x8b`) and/or a `.gz` filename suffix (case-insensitive) — either signal alone is sufficient to trigger the gzip path; if the body is not valid gzip, the upload fails fast. Customers are encouraged to gzip larger uploads — the api-gateway 500 MB body cap applies to the on-the-wire (compressed) size, so gzip lets a single upload carry several GiB of decompressed STIX.

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

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

feed\_id: number

Indicator feed ID

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20feed_id%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

"Cf-Async-Upload": optional "1"

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20Cf-Async-Upload%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

source: optional string

The file to upload. Either a plain STIX2/CRDF body or a gzipped one (recognised by `0x1f 0x8b` magic bytes or a `.gz` filename suffix).

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20source%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {file\_id, filename, poll\_url, 2 more }

</summary>

file\_id: optional number

Feed id

<a href="#">Link to this property</a>

filename: optional string

Name of the file unified in our system

<a href="#">Link to this property</a>

poll\_url: optional string

Account-relative polling path. Prepend <code>/accounts/{account_id}</code> using the same account identifier and API host as the upload request. The path omits the account segment because the service does not have your account identifier in this context.

<a href="#">Link to this property</a>

status: optional string

Current status of the upload at the moment the request returned. This is NOT a terminal state: the file is unified inline, but the durable loader has only accepted it, so the upload is still <code>Unifying</code>. Poll <code>poll_url</code> until the status reaches a terminal value (<code>Unified</code> or <code>Error</code>).

<a href="#">Link to this property</a>

upload\_id: optional number

Identifier of the upload row, for polling this upload to a terminal state via <code>poll_url</code>.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update indicator feed data

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/snapshot \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -F source=@/Users/me/test.stix2.gz
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
    "file_id": 1,
    "filename": "snapshot_file.unified",
    "poll_url": "/intel/indicator-feeds/12/uploads/12345",
    "status": "Unifying",
    "upload_id": 12345
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
    "file_id": 1,
    "filename": "snapshot_file.unified",
    "poll_url": "/intel/indicator-feeds/12/uploads/12345",
    "status": "Unifying",
    "upload_id": 12345
  }
}
```