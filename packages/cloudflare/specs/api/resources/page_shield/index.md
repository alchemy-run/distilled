---
title: Page Shield
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Page Shield

##### [Get client-side security settings](https://developers.cloudflare.com/api/resources/page_shield/methods/get)

GET/zones/{zone\_id}/page\_shield

##### [Update client-side security settings](https://developers.cloudflare.com/api/resources/page_shield/methods/update)

PUT/zones/{zone\_id}/page\_shield

##### ModelsExpand Collapse

<details>

<summary>

PageShieldGetResponse object {enabled, updated\_at, use\_cloudflare\_reporting\_endpoint, use\_connection\_url\_path }

</summary>

enabled: boolean

When true, indicates that Client-Side Security is enabled.

<a href="#">Link to this property</a>

updated\_at: string

The timestamp of when Client-Side Security was last updated.

<a href="#">Link to this property</a>

use\_cloudflare\_reporting\_endpoint: boolean

When true, CSP reports will be sent to <a href="https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report">https://csp-reporting.cloudflare.com/cdn-cgi/script\_monitor/report</a>

<a href="#">Link to this property</a>

use\_connection\_url\_path: boolean

When true, the paths associated with connections URLs will also be analyzed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield%20%3E%20(model)%20page_shield_get_response%20%3E%20(schema)>)

<details>

<summary>

PageShieldUpdateResponse object {enabled, updated\_at, use\_cloudflare\_reporting\_endpoint, use\_connection\_url\_path }

</summary>

enabled: boolean

When true, indicates that Client-Side Security is enabled.

<a href="#">Link to this property</a>

updated\_at: string

The timestamp of when Client-Side Security was last updated.

<a href="#">Link to this property</a>

use\_cloudflare\_reporting\_endpoint: boolean

When true, CSP reports will be sent to <a href="https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report">https://csp-reporting.cloudflare.com/cdn-cgi/script\_monitor/report</a>

<a href="#">Link to this property</a>

use\_connection\_url\_path: boolean

When true, the paths associated with connections URLs will also be analyzed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield%20%3E%20(model)%20page_shield_update_response%20%3E%20(schema)>)

#### Page ShieldPolicies

##### [List content security rules](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/list)

GET/zones/{zone\_id}/page\_shield/policies

##### [Get a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/get)

GET/zones/{zone\_id}/page\_shield/policies/{policy\_id}

##### [Create a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/create)

POST/zones/{zone\_id}/page\_shield/policies

##### [Update a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/update)

PUT/zones/{zone\_id}/page\_shield/policies/{policy\_id}

##### [Delete a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/delete)

DELETE/zones/{zone\_id}/page\_shield/policies/{policy\_id}

##### ModelsExpand Collapse

<details>

<summary>

PolicyListResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_list_response%20%3E%20(schema)>)

<details>

<summary>

PolicyGetResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_get_response%20%3E%20(schema)>)

<details>

<summary>

PolicyCreateResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_create_response%20%3E%20(schema)>)

<details>

<summary>

PolicyUpdateResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_update_response%20%3E%20(schema)>)

#### Page ShieldConnections

##### [List detected connections](https://developers.cloudflare.com/api/resources/page_shield/subresources/connections/methods/list)

GET/zones/{zone\_id}/page\_shield/connections

##### [Get a detected connection](https://developers.cloudflare.com/api/resources/page_shield/subresources/connections/methods/get)

GET/zones/{zone\_id}/page\_shield/connections/{connection\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConnectionListResponse object {id, added\_at, first\_seen\_at, 10 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.connections%20%3E%20(model)%20connection_list_response%20%3E%20(schema)>)

<details>

<summary>

ConnectionGetResponse object {id, added\_at, first\_seen\_at, 10 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.connections%20%3E%20(model)%20connection_get_response%20%3E%20(schema)>)

#### Page ShieldScripts

##### [List detected scripts](https://developers.cloudflare.com/api/resources/page_shield/subresources/scripts/methods/list)

GET/zones/{zone\_id}/page\_shield/scripts

##### [Get a detected script](https://developers.cloudflare.com/api/resources/page_shield/subresources/scripts/methods/get)

GET/zones/{zone\_id}/page\_shield/scripts/{script\_id}

##### ModelsExpand Collapse

<details>

<summary>

ScriptListResponse object {id, added\_at, first\_seen\_at, 18 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

cryptomining\_score: optional number

The cryptomining score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecateddataflow\_score: optional number

The dataflow score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

fetched\_at: optional string

The timestamp of when the script was last fetched.

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

hash: optional string

The computed hash of the analyzed script.

maxLength64

minLength64

<a href="#">Link to this property</a>

js\_integrity\_score: optional number

The integrity score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

magecart\_score: optional number

The magecart score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

malware\_score: optional number

The malware score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecatedobfuscation\_score: optional number

The obfuscation score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.scripts%20%3E%20(model)%20script_list_response%20%3E%20(schema)>)

<details>

<summary>

ScriptGetResponse object {id, added\_at, first\_seen\_at, 19 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

cryptomining\_score: optional number

The cryptomining score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecateddataflow\_score: optional number

The dataflow score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

fetched\_at: optional string

The timestamp of when the script was last fetched.

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

hash: optional string

The computed hash of the analyzed script.

maxLength64

minLength64

<a href="#">Link to this property</a>

js\_integrity\_score: optional number

The integrity score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

magecart\_score: optional number

The magecart score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

malware\_score: optional number

The malware score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecatedobfuscation\_score: optional number

The obfuscation score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

versions: optional array of object {cryptomining\_score, dataflow\_score, fetched\_at, 5 more }

</summary>

cryptomining\_score: optional number

The cryptomining score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecateddataflow\_score: optional number

The dataflow score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

fetched\_at: optional string

The timestamp of when the script was last fetched.

<a href="#">Link to this property</a>

hash: optional string

The computed hash of the analyzed script.

maxLength64

minLength64

<a href="#">Link to this property</a>

js\_integrity\_score: optional number

The integrity score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

magecart\_score: optional number

The magecart score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

malware\_score: optional number

The malware score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecatedobfuscation\_score: optional number

The obfuscation score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.scripts%20%3E%20(model)%20script_get_response%20%3E%20(schema)>)

#### Page ShieldCookies

##### [List detected cookies](https://developers.cloudflare.com/api/resources/page_shield/subresources/cookies/methods/list)

GET/zones/{zone\_id}/page\_shield/cookies

##### [Get a detected cookie](https://developers.cloudflare.com/api/resources/page_shield/subresources/cookies/methods/get)

GET/zones/{zone\_id}/page\_shield/cookies/{cookie\_id}

##### ModelsExpand Collapse

<details>

<summary>

CookieListResponse object {id, first\_seen\_at, host, 11 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "first\_party"or "unknown"

</summary>

One of the following:

"first\_party"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain\_attribute: optional string

<a href="#">Link to this property</a>

expires\_attribute: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_only\_attribute: optional boolean

<a href="#">Link to this property</a>

max\_age\_attribute: optional number

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

path\_attribute: optional string

<a href="#">Link to this property</a>

<details>

<summary>

same\_site\_attribute: optional "lax"or "strict"or "none"

</summary>

One of the following:

"lax"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

secure\_attribute: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(model)%20cookie_list_response%20%3E%20(schema)>)

<details>

<summary>

CookieGetResponse object {id, first\_seen\_at, host, 11 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "first\_party"or "unknown"

</summary>

One of the following:

"first\_party"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain\_attribute: optional string

<a href="#">Link to this property</a>

expires\_attribute: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_only\_attribute: optional boolean

<a href="#">Link to this property</a>

max\_age\_attribute: optional number

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

path\_attribute: optional string

<a href="#">Link to this property</a>

<details>

<summary>

same\_site\_attribute: optional "lax"or "strict"or "none"

</summary>

One of the following:

"lax"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

secure\_attribute: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(model)%20cookie_get_response%20%3E%20(schema)>)