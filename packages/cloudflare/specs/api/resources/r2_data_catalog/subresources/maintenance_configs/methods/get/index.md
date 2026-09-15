---
title: Get catalog maintenance configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

[Maintenance Configs](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/maintenance_configs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get catalog maintenance configuration

GET/accounts/{account\_id}/r2-catalog/{bucket\_name}/maintenance-configs

Retrieve the maintenance configuration for a specific catalog, including compaction settings and credential status.

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

`Workers R2 Data Catalog Write``Workers R2 Data Catalog Read`

##### P ath ParametersExpand Collapse

account\_id: string

Use this to identify the account.

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Specifies the R2 bucket name.

maxLength63

minLength3

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

Contains errors if the API call was unsuccessful.

</summary>

code: number

Specifies the error code.

<a href="#">Link to this property</a>

message: string

Describes the error.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

Contains informational messages.

</summary>

code: number

Specifies the message code.

<a href="#">Link to this property</a>

message: string

Contains the message text.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {credential\_status, maintenance\_config }

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

[Link to this property](#)%20r2_data_catalog.maintenance_configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get catalog maintenance configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/maintenance-configs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "credential_status": "present",
    "maintenance_config": {
      "compaction": {
        "state": "enabled",
        "target_size_mb": "128"
      },
      "snapshot_expiration": {
        "max_snapshot_age": "7d",
        "min_snapshots_to_keep": 100,
        "state": "enabled"
      }
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "credential_status": "present",
    "maintenance_config": {
      "compaction": {
        "state": "enabled",
        "target_size_mb": "128"
      },
      "snapshot_expiration": {
        "max_snapshot_age": "7d",
        "min_snapshots_to_keep": 100,
        "state": "enabled"
      }
    }
  },
  "success": true
}
```