---
title: Indicator Feeds
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Indicator Feeds

##### [Get indicator feeds owned by this account](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/list)

GET/accounts/{account\_id}/intel/indicator-feeds

##### [Get indicator feed metadata](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/get)

GET/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}

##### [Create new indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/create)

POST/accounts/{account\_id}/intel/indicator-feeds

##### [Update indicator feed metadata](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/update)

PUT/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}

##### [Get indicator feed data](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/data)

GET/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}/data

##### ModelsExpand Collapse

<details>

<summary>

IndicatorFeedListResponse object {id, created\_on, description, 5 more }

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_list_response%20%3E%20(schema)>)

<details>

<summary>

IndicatorFeedGetResponse object {id, created\_on, description, 10 more }

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_get_response%20%3E%20(schema)>)

<details>

<summary>

IndicatorFeedCreateResponse object {id, created\_on, description, 5 more }

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_create_response%20%3E%20(schema)>)

<details>

<summary>

IndicatorFeedUpdateResponse object {id, created\_on, description, 5 more }

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

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_update_response%20%3E%20(schema)>)

IndicatorFeedDataResponse = string

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_data_response%20%3E%20(schema)>)

#### Indicator FeedsSnapshots

##### [Update indicator feed data](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/snapshots/methods/update)

PUT/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}/snapshot

##### ModelsExpand Collapse

<details>

<summary>

SnapshotUpdateResponse object {file\_id, filename, poll\_url, 2 more }

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

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(model)%20snapshot_update_response%20%3E%20(schema)>)

#### Indicator FeedsPermissions

##### [List indicator feed permissions](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/list)

GET/accounts/{account\_id}/intel/indicator-feeds/permissions/view

##### [Grant permission to indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/create)

PUT/accounts/{account\_id}/intel/indicator-feeds/permissions/add

##### [Revoke permission to indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/delete)

PUT/accounts/{account\_id}/intel/indicator-feeds/permissions/remove

##### ModelsExpand Collapse

<details>

<summary>

PermissionListResponse = array of object {id, description, is\_attributable, 3 more }

</summary>

id: optional number

The unique identifier for the indicator feed

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

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_list_response%20%3E%20(schema)>)

<details>

<summary>

PermissionCreateResponse object {success }

</summary>

success: optional boolean

Whether the update succeeded or not

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_create_response%20%3E%20(schema)>)

<details>

<summary>

PermissionDeleteResponse object {success }

</summary>

success: optional boolean

Whether the update succeeded or not

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_delete_response%20%3E%20(schema)>)

#### Indicator FeedsDownloads