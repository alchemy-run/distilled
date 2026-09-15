---
title: Create URL Scan
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Scanner](https://developers.cloudflare.com/api/resources/url_scanner)

[Scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create URL Scan

POST/accounts/{account\_id}/urlscanner/v2/scan

Submit a URL to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/.

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

`URL Scanner Write``URL Scanner Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

url: string

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

agentReadiness: optional boolean

Enable agent readiness checks.

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20agentReadiness%20%3E%20(schema)>)

<details>

<summary>

country: optional "AF"or "AL"or "DZ"or 192 more

Country to geo egress from

</summary>

One of the following:

"AF"

<a href="#">Link to this property</a>

"AL"

<a href="#">Link to this property</a>

"DZ"

<a href="#">Link to this property</a>

"AD"

<a href="#">Link to this property</a>

"AO"

<a href="#">Link to this property</a>

"AG"

<a href="#">Link to this property</a>

"AR"

<a href="#">Link to this property</a>

"AM"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"AT"

<a href="#">Link to this property</a>

"AZ"

<a href="#">Link to this property</a>

"BH"

<a href="#">Link to this property</a>

"BD"

<a href="#">Link to this property</a>

"BB"

<a href="#">Link to this property</a>

"BY"

<a href="#">Link to this property</a>

"BE"

<a href="#">Link to this property</a>

"BZ"

<a href="#">Link to this property</a>

"BJ"

<a href="#">Link to this property</a>

"BM"

<a href="#">Link to this property</a>

"BT"

<a href="#">Link to this property</a>

"BO"

<a href="#">Link to this property</a>

"BA"

<a href="#">Link to this property</a>

"BW"

<a href="#">Link to this property</a>

"BR"

<a href="#">Link to this property</a>

"BN"

<a href="#">Link to this property</a>

"BG"

<a href="#">Link to this property</a>

"BF"

<a href="#">Link to this property</a>

"BI"

<a href="#">Link to this property</a>

"KH"

<a href="#">Link to this property</a>

"CM"

<a href="#">Link to this property</a>

"CA"

<a href="#">Link to this property</a>

"CV"

<a href="#">Link to this property</a>

"KY"

<a href="#">Link to this property</a>

"CF"

<a href="#">Link to this property</a>

"TD"

<a href="#">Link to this property</a>

"CL"

<a href="#">Link to this property</a>

"CN"

<a href="#">Link to this property</a>

"CO"

<a href="#">Link to this property</a>

"KM"

<a href="#">Link to this property</a>

"CG"

<a href="#">Link to this property</a>

"CR"

<a href="#">Link to this property</a>

"CI"

<a href="#">Link to this property</a>

"HR"

<a href="#">Link to this property</a>

"CU"

<a href="#">Link to this property</a>

"CY"

<a href="#">Link to this property</a>

"CZ"

<a href="#">Link to this property</a>

"CD"

<a href="#">Link to this property</a>

"DK"

<a href="#">Link to this property</a>

"DJ"

<a href="#">Link to this property</a>

"DM"

<a href="#">Link to this property</a>

"DO"

<a href="#">Link to this property</a>

"EC"

<a href="#">Link to this property</a>

"EG"

<a href="#">Link to this property</a>

"SV"

<a href="#">Link to this property</a>

"GQ"

<a href="#">Link to this property</a>

"ER"

<a href="#">Link to this property</a>

"EE"

<a href="#">Link to this property</a>

"SZ"

<a href="#">Link to this property</a>

"ET"

<a href="#">Link to this property</a>

"FJ"

<a href="#">Link to this property</a>

"FI"

<a href="#">Link to this property</a>

"FR"

<a href="#">Link to this property</a>

"GA"

<a href="#">Link to this property</a>

"GE"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"GH"

<a href="#">Link to this property</a>

"GR"

<a href="#">Link to this property</a>

"GL"

<a href="#">Link to this property</a>

"GD"

<a href="#">Link to this property</a>

"GT"

<a href="#">Link to this property</a>

"GN"

<a href="#">Link to this property</a>

"GW"

<a href="#">Link to this property</a>

"GY"

<a href="#">Link to this property</a>

"HT"

<a href="#">Link to this property</a>

"HN"

<a href="#">Link to this property</a>

"HU"

<a href="#">Link to this property</a>

"IS"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"ID"

<a href="#">Link to this property</a>

"IR"

<a href="#">Link to this property</a>

"IQ"

<a href="#">Link to this property</a>

"IE"

<a href="#">Link to this property</a>

"IL"

<a href="#">Link to this property</a>

"IT"

<a href="#">Link to this property</a>

"JM"

<a href="#">Link to this property</a>

"JP"

<a href="#">Link to this property</a>

"JO"

<a href="#">Link to this property</a>

"KZ"

<a href="#">Link to this property</a>

"KE"

<a href="#">Link to this property</a>

"KI"

<a href="#">Link to this property</a>

"KW"

<a href="#">Link to this property</a>

"KG"

<a href="#">Link to this property</a>

"LA"

<a href="#">Link to this property</a>

"LV"

<a href="#">Link to this property</a>

"LB"

<a href="#">Link to this property</a>

"LS"

<a href="#">Link to this property</a>

"LR"

<a href="#">Link to this property</a>

"LY"

<a href="#">Link to this property</a>

"LI"

<a href="#">Link to this property</a>

"LT"

<a href="#">Link to this property</a>

"LU"

<a href="#">Link to this property</a>

"MO"

<a href="#">Link to this property</a>

"MG"

<a href="#">Link to this property</a>

"MW"

<a href="#">Link to this property</a>

"MY"

<a href="#">Link to this property</a>

"MV"

<a href="#">Link to this property</a>

"ML"

<a href="#">Link to this property</a>

"MR"

<a href="#">Link to this property</a>

"MU"

<a href="#">Link to this property</a>

"MX"

<a href="#">Link to this property</a>

"FM"

<a href="#">Link to this property</a>

"MD"

<a href="#">Link to this property</a>

"MC"

<a href="#">Link to this property</a>

"MN"

<a href="#">Link to this property</a>

"MS"

<a href="#">Link to this property</a>

"MA"

<a href="#">Link to this property</a>

"MZ"

<a href="#">Link to this property</a>

"MM"

<a href="#">Link to this property</a>

"NA"

<a href="#">Link to this property</a>

"NR"

<a href="#">Link to this property</a>

"NP"

<a href="#">Link to this property</a>

"NL"

<a href="#">Link to this property</a>

"NZ"

<a href="#">Link to this property</a>

"NI"

<a href="#">Link to this property</a>

"NE"

<a href="#">Link to this property</a>

"NG"

<a href="#">Link to this property</a>

"KP"

<a href="#">Link to this property</a>

"MK"

<a href="#">Link to this property</a>

"NO"

<a href="#">Link to this property</a>

"OM"

<a href="#">Link to this property</a>

"PK"

<a href="#">Link to this property</a>

"PS"

<a href="#">Link to this property</a>

"PA"

<a href="#">Link to this property</a>

"PG"

<a href="#">Link to this property</a>

"PY"

<a href="#">Link to this property</a>

"PE"

<a href="#">Link to this property</a>

"PH"

<a href="#">Link to this property</a>

"PL"

<a href="#">Link to this property</a>

"PT"

<a href="#">Link to this property</a>

"QA"

<a href="#">Link to this property</a>

"RO"

<a href="#">Link to this property</a>

"RU"

<a href="#">Link to this property</a>

"RW"

<a href="#">Link to this property</a>

"SH"

<a href="#">Link to this property</a>

"KN"

<a href="#">Link to this property</a>

"LC"

<a href="#">Link to this property</a>

"VC"

<a href="#">Link to this property</a>

"WS"

<a href="#">Link to this property</a>

"SM"

<a href="#">Link to this property</a>

"ST"

<a href="#">Link to this property</a>

"SA"

<a href="#">Link to this property</a>

"SN"

<a href="#">Link to this property</a>

"RS"

<a href="#">Link to this property</a>

"SC"

<a href="#">Link to this property</a>

"SL"

<a href="#">Link to this property</a>

"SK"

<a href="#">Link to this property</a>

"SI"

<a href="#">Link to this property</a>

"SB"

<a href="#">Link to this property</a>

"SO"

<a href="#">Link to this property</a>

"ZA"

<a href="#">Link to this property</a>

"KR"

<a href="#">Link to this property</a>

"SS"

<a href="#">Link to this property</a>

"ES"

<a href="#">Link to this property</a>

"LK"

<a href="#">Link to this property</a>

"SD"

<a href="#">Link to this property</a>

"SR"

<a href="#">Link to this property</a>

"SE"

<a href="#">Link to this property</a>

"CH"

<a href="#">Link to this property</a>

"SY"

<a href="#">Link to this property</a>

"TW"

<a href="#">Link to this property</a>

"TJ"

<a href="#">Link to this property</a>

"TZ"

<a href="#">Link to this property</a>

"TH"

<a href="#">Link to this property</a>

"BS"

<a href="#">Link to this property</a>

"GM"

<a href="#">Link to this property</a>

"TL"

<a href="#">Link to this property</a>

"TG"

<a href="#">Link to this property</a>

"TO"

<a href="#">Link to this property</a>

"TT"

<a href="#">Link to this property</a>

"TN"

<a href="#">Link to this property</a>

"TR"

<a href="#">Link to this property</a>

"TM"

<a href="#">Link to this property</a>

"UG"

<a href="#">Link to this property</a>

"UA"

<a href="#">Link to this property</a>

"AE"

<a href="#">Link to this property</a>

"GB"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

"UY"

<a href="#">Link to this property</a>

"UZ"

<a href="#">Link to this property</a>

"VU"

<a href="#">Link to this property</a>

"VE"

<a href="#">Link to this property</a>

"VN"

<a href="#">Link to this property</a>

"YE"

<a href="#">Link to this property</a>

"ZM"

<a href="#">Link to this property</a>

"ZW"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20country%20%3E%20(schema)>)

customagent: optional string

maxLength4096

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20customagent%20%3E%20(schema)>)

customHeaders: optional map\[string]

Set custom headers.

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20customHeaders%20%3E%20(schema)>)

referer: optional string

maxLength4096

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20referer%20%3E%20(schema)>)

<details>

<summary>

screenshotsResolutions: optional array of "desktop"or "mobile"or "tablet"

Take multiple screenshots targeting different device types.

</summary>

One of the following:

"desktop"

<a href="#">Link to this property</a>

"mobile"

<a href="#">Link to this property</a>

"tablet"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20screenshotsResolutions%20%3E%20(schema)>)

<details>

<summary>

visibility: optional "Public"or "Unlisted"

The option <code>Public</code> means it will be included in listings like recent scans and search results. <code>Unlisted</code> means it will not be included in the aforementioned listings, users will need to have the scan’s ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.

</summary>

One of the following:

"Public"

<a href="#">Link to this property</a>

"Unlisted"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20visibility%20%3E%20(schema)>)

##### ReturnsExpand Collapse

api: string

URL to api report.

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20api>)

message: string

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20message>)

result: string

Public URL to report.

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20result>)

url: string

Canonical form of submitted URL. Use this if you want to later search by URL.

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20url>)

uuid: string

Scan ID.

formatuuid

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

<details>

<summary>

visibility: "public"or "unlisted"

Submitted visibility status.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"unlisted"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20visibility>)

<details>

<summary>

options: optional object {useragent }

</summary>

useragent: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)%20%3E%20(property)%20options>)

### Create URL Scan

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/scan \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://www.example.com"
        }'
```

200 example

```
{
  "api": "api",
  "message": "Submission successful",
  "result": "result",
  "url": "url",
  "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "visibility": "public",
  "options": {
    "useragent": "useragent"
  }
}
```

##### Returns Examples

200 example

```
{
  "api": "api",
  "message": "Submission successful",
  "result": "result",
  "url": "url",
  "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "visibility": "public",
  "options": {
    "useragent": "useragent"
  }
}
```