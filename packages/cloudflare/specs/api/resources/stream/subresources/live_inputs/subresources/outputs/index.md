---
title: Outputs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Live Inputs](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Outputs

##### [List all outputs associated with a specified live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/list)

GET/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs

##### [Create a new output, connected to a live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/create)

POST/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs

##### [Update an output](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/update)

PUT/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier}

##### [Delete an output](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/delete)

DELETE/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier}

##### ModelsExpand Collapse

<details>

<summary>

Output object {enabled, streamKey, uid, url }

</summary>

enabled: optional boolean

When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

<a href="#">Link to this property</a>

streamKey: optional string

The streamKey used to authenticate against an output’s target.

<a href="#">Link to this property</a>

uid: optional string

A unique identifier for the output.

maxLength32

<a href="#">Link to this property</a>

url: optional string

The URL an output uses to restream.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(model)%20output%20%3E%20(schema)>)