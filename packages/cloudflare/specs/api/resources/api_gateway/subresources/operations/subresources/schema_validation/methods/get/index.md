---
title: Retrieve operation-level schema validation settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations)

[Schema Validation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieve operation-level schema validation settings

Deprecated: Use \[Schema Validation API](https://developers.cloudflare.com/api/resources/schema\_validation/) instead.

GET/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/schema\_validation

Retrieves operation-level schema validation settings on the zone. Deprecated; use `/zones/{zone_id}/schema_validation/settings/operations/{operation_id}` instead.

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

`Account API Gateway``Account API Gateway Read``Domain API Gateway``Domain API Gateway Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

operation\_id: string

UUID.

maxLength36

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20operation_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20schema_validation_get_response%20%3E%20(schema)%20%3E%20(property)%20mitigation_action>)

operation\_id: optional string

UUID.

maxLength36

minLength36

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20schema_validation_get_response%20%3E%20(schema)%20%3E%20(property)%20operation_id>)

### Retrieve operation-level schema validation settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/schema_validation \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "mitigation_action": "block",
  "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
}
```

##### Returns Examples

200 example

```
{
  "mitigation_action": "block",
  "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
}
```