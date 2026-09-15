---
title: Change email classification
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Reclassify](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/reclassify)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Change email classification

POST/accounts/{account\_id}/email-security/investigate/{investigate\_id}/reclassify

Submits a request to reclassify an email’s disposition. Use for reporting false positives or false negatives. Optionally provide the raw EML content for reanalysis. The reclassification is processed asynchronously.

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

`Cloud Email Security: Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

investigate\_id: string

Unique identifier for a message retrieved from investigation.

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20investigate_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

expected\_disposition: "NONE"or "BULK"or "MALICIOUS"or 3 more

</summary>

One of the following:

"NONE"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"MALICIOUS"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expected_disposition%20%3E%20(schema)>)

eml\_content: optional string

Base64 encoded content of the EML file.

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20eml_content%20%3E%20(schema)>)

escalated\_submission\_id: optional string

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20escalated_submission_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: unknown

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.reclassify%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Change email classification

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/reclassify \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expected_disposition": "NONE"
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
  "result": {},
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
  "result": {},
  "success": true
}
```