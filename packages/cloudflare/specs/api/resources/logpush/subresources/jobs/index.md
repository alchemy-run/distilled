---
title: Jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Jobs

##### [List Logpush jobs](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/jobs

##### [Get Logpush job details](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/jobs/{job\_id}

##### [Create Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/jobs

##### [Update Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/jobs/{job\_id}

##### [Delete Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/jobs/{job\_id}

##### ModelsExpand Collapse

<details>

<summary>

LogpushJob object {id, dataset, destination\_conf, 13 more }

</summary>

id: optional number

Unique id of the job.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

dataset: optional "access\_requests"or "account\_abuse\_protection\_events"or "audit\_logs"or 34 more

Name of the dataset. A list of supported datasets can be found on the <a href="https://developers.cloudflare.com/logs/reference/log-fields/">Developer Docs</a>.

</summary>

One of the following:

"access\_requests"

<a href="#">Link to this property</a>

"account\_abuse\_protection\_events"

<a href="#">Link to this property</a>

"audit\_logs"

<a href="#">Link to this property</a>

"audit\_logs\_v2"

<a href="#">Link to this property</a>

"biso\_user\_actions"

<a href="#">Link to this property</a>

"casb\_findings"

<a href="#">Link to this property</a>

"device\_posture\_results"

<a href="#">Link to this property</a>

"dex\_application\_tests"

<a href="#">Link to this property</a>

"dex\_device\_state\_events"

<a href="#">Link to this property</a>

"dlp\_forensic\_copies"

<a href="#">Link to this property</a>

"dns\_firewall\_logs"

<a href="#">Link to this property</a>

"dns\_logs"

<a href="#">Link to this property</a>

"email\_security\_alerts"

<a href="#">Link to this property</a>

"email\_security\_post\_delivery\_events"

<a href="#">Link to this property</a>

"firewall\_events"

<a href="#">Link to this property</a>

"gateway\_dns"

<a href="#">Link to this property</a>

"gateway\_http"

<a href="#">Link to this property</a>

"gateway\_network"

<a href="#">Link to this property</a>

"http\_requests"

<a href="#">Link to this property</a>

"ipsec\_logs"

<a href="#">Link to this property</a>

"magic\_bgp\_logs"

<a href="#">Link to this property</a>

"magic\_ids\_detections"

<a href="#">Link to this property</a>

"mcp\_portal\_logs"

<a href="#">Link to this property</a>

"mnm\_flow\_logs"

<a href="#">Link to this property</a>

"nel\_reports"

<a href="#">Link to this property</a>

"network\_analytics\_logs"

<a href="#">Link to this property</a>

"page\_shield\_events"

<a href="#">Link to this property</a>

"sinkhole\_http\_logs"

<a href="#">Link to this property</a>

"spectrum\_events"

<a href="#">Link to this property</a>

"ssh\_logs"

<a href="#">Link to this property</a>

"turnstile\_events"

<a href="#">Link to this property</a>

"warp\_config\_changes"

<a href="#">Link to this property</a>

"warp\_toggle\_changes"

<a href="#">Link to this property</a>

"websocket\_analytics"

<a href="#">Link to this property</a>

"workers\_trace\_events"

<a href="#">Link to this property</a>

"zaraz\_events"

<a href="#">Link to this property</a>

"zero\_trust\_network\_sessions"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

destination\_conf: optional string

Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

formaturi

maxLength4096

<a href="#">Link to this property</a>

enabled: optional boolean

Flag that indicates if the job is enabled.

<a href="#">Link to this property</a>

error\_message: optional string

If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error\_message and last\_error are set to null.

<a href="#">Link to this property</a>

filter\_attack\_traffic: optional boolean

When true, excludes DDoS attack traffic from logs. This option is supported for the <code>http_requests</code>, <code>firewall_events</code>, and <code>network_analytics_logs</code> datasets.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedfrequency: optional "high"or "low"

This field is deprecated. Please use <code>max_upload_*</code> parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

</summary>

One of the following:

"high"

<a href="#">Link to this property</a>

"low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

kind: optional ""or "edge"

The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"edge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_complete: optional string

Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn’t run yet then the field will be empty.

formatdate-time

<a href="#">Link to this property</a>

last\_error: optional string

Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error\_message field.

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlogpull\_options: optional string

This field is deprecated. Use <code>output_options</code> instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

formaturi-reference

maxLength4096

<a href="#">Link to this property</a>

<details>

<summary>

max\_upload\_bytes: optional 0or number

The maximum uncompressed file size of a batch of logs. This setting value must be between <code>5 MB</code> and <code>1 GB</code>, or <code>0</code> to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

</summary>

One of the following:

0

The maximum uncompressed file size of a batch of logs. This setting value must be between <code>5 MB</code> and <code>1 GB</code>, or <code>0</code> to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

max\_upload\_interval\_seconds: optional 0or number

The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or <code>0</code> to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

</summary>

One of the following:

0

The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or <code>0</code> to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

max\_upload\_records: optional 0or number

The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or <code>0</code> to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

</summary>

One of the following:

0

The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or <code>0</code> to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

maxLength512

<a href="#">Link to this property</a>

output\_options: optional <a href="https://developers.cloudflare.com/api/resources/logpush#(resource)%20logpush.jobs%20%3E%20(model)%20output_options%20%3E%20(schema)">OutputOptions</a> { batch\_prefix, batch\_suffix, CVE-2021-44228, 10 more }

The structured replacement for <code>logpull_options</code>. When including this field, the <code>logpull_option</code> field will be ignored.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.jobs%20%3E%20(model)%20logpush_job%20%3E%20(schema)>)

<details>

<summary>

OutputOptions object {batch\_prefix, batch\_suffix, "CVE-2021-44228", 10 more }

The structured replacement for <code>logpull_options</code>. When including this field, the <code>logpull_option</code> field will be ignored.

</summary>

batch\_prefix: optional string

String to be prepended before each batch.

<a href="#">Link to this property</a>

batch\_suffix: optional string

String to be appended after each batch.

<a href="#">Link to this property</a>

"CVE-2021-44228": optional boolean

If set to true, will cause all occurrences of <code>${</code> in the generated files to be replaced with <code>x{</code>.

<a href="#">Link to this property</a>

field\_delimiter: optional string

String to join fields. This field be ignored when <code>record_template</code> is set.

<a href="#">Link to this property</a>

field\_names: optional array of string

List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

<a href="#">Link to this property</a>

merge\_subrequests: optional boolean

If set to true, subrequests will be merged into the parent request. Only supported for the <code>http_requests</code> dataset.

<a href="#">Link to this property</a>

<details>

<summary>

output\_type: optional "ndjson"or "csv"

Specifies the output type, such as <code>ndjson</code> or <code>csv</code>. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

</summary>

One of the following:

"ndjson"

<a href="#">Link to this property</a>

"csv"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

record\_delimiter: optional string

String to be inserted in-between the records as separator.

<a href="#">Link to this property</a>

record\_prefix: optional string

String to be prepended before each record.

<a href="#">Link to this property</a>

record\_suffix: optional string

String to be appended after each record.

<a href="#">Link to this property</a>

record\_template: optional string

String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in <code>field_names</code> as well, otherwise they will end up as null. Format as a Go <code>text/template</code> without any standard functions, like conditionals, loops, sub-templates, etc.

<a href="#">Link to this property</a>

sample\_rate: optional number

Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of the current <code>sample_interval</code> of the data.

formatfloat

exclusiveMinimum

maximum1

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "unixnano"or "unix"or "rfc3339"or 2 more

String to specify the format for timestamps, such as <code>unixnano</code>, <code>unix</code>, <code>rfc3339</code>, <code>rfc3339ms</code> or <code>rfc3339ns</code>.

</summary>

One of the following:

"unixnano"

<a href="#">Link to this property</a>

"unix"

<a href="#">Link to this property</a>

"rfc3339"

<a href="#">Link to this property</a>

"rfc3339ms"

<a href="#">Link to this property</a>

"rfc3339ns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.jobs%20%3E%20(model)%20output_options%20%3E%20(schema)>)

<details>

<summary>

JobDeleteResponse object {id }

</summary>

id: optional number

Unique id of the job.

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.jobs%20%3E%20(model)%20job_delete_response%20%3E%20(schema)>)