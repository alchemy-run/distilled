---
title: Get dataset download URL
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Datasets](https://developers.cloudflare.com/api/resources/radar/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get dataset download URL

POST/radar/datasets/download

Retrieves an URL to download a single dataset.

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

`User Details Write``User Details Read`

##### Q uery ParametersExpand Collapse

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

datasetId: number

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20download%20%3E%20(params)%200%20%3E%20(param)%20datasetId%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {dataset }

</summary>

<details>

<summary>

dataset: object {url }

</summary>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20download%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get dataset download URL

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/datasets/download \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "datasetId": 3
        }'
```

200 example

```
{
  "result": {
    "dataset": {
      "url": "https://example.com/download"
    }
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "dataset": {
      "url": "https://example.com/download"
    }
  }
}
```