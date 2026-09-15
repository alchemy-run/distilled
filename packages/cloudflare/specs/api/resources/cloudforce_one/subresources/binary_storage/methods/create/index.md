---
title: Posts a file to Binary Storage
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Binary Storage](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/binary_storage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Posts a file to Binary Storage

POST/accounts/{account\_id}/cloudforce-one/binary

Uploads a binary file to Cloudforce One’s binary database for malware analysis and threat intelligence correlation.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

file: file

The binary file content to upload.

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20file%20%3E%20(schema)>)

##### ReturnsExpand Collapse

content\_type: string

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(model)%20binary_storage_create_response%20%3E%20(schema)%20%3E%20(property)%20content_type>)

md5: string

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(model)%20binary_storage_create_response%20%3E%20(schema)%20%3E%20(property)%20md5>)

sha1: string

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(model)%20binary_storage_create_response%20%3E%20(schema)%20%3E%20(property)%20sha1>)

sha256: string

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(model)%20binary_storage_create_response%20%3E%20(schema)%20%3E%20(property)%20sha256>)

### Posts a file to Binary Storage

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file'
```

200 example

```
{
  "content_type": "text/plain",
  "md5": "5d84ade76d2a8387c81175bb0cbe6492",
  "sha1": "9aff6879626d957eafadda044e4f879aae1e7278",
  "sha256": "0000a7f2692ef479e2e3d02661568882cadec451cc8a64d4e7faca29810cd626"
}
```

##### Returns Examples

200 example

```
{
  "content_type": "text/plain",
  "md5": "5d84ade76d2a8387c81175bb0cbe6492",
  "sha1": "9aff6879626d957eafadda044e4f879aae1e7278",
  "sha256": "0000a7f2692ef479e2e3d02661568882cadec451cc8a64d4e7faca29810cd626"
}
```