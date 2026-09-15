---
title: Update project
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update project

PATCH/accounts/{account\_id}/pages/projects/{project\_name}

Set new attributes for an existing project. Modify environment variables. To delete an environment variable, set the key to null.

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

`Pages Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

project\_name: string

Name of the project.

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20project_name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

build\_config: optional object {build\_caching, build\_command, destination\_dir, 3 more }

Configs for the project build process.

</summary>

build\_caching: optional boolean

Enable build caching for the project.

<a href="#">Link to this property</a>

build\_command: optional string

Command used to build project.

<a href="#">Link to this property</a>

destination\_dir: optional string

Output directory of the build.

<a href="#">Link to this property</a>

root\_dir: optional string

Directory to run the command.

<a href="#">Link to this property</a>

web\_analytics\_tag: optional string

The classifying tag for analytics.

<a href="#">Link to this property</a>

web\_analytics\_token: optional string

The auth token for analytics.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20build_config%20%3E%20(schema)>)

<details>

<summary>

deployment\_configs: optional object {preview, production }

Configs for deployments in a project.

</summary>

<details>

<summary>

preview: optional object {ai\_bindings, always\_use\_latest\_compatibility\_date, analytics\_engine\_datasets, 19 more }

Configs for preview deploys.

</summary>

<details>

<summary>

ai\_bindings: optional map\[object {project\_id } ]

Constellation bindings used for Pages Functions.

</summary>

project\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

always\_use\_latest\_compatibility\_date: optional boolean

Whether to always use the latest compatibility date for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

analytics\_engine\_datasets: optional map\[object {dataset } ]

Analytics Engine bindings used for Pages Functions.

</summary>

dataset: string

Name of the dataset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

browsers: optional map\[object {} ]

Browser bindings used for Pages Functions.

<a href="#">Link to this property</a>

build\_image\_major\_version: optional number

The major version of the build image to use for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_date: optional string

Compatibility date used for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_flags: optional array of string

Compatibility flags used for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

d1\_databases: optional map\[object {id } ]

D1 databases used for Pages Functions.

</summary>

id: string

UUID of the D1 database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

durable\_object\_namespaces: optional map\[object {namespace\_id } ]

Durable Object namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the Durable Object namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

env\_vars: optional map\[object {type, value } or object {type, value } ]

Environment variables used for builds and Pages Functions.

</summary>

One of the following:

<details>

<summary>

PlainText object {type, value }

A plaintext environment variable.

</summary>

type: "plain\_text"

<a href="#">Link to this property</a>

value: string

Environment variable value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {type, value }

An encrypted environment variable.

</summary>

type: "secret\_text"

<a href="#">Link to this property</a>

value: string

Secret value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fail\_open: optional boolean

Whether to fail open when the deployment config cannot be applied.

<a href="#">Link to this property</a>

<details>

<summary>

hyperdrive\_bindings: optional map\[object {id } ]

Hyperdrive bindings used for Pages Functions.

</summary>

id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

kv\_namespaces: optional map\[object {namespace\_id } ]

KV namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the KV namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

limits: optional object {cpu\_ms }

Limits for Pages Functions.

</summary>

cpu\_ms: number

CPU time limit in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_certificates: optional map\[object {certificate\_id } ]

mTLS bindings used for Pages Functions.

</summary>

certificate\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

placement: optional object {mode }

Placement setting used for Pages Functions.

</summary>

mode: string

Placement mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

queue\_producers: optional map\[object {name } ]

Queue Producer bindings used for Pages Functions.

</summary>

name: string

Name of the Queue.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

r2\_buckets: optional map\[object {name, jurisdiction } ]

R2 buckets used for Pages Functions.

</summary>

name: string

Name of the R2 bucket.

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction of the R2 bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

services: optional map\[object {service, entrypoint, environment } ]

Services used for Pages Functions.

</summary>

service: string

The Service name.

<a href="#">Link to this property</a>

entrypoint: optional string

The entrypoint to bind to.

<a href="#">Link to this property</a>

environment: optional string

The Service environment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedusage\_model: optional "standard"or "bundled"or "unbound"

All new projects now use the Standard usage model.

The usage model for Pages Functions.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vectorize\_bindings: optional map\[object {index\_name } ]

Vectorize bindings used for Pages Functions.

</summary>

index\_name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wrangler\_config\_hash: optional string

Hash of the Wrangler configuration used for the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

production: optional object {ai\_bindings, always\_use\_latest\_compatibility\_date, analytics\_engine\_datasets, 19 more }

Configs for production deploys.

</summary>

<details>

<summary>

ai\_bindings: optional map\[object {project\_id } ]

Constellation bindings used for Pages Functions.

</summary>

project\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

always\_use\_latest\_compatibility\_date: optional boolean

Whether to always use the latest compatibility date for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

analytics\_engine\_datasets: optional map\[object {dataset } ]

Analytics Engine bindings used for Pages Functions.

</summary>

dataset: string

Name of the dataset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

browsers: optional map\[object {} ]

Browser bindings used for Pages Functions.

<a href="#">Link to this property</a>

build\_image\_major\_version: optional number

The major version of the build image to use for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_date: optional string

Compatibility date used for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_flags: optional array of string

Compatibility flags used for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

d1\_databases: optional map\[object {id } ]

D1 databases used for Pages Functions.

</summary>

id: string

UUID of the D1 database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

durable\_object\_namespaces: optional map\[object {namespace\_id } ]

Durable Object namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the Durable Object namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

env\_vars: optional map\[object {type, value } or object {type, value } ]

Environment variables used for builds and Pages Functions.

</summary>

One of the following:

<details>

<summary>

PlainText object {type, value }

A plaintext environment variable.

</summary>

type: "plain\_text"

<a href="#">Link to this property</a>

value: string

Environment variable value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {type, value }

An encrypted environment variable.

</summary>

type: "secret\_text"

<a href="#">Link to this property</a>

value: string

Secret value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fail\_open: optional boolean

Whether to fail open when the deployment config cannot be applied.

<a href="#">Link to this property</a>

<details>

<summary>

hyperdrive\_bindings: optional map\[object {id } ]

Hyperdrive bindings used for Pages Functions.

</summary>

id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

kv\_namespaces: optional map\[object {namespace\_id } ]

KV namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the KV namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

limits: optional object {cpu\_ms }

Limits for Pages Functions.

</summary>

cpu\_ms: number

CPU time limit in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_certificates: optional map\[object {certificate\_id } ]

mTLS bindings used for Pages Functions.

</summary>

certificate\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

placement: optional object {mode }

Placement setting used for Pages Functions.

</summary>

mode: string

Placement mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

queue\_producers: optional map\[object {name } ]

Queue Producer bindings used for Pages Functions.

</summary>

name: string

Name of the Queue.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

r2\_buckets: optional map\[object {name, jurisdiction } ]

R2 buckets used for Pages Functions.

</summary>

name: string

Name of the R2 bucket.

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction of the R2 bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

services: optional map\[object {service, entrypoint, environment } ]

Services used for Pages Functions.

</summary>

service: string

The Service name.

<a href="#">Link to this property</a>

entrypoint: optional string

The entrypoint to bind to.

<a href="#">Link to this property</a>

environment: optional string

The Service environment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedusage\_model: optional "standard"or "bundled"or "unbound"

All new projects now use the Standard usage model.

The usage model for Pages Functions.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vectorize\_bindings: optional map\[object {index\_name } ]

Vectorize bindings used for Pages Functions.

</summary>

index\_name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wrangler\_config\_hash: optional string

Hash of the Wrangler configuration used for the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20deployment_configs%20%3E%20(schema)>)

name: optional string

Name of the project.

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

production\_branch: optional string

Production branch of the project. Used to identify production deployments.

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20production_branch%20%3E%20(schema)>)

<details>

<summary>

source: optional object {config, type }

Configs for the project source control.

</summary>

<details>

<summary>

config: object {deployments\_enabled, owner, owner\_id, 10 more }

</summary>

Deprecateddeployments\_enabled: optional boolean

Use <code>production_deployments_enabled</code> and <code>preview_deployment_setting</code> for more granular control.

Whether to enable automatic deployments when pushing to the source repository. When disabled, no deployments (production or preview) will be triggered automatically.

<a href="#">Link to this property</a>

owner: optional string

The owner of the repository.

<a href="#">Link to this property</a>

owner\_id: optional string

The owner ID of the repository.

<a href="#">Link to this property</a>

path\_excludes: optional array of string

A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

path\_includes: optional array of string

A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

pr\_comments\_enabled: optional boolean

Whether to enable PR comments.

<a href="#">Link to this property</a>

preview\_branch\_excludes: optional array of string

A list of branches that should not trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

preview\_branch\_includes: optional array of string

A list of branches that should trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

<details>

<summary>

preview\_deployment\_setting: optional "all"or "none"or "custom"

Controls whether commits to preview branches trigger a preview deployment.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

production\_branch: optional string

The production branch of the repository.

<a href="#">Link to this property</a>

production\_deployments\_enabled: optional boolean

Whether to trigger a production deployment on commits to the production branch.

<a href="#">Link to this property</a>

repo\_id: optional string

The ID of the repository.

<a href="#">Link to this property</a>

repo\_name: optional string

The name of the repository.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "github"or "gitlab"

The source control management provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20source%20%3E%20(schema)>)

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

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20project%20%3E%20(schema)">Project</a> { id, canonical\_deployment, created\_on, 13 more }

</summary>

id: string

ID of the project.

<a href="#">Link to this property</a>

<details>

<summary>

canonical\_deployment: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20deployment%20%3E%20(schema)">Deployment</a> { id, aliases, build\_config, 15 more }

Most recent production deployment of the project.

</summary>

id: string

Id of the deployment.

<a href="#">Link to this property</a>

aliases: array of string

A list of alias URLs pointing to this deployment.

<a href="#">Link to this property</a>

<details>

<summary>

build\_config: object {web\_analytics\_tag, web\_analytics\_token, build\_caching, 3 more }

Configs for the project build process.

</summary>

web\_analytics\_tag: string

The classifying tag for analytics.

<a href="#">Link to this property</a>

web\_analytics\_token: string

The auth token for analytics.

<a href="#">Link to this property</a>

build\_caching: optional boolean

Enable build caching for the project.

<a href="#">Link to this property</a>

build\_command: optional string

Command used to build project.

<a href="#">Link to this property</a>

destination\_dir: optional string

Assets output directory of the build.

<a href="#">Link to this property</a>

root\_dir: optional string

Directory to run the command.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

When the deployment was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

deployment\_trigger: object {metadata, type }

Info about what caused the deployment.

</summary>

<details>

<summary>

metadata: object {branch, commit\_dirty, commit\_hash, commit\_message }

Additional info about the trigger.

</summary>

branch: string

Where the trigger happened.

<a href="#">Link to this property</a>

commit\_dirty: boolean

Whether the deployment trigger commit was dirty.

<a href="#">Link to this property</a>

commit\_hash: string

Hash of the deployment trigger commit.

<a href="#">Link to this property</a>

commit\_message: string

Message of the deployment trigger commit.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "github:push"or "ad\_hoc"or "deploy\_hook"

What caused the deployment.

</summary>

One of the following:

"github:push"

<a href="#">Link to this property</a>

"ad\_hoc"

<a href="#">Link to this property</a>

"deploy\_hook"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

env\_vars: map\[object {type, value } or object {type, value } ]

Environment variables used for builds and Pages Functions.

</summary>

One of the following:

<details>

<summary>

PlainText object {type, value }

A plaintext environment variable.

</summary>

type: "plain\_text"

<a href="#">Link to this property</a>

value: string

Environment variable value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {type, value }

An encrypted environment variable.

</summary>

type: "secret\_text"

<a href="#">Link to this property</a>

value: string

Secret value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

environment: "preview"or "production"

Type of deploy.

</summary>

One of the following:

"preview"

<a href="#">Link to this property</a>

"production"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_skipped: boolean

If the deployment has been skipped.

<a href="#">Link to this property</a>

<details>

<summary>

latest\_stage: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20stage%20%3E%20(schema)">Stage</a> { ended\_on, name, started\_on, status }

The status of the deployment.

</summary>

ended\_on: string

When the stage ended.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

name: "queued"or "initialize"or "clone\_repo"or 2 more

The current build stage.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"initialize"

<a href="#">Link to this property</a>

"clone\_repo"

<a href="#">Link to this property</a>

"build"

<a href="#">Link to this property</a>

"deploy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

started\_on: string

When the stage started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: "success"or "idle"or "active"or 2 more

State of the current stage.

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"idle"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"failure"

<a href="#">Link to this property</a>

"canceled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the deployment was last modified.

formatdate-time

<a href="#">Link to this property</a>

project\_id: string

Id of the project.

<a href="#">Link to this property</a>

project\_name: string

Name of the project.

<a href="#">Link to this property</a>

short\_id: string

Short Id (8 character) of the deployment.

<a href="#">Link to this property</a>

<details>

<summary>

source: object {config, type }

Configs for the project source control.

</summary>

<details>

<summary>

config: object {deployments\_enabled, owner, owner\_id, 10 more }

</summary>

Deprecateddeployments\_enabled: boolean

Use <code>production_deployments_enabled</code> and <code>preview_deployment_setting</code> for more granular control.

Whether to enable automatic deployments when pushing to the source repository. When disabled, no deployments (production or preview) will be triggered automatically.

<a href="#">Link to this property</a>

owner: string

The owner of the repository.

<a href="#">Link to this property</a>

owner\_id: string

The owner ID of the repository.

<a href="#">Link to this property</a>

path\_excludes: array of string

A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

path\_includes: array of string

A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

pr\_comments\_enabled: boolean

Whether to enable PR comments.

<a href="#">Link to this property</a>

preview\_branch\_excludes: array of string

A list of branches that should not trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

preview\_branch\_includes: array of string

A list of branches that should trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

<details>

<summary>

preview\_deployment\_setting: "all"or "none"or "custom"

Controls whether commits to preview branches trigger a preview deployment.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

production\_branch: string

The production branch of the repository.

<a href="#">Link to this property</a>

production\_deployments\_enabled: boolean

Whether to trigger a production deployment on commits to the production branch.

<a href="#">Link to this property</a>

repo\_id: string

The ID of the repository.

<a href="#">Link to this property</a>

repo\_name: string

The name of the repository.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "github"or "gitlab"

The source control management provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stages: array of <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20stage%20%3E%20(schema)">Stage</a> { ended\_on, name, started\_on, status }

List of past stages.

</summary>

ended\_on: string

When the stage ended.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

name: "queued"or "initialize"or "clone\_repo"or 2 more

The current build stage.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"initialize"

<a href="#">Link to this property</a>

"clone\_repo"

<a href="#">Link to this property</a>

"build"

<a href="#">Link to this property</a>

"deploy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

started\_on: string

When the stage started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: "success"or "idle"or "active"or 2 more

State of the current stage.

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"idle"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"failure"

<a href="#">Link to this property</a>

"canceled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: string

The live URL to view this deployment.

<a href="#">Link to this property</a>

<details>

<summary>

skip\_reason: optional "commit\_message"or "preview\_deployments\_disabled"or "production\_deployments\_disabled"or 3 more

Why the deployment was skipped.

</summary>

One of the following:

"commit\_message"

<a href="#">Link to this property</a>

"preview\_deployments\_disabled"

<a href="#">Link to this property</a>

"production\_deployments\_disabled"

<a href="#">Link to this property</a>

"path\_config"

<a href="#">Link to this property</a>

"branch\_config"

<a href="#">Link to this property</a>

"pages\_to\_workers\_conversion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uses\_functions: optional boolean

Whether the deployment uses functions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

When the project was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

deployment\_configs: object {preview, production }

Configs for deployments in a project.

</summary>

<details>

<summary>

preview: object {always\_use\_latest\_compatibility\_date, build\_image\_major\_version, compatibility\_date, 19 more }

Configs for preview deploys.

</summary>

always\_use\_latest\_compatibility\_date: boolean

Whether to always use the latest compatibility date for Pages Functions.

<a href="#">Link to this property</a>

build\_image\_major\_version: number

The major version of the build image to use for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_date: string

Compatibility date used for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_flags: array of string

Compatibility flags used for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

env\_vars: map\[object {type, value } or object {type, value } ]

Environment variables used for builds and Pages Functions.

</summary>

One of the following:

<details>

<summary>

PlainText object {type, value }

A plaintext environment variable.

</summary>

type: "plain\_text"

<a href="#">Link to this property</a>

value: string

Environment variable value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {type, value }

An encrypted environment variable.

</summary>

type: "secret\_text"

<a href="#">Link to this property</a>

value: string

Secret value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fail\_open: boolean

Whether to fail open when the deployment config cannot be applied.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedusage\_model: "standard"or "bundled"or "unbound"

All new projects now use the Standard usage model.

The usage model for Pages Functions.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bindings: optional map\[object {project\_id } ]

Constellation bindings used for Pages Functions.

</summary>

project\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

analytics\_engine\_datasets: optional map\[object {dataset } ]

Analytics Engine bindings used for Pages Functions.

</summary>

dataset: string

Name of the dataset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

browsers: optional map\[object {} ]

Browser bindings used for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

d1\_databases: optional map\[object {id } ]

D1 databases used for Pages Functions.

</summary>

id: string

UUID of the D1 database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

durable\_object\_namespaces: optional map\[object {namespace\_id } ]

Durable Object namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the Durable Object namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

hyperdrive\_bindings: optional map\[object {id } ]

Hyperdrive bindings used for Pages Functions.

</summary>

id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

kv\_namespaces: optional map\[object {namespace\_id } ]

KV namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the KV namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

limits: optional object {cpu\_ms }

Limits for Pages Functions.

</summary>

cpu\_ms: number

CPU time limit in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_certificates: optional map\[object {certificate\_id } ]

mTLS bindings used for Pages Functions.

</summary>

certificate\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

placement: optional object {mode }

Placement setting used for Pages Functions.

</summary>

mode: string

Placement mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

queue\_producers: optional map\[object {name } ]

Queue Producer bindings used for Pages Functions.

</summary>

name: string

Name of the Queue.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

r2\_buckets: optional map\[object {name, jurisdiction } ]

R2 buckets used for Pages Functions.

</summary>

name: string

Name of the R2 bucket.

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction of the R2 bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

services: optional map\[object {environment, service, entrypoint } ]

Services used for Pages Functions.

</summary>

environment: string

The Service environment.

<a href="#">Link to this property</a>

service: string

The Service name.

<a href="#">Link to this property</a>

entrypoint: optional string

The entrypoint to bind to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vectorize\_bindings: optional map\[object {index\_name } ]

Vectorize bindings used for Pages Functions.

</summary>

index\_name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wrangler\_config\_hash: optional string

Hash of the Wrangler configuration used for the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

production: object {always\_use\_latest\_compatibility\_date, build\_image\_major\_version, compatibility\_date, 19 more }

Configs for production deploys.

</summary>

always\_use\_latest\_compatibility\_date: boolean

Whether to always use the latest compatibility date for Pages Functions.

<a href="#">Link to this property</a>

build\_image\_major\_version: number

The major version of the build image to use for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_date: string

Compatibility date used for Pages Functions.

<a href="#">Link to this property</a>

compatibility\_flags: array of string

Compatibility flags used for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

env\_vars: map\[object {type, value } or object {type, value } ]

Environment variables used for builds and Pages Functions.

</summary>

One of the following:

<details>

<summary>

PlainText object {type, value }

A plaintext environment variable.

</summary>

type: "plain\_text"

<a href="#">Link to this property</a>

value: string

Environment variable value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {type, value }

An encrypted environment variable.

</summary>

type: "secret\_text"

<a href="#">Link to this property</a>

value: string

Secret value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fail\_open: boolean

Whether to fail open when the deployment config cannot be applied.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedusage\_model: "standard"or "bundled"or "unbound"

All new projects now use the Standard usage model.

The usage model for Pages Functions.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bindings: optional map\[object {project\_id } ]

Constellation bindings used for Pages Functions.

</summary>

project\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

analytics\_engine\_datasets: optional map\[object {dataset } ]

Analytics Engine bindings used for Pages Functions.

</summary>

dataset: string

Name of the dataset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

browsers: optional map\[object {} ]

Browser bindings used for Pages Functions.

<a href="#">Link to this property</a>

<details>

<summary>

d1\_databases: optional map\[object {id } ]

D1 databases used for Pages Functions.

</summary>

id: string

UUID of the D1 database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

durable\_object\_namespaces: optional map\[object {namespace\_id } ]

Durable Object namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the Durable Object namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

hyperdrive\_bindings: optional map\[object {id } ]

Hyperdrive bindings used for Pages Functions.

</summary>

id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

kv\_namespaces: optional map\[object {namespace\_id } ]

KV namespaces used for Pages Functions.

</summary>

namespace\_id: string

ID of the KV namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

limits: optional object {cpu\_ms }

Limits for Pages Functions.

</summary>

cpu\_ms: number

CPU time limit in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_certificates: optional map\[object {certificate\_id } ]

mTLS bindings used for Pages Functions.

</summary>

certificate\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

placement: optional object {mode }

Placement setting used for Pages Functions.

</summary>

mode: string

Placement mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

queue\_producers: optional map\[object {name } ]

Queue Producer bindings used for Pages Functions.

</summary>

name: string

Name of the Queue.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

r2\_buckets: optional map\[object {name, jurisdiction } ]

R2 buckets used for Pages Functions.

</summary>

name: string

Name of the R2 bucket.

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction of the R2 bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

services: optional map\[object {environment, service, entrypoint } ]

Services used for Pages Functions.

</summary>

environment: string

The Service environment.

<a href="#">Link to this property</a>

service: string

The Service name.

<a href="#">Link to this property</a>

entrypoint: optional string

The entrypoint to bind to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vectorize\_bindings: optional map\[object {index\_name } ]

Vectorize bindings used for Pages Functions.

</summary>

index\_name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wrangler\_config\_hash: optional string

Hash of the Wrangler configuration used for the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

framework: string

Framework the project is using.

<a href="#">Link to this property</a>

framework\_version: string

Version of the framework the project is using.

<a href="#">Link to this property</a>

<details>

<summary>

latest\_deployment: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20deployment%20%3E%20(schema)">Deployment</a> { id, aliases, build\_config, 15 more }

Most recent deployment of the project.

</summary>

id: string

Id of the deployment.

<a href="#">Link to this property</a>

aliases: array of string

A list of alias URLs pointing to this deployment.

<a href="#">Link to this property</a>

<details>

<summary>

build\_config: object {web\_analytics\_tag, web\_analytics\_token, build\_caching, 3 more }

Configs for the project build process.

</summary>

web\_analytics\_tag: string

The classifying tag for analytics.

<a href="#">Link to this property</a>

web\_analytics\_token: string

The auth token for analytics.

<a href="#">Link to this property</a>

build\_caching: optional boolean

Enable build caching for the project.

<a href="#">Link to this property</a>

build\_command: optional string

Command used to build project.

<a href="#">Link to this property</a>

destination\_dir: optional string

Assets output directory of the build.

<a href="#">Link to this property</a>

root\_dir: optional string

Directory to run the command.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

When the deployment was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

deployment\_trigger: object {metadata, type }

Info about what caused the deployment.

</summary>

<details>

<summary>

metadata: object {branch, commit\_dirty, commit\_hash, commit\_message }

Additional info about the trigger.

</summary>

branch: string

Where the trigger happened.

<a href="#">Link to this property</a>

commit\_dirty: boolean

Whether the deployment trigger commit was dirty.

<a href="#">Link to this property</a>

commit\_hash: string

Hash of the deployment trigger commit.

<a href="#">Link to this property</a>

commit\_message: string

Message of the deployment trigger commit.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "github:push"or "ad\_hoc"or "deploy\_hook"

What caused the deployment.

</summary>

One of the following:

"github:push"

<a href="#">Link to this property</a>

"ad\_hoc"

<a href="#">Link to this property</a>

"deploy\_hook"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

env\_vars: map\[object {type, value } or object {type, value } ]

Environment variables used for builds and Pages Functions.

</summary>

One of the following:

<details>

<summary>

PlainText object {type, value }

A plaintext environment variable.

</summary>

type: "plain\_text"

<a href="#">Link to this property</a>

value: string

Environment variable value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {type, value }

An encrypted environment variable.

</summary>

type: "secret\_text"

<a href="#">Link to this property</a>

value: string

Secret value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

environment: "preview"or "production"

Type of deploy.

</summary>

One of the following:

"preview"

<a href="#">Link to this property</a>

"production"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_skipped: boolean

If the deployment has been skipped.

<a href="#">Link to this property</a>

<details>

<summary>

latest\_stage: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20stage%20%3E%20(schema)">Stage</a> { ended\_on, name, started\_on, status }

The status of the deployment.

</summary>

ended\_on: string

When the stage ended.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

name: "queued"or "initialize"or "clone\_repo"or 2 more

The current build stage.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"initialize"

<a href="#">Link to this property</a>

"clone\_repo"

<a href="#">Link to this property</a>

"build"

<a href="#">Link to this property</a>

"deploy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

started\_on: string

When the stage started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: "success"or "idle"or "active"or 2 more

State of the current stage.

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"idle"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"failure"

<a href="#">Link to this property</a>

"canceled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the deployment was last modified.

formatdate-time

<a href="#">Link to this property</a>

project\_id: string

Id of the project.

<a href="#">Link to this property</a>

project\_name: string

Name of the project.

<a href="#">Link to this property</a>

short\_id: string

Short Id (8 character) of the deployment.

<a href="#">Link to this property</a>

<details>

<summary>

source: object {config, type }

Configs for the project source control.

</summary>

<details>

<summary>

config: object {deployments\_enabled, owner, owner\_id, 10 more }

</summary>

Deprecateddeployments\_enabled: boolean

Use <code>production_deployments_enabled</code> and <code>preview_deployment_setting</code> for more granular control.

Whether to enable automatic deployments when pushing to the source repository. When disabled, no deployments (production or preview) will be triggered automatically.

<a href="#">Link to this property</a>

owner: string

The owner of the repository.

<a href="#">Link to this property</a>

owner\_id: string

The owner ID of the repository.

<a href="#">Link to this property</a>

path\_excludes: array of string

A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

path\_includes: array of string

A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

pr\_comments\_enabled: boolean

Whether to enable PR comments.

<a href="#">Link to this property</a>

preview\_branch\_excludes: array of string

A list of branches that should not trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

preview\_branch\_includes: array of string

A list of branches that should trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

<details>

<summary>

preview\_deployment\_setting: "all"or "none"or "custom"

Controls whether commits to preview branches trigger a preview deployment.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

production\_branch: string

The production branch of the repository.

<a href="#">Link to this property</a>

production\_deployments\_enabled: boolean

Whether to trigger a production deployment on commits to the production branch.

<a href="#">Link to this property</a>

repo\_id: string

The ID of the repository.

<a href="#">Link to this property</a>

repo\_name: string

The name of the repository.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "github"or "gitlab"

The source control management provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stages: array of <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20stage%20%3E%20(schema)">Stage</a> { ended\_on, name, started\_on, status }

List of past stages.

</summary>

ended\_on: string

When the stage ended.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

name: "queued"or "initialize"or "clone\_repo"or 2 more

The current build stage.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"initialize"

<a href="#">Link to this property</a>

"clone\_repo"

<a href="#">Link to this property</a>

"build"

<a href="#">Link to this property</a>

"deploy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

started\_on: string

When the stage started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: "success"or "idle"or "active"or 2 more

State of the current stage.

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"idle"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"failure"

<a href="#">Link to this property</a>

"canceled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: string

The live URL to view this deployment.

<a href="#">Link to this property</a>

<details>

<summary>

skip\_reason: optional "commit\_message"or "preview\_deployments\_disabled"or "production\_deployments\_disabled"or 3 more

Why the deployment was skipped.

</summary>

One of the following:

"commit\_message"

<a href="#">Link to this property</a>

"preview\_deployments\_disabled"

<a href="#">Link to this property</a>

"production\_deployments\_disabled"

<a href="#">Link to this property</a>

"path\_config"

<a href="#">Link to this property</a>

"branch\_config"

<a href="#">Link to this property</a>

"pages\_to\_workers\_conversion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uses\_functions: optional boolean

Whether the deployment uses functions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Name of the project.

<a href="#">Link to this property</a>

preview\_script\_name: string

Name of the preview script.

<a href="#">Link to this property</a>

production\_branch: string

Production branch of the project. Used to identify production deployments.

<a href="#">Link to this property</a>

production\_script\_name: string

Name of the production script.

<a href="#">Link to this property</a>

uses\_functions: boolean

Whether the project uses functions.

<a href="#">Link to this property</a>

<details>

<summary>

build\_config: optional object {web\_analytics\_tag, web\_analytics\_token, build\_caching, 3 more }

Configs for the project build process.

</summary>

web\_analytics\_tag: string

The classifying tag for analytics.

<a href="#">Link to this property</a>

web\_analytics\_token: string

The auth token for analytics.

<a href="#">Link to this property</a>

build\_caching: optional boolean

Enable build caching for the project.

<a href="#">Link to this property</a>

build\_command: optional string

Command used to build project.

<a href="#">Link to this property</a>

destination\_dir: optional string

Assets output directory of the build.

<a href="#">Link to this property</a>

root\_dir: optional string

Directory to run the command.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domains: optional array of string

A list of associated custom domains for the project.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {config, type }

Configs for the project source control.

</summary>

<details>

<summary>

config: object {deployments\_enabled, owner, owner\_id, 10 more }

</summary>

Deprecateddeployments\_enabled: boolean

Use <code>production_deployments_enabled</code> and <code>preview_deployment_setting</code> for more granular control.

Whether to enable automatic deployments when pushing to the source repository. When disabled, no deployments (production or preview) will be triggered automatically.

<a href="#">Link to this property</a>

owner: string

The owner of the repository.

<a href="#">Link to this property</a>

owner\_id: string

The owner ID of the repository.

<a href="#">Link to this property</a>

path\_excludes: array of string

A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

path\_includes: array of string

A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported.

<a href="#">Link to this property</a>

pr\_comments\_enabled: boolean

Whether to enable PR comments.

<a href="#">Link to this property</a>

preview\_branch\_excludes: array of string

A list of branches that should not trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

preview\_branch\_includes: array of string

A list of branches that should trigger a preview deployment. Wildcard syntax (<code>*</code>) is supported. Must be used with <code>preview_deployment_setting</code> set to <code>custom</code>.

<a href="#">Link to this property</a>

<details>

<summary>

preview\_deployment\_setting: "all"or "none"or "custom"

Controls whether commits to preview branches trigger a preview deployment.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

production\_branch: string

The production branch of the repository.

<a href="#">Link to this property</a>

production\_deployments\_enabled: boolean

Whether to trigger a production deployment on commits to the production branch.

<a href="#">Link to this property</a>

repo\_id: string

The ID of the repository.

<a href="#">Link to this property</a>

repo\_name: string

The name of the repository.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "github"or "gitlab"

The source control management provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subdomain: optional string

The Cloudflare subdomain associated with the project.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20pages.projects%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update project

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-pages-app",
          "production_branch": "main"
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
    "id": "7b162ea7-7367-4d67-bcde-1160995d5",
    "canonical_deployment": {
      "id": "f64788e9-fccd-4d4a-a28a-cb84f88f6",
      "aliases": [
        "https://branchname.projectname.pages.dev"
      ],
      "build_config": {
        "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
        "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
        "build_caching": true,
        "build_command": "npm run build",
        "destination_dir": "build",
        "root_dir": "/"
      },
      "created_on": "2021-03-09T00:55:03.923456Z",
      "deployment_trigger": {
        "metadata": {
          "branch": "main",
          "commit_dirty": false,
          "commit_hash": "ad9ccd918a81025731e10e40267e11273a263421",
          "commit_message": "Update index.html"
        },
        "type": "ad_hoc"
      },
      "env_vars": {
        "foo": {
          "type": "plain_text",
          "value": "hello world"
        }
      },
      "environment": "preview",
      "is_skipped": true,
      "latest_stage": {
        "ended_on": "2021-03-09T00:58:59.045655Z",
        "name": "deploy",
        "started_on": "2021-03-09T00:55:03.923456Z",
        "status": "success"
      },
      "modified_on": "2021-03-09T00:58:59.045655Z",
      "project_id": "7b162ea7-7367-4d67-bcde-1160995d5",
      "project_name": "this-is-my-project-01",
      "short_id": "f64788e9",
      "source": {
        "config": {
          "deployments_enabled": true,
          "owner": "my-org",
          "owner_id": "12345678",
          "path_excludes": [
            "string"
          ],
          "path_includes": [
            "string"
          ],
          "pr_comments_enabled": true,
          "preview_branch_excludes": [
            "string"
          ],
          "preview_branch_includes": [
            "string"
          ],
          "preview_deployment_setting": "all",
          "production_branch": "main",
          "production_deployments_enabled": true,
          "repo_id": "12345678",
          "repo_name": "my-repo"
        },
        "type": "github"
      },
      "stages": [
        {
          "ended_on": "2021-06-03T15:39:03.134378Z",
          "name": "queued",
          "started_on": "2021-06-03T15:38:15.608194Z",
          "status": "active"
        },
        {
          "ended_on": null,
          "name": "initialize",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "clone_repo",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "build",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "deploy",
          "started_on": null,
          "status": "idle"
        }
      ],
      "url": "https://f64788e9.ninjakittens.pages.dev",
      "skip_reason": "commit_message",
      "uses_functions": true
    },
    "created_on": "2017-01-01T00:00:00Z",
    "deployment_configs": {
      "preview": {
        "always_use_latest_compatibility_date": false,
        "build_image_major_version": 3,
        "compatibility_date": "2025-01-01T00:00:00Z",
        "compatibility_flags": [
          "url_standard"
        ],
        "env_vars": {
          "foo": {
            "type": "plain_text",
            "value": "hello world"
          }
        },
        "fail_open": true,
        "usage_model": "standard",
        "ai_bindings": {
          "AI_BINDING": {
            "project_id": "some-project-id"
          }
        },
        "analytics_engine_datasets": {
          "ANALYTICS_ENGINE_BINDING": {
            "dataset": "api_analytics"
          }
        },
        "browsers": {
          "BROWSER": {}
        },
        "d1_databases": {
          "D1_BINDING": {
            "id": "445e2955-951a-43f8-a35b-a4d0c8138f63"
          }
        },
        "durable_object_namespaces": {
          "DO_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "hyperdrive_bindings": {
          "HYPERDRIVE": {
            "id": "a76a99bc342644deb02c38d66082262a"
          }
        },
        "kv_namespaces": {
          "KV_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "limits": {
          "cpu_ms": 100
        },
        "mtls_certificates": {
          "MTLS": {
            "certificate_id": "d7cdd17c-916f-4cb7-aabe-585eb382ec4e"
          }
        },
        "placement": {
          "mode": "smart"
        },
        "queue_producers": {
          "QUEUE_PRODUCER_BINDING": {
            "name": "some-queue"
          }
        },
        "r2_buckets": {
          "R2_BINDING": {
            "name": "some-bucket",
            "jurisdiction": "eu"
          }
        },
        "services": {
          "SERVICE_BINDING": {
            "environment": "production",
            "service": "example-worker",
            "entrypoint": "MyHandler"
          }
        },
        "vectorize_bindings": {
          "VECTORIZE": {
            "index_name": "my_index"
          }
        },
        "wrangler_config_hash": "abc123def456"
      },
      "production": {
        "always_use_latest_compatibility_date": false,
        "build_image_major_version": 3,
        "compatibility_date": "2025-01-01T00:00:00Z",
        "compatibility_flags": [
          "url_standard"
        ],
        "env_vars": {
          "foo": {
            "type": "plain_text",
            "value": "hello world"
          }
        },
        "fail_open": true,
        "usage_model": "standard",
        "ai_bindings": {
          "AI_BINDING": {
            "project_id": "some-project-id"
          }
        },
        "analytics_engine_datasets": {
          "ANALYTICS_ENGINE_BINDING": {
            "dataset": "api_analytics"
          }
        },
        "browsers": {
          "BROWSER": {}
        },
        "d1_databases": {
          "D1_BINDING": {
            "id": "445e2955-951a-43f8-a35b-a4d0c8138f63"
          }
        },
        "durable_object_namespaces": {
          "DO_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "hyperdrive_bindings": {
          "HYPERDRIVE": {
            "id": "a76a99bc342644deb02c38d66082262a"
          }
        },
        "kv_namespaces": {
          "KV_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "limits": {
          "cpu_ms": 100
        },
        "mtls_certificates": {
          "MTLS": {
            "certificate_id": "d7cdd17c-916f-4cb7-aabe-585eb382ec4e"
          }
        },
        "placement": {
          "mode": "smart"
        },
        "queue_producers": {
          "QUEUE_PRODUCER_BINDING": {
            "name": "some-queue"
          }
        },
        "r2_buckets": {
          "R2_BINDING": {
            "name": "some-bucket",
            "jurisdiction": "eu"
          }
        },
        "services": {
          "SERVICE_BINDING": {
            "environment": "production",
            "service": "example-worker",
            "entrypoint": "MyHandler"
          }
        },
        "vectorize_bindings": {
          "VECTORIZE": {
            "index_name": "my_index"
          }
        },
        "wrangler_config_hash": "abc123def456"
      }
    },
    "framework": "framework",
    "framework_version": "framework_version",
    "latest_deployment": {
      "id": "f64788e9-fccd-4d4a-a28a-cb84f88f6",
      "aliases": [
        "https://branchname.projectname.pages.dev"
      ],
      "build_config": {
        "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
        "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
        "build_caching": true,
        "build_command": "npm run build",
        "destination_dir": "build",
        "root_dir": "/"
      },
      "created_on": "2021-03-09T00:55:03.923456Z",
      "deployment_trigger": {
        "metadata": {
          "branch": "main",
          "commit_dirty": false,
          "commit_hash": "ad9ccd918a81025731e10e40267e11273a263421",
          "commit_message": "Update index.html"
        },
        "type": "ad_hoc"
      },
      "env_vars": {
        "foo": {
          "type": "plain_text",
          "value": "hello world"
        }
      },
      "environment": "preview",
      "is_skipped": true,
      "latest_stage": {
        "ended_on": "2021-03-09T00:58:59.045655Z",
        "name": "deploy",
        "started_on": "2021-03-09T00:55:03.923456Z",
        "status": "success"
      },
      "modified_on": "2021-03-09T00:58:59.045655Z",
      "project_id": "7b162ea7-7367-4d67-bcde-1160995d5",
      "project_name": "this-is-my-project-01",
      "short_id": "f64788e9",
      "source": {
        "config": {
          "deployments_enabled": true,
          "owner": "my-org",
          "owner_id": "12345678",
          "path_excludes": [
            "string"
          ],
          "path_includes": [
            "string"
          ],
          "pr_comments_enabled": true,
          "preview_branch_excludes": [
            "string"
          ],
          "preview_branch_includes": [
            "string"
          ],
          "preview_deployment_setting": "all",
          "production_branch": "main",
          "production_deployments_enabled": true,
          "repo_id": "12345678",
          "repo_name": "my-repo"
        },
        "type": "github"
      },
      "stages": [
        {
          "ended_on": "2021-06-03T15:39:03.134378Z",
          "name": "queued",
          "started_on": "2021-06-03T15:38:15.608194Z",
          "status": "active"
        },
        {
          "ended_on": null,
          "name": "initialize",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "clone_repo",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "build",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "deploy",
          "started_on": null,
          "status": "idle"
        }
      ],
      "url": "https://f64788e9.ninjakittens.pages.dev",
      "skip_reason": "commit_message",
      "uses_functions": true
    },
    "name": "this-is-my-project-01",
    "preview_script_name": "pages-worker--1234567-preview",
    "production_branch": "main",
    "production_script_name": "pages-worker--1234567-production",
    "uses_functions": true,
    "build_config": {
      "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
      "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
      "build_caching": true,
      "build_command": "npm run build",
      "destination_dir": "build",
      "root_dir": "/"
    },
    "domains": [
      "customdomain.com",
      "customdomain.org"
    ],
    "source": {
      "config": {
        "deployments_enabled": true,
        "owner": "my-org",
        "owner_id": "12345678",
        "path_excludes": [
          "string"
        ],
        "path_includes": [
          "string"
        ],
        "pr_comments_enabled": true,
        "preview_branch_excludes": [
          "string"
        ],
        "preview_branch_includes": [
          "string"
        ],
        "preview_deployment_setting": "all",
        "production_branch": "main",
        "production_deployments_enabled": true,
        "repo_id": "12345678",
        "repo_name": "my-repo"
      },
      "type": "github"
    },
    "subdomain": "helloworld.pages.dev"
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
    "id": "7b162ea7-7367-4d67-bcde-1160995d5",
    "canonical_deployment": {
      "id": "f64788e9-fccd-4d4a-a28a-cb84f88f6",
      "aliases": [
        "https://branchname.projectname.pages.dev"
      ],
      "build_config": {
        "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
        "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
        "build_caching": true,
        "build_command": "npm run build",
        "destination_dir": "build",
        "root_dir": "/"
      },
      "created_on": "2021-03-09T00:55:03.923456Z",
      "deployment_trigger": {
        "metadata": {
          "branch": "main",
          "commit_dirty": false,
          "commit_hash": "ad9ccd918a81025731e10e40267e11273a263421",
          "commit_message": "Update index.html"
        },
        "type": "ad_hoc"
      },
      "env_vars": {
        "foo": {
          "type": "plain_text",
          "value": "hello world"
        }
      },
      "environment": "preview",
      "is_skipped": true,
      "latest_stage": {
        "ended_on": "2021-03-09T00:58:59.045655Z",
        "name": "deploy",
        "started_on": "2021-03-09T00:55:03.923456Z",
        "status": "success"
      },
      "modified_on": "2021-03-09T00:58:59.045655Z",
      "project_id": "7b162ea7-7367-4d67-bcde-1160995d5",
      "project_name": "this-is-my-project-01",
      "short_id": "f64788e9",
      "source": {
        "config": {
          "deployments_enabled": true,
          "owner": "my-org",
          "owner_id": "12345678",
          "path_excludes": [
            "string"
          ],
          "path_includes": [
            "string"
          ],
          "pr_comments_enabled": true,
          "preview_branch_excludes": [
            "string"
          ],
          "preview_branch_includes": [
            "string"
          ],
          "preview_deployment_setting": "all",
          "production_branch": "main",
          "production_deployments_enabled": true,
          "repo_id": "12345678",
          "repo_name": "my-repo"
        },
        "type": "github"
      },
      "stages": [
        {
          "ended_on": "2021-06-03T15:39:03.134378Z",
          "name": "queued",
          "started_on": "2021-06-03T15:38:15.608194Z",
          "status": "active"
        },
        {
          "ended_on": null,
          "name": "initialize",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "clone_repo",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "build",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "deploy",
          "started_on": null,
          "status": "idle"
        }
      ],
      "url": "https://f64788e9.ninjakittens.pages.dev",
      "skip_reason": "commit_message",
      "uses_functions": true
    },
    "created_on": "2017-01-01T00:00:00Z",
    "deployment_configs": {
      "preview": {
        "always_use_latest_compatibility_date": false,
        "build_image_major_version": 3,
        "compatibility_date": "2025-01-01T00:00:00Z",
        "compatibility_flags": [
          "url_standard"
        ],
        "env_vars": {
          "foo": {
            "type": "plain_text",
            "value": "hello world"
          }
        },
        "fail_open": true,
        "usage_model": "standard",
        "ai_bindings": {
          "AI_BINDING": {
            "project_id": "some-project-id"
          }
        },
        "analytics_engine_datasets": {
          "ANALYTICS_ENGINE_BINDING": {
            "dataset": "api_analytics"
          }
        },
        "browsers": {
          "BROWSER": {}
        },
        "d1_databases": {
          "D1_BINDING": {
            "id": "445e2955-951a-43f8-a35b-a4d0c8138f63"
          }
        },
        "durable_object_namespaces": {
          "DO_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "hyperdrive_bindings": {
          "HYPERDRIVE": {
            "id": "a76a99bc342644deb02c38d66082262a"
          }
        },
        "kv_namespaces": {
          "KV_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "limits": {
          "cpu_ms": 100
        },
        "mtls_certificates": {
          "MTLS": {
            "certificate_id": "d7cdd17c-916f-4cb7-aabe-585eb382ec4e"
          }
        },
        "placement": {
          "mode": "smart"
        },
        "queue_producers": {
          "QUEUE_PRODUCER_BINDING": {
            "name": "some-queue"
          }
        },
        "r2_buckets": {
          "R2_BINDING": {
            "name": "some-bucket",
            "jurisdiction": "eu"
          }
        },
        "services": {
          "SERVICE_BINDING": {
            "environment": "production",
            "service": "example-worker",
            "entrypoint": "MyHandler"
          }
        },
        "vectorize_bindings": {
          "VECTORIZE": {
            "index_name": "my_index"
          }
        },
        "wrangler_config_hash": "abc123def456"
      },
      "production": {
        "always_use_latest_compatibility_date": false,
        "build_image_major_version": 3,
        "compatibility_date": "2025-01-01T00:00:00Z",
        "compatibility_flags": [
          "url_standard"
        ],
        "env_vars": {
          "foo": {
            "type": "plain_text",
            "value": "hello world"
          }
        },
        "fail_open": true,
        "usage_model": "standard",
        "ai_bindings": {
          "AI_BINDING": {
            "project_id": "some-project-id"
          }
        },
        "analytics_engine_datasets": {
          "ANALYTICS_ENGINE_BINDING": {
            "dataset": "api_analytics"
          }
        },
        "browsers": {
          "BROWSER": {}
        },
        "d1_databases": {
          "D1_BINDING": {
            "id": "445e2955-951a-43f8-a35b-a4d0c8138f63"
          }
        },
        "durable_object_namespaces": {
          "DO_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "hyperdrive_bindings": {
          "HYPERDRIVE": {
            "id": "a76a99bc342644deb02c38d66082262a"
          }
        },
        "kv_namespaces": {
          "KV_BINDING": {
            "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
          }
        },
        "limits": {
          "cpu_ms": 100
        },
        "mtls_certificates": {
          "MTLS": {
            "certificate_id": "d7cdd17c-916f-4cb7-aabe-585eb382ec4e"
          }
        },
        "placement": {
          "mode": "smart"
        },
        "queue_producers": {
          "QUEUE_PRODUCER_BINDING": {
            "name": "some-queue"
          }
        },
        "r2_buckets": {
          "R2_BINDING": {
            "name": "some-bucket",
            "jurisdiction": "eu"
          }
        },
        "services": {
          "SERVICE_BINDING": {
            "environment": "production",
            "service": "example-worker",
            "entrypoint": "MyHandler"
          }
        },
        "vectorize_bindings": {
          "VECTORIZE": {
            "index_name": "my_index"
          }
        },
        "wrangler_config_hash": "abc123def456"
      }
    },
    "framework": "framework",
    "framework_version": "framework_version",
    "latest_deployment": {
      "id": "f64788e9-fccd-4d4a-a28a-cb84f88f6",
      "aliases": [
        "https://branchname.projectname.pages.dev"
      ],
      "build_config": {
        "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
        "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
        "build_caching": true,
        "build_command": "npm run build",
        "destination_dir": "build",
        "root_dir": "/"
      },
      "created_on": "2021-03-09T00:55:03.923456Z",
      "deployment_trigger": {
        "metadata": {
          "branch": "main",
          "commit_dirty": false,
          "commit_hash": "ad9ccd918a81025731e10e40267e11273a263421",
          "commit_message": "Update index.html"
        },
        "type": "ad_hoc"
      },
      "env_vars": {
        "foo": {
          "type": "plain_text",
          "value": "hello world"
        }
      },
      "environment": "preview",
      "is_skipped": true,
      "latest_stage": {
        "ended_on": "2021-03-09T00:58:59.045655Z",
        "name": "deploy",
        "started_on": "2021-03-09T00:55:03.923456Z",
        "status": "success"
      },
      "modified_on": "2021-03-09T00:58:59.045655Z",
      "project_id": "7b162ea7-7367-4d67-bcde-1160995d5",
      "project_name": "this-is-my-project-01",
      "short_id": "f64788e9",
      "source": {
        "config": {
          "deployments_enabled": true,
          "owner": "my-org",
          "owner_id": "12345678",
          "path_excludes": [
            "string"
          ],
          "path_includes": [
            "string"
          ],
          "pr_comments_enabled": true,
          "preview_branch_excludes": [
            "string"
          ],
          "preview_branch_includes": [
            "string"
          ],
          "preview_deployment_setting": "all",
          "production_branch": "main",
          "production_deployments_enabled": true,
          "repo_id": "12345678",
          "repo_name": "my-repo"
        },
        "type": "github"
      },
      "stages": [
        {
          "ended_on": "2021-06-03T15:39:03.134378Z",
          "name": "queued",
          "started_on": "2021-06-03T15:38:15.608194Z",
          "status": "active"
        },
        {
          "ended_on": null,
          "name": "initialize",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "clone_repo",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "build",
          "started_on": null,
          "status": "idle"
        },
        {
          "ended_on": null,
          "name": "deploy",
          "started_on": null,
          "status": "idle"
        }
      ],
      "url": "https://f64788e9.ninjakittens.pages.dev",
      "skip_reason": "commit_message",
      "uses_functions": true
    },
    "name": "this-is-my-project-01",
    "preview_script_name": "pages-worker--1234567-preview",
    "production_branch": "main",
    "production_script_name": "pages-worker--1234567-production",
    "uses_functions": true,
    "build_config": {
      "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
      "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
      "build_caching": true,
      "build_command": "npm run build",
      "destination_dir": "build",
      "root_dir": "/"
    },
    "domains": [
      "customdomain.com",
      "customdomain.org"
    ],
    "source": {
      "config": {
        "deployments_enabled": true,
        "owner": "my-org",
        "owner_id": "12345678",
        "path_excludes": [
          "string"
        ],
        "path_includes": [
          "string"
        ],
        "pr_comments_enabled": true,
        "preview_branch_excludes": [
          "string"
        ],
        "preview_branch_includes": [
          "string"
        ],
        "preview_deployment_setting": "all",
        "production_branch": "main",
        "production_deployments_enabled": true,
        "repo_id": "12345678",
        "repo_name": "my-repo"
      },
      "type": "github"
    },
    "subdomain": "helloworld.pages.dev"
  },
  "success": true
}
```