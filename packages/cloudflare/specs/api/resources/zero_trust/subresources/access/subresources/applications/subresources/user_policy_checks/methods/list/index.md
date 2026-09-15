---
title: Test Access policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

[User Policy Checks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/user_policy_checks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Test Access policies

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/user\_policy\_checks

Tests if a specific user has permission to access an application.

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

`Access: Apps and Policies Write``Access: Apps and Policies Read`

##### P ath ParametersExpand Collapse

app\_id: [AppID](<https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20app_id%20%3E%20(schema)>)

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {app\_state, user\_identity }

</summary>

<details>

<summary>

app\_state: optional object {app\_uid, aud, hostname, 3 more }

</summary>

app\_uid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

aud: optional string

<a href="#">Link to this property</a>

hostname: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

policies: optional array of unknown

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user\_identity: optional object {id, account\_id, device\_sessions, 8 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

account\_id: optional string

<a href="#">Link to this property</a>

device\_sessions: optional unknown

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

<details>

<summary>

geo: optional object {country }

</summary>

country: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

iat: optional number

<a href="#">Link to this property</a>

is\_gateway: optional boolean

<a href="#">Link to this property</a>

is\_warp: optional boolean

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

user\_uuid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Test Access policies

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps/$APP_ID/user_policy_checks \
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
  "success": true,
  "result": {
    "app_state": {
      "app_uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "aud": "737646a56ab1df6ec9bddc7e5ca84eaf3b0768850f3ffb5d74f1534911fe389",
      "hostname": "test.com",
      "name": "Test App",
      "policies": [
        {
          "decision": "allow",
          "exclude": [],
          "include": [
            {
              "_type": "email",
              "email": "testuser@gmail.com"
            }
          ],
          "precedence": 1,
          "require": [],
          "status": "Success"
        }
      ],
      "status": "Success"
    },
    "user_identity": {
      "id": "1164449231815010287495",
      "account_id": "41ecfbb341f033e52b46742756aabb8b",
      "device_sessions": {},
      "email": "testuser@gmail.com",
      "geo": {
        "country": "US"
      },
      "iat": 0,
      "is_gateway": false,
      "is_warp": false,
      "name": "Test User",
      "user_uuid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "version": 0
    }
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
    "app_state": {
      "app_uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "aud": "737646a56ab1df6ec9bddc7e5ca84eaf3b0768850f3ffb5d74f1534911fe389",
      "hostname": "test.com",
      "name": "Test App",
      "policies": [
        {
          "decision": "allow",
          "exclude": [],
          "include": [
            {
              "_type": "email",
              "email": "testuser@gmail.com"
            }
          ],
          "precedence": 1,
          "require": [],
          "status": "Success"
        }
      ],
      "status": "Success"
    },
    "user_identity": {
      "id": "1164449231815010287495",
      "account_id": "41ecfbb341f033e52b46742756aabb8b",
      "device_sessions": {},
      "email": "testuser@gmail.com",
      "geo": {
        "country": "US"
      },
      "iat": 0,
      "is_gateway": false,
      "is_warp": false,
      "name": "Test User",
      "user_uuid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "version": 0
    }
  }
}
```