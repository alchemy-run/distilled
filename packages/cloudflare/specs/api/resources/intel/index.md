---
title: Intel
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Intel

#### IntelASN

##### [Get ASN Overview.](https://developers.cloudflare.com/api/resources/intel/subresources/asn/methods/get)

GET/accounts/{account\_id}/intel/asn/{asn}

#### IntelASNSubnets

##### [Get ASN Subnets](https://developers.cloudflare.com/api/resources/intel/subresources/asn/subresources/subnets/methods/get)

GET/accounts/{account\_id}/intel/asn/{asn}/subnets

##### ModelsExpand Collapse

<details>

<summary>

SubnetGetResponse object {asn, count, ip\_count\_total, 3 more }

</summary>

asn: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20asn%20%3E%20(schema)">ASN</a>

<a href="#">Link to this property</a>

count: optional number

Total results returned based on your search parameters.

<a href="#">Link to this property</a>

ip\_count\_total: optional number

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

subnets: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)>)

#### IntelDNS

##### [Get Passive DNS by IP](https://developers.cloudflare.com/api/resources/intel/subresources/dns/methods/list)

GET/accounts/{account\_id}/intel/dns

##### ModelsExpand Collapse

<details>

<summary>

DNS object {count, page, per\_page, reverse\_records }

</summary>

count: optional number

Total results returned based on your search parameters.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

<details>

<summary>

reverse\_records: optional array of object {first\_seen, hostname, last\_seen }

Reverse DNS look-ups observed during the time period.

</summary>

first\_seen: optional string

First seen date of the DNS record during the time period.

formatdate

<a href="#">Link to this property</a>

hostname: optional string

Hostname that the IP was observed resolving to.

<a href="#">Link to this property</a>

last\_seen: optional string

Last seen date of the DNS record during the time period.

formatdate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.dns%20%3E%20(model)%20dns%20%3E%20(schema)>)

#### IntelDomains

##### [Get Domain Details](https://developers.cloudflare.com/api/resources/intel/subresources/domains/methods/get)

GET/accounts/{account\_id}/intel/domain

##### ModelsExpand Collapse

<details>

<summary>

Domain object {additional\_information, application, content\_categories, 8 more }

</summary>

<details>

<summary>

additional\_information: optional object {suspected\_malware\_family }

Additional information related to the host name.

</summary>

suspected\_malware\_family: optional string

Suspected DGA malware family.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

application: optional object {id, name }

Application that the hostname belongs to.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inherited\_from: optional string

Domain from which <code>inherited_content_categories</code> and <code>inherited_risk_types</code> are inherited, if applicable.

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

popularity\_rank: optional number

Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000.

<a href="#">Link to this property</a>

<details>

<summary>

resolves\_to\_refs: optional array of object {id, value }

Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to.

</summary>

id: optional string

STIX 2.1 identifier: <a href="https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#_64yvzeku5a5c">https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#\_64yvzeku5a5c</a>.

<a href="#">Link to this property</a>

value: optional string

IP address or domain name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

risk\_score: optional number

Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domains%20%3E%20(model)%20domain%20%3E%20(schema)>)

#### IntelDomainsBulks

##### [Get Multiple Domain Details](https://developers.cloudflare.com/api/resources/intel/subresources/domains/subresources/bulks/methods/get)

GET/accounts/{account\_id}/intel/domain/bulk

##### ModelsExpand Collapse

<details>

<summary>

BulkGetResponse = array of object {additional\_information, application, content\_categories, 7 more }

</summary>

<details>

<summary>

additional\_information: optional object {suspected\_malware\_family }

Additional information related to the host name.

</summary>

suspected\_malware\_family: optional string

Suspected DGA malware family.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

application: optional object {id, name }

Application that the hostname belongs to.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inherited\_from: optional string

Domain from which <code>inherited_content_categories</code> and <code>inherited_risk_types</code> are inherited, if applicable.

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

popularity\_rank: optional number

Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000.

<a href="#">Link to this property</a>

risk\_score: optional number

Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domains.bulks%20%3E%20(model)%20bulk_get_response%20%3E%20(schema)>)

#### IntelDomain History

##### [Get Domain History](https://developers.cloudflare.com/api/resources/intel/subresources/domain_history/methods/get)

GET/accounts/{account\_id}/intel/domain-history

##### ModelsExpand Collapse

<details>

<summary>

DomainHistory object {categorizations, domain }

</summary>

<details>

<summary>

categorizations: optional array of object {categories, end, start }

</summary>

<details>

<summary>

categories: optional array of object {id, name }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end: optional string

formatdate

<a href="#">Link to this property</a>

start: optional string

formatdate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domain_history%20%3E%20(model)%20domain_history%20%3E%20(schema)>)

<details>

<summary>

DomainHistoryGetResponse = array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.domain_history%20%3E%20(model)%20domain_history%20%3E%20(schema)">DomainHistory</a> { categorizations, domain }

</summary>

<details>

<summary>

categorizations: optional array of object {categories, end, start }

</summary>

<details>

<summary>

categories: optional array of object {id, name }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end: optional string

formatdate

<a href="#">Link to this property</a>

start: optional string

formatdate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domain_history%20%3E%20(model)%20domain_history_get_response%20%3E%20(schema)>)

#### IntelIPs

##### [Get IP Overview](https://developers.cloudflare.com/api/resources/intel/subresources/ips/methods/get)

GET/accounts/{account\_id}/intel/ip

##### ModelsExpand Collapse

<details>

<summary>

IP object {belongs\_to\_ref, ip, risk\_types }

</summary>

<details>

<summary>

belongs\_to\_ref: optional object {id, country, description, 2 more }

Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

</summary>

id: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "hosting\_provider"or "isp"or "organization"

Infrastructure type of this ASN.

</summary>

One of the following:

"hosting\_provider"

<a href="#">Link to this property</a>

"isp"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

formatipv4

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.ips%20%3E%20(model)%20ip%20%3E%20(schema)>)

<details>

<summary>

IPGetResponse = array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.ips%20%3E%20(model)%20ip%20%3E%20(schema)">IP</a> { belongs\_to\_ref, ip, risk\_types }

</summary>

<details>

<summary>

belongs\_to\_ref: optional object {id, country, description, 2 more }

Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

</summary>

id: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "hosting\_provider"or "isp"or "organization"

Infrastructure type of this ASN.

</summary>

One of the following:

"hosting\_provider"

<a href="#">Link to this property</a>

"isp"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

formatipv4

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.ips%20%3E%20(model)%20ip_get_response%20%3E%20(schema)>)

#### IntelIP Lists

##### ModelsExpand Collapse

<details>

<summary>

IPList object {id, description, name }

</summary>

id: optional number

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.ip_lists%20%3E%20(model)%20ip_list%20%3E%20(schema)>)

#### IntelMiscategorizations

##### [Create Miscategorization](https://developers.cloudflare.com/api/resources/intel/subresources/miscategorizations/methods/create)

POST/accounts/{account\_id}/intel/miscategorization

##### ModelsExpand Collapse

<details>

<summary>

MiscategorizationCreateResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.miscategorizations%20%3E%20(model)%20miscategorization_create_response%20%3E%20(schema)>)

#### IntelWhois

##### [Get WHOIS Record](https://developers.cloudflare.com/api/resources/intel/subresources/whois/methods/get)

GET/accounts/{account\_id}/intel/whois

##### ModelsExpand Collapse

<details>

<summary>

Whois object {created\_date, domain, nameservers, 6 more }

</summary>

created\_date: optional string

formatdate

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

nameservers: optional array of string

<a href="#">Link to this property</a>

registrant: optional string

<a href="#">Link to this property</a>

registrant\_country: optional string

<a href="#">Link to this property</a>

registrant\_email: optional string

<a href="#">Link to this property</a>

registrant\_org: optional string

<a href="#">Link to this property</a>

registrar: optional string

<a href="#">Link to this property</a>

updated\_date: optional string

formatdate

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.whois%20%3E%20(model)%20whois%20%3E%20(schema)>)

<details>

<summary>

WhoisGetResponse object {dnssec, domain, extension, 84 more }

</summary>

dnssec: boolean

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

extension: string

<a href="#">Link to this property</a>

found: boolean

<a href="#">Link to this property</a>

nameservers: array of string

<a href="#">Link to this property</a>

punycode: string

<a href="#">Link to this property</a>

registrant: string

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

administrative\_city: optional string

<a href="#">Link to this property</a>

administrative\_country: optional string

<a href="#">Link to this property</a>

administrative\_email: optional string

<a href="#">Link to this property</a>

administrative\_fax: optional string

<a href="#">Link to this property</a>

administrative\_fax\_ext: optional string

<a href="#">Link to this property</a>

administrative\_id: optional string

<a href="#">Link to this property</a>

administrative\_name: optional string

<a href="#">Link to this property</a>

administrative\_org: optional string

<a href="#">Link to this property</a>

administrative\_phone: optional string

<a href="#">Link to this property</a>

administrative\_phone\_ext: optional string

<a href="#">Link to this property</a>

administrative\_postal\_code: optional string

<a href="#">Link to this property</a>

administrative\_province: optional string

<a href="#">Link to this property</a>

administrative\_referral\_url: optional string

<a href="#">Link to this property</a>

administrative\_street: optional string

<a href="#">Link to this property</a>

billing\_city: optional string

<a href="#">Link to this property</a>

billing\_country: optional string

<a href="#">Link to this property</a>

billing\_email: optional string

<a href="#">Link to this property</a>

billing\_fax: optional string

<a href="#">Link to this property</a>

billing\_fax\_ext: optional string

<a href="#">Link to this property</a>

billing\_id: optional string

<a href="#">Link to this property</a>

billing\_name: optional string

<a href="#">Link to this property</a>

billing\_org: optional string

<a href="#">Link to this property</a>

billing\_phone: optional string

<a href="#">Link to this property</a>

billing\_phone\_ext: optional string

<a href="#">Link to this property</a>

billing\_postal\_code: optional string

<a href="#">Link to this property</a>

billing\_province: optional string

<a href="#">Link to this property</a>

billing\_referral\_url: optional string

<a href="#">Link to this property</a>

billing\_street: optional string

<a href="#">Link to this property</a>

created\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_date\_raw: optional string

<a href="#">Link to this property</a>

expiration\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

expiration\_date\_raw: optional string

<a href="#">Link to this property</a>

registrant\_city: optional string

<a href="#">Link to this property</a>

registrant\_country: optional string

<a href="#">Link to this property</a>

registrant\_email: optional string

<a href="#">Link to this property</a>

registrant\_fax: optional string

<a href="#">Link to this property</a>

registrant\_fax\_ext: optional string

<a href="#">Link to this property</a>

registrant\_id: optional string

<a href="#">Link to this property</a>

registrant\_name: optional string

<a href="#">Link to this property</a>

registrant\_org: optional string

<a href="#">Link to this property</a>

registrant\_phone: optional string

<a href="#">Link to this property</a>

registrant\_phone\_ext: optional string

<a href="#">Link to this property</a>

registrant\_postal\_code: optional string

<a href="#">Link to this property</a>

registrant\_province: optional string

<a href="#">Link to this property</a>

registrant\_referral\_url: optional string

<a href="#">Link to this property</a>

registrant\_street: optional string

<a href="#">Link to this property</a>

registrar\_city: optional string

<a href="#">Link to this property</a>

registrar\_country: optional string

<a href="#">Link to this property</a>

registrar\_email: optional string

<a href="#">Link to this property</a>

registrar\_fax: optional string

<a href="#">Link to this property</a>

registrar\_fax\_ext: optional string

<a href="#">Link to this property</a>

registrar\_id: optional string

<a href="#">Link to this property</a>

registrar\_name: optional string

<a href="#">Link to this property</a>

registrar\_org: optional string

<a href="#">Link to this property</a>

registrar\_phone: optional string

<a href="#">Link to this property</a>

registrar\_phone\_ext: optional string

<a href="#">Link to this property</a>

registrar\_postal\_code: optional string

<a href="#">Link to this property</a>

registrar\_province: optional string

<a href="#">Link to this property</a>

registrar\_referral\_url: optional string

<a href="#">Link to this property</a>

registrar\_street: optional string

<a href="#">Link to this property</a>

status: optional array of string

<a href="#">Link to this property</a>

technical\_city: optional string

<a href="#">Link to this property</a>

technical\_country: optional string

<a href="#">Link to this property</a>

technical\_email: optional string

<a href="#">Link to this property</a>

technical\_fax: optional string

<a href="#">Link to this property</a>

technical\_fax\_ext: optional string

<a href="#">Link to this property</a>

technical\_id: optional string

<a href="#">Link to this property</a>

technical\_name: optional string

<a href="#">Link to this property</a>

technical\_org: optional string

<a href="#">Link to this property</a>

technical\_phone: optional string

<a href="#">Link to this property</a>

technical\_phone\_ext: optional string

<a href="#">Link to this property</a>

technical\_postal\_code: optional string

<a href="#">Link to this property</a>

technical\_province: optional string

<a href="#">Link to this property</a>

technical\_referral\_url: optional string

<a href="#">Link to this property</a>

technical\_street: optional string

<a href="#">Link to this property</a>

updated\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

updated\_date\_raw: optional string

<a href="#">Link to this property</a>

whois\_server: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.whois%20%3E%20(model)%20whois_get_response%20%3E%20(schema)>)

#### IntelURLs

##### [Get URL Intelligence](https://developers.cloudflare.com/api/resources/intel/subresources/urls/methods/get)

GET/accounts/{account\_id}/intel/url

##### ModelsExpand Collapse

<details>

<summary>

URL object {content\_categories, full\_url, hostname, 2 more }

</summary>

<details>

<summary>

content\_categories: array of object {id, name, source\_id, super\_category\_id }

Content categories associated with this URL.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

source\_id: optional number

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

full\_url: string

The full URL that was looked up.

<a href="#">Link to this property</a>

hostname: string

The hostname of the URL.

<a href="#">Link to this property</a>

<details>

<summary>

risk\_type: array of object {id, name, source\_id, super\_category\_id }

Security risk types associated with this URL.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

source\_id: optional number

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url\_path: string

The path component of the URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.urls%20%3E%20(model)%20url%20%3E%20(schema)>)

#### IntelIndicator Feeds

##### [Get indicator feeds owned by this account](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/list)

GET/accounts/{account\_id}/intel/indicator-feeds

##### [Get indicator feed metadata](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/get)

GET/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}

##### [Create new indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/create)

POST/accounts/{account\_id}/intel/indicator-feeds

##### [Update indicator feed metadata](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/update)

PUT/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}

##### [Get indicator feed data](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/methods/data)

GET/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}/data

##### ModelsExpand Collapse

<details>

<summary>

IndicatorFeedListResponse object {id, created\_on, description, 5 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the data entry was created

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the data entry was last modified

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_list_response%20%3E%20(schema)>)

<details>

<summary>

IndicatorFeedGetResponse object {id, created\_on, description, 10 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the data entry was created

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

<details>

<summary>

last\_upload\_summary: optional object {persisted, skipped, uploaded }

Summary of indicator counts from the last successful upload to this feed. Populated by the custom-threat-feeds loader at the end of each successful load. Absent (omitted) when no upload has completed successfully or the upload errored before the summary write. Surfaces silent-failure paths so operators can see when their indicators were dropped (popularity allowlist, expired valid\_until, etc.) without reading loader logs.

</summary>

<details>

<summary>

persisted: optional object {domains\_added, domains\_removed, ips\_added, 3 more }

Net delta applied to feed indicators by this upload. Snapshot uploads emit both \*\_added and \*\_removed; delta-add emits only \*\_added; delta-remove emits only \*\_removed.

</summary>

domains\_added: optional number

<a href="#">Link to this property</a>

domains\_removed: optional number

<a href="#">Link to this property</a>

ips\_added: optional number

<a href="#">Link to this property</a>

ips\_removed: optional number

<a href="#">Link to this property</a>

urls\_added: optional number

<a href="#">Link to this property</a>

urls\_removed: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

skipped: optional object {allowlisted\_domains, expired\_indicators, invalid\_indicators }

Counts of indicators that were uploaded but did not reach QuickSilver, broken down by reason.

</summary>

allowlisted\_domains: optional number

Domains filtered by the global popularity allowlist at QS provisioning time. Popular domains (bing.com, naver.com, etc.) are protected from custom-threat-feed enforcement.

<a href="#">Link to this property</a>

expired\_indicators: optional number

Indicators in the upload whose valid\_until is already in the past. These are not added to QS; the expiration cron handles cleanup.

<a href="#">Link to this property</a>

invalid\_indicators: optional number

Reserved for future use. Currently always 0 — the unifier aborts the entire upload on a single bad indicator.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {domains, ips, urls }

Indicator counts from the unified file the loader received

</summary>

domains: optional number

Number of domain indicators in the upload

<a href="#">Link to this property</a>

ips: optional number

Number of IP indicators in the upload

<a href="#">Link to this property</a>

urls: optional number

Number of URL indicators in the upload

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

latest\_upload\_error: optional string

Human-readable error message describing why the latest upload failed. Populated only when <code>latest_upload_status</code> is <code>Error</code>. Returns one of a small fixed set of category-level messages (invalid domain / IP / URL entries, malformed row or header, invalid valid\_until timestamp, etc.) or the generic <code>Upload failed</code> for unknown or infrastructure-level errors. Never echoes raw error text from the underlying loader. Intel accounts receive the verbatim loader/API error text (including specific offending values) instead of these category-level messages.

<a href="#">Link to this property</a>

<details>

<summary>

latest\_upload\_status: optional "Mirroring"or "Unifying"or "Loading"or 3 more

Status of the latest snapshot uploaded

</summary>

One of the following:

"Mirroring"

<a href="#">Link to this property</a>

"Unifying"

<a href="#">Link to this property</a>

"Loading"

<a href="#">Link to this property</a>

"Provisioning"

<a href="#">Link to this property</a>

"Complete"

<a href="#">Link to this property</a>

"Error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the data entry was last modified

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

provider\_id: optional number

The unique identifier for the provider

<a href="#">Link to this property</a>

provider\_name: optional string

The provider of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_get_response%20%3E%20(schema)>)

<details>

<summary>

IndicatorFeedCreateResponse object {id, created\_on, description, 5 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the data entry was created

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the data entry was last modified

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_create_response%20%3E%20(schema)>)

<details>

<summary>

IndicatorFeedUpdateResponse object {id, created\_on, description, 5 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the data entry was created

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the data entry was last modified

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_update_response%20%3E%20(schema)>)

IndicatorFeedDataResponse = string

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(model)%20indicator_feed_data_response%20%3E%20(schema)>)

#### IntelIndicator FeedsSnapshots

##### [Update indicator feed data](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/snapshots/methods/update)

PUT/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}/snapshot

##### ModelsExpand Collapse

<details>

<summary>

SnapshotUpdateResponse object {file\_id, filename, poll\_url, 2 more }

</summary>

file\_id: optional number

Feed id

<a href="#">Link to this property</a>

filename: optional string

Name of the file unified in our system

<a href="#">Link to this property</a>

poll\_url: optional string

Account-relative polling path. Prepend <code>/accounts/{account_id}</code> using the same account identifier and API host as the upload request. The path omits the account segment because the service does not have your account identifier in this context.

<a href="#">Link to this property</a>

status: optional string

Current status of the upload at the moment the request returned. This is NOT a terminal state: the file is unified inline, but the durable loader has only accepted it, so the upload is still <code>Unifying</code>. Poll <code>poll_url</code> until the status reaches a terminal value (<code>Unified</code> or <code>Error</code>).

<a href="#">Link to this property</a>

upload\_id: optional number

Identifier of the upload row, for polling this upload to a terminal state via <code>poll_url</code>.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.snapshots%20%3E%20(model)%20snapshot_update_response%20%3E%20(schema)>)

#### IntelIndicator FeedsPermissions

##### [List indicator feed permissions](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/list)

GET/accounts/{account\_id}/intel/indicator-feeds/permissions/view

##### [Grant permission to indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/create)

PUT/accounts/{account\_id}/intel/indicator-feeds/permissions/add

##### [Revoke permission to indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/delete)

PUT/accounts/{account\_id}/intel/indicator-feeds/permissions/remove

##### ModelsExpand Collapse

<details>

<summary>

PermissionListResponse = array of object {id, description, is\_attributable, 3 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_list_response%20%3E%20(schema)>)

<details>

<summary>

PermissionCreateResponse object {success }

</summary>

success: optional boolean

Whether the update succeeded or not

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_create_response%20%3E%20(schema)>)

<details>

<summary>

PermissionDeleteResponse object {success }

</summary>

success: optional boolean

Whether the update succeeded or not

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_delete_response%20%3E%20(schema)>)

#### IntelIndicator FeedsDownloads

#### IntelSinkholes

##### [List sinkholes owned by this account](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/list)

GET/accounts/{account\_id}/intel/sinkholes

##### [Get a sinkhole](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/get)

GET/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

##### [Create a new sinkhole for your account](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/create)

POST/accounts/{account\_id}/intel/sinkholes

##### [Update a sinkhole](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/update)

PUT/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

##### [Delete a sinkhole](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/delete)

DELETE/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

##### ModelsExpand Collapse

<details>

<summary>

Sinkhole object {id, account\_tag, created\_on, 4 more }

</summary>

id: optional string

The unique identifier for the sinkhole.

<a href="#">Link to this property</a>

account\_tag: optional string

The account tag that owns this sinkhole.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the sinkhole was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the sinkhole was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the sinkhole.

<a href="#">Link to this property</a>

r2\_bucket: optional string

The name of the R2 bucket to store results.

<a href="#">Link to this property</a>

r2\_id: optional string

The id of the R2 instance.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes%20%3E%20(model)%20sinkhole%20%3E%20(schema)>)

SinkholeUpdateResponse = unknown

[Link to this property](#)%20intel.sinkholes%20%3E%20(model)%20sinkhole_update_response%20%3E%20(schema)>)

SinkholeDeleteResponse = unknown

[Link to this property](#)%20intel.sinkholes%20%3E%20(model)%20sinkhole_delete_response%20%3E%20(schema)>)

#### IntelSinkholesIngresses

##### [Create an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/create)

POST/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses

##### [Get an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/get)

GET/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

##### [Update an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/update)

PUT/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

##### [Delete an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/delete)

DELETE/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

##### ModelsExpand Collapse

<details>

<summary>

IngressCreateResponse object {id, cidr, created\_on, 3 more }

</summary>

id: optional string

The unique identifier for the ingress rule.

<a href="#">Link to this property</a>

cidr: optional string

The CIDR block for the ingress rule.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the ingress rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the ingress rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

sinkhole\_id: optional string

The sinkhole this ingress rule belongs to.

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone tag associated with this ingress rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_create_response%20%3E%20(schema)>)

<details>

<summary>

IngressGetResponse object {id, cidr, created\_on, 3 more }

</summary>

id: optional string

The unique identifier for the ingress rule.

<a href="#">Link to this property</a>

cidr: optional string

The CIDR block for the ingress rule.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the ingress rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the ingress rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

sinkhole\_id: optional string

The sinkhole this ingress rule belongs to.

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone tag associated with this ingress rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_get_response%20%3E%20(schema)>)

IngressUpdateResponse = unknown

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_update_response%20%3E%20(schema)>)

IngressDeleteResponse = unknown

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_delete_response%20%3E%20(schema)>)

#### IntelAttack Surface Report

#### IntelAttack Surface ReportIssue Types

##### [Retrieves Security Center Issues Types](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issue_types/methods/get)

GET/accounts/{account\_id}/intel/attack-surface-report/issue-types

##### ModelsExpand Collapse

IssueTypeGetResponse = string

[Link to this property](#)%20intel.attack_surface_report.issue_types%20%3E%20(model)%20issue_type_get_response%20%3E%20(schema)>)

#### IntelAttack Surface ReportIssues

##### [Retrieves Security Center Issues](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/list)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues

##### [Retrieves Security Center Issue Counts by Class](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/class)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/class

##### [Retrieves Security Center Issue Counts by Severity](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/severity)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/severity

##### [Retrieves Security Center Issue Counts by Type](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/type)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/type

##### ModelsExpand Collapse

<details>

<summary>

IssueType = "compliance\_violation"or "email\_security"or "exposed\_infrastructure"or 3 more

</summary>

One of the following:

"compliance\_violation"

<a href="#">Link to this property</a>

"email\_security"

<a href="#">Link to this property</a>

"exposed\_infrastructure"

<a href="#">Link to this property</a>

"insecure\_configuration"

<a href="#">Link to this property</a>

"weak\_authentication"

<a href="#">Link to this property</a>

"configuration\_suggestion"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)>)

<details>

<summary>

SeverityQueryParam = "low"or "moderate"or "critical"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"moderate"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20severity_query_param%20%3E%20(schema)>)

<details>

<summary>

IssueListResponse object {count, issues, page, per\_page }

</summary>

count: optional number

Indicates the total number of results.

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional array of object {id, dismissed, has\_extended\_context, 11 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

dismissed: optional boolean

<a href="#">Link to this property</a>

has\_extended\_context: optional boolean

Indicates whether the insight has a large payload that requires fetching via the context endpoint.

<a href="#">Link to this property</a>

issue\_class: optional string

<a href="#">Link to this property</a>

issue\_type: optional <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)">IssueType</a>

<a href="#">Link to this property</a>

<details>

<summary>

payload: optional object {detection\_method, zone\_tag }

</summary>

detection\_method: optional string

Describes the method used to detect insight.

<a href="#">Link to this property</a>

zone\_tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resolve\_link: optional string

<a href="#">Link to this property</a>

resolve\_text: optional string

<a href="#">Link to this property</a>

<details>

<summary>

severity: optional "Low"or "Moderate"or "Critical"

</summary>

One of the following:

"Low"

<a href="#">Link to this property</a>

"Moderate"

<a href="#">Link to this property</a>

"Critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "resolved"

The current status of the insight.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"resolved"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subject: optional string

<a href="#">Link to this property</a>

timestamp: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

user\_classification: optional "false\_positive"or "accept\_risk"or "other"

User-defined classification for the insight. Can be ‘false\_positive’, ‘accept\_risk’, ‘other’, or null.

</summary>

One of the following:

"false\_positive"

<a href="#">Link to this property</a>

"accept\_risk"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

page: optional number

Specifies the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Sets the number of results per page of results.

maximum1000

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_list_response%20%3E%20(schema)>)

<details>

<summary>

IssueClassResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_class_response%20%3E%20(schema)>)

<details>

<summary>

IssueSeverityResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_severity_response%20%3E%20(schema)>)

<details>

<summary>

IssueTypeResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type_response%20%3E%20(schema)>)