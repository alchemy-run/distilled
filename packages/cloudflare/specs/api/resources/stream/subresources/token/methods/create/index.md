---
title: Create signed URL tokens for videos
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Token](https://developers.cloudflare.com/api/resources/stream/subresources/token)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create signed URL tokens for videos

POST/accounts/{account\_id}/stream/{identifier}/token

Creates a signed URL token for a video. If a body is not provided in the request, a token is created with default values.

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

The account identifier tag.

maxLength32

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identifier: string

A Cloudflare-generated unique identifier for a media item.

maxLength32

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

id: optional string

The optional ID of a Stream signing key. If present, the `pem` field is also required.

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

accessRules: optional array of object {action, country, ip, type }

The optional list of access rule constraints on the token. Access can be blocked or allowed based on an IP, IP range, or by country. Access rules are evaluated from first to last. If a rule matches, the associated action is applied and no further rules are evaluated.

</summary>

<details>

<summary>

action: optional "allow"or "block"

The action to take when a request matches a rule. If the action is <code>block</code>, the signed token blocks views for viewers matching the rule.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country: optional array of string

An array of 2-letter country codes in ISO 3166-1 Alpha-2 format used to match requests.

<a href="#">Link to this property</a>

ip: optional array of string

An array of IPv4 or IPV6 addresses or CIDRs used to match requests.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "any"or "ip.src"or "ip.geoip.country"

Lists available rule types to match for requests. An <code>any</code> type matches all requests and can be used as a wildcard to apply default actions after other rules.

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"ip.src"

<a href="#">Link to this property</a>

"ip.geoip.country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20accessRules%20%3E%20(schema)>)

downloadable: optional boolean

The optional boolean value that enables using signed tokens to access MP4 download links for a video.

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20downloadable%20%3E%20(schema)>)

exp: optional number

The optional unix epoch timestamp that specficies the time after a token is not accepted. The maximum time specification is 24 hours from issuing time. If this field is not set, the default is one hour after issuing.

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20exp%20%3E%20(schema)>)

<details>

<summary>

flags: optional object {original }

Optional flags for the signed token.

</summary>

original: optional boolean

Whether to return the original video without transformations.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20flags%20%3E%20(schema)>)

nbf: optional number

The optional unix epoch timestamp that specifies the time before a the token is not accepted. If this field is not set, the default is one hour before issuing.

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20nbf%20%3E%20(schema)>)

pem: optional string

The optional base64 encoded private key in PEM format associated with a Stream signing key. If present, the `id` field is also required.

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20pem%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {token }

</summary>

token: optional string

The signed token used with the signed URLs feature.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.token%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create signed URL tokens for videos

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/token \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "ab0d4ef71g4425f8dcba9041231813000",
          "accessRules": [
            {
              "action": "block",
              "country": [
                "US",
                "MX"
              ],
              "type": "ip.geoip.country"
            },
            {
              "action": "allow",
              "ip": [
                "93.184.216.0/24",
                "2400:cb00::/32"
              ],
              "type": "ip.src"
            },
            {
              "action": "block",
              "type": "any"
            }
          ],
          "pem": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBc284dnBvOFpEWXRkOUgzbWlPaW1qYXAzVXlVM0oyZ3kwTUYvN1R4blJuRnkwRHpDCkxqUk9naFZsQ0hPQmxsd3NVaE9GU0lyYnN4K05tUTdBeS90TFpXSGxuVGF3UWJ5WGZGOStJeDhVSnNlSHBGV1oKNVF5Z1JYd2liSjh1MVVsZ2xlcmZHMkpueldjVXpZTzEySktZN3doSkw1ajROMWgxZFJNUXQ5Q1pkZFlCQWRzOQpCdk02cjRFMDcxQkhQekhWeDMrUTI1VWtubGdUNXIwS3FiM1E1Y0dlTlBXY1JreW1ybkJEWWR0OXR4eFFMb1dPCllzNXdsMnVYWFVYL0VGcDMwajU0Nmp6czllWExLYlNDbjJjTDZFVE96Y2x3aG9DRGx2a2VQT05rUE9LMDVKNUMKTm1TdFdhMG9hV1VGRzM0MFl3cVVrWGt4OU9tNndXd1JldU1uU1FJREFRQUJBb0lCQUFJOHo1ck5kOEdtOGJBMgo1S3pxQjI1R2lOVENwbUNJeW53NXRJWHZTQmNHcEdydUcvdlN2WG9kVlFVSVY0TWdHQkVXUEFrVzdsNWVBcHI4CnA1ZFd5SkRXYTNkdklFSE9vSEpYU3dBYksxZzZEMTNVa2NkZ1EyRGpoNVhuWDhHZCtBY2c2SmRTQWgxOWtYSHEKMk54RUtBVDB6Ri83a1g2MkRkREFBcWxmQkpGSXJodVIvZUdEVWh4L2piTTRhQ2JCcFdiM0pnRE9OYm5tS1ZoMwpxS2ZwZmRZZENZU1lzWUxrNTlxRDF2VFNwUVFUQ0VadW9VKzNzRVNhdkJzaUs1bU0vTzY5ZkRMRXNURG1MeTVQCmhEK3BMQXI0SlhNNjFwRGVBS0l3cUVqWWJybXlDRHRXTUdJNnZzZ0E1eXQzUUJaME9vV2w5QUkwdWxoZ3p4dXQKZ2ZFNTRRRUNnWUVBN0F3a0lhVEEzYmQ4Nk9jSVZnNFlrWGk1cm5aNDdsM1k4V24zcjIzUmVISXhLdkllRUtSbgp5bUlFNDFtRVBBSmlGWFpLK1VPTXdkeS9EcnFJUithT1JiT2NiV01jWUg2QzgvbG1wdVJFaXE3SW1Ub3VWcnA4CnlnUkprMWprVDA4cTIvNmg4eTBEdjJqMitsaHFXNzRNOUt0cmwxcTRlWmZRUFREL01tR1NnTWtDZ1lFQXdhY04KaSttN1p6dnJtL3NuekF2VlZ5SEtwZHVUUjNERk1naC9maC9tZ0ZHZ1RwZWtUOVV5b3FleGNYQXdwMVlhL01iQQoyNTVJVDZRbXZZTm5yNXp6Wmxic2tMV0hsYllvbWhmWnVXTHhXR3hRaEFORWdaMFVVdUVTRGMvbWx2UXZHbEtSCkZoaGhBUWlVSmdDamhPaHk1SlBiNGFldGRKd0UxK09lVWRFaE1vRUNnWUVBNG8yZ25CM1o4ck5xa3NzemlBek4KYmNuMlJVbDJOaW9pejBwS3JMaDFaT29NNE5BekpQdjJsaHRQMzdtS0htS1hLMHczRjFqTEgwSTBxZmxFVmVZbQpSU1huakdHazJjUnpBYUVzOGgrQzNheDE0Z01pZUtGU3BqNUpNOEFNbVVZOXQ1cUVhN2FYc3o0V1ZoOUlMYmVTCkRiNzlhKzVwd21LQVBrcnBsTHhyZFdrQ2dZQlNNSHVBWVdBbmJYZ1BDS2FZWklGVWJNUWNacmY0ZnpWQ2lmYksKYWZHampvRlNPZXdEOGdGK3BWdWJRTGwxbkFieU44ek1xVDRaaHhybUhpcFlqMjJDaHV2NmN3RXJtbGRiSnpwQwpBMnRaVXdkTk1ESFlMUG5lUHlZeGRJWnlsUXFVeW14SGkydElUQUxNcWtLOGV3ZWdXZHpkeGhQSlJScU5JazhrCmZIVHhnUUtCZ1FEUFc2UXIxY3F3QjNUdnVWdWR4WGRqUTdIcDFodXhrNEVWaEFJZllKNFhSTW1NUE5YS28wdHUKdUt6LzE0QW14R0dvSWJxYVc1bDMzeFNteUxhem84clNUN0tSTjVKME9JSHcrZkR5SFgxdHpVSjZCTldDcEFTcwpjbWdNK0htSzVON0w2bkNaZFJQY2IwU1hGaVRQUGhCUG1PVWFDUnpER0ZMK2JYM1VwajJKbWc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="
        }'
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
  "success": true,
  "result": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU5ZGI5OTBhODI2NjZkZDU3MWM3N2Y5NDRhNWM1YzhkIn0.eyJzdWIiOiJlYTk1MTMyYzE1NzMyNDEyZDIyYzE0NzZmYTgzZjI3YSIsImtpZCI6ImU5ZGI5OTBhODI2NjZkZDU3MWM3N2Y5NDRhNWM1YzhkIiwiZXhwIjoiMTUzNzQ2MDM2NSIsIm5iZiI6IjE1Mzc0NTMxNjUifQ.OZhqOARADn1iubK6GKcn25hN3nU-hCFF5q9w2C4yup0C4diG7aMIowiRpP-eDod8dbAJubsiFuTKrqPcmyCKWYsiv0TQueukqbQlF7HCO1TV-oF6El5-7ldJ46eD-ZQ0XgcIYEKrQOYFF8iDQbqPm3REWd6BnjKZdeVrLzuRaiSnZ9qqFpGu5dfxIY9-nZKDubJHqCr3Imtb211VIG_b9MdtO92JjvkDS-rxT_pkEfTZSafl1OU-98A7KBGtPSJHz2dHORIrUiTA6on4eIXTj9aFhGiir4rSn-rn0OjPRTtJMWIDMoQyE_fwrSYzB7MPuzL2t82BWaEbHZTfixBm5A"
  }
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
  "success": true,
  "result": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU5ZGI5OTBhODI2NjZkZDU3MWM3N2Y5NDRhNWM1YzhkIn0.eyJzdWIiOiJlYTk1MTMyYzE1NzMyNDEyZDIyYzE0NzZmYTgzZjI3YSIsImtpZCI6ImU5ZGI5OTBhODI2NjZkZDU3MWM3N2Y5NDRhNWM1YzhkIiwiZXhwIjoiMTUzNzQ2MDM2NSIsIm5iZiI6IjE1Mzc0NTMxNjUifQ.OZhqOARADn1iubK6GKcn25hN3nU-hCFF5q9w2C4yup0C4diG7aMIowiRpP-eDod8dbAJubsiFuTKrqPcmyCKWYsiv0TQueukqbQlF7HCO1TV-oF6El5-7ldJ46eD-ZQ0XgcIYEKrQOYFF8iDQbqPm3REWd6BnjKZdeVrLzuRaiSnZ9qqFpGu5dfxIY9-nZKDubJHqCr3Imtb211VIG_b9MdtO92JjvkDS-rxT_pkEfTZSafl1OU-98A7KBGtPSJHz2dHORIrUiTA6on4eIXTj9aFhGiir4rSn-rn0OjPRTtJMWIDMoQyE_fwrSYzB7MPuzL2t82BWaEbHZTfixBm5A"
  }
}
```