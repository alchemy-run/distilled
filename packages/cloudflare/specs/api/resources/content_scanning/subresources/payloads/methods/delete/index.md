---
title: Delete a Content Scanning custom expression from a zone.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Content Scanning](https://developers.cloudflare.com/api/resources/content_scanning)

[Payloads](https://developers.cloudflare.com/api/resources/content_scanning/subresources/payloads)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a Content Scanning custom expression from a zone.

DELETE/zones/{zone\_id}/content-upload-scan/payloads/{expression\_id}

Delete the Content Scanning custom expression with the given identifier and return the expressions that remain. Content objects reached only by the deleted expression are no longer scanned.

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

`Zone WAF Write``Account WAF Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20content_scanning.payloads%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

expression\_id: string

Defines the unique ID for this Content Scanning custom expression.

maxLength32

[Link to this property](#)%20content_scanning.payloads%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20expression_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20content_scanning.payloads%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20content_scanning.payloads%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, payload }

</summary>

id: optional string

Defines the unique ID for this Content Scanning custom expression.

maxLength32

<a href="#">Link to this property</a>

payload: optional string

Defines the custom content extraction expression used to reach content objects in the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20content_scanning.payloads%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20content_scanning.payloads%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete a Content Scanning custom expression from a zone.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads/$EXPRESSION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "a350a054caa840c9becd89c3b4f0195b",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
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
  "result": [
    {
      "id": "a350a054caa840c9becd89c3b4f0195b",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true
}
```