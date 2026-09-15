---
title: Origin Cloud Regions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Origin Cloud Regions

##### [List origin cloud region mappings](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/list)

GET/zones/{zone\_id}/origin/cloud\_regions

##### [Get an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/get)

GET/zones/{zone\_id}/origin/cloud\_regions/{origin\_ip}

##### [Create or replace an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/update)

PUT/zones/{zone\_id}/origin/cloud\_regions/{origin\_ip}

##### [Delete an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/delete)

DELETE/zones/{zone\_id}/origin/cloud\_regions/{origin\_ip}

##### [Batch create or replace origin cloud region mappings](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/bulk_update)

PUT/zones/{zone\_id}/origin/cloud\_regions/batch

##### [Batch delete origin cloud region mappings](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/bulk_delete)

DELETE/zones/{zone\_id}/origin/cloud\_regions/batch

##### [List supported cloud vendors and regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/supported_regions)

GET/zones/{zone\_id}/origin/cloud\_regions/supported\_regions

##### [List origin cloud region mappings](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/list_v1)

Deprecated

GET/zones/{zone\_id}/cache/origin\_cloud\_regions

##### [Create an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/create_v1)

Deprecated

POST/zones/{zone\_id}/cache/origin\_cloud\_regions

##### [Create or update an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/edit_v1)

Deprecated

PATCH/zones/{zone\_id}/cache/origin\_cloud\_regions

##### [Get an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/get_v1)

Deprecated

GET/zones/{zone\_id}/cache/origin\_cloud\_regions/{origin\_ip}

##### [Delete an origin cloud region mapping](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/delete_v1)

Deprecated

DELETE/zones/{zone\_id}/cache/origin\_cloud\_regions/{origin\_ip}

##### [Batch create or update origin cloud region mappings](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/bulk_edit_v1)

Deprecated

PATCH/zones/{zone\_id}/cache/origin\_cloud\_regions/batch

##### [Batch delete origin cloud region mappings](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/bulk_delete_v1)

Deprecated

DELETE/zones/{zone\_id}/cache/origin\_cloud\_regions/batch

##### [List supported cloud vendors and regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions/methods/supported_regions_v1)

Deprecated

GET/zones/{zone\_id}/cache/origin\_cloud\_regions/supported\_regions

##### ModelsExpand Collapse

<details>

<summary>

OriginCloudRegion object {origin\_ip, region, vendor, modified\_on }

A single origin IP-to-cloud-region mapping.

</summary>

origin\_ip: string

The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionDeleteResponse object {origin\_ip }

Response result for a delete operation. Identifies the deleted mapping.

</summary>

origin\_ip: string

The origin IP address whose mapping was deleted.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_delete_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionBulkUpdateResponse object {failed, succeeded }

Response result for a batch origin cloud region operation.

</summary>

<details>

<summary>

failed: array of object {origin\_ip, error, region, vendor }

Items that could not be applied, with error details.

</summary>

origin\_ip: string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

succeeded: array of object {origin\_ip, error, region, vendor }

Items that were successfully applied.

</summary>

origin\_ip: string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_bulk_update_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionBulkDeleteResponse object {failed, succeeded }

Response result for a batch origin cloud region operation.

</summary>

<details>

<summary>

failed: array of object {origin\_ip, error, region, vendor }

Items that could not be applied, with error details.

</summary>

origin\_ip: string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

succeeded: array of object {origin\_ip, error, region, vendor }

Items that were successfully applied.

</summary>

origin\_ip: string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionSupportedRegionsResponse object {obtained\_codes, vendors }

Cloud vendors and their supported regions for origin cloud region mappings.

</summary>

obtained\_codes: boolean

Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the <code>upper_tier_colos</code> field on each region. When <code>false</code>, the <code>upper_tier_colos</code> arrays may be empty or incomplete.

<a href="#">Link to this property</a>

<details>

<summary>

vendors: map\[array of object {name, upper\_tier\_colos } ]

Map of vendor name to list of supported regions.

</summary>

name: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

upper\_tier\_colos: array of string

Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_supported_regions_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionListV1Response object {id, editable, value, modified\_on }

Response result for a list of origin cloud region mappings.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: array of object {"origin-ip", region, vendor, modified\_on }

</summary>

"origin-ip": string

The origin IP address (IPv4 or IPv6, canonicalized).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping set was last modified. Null when no mappings exist.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_list_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionCreateV1Response object {id, editable, value, modified\_on }

Response result for a single origin cloud region mapping.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {"origin-ip", region, vendor, modified\_on }

A single origin IP-to-cloud-region mapping.

</summary>

"origin-ip": string

The origin IP address (IPv4 or IPv6, canonicalized).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_create_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionEditV1Response object {id, editable, value, modified\_on }

Response result for a list of origin cloud region mappings.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: array of object {"origin-ip", region, vendor, modified\_on }

</summary>

"origin-ip": string

The origin IP address (IPv4 or IPv6, canonicalized).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping set was last modified. Null when no mappings exist.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_edit_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionGetV1Response object {id, editable, value, modified\_on }

Response result for a single origin cloud region mapping.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {"origin-ip", region, vendor, modified\_on }

A single origin IP-to-cloud-region mapping.

</summary>

"origin-ip": string

The origin IP address (IPv4 or IPv6, canonicalized).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_get_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionDeleteV1Response object {id, editable, value, modified\_on }

Response result for a single origin cloud region mapping.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {"origin-ip", region, vendor, modified\_on }

A single origin IP-to-cloud-region mapping.

</summary>

"origin-ip": string

The origin IP address (IPv4 or IPv6, canonicalized).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_delete_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionBulkEditV1Response object {id, editable, value, modified\_on }

Response result for a batch origin cloud region operation.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {failed, succeeded }

</summary>

<details>

<summary>

failed: array of object {"origin-ip", error, region, vendor }

Items that could not be applied, with error details.

</summary>

"origin-ip": string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

succeeded: array of object {"origin-ip", error, region, vendor }

Items that were successfully applied.

</summary>

"origin-ip": string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping set was last modified. Null when no items were successfully applied.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_bulk_edit_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionBulkDeleteV1Response object {id, editable, value, modified\_on }

Response result for a batch origin cloud region operation.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {failed, succeeded }

</summary>

<details>

<summary>

failed: array of object {"origin-ip", error, region, vendor }

Items that could not be applied, with error details.

</summary>

"origin-ip": string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

succeeded: array of object {"origin-ip", error, region, vendor }

Items that were successfully applied.

</summary>

"origin-ip": string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping set was last modified. Null when no items were successfully applied.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_bulk_delete_v1_response%20%3E%20(schema)>)

<details>

<summary>

OriginCloudRegionSupportedRegionsV1Response object {obtained\_codes, vendors }

Cloud vendors and their supported regions for origin cloud region mappings.

</summary>

obtained\_codes: boolean

Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the <code>upper_tier_colos</code> field on each region. When <code>false</code>, the <code>upper_tier_colos</code> arrays may be empty or incomplete.

<a href="#">Link to this property</a>

<details>

<summary>

vendors: map\[array of object {name, upper\_tier\_colos } ]

Map of vendor name to list of supported regions.

</summary>

name: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

upper\_tier\_colos: array of string

Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region_supported_regions_v1_response%20%3E%20(schema)>)