---
title: Snapshots
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Snapshots

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