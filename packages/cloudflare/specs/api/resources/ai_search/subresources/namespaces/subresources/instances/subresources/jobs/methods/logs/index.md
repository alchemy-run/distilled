---
title: List Job Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances)

[Jobs](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/jobs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Job Logs

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job\_id}/logs

Lists log entries for an AI Search indexing job.

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

account\_id: string

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

id: string

AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

maxLength64

minLength1

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

job\_id: string

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

minimum1

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum500

minimum0

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, created\_at, message, message\_type }

</summary>

id: number

<a href="#">Link to this property</a>

created\_at: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

message\_type: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, total\_count }

</summary>

count: number

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20ai_search.namespaces.instances.jobs%20%3E%20(method)%20logs%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Job Logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/jobs/$JOB_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": 0,
      "created_at": 0,
      "message": "message",
      "message_type": 0
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "id": 0,
      "created_at": 0,
      "message": "message",
      "message_type": 0
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```