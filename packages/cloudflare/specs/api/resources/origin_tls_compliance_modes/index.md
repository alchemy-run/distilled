---
title: Origin TLS Compliance Modes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Origin TLS Compliance Modes

##### [Get Origin TLS Compliance Modes setting](https://developers.cloudflare.com/api/resources/origin_tls_compliance_modes/methods/get)

GET/zones/{zone\_id}/settings/origin\_tls\_compliance\_modes

##### [Replace Origin TLS Compliance Modes setting](https://developers.cloudflare.com/api/resources/origin_tls_compliance_modes/methods/update)

PUT/zones/{zone\_id}/settings/origin\_tls\_compliance\_modes

##### [Change Origin TLS Compliance Modes setting](https://developers.cloudflare.com/api/resources/origin_tls_compliance_modes/methods/edit)

PATCH/zones/{zone\_id}/settings/origin\_tls\_compliance\_modes

##### [Delete Origin TLS Compliance Modes setting](https://developers.cloudflare.com/api/resources/origin_tls_compliance_modes/methods/delete)

DELETE/zones/{zone\_id}/settings/origin\_tls\_compliance\_modes

##### ModelsExpand Collapse

<details>

<summary>

OriginTLSComplianceModeGetResponse object {id, editable, value, modified\_on }

</summary>

id: "origin\_tls\_compliance\_modes"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

value: array of string

List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone’s origin. Currently supported values are <code>fips</code> (FIPS-approved curves) and <code>pqh</code> (post-quantum hybrid). Future modes (e.g. <code>cnsa2</code>) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_compliance_modes%20%3E%20(model)%20origin_tls_compliance_mode_get_response%20%3E%20(schema)>)

<details>

<summary>

OriginTLSComplianceModeUpdateResponse object {id, editable, value, modified\_on }

</summary>

id: "origin\_tls\_compliance\_modes"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

value: array of string

List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone’s origin. Currently supported values are <code>fips</code> (FIPS-approved curves) and <code>pqh</code> (post-quantum hybrid). Future modes (e.g. <code>cnsa2</code>) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_compliance_modes%20%3E%20(model)%20origin_tls_compliance_mode_update_response%20%3E%20(schema)>)

<details>

<summary>

OriginTLSComplianceModeEditResponse object {id, editable, value, modified\_on }

</summary>

id: "origin\_tls\_compliance\_modes"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

value: array of string

List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone’s origin. Currently supported values are <code>fips</code> (FIPS-approved curves) and <code>pqh</code> (post-quantum hybrid). Future modes (e.g. <code>cnsa2</code>) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_compliance_modes%20%3E%20(model)%20origin_tls_compliance_mode_edit_response%20%3E%20(schema)>)

<details>

<summary>

OriginTLSComplianceModeDeleteResponse object {id, editable, modified\_on }

</summary>

id: "origin\_tls\_compliance\_modes"

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

[Link to this property](#)%20origin_tls_compliance_modes%20%3E%20(model)%20origin_tls_compliance_mode_delete_response%20%3E%20(schema)>)