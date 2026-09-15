---
title: List an account or zone entry point ruleset's versions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rulesets](https://developers.cloudflare.com/api/resources/rulesets)

[Phases](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases)

[Versions](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List an account or zone entry point ruleset's versions

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/rulesets/phases/{ruleset\_phase}/entrypoint/versions

Fetches the versions of an account or zone entry point ruleset.

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

`Mass URL Redirects Write``Mass URL Redirects Read``Magic Firewall Write``Magic Firewall Read``L4 DDoS Managed Ruleset Write``L4 DDoS Managed Ruleset Read``Transform Rules Write``Transform Rules Read``Select Configuration Write``Select Configuration Read``Account WAF Write``Account WAF Read``Account Rulesets Read``Account Rulesets Write``Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

<details>

<summary>

ruleset\_phase: <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema)">Phase</a>

The phase of the ruleset.

</summary>

One of the following:

"ddos\_l4"

<a href="#">Link to this property</a>

"ddos\_l7"

<a href="#">Link to this property</a>

"http\_config\_settings"

<a href="#">Link to this property</a>

"http\_custom\_errors"

<a href="#">Link to this property</a>

"http\_log\_custom\_fields"

<a href="#">Link to this property</a>

"http\_ratelimit"

<a href="#">Link to this property</a>

"http\_request\_cache\_settings"

<a href="#">Link to this property</a>

"http\_request\_dynamic\_redirect"

<a href="#">Link to this property</a>

"http\_request\_firewall\_custom"

<a href="#">Link to this property</a>

"http\_request\_firewall\_managed"

<a href="#">Link to this property</a>

"http\_request\_late\_transform"

<a href="#">Link to this property</a>

"http\_request\_origin"

<a href="#">Link to this property</a>

"http\_request\_redirect"

<a href="#">Link to this property</a>

"http\_request\_sanitize"

<a href="#">Link to this property</a>

"http\_request\_sbfm"

<a href="#">Link to this property</a>

"http\_request\_transform"

<a href="#">Link to this property</a>

"http\_response\_cache\_settings"

<a href="#">Link to this property</a>

"http\_response\_compression"

<a href="#">Link to this property</a>

"http\_response\_firewall\_managed"

<a href="#">Link to this property</a>

"http\_response\_headers\_transform"

<a href="#">Link to this property</a>

"magic\_transit"

<a href="#">Link to this property</a>

"magic\_transit\_ids\_managed"

<a href="#">Link to this property</a>

"magic\_transit\_managed"

<a href="#">Link to this property</a>

"magic\_transit\_ratelimit"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ruleset_phase%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code, source }

A list of error messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code, source }

A list of warning messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, kind, last\_updated, 4 more }

A list of rulesets. The returned information will not include the rules in each ruleset.

</summary>

id: string

The unique ID of the ruleset.

<a href="#">Link to this property</a>

<details>

<summary>

kind: <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema)">Kind</a>

The kind of the ruleset.

</summary>

One of the following:

"managed"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

"root"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The human-readable name of the ruleset.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

phase: <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema)">Phase</a>

The phase of the ruleset.

</summary>

One of the following:

"ddos\_l4"

<a href="#">Link to this property</a>

"ddos\_l7"

<a href="#">Link to this property</a>

"http\_config\_settings"

<a href="#">Link to this property</a>

"http\_custom\_errors"

<a href="#">Link to this property</a>

"http\_log\_custom\_fields"

<a href="#">Link to this property</a>

"http\_ratelimit"

<a href="#">Link to this property</a>

"http\_request\_cache\_settings"

<a href="#">Link to this property</a>

"http\_request\_dynamic\_redirect"

<a href="#">Link to this property</a>

"http\_request\_firewall\_custom"

<a href="#">Link to this property</a>

"http\_request\_firewall\_managed"

<a href="#">Link to this property</a>

"http\_request\_late\_transform"

<a href="#">Link to this property</a>

"http\_request\_origin"

<a href="#">Link to this property</a>

"http\_request\_redirect"

<a href="#">Link to this property</a>

"http\_request\_sanitize"

<a href="#">Link to this property</a>

"http\_request\_sbfm"

<a href="#">Link to this property</a>

"http\_request\_transform"

<a href="#">Link to this property</a>

"http\_response\_cache\_settings"

<a href="#">Link to this property</a>

"http\_response\_compression"

<a href="#">Link to this property</a>

"http\_response\_firewall\_managed"

<a href="#">Link to this property</a>

"http\_response\_headers\_transform"

<a href="#">Link to this property</a>

"magic\_transit"

<a href="#">Link to this property</a>

"magic\_transit\_ids\_managed"

<a href="#">Link to this property</a>

"magic\_transit\_managed"

<a href="#">Link to this property</a>

"magic\_transit\_ratelimit"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: string

The version of the ruleset.

<a href="#">Link to this property</a>

description: optional string

An informative description of the ruleset.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {cursors }

Information to navigate the results.

</summary>

<details>

<summary>

cursors: optional object {after }

The set of cursors.

</summary>

after: string

The cursor to use for the next page.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.phases.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List an account or zone entry point ruleset's versions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/rulesets/phases/$RULESET_PHASE/entrypoint/versions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": [
    {
      "id": "2f2feab2026849078ba485f918791bdc",
      "kind": "root",
      "last_updated": "2000-01-01T00:00:00Z",
      "name": "My ruleset",
      "phase": "http_request_firewall_custom",
      "version": "1",
      "description": "A description for my ruleset."
    }
  ],
  "success": true,
  "result_info": {
    "cursors": {
      "after": "dGhpc2lzYW5leGFtcGxlCg"
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
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": [
    {
      "id": "2f2feab2026849078ba485f918791bdc",
      "kind": "root",
      "last_updated": "2000-01-01T00:00:00Z",
      "name": "My ruleset",
      "phase": "http_request_firewall_custom",
      "version": "1",
      "description": "A description for my ruleset."
    }
  ],
  "success": true,
  "result_info": {
    "cursors": {
      "after": "dGhpc2lzYW5leGFtcGxlCg"
    }
  }
}
```