---
title: Update a custom detection location of a zone.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Leaked Credential Checks](https://developers.cloudflare.com/api/resources/leaked_credential_checks)

[Detections](https://developers.cloudflare.com/api/resources/leaked_credential_checks/subresources/detections)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a custom detection location of a zone.

PUT/zones/{zone\_id}/leaked-credential-checks/detections/{detection\_id}

Update the username and password expressions of an existing detection location, identified by its detection ID. Both expressions are overwritten, so omitting the password expression clears it.

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

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

detection\_id: string

Defines the unique ID for this custom detection.

maxLength32

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20detection_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

password: optional string

Defines ehe ruleset expression to use in matching the password in a request.

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20password%20%3E%20(schema)>)

username: optional string

Defines the ruleset expression to use in matching the username in a request.

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20username%20%3E%20(schema)>)

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

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, password, username }

Defines a custom set of username/password expressions to match Leaked Credential Checks on.

</summary>

id: optional string

Defines the unique ID for this custom detection.

maxLength32

<a href="#">Link to this property</a>

password: optional string

Defines ehe ruleset expression to use in matching the password in a request.

<a href="#">Link to this property</a>

username: optional string

Defines the ruleset expression to use in matching the username in a request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update a custom detection location of a zone.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections/$DETECTION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "password": "lookup_json_string(http.request.body.raw, \\"secret\\")",
          "username": "lookup_json_string(http.request.body.raw, \\"user\\")"
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
  "result": {
    "id": "18a14bafaa8eb1df04ce683ec18c765e",
    "password": "lookup_json_string(http.request.body.raw, \"secret\")",
    "username": "lookup_json_string(http.request.body.raw, \"user\")"
  },
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
  "result": {
    "id": "18a14bafaa8eb1df04ce683ec18c765e",
    "password": "lookup_json_string(http.request.body.raw, \"secret\")",
    "username": "lookup_json_string(http.request.body.raw, \"user\")"
  },
  "success": true
}
```