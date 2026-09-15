---
title: Content Scanning
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Content Scanning

##### [Enable Content Scanning for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/methods/enable)

POST/zones/{zone\_id}/content-upload-scan/enable

##### [Disable Content Scanning for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/methods/disable)

POST/zones/{zone\_id}/content-upload-scan/disable

##### [Update the Content Scanning status for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/methods/create)

PUT/zones/{zone\_id}/content-upload-scan/settings

##### [Update the Content Scanning status for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/methods/update)

PUT/zones/{zone\_id}/content-upload-scan/settings

##### [Get the Content Scanning status for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/methods/get)

GET/zones/{zone\_id}/content-upload-scan/settings

##### ModelsExpand Collapse

ContentScanningEnableResponse = unknown

[Link to this property](#)%20content_scanning%20%3E%20(model)%20content_scanning_enable_response%20%3E%20(schema)>)

ContentScanningDisableResponse = unknown

[Link to this property](#)%20content_scanning%20%3E%20(model)%20content_scanning_disable_response%20%3E%20(schema)>)

<details>

<summary>

ContentScanningCreateResponse object {modified, value }

Defines the status for Content Scanning.

</summary>

modified: optional string

Defines the last modification date (ISO 8601) of the Content Scanning status.

<a href="#">Link to this property</a>

value: optional string

Defines the status of Content Scanning.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning%20%3E%20(model)%20content_scanning_create_response%20%3E%20(schema)>)

<details>

<summary>

ContentScanningUpdateResponse object {modified, value }

Defines the status for Content Scanning.

</summary>

modified: optional string

Defines the last modification date (ISO 8601) of the Content Scanning status.

<a href="#">Link to this property</a>

value: optional string

Defines the status of Content Scanning.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning%20%3E%20(model)%20content_scanning_update_response%20%3E%20(schema)>)

<details>

<summary>

ContentScanningGetResponse object {modified, value }

Defines the status for Content Scanning.

</summary>

modified: optional string

Defines the last modification date (ISO 8601) of the Content Scanning status.

<a href="#">Link to this property</a>

value: optional string

Defines the status of Content Scanning.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning%20%3E%20(model)%20content_scanning_get_response%20%3E%20(schema)>)

#### Content ScanningPayloads

##### [List the Content Scanning custom expressions of a zone.](https://developers.cloudflare.com/api/resources/content_scanning/subresources/payloads/methods/list)

GET/zones/{zone\_id}/content-upload-scan/payloads

##### [Create Content Scanning custom expressions for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/subresources/payloads/methods/create)

POST/zones/{zone\_id}/content-upload-scan/payloads

##### [Delete a Content Scanning custom expression from a zone.](https://developers.cloudflare.com/api/resources/content_scanning/subresources/payloads/methods/delete)

DELETE/zones/{zone\_id}/content-upload-scan/payloads/{expression\_id}

##### [Update a Content Scanning custom expression for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/subresources/payloads/methods/update)

PATCH/zones/{zone\_id}/content-upload-scan/payloads/{expression\_id}

##### ModelsExpand Collapse

<details>

<summary>

PayloadListResponse object {id, payload }

Defines a Content Scanning custom expression.

</summary>

id: optional string

Defines the unique ID for this Content Scanning custom expression.

maxLength32

<a href="#">Link to this property</a>

payload: optional string

Defines the custom content extraction expression used to reach content objects in the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning.payloads%20%3E%20(model)%20payload_list_response%20%3E%20(schema)>)

<details>

<summary>

PayloadCreateResponse object {id, payload }

Defines a Content Scanning custom expression.

</summary>

id: optional string

Defines the unique ID for this Content Scanning custom expression.

maxLength32

<a href="#">Link to this property</a>

payload: optional string

Defines the custom content extraction expression used to reach content objects in the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning.payloads%20%3E%20(model)%20payload_create_response%20%3E%20(schema)>)

<details>

<summary>

PayloadDeleteResponse object {id, payload }

Defines a Content Scanning custom expression.

</summary>

id: optional string

Defines the unique ID for this Content Scanning custom expression.

maxLength32

<a href="#">Link to this property</a>

payload: optional string

Defines the custom content extraction expression used to reach content objects in the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning.payloads%20%3E%20(model)%20payload_delete_response%20%3E%20(schema)>)

<details>

<summary>

PayloadUpdateResponse object {id, payload }

Defines a Content Scanning custom expression.

</summary>

id: optional string

Defines the unique ID for this Content Scanning custom expression.

maxLength32

<a href="#">Link to this property</a>

payload: optional string

Defines the custom content extraction expression used to reach content objects in the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning.payloads%20%3E%20(model)%20payload_update_response%20%3E%20(schema)>)

#### Content ScanningSettings

##### [Get the Content Scanning status for a zone.](https://developers.cloudflare.com/api/resources/content_scanning/subresources/settings/methods/get)

GET/zones/{zone\_id}/content-upload-scan/settings

##### ModelsExpand Collapse

<details>

<summary>

SettingGetResponse object {modified, value }

Defines the status for Content Scanning.

</summary>

modified: optional string

Defines the last modification date (ISO 8601) of the Content Scanning status.

<a href="#">Link to this property</a>

value: optional string

Defines the status of Content Scanning.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning.settings%20%3E%20(model)%20setting_get_response%20%3E%20(schema)>)