---
title: Update Zaraz configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zaraz](https://developers.cloudflare.com/api/resources/zaraz)

[Config](https://developers.cloudflare.com/api/resources/zaraz/subresources/config)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Zaraz configuration

PUT/zones/{zone\_id}/settings/zaraz/config

Updates Zaraz configuration for a zone.

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

`Zaraz Edit``Zaraz Admin`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

dataLayer: boolean

Data layer compatibility mode enabled.

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20dataLayer%20%3E%20(schema)>)

debugKey: string

The key for Zaraz debug mode.

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20debugKey%20%3E%20(schema)>)

<details>

<summary>

settings: object {autoInjectScript, contextEnricher, cookieDomain, 11 more }

General Zaraz settings.

</summary>

autoInjectScript: boolean

Automatic injection of Zaraz scripts enabled.

<a href="#">Link to this property</a>

<details>

<summary>

contextEnricher: optional object {escapedWorkerName, workerTag }

Details of the worker that receives and edits Zaraz Context object.

</summary>

escapedWorkerName: string

<a href="#">Link to this property</a>

workerTag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cookieDomain: optional string

The domain Zaraz will use for writing and reading its cookies.

<a href="#">Link to this property</a>

ecommerce: optional boolean

Ecommerce API enabled.

<a href="#">Link to this property</a>

eventsApiPath: optional string

Custom endpoint for server-side track events.

<a href="#">Link to this property</a>

hideExternalReferer: optional boolean

Hiding external referrer URL enabled.

<a href="#">Link to this property</a>

hideIPAddress: optional boolean

Trimming IP address enabled.

<a href="#">Link to this property</a>

hideQueryParams: optional boolean

Removing URL query params enabled.

<a href="#">Link to this property</a>

hideUserAgent: optional boolean

Removing sensitive data from User Agent string enabled.

<a href="#">Link to this property</a>

initPath: optional string

Custom endpoint for Zaraz init script.

<a href="#">Link to this property</a>

injectIframes: optional boolean

Injection of Zaraz scripts into iframes enabled.

<a href="#">Link to this property</a>

mcRootPath: optional string

Custom path for Managed Components server functionalities.

<a href="#">Link to this property</a>

scriptPath: optional string

Custom endpoint for Zaraz main script.

<a href="#">Link to this property</a>

trackPath: optional string

Custom endpoint for Zaraz tracking requests.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20settings%20%3E%20(schema)>)

<details>

<summary>

tools: map\[object {blockingTriggers, component, defaultFields, 10 more } or object {blockingTriggers, component, defaultFields, 11 more } ]

Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

</summary>

One of the following:

<details>

<summary>

ZarazManagedComponent object {blockingTriggers, component, defaultFields, 10 more }

</summary>

blockingTriggers: array of string

List of blocking trigger IDs.

<a href="#">Link to this property</a>

component: string

Tool’s internal name.

<a href="#">Link to this property</a>

<details>

<summary>

defaultFields: map\[stringor boolean]

Default fields for tool’s actions.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether tool is enabled.

<a href="#">Link to this property</a>

name: string

Tool’s name defined by the user.

<a href="#">Link to this property</a>

permissions: array of string

List of permissions granted to the component.

<a href="#">Link to this property</a>

<details>

<summary>

settings: map\[stringor boolean]

Tool’s settings.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "component"

<a href="#">Link to this property</a>

<details>

<summary>

actions: optional map\[<a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers } ]

Actions configured on a tool. Either this or neoEvents field is required.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

defaultPurpose: optional string

Default consent purpose ID.

<a href="#">Link to this property</a>

<details>

<summary>

neoEvents: optional array of <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers }

DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendorName: optional string

Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

vendorPolicyUrl: optional string

Vendor’s Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Worker object {blockingTriggers, component, defaultFields, 11 more }

</summary>

blockingTriggers: array of string

List of blocking trigger IDs.

<a href="#">Link to this property</a>

component: string

Tool’s internal name.

<a href="#">Link to this property</a>

<details>

<summary>

defaultFields: map\[stringor boolean]

Default fields for tool’s actions.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether tool is enabled.

<a href="#">Link to this property</a>

name: string

Tool’s name defined by the user.

<a href="#">Link to this property</a>

permissions: array of string

List of permissions granted to the component.

<a href="#">Link to this property</a>

<details>

<summary>

settings: map\[stringor boolean]

Tool’s settings.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom-mc"

<a href="#">Link to this property</a>

<details>

<summary>

worker: object {escapedWorkerName, workerTag }

Cloudflare worker that acts as a managed component.

</summary>

escapedWorkerName: string

<a href="#">Link to this property</a>

workerTag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actions: optional map\[<a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers } ]

Actions configured on a tool. Either this or neoEvents field is required.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

defaultPurpose: optional string

Default consent purpose ID.

<a href="#">Link to this property</a>

<details>

<summary>

neoEvents: optional array of <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers }

DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendorName: optional string

Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

vendorPolicyUrl: optional string

Vendor’s Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20tools%20%3E%20(schema)>)

<details>

<summary>

triggers: map\[object {excludeRules, loadRules, name, 2 more } ]

Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.

</summary>

<details>

<summary>

excludeRules: array of object {id, match, op, value } or object {id, action, settings } or object {id, action, settings } or 4 more

Rules defining when the trigger is not fired.

</summary>

One of the following:

<details>

<summary>

ZarazLoadRule object {id, match, op, value }

</summary>

id: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

<details>

<summary>

op: "CONTAINS"or "EQUALS"or "STARTS\_WITH"or 7 more

</summary>

One of the following:

"CONTAINS"

<a href="#">Link to this property</a>

"EQUALS"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"NOT\_MATCH\_REGEX"

<a href="#">Link to this property</a>

"GREATER\_THAN"

<a href="#">Link to this property</a>

"GREATER\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

"LESS\_THAN"

<a href="#">Link to this property</a>

"LESS\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazClickListenerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "clickListener"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, type, waitForTags }

</summary>

selector: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "xpath"or "css"

</summary>

One of the following:

"xpath"

<a href="#">Link to this property</a>

"css"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

waitForTags: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazTimerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "timer"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {interval, limit }

</summary>

interval: number

minimum50

<a href="#">Link to this property</a>

limit: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazFormSubmissionRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "formSubmission"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, validate }

</summary>

selector: string

<a href="#">Link to this property</a>

validate: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazVariableMatchRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "variableMatch"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {match, variable }

</summary>

match: string

<a href="#">Link to this property</a>

variable: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazScrollDepthRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "scrollDepth"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {positions }

</summary>

positions: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazElementVisibilityRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "elementVisibility"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector }

</summary>

selector: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

loadRules: array of object {id, match, op, value } or object {id, action, settings } or object {id, action, settings } or 4 more

Rules defining when the trigger is fired.

</summary>

One of the following:

<details>

<summary>

ZarazLoadRule object {id, match, op, value }

</summary>

id: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

<details>

<summary>

op: "CONTAINS"or "EQUALS"or "STARTS\_WITH"or 7 more

</summary>

One of the following:

"CONTAINS"

<a href="#">Link to this property</a>

"EQUALS"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"NOT\_MATCH\_REGEX"

<a href="#">Link to this property</a>

"GREATER\_THAN"

<a href="#">Link to this property</a>

"GREATER\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

"LESS\_THAN"

<a href="#">Link to this property</a>

"LESS\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazClickListenerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "clickListener"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, type, waitForTags }

</summary>

selector: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "xpath"or "css"

</summary>

One of the following:

"xpath"

<a href="#">Link to this property</a>

"css"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

waitForTags: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazTimerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "timer"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {interval, limit }

</summary>

interval: number

minimum50

<a href="#">Link to this property</a>

limit: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazFormSubmissionRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "formSubmission"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, validate }

</summary>

selector: string

<a href="#">Link to this property</a>

validate: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazVariableMatchRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "variableMatch"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {match, variable }

</summary>

match: string

<a href="#">Link to this property</a>

variable: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazScrollDepthRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "scrollDepth"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {positions }

</summary>

positions: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazElementVisibilityRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "elementVisibility"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector }

</summary>

selector: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Trigger name.

<a href="#">Link to this property</a>

description: optional string

Trigger description.

<a href="#">Link to this property</a>

system: optional "pageload"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20triggers%20%3E%20(schema)>)

<details>

<summary>

variables: map\[object {name, type, value } or object {name, type, value } or object {name, type, value } ]

Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of variables of type secret are not included.

</summary>

One of the following:

<details>

<summary>

String object {name, type, value }

</summary>

name: string

<a href="#">Link to this property</a>

type: "string"

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Secret object {name, type, value }

</summary>

name: string

<a href="#">Link to this property</a>

type: "secret"

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Worker object {name, type, value }

</summary>

name: string

<a href="#">Link to this property</a>

type: "worker"

<a href="#">Link to this property</a>

<details>

<summary>

value: object {escapedWorkerName, workerTag }

</summary>

escapedWorkerName: string

<a href="#">Link to this property</a>

workerTag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20variables%20%3E%20(schema)>)

zarazVersion: number

Zaraz internal version of the config.

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20zarazVersion%20%3E%20(schema)>)

<details>

<summary>

analytics: optional object {defaultPurpose, enabled, sessionExpTime }

Cloudflare Monitoring settings.

</summary>

defaultPurpose: optional string

Consent purpose assigned to Monitoring.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether Advanced Monitoring reports are enabled.

<a href="#">Link to this property</a>

sessionExpTime: optional number

Session expiration time (seconds).

maximum86400

minimum60

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20analytics%20%3E%20(schema)>)

<details>

<summary>

consent: optional object {enabled, buttonTextTranslations, companyEmail, 12 more }

Consent management configuration.

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

buttonTextTranslations: optional <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20button_text_translation%20%3E%20(schema)">ButtonTextTranslation</a> { accept\_all, confirm\_my\_choices, reject\_all }

</summary>

accept\_all: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

confirm\_my\_choices: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

reject\_all: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

companyEmail: optional string

<a href="#">Link to this property</a>

companyName: optional string

<a href="#">Link to this property</a>

companyStreetAddress: optional string

<a href="#">Link to this property</a>

consentModalIntroHTML: optional string

<a href="#">Link to this property</a>

consentModalIntroHTMLWithTranslations: optional map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

cookieName: optional string

<a href="#">Link to this property</a>

customCSS: optional string

<a href="#">Link to this property</a>

customIntroDisclaimerDismissed: optional boolean

<a href="#">Link to this property</a>

defaultLanguage: optional string

<a href="#">Link to this property</a>

hideModal: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

purposes: optional map\[object {description, name } ]

Object where keys are purpose alpha-numeric IDs.

</summary>

description: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

purposesWithTranslations: optional map\[object {description, name, order } ]

Object where keys are purpose alpha-numeric IDs.

</summary>

description: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

name: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

order: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcfCompliant: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20consent%20%3E%20(schema)>)

historyChange: optional boolean

Single Page Application support enabled.

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20historyChange%20%3E%20(schema)>)

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

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz.config%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { dataLayer, debugKey, settings, 7 more }

Zaraz configuration.

</summary>

dataLayer: boolean

Data layer compatibility mode enabled.

<a href="#">Link to this property</a>

debugKey: string

The key for Zaraz debug mode.

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {autoInjectScript, contextEnricher, cookieDomain, 11 more }

General Zaraz settings.

</summary>

autoInjectScript: boolean

Automatic injection of Zaraz scripts enabled.

<a href="#">Link to this property</a>

<details>

<summary>

contextEnricher: optional object {escapedWorkerName, workerTag }

Details of the worker that receives and edits Zaraz Context object.

</summary>

escapedWorkerName: string

<a href="#">Link to this property</a>

workerTag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cookieDomain: optional string

The domain Zaraz will use for writing and reading its cookies.

<a href="#">Link to this property</a>

ecommerce: optional boolean

Ecommerce API enabled.

<a href="#">Link to this property</a>

eventsApiPath: optional string

Custom endpoint for server-side track events.

<a href="#">Link to this property</a>

hideExternalReferer: optional boolean

Hiding external referrer URL enabled.

<a href="#">Link to this property</a>

hideIPAddress: optional boolean

Trimming IP address enabled.

<a href="#">Link to this property</a>

hideQueryParams: optional boolean

Removing URL query params enabled.

<a href="#">Link to this property</a>

hideUserAgent: optional boolean

Removing sensitive data from User Agent string enabled.

<a href="#">Link to this property</a>

initPath: optional string

Custom endpoint for Zaraz init script.

<a href="#">Link to this property</a>

injectIframes: optional boolean

Injection of Zaraz scripts into iframes enabled.

<a href="#">Link to this property</a>

mcRootPath: optional string

Custom path for Managed Components server functionalities.

<a href="#">Link to this property</a>

scriptPath: optional string

Custom endpoint for Zaraz main script.

<a href="#">Link to this property</a>

trackPath: optional string

Custom endpoint for Zaraz tracking requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tools: map\[object {blockingTriggers, component, defaultFields, 10 more } or object {blockingTriggers, component, defaultFields, 11 more } ]

Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

</summary>

One of the following:

<details>

<summary>

ZarazManagedComponent object {blockingTriggers, component, defaultFields, 10 more }

</summary>

blockingTriggers: array of string

List of blocking trigger IDs.

<a href="#">Link to this property</a>

component: string

Tool’s internal name.

<a href="#">Link to this property</a>

<details>

<summary>

defaultFields: map\[stringor boolean]

Default fields for tool’s actions.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether tool is enabled.

<a href="#">Link to this property</a>

name: string

Tool’s name defined by the user.

<a href="#">Link to this property</a>

permissions: array of string

List of permissions granted to the component.

<a href="#">Link to this property</a>

<details>

<summary>

settings: map\[stringor boolean]

Tool’s settings.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "component"

<a href="#">Link to this property</a>

<details>

<summary>

actions: optional map\[<a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers } ]

Actions configured on a tool. Either this or neoEvents field is required.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

defaultPurpose: optional string

Default consent purpose ID.

<a href="#">Link to this property</a>

<details>

<summary>

neoEvents: optional array of <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers }

DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendorName: optional string

Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

vendorPolicyUrl: optional string

Vendor’s Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Worker object {blockingTriggers, component, defaultFields, 11 more }

</summary>

blockingTriggers: array of string

List of blocking trigger IDs.

<a href="#">Link to this property</a>

component: string

Tool’s internal name.

<a href="#">Link to this property</a>

<details>

<summary>

defaultFields: map\[stringor boolean]

Default fields for tool’s actions.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether tool is enabled.

<a href="#">Link to this property</a>

name: string

Tool’s name defined by the user.

<a href="#">Link to this property</a>

permissions: array of string

List of permissions granted to the component.

<a href="#">Link to this property</a>

<details>

<summary>

settings: map\[stringor boolean]

Tool’s settings.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom-mc"

<a href="#">Link to this property</a>

<details>

<summary>

worker: object {escapedWorkerName, workerTag }

Cloudflare worker that acts as a managed component.

</summary>

escapedWorkerName: string

<a href="#">Link to this property</a>

workerTag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actions: optional map\[<a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers } ]

Actions configured on a tool. Either this or neoEvents field is required.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

defaultPurpose: optional string

Default consent purpose ID.

<a href="#">Link to this property</a>

<details>

<summary>

neoEvents: optional array of <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20neo_event%20%3E%20(schema)">NeoEvent</a> { actionType, blockingTriggers, data, firingTriggers }

DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.

</summary>

actionType: string

Tool event type.

<a href="#">Link to this property</a>

blockingTriggers: array of string

List of blocking triggers IDs.

<a href="#">Link to this property</a>

data: unknown

Event payload.

<a href="#">Link to this property</a>

firingTriggers: array of string

List of firing triggers IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendorName: optional string

Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

vendorPolicyUrl: optional string

Vendor’s Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

triggers: map\[object {excludeRules, loadRules, name, 2 more } ]

Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.

</summary>

<details>

<summary>

excludeRules: array of object {id, match, op, value } or object {id, action, settings } or object {id, action, settings } or 4 more

Rules defining when the trigger is not fired.

</summary>

One of the following:

<details>

<summary>

ZarazLoadRule object {id, match, op, value }

</summary>

id: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

<details>

<summary>

op: "CONTAINS"or "EQUALS"or "STARTS\_WITH"or 7 more

</summary>

One of the following:

"CONTAINS"

<a href="#">Link to this property</a>

"EQUALS"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"NOT\_MATCH\_REGEX"

<a href="#">Link to this property</a>

"GREATER\_THAN"

<a href="#">Link to this property</a>

"GREATER\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

"LESS\_THAN"

<a href="#">Link to this property</a>

"LESS\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazClickListenerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "clickListener"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, type, waitForTags }

</summary>

selector: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "xpath"or "css"

</summary>

One of the following:

"xpath"

<a href="#">Link to this property</a>

"css"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

waitForTags: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazTimerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "timer"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {interval, limit }

</summary>

interval: number

minimum50

<a href="#">Link to this property</a>

limit: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazFormSubmissionRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "formSubmission"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, validate }

</summary>

selector: string

<a href="#">Link to this property</a>

validate: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazVariableMatchRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "variableMatch"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {match, variable }

</summary>

match: string

<a href="#">Link to this property</a>

variable: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazScrollDepthRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "scrollDepth"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {positions }

</summary>

positions: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazElementVisibilityRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "elementVisibility"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector }

</summary>

selector: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

loadRules: array of object {id, match, op, value } or object {id, action, settings } or object {id, action, settings } or 4 more

Rules defining when the trigger is fired.

</summary>

One of the following:

<details>

<summary>

ZarazLoadRule object {id, match, op, value }

</summary>

id: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

<details>

<summary>

op: "CONTAINS"or "EQUALS"or "STARTS\_WITH"or 7 more

</summary>

One of the following:

"CONTAINS"

<a href="#">Link to this property</a>

"EQUALS"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"NOT\_MATCH\_REGEX"

<a href="#">Link to this property</a>

"GREATER\_THAN"

<a href="#">Link to this property</a>

"GREATER\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

"LESS\_THAN"

<a href="#">Link to this property</a>

"LESS\_THAN\_OR\_EQUAL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazClickListenerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "clickListener"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, type, waitForTags }

</summary>

selector: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "xpath"or "css"

</summary>

One of the following:

"xpath"

<a href="#">Link to this property</a>

"css"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

waitForTags: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazTimerRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "timer"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {interval, limit }

</summary>

interval: number

minimum50

<a href="#">Link to this property</a>

limit: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazFormSubmissionRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "formSubmission"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector, validate }

</summary>

selector: string

<a href="#">Link to this property</a>

validate: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazVariableMatchRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "variableMatch"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {match, variable }

</summary>

match: string

<a href="#">Link to this property</a>

variable: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazScrollDepthRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "scrollDepth"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {positions }

</summary>

positions: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZarazElementVisibilityRule object {id, action, settings }

</summary>

id: string

<a href="#">Link to this property</a>

action: "elementVisibility"

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {selector }

</summary>

selector: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Trigger name.

<a href="#">Link to this property</a>

description: optional string

Trigger description.

<a href="#">Link to this property</a>

system: optional "pageload"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variables: map\[object {name, type, value } or object {name, type, value } or object {name, type, value } ]

Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of variables of type secret are not included.

</summary>

One of the following:

<details>

<summary>

String object {name, type, value }

</summary>

name: string

<a href="#">Link to this property</a>

type: "string"

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Secret object {name, type, value }

</summary>

name: string

<a href="#">Link to this property</a>

type: "secret"

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Worker object {name, type, value }

</summary>

name: string

<a href="#">Link to this property</a>

type: "worker"

<a href="#">Link to this property</a>

<details>

<summary>

value: object {escapedWorkerName, workerTag }

</summary>

escapedWorkerName: string

<a href="#">Link to this property</a>

workerTag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zarazVersion: number

Zaraz internal version of the config.

<a href="#">Link to this property</a>

<details>

<summary>

analytics: optional object {defaultPurpose, enabled, sessionExpTime }

Cloudflare Monitoring settings.

</summary>

defaultPurpose: optional string

Consent purpose assigned to Monitoring.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether Advanced Monitoring reports are enabled.

<a href="#">Link to this property</a>

sessionExpTime: optional number

Session expiration time (seconds).

maximum86400

minimum60

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

consent: optional object {enabled, buttonTextTranslations, companyEmail, 12 more }

Consent management configuration.

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

buttonTextTranslations: optional <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz%20%3E%20(model)%20button_text_translation%20%3E%20(schema)">ButtonTextTranslation</a> { accept\_all, confirm\_my\_choices, reject\_all }

</summary>

accept\_all: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

confirm\_my\_choices: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

reject\_all: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

companyEmail: optional string

<a href="#">Link to this property</a>

companyName: optional string

<a href="#">Link to this property</a>

companyStreetAddress: optional string

<a href="#">Link to this property</a>

consentModalIntroHTML: optional string

<a href="#">Link to this property</a>

consentModalIntroHTMLWithTranslations: optional map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

cookieName: optional string

<a href="#">Link to this property</a>

customCSS: optional string

<a href="#">Link to this property</a>

customIntroDisclaimerDismissed: optional boolean

<a href="#">Link to this property</a>

defaultLanguage: optional string

<a href="#">Link to this property</a>

hideModal: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

purposes: optional map\[object {description, name } ]

Object where keys are purpose alpha-numeric IDs.

</summary>

description: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

purposesWithTranslations: optional map\[object {description, name, order } ]

Object where keys are purpose alpha-numeric IDs.

</summary>

description: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

name: map\[string]

Object where keys are language codes.

<a href="#">Link to this property</a>

order: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcfCompliant: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

historyChange: optional boolean

Single Page Application support enabled.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zaraz.config%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update Zaraz configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/zaraz/config \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dataLayer": true,
          "debugKey": "debugKey",
          "settings": {
            "autoInjectScript": true
          },
          "tools": {
            "foo": {
              "blockingTriggers": [
                "string"
              ],
              "component": "component",
              "defaultFields": {
                "foo": "string"
              },
              "enabled": true,
              "name": "name",
              "permissions": [
                "string"
              ],
              "settings": {
                "foo": "string"
              },
              "type": "component"
            }
          },
          "triggers": {
            "foo": {
              "excludeRules": [
                {
                  "id": "id",
                  "match": "match",
                  "op": "CONTAINS",
                  "value": "value"
                }
              ],
              "loadRules": [
                {
                  "id": "id",
                  "match": "match",
                  "op": "CONTAINS",
                  "value": "value"
                }
              ],
              "name": "name"
            }
          },
          "variables": {
            "foo": {
              "name": "name",
              "type": "string",
              "value": "value"
            }
          },
          "zarazVersion": 0
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
  "result": {
    "dataLayer": true,
    "debugKey": "debugKey",
    "settings": {
      "autoInjectScript": true,
      "contextEnricher": {
        "escapedWorkerName": "escapedWorkerName",
        "workerTag": "workerTag"
      },
      "cookieDomain": "cookieDomain",
      "ecommerce": true,
      "eventsApiPath": "eventsApiPath",
      "hideExternalReferer": true,
      "hideIPAddress": true,
      "hideQueryParams": true,
      "hideUserAgent": true,
      "initPath": "initPath",
      "injectIframes": true,
      "mcRootPath": "mcRootPath",
      "scriptPath": "scriptPath",
      "trackPath": "trackPath"
    },
    "tools": {
      "foo": {
        "blockingTriggers": [
          "string"
        ],
        "component": "component",
        "defaultFields": {
          "foo": "string"
        },
        "enabled": true,
        "name": "name",
        "permissions": [
          "string"
        ],
        "settings": {
          "foo": "string"
        },
        "type": "component",
        "actions": {
          "foo": {
            "actionType": "actionType",
            "blockingTriggers": [
              "string"
            ],
            "data": {},
            "firingTriggers": [
              "string"
            ]
          }
        },
        "defaultPurpose": "defaultPurpose",
        "neoEvents": [
          {
            "actionType": "actionType",
            "blockingTriggers": [
              "string"
            ],
            "data": {},
            "firingTriggers": [
              "string"
            ]
          }
        ],
        "vendorName": "vendorName",
        "vendorPolicyUrl": "vendorPolicyUrl"
      }
    },
    "triggers": {
      "foo": {
        "excludeRules": [
          {
            "id": "id",
            "match": "match",
            "op": "CONTAINS",
            "value": "value"
          }
        ],
        "loadRules": [
          {
            "id": "id",
            "match": "match",
            "op": "CONTAINS",
            "value": "value"
          }
        ],
        "name": "name",
        "description": "description",
        "system": "pageload"
      }
    },
    "variables": {
      "foo": {
        "name": "name",
        "type": "string",
        "value": "value"
      }
    },
    "zarazVersion": 0,
    "analytics": {
      "defaultPurpose": "defaultPurpose",
      "enabled": true,
      "sessionExpTime": 60
    },
    "consent": {
      "enabled": true,
      "buttonTextTranslations": {
        "accept_all": {
          "foo": "string"
        },
        "confirm_my_choices": {
          "foo": "string"
        },
        "reject_all": {
          "foo": "string"
        }
      },
      "companyEmail": "companyEmail",
      "companyName": "companyName",
      "companyStreetAddress": "companyStreetAddress",
      "consentModalIntroHTML": "consentModalIntroHTML",
      "consentModalIntroHTMLWithTranslations": {
        "foo": "string"
      },
      "cookieName": "cookieName",
      "customCSS": "customCSS",
      "customIntroDisclaimerDismissed": true,
      "defaultLanguage": "defaultLanguage",
      "hideModal": true,
      "purposes": {
        "foo": {
          "description": "description",
          "name": "name"
        }
      },
      "purposesWithTranslations": {
        "foo": {
          "description": {
            "foo": "string"
          },
          "name": {
            "foo": "string"
          },
          "order": 0
        }
      },
      "tcfCompliant": true
    },
    "historyChange": true
  },
  "success": true
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
  "result": {
    "dataLayer": true,
    "debugKey": "debugKey",
    "settings": {
      "autoInjectScript": true,
      "contextEnricher": {
        "escapedWorkerName": "escapedWorkerName",
        "workerTag": "workerTag"
      },
      "cookieDomain": "cookieDomain",
      "ecommerce": true,
      "eventsApiPath": "eventsApiPath",
      "hideExternalReferer": true,
      "hideIPAddress": true,
      "hideQueryParams": true,
      "hideUserAgent": true,
      "initPath": "initPath",
      "injectIframes": true,
      "mcRootPath": "mcRootPath",
      "scriptPath": "scriptPath",
      "trackPath": "trackPath"
    },
    "tools": {
      "foo": {
        "blockingTriggers": [
          "string"
        ],
        "component": "component",
        "defaultFields": {
          "foo": "string"
        },
        "enabled": true,
        "name": "name",
        "permissions": [
          "string"
        ],
        "settings": {
          "foo": "string"
        },
        "type": "component",
        "actions": {
          "foo": {
            "actionType": "actionType",
            "blockingTriggers": [
              "string"
            ],
            "data": {},
            "firingTriggers": [
              "string"
            ]
          }
        },
        "defaultPurpose": "defaultPurpose",
        "neoEvents": [
          {
            "actionType": "actionType",
            "blockingTriggers": [
              "string"
            ],
            "data": {},
            "firingTriggers": [
              "string"
            ]
          }
        ],
        "vendorName": "vendorName",
        "vendorPolicyUrl": "vendorPolicyUrl"
      }
    },
    "triggers": {
      "foo": {
        "excludeRules": [
          {
            "id": "id",
            "match": "match",
            "op": "CONTAINS",
            "value": "value"
          }
        ],
        "loadRules": [
          {
            "id": "id",
            "match": "match",
            "op": "CONTAINS",
            "value": "value"
          }
        ],
        "name": "name",
        "description": "description",
        "system": "pageload"
      }
    },
    "variables": {
      "foo": {
        "name": "name",
        "type": "string",
        "value": "value"
      }
    },
    "zarazVersion": 0,
    "analytics": {
      "defaultPurpose": "defaultPurpose",
      "enabled": true,
      "sessionExpTime": 60
    },
    "consent": {
      "enabled": true,
      "buttonTextTranslations": {
        "accept_all": {
          "foo": "string"
        },
        "confirm_my_choices": {
          "foo": "string"
        },
        "reject_all": {
          "foo": "string"
        }
      },
      "companyEmail": "companyEmail",
      "companyName": "companyName",
      "companyStreetAddress": "companyStreetAddress",
      "consentModalIntroHTML": "consentModalIntroHTML",
      "consentModalIntroHTMLWithTranslations": {
        "foo": "string"
      },
      "cookieName": "cookieName",
      "customCSS": "customCSS",
      "customIntroDisclaimerDismissed": true,
      "defaultLanguage": "defaultLanguage",
      "hideModal": true,
      "purposes": {
        "foo": {
          "description": "description",
          "name": "name"
        }
      },
      "purposesWithTranslations": {
        "foo": {
          "description": {
            "foo": "string"
          },
          "name": {
            "foo": "string"
          },
          "order": 0
        }
      },
      "tcfCompliant": true
    },
    "historyChange": true
  },
  "success": true
}
```