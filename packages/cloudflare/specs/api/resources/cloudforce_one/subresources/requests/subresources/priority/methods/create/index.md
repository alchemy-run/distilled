---
title: Create a New Priority Intelligence Requirement
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

[Priority](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a New Priority Intelligence Requirement

POST/accounts/{account\_id}/cloudforce-one/requests/priority/new

Creates a new priority intelligence request in Cloudforce One.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

labels: array of [Label](<https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests.priority%20%3E%20(model)%20label%20%3E%20(schema)>)

List of labels.

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20labels%20%3E%20(schema)>)

priority: number

Priority.

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20priority%20%3E%20(schema)>)

requirement: string

Requirement.

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requirement%20%3E%20(schema)>)

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tlp%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests.priority%20%3E%20(model)%20priority%20%3E%20(schema)">Priority</a> { id, created, labels, 4 more }

</summary>

id: string

UUID.

maxLength36

<a href="#">Link to this property</a>

created: string

Priority creation time.

formatdate-time

<a href="#">Link to this property</a>

labels: array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests.priority%20%3E%20(model)%20label%20%3E%20(schema)">Label</a>

List of labels.

<a href="#">Link to this property</a>

priority: number

Priority.

<a href="#">Link to this property</a>

requirement: string

Requirement.

<a href="#">Link to this property</a>

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: string

Priority last updated time.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a New Priority Intelligence Requirement

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/new \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "labels": [
            "DoS",
            "CVE"
          ],
          "priority": 1,
          "requirement": "DoS attacks carried out by CVEs",
          "tlp": "clear"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created": "2022-04-01T05:20:00Z",
    "labels": [
      "DoS",
      "CVE"
    ],
    "priority": 1,
    "requirement": "DoS attacks carried out by CVEs",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created": "2022-04-01T05:20:00Z",
    "labels": [
      "DoS",
      "CVE"
    ],
    "priority": 1,
    "requirement": "DoS attacks carried out by CVEs",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z"
  }
}
```