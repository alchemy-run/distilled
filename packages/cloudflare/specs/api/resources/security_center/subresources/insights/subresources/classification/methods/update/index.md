---
title: Updates Security Center Insight Classification
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Security Center](https://developers.cloudflare.com/api/resources/security_center)

[Insights](https://developers.cloudflare.com/api/resources/security_center/subresources/insights)

[Classification](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/classification)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Updates Security Center Insight Classification

PATCH/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/{issue\_id}/classification

Updates the user classification for a Security Center insight. Valid values are ‘false\_positive’ or ‘accept\_risk’. To reset, set classification to null. Cannot change directly between classification values - must reset to null first.

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

##### P ath ParametersExpand Collapse

issue\_id: string

[Link to this property](#)%20security_center.insights.classification%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20issue_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20security_center.insights.classification%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20security_center.insights.classification%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

classification: optional "false\_positive"or "accept\_risk"or "other"

User-defined classification for the insight. Can be ‘false\_positive’, ‘accept\_risk’, ‘other’, or null.

</summary>

One of the following:

"false\_positive"

<a href="#">Link to this property</a>

"accept\_risk"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.classification%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20classification%20%3E%20(schema)>)

rationale: optional string

Rationale for the classification change. Required when classification is ‘accept\_risk’ or ‘other’.

[Link to this property](#)%20security_center.insights.classification%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rationale%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.classification%20%3E%20(model)%20classification_update_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.classification%20%3E%20(model)%20classification_update_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20security_center.insights.classification%20%3E%20(model)%20classification_update_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Updates Security Center Insight Classification

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/$ISSUE_ID/classification \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "classification": "false_positive"
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true
}
```