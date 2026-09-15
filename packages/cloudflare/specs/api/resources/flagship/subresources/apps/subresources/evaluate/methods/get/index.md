---
title: Evaluate flag
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Flagship](https://developers.cloudflare.com/api/resources/flagship)

[Apps](https://developers.cloudflare.com/api/resources/flagship/subresources/apps)

[Evaluate](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/evaluate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Evaluate flag

GET/accounts/{account\_id}/flagship/apps/{app\_id}/evaluate

Evaluates a flag against the provided context. Pass context attributes as query parameters; values are forwarded as strings. For low-latency in-Worker evaluation, prefer the Flagship binding over this endpoint.

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

`Flagship Read``Flagship Write``Flagship Evaluate`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID.

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

App identifier.

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

flagKey: string

The flag key to evaluate.

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20flagKey%20%3E%20(schema)>)

targetingKey: optional string

Context targeting key (per OpenFeature spec); used for percentage rollout bucketing.

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20targetingKey%20%3E%20(schema)>)

##### ReturnsExpand Collapse

flagKey: string

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(model)%20evaluate_get_response%20%3E%20(schema)%20%3E%20(property)%20flagKey>)

<details>

<summary>

reason: "TARGETING\_MATCH"or "DEFAULT"or "DISABLED"or "SPLIT"

</summary>

One of the following:

"TARGETING\_MATCH"

<a href="#">Link to this property</a>

"DEFAULT"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"SPLIT"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(model)%20evaluate_get_response%20%3E%20(schema)%20%3E%20(property)%20reason>)

variant: string

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(model)%20evaluate_get_response%20%3E%20(schema)%20%3E%20(property)%20variant>)

<details>

<summary>

value: optional stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(model)%20evaluate_get_response%20%3E%20(schema)%20%3E%20(property)%20value>)

### Evaluate flag

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID/evaluate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "flagKey": "flagKey",
  "reason": "TARGETING_MATCH",
  "variant": "variant",
  "value": "string"
}
```

##### Returns Examples

200 example

```
{
  "flagKey": "flagKey",
  "reason": "TARGETING_MATCH",
  "variant": "variant",
  "value": "string"
}
```