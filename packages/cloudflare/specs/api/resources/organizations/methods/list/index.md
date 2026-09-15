---
title: List organizations the user has access to
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Organizations](https://developers.cloudflare.com/api/resources/organizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List organizations the user has access to

GET/organizations

Retrieve a list of organizations a particular user has access to. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

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

id: optional array of string

Only return organizations with the specified IDs (ex. id=foo&id=bar). Send multiple elements by repeating the query value.

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

containing: optional object {account, organization, user }

</summary>

account: optional string

Filter the list of organizations to the ones that contain this particular account.

<a href="#">Link to this property</a>

organization: optional string

Filter the list of organizations to the ones that contain this particular organization.

<a href="#">Link to this property</a>

user: optional string

Filter the list of organizations to the ones that contain this particular user.

IMPORTANT: Just because an organization “contains” a user is not a representation of any authorization or privilege to manage any resources therein. An organization “containing” a user simply means the user is managed by that organization.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20containing%20%3E%20(schema)>)

<details>

<summary>

name: optional object {contains, endsWith, startsWith }

</summary>

contains: optional string

(case-insensitive) Filter the list of organizations to where the name contains a particular string.

<a href="#">Link to this property</a>

endsWith: optional string

(case-insensitive) Filter the list of organizations to where the name ends with a particular string.

<a href="#">Link to this property</a>

startsWith: optional string

(case-insensitive) Filter the list of organizations to where the name starts with a particular string.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page\_size: optional number

The amount of items to return. Defaults to 10.

maximum1000

minimum0

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

page\_token: optional string

An opaque token returned from the last list response that when provided will retrieve the next page.

Parameters used to filter the retrieved list must remain in subsequent requests with a page token.

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_token%20%3E%20(schema)>)

<details>

<summary>

parent: optional object {id }

</summary>

<details>

<summary>

id: optional stringor "null"

Filter the list of organizations to the ones that are a sub-organization of the specified organization.

“null” is a valid value to provide for this parameter. It means “where an organization has no parent (i.e. it is a ‘root’ organization).”

</summary>

One of the following:

OrganizationsAPIOrganizationID = string

<a href="#">Link to this property</a>

"null"

Filter the list of organizations to the ones that are a sub-organization of the specified organization.

“null” is a valid value to provide for this parameter. It means “where an organization has no parent (i.e. it is a ‘root’ organization).”

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20parent%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

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

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {next\_page\_token, total\_size }

</summary>

next\_page\_token: optional string

Use this opaque token in the next request to retrieve the next page.

Parameters used to filter the retrieved list must remain in subsequent requests with a page token.

<a href="#">Link to this property</a>

total\_size: optional number

Counts the total amount of items in a list with the applied filters. The API omits next\_page\_token to indicate no more items in a particular list.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

[Link to this property](#)%20organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List organizations the user has access to

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/organizations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
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
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```