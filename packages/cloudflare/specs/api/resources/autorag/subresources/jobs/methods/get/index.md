---
title: Get a Job Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AutoRAG](https://developers.cloudflare.com/api/resources/autorag)

[Jobs](https://developers.cloudflare.com/api/resources/autorag/subresources/jobs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a Job Details

Deprecated: Use AI Search instead.

GET/accounts/{account\_id}/autorag/rags/{id}/jobs/{job\_id}

Returns details for an AutoRAG job.

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

`Auto Rag Write``Auto Rag Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20autorag.jobs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

rag id

maxLength32

minLength1

[Link to this property](#)%20autorag.jobs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

job\_id: string

[Link to this property](#)%20autorag.jobs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, source, end\_reason, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "schedule"

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"schedule"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end\_reason: optional string

<a href="#">Link to this property</a>

ended\_at: optional string

<a href="#">Link to this property</a>

last\_seen\_at: optional string

<a href="#">Link to this property</a>

started\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag.jobs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20autorag.jobs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get a Job Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/jobs/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "id",
    "source": "user",
    "end_reason": "end_reason",
    "ended_at": "ended_at",
    "last_seen_at": "last_seen_at",
    "started_at": "started_at"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "id",
    "source": "user",
    "end_reason": "end_reason",
    "ended_at": "ended_at",
    "last_seen_at": "last_seen_at",
    "started_at": "started_at"
  },
  "success": true
}
```