---
title: Cancel a crawl job.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Crawl](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cancel a crawl job.

DELETE/accounts/{account\_id}/browser-rendering/crawl/{job\_id}

Cancels an ongoing crawl job by setting its status to cancelled and stopping all queued URLs.

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

Account ID.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

job\_id: string

The ID of the crawl job to cancel.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {job\_id, message }

</summary>

job\_id: string

The ID of the cancelled job.

<a href="#">Link to this property</a>

message: string

Cancellation confirmation message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Response status.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {code, message }

</summary>

code: number

Error code.

<a href="#">Link to this property</a>

message: string

Error message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

### Cancel a crawl job.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl/$JOB_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "job_id": "job_id",
    "message": "message"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "job_id": "job_id",
    "message": "message"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```