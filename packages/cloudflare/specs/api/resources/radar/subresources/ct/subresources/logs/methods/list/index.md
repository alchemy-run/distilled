---
title: List certificate logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[CT](https://developers.cloudflare.com/api/resources/radar/subresources/ct)

[Logs](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List certificate logs

GET/radar/ct/logs

Retrieves a list of certificate logs.

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

[Link to this property](#)%20radar.ct.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.ct.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.ct.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {certificateLogs }

</summary>

<details>

<summary>

certificateLogs: array of object {api, description, endExclusive, 6 more }

</summary>

<details>

<summary>

api: "RFC6962"or "STATIC"

The API standard that the certificate log follows.

</summary>

One of the following:

"RFC6962"

<a href="#">Link to this property</a>

"STATIC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A brief description of the certificate log.

<a href="#">Link to this property</a>

endExclusive: string

The end date and time for when the log will stop accepting certificates.

formatdate-time

<a href="#">Link to this property</a>

operator: string

The organization responsible for operating the certificate log.

<a href="#">Link to this property</a>

slug: string

A URL-friendly, kebab-case identifier for the certificate log.

<a href="#">Link to this property</a>

startInclusive: string

The start date and time for when the log starts accepting certificates.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

state: "USABLE"or "PENDING"or "QUALIFIED"or 3 more

The current state of the certificate log. More details about log states can be found here: <a href="https://googlechrome.github.io/CertificateTransparency/log_states.html">https://googlechrome.github.io/CertificateTransparency/log\_states.html</a>

</summary>

One of the following:

"USABLE"

<a href="#">Link to this property</a>

"PENDING"

<a href="#">Link to this property</a>

"QUALIFIED"

<a href="#">Link to this property</a>

"READ\_ONLY"

<a href="#">Link to this property</a>

"RETIRED"

<a href="#">Link to this property</a>

"REJECTED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stateTimestamp: string

Timestamp of when the log state was last updated.

formatdate-time

<a href="#">Link to this property</a>

url: string

The URL for the certificate log.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.ct.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List certificate logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/ct/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "certificateLogs": [
      {
        "api": "RFC6962",
        "description": "Google 'Argon2024' log",
        "endExclusive": "2025-01-01T00:00:00Z",
        "operator": "Google",
        "slug": "argon2024",
        "startInclusive": "2024-01-01T00:00:00Z",
        "state": "USABLE",
        "stateTimestamp": "2025-02-01T08:53:20Z",
        "url": "https://ct.googleapis.com/logs/us1/argon2024/"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "certificateLogs": [
      {
        "api": "RFC6962",
        "description": "Google 'Argon2024' log",
        "endExclusive": "2025-01-01T00:00:00Z",
        "operator": "Google",
        "slug": "argon2024",
        "startInclusive": "2024-01-01T00:00:00Z",
        "state": "USABLE",
        "stateTimestamp": "2025-02-01T08:53:20Z",
        "url": "https://ct.googleapis.com/logs/us1/argon2024/"
      }
    ]
  },
  "success": true
}
```