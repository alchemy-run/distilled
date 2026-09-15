---
title: Delete an account or zone ruleset version
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rulesets](https://developers.cloudflare.com/api/resources/rulesets)

[Versions](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete an account or zone ruleset version

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/rulesets/{ruleset\_id}/versions/{ruleset\_version}

Deletes an existing version of an account or zone ruleset.

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

`Mass URL Redirects Write``Magic Firewall Write``L4 DDoS Managed Ruleset Write``Transform Rules Write``Select Configuration Write``Account WAF Write``Account Rulesets Write``Logs Write`

##### P ath ParametersExpand Collapse

ruleset\_id: string

The unique ID of the ruleset.

[Link to this property](#)%20rulesets.versions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20ruleset_id%20%3E%20(schema)>)

ruleset\_version: string

The version of the ruleset.

[Link to this property](#)%20rulesets.versions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20ruleset_version%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20rulesets.versions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20rulesets.versions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

dry\_run: optional boolean

Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204.

[Link to this property](#)%20rulesets.versions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20dry_run%20%3E%20(schema)>)

### Delete an account or zone ruleset version

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/rulesets/$RULESET_ID/versions/$RULESET_VERSION \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples