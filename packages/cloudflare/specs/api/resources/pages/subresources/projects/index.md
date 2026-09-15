---
title: Projects
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Projects

##### [Get projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/list)

GET/accounts/{account\_id}/pages/projects

##### [Get project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}

##### [Get upload token](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/get_upload_token)

GET/accounts/{account\_id}/pages/projects/{project\_name}/upload-token

##### [Create project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/create)

POST/accounts/{account\_id}/pages/projects

##### [Update project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/edit)

PATCH/accounts/{account\_id}/pages/projects/{project\_name}

##### [Delete project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}

##### [Purge build cache](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/purge_build_cache)

POST/accounts/{account\_id}/pages/projects/{project\_name}/purge\_build\_cache

##### ModelsExpand Collapse

<details>

<summary>

Deployment object {id, aliases, build\_config, 15 more }

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

latest\_stage: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20stage%20%3E%20(schema)">Stage</a> { ended\_on, name, started\_on, status }

The status of the deployment.

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

[Link to this property](#)%20pages.projects%20%3E%20(model)%20deployment%20%3E%20(schema)>)

<details>

<summary>

Project object {id, canonical\_deployment, created\_on, 13 more }

</summary>

id: string

ID of the project.

<a href="#">Link to this property</a>

canonical\_deployment: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20deployment%20%3E%20(schema)">Deployment</a> { id, aliases, build\_config, 15 more }

Most recent production deployment of the project.

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

latest\_deployment: <a href="https://developers.cloudflare.com/api/resources/pages#(resource)%20pages.projects%20%3E%20(model)%20deployment%20%3E%20(schema)">Deployment</a> { id, aliases, build\_config, 15 more }

Most recent deployment of the project.

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

[Link to this property](#)%20pages.projects%20%3E%20(model)%20project%20%3E%20(schema)>)

<details>

<summary>

Stage object {ended\_on, name, started\_on, status }

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

[Link to this property](#)%20pages.projects%20%3E%20(model)%20stage%20%3E%20(schema)>)

<details>

<summary>

ProjectGetUploadTokenResponse object {jwt }

</summary>

jwt: string

Short-lived JWT used to authenticate Pages Direct Upload asset operations.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects%20%3E%20(model)%20project_get_upload_token_response%20%3E%20(schema)>)

ProjectDeleteResponse = unknown

[Link to this property](#)%20pages.projects%20%3E%20(model)%20project_delete_response%20%3E%20(schema)>)

ProjectPurgeBuildCacheResponse = unknown

[Link to this property](#)%20pages.projects%20%3E%20(model)%20project_purge_build_cache_response%20%3E%20(schema)>)

#### ProjectsDeployments

##### [Get deployments](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/list)

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments

##### [Get deployment info](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}

##### [Create deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/create)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments

##### [Delete deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}

##### [Retry deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/retry)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/retry

##### [Rollback deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/rollback)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/rollback

##### ModelsExpand Collapse

DeploymentDeleteResponse = unknown

[Link to this property](#)%20pages.projects.deployments%20%3E%20(model)%20deployment_delete_response%20%3E%20(schema)>)

#### ProjectsDeploymentsHistory

#### ProjectsDeploymentsHistoryLogs

##### [Get deployment logs](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/history/subresources/logs/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/history/logs

##### ModelsExpand Collapse

<details>

<summary>

LogGetResponse object {data, includes\_container\_logs, total }

</summary>

<details>

<summary>

data: array of object {line, ts }

</summary>

line: string

<a href="#">Link to this property</a>

ts: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

includes\_container\_logs: boolean

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(model)%20log_get_response%20%3E%20(schema)>)

#### ProjectsDeploymentsTails

##### [Create deployment tail](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/tails/methods/create)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/tails

##### [Delete deployment tail](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/tails/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/tails/{tail\_id}

##### ModelsExpand Collapse

<details>

<summary>

TailCreateResponse object {id, url }

A tail session for streaming logs from a Pages deployment.

</summary>

id: string

Identifier of the tail session.

<a href="#">Link to this property</a>

url: optional string

Optional WebSocket URL to connect to for receiving tail events, when returned by the tail service.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.deployments.tails%20%3E%20(model)%20tail_create_response%20%3E%20(schema)>)

TailDeleteResponse = unknown

[Link to this property](#)%20pages.projects.deployments.tails%20%3E%20(model)%20tail_delete_response%20%3E%20(schema)>)

#### ProjectsDomains

##### [Get domains](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/list)

GET/accounts/{account\_id}/pages/projects/{project\_name}/domains

##### [Get domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

##### [Add domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create)

POST/accounts/{account\_id}/pages/projects/{project\_name}/domains

##### [Patch domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/edit)

PATCH/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

##### [Delete domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

##### ModelsExpand Collapse

<details>

<summary>

DomainListResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_list_response%20%3E%20(schema)>)

<details>

<summary>

DomainGetResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_get_response%20%3E%20(schema)>)

<details>

<summary>

DomainCreateResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_create_response%20%3E%20(schema)>)

<details>

<summary>

DomainEditResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_edit_response%20%3E%20(schema)>)

DomainDeleteResponse = unknown

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_delete_response%20%3E%20(schema)>)