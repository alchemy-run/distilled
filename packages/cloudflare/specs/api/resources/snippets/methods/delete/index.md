---
title: Delete a zone snippet
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Snippets](https://developers.cloudflare.com/api/resources/snippets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a zone snippet

DELETE/zones/{zone\_id}/snippets/{snippet\_name}

Deletes a snippet belonging to the zone. Returns a 4XX response if the zone or snippet no longer exists.

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

`Snippets Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Use this field to specify the unique ID of the zone.

[Link to this property](#)%20snippets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

snippet\_name: string

Identify the snippet.

[Link to this property](#)%20snippets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20snippet_name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

Lists error messages.

</summary>

message: string

Describes the message text.

minLength1

<a href="#">Link to this property</a>

code: optional number

Identify the message code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

Contain warning messages.

</summary>

message: string

Describes the message text.

minLength1

<a href="#">Link to this property</a>

code: optional number

Identify the message code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: unknown

Contain the response result.

[Link to this property](#)%20snippets%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20snippets%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete a zone snippet

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
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
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": {},
  "success": true
}
```