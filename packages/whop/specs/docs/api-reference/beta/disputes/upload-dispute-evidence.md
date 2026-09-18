> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload Dispute Evidence

> Replaces the full set of uploaded evidence documents on a dispute, beyond the four fixed evidence slots. Upload files through `POST /files` and reference them by `id`, or send the files as multipart file parts to upload and attach in one call. Send every document the packet should carry — up to 10, 10MB each and 25MB in total; an empty list removes them all. Accepted content types: application/pdf, application/json, image/jpeg, image/png, image/webp — any other type is rejected.



## OpenAPI

<!-- OpenAPI source: `post /disputes/{id}/upload_evidence` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->