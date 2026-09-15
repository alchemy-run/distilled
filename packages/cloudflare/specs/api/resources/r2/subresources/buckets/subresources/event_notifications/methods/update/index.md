---
title: Create Event Notification Rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Event Notifications](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Event Notification Rule

PUT/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

Create event notification rule.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Workers R2 Storage Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

queue\_id: string

Queue ID.

maxLength32

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20queue_id%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

rules: array of object {actions, description, prefix, suffix }

Array of rules to drive notifications.

</summary>

<details>

<summary>

actions: array of "PutObject"or "CopyObject"or "DeleteObject"or 2 more

Array of R2 object actions that will trigger notifications.

</summary>

One of the following:

"PutObject"

<a href="#">Link to this property</a>

"CopyObject"

<a href="#">Link to this property</a>

"DeleteObject"

<a href="#">Link to this property</a>

"CompleteMultipartUpload"

<a href="#">Link to this property</a>

"LifecycleDeletion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

A description that can be used to identify the event notification rule after creation.

<a href="#">Link to this property</a>

prefix: optional string

Notifications will be sent only for objects with this prefix.

<a href="#">Link to this property</a>

suffix: optional string

Notifications will be sent only for objects with this suffix.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rules%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: unknown

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Event Notification Rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration/queues/$QUEUE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "rules": [
            {
              "actions": [
                "PutObject",
                "CopyObject"
              ]
            }
          ]
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
    "string"
  ],
  "result": {},
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
  "result": {},
  "success": true
}
```