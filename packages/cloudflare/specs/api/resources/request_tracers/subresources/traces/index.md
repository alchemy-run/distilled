---
title: Traces
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Trace](https://developers.cloudflare.com/api/resources/request_tracers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Traces

##### [Request Trace](https://developers.cloudflare.com/api/resources/request_tracers/subresources/traces/methods/create)

POST/accounts/{account\_id}/request-tracer/trace

##### ModelsExpand Collapse

Trace = array of [TraceItem](<https://developers.cloudflare.com/api/resources/request_tracers#(resource)%20request_tracers.traces%20%3E%20(model)%20trace_item%20%3E%20(schema)>) { action, action\_parameters, description, 7 more }

[Link to this property](#)%20request_tracers.traces%20%3E%20(model)%20trace%20%3E%20(schema)>)

<details>

<summary>

TraceItem object {action, action\_parameters, description, 7 more }

List of steps acting on request/response

</summary>

action: optional string

If step type is rule, then action performed by this rule

<a href="#">Link to this property</a>

action\_parameters: optional unknown

If step type is rule, then action parameters of this rule as JSON

<a href="#">Link to this property</a>

description: optional string

If step type is rule or ruleset, the description of this entity

<a href="#">Link to this property</a>

expression: optional string

If step type is rule, then expression used to match for this rule

<a href="#">Link to this property</a>

kind: optional string

If step type is ruleset, then kind of this ruleset

<a href="#">Link to this property</a>

matched: optional boolean

Whether tracing step affected tracing request/response

<a href="#">Link to this property</a>

name: optional string

If step type is ruleset, then name of this ruleset

<a href="#">Link to this property</a>

step\_name: optional string

Tracing step identifying name

<a href="#">Link to this property</a>

trace: optional <a href="https://developers.cloudflare.com/api/resources/request_tracers#(resource)%20request_tracers.traces%20%3E%20(model)%20trace%20%3E%20(schema)">Trace</a>

<a href="#">Link to this property</a>

type: optional string

Tracing step type

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20request_tracers.traces%20%3E%20(model)%20trace_item%20%3E%20(schema)>)

<details>

<summary>

TraceCreateResponse object {status\_code, trace }

Trace result with an origin status code

</summary>

status\_code: optional number

HTTP Status code of zone response

<a href="#">Link to this property</a>

trace: optional <a href="https://developers.cloudflare.com/api/resources/request_tracers#(resource)%20request_tracers.traces%20%3E%20(model)%20trace%20%3E%20(schema)">Trace</a>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20request_tracers.traces%20%3E%20(model)%20trace_create_response%20%3E%20(schema)>)