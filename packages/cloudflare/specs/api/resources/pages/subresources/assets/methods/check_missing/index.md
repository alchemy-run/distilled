---
title: Check missing assets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Assets](https://developers.cloudflare.com/api/resources/pages/subresources/assets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Check missing assets

POST/pages/assets/check-missing

Check which of the provided file hashes are missing from the Pages asset store. Returns a list of missing hashes that need to be uploaded. Used as part of the Pages Direct Upload workflow.

Authenticate with the JWT obtained from the upload-token endpoint: GET /accounts/{account\_id}/pages/projects/{project\_name}/upload-token

##### Security

##### Body ParametersJSONExpand Collapse

hashes: array of string

List of file content hashes to check for existence in the asset store.

[Link to this property](#)%20pages.assets%20%3E%20(method)%20check_missing%20%3E%20(params)%200%20%3E%20(param)%20hashes%20%3E%20(schema)>)

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

[Link to this property](#)%20pages.assets%20%3E%20(method)%20check_missing%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20pages.assets%20%3E%20(method)%20check_missing%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: array of string

List of file content hashes that are missing from the asset store and need to be uploaded.

[Link to this property](#)%20pages.assets%20%3E%20(method)%20check_missing%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20pages.assets%20%3E%20(method)%20check_missing%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Check missing assets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/pages/assets/check-missing \
    -H 'Content-Type: application/json' \
    -d '{
          "hashes": [
            "a948904f2f0f479b8f936b8a0c5d9882",
            "b026324c6904b2a9cb4b88d6d61c81d1"
          ]
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
  "result": [
    "b026324c6904b2a9cb4b88d6d61c81d1"
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
    "b026324c6904b2a9cb4b88d6d61c81d1"
  ],
  "success": true
}
```