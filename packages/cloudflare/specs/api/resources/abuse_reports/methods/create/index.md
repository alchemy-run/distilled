---
title: Submit an abuse report
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Submit an abuse report

POST/accounts/{account\_id}/abuse-reports/{report\_param}

Submit an abuse report of a particular type.

Requires the abuse-reports entitlement on the account (Enterprise accounts have it by default; other accounts must request access) and an API token with the `Account > Abuse Reports > Edit` permission. If the account is not entitled, the request is rejected with an HTTP `401` response (see below).

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

report\_param: string

The report type for submitted reports.

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20report_param%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {act, address1, agent\_name, 18 more } or object {act, email, email2, 14 more } or object {act, email, email2, 14 more } or 5 more

</summary>

One of the following:

<details>

<summary>

AbuseDmca object {act, address1, agent\_name, 18 more }

</summary>

act: "abuse\_dmca"

The report type for submitted reports.

<a href="#">Link to this property</a>

address1: string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

agent\_name: string

The name of the copyright holder. Text not exceeding 60 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength60

minLength1

<a href="#">Link to this property</a>

agree: 1

Can be <code>0</code> for false or <code>1</code> for true. Must be value: 1 for DMCA reports

<a href="#">Link to this property</a>

city: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

country: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

host\_notification: "send"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

original\_work: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

owner\_notification: "send"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

<a href="#">Link to this property</a>

signature: string

Required for DMCA reports, should be same as Name. An affirmation that all information in the report is true and accurate while agreeing to the policies of Cloudflare’s abuse reports

<a href="#">Link to this property</a>

state: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbuseTrademark object {act, email, email2, 14 more }

</summary>

act: "abuse\_trademark"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

host\_notification: "send"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

<a href="#">Link to this property</a>

justification: string

A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

maxLength5000

minLength1

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

owner\_notification: "send"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

<a href="#">Link to this property</a>

trademark\_number: string

Text not exceeding 1000 characters

maxLength1000

minLength1

<a href="#">Link to this property</a>

trademark\_office: string

Text not exceeding 1000 characters

maxLength1000

minLength1

<a href="#">Link to this property</a>

trademark\_symbol: string

Text not exceeding 1000 characters

maxLength1000

minLength1

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbuseGeneral object {act, email, email2, 14 more }

</summary>

act: "abuse\_general"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

<details>

<summary>

host\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

justification: string

A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

maxLength5000

minLength1

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

owner\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

destination\_ips: optional string

A list of IP addresses separated by ‘\\n’ (new line character). The list of destination IPs should not exceed 30 IP addresses. Each one of the IP addresses ought to be unique.

<a href="#">Link to this property</a>

ports\_protocols: optional string

A comma separated list of ports and protocols e.g. 80/TCP, 22/UDP. The total size of the field should not exceed 2000 characters. Each individual port/protocol should not exceed 100 characters. The list should not have more than 30 unique ports and protocols.

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

source\_ips: optional string

A list of IP addresses separated by ‘\\n’ (new line character). The list of source IPs should not exceed 30 IP addresses. Each one of the IP addresses ought to be unique.

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbusePhishing object {act, email, email2, 12 more }

</summary>

act: "abuse\_phishing"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

<details>

<summary>

host\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

justification: string

A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

maxLength5000

minLength20

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

owner\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

original\_work: optional string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbuseChildren object {act, email, email2, 13 more }

</summary>

act: "abuse\_children"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

<details>

<summary>

host\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

justification: string

A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

maxLength5000

minLength1

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ncmec\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

owner\_notification: "send"or "send-anon"or "none"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

country: optional string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbuseThreat object {act, email, email2, 11 more }

</summary>

act: "abuse\_threat"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

<details>

<summary>

host\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

justification: string

A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

maxLength5000

minLength1

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

owner\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbuseRegistrarWhois object {act, email, email2, 10 more }

</summary>

act: "abuse\_registrar\_whois"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

owner\_notification: "send"or "send-anon"or "none"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_request: optional object {reg\_who\_good\_faith\_affirmation, reg\_who\_lawful\_processing\_agreement, reg\_who\_legal\_basis, 4 more }

RDP-mandated fields for registrar WHOIS data disclosure requests.

</summary>

reg\_who\_good\_faith\_affirmation: boolean

Affirmation that the request is made in good faith per RDP 10.2.4. Must be true.

<a href="#">Link to this property</a>

reg\_who\_lawful\_processing\_agreement: boolean

Agreement to process data lawfully per RDP 10.2.5. Must be true.

<a href="#">Link to this property</a>

reg\_who\_legal\_basis: string

Legal rights and rationale for the request per RDP 10.2.3. Required for all WHOIS requests.

maxLength5000

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_request\_type: "disclosure"or "invalid\_whois"

The type of WHOIS data request per RDP procedure.

</summary>

One of the following:

"disclosure"

<a href="#">Link to this property</a>

"invalid\_whois"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_requested\_data\_elements: array of "registrant\_name"or "registrant\_organization"or "registrant\_email"or 14 more

The specific WHOIS data elements being requested per RDP 10.2.2. Required for all WHOIS requests.

</summary>

One of the following:

"registrant\_name"

<a href="#">Link to this property</a>

"registrant\_organization"

<a href="#">Link to this property</a>

"registrant\_email"

<a href="#">Link to this property</a>

"registrant\_phone"

<a href="#">Link to this property</a>

"registrant\_address"

<a href="#">Link to this property</a>

"registrant\_address\_country"

<a href="#">Link to this property</a>

"registrant\_address\_postal\_code"

<a href="#">Link to this property</a>

"admin\_name"

<a href="#">Link to this property</a>

"admin\_organization"

<a href="#">Link to this property</a>

"admin\_email"

<a href="#">Link to this property</a>

"admin\_phone"

<a href="#">Link to this property</a>

"admin\_address"

<a href="#">Link to this property</a>

"tech\_name"

<a href="#">Link to this property</a>

"tech\_organization"

<a href="#">Link to this property</a>

"tech\_email"

<a href="#">Link to this property</a>

"tech\_phone"

<a href="#">Link to this property</a>

"tech\_address"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reg\_who\_authorization\_statement: optional string

Optional authorization statement or power of attorney per RDP 10.2.1.3.

maxLength5000

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_requestor\_type: optional "government"or "corporation"or "individual"

The nature of the requestor per RDP 10.2.1.2.

</summary>

One of the following:

"government"

<a href="#">Link to this property</a>

"corporation"

<a href="#">Link to this property</a>

"individual"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AbuseNcsei object {act, email, email2, 12 more }

</summary>

act: "abuse\_ncsei"

The report type for submitted reports.

<a href="#">Link to this property</a>

email: string

A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

email2: string

Should match the value provided in <code>email</code>

<a href="#">Link to this property</a>

<details>

<summary>

host\_notification: "send"or "send-anon"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

ncsei\_subject\_representation: boolean

If the submitter is the target of NCSEI in the URLs of the abuse report.

<a href="#">Link to this property</a>

<details>

<summary>

owner\_notification: "send"or "send-anon"or "none"

Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

</summary>

One of the following:

"send"

<a href="#">Link to this property</a>

"send-anon"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: string

A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

<a href="#">Link to this property</a>

comments: optional string

Any additional comments about the infringement not exceeding 2000 characters

maxLength2000

minLength1

<a href="#">Link to this property</a>

company: optional string

Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength100

minLength1

<a href="#">Link to this property</a>

country: optional string

Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength255

minLength1

<a href="#">Link to this property</a>

reported\_country: optional string

Text containing 2 characters

maxLength2

minLength2

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

tele: optional string

Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (<a href="https://lumendatabase.org/">https://lumendatabase.org/</a>).

maxLength20

minLength1

<a href="#">Link to this property</a>

title: optional string

Text not exceeding 255 characters

maxLength255

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

abuse\_rand: string

The identifier for the submitted abuse report.

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20abuse_rand>)

<details>

<summary>

request: object {act }

</summary>

act: string

The report type for submitted reports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20request>)

result: string

The result should be ‘success’ for successful response

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Submit an abuse report

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_PARAM \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "act": "abuse_dmca",
          "address1": "x",
          "agent_name": "x",
          "agree": 1,
          "city": "x",
          "country": "x",
          "email": "email",
          "email2": "email2",
          "host_notification": "send",
          "name": "x",
          "original_work": "x",
          "owner_notification": "send",
          "signature": "signature",
          "state": "x",
          "urls": "urls"
        }'
```

200 example

```
{
  "abuse_rand": "abuse_rand",
  "request": {
    "act": "act"
  },
  "result": "result"
}
```

##### Returns Examples

200 example

```
{
  "abuse_rand": "abuse_rand",
  "request": {
    "act": "act"
  },
  "result": "result"
}
```