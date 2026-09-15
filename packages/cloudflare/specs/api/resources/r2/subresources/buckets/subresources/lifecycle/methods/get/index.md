---
title: Get Object Lifecycle Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Lifecycle](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/lifecycle)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Object Lifecycle Rules

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/lifecycle

Get object lifecycle rules for a bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

<details>

<summary>

"cf-r2-jurisdiction": optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {rules }

</summary>

<details>

<summary>

rules: optional array of object {id, conditions, enabled, 3 more }

</summary>

id: string

Unique identifier for this rule.

<a href="#">Link to this property</a>

<details>

<summary>

conditions: object {prefix }

Conditions that apply to all transitions of this rule.

</summary>

prefix: string

Transitions will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether or not this rule is in effect.

<a href="#">Link to this property</a>

<details>

<summary>

abortMultipartUploadsTransition: optional object {condition }

Transition to abort ongoing multipart uploads.

</summary>

<details>

<summary>

condition: optional object {maxAge, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

maxAge: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

deleteObjectsTransition: optional object {condition }

Transition to delete objects.

</summary>

<details>

<summary>

condition: optional object {maxAge, type } or object {date, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

One of the following:

<details>

<summary>

R2LifecycleAgeCondition object {maxAge, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

maxAge: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LifecycleDateCondition object {date, type }

Condition for lifecycle transitions to apply on a specific date.

</summary>

date: string

formatdate-time

<a href="#">Link to this property</a>

type: "Date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storageClassTransitions: optional array of object {condition, storageClass }

Transitions to change the storage class of objects.

</summary>

<details>

<summary>

condition: object {maxAge, type } or object {date, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

One of the following:

<details>

<summary>

R2LifecycleAgeCondition object {maxAge, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

maxAge: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LifecycleDateCondition object {date, type }

Condition for lifecycle transitions to apply on a specific date.

</summary>

date: string

formatdate-time

<a href="#">Link to this property</a>

type: "Date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

storageClass: "InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Object Lifecycle Rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/lifecycle \
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
    "string"
  ],
  "result": {
    "rules": [
      {
        "id": "Expire all objects older than 24 hours",
        "conditions": {
          "prefix": "prefix"
        },
        "enabled": true,
        "abortMultipartUploadsTransition": {
          "condition": {
            "maxAge": 0,
            "type": "Age"
          }
        },
        "deleteObjectsTransition": {
          "condition": {
            "maxAge": 0,
            "type": "Age"
          }
        },
        "storageClassTransitions": [
          {
            "condition": {
              "maxAge": 0,
              "type": "Age"
            },
            "storageClass": "InfrequentAccess"
          }
        ]
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
    "string"
  ],
  "result": {
    "rules": [
      {
        "id": "Expire all objects older than 24 hours",
        "conditions": {
          "prefix": "prefix"
        },
        "enabled": true,
        "abortMultipartUploadsTransition": {
          "condition": {
            "maxAge": 0,
            "type": "Age"
          }
        },
        "deleteObjectsTransition": {
          "condition": {
            "maxAge": 0,
            "type": "Age"
          }
        },
        "storageClassTransitions": [
          {
            "condition": {
              "maxAge": 0,
              "type": "Age"
            },
            "storageClass": "InfrequentAccess"
          }
        ]
      }
    ]
  },
  "success": true
}
```