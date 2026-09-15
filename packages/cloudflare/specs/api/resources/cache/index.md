---
title: Cache
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cache

##### [Purge Cached Content](https://developers.cloudflare.com/api/resources/cache/methods/purge)

POST/zones/{zone\_id}/purge\_cache

##### [Purge Cached Content by Environment](https://developers.cloudflare.com/api/resources/cache/methods/purge_environment)

POST/zones/{zone\_id}/environments/{environment\_id}/purge\_cache

##### ModelsExpand Collapse

<details>

<summary>

CachePurgeResponse object {id }

</summary>

id: string

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache%20%3E%20(model)%20cache_purge_response%20%3E%20(schema)>)

<details>

<summary>

CachePurgeEnvironmentResponse object {id }

</summary>

id: string

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache%20%3E%20(model)%20cache_purge_environment_response%20%3E%20(schema)>)

#### CacheCache Reserve

##### [Get Cache Reserve setting](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/get)

GET/zones/{zone\_id}/cache/cache\_reserve

##### [Change Cache Reserve setting](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/edit)

PATCH/zones/{zone\_id}/cache/cache\_reserve

##### [Get Cache Reserve Clear](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/status)

GET/zones/{zone\_id}/cache/cache\_reserve\_clear

##### [Start Cache Reserve Clear](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/clear)

POST/zones/{zone\_id}/cache/cache\_reserve\_clear

##### ModelsExpand Collapse

CacheReserve = "cache\_reserve"

The identifier of the caching setting.

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve%20%3E%20(schema)>)

CacheReserveClear = "cache\_reserve\_clear"

ID of the zone setting.

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)>)

<details>

<summary>

State = "In-progress"or "Completed"

The current state of the Cache Reserve Clear operation.

</summary>

One of the following:

"In-progress"

<a href="#">Link to this property</a>

"Completed"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)>)

<details>

<summary>

CacheReserveGetResponse object {id, editable, value, modified\_on }

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve%20%3E%20(schema)">CacheReserve</a>

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Cache Reserve zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_get_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveEditResponse object {id, editable, value, modified\_on }

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve%20%3E%20(schema)">CacheReserve</a>

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Cache Reserve zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_edit_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveStatusResponse object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

state: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)">State</a>

The current state of the Cache Reserve Clear operation.

<a href="#">Link to this property</a>

end\_ts: optional string

The time that the latest Cache Reserve Clear operation completed.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_status_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveClearResponse object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

state: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)">State</a>

The current state of the Cache Reserve Clear operation.

<a href="#">Link to this property</a>

end\_ts: optional string

The time that the latest Cache Reserve Clear operation completed.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear_response%20%3E%20(schema)>)

#### CacheSmart Tiered Cache

##### [Get Smart Tiered Cache setting](https://developers.cloudflare.com/api/resources/cache/subresources/smart_tiered_cache/methods/get)

GET/zones/{zone\_id}/cache/tiered\_cache\_smart\_topology\_enable

##### [Create Smart Tiered Cache setting](https://developers.cloudflare.com/api/resources/cache/subresources/smart_tiered_cache/methods/create)

POST/zones/{zone\_id}/cache/tiered\_cache\_smart\_topology\_enable

##### [Patch Smart Tiered Cache setting](https://developers.cloudflare.com/api/resources/cache/subresources/smart_tiered_cache/methods/edit)

PATCH/zones/{zone\_id}/cache/tiered\_cache\_smart\_topology\_enable

##### [Delete Smart Tiered Cache setting](https://developers.cloudflare.com/api/resources/cache/subresources/smart_tiered_cache/methods/delete)

DELETE/zones/{zone\_id}/cache/tiered\_cache\_smart\_topology\_enable

##### ModelsExpand Collapse

<details>

<summary>

SmartTieredCacheGetResponse object {id, editable, value, modified\_on }

</summary>

id: "tiered\_cache\_smart\_topology\_enable"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Smart Tiered Cache zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.smart_tiered_cache%20%3E%20(model)%20smart_tiered_cache_get_response%20%3E%20(schema)>)

<details>

<summary>

SmartTieredCacheCreateResponse object {id, editable, value, modified\_on }

</summary>

id: "tiered\_cache\_smart\_topology\_enable"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Smart Tiered Cache zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.smart_tiered_cache%20%3E%20(model)%20smart_tiered_cache_create_response%20%3E%20(schema)>)

<details>

<summary>

SmartTieredCacheEditResponse object {id, editable, value, modified\_on }

</summary>

id: "tiered\_cache\_smart\_topology\_enable"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Smart Tiered Cache zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.smart_tiered_cache%20%3E%20(model)%20smart_tiered_cache_edit_response%20%3E%20(schema)>)

<details>

<summary>

SmartTieredCacheDeleteResponse object {id, editable, modified\_on }

</summary>

id: "tiered\_cache\_smart\_topology\_enable"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.smart_tiered_cache%20%3E%20(model)%20smart_tiered_cache_delete_response%20%3E%20(schema)>)

#### CacheVariants

##### [Get variants setting](https://developers.cloudflare.com/api/resources/cache/subresources/variants/methods/get)

GET/zones/{zone\_id}/cache/variants

##### [Change variants setting](https://developers.cloudflare.com/api/resources/cache/subresources/variants/methods/edit)

PATCH/zones/{zone\_id}/cache/variants

##### [Delete variants setting](https://developers.cloudflare.com/api/resources/cache/subresources/variants/methods/delete)

DELETE/zones/{zone\_id}/cache/variants

##### ModelsExpand Collapse

<details>

<summary>

CacheVariant object {id, modified\_on }

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the ‘Vary: Accept’ response header. If the origin server sends ‘Vary: Accept’ but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

</summary>

id: "variants"

ID of the zone setting.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20cache_variant%20%3E%20(schema)>)

<details>

<summary>

VariantGetResponse object {id, editable, value, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {avif, bmp, gif, 8 more }

Value of the zone setting.

</summary>

avif: optional array of string

List of strings with the MIME types of all the variants that should be served for avif.

<a href="#">Link to this property</a>

bmp: optional array of string

List of strings with the MIME types of all the variants that should be served for bmp.

<a href="#">Link to this property</a>

gif: optional array of string

List of strings with the MIME types of all the variants that should be served for gif.

<a href="#">Link to this property</a>

jp2: optional array of string

List of strings with the MIME types of all the variants that should be served for jp2.

<a href="#">Link to this property</a>

jpeg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpeg.

<a href="#">Link to this property</a>

jpg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg.

<a href="#">Link to this property</a>

jpg2: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg2.

<a href="#">Link to this property</a>

png: optional array of string

List of strings with the MIME types of all the variants that should be served for png.

<a href="#">Link to this property</a>

tif: optional array of string

List of strings with the MIME types of all the variants that should be served for tif.

<a href="#">Link to this property</a>

tiff: optional array of string

List of strings with the MIME types of all the variants that should be served for tiff.

<a href="#">Link to this property</a>

webp: optional array of string

List of strings with the MIME types of all the variants that should be served for webp.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20variant_get_response%20%3E%20(schema)>)

<details>

<summary>

VariantEditResponse object {id, editable, value, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {avif, bmp, gif, 8 more }

Value of the zone setting.

</summary>

avif: optional array of string

List of strings with the MIME types of all the variants that should be served for avif.

<a href="#">Link to this property</a>

bmp: optional array of string

List of strings with the MIME types of all the variants that should be served for bmp.

<a href="#">Link to this property</a>

gif: optional array of string

List of strings with the MIME types of all the variants that should be served for gif.

<a href="#">Link to this property</a>

jp2: optional array of string

List of strings with the MIME types of all the variants that should be served for jp2.

<a href="#">Link to this property</a>

jpeg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpeg.

<a href="#">Link to this property</a>

jpg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg.

<a href="#">Link to this property</a>

jpg2: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg2.

<a href="#">Link to this property</a>

png: optional array of string

List of strings with the MIME types of all the variants that should be served for png.

<a href="#">Link to this property</a>

tif: optional array of string

List of strings with the MIME types of all the variants that should be served for tif.

<a href="#">Link to this property</a>

tiff: optional array of string

List of strings with the MIME types of all the variants that should be served for tiff.

<a href="#">Link to this property</a>

webp: optional array of string

List of strings with the MIME types of all the variants that should be served for webp.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20variant_edit_response%20%3E%20(schema)>)

<details>

<summary>

VariantDeleteResponse object {id, editable, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20variant_delete_response%20%3E%20(schema)>)

#### CacheRegional Tiered Cache

##### [Get Regional Tiered Cache setting](https://developers.cloudflare.com/api/resources/cache/subresources/regional_tiered_cache/methods/get)

GET/zones/{zone\_id}/cache/regional\_tiered\_cache

##### [Change Regional Tiered Cache setting](https://developers.cloudflare.com/api/resources/cache/subresources/regional_tiered_cache/methods/edit)

PATCH/zones/{zone\_id}/cache/regional\_tiered\_cache

##### ModelsExpand Collapse

RegionalTieredCache = "tc\_regional"

The identifier of the caching setting.

[Link to this property](#)%20cache.regional_tiered_cache%20%3E%20(model)%20regional_tiered_cache%20%3E%20(schema)>)

<details>

<summary>

RegionalTieredCacheGetResponse object {id, editable, value, modified\_on }

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.regional_tiered_cache%20%3E%20(model)%20regional_tiered_cache%20%3E%20(schema)">RegionalTieredCache</a>

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Regional Tiered Cache zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.regional_tiered_cache%20%3E%20(model)%20regional_tiered_cache_get_response%20%3E%20(schema)>)

<details>

<summary>

RegionalTieredCacheEditResponse object {id, editable, value, modified\_on }

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.regional_tiered_cache%20%3E%20(model)%20regional_tiered_cache%20%3E%20(schema)">RegionalTieredCache</a>

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Regional Tiered Cache zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.regional_tiered_cache%20%3E%20(model)%20regional_tiered_cache_edit_response%20%3E%20(schema)>)

#### CacheOrigin Cloud Regions

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