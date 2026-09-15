---
title: Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[CT](https://developers.cloudflare.com/api/resources/radar/subresources/ct)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Logs

##### [Get certificate log details](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/logs/methods/get)

GET/radar/ct/logs/{log\_slug}

##### [List certificate logs](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/logs/methods/list)

GET/radar/ct/logs

##### ModelsExpand Collapse

<details>

<summary>

LogGetResponse object {certificateLog }

</summary>

<details>

<summary>

certificateLog: object {api, avgThroughput, description, 12 more }

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

avgThroughput: number

The average throughput of the CT log, measured in certificates per hour (certs/hour).

<a href="#">Link to this property</a>

description: string

A brief description of the certificate log.

<a href="#">Link to this property</a>

endExclusive: string

The end date and time for when the log will stop accepting certificates.

formatdate-time

<a href="#">Link to this property</a>

lastUpdate: string

Timestamp of the most recent update to the CT log.

formatdate-time

<a href="#">Link to this property</a>

operator: string

The organization responsible for operating the certificate log.

<a href="#">Link to this property</a>

<details>

<summary>

performance: object {endpoints, responseTime, uptime }

Log performance metrics, including averages and per-endpoint details.

</summary>

<details>

<summary>

endpoints: array of object {endpoint, responseTime, uptime }

</summary>

<details>

<summary>

endpoint: "add-chain (new)"or "add-chain (old)"or "add-pre-chain (new)"or 4 more

The certificate log endpoint names used in performance metrics.

</summary>

One of the following:

"add-chain (new)"

<a href="#">Link to this property</a>

"add-chain (old)"

<a href="#">Link to this property</a>

"add-pre-chain (new)"

<a href="#">Link to this property</a>

"add-pre-chain (old)"

<a href="#">Link to this property</a>

"get-entries"

<a href="#">Link to this property</a>

"get-roots"

<a href="#">Link to this property</a>

"get-sth"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

responseTime: number

<a href="#">Link to this property</a>

uptime: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

responseTime: number

<a href="#">Link to this property</a>

uptime: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

related: array of object {description, endExclusive, slug, 2 more }

Logs from the same operator.

</summary>

description: string

A brief description of the certificate log.

<a href="#">Link to this property</a>

endExclusive: string

The end date and time for when the log will stop accepting certificates.

formatdate-time

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

</details>

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

submittableCertCount: string

Number of certificates that are eligible for inclusion to this log but have not been included yet. Based on certificates signed by trusted root CAs within the log’s accepted date range.

<a href="#">Link to this property</a>

submittedCertCount: string

Number of certificates already included in this CT log.

<a href="#">Link to this property</a>

url: string

The URL for the certificate log.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct.logs%20%3E%20(model)%20log_get_response%20%3E%20(schema)>)

<details>

<summary>

LogListResponse object {certificateLogs }

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

[Link to this property](#)%20radar.ct.logs%20%3E%20(model)%20log_list_response%20%3E%20(schema)>)