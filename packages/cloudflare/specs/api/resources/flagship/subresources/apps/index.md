---
title: Apps
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Flagship](https://developers.cloudflare.com/api/resources/flagship)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Apps

##### [List apps](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/methods/list)

GET/accounts/{account\_id}/flagship/apps

##### [Get app](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/methods/get)

GET/accounts/{account\_id}/flagship/apps/{app\_id}

##### [Create app](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/methods/create)

POST/accounts/{account\_id}/flagship/apps

##### [Update app](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/methods/update)

PUT/accounts/{account\_id}/flagship/apps/{app\_id}

##### [Delete app](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/methods/delete)

DELETE/accounts/{account\_id}/flagship/apps/{app\_id}

##### ModelsExpand Collapse

<details>

<summary>

AppListResponse object {id, created\_at, name, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

updated\_by: string

Email of the actor who last modified the app, or <code>unknown</code> when unavailable.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(model)%20app_list_response%20%3E%20(schema)>)

<details>

<summary>

AppGetResponse object {id, created\_at, name, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

updated\_by: string

Email of the actor who last modified the app, or <code>unknown</code> when unavailable.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(model)%20app_get_response%20%3E%20(schema)>)

<details>

<summary>

AppCreateResponse object {id, created\_at, name, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

updated\_by: string

Email of the actor who last modified the app, or <code>unknown</code> when unavailable.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(model)%20app_create_response%20%3E%20(schema)>)

<details>

<summary>

AppUpdateResponse object {id, created\_at, name, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

updated\_by: string

Email of the actor who last modified the app, or <code>unknown</code> when unavailable.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(model)%20app_update_response%20%3E%20(schema)>)

<details>

<summary>

AppDeleteResponse object {id }

</summary>

id: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(model)%20app_delete_response%20%3E%20(schema)>)

#### AppsFlags

##### [List flags](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags/methods/list)

GET/accounts/{account\_id}/flagship/apps/{app\_id}/flags

##### [Get flag](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags/methods/get)

GET/accounts/{account\_id}/flagship/apps/{app\_id}/flags/{flag\_key}

##### [Create flag](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags/methods/create)

POST/accounts/{account\_id}/flagship/apps/{app\_id}/flags

##### [Update flag](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags/methods/update)

PUT/accounts/{account\_id}/flagship/apps/{app\_id}/flags/{flag\_key}

##### [Delete flag](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags/methods/delete)

DELETE/accounts/{account\_id}/flagship/apps/{app\_id}/flags/{flag\_key}

##### ModelsExpand Collapse

<details>

<summary>

FlagListResponse object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(model)%20flag_list_response%20%3E%20(schema)>)

<details>

<summary>

FlagGetResponse object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(model)%20flag_get_response%20%3E%20(schema)>)

<details>

<summary>

FlagCreateResponse object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(model)%20flag_create_response%20%3E%20(schema)>)

<details>

<summary>

FlagUpdateResponse object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(model)%20flag_update_response%20%3E%20(schema)>)

<details>

<summary>

FlagDeleteResponse object {key }

</summary>

key: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(model)%20flag_delete_response%20%3E%20(schema)>)

#### AppsFlagsChangelog

##### [Get flag changelog](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags/subresources/changelog/methods/list)

GET/accounts/{account\_id}/flagship/apps/{app\_id}/flags/{flag\_key}/changelog

##### ModelsExpand Collapse

<details>

<summary>

ChangelogListResponse = object {after, event, flag\_key } or object {after, event, flag\_key } or object {after, diff, event, flag\_key }

</summary>

One of the following:

<details>

<summary>

object {after, event, flag\_key }

</summary>

<details>

<summary>

after: object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

event: "create"

<a href="#">Link to this property</a>

flag\_key: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {after, event, flag\_key }

</summary>

<details>

<summary>

after: object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

event: "delete"

<a href="#">Link to this property</a>

flag\_key: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {after, diff, event, flag\_key }

</summary>

<details>

<summary>

after: object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

diff: map\[object {from, to } ]

</summary>

<details>

<summary>

from: optional stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

to: optional stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

event: "update"

<a href="#">Link to this property</a>

flag\_key: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags.changelog%20%3E%20(model)%20changelog_list_response%20%3E%20(schema)>)

#### AppsEvaluate

##### [Evaluate flag](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/evaluate/methods/get)

GET/accounts/{account\_id}/flagship/apps/{app\_id}/evaluate

##### ModelsExpand Collapse

<details>

<summary>

EvaluateGetResponse object {flagKey, reason, variant, value }

</summary>

flagKey: string

<a href="#">Link to this property</a>

<details>

<summary>

reason: "TARGETING\_MATCH"or "DEFAULT"or "DISABLED"or "SPLIT"

</summary>

One of the following:

"TARGETING\_MATCH"

<a href="#">Link to this property</a>

"DEFAULT"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"SPLIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

variant: string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(model)%20evaluate_get_response%20%3E%20(schema)>)