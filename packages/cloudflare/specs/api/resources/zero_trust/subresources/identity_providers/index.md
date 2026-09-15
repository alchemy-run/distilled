---
title: Identity Providers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Identity Providers

##### [List Access identity providers](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/identity\_providers

##### [Get an Access identity provider](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/identity\_providers/{identity\_provider\_id}

##### [Add an Access identity provider](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/identity\_providers

##### [Update an Access identity provider](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/identity\_providers/{identity\_provider\_id}

##### [Delete an Access identity provider](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/identity\_providers/{identity\_provider\_id}

##### ModelsExpand Collapse

<details>

<summary>

AzureAD object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 5 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

conditional\_access\_enabled: optional boolean

Should Cloudflare try to load authentication contexts from your account

<a href="#">Link to this property</a>

directory\_id: optional string

Your Azure directory uuid

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

<details>

<summary>

prompt: optional "login"or "select\_account"or "none"

Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn’t presented with any interactive prompt. If the request can’t be completed silently by using single-sign on, the Microsoft identity platform returns an interaction\_required error. prompt=select\_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

</summary>

One of the following:

"login"

<a href="#">Link to this property</a>

"select\_account"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

support\_groups: optional boolean

Should Cloudflare try to load groups from your account

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20azure_ad%20%3E%20(schema)>)

<details>

<summary>

GenericOAuthConfig object {client\_id, client\_secret }

</summary>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)>)

<details>

<summary>

IdentityProvider = <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20azure_ad%20%3E%20(schema)">AzureAD</a> { config, name, type, 5 more } or object {config, name, type, 5 more } or object {config, name, type, 5 more } or 12 more

</summary>

One of the following:

<details>

<summary>

AzureAD object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 5 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

conditional\_access\_enabled: optional boolean

Should Cloudflare try to load authentication contexts from your account

<a href="#">Link to this property</a>

directory\_id: optional string

Your Azure directory uuid

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

<details>

<summary>

prompt: optional "login"or "select\_account"or "none"

Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn’t presented with any interactive prompt. If the request can’t be completed silently by using single-sign on, the Microsoft identity platform returns an interaction\_required error. prompt=select\_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

</summary>

One of the following:

"login"

<a href="#">Link to this property</a>

"select\_account"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

support\_groups: optional boolean

Should Cloudflare try to load groups from your account

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCentrify object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {centrify\_account, centrify\_app\_id, claims, 3 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

centrify\_account: optional string

Your centrify account url

<a href="#">Link to this property</a>

centrify\_app\_id: optional string

Your centrify app id

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessFacebook object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGitHub object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGoogle object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, email\_claim\_name }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGoogleApps object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {apps\_domain, claims, client\_id, 4 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

apps\_domain: optional string

Your companies TLD

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

<details>

<summary>

prompt: optional "none"or "consent"or "select\_account"

Configures the prompt behavior for Google authentication.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"consent"

<a href="#">Link to this property</a>

"select\_account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

use\_login\_hint: optional boolean

Whether to use a previously authenticated Access email as a Google login hint when exactly one email matches the Workspace domain.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedin object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDC object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {auth\_url, certs\_url, claims, 6 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

auth\_url: optional string

The authorization\_endpoint URL of your IdP

<a href="#">Link to this property</a>

certs\_url: optional string

The jwks\_uri endpoint of your IdP to allow the IdP keys to sign the tokens

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

pkce\_enabled: optional boolean

Enable Proof Key for Code Exchange (PKCE)

<a href="#">Link to this property</a>

scopes: optional array of string

OAuth scopes

<a href="#">Link to this property</a>

token\_url: optional string

The token\_endpoint URL of your IdP

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOkta object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {authorization\_server\_id, claims, client\_id, 3 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

authorization\_server\_id: optional string

Your okta authorization server id

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

okta\_account: optional string

Your okta account url

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOnelogin object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 2 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

onelogin\_account: optional string

Your OneLogin account url

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessPingone object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 2 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

ping\_env\_id: optional string

Your PingOne environment identifier

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessSAML object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {attributes, email\_attribute\_name, enable\_encryption, 7 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

attributes: optional array of string

A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

<a href="#">Link to this property</a>

email\_attribute\_name: optional string

The attribute name for email in the SAML response.

<a href="#">Link to this property</a>

enable\_encryption: optional boolean

Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt SAML assertions using the certificate from the assigned certificate set.

To enable encryption:

1. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>
2. Set this field to <code>true</code> and include <code>saml_certificate_set_id</code> in the PUT request
3. Configure the public certificate in your external Identity Provider

Note: Requires <code>saml_certificate_set_id</code> to be set when <code>true</code>.

<a href="#">Link to this property</a>

force\_authn: optional boolean

Asks the IdP to reauthenticate the user for each SAML authentication request.

<a href="#">Link to this property</a>

<details>

<summary>

header\_attributes: optional array of object {attribute\_name, header\_name }

Add a list of attribute names that will be returned in the response header from the Access callback.

</summary>

attribute\_name: optional string

attribute name from the IDP

<a href="#">Link to this property</a>

header\_name: optional string

header that will be added on the request to the origin

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

idp\_public\_certs: optional array of string

X509 certificate to verify the signature in the SAML authentication response

<a href="#">Link to this property</a>

issuer\_url: optional string

IdP Entity ID or Issuer URL

<a href="#">Link to this property</a>

max\_sso\_url\_length: optional number

The maximum URL length the IdP accepts for the SSO redirect URL. When the constructed SSO URL would exceed this length, the RelayState is stored server-side and a short nonce is passed to the IdP instead. Set this if your IdP enforces a URL length limit.

maximum100000

minimum512

<a href="#">Link to this property</a>

sign\_request: optional boolean

Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

<a href="#">Link to this property</a>

sso\_target\_url: optional string

URL to send the SAML authentication requests to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessYandex object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOnetimepin object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {redirect\_url }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

redirect\_url: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflare object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {redirect\_url, restrict\_to\_account\_members }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

redirect\_url: optional string

<a href="#">Link to this property</a>

restrict\_to\_account\_members: optional boolean

When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider%20%3E%20(schema)>)

<details>

<summary>

IdentityProviderSCIMConfig object {enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

</summary>

enabled: optional boolean

A flag to enable or disable SCIM for the identity provider.

<a href="#">Link to this property</a>

<details>

<summary>

identity\_update\_behavior: optional "automatic"or "reauth"or "no\_action"

Indicates how a SCIM event updates a user identity used for policy evaluation. Use “automatic” to automatically update a user’s identity and augment it with fields from the SCIM user resource. Use “reauth” to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With “reauth” identities will not contain fields from the SCIM user resource. With “no\_action” identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

</summary>

One of the following:

"automatic"

<a href="#">Link to this property</a>

"reauth"

<a href="#">Link to this property</a>

"no\_action"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scim\_base\_url: optional string

The base URL of Cloudflare’s SCIM V2.0 API endpoint.

<a href="#">Link to this property</a>

seat\_deprovision: optional boolean

A flag to remove a user’s seat in Zero Trust when they have been deprovisioned in the Identity Provider. This cannot be enabled unless user\_deprovision is also enabled.

<a href="#">Link to this property</a>

secret: optional string

A read-only token generated when the SCIM integration is enabled for the first time. It is redacted on subsequent requests. If you lose this you will need to refresh it at /access/identity\_providers/:idpID/refresh\_scim\_secret.

<a href="#">Link to this property</a>

user\_deprovision: optional boolean

A flag to enable revoking a user’s session in Access and Gateway when they have been deprovisioned in the Identity Provider.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)>)

<details>

<summary>

IdentityProviderType = "onetimepin"or "azureAD"or "saml"or 12 more

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

One of the following:

"onetimepin"

<a href="#">Link to this property</a>

"azureAD"

<a href="#">Link to this property</a>

"saml"

<a href="#">Link to this property</a>

"centrify"

<a href="#">Link to this property</a>

"facebook"

<a href="#">Link to this property</a>

"github"

<a href="#">Link to this property</a>

"google-apps"

<a href="#">Link to this property</a>

"google"

<a href="#">Link to this property</a>

"linkedin"

<a href="#">Link to this property</a>

"oidc"

<a href="#">Link to this property</a>

"okta"

<a href="#">Link to this property</a>

"onelogin"

<a href="#">Link to this property</a>

"pingone"

<a href="#">Link to this property</a>

"yandex"

<a href="#">Link to this property</a>

"cloudflare"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)>)

<details>

<summary>

IdentityProviderListResponse = <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20azure_ad%20%3E%20(schema)">AzureAD</a> { config, name, type, 5 more } or object {config, name, type, 5 more } or object {config, name, type, 5 more } or 12 more

</summary>

One of the following:

<details>

<summary>

AzureAD object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 5 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

conditional\_access\_enabled: optional boolean

Should Cloudflare try to load authentication contexts from your account

<a href="#">Link to this property</a>

directory\_id: optional string

Your Azure directory uuid

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

<details>

<summary>

prompt: optional "login"or "select\_account"or "none"

Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn’t presented with any interactive prompt. If the request can’t be completed silently by using single-sign on, the Microsoft identity platform returns an interaction\_required error. prompt=select\_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

</summary>

One of the following:

"login"

<a href="#">Link to this property</a>

"select\_account"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

support\_groups: optional boolean

Should Cloudflare try to load groups from your account

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCentrify object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {centrify\_account, centrify\_app\_id, claims, 3 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

centrify\_account: optional string

Your centrify account url

<a href="#">Link to this property</a>

centrify\_app\_id: optional string

Your centrify app id

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessFacebook object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGitHub object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGoogle object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, email\_claim\_name }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGoogleApps object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {apps\_domain, claims, client\_id, 4 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

apps\_domain: optional string

Your companies TLD

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

<details>

<summary>

prompt: optional "none"or "consent"or "select\_account"

Configures the prompt behavior for Google authentication.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"consent"

<a href="#">Link to this property</a>

"select\_account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

use\_login\_hint: optional boolean

Whether to use a previously authenticated Access email as a Google login hint when exactly one email matches the Workspace domain.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedin object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDC object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {auth\_url, certs\_url, claims, 6 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

auth\_url: optional string

The authorization\_endpoint URL of your IdP

<a href="#">Link to this property</a>

certs\_url: optional string

The jwks\_uri endpoint of your IdP to allow the IdP keys to sign the tokens

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

pkce\_enabled: optional boolean

Enable Proof Key for Code Exchange (PKCE)

<a href="#">Link to this property</a>

scopes: optional array of string

OAuth scopes

<a href="#">Link to this property</a>

token\_url: optional string

The token\_endpoint URL of your IdP

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOkta object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {authorization\_server\_id, claims, client\_id, 3 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

authorization\_server\_id: optional string

Your okta authorization server id

<a href="#">Link to this property</a>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

okta\_account: optional string

Your okta account url

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOnelogin object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 2 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

onelogin\_account: optional string

Your OneLogin account url

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessPingone object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {claims, client\_id, client\_secret, 2 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

claims: optional array of string

Custom claims

<a href="#">Link to this property</a>

client\_id: optional string

Your OAuth Client ID

<a href="#">Link to this property</a>

client\_secret: optional string

Your OAuth Client Secret

<a href="#">Link to this property</a>

email\_claim\_name: optional string

The claim name for email in the id\_token response.

<a href="#">Link to this property</a>

ping\_env\_id: optional string

Your PingOne environment identifier

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessSAML object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {attributes, email\_attribute\_name, enable\_encryption, 7 more }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

attributes: optional array of string

A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

<a href="#">Link to this property</a>

email\_attribute\_name: optional string

The attribute name for email in the SAML response.

<a href="#">Link to this property</a>

enable\_encryption: optional boolean

Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt SAML assertions using the certificate from the assigned certificate set.

To enable encryption:

1. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>
2. Set this field to <code>true</code> and include <code>saml_certificate_set_id</code> in the PUT request
3. Configure the public certificate in your external Identity Provider

Note: Requires <code>saml_certificate_set_id</code> to be set when <code>true</code>.

<a href="#">Link to this property</a>

force\_authn: optional boolean

Asks the IdP to reauthenticate the user for each SAML authentication request.

<a href="#">Link to this property</a>

<details>

<summary>

header\_attributes: optional array of object {attribute\_name, header\_name }

Add a list of attribute names that will be returned in the response header from the Access callback.

</summary>

attribute\_name: optional string

attribute name from the IDP

<a href="#">Link to this property</a>

header\_name: optional string

header that will be added on the request to the origin

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

idp\_public\_certs: optional array of string

X509 certificate to verify the signature in the SAML authentication response

<a href="#">Link to this property</a>

issuer\_url: optional string

IdP Entity ID or Issuer URL

<a href="#">Link to this property</a>

max\_sso\_url\_length: optional number

The maximum URL length the IdP accepts for the SSO redirect URL. When the constructed SSO URL would exceed this length, the RelayState is stored server-side and a short nonce is passed to the IdP instead. Set this if your IdP enforces a URL length limit.

maximum100000

minimum512

<a href="#">Link to this property</a>

sign\_request: optional boolean

Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

<a href="#">Link to this property</a>

sso\_target\_url: optional string

URL to send the SAML authentication requests to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessYandex object {config, name, type, 5 more }

</summary>

config: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20generic_oauth_config%20%3E%20(schema)">GenericOAuthConfig</a> { client\_id, client\_secret }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOnetimepin object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {redirect\_url }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

redirect\_url: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflare object {config, name, type, 5 more }

</summary>

<details>

<summary>

config: object {redirect\_url, restrict\_to\_account\_members }

The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

</summary>

redirect\_url: optional string

<a href="#">Link to this property</a>

restrict\_to\_account\_members: optional boolean

When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the identity provider, shown to users on the login page.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_type%20%3E%20(schema)">IdentityProviderType</a>

The type of identity provider. To determine the value for a specific provider, refer to our <a href="https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/">developer documentation</a>.

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

<a href="#">Link to this property</a>

<details>

<summary>

saml\_certificate\_set: optional object {created\_at, uid, updated\_at, 2 more }

The SAML encryption certificate set details, including current and previous certificates. Only present for SAML identity providers with a certificate set assigned.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

saml\_certificate\_set\_id: optional string

The UID of the SAML encryption certificate set assigned to this Identity Provider. Only present for SAML identity providers with encryption configured. Create a certificate set via POST to <code>/identity_providers/{id}/saml_certificate</code>.

formatuuid

<a href="#">Link to this property</a>

scim\_config: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_scim_config%20%3E%20(schema)">IdentityProviderSCIMConfig</a> { enabled, identity\_update\_behavior, scim\_base\_url, 3 more }

The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_list_response%20%3E%20(schema)>)

<details>

<summary>

IdentityProviderDeleteResponse object {id }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers%20%3E%20(model)%20identity_provider_delete_response%20%3E%20(schema)>)

#### Identity ProvidersSCIM

#### Identity ProvidersSCIMGroups

##### [List SCIM Group resources](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/scim/subresources/groups/methods/list)

GET/accounts/{account\_id}/access/identity\_providers/{identity\_provider\_id}/scim/groups

#### Identity ProvidersSCIMUsers

##### [List SCIM User resources](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/scim/subresources/users/methods/list)

GET/accounts/{account\_id}/access/identity\_providers/{identity\_provider\_id}/scim/users

#### Identity ProvidersSAML Certificate

##### [Create SAML encryption certificate for Identity Provider](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/saml_certificate/methods/create)

POST/accounts/{account\_id}/access/identity\_providers/{identity\_provider\_id}/saml\_certificate

##### ModelsExpand Collapse

<details>

<summary>

SAMLCertificateCreateResponse object {created\_at, uid, updated\_at, 2 more }

A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(model)%20saml_certificate_create_response%20%3E%20(schema)>)