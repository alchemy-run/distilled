---
title: Get deployment logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects)

[Deployments](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments)

[History](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/history)

[Logs](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/history/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get deployment logs

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/history/logs

Fetch deployment logs for a project.

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

`Pages Read``Pages Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

project\_name: string

Name of the project.

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20project_name%20%3E%20(schema)>)

deployment\_id: string

Identifier.

maxLength32

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20deployment_id%20%3E%20(schema)>)

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

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {data, includes\_container\_logs, total }

</summary>

<details>

<summary>

data: array of object {line, ts }

</summary>

line: string

<a href="#">Link to this property</a>

ts: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

includes\_container\_logs: boolean

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get deployment logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID/history/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "data": [
      {
        "line": "Cloning repository...",
        "ts": "2021-04-20T19:35:29.0749819Z"
      },
      {
        "line": "From https://github.com/cloudflare/example",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": " * branch            209c5bb11d89533f426b2f8469bcae12fdccf71b -> FETCH_HEAD",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "HEAD is now at 209c5bb Update index.html",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Success: Finished cloning repository files",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Installing dependencies",
        "ts": "2021-04-20T19:35:59.0749819Z"
      },
      {
        "line": "Python version set to 2.7",
        "ts": "2021-04-20T19:35:59.0931208Z"
      },
      {
        "line": "v12.18.0 is already installed.",
        "ts": "2021-04-20T19:36:02.2369501Z"
      },
      {
        "line": "Now using node v12.18.0 (npm v6.14.4)",
        "ts": "2021-04-20T19:36:02.6028886Z"
      },
      {
        "line": "Started restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.624555Z"
      },
      {
        "line": "Finished restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.6340688Z"
      },
      {
        "line": "Attempting ruby version 2.7.1, read from environment",
        "ts": "2021-04-20T19:36:02.963095Z"
      },
      {
        "line": "Using ruby version 2.7.1",
        "ts": "2021-04-20T19:36:04.2236084Z"
      },
      {
        "line": "Using PHP version 5.6",
        "ts": "2021-04-20T19:36:04.5450152Z"
      },
      {
        "line": "5.2 is already installed.",
        "ts": "2021-04-20T19:36:04.5740509Z"
      },
      {
        "line": "Using Swift version 5.2",
        "ts": "2021-04-20T19:36:04.577035Z"
      },
      {
        "line": "Installing Hugo 0.54.0",
        "ts": "2021-04-20T19:36:04.5771615Z"
      },
      {
        "line": "Hugo Static Site Generator v0.54.0-B1A82C61A/extended linux/amd64 BuildDate: 2019-02-01T10:04:38Z",
        "ts": "2021-04-20T19:36:05.4786868Z"
      },
      {
        "line": "Started restoring cached go cache",
        "ts": "2021-04-20T19:36:05.4794366Z"
      },
      {
        "line": "Finished restoring cached go cache",
        "ts": "2021-04-20T19:36:05.481977Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9049776Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9086053Z"
      },
      {
        "line": "Installing missing commands",
        "ts": "2021-04-20T19:36:05.9163568Z"
      },
      {
        "line": "Verify run directory",
        "ts": "2021-04-20T19:36:05.9163934Z"
      },
      {
        "line": "Executing user command: echo \"skipping build step: no build command specified\"",
        "ts": "2021-04-20T19:36:05.9164636Z"
      },
      {
        "line": "skipping build step: no build command specified",
        "ts": "2021-04-20T19:36:05.9165087Z"
      },
      {
        "line": "Finished",
        "ts": "2021-04-20T19:36:05.917412Z"
      }
    ],
    "includes_container_logs": true,
    "total": 30
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
    "data": [
      {
        "line": "Cloning repository...",
        "ts": "2021-04-20T19:35:29.0749819Z"
      },
      {
        "line": "From https://github.com/cloudflare/example",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": " * branch            209c5bb11d89533f426b2f8469bcae12fdccf71b -> FETCH_HEAD",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "HEAD is now at 209c5bb Update index.html",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Success: Finished cloning repository files",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Installing dependencies",
        "ts": "2021-04-20T19:35:59.0749819Z"
      },
      {
        "line": "Python version set to 2.7",
        "ts": "2021-04-20T19:35:59.0931208Z"
      },
      {
        "line": "v12.18.0 is already installed.",
        "ts": "2021-04-20T19:36:02.2369501Z"
      },
      {
        "line": "Now using node v12.18.0 (npm v6.14.4)",
        "ts": "2021-04-20T19:36:02.6028886Z"
      },
      {
        "line": "Started restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.624555Z"
      },
      {
        "line": "Finished restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.6340688Z"
      },
      {
        "line": "Attempting ruby version 2.7.1, read from environment",
        "ts": "2021-04-20T19:36:02.963095Z"
      },
      {
        "line": "Using ruby version 2.7.1",
        "ts": "2021-04-20T19:36:04.2236084Z"
      },
      {
        "line": "Using PHP version 5.6",
        "ts": "2021-04-20T19:36:04.5450152Z"
      },
      {
        "line": "5.2 is already installed.",
        "ts": "2021-04-20T19:36:04.5740509Z"
      },
      {
        "line": "Using Swift version 5.2",
        "ts": "2021-04-20T19:36:04.577035Z"
      },
      {
        "line": "Installing Hugo 0.54.0",
        "ts": "2021-04-20T19:36:04.5771615Z"
      },
      {
        "line": "Hugo Static Site Generator v0.54.0-B1A82C61A/extended linux/amd64 BuildDate: 2019-02-01T10:04:38Z",
        "ts": "2021-04-20T19:36:05.4786868Z"
      },
      {
        "line": "Started restoring cached go cache",
        "ts": "2021-04-20T19:36:05.4794366Z"
      },
      {
        "line": "Finished restoring cached go cache",
        "ts": "2021-04-20T19:36:05.481977Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9049776Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9086053Z"
      },
      {
        "line": "Installing missing commands",
        "ts": "2021-04-20T19:36:05.9163568Z"
      },
      {
        "line": "Verify run directory",
        "ts": "2021-04-20T19:36:05.9163934Z"
      },
      {
        "line": "Executing user command: echo \"skipping build step: no build command specified\"",
        "ts": "2021-04-20T19:36:05.9164636Z"
      },
      {
        "line": "skipping build step: no build command specified",
        "ts": "2021-04-20T19:36:05.9165087Z"
      },
      {
        "line": "Finished",
        "ts": "2021-04-20T19:36:05.917412Z"
      }
    ],
    "includes_container_logs": true,
    "total": 30
  },
  "success": true
}
```