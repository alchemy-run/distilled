---
title: Upload asset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Assets](https://developers.cloudflare.com/api/resources/pages/subresources/assets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload asset

POST/pages/assets/upload

Upload one or more files to the Pages asset store. Each file is identified by its content hash and is uploaded using the same JSON shape as the Cloudflare KV bulk write API. Used as part of the Pages Direct Upload workflow.

Authenticate with the JWT obtained from the upload-token endpoint: GET /accounts/{account\_id}/pages/projects/{project\_name}/upload-token

##### Security

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: array of object {base64, key, metadata, value }

</summary>

base64: boolean

Whether value is base64 encoded.

<a href="#">Link to this property</a>

key: string

File content hash used as the object key in the Pages asset store.

<a href="#">Link to this property</a>

<details>

<summary>

metadata: object {contentType }

</summary>

contentType: string

MIME type for the uploaded file.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

File content. When base64 is true, this value is base64 encoded.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.assets%20%3E%20(method)%20upload%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20pages.assets%20%3E%20(model)%20asset_upload_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20pages.assets%20%3E%20(model)%20asset_upload_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20pages.assets%20%3E%20(model)%20asset_upload_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Upload asset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/pages/assets/upload \
    -H 'Content-Type: application/json' \
    -d '[
          {
            "base64": true,
            "key": "b026324c6904b2a9cb4b88d6d61c81d1",
            "metadata": {
              "contentType": "text/plain"
            },
            "value": "SGVsbG8sIFdvcmxkIQ=="
          }
        ]'
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