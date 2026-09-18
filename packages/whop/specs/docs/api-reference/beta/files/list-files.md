> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Files

> Returns the files with the given IDs, newest first — fetch a batch in one request instead of retrieving each file individually. Only files you created are returned; IDs that do not exist, or that another credential created, are omitted. A request for up to 100 IDs answers in a single page by default; a larger batch pages at up to 100 files per response — follow `page_info` with the same `file_ids` to walk the rest.



## OpenAPI

<!-- OpenAPI source: `get /files` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->