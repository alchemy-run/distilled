---
title: List user tenants
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Tenants](https://developers.cloudflare.com/api/resources/user/subresources/tenants)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List user tenants

GET/user/tenants

Retrieves list of tenants the authenticated user / method has access to.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`User Details Write``User Details Read`

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20user.tenants%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20user.tenants%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/organizations#(resource)%20organizations%20%3E%20(model)%20organization%20%3E%20(schema)">Organization</a> { id, create\_time, meta, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

create\_time: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {hierarchy\_tags, managed\_by, tenant\_flags }

</summary>

hierarchy\_tags: optional array of string

Ordered chain of organization tags from the root organization down to (and including) this organization itself. Root organizations return a single-element array containing their own tag; sub-organizations return <code>[rootTag, ...intermediateTags, parentTag, selfTag]</code>. Useful for constructing authorization scopes that need to cover every ancestor in the hierarchy.

<a href="#">Link to this property</a>

managed\_by: optional string

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_flags: optional object {account\_creation, account\_creation\_applies\_tenant\_defaults, account\_deletion, 5 more }

Enable features for Organizations.

</summary>

account\_creation: string

<a href="#">Link to this property</a>

account\_creation\_applies\_tenant\_defaults: string

<a href="#">Link to this property</a>

account\_deletion: string

<a href="#">Link to this property</a>

account\_migration: string

<a href="#">Link to this property</a>

account\_mobility: string

<a href="#">Link to this property</a>

enterprise\_capability: string

<a href="#">Link to this property</a>

member\_management: string

<a href="#">Link to this property</a>

sub\_org\_creation: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

parent: optional object {id, name }

</summary>

id: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

profile: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.account_profile%20%3E%20(model)%20account_profile%20%3E%20(schema)">AccountProfile</a> { business\_address, business\_email, business\_name, 2 more }

</summary>

business\_address: string

<a href="#">Link to this property</a>

business\_email: string

<a href="#">Link to this property</a>

business\_name: string

<a href="#">Link to this property</a>

business\_phone: string

<a href="#">Link to this property</a>

external\_metadata: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.tenants%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20user.tenants%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List user tenants

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/tenants \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [],
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
  "result": [
    {
      "id": "a7b9c3d2e8f4a1b5c6d0e9f2a3b7c4d8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "hierarchy_tags": [
          "string"
        ],
        "managed_by": "managed_by",
        "tenant_flags": {
          "account_creation": "account_creation",
          "account_creation_applies_tenant_defaults": "account_creation_applies_tenant_defaults",
          "account_deletion": "account_deletion",
          "account_migration": "account_migration",
          "account_mobility": "account_mobility",
          "enterprise_capability": "enterprise_capability",
          "member_management": "member_management",
          "sub_org_creation": "sub_org_creation"
        }
      },
      "name": "name",
      "parent": {
        "id": "a7b9c3d2e8f4a1b5c6d0e9f2a3b7c4d8",
        "name": "name"
      },
      "profile": {
        "business_address": "business_address",
        "business_email": "business_email",
        "business_name": "business_name",
        "business_phone": "business_phone",
        "external_metadata": "external_metadata"
      }
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
  "result": [
    {
      "id": "a7b9c3d2e8f4a1b5c6d0e9f2a3b7c4d8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "hierarchy_tags": [
          "string"
        ],
        "managed_by": "managed_by",
        "tenant_flags": {
          "account_creation": "account_creation",
          "account_creation_applies_tenant_defaults": "account_creation_applies_tenant_defaults",
          "account_deletion": "account_deletion",
          "account_migration": "account_migration",
          "account_mobility": "account_mobility",
          "enterprise_capability": "enterprise_capability",
          "member_management": "member_management",
          "sub_org_creation": "sub_org_creation"
        }
      },
      "name": "name",
      "parent": {
        "id": "a7b9c3d2e8f4a1b5c6d0e9f2a3b7c4d8",
        "name": "name"
      },
      "profile": {
        "business_address": "business_address",
        "business_email": "business_email",
        "business_name": "business_name",
        "business_phone": "business_phone",
        "external_metadata": "external_metadata"
      }
    }
  ],
  "success": true
}
```