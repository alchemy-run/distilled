---
title: Get job logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Super Slurper](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper)

[Jobs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs)

[Logs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get job logs

GET/accounts/{account\_id}/slurper/jobs/{job\_id}/logs

Gets log entries for an R2 Super Slurper migration job, showing migration status changes, errors, etc.

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

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

job\_id: string

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

limit: optional number

maximum50

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

minLength1

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

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional array of object {createdAt, job, logType, 2 more }

</summary>

createdAt: optional string

<a href="#">Link to this property</a>

job: optional string

<a href="#">Link to this property</a>

<details>

<summary>

logType: optional "migrationStart"or "migrationComplete"or "migrationAbort"or 12 more

</summary>

One of the following:

"migrationStart"

<a href="#">Link to this property</a>

"migrationComplete"

<a href="#">Link to this property</a>

"migrationAbort"

<a href="#">Link to this property</a>

"migrationError"

<a href="#">Link to this property</a>

"migrationPause"

<a href="#">Link to this property</a>

"migrationResume"

<a href="#">Link to this property</a>

"migrationErrorFailedContinuation"

<a href="#">Link to this property</a>

"importErrorRetryExhaustion"

<a href="#">Link to this property</a>

"importSkippedStorageClass"

<a href="#">Link to this property</a>

"importSkippedOversized"

<a href="#">Link to this property</a>

"importSkippedEmptyObject"

<a href="#">Link to this property</a>

"importSkippedUnsupportedContentType"

<a href="#">Link to this property</a>

"importSkippedExcludedContentType"

<a href="#">Link to this property</a>

"importSkippedInvalidMedia"

<a href="#">Link to this property</a>

"importSkippedRequiresRetrieval"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

objectKey: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get job logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "createdAt": "createdAt",
      "job": "job",
      "logType": "migrationStart",
      "message": "message",
      "objectKey": "objectKey"
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
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "createdAt": "createdAt",
      "job": "job",
      "logType": "migrationStart",
      "message": "message",
      "objectKey": "objectKey"
    }
  ],
  "success": true
}
```