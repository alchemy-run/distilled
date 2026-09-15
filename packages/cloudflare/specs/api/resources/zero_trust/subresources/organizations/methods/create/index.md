---
title: Create your Zero Trust organization
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Organizations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create your Zero Trust organization

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/organizations

Sets up a Zero Trust organization for your account or zone.

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

`Access: Organizations, Identity Providers, and Groups Write`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

auth\_domain: string

The unique subdomain assigned to your Zero Trust organization.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20auth_domain%20%3E%20(schema)>)

name: string

The name of your Zero Trust organization.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

allow\_authenticate\_via\_warp: optional boolean

When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20allow_authenticate_via_warp%20%3E%20(schema)>)

auto\_redirect\_to\_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20auto_redirect_to_identity%20%3E%20(schema)>)

deny\_unmatched\_requests: optional boolean

Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20deny_unmatched_requests%20%3E%20(schema)>)

deny\_unmatched\_requests\_exempted\_zone\_names: optional array of string

Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20deny_unmatched_requests_exempted_zone_names%20%3E%20(schema)>)

is\_ui\_read\_only: optional boolean

Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20is_ui_read_only%20%3E%20(schema)>)

<details>

<summary>

login\_design: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.organizations%20%3E%20(model)%20login_design%20%3E%20(schema)">LoginDesign</a> { background\_color, footer\_text, header\_text, 2 more }

</summary>

background\_color: optional string

The background color on your login page.

<a href="#">Link to this property</a>

footer\_text: optional string

The text at the bottom of your login page.

<a href="#">Link to this property</a>

header\_text: optional string

The text at the top of your login page.

<a href="#">Link to this property</a>

logo\_path: optional string

The URL of the logo on your login page.

<a href="#">Link to this property</a>

text\_color: optional string

The text color on your login page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20login_design%20%3E%20(schema)>)

<details>

<summary>

mfa\_config: optional object {allowed\_authenticators, amr\_matching\_session\_duration, required\_aaguids, session\_duration }

Configures multi-factor authentication (MFA) settings for an organization.

</summary>

<details>

<summary>

allowed\_authenticators: optional array of "totp"or "biometrics"or "security\_key"or 2 more

Lists the MFA methods that users can authenticate with. The <code>piv_key</code> and <code>ssh_fido2_key</code> values are supported only for infrastructure applications.

</summary>

One of the following:

"totp"

<a href="#">Link to this property</a>

"biometrics"

<a href="#">Link to this property</a>

"security\_key"

<a href="#">Link to this property</a>

"piv\_key"

<a href="#">Link to this property</a>

"ssh\_fido2\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

amr\_matching\_session\_duration: optional string

Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains “mfa”. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

<a href="#">Link to this property</a>

required\_aaguids: optional string

Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

formatuuid

<a href="#">Link to this property</a>

session\_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:<code>5m</code> or <code>24h</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mfa_config%20%3E%20(schema)>)

<details>

<summary>

mfa\_piv\_key\_requirements: optional object {pin\_policy, require\_fips\_device, ssh\_key\_size, 2 more }

Configures PIV key requirements for MFA using hardware security keys.

</summary>

<details>

<summary>

pin\_policy: optional "never"or "once"or "always"

Defines when a PIN is required to use the SSH key. Valid values: <code>never</code> (no PIN required), <code>once</code> (PIN required once per session), <code>always</code> (PIN required for each use).

</summary>

One of the following:

"never"

<a href="#">Link to this property</a>

"once"

<a href="#">Link to this property</a>

"always"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_fips\_device: optional boolean

Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

<a href="#">Link to this property</a>

<details>

<summary>

ssh\_key\_size: optional array of 256or 384or 521or 3 more

Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

</summary>

One of the following:

256

<a href="#">Link to this property</a>

384

<a href="#">Link to this property</a>

521

<a href="#">Link to this property</a>

2048

<a href="#">Link to this property</a>

3072

<a href="#">Link to this property</a>

4096

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssh\_key\_type: optional array of "ecdsa"or "ed25519"or "rsa"

Specifies the allowed SSH key types. Valid values are <code>ecdsa</code>, <code>ed25519</code>, and <code>rsa</code>.

</summary>

One of the following:

"ecdsa"

<a href="#">Link to this property</a>

"ed25519"

<a href="#">Link to this property</a>

"rsa"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

touch\_policy: optional "never"or "always"or "cached"

Defines when physical touch is required to use the SSH key. Valid values: <code>never</code> (no touch required), <code>always</code> (touch required for each use), <code>cached</code> (touch cached for 15 seconds).

</summary>

One of the following:

"never"

<a href="#">Link to this property</a>

"always"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mfa_piv_key_requirements%20%3E%20(schema)>)

mfa\_required\_for\_all\_apps: optional boolean

Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: ‘allowed\_authenticators’ cannot contain only the infrastructure SSH authenticators (‘piv\_key’ and ‘ssh\_fido2\_key’) if the organization has any non-infrastructure applications.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mfa_required_for_all_apps%20%3E%20(schema)>)

session\_duration: optional string

The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20session_duration%20%3E%20(schema)>)

ui\_read\_only\_toggle\_reason: optional string

A description of the reason why the UI read only field is being toggled.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ui_read_only_toggle_reason%20%3E%20(schema)>)

user\_seat\_expiration\_inactive\_time: optional string

The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count. Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20user_seat_expiration_inactive_time%20%3E%20(schema)>)

warp\_auth\_non\_browser\_401: optional boolean

When enabled, unsuccessful WARP authentication requests with a non-HTML Accept header return a 401 response instead of redirecting to the login page.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20warp_auth_non_browser_401%20%3E%20(schema)>)

warp\_auth\_session\_duration: optional string

The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20warp_auth_session_duration%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.organizations%20%3E%20(model)%20organization%20%3E%20(schema)">Organization</a> { allow\_authenticate\_via\_warp, auth\_domain, auto\_redirect\_to\_identity, 14 more }

</summary>

allow\_authenticate\_via\_warp: optional boolean

When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

<a href="#">Link to this property</a>

auth\_domain: optional string

The unique subdomain assigned to your Zero Trust organization.

<a href="#">Link to this property</a>

auto\_redirect\_to\_identity: optional boolean

When set to <code>true</code>, users skip the identity provider selection step during login.

<a href="#">Link to this property</a>

<details>

<summary>

custom\_pages: optional object {forbidden, identity\_denied }

</summary>

forbidden: optional string

The uid of the custom page to use when a user is denied access after failing a non-identity rule.

<a href="#">Link to this property</a>

identity\_denied: optional string

The uid of the custom page to use when a user is denied access.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deny\_unmatched\_requests: optional boolean

Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the <code>deny_unmatched_requests_exempted_zone_names</code> array.

<a href="#">Link to this property</a>

deny\_unmatched\_requests\_exempted\_zone\_names: optional array of string

Contains zone names to exempt from the <code>deny_unmatched_requests</code> feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

<a href="#">Link to this property</a>

is\_ui\_read\_only: optional boolean

Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

<a href="#">Link to this property</a>

<details>

<summary>

login\_design: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.organizations%20%3E%20(model)%20login_design%20%3E%20(schema)">LoginDesign</a> { background\_color, footer\_text, header\_text, 2 more }

</summary>

background\_color: optional string

The background color on your login page.

<a href="#">Link to this property</a>

footer\_text: optional string

The text at the bottom of your login page.

<a href="#">Link to this property</a>

header\_text: optional string

The text at the top of your login page.

<a href="#">Link to this property</a>

logo\_path: optional string

The URL of the logo on your login page.

<a href="#">Link to this property</a>

text\_color: optional string

The text color on your login page.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mfa\_config: optional object {allowed\_authenticators, amr\_matching\_session\_duration, required\_aaguids, session\_duration }

Configures multi-factor authentication (MFA) settings for an organization.

</summary>

<details>

<summary>

allowed\_authenticators: optional array of "totp"or "biometrics"or "security\_key"or 2 more

Lists the MFA methods that users can authenticate with. The <code>piv_key</code> and <code>ssh_fido2_key</code> values are supported only for infrastructure applications.

</summary>

One of the following:

"totp"

<a href="#">Link to this property</a>

"biometrics"

<a href="#">Link to this property</a>

"security\_key"

<a href="#">Link to this property</a>

"piv\_key"

<a href="#">Link to this property</a>

"ssh\_fido2\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

amr\_matching\_session\_duration: optional string

Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains “mfa”. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

<a href="#">Link to this property</a>

required\_aaguids: optional string

Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

formatuuid

<a href="#">Link to this property</a>

session\_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:<code>5m</code> or <code>24h</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mfa\_piv\_key\_requirements: optional object {pin\_policy, require\_fips\_device, ssh\_key\_size, 2 more }

Configures PIV key requirements for MFA using hardware security keys.

</summary>

<details>

<summary>

pin\_policy: optional "never"or "once"or "always"

Defines when a PIN is required to use the SSH key. Valid values: <code>never</code> (no PIN required), <code>once</code> (PIN required once per session), <code>always</code> (PIN required for each use).

</summary>

One of the following:

"never"

<a href="#">Link to this property</a>

"once"

<a href="#">Link to this property</a>

"always"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_fips\_device: optional boolean

Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

<a href="#">Link to this property</a>

<details>

<summary>

ssh\_key\_size: optional array of 256or 384or 521or 3 more

Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

</summary>

One of the following:

256

<a href="#">Link to this property</a>

384

<a href="#">Link to this property</a>

521

<a href="#">Link to this property</a>

2048

<a href="#">Link to this property</a>

3072

<a href="#">Link to this property</a>

4096

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssh\_key\_type: optional array of "ecdsa"or "ed25519"or "rsa"

Specifies the allowed SSH key types. Valid values are <code>ecdsa</code>, <code>ed25519</code>, and <code>rsa</code>.

</summary>

One of the following:

"ecdsa"

<a href="#">Link to this property</a>

"ed25519"

<a href="#">Link to this property</a>

"rsa"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

touch\_policy: optional "never"or "always"or "cached"

Defines when physical touch is required to use the SSH key. Valid values: <code>never</code> (no touch required), <code>always</code> (touch required for each use), <code>cached</code> (touch cached for 15 seconds).

</summary>

One of the following:

"never"

<a href="#">Link to this property</a>

"always"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mfa\_required\_for\_all\_apps: optional boolean

Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: ‘allowed\_authenticators’ cannot contain only the infrastructure SSH authenticators (‘piv\_key’ and ‘ssh\_fido2\_key’) if the organization has any non-infrastructure applications.

<a href="#">Link to this property</a>

name: optional string

The name of your Zero Trust organization.

<a href="#">Link to this property</a>

session\_duration: optional string

The amount of time that tokens issued for applications will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>. Valid time units are: ns, us (or µs), ms, s, m, h.

<a href="#">Link to this property</a>

ui\_read\_only\_toggle\_reason: optional string

A description of the reason why the UI read only field is being toggled.

<a href="#">Link to this property</a>

user\_seat\_expiration\_inactive\_time: optional string

The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count. Minimum value for this setting is 1 month (730h). Must be in the format <code>300ms</code> or <code>2h45m</code>. Valid time units are: <code>ns</code>, <code>us</code> (or <code>µs</code>), <code>ms</code>, <code>s</code>, <code>m</code>, <code>h</code>.

<a href="#">Link to this property</a>

warp\_auth\_non\_browser\_401: optional boolean

When enabled, unsuccessful WARP authentication requests with a non-HTML Accept header return a 401 response instead of redirecting to the login page.

<a href="#">Link to this property</a>

warp\_auth\_session\_duration: optional string

The amount of time that tokens issued for applications will be valid. Must be in the format <code>30m</code> or <code>2h45m</code>. Valid time units are: m, h.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create your Zero Trust organization

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_domain": "test.cloudflareaccess.com",
          "name": "Widget Corps Internal Applications",
          "deny_unmatched_requests_exempted_zone_names": [
            "example.com"
          ],
          "session_duration": "24h",
          "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
          "user_seat_expiration_inactive_time": "730h",
          "warp_auth_session_duration": "24h"
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
    "allow_authenticate_via_warp": true,
    "auth_domain": "test.cloudflareaccess.com",
    "auto_redirect_to_identity": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "custom_pages": {
      "forbidden": "699d98642c564d2e855e9661899b7252",
      "identity_denied": "699d98642c564d2e855e9661899b7252"
    },
    "deny_unmatched_requests": true,
    "deny_unmatched_requests_exempted_zone_names": [
      "example.com"
    ],
    "is_ui_read_only": true,
    "login_design": {
      "background_color": "#c5ed1b",
      "footer_text": "This is an example description.",
      "header_text": "This is an example description.",
      "logo_path": "https://example.com/logo.png",
      "text_color": "#c5ed1b"
    },
    "mfa_config": {
      "allowed_authenticators": [
        "totp",
        "biometrics",
        "security_key"
      ],
      "amr_matching_session_duration": "12h",
      "required_aaguids": "2fc0579f-8113-47ea-b116-bb5a8db9202a",
      "session_duration": "24h"
    },
    "mfa_piv_key_requirements": {
      "pin_policy": "always",
      "require_fips_device": true,
      "ssh_key_size": [
        256,
        2048
      ],
      "ssh_key_type": [
        "ecdsa",
        "rsa"
      ],
      "touch_policy": "always"
    },
    "mfa_required_for_all_apps": false,
    "name": "Widget Corps Internal Applications",
    "session_duration": "24h",
    "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "user_seat_expiration_inactive_time": "730h",
    "warp_auth_non_browser_401": false,
    "warp_auth_session_duration": "24h"
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
    "allow_authenticate_via_warp": true,
    "auth_domain": "test.cloudflareaccess.com",
    "auto_redirect_to_identity": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "custom_pages": {
      "forbidden": "699d98642c564d2e855e9661899b7252",
      "identity_denied": "699d98642c564d2e855e9661899b7252"
    },
    "deny_unmatched_requests": true,
    "deny_unmatched_requests_exempted_zone_names": [
      "example.com"
    ],
    "is_ui_read_only": true,
    "login_design": {
      "background_color": "#c5ed1b",
      "footer_text": "This is an example description.",
      "header_text": "This is an example description.",
      "logo_path": "https://example.com/logo.png",
      "text_color": "#c5ed1b"
    },
    "mfa_config": {
      "allowed_authenticators": [
        "totp",
        "biometrics",
        "security_key"
      ],
      "amr_matching_session_duration": "12h",
      "required_aaguids": "2fc0579f-8113-47ea-b116-bb5a8db9202a",
      "session_duration": "24h"
    },
    "mfa_piv_key_requirements": {
      "pin_policy": "always",
      "require_fips_device": true,
      "ssh_key_size": [
        256,
        2048
      ],
      "ssh_key_type": [
        "ecdsa",
        "rsa"
      ],
      "touch_policy": "always"
    },
    "mfa_required_for_all_apps": false,
    "name": "Widget Corps Internal Applications",
    "session_duration": "24h",
    "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "user_seat_expiration_inactive_time": "730h",
    "warp_auth_non_browser_401": false,
    "warp_auth_session_duration": "24h"
  }
}
```