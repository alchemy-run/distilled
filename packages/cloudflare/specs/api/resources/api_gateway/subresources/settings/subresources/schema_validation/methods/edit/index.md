---
title: Update zone level schema validation settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings)

[Schema Validation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update zone level schema validation settings

Deprecated: Use \[Schema Validation API](https://developers.cloudflare.com/api/resources/schema\_validation/) instead.

PATCH/zones/{zone\_id}/api\_gateway/settings/schema\_validation

Updates zone level schema validation settings on the zone. Deprecated; use `/zones/{zone_id}/schema_validation/settings` instead.

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

`Account API Gateway``Domain API Gateway`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20api_gateway.settings.schema_validation%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

validation\_default\_mitigation\_action: optional "none"or "log"or "block"

The default mitigation action used when there is no mitigation action defined on the operation Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema

A special value of of <code>none</code> will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

<code>null</code> will have no effect.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.settings.schema_validation%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20validation_default_mitigation_action%20%3E%20(schema)>)

<details>

<summary>

validation\_override\_mitigation\_action: optional "none"or "disable\_override"

When set, this overrides both zone level and operation level mitigation actions.

- <code>none</code> will skip running schema validation entirely for the request

To clear any override, use the special value <code>disable_override</code>

<code>null</code> will have no effect.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"disable\_override"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.settings.schema_validation%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20validation_override_mitigation_action%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

Settings object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: optional "none"or "log"or "block"

The default mitigation action used when there is no mitigation action defined on the operation

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema

A special value of of <code>none</code> will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_override\_mitigation\_action: optional "none"

When set, this overrides both zone level and operation level mitigation actions.

- <code>none</code> will skip running schema validation entirely for the request
- <code>null</code> indicates that no override is in place

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.settings%20%3E%20(model)%20settings%20%3E%20(schema)>)

### Update zone level schema validation settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/settings/schema_validation \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block",
          "validation_override_mitigation_action": "none"
        }'
```

200 example

```
{
  "validation_default_mitigation_action": "block",
  "validation_override_mitigation_action": "none"
}
```

##### Returns Examples

200 example

```
{
  "validation_default_mitigation_action": "block",
  "validation_override_mitigation_action": "none"
}
```