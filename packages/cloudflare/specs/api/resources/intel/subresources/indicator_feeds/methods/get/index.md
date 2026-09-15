---
title: Get indicator feed metadata
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get indicator feed metadata

GET/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}

Retrieves details for a specific custom threat indicator feed.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

feed\_id: number

Indicator feed ID

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20feed_id%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_on, description, 10 more }

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

<details>

<summary>

last\_upload\_summary: optional object {persisted, skipped, uploaded }

Summary of indicator counts from the last successful upload to this feed. Populated by the custom-threat-feeds loader at the end of each successful load. Absent (omitted) when no upload has completed successfully or the upload errored before the summary write. Surfaces silent-failure paths so operators can see when their indicators were dropped (popularity allowlist, expired valid\_until, etc.) without reading loader logs.

</summary>

<details>

<summary>

persisted: optional object {domains\_added, domains\_removed, ips\_added, 3 more }

Net delta applied to feed indicators by this upload. Snapshot uploads emit both \*\_added and \*\_removed; delta-add emits only \*\_added; delta-remove emits only \*\_removed.

</summary>

domains\_added: optional number

<a href="#">Link to this property</a>

domains\_removed: optional number

<a href="#">Link to this property</a>

ips\_added: optional number

<a href="#">Link to this property</a>

ips\_removed: optional number

<a href="#">Link to this property</a>

urls\_added: optional number

<a href="#">Link to this property</a>

urls\_removed: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

skipped: optional object {allowlisted\_domains, expired\_indicators, invalid\_indicators }

Counts of indicators that were uploaded but did not reach QuickSilver, broken down by reason.

</summary>

allowlisted\_domains: optional number

Domains filtered by the global popularity allowlist at QS provisioning time. Popular domains (bing.com, naver.com, etc.) are protected from custom-threat-feed enforcement.

<a href="#">Link to this property</a>

expired\_indicators: optional number

Indicators in the upload whose valid\_until is already in the past. These are not added to QS; the expiration cron handles cleanup.

<a href="#">Link to this property</a>

invalid\_indicators: optional number

Reserved for future use. Currently always 0 — the unifier aborts the entire upload on a single bad indicator.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {domains, ips, urls }

Indicator counts from the unified file the loader received

</summary>

domains: optional number

Number of domain indicators in the upload

<a href="#">Link to this property</a>

ips: optional number

Number of IP indicators in the upload

<a href="#">Link to this property</a>

urls: optional number

Number of URL indicators in the upload

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

latest\_upload\_error: optional string

Human-readable error message describing why the latest upload failed. Populated only when <code>latest_upload_status</code> is <code>Error</code>. Returns one of a small fixed set of category-level messages (invalid domain / IP / URL entries, malformed row or header, invalid valid\_until timestamp, etc.) or the generic <code>Upload failed</code> for unknown or infrastructure-level errors. Never echoes raw error text from the underlying loader. Intel accounts receive the verbatim loader/API error text (including specific offending values) instead of these category-level messages.

<a href="#">Link to this property</a>

<details>

<summary>

latest\_upload\_status: optional "Mirroring"or "Unifying"or "Loading"or 3 more

Status of the latest snapshot uploaded

</summary>

One of the following:

"Mirroring"

<a href="#">Link to this property</a>

"Unifying"

<a href="#">Link to this property</a>

"Loading"

<a href="#">Link to this property</a>

"Provisioning"

<a href="#">Link to this property</a>

"Complete"

<a href="#">Link to this property</a>

"Error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the data entry was last modified

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

provider\_id: optional number

The unique identifier for the provider

<a href="#">Link to this property</a>

provider\_name: optional string

The provider of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get indicator feed metadata

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "last_upload_summary": {
      "persisted": {
        "domains_added": 2,
        "domains_removed": 1,
        "ips_added": 0,
        "ips_removed": 0,
        "urls_added": 0,
        "urls_removed": 0
      },
      "skipped": {
        "allowlisted_domains": 1,
        "expired_indicators": 0,
        "invalid_indicators": 0
      },
      "uploaded": {
        "domains": 3,
        "ips": 0,
        "urls": 0
      }
    },
    "latest_upload_error": "Feed contains one or more invalid domain entries. Check your feed for wildcards or other values that are not valid DNS names.",
    "latest_upload_status": "Complete",
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1",
    "provider_id": 1,
    "provider_name": "provider_name"
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
    "last_upload_summary": {
      "persisted": {
        "domains_added": 2,
        "domains_removed": 1,
        "ips_added": 0,
        "ips_removed": 0,
        "urls_added": 0,
        "urls_removed": 0
      },
      "skipped": {
        "allowlisted_domains": 1,
        "expired_indicators": 0,
        "invalid_indicators": 0
      },
      "uploaded": {
        "domains": 3,
        "ips": 0,
        "urls": 0
      }
    },
    "latest_upload_error": "Feed contains one or more invalid domain entries. Check your feed for wildcards or other values that are not valid DNS names.",
    "latest_upload_status": "Complete",
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1",
    "provider_id": 1,
    "provider_name": "provider_name"
  }
}
```