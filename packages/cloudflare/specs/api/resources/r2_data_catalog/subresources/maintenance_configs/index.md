---
title: Maintenance Configs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Maintenance Configs

##### [Get catalog maintenance configuration](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/maintenance_configs/methods/get)

GET/accounts/{account\_id}/r2-catalog/{bucket\_name}/maintenance-configs

##### [Update catalog maintenance configuration](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/maintenance_configs/methods/update)

POST/accounts/{account\_id}/r2-catalog/{bucket\_name}/maintenance-configs

##### ModelsExpand Collapse

<details>

<summary>

MaintenanceConfigGetResponse object {credential\_status, maintenance\_config }

Contains maintenance configuration and credential status.

</summary>

<details>

<summary>

credential\_status: "present"or "absent"

Shows the credential configuration status.

</summary>

One of the following:

"present"

<a href="#">Link to this property</a>

"absent"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

maintenance\_config: object {compaction, interval, snapshot\_expiration }

Configures maintenance for the catalog.

</summary>

<details>

<summary>

compaction: optional object {state, target\_size\_mb }

Configures compaction for catalog maintenance.

</summary>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target\_size\_mb: "64"or "128"or "256"or "512"

Sets the target file size for compaction in megabytes. Defaults to “128”.

</summary>

One of the following:

"64"

<a href="#">Link to this property</a>

"128"

<a href="#">Link to this property</a>

"256"

<a href="#">Link to this property</a>

"512"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

Scheduling interval between normal table maintenance runs.

<a href="#">Link to this property</a>

<details>

<summary>

snapshot\_expiration: optional object {max\_snapshot\_age, min\_snapshots\_to\_keep, state }

Configures snapshot expiration settings.

</summary>

max\_snapshot\_age: string

Specifies the maximum age for snapshots. The system deletes snapshots older than this age. Format: where unit is d (days), h (hours), m (minutes), or s (seconds). Examples: “7d” (7 days), “48h” (48 hours), “2880m” (2,880 minutes). Defaults to “7d”.

<a href="#">Link to this property</a>

min\_snapshots\_to\_keep: number

Specifies the minimum number of snapshots to retain. Defaults to 100.

formatint64

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(model)%20maintenance_config_get_response%20%3E%20(schema)>)

<details>

<summary>

MaintenanceConfigUpdateResponse object {compaction, interval, snapshot\_expiration }

Configures maintenance for the catalog.

</summary>

<details>

<summary>

compaction: optional object {state, target\_size\_mb }

Configures compaction for catalog maintenance.

</summary>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target\_size\_mb: "64"or "128"or "256"or "512"

Sets the target file size for compaction in megabytes. Defaults to “128”.

</summary>

One of the following:

"64"

<a href="#">Link to this property</a>

"128"

<a href="#">Link to this property</a>

"256"

<a href="#">Link to this property</a>

"512"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

Scheduling interval between normal table maintenance runs.

<a href="#">Link to this property</a>

<details>

<summary>

snapshot\_expiration: optional object {max\_snapshot\_age, min\_snapshots\_to\_keep, state }

Configures snapshot expiration settings.

</summary>

max\_snapshot\_age: string

Specifies the maximum age for snapshots. The system deletes snapshots older than this age. Format: where unit is d (days), h (hours), m (minutes), or s (seconds). Examples: “7d” (7 days), “48h” (48 hours), “2880m” (2,880 minutes). Defaults to “7d”.

<a href="#">Link to this property</a>

min\_snapshots\_to\_keep: number

Specifies the minimum number of snapshots to retain. Defaults to 100.

formatint64

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(model)%20maintenance_config_update_response%20%3E%20(schema)>)