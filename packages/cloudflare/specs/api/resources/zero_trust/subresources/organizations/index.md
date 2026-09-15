---
title: Organizations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Organizations

##### [Get your Zero Trust organization](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/organizations

##### [Create your Zero Trust organization](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/organizations

##### [Update your Zero Trust organization](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/organizations

##### [Revoke all Access tokens for a user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations/methods/revoke_users)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/organizations/revoke\_user

##### ModelsExpand Collapse

<details>

<summary>

LoginDesign object {background\_color, footer\_text, header\_text, 2 more }

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

[Link to this property](#)%20zero_trust.organizations%20%3E%20(model)%20login_design%20%3E%20(schema)>)

<details>

<summary>

Organization object {allow\_authenticate\_via\_warp, auth\_domain, auto\_redirect\_to\_identity, 14 more }

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

login\_design: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.organizations%20%3E%20(model)%20login_design%20%3E%20(schema)">LoginDesign</a> { background\_color, footer\_text, header\_text, 2 more }

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

[Link to this property](#)%20zero_trust.organizations%20%3E%20(model)%20organization%20%3E%20(schema)>)

<details>

<summary>

OrganizationListResponse object {allow\_authenticate\_via\_warp, auth\_domain, auto\_redirect\_to\_identity, 15 more }

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

login\_design: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.organizations%20%3E%20(model)%20login_design%20%3E%20(schema)">LoginDesign</a> { background\_color, footer\_text, header\_text, 2 more }

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

trusted\_accounts: optional array of string

The account tags of organizations trusted by this organization for policy and device posture sharing.

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

[Link to this property](#)%20zero_trust.organizations%20%3E%20(model)%20organization_list_response%20%3E%20(schema)>)

<details>

<summary>

OrganizationRevokeUsersResponse = trueor false

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations%20%3E%20(model)%20organization_revoke_users_response%20%3E%20(schema)>)

#### OrganizationsDOH

##### [Get your Zero Trust organization DoH settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations/subresources/doh/methods/get)

GET/accounts/{account\_id}/access/organizations/doh

##### [Update your Zero Trust organization DoH settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations/subresources/doh/methods/update)

PUT/accounts/{account\_id}/access/organizations/doh

##### ModelsExpand Collapse

<details>

<summary>

DOHGetResponse object {id, client\_id, doh\_jwt\_duration, 4 more }

</summary>

id: optional string

The ID of the service token.

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

doh\_jwt\_duration: optional string

The duration the DoH JWT is valid for. Must be in the format <code>300ms</code> or <code>2h45m</code>. Valid time units are: ns, us (or µs), ms, s, m, h. Note that the maximum duration for this setting is the same as the key rotation period on the account.

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

expires\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations.doh%20%3E%20(model)%20doh_get_response%20%3E%20(schema)>)

<details>

<summary>

DOHUpdateResponse object {id, client\_id, doh\_jwt\_duration, 4 more }

</summary>

id: optional string

The ID of the service token.

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

doh\_jwt\_duration: optional string

The duration the DoH JWT is valid for. Must be in the format <code>300ms</code> or <code>2h45m</code>. Valid time units are: ns, us (or µs), ms, s, m, h. Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

expires\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations.doh%20%3E%20(model)%20doh_update_response%20%3E%20(schema)>)