---
title: List On-ramps
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Cloud Networking](https://developers.cloudflare.com/api/resources/magic_cloud_networking)

[On Ramps](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/on_ramps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List On-ramps

GET/accounts/{account\_id}/magic/cloud/onramps

List On-ramps (Closed Beta).

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

`Magic WAN Write``Magic WAN Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

desc: optional boolean

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20desc%20%3E%20(schema)>)

order\_by: optional string

One of \[“updated\_at”, “id”, “cloud\_type”, “name”].

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

status: optional boolean

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

vpcs: optional boolean

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20vpcs%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, 2 more }

maxLength0

</summary>

<details>

<summary>

code: 1001or 1002or 1003or 152 more

</summary>

One of the following:

1001

<a href="#">Link to this property</a>

1002

<a href="#">Link to this property</a>

1003

<a href="#">Link to this property</a>

1004

<a href="#">Link to this property</a>

1005

<a href="#">Link to this property</a>

1006

<a href="#">Link to this property</a>

1007

<a href="#">Link to this property</a>

1008

<a href="#">Link to this property</a>

1009

<a href="#">Link to this property</a>

1010

<a href="#">Link to this property</a>

1011

<a href="#">Link to this property</a>

1012

<a href="#">Link to this property</a>

1013

<a href="#">Link to this property</a>

1014

<a href="#">Link to this property</a>

1015

<a href="#">Link to this property</a>

1016

<a href="#">Link to this property</a>

1017

<a href="#">Link to this property</a>

1018

<a href="#">Link to this property</a>

2001

<a href="#">Link to this property</a>

2002

<a href="#">Link to this property</a>

2003

<a href="#">Link to this property</a>

2004

<a href="#">Link to this property</a>

2005

<a href="#">Link to this property</a>

2006

<a href="#">Link to this property</a>

2007

<a href="#">Link to this property</a>

2008

<a href="#">Link to this property</a>

2009

<a href="#">Link to this property</a>

2010

<a href="#">Link to this property</a>

2011

<a href="#">Link to this property</a>

2012

<a href="#">Link to this property</a>

2013

<a href="#">Link to this property</a>

2014

<a href="#">Link to this property</a>

2015

<a href="#">Link to this property</a>

2016

<a href="#">Link to this property</a>

2017

<a href="#">Link to this property</a>

2018

<a href="#">Link to this property</a>

2019

<a href="#">Link to this property</a>

2020

<a href="#">Link to this property</a>

2021

<a href="#">Link to this property</a>

2022

<a href="#">Link to this property</a>

3001

<a href="#">Link to this property</a>

3002

<a href="#">Link to this property</a>

3003

<a href="#">Link to this property</a>

3004

<a href="#">Link to this property</a>

3005

<a href="#">Link to this property</a>

3006

<a href="#">Link to this property</a>

3007

<a href="#">Link to this property</a>

4001

<a href="#">Link to this property</a>

4002

<a href="#">Link to this property</a>

4003

<a href="#">Link to this property</a>

4004

<a href="#">Link to this property</a>

4005

<a href="#">Link to this property</a>

4006

<a href="#">Link to this property</a>

4007

<a href="#">Link to this property</a>

4008

<a href="#">Link to this property</a>

4009

<a href="#">Link to this property</a>

4010

<a href="#">Link to this property</a>

4011

<a href="#">Link to this property</a>

4012

<a href="#">Link to this property</a>

4013

<a href="#">Link to this property</a>

4014

<a href="#">Link to this property</a>

4015

<a href="#">Link to this property</a>

4016

<a href="#">Link to this property</a>

4017

<a href="#">Link to this property</a>

4018

<a href="#">Link to this property</a>

4019

<a href="#">Link to this property</a>

4020

<a href="#">Link to this property</a>

4021

<a href="#">Link to this property</a>

4022

<a href="#">Link to this property</a>

4023

<a href="#">Link to this property</a>

5001

<a href="#">Link to this property</a>

5002

<a href="#">Link to this property</a>

5003

<a href="#">Link to this property</a>

5004

<a href="#">Link to this property</a>

102000

<a href="#">Link to this property</a>

102001

<a href="#">Link to this property</a>

102002

<a href="#">Link to this property</a>

102003

<a href="#">Link to this property</a>

102004

<a href="#">Link to this property</a>

102005

<a href="#">Link to this property</a>

102006

<a href="#">Link to this property</a>

102007

<a href="#">Link to this property</a>

102008

<a href="#">Link to this property</a>

102009

<a href="#">Link to this property</a>

102010

<a href="#">Link to this property</a>

102011

<a href="#">Link to this property</a>

102012

<a href="#">Link to this property</a>

102013

<a href="#">Link to this property</a>

102014

<a href="#">Link to this property</a>

102015

<a href="#">Link to this property</a>

102016

<a href="#">Link to this property</a>

102017

<a href="#">Link to this property</a>

102018

<a href="#">Link to this property</a>

102019

<a href="#">Link to this property</a>

102020

<a href="#">Link to this property</a>

102021

<a href="#">Link to this property</a>

102022

<a href="#">Link to this property</a>

102023

<a href="#">Link to this property</a>

102024

<a href="#">Link to this property</a>

102025

<a href="#">Link to this property</a>

102026

<a href="#">Link to this property</a>

102027

<a href="#">Link to this property</a>

102028

<a href="#">Link to this property</a>

102029

<a href="#">Link to this property</a>

102030

<a href="#">Link to this property</a>

102031

<a href="#">Link to this property</a>

102032

<a href="#">Link to this property</a>

102033

<a href="#">Link to this property</a>

102034

<a href="#">Link to this property</a>

102035

<a href="#">Link to this property</a>

102036

<a href="#">Link to this property</a>

102037

<a href="#">Link to this property</a>

102038

<a href="#">Link to this property</a>

102039

<a href="#">Link to this property</a>

102040

<a href="#">Link to this property</a>

102041

<a href="#">Link to this property</a>

102042

<a href="#">Link to this property</a>

102043

<a href="#">Link to this property</a>

102044

<a href="#">Link to this property</a>

102045

<a href="#">Link to this property</a>

102046

<a href="#">Link to this property</a>

102047

<a href="#">Link to this property</a>

102048

<a href="#">Link to this property</a>

102049

<a href="#">Link to this property</a>

102050

<a href="#">Link to this property</a>

102051

<a href="#">Link to this property</a>

102052

<a href="#">Link to this property</a>

102053

<a href="#">Link to this property</a>

102054

<a href="#">Link to this property</a>

102055

<a href="#">Link to this property</a>

102056

<a href="#">Link to this property</a>

102057

<a href="#">Link to this property</a>

102058

<a href="#">Link to this property</a>

102059

<a href="#">Link to this property</a>

102060

<a href="#">Link to this property</a>

102061

<a href="#">Link to this property</a>

102062

<a href="#">Link to this property</a>

102063

<a href="#">Link to this property</a>

102064

<a href="#">Link to this property</a>

102065

<a href="#">Link to this property</a>

102066

<a href="#">Link to this property</a>

102067

<a href="#">Link to this property</a>

102068

<a href="#">Link to this property</a>

102069

<a href="#">Link to this property</a>

102070

<a href="#">Link to this property</a>

102071

<a href="#">Link to this property</a>

102072

<a href="#">Link to this property</a>

103001

<a href="#">Link to this property</a>

103002

<a href="#">Link to this property</a>

103003

<a href="#">Link to this property</a>

103004

<a href="#">Link to this property</a>

103005

<a href="#">Link to this property</a>

103006

<a href="#">Link to this property</a>

103007

<a href="#">Link to this property</a>

103008

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {l10n\_key, loggable\_error, template\_data, trace\_id }

</summary>

l10n\_key: optional string

<a href="#">Link to this property</a>

loggable\_error: optional string

<a href="#">Link to this property</a>

template\_data: optional unknown

<a href="#">Link to this property</a>

trace\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {parameter, parameter\_value\_index, pointer }

</summary>

parameter: optional string

<a href="#">Link to this property</a>

parameter\_value\_index: optional number

<a href="#">Link to this property</a>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, 2 more }

</summary>

<details>

<summary>

code: 1001or 1002or 1003or 152 more

</summary>

One of the following:

1001

<a href="#">Link to this property</a>

1002

<a href="#">Link to this property</a>

1003

<a href="#">Link to this property</a>

1004

<a href="#">Link to this property</a>

1005

<a href="#">Link to this property</a>

1006

<a href="#">Link to this property</a>

1007

<a href="#">Link to this property</a>

1008

<a href="#">Link to this property</a>

1009

<a href="#">Link to this property</a>

1010

<a href="#">Link to this property</a>

1011

<a href="#">Link to this property</a>

1012

<a href="#">Link to this property</a>

1013

<a href="#">Link to this property</a>

1014

<a href="#">Link to this property</a>

1015

<a href="#">Link to this property</a>

1016

<a href="#">Link to this property</a>

1017

<a href="#">Link to this property</a>

1018

<a href="#">Link to this property</a>

2001

<a href="#">Link to this property</a>

2002

<a href="#">Link to this property</a>

2003

<a href="#">Link to this property</a>

2004

<a href="#">Link to this property</a>

2005

<a href="#">Link to this property</a>

2006

<a href="#">Link to this property</a>

2007

<a href="#">Link to this property</a>

2008

<a href="#">Link to this property</a>

2009

<a href="#">Link to this property</a>

2010

<a href="#">Link to this property</a>

2011

<a href="#">Link to this property</a>

2012

<a href="#">Link to this property</a>

2013

<a href="#">Link to this property</a>

2014

<a href="#">Link to this property</a>

2015

<a href="#">Link to this property</a>

2016

<a href="#">Link to this property</a>

2017

<a href="#">Link to this property</a>

2018

<a href="#">Link to this property</a>

2019

<a href="#">Link to this property</a>

2020

<a href="#">Link to this property</a>

2021

<a href="#">Link to this property</a>

2022

<a href="#">Link to this property</a>

3001

<a href="#">Link to this property</a>

3002

<a href="#">Link to this property</a>

3003

<a href="#">Link to this property</a>

3004

<a href="#">Link to this property</a>

3005

<a href="#">Link to this property</a>

3006

<a href="#">Link to this property</a>

3007

<a href="#">Link to this property</a>

4001

<a href="#">Link to this property</a>

4002

<a href="#">Link to this property</a>

4003

<a href="#">Link to this property</a>

4004

<a href="#">Link to this property</a>

4005

<a href="#">Link to this property</a>

4006

<a href="#">Link to this property</a>

4007

<a href="#">Link to this property</a>

4008

<a href="#">Link to this property</a>

4009

<a href="#">Link to this property</a>

4010

<a href="#">Link to this property</a>

4011

<a href="#">Link to this property</a>

4012

<a href="#">Link to this property</a>

4013

<a href="#">Link to this property</a>

4014

<a href="#">Link to this property</a>

4015

<a href="#">Link to this property</a>

4016

<a href="#">Link to this property</a>

4017

<a href="#">Link to this property</a>

4018

<a href="#">Link to this property</a>

4019

<a href="#">Link to this property</a>

4020

<a href="#">Link to this property</a>

4021

<a href="#">Link to this property</a>

4022

<a href="#">Link to this property</a>

4023

<a href="#">Link to this property</a>

5001

<a href="#">Link to this property</a>

5002

<a href="#">Link to this property</a>

5003

<a href="#">Link to this property</a>

5004

<a href="#">Link to this property</a>

102000

<a href="#">Link to this property</a>

102001

<a href="#">Link to this property</a>

102002

<a href="#">Link to this property</a>

102003

<a href="#">Link to this property</a>

102004

<a href="#">Link to this property</a>

102005

<a href="#">Link to this property</a>

102006

<a href="#">Link to this property</a>

102007

<a href="#">Link to this property</a>

102008

<a href="#">Link to this property</a>

102009

<a href="#">Link to this property</a>

102010

<a href="#">Link to this property</a>

102011

<a href="#">Link to this property</a>

102012

<a href="#">Link to this property</a>

102013

<a href="#">Link to this property</a>

102014

<a href="#">Link to this property</a>

102015

<a href="#">Link to this property</a>

102016

<a href="#">Link to this property</a>

102017

<a href="#">Link to this property</a>

102018

<a href="#">Link to this property</a>

102019

<a href="#">Link to this property</a>

102020

<a href="#">Link to this property</a>

102021

<a href="#">Link to this property</a>

102022

<a href="#">Link to this property</a>

102023

<a href="#">Link to this property</a>

102024

<a href="#">Link to this property</a>

102025

<a href="#">Link to this property</a>

102026

<a href="#">Link to this property</a>

102027

<a href="#">Link to this property</a>

102028

<a href="#">Link to this property</a>

102029

<a href="#">Link to this property</a>

102030

<a href="#">Link to this property</a>

102031

<a href="#">Link to this property</a>

102032

<a href="#">Link to this property</a>

102033

<a href="#">Link to this property</a>

102034

<a href="#">Link to this property</a>

102035

<a href="#">Link to this property</a>

102036

<a href="#">Link to this property</a>

102037

<a href="#">Link to this property</a>

102038

<a href="#">Link to this property</a>

102039

<a href="#">Link to this property</a>

102040

<a href="#">Link to this property</a>

102041

<a href="#">Link to this property</a>

102042

<a href="#">Link to this property</a>

102043

<a href="#">Link to this property</a>

102044

<a href="#">Link to this property</a>

102045

<a href="#">Link to this property</a>

102046

<a href="#">Link to this property</a>

102047

<a href="#">Link to this property</a>

102048

<a href="#">Link to this property</a>

102049

<a href="#">Link to this property</a>

102050

<a href="#">Link to this property</a>

102051

<a href="#">Link to this property</a>

102052

<a href="#">Link to this property</a>

102053

<a href="#">Link to this property</a>

102054

<a href="#">Link to this property</a>

102055

<a href="#">Link to this property</a>

102056

<a href="#">Link to this property</a>

102057

<a href="#">Link to this property</a>

102058

<a href="#">Link to this property</a>

102059

<a href="#">Link to this property</a>

102060

<a href="#">Link to this property</a>

102061

<a href="#">Link to this property</a>

102062

<a href="#">Link to this property</a>

102063

<a href="#">Link to this property</a>

102064

<a href="#">Link to this property</a>

102065

<a href="#">Link to this property</a>

102066

<a href="#">Link to this property</a>

102067

<a href="#">Link to this property</a>

102068

<a href="#">Link to this property</a>

102069

<a href="#">Link to this property</a>

102070

<a href="#">Link to this property</a>

102071

<a href="#">Link to this property</a>

102072

<a href="#">Link to this property</a>

103001

<a href="#">Link to this property</a>

103002

<a href="#">Link to this property</a>

103003

<a href="#">Link to this property</a>

103004

<a href="#">Link to this property</a>

103005

<a href="#">Link to this property</a>

103006

<a href="#">Link to this property</a>

103007

<a href="#">Link to this property</a>

103008

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {l10n\_key, loggable\_error, template\_data, trace\_id }

</summary>

l10n\_key: optional string

<a href="#">Link to this property</a>

loggable\_error: optional string

<a href="#">Link to this property</a>

template\_data: optional unknown

<a href="#">Link to this property</a>

trace\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {parameter, parameter\_value\_index, pointer }

</summary>

parameter: optional string

<a href="#">Link to this property</a>

parameter\_value\_index: optional number

<a href="#">Link to this property</a>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, cloud\_type, dynamic\_routing, 26 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dynamic\_routing: boolean

<a href="#">Link to this property</a>

install\_routes\_in\_cloud: boolean

<a href="#">Link to this property</a>

install\_routes\_in\_magic\_wan: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "OnrampTypeSingle"or "OnrampTypeHub"

</summary>

One of the following:

"OnrampTypeSingle"

<a href="#">Link to this property</a>

"OnrampTypeHub"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

attached\_hubs: optional array of string

<a href="#">Link to this property</a>

attached\_vpcs: optional array of string

<a href="#">Link to this property</a>

cloud\_asn: optional number

formatuint32

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

hub: optional string

formatuuid

<a href="#">Link to this property</a>

last\_applied\_at: optional string

<a href="#">Link to this property</a>

last\_exported\_at: optional string

<a href="#">Link to this property</a>

last\_planned\_at: optional string

<a href="#">Link to this property</a>

manage\_hub\_to\_hub\_attachments: optional boolean

<a href="#">Link to this property</a>

manage\_vpc\_to\_hub\_attachments: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

planned\_monthly\_cost\_estimate: optional object {currency, current\_monthly\_cost, diff, proposed\_monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

current\_monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

diff: number

formatdouble

<a href="#">Link to this property</a>

proposed\_monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

planned\_resources: optional array of object {diff, keys\_require\_replace, monthly\_cost\_estimate\_diff, 2 more }

</summary>

<details>

<summary>

diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keys\_require\_replace: array of string

<a href="#">Link to this property</a>

<details>

<summary>

monthly\_cost\_estimate\_diff: object {currency, current\_monthly\_cost, diff, proposed\_monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

current\_monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

diff: number

formatdouble

<a href="#">Link to this property</a>

proposed\_monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

planned\_action: "no\_op"or "create"or "update"or 2 more

</summary>

One of the following:

"no\_op"

<a href="#">Link to this property</a>

"create"

<a href="#">Link to this property</a>

"update"

<a href="#">Link to this property</a>

"replace"

<a href="#">Link to this property</a>

"destroy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

planned\_resources\_unavailable: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

post\_apply\_monthly\_cost\_estimate: optional object {currency, monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

post\_apply\_resources: optional map\[object {id, account\_id, cloud\_type, 18 more } ]

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

config: map\[unknown]

<a href="#">Link to this property</a>

deployment\_provider: string

formatuuid

<a href="#">Link to this property</a>

managed: boolean

<a href="#">Link to this property</a>

<details>

<summary>

monthly\_cost\_estimate: object {currency, monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

native\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

observations: map\[object {first\_observed\_at, last\_observed\_at, provider\_id, resource\_id } ]

</summary>

first\_observed\_at: string

<a href="#">Link to this property</a>

last\_observed\_at: string

<a href="#">Link to this property</a>

provider\_id: string

formatuuid

<a href="#">Link to this property</a>

resource\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

provider\_ids: array of string

<a href="#">Link to this property</a>

provider\_names\_by\_id: map\[string]

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

resource\_group: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sections: array of object {hidden\_items, name, visible\_items, help\_text }

</summary>

<details>

<summary>

hidden\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

visible\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

help\_text: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

state: map\[unknown]

<a href="#">Link to this property</a>

tags: map\[string]

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

<details>

<summary>

managed\_by: optional array of object {id, client\_type, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

client\_type: "MAGIC\_WAN\_CLOUD\_ONRAMP"

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

post\_apply\_resources\_unavailable: optional boolean

<a href="#">Link to this property</a>

region: optional string

<a href="#">Link to this property</a>

<details>

<summary>

status: optional object {apply\_progress, lifecycle\_state, plan\_progress, 3 more }

</summary>

<details>

<summary>

apply\_progress: object {done, total }

</summary>

done: number

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

lifecycle\_state: "OnrampNeedsApply"or "OnrampPendingPlan"or "OnrampPlanning"or 9 more

</summary>

One of the following:

"OnrampNeedsApply"

<a href="#">Link to this property</a>

"OnrampPendingPlan"

<a href="#">Link to this property</a>

"OnrampPlanning"

<a href="#">Link to this property</a>

"OnrampPlanFailed"

<a href="#">Link to this property</a>

"OnrampPendingApproval"

<a href="#">Link to this property</a>

"OnrampPendingApply"

<a href="#">Link to this property</a>

"OnrampApplying"

<a href="#">Link to this property</a>

"OnrampApplyFailed"

<a href="#">Link to this property</a>

"OnrampActive"

<a href="#">Link to this property</a>

"OnrampPendingDestroy"

<a href="#">Link to this property</a>

"OnrampDestroying"

<a href="#">Link to this property</a>

"OnrampDestroyFailed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

plan\_progress: object {done, total }

</summary>

done: number

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

routes: array of string

<a href="#">Link to this property</a>

tunnels: array of string

<a href="#">Link to this property</a>

<details>

<summary>

lifecycle\_errors: optional map\[object {code, message, documentation\_url, 2 more } ]

</summary>

<details>

<summary>

code: 1001or 1002or 1003or 152 more

</summary>

One of the following:

1001

<a href="#">Link to this property</a>

1002

<a href="#">Link to this property</a>

1003

<a href="#">Link to this property</a>

1004

<a href="#">Link to this property</a>

1005

<a href="#">Link to this property</a>

1006

<a href="#">Link to this property</a>

1007

<a href="#">Link to this property</a>

1008

<a href="#">Link to this property</a>

1009

<a href="#">Link to this property</a>

1010

<a href="#">Link to this property</a>

1011

<a href="#">Link to this property</a>

1012

<a href="#">Link to this property</a>

1013

<a href="#">Link to this property</a>

1014

<a href="#">Link to this property</a>

1015

<a href="#">Link to this property</a>

1016

<a href="#">Link to this property</a>

1017

<a href="#">Link to this property</a>

1018

<a href="#">Link to this property</a>

2001

<a href="#">Link to this property</a>

2002

<a href="#">Link to this property</a>

2003

<a href="#">Link to this property</a>

2004

<a href="#">Link to this property</a>

2005

<a href="#">Link to this property</a>

2006

<a href="#">Link to this property</a>

2007

<a href="#">Link to this property</a>

2008

<a href="#">Link to this property</a>

2009

<a href="#">Link to this property</a>

2010

<a href="#">Link to this property</a>

2011

<a href="#">Link to this property</a>

2012

<a href="#">Link to this property</a>

2013

<a href="#">Link to this property</a>

2014

<a href="#">Link to this property</a>

2015

<a href="#">Link to this property</a>

2016

<a href="#">Link to this property</a>

2017

<a href="#">Link to this property</a>

2018

<a href="#">Link to this property</a>

2019

<a href="#">Link to this property</a>

2020

<a href="#">Link to this property</a>

2021

<a href="#">Link to this property</a>

2022

<a href="#">Link to this property</a>

3001

<a href="#">Link to this property</a>

3002

<a href="#">Link to this property</a>

3003

<a href="#">Link to this property</a>

3004

<a href="#">Link to this property</a>

3005

<a href="#">Link to this property</a>

3006

<a href="#">Link to this property</a>

3007

<a href="#">Link to this property</a>

4001

<a href="#">Link to this property</a>

4002

<a href="#">Link to this property</a>

4003

<a href="#">Link to this property</a>

4004

<a href="#">Link to this property</a>

4005

<a href="#">Link to this property</a>

4006

<a href="#">Link to this property</a>

4007

<a href="#">Link to this property</a>

4008

<a href="#">Link to this property</a>

4009

<a href="#">Link to this property</a>

4010

<a href="#">Link to this property</a>

4011

<a href="#">Link to this property</a>

4012

<a href="#">Link to this property</a>

4013

<a href="#">Link to this property</a>

4014

<a href="#">Link to this property</a>

4015

<a href="#">Link to this property</a>

4016

<a href="#">Link to this property</a>

4017

<a href="#">Link to this property</a>

4018

<a href="#">Link to this property</a>

4019

<a href="#">Link to this property</a>

4020

<a href="#">Link to this property</a>

4021

<a href="#">Link to this property</a>

4022

<a href="#">Link to this property</a>

4023

<a href="#">Link to this property</a>

5001

<a href="#">Link to this property</a>

5002

<a href="#">Link to this property</a>

5003

<a href="#">Link to this property</a>

5004

<a href="#">Link to this property</a>

102000

<a href="#">Link to this property</a>

102001

<a href="#">Link to this property</a>

102002

<a href="#">Link to this property</a>

102003

<a href="#">Link to this property</a>

102004

<a href="#">Link to this property</a>

102005

<a href="#">Link to this property</a>

102006

<a href="#">Link to this property</a>

102007

<a href="#">Link to this property</a>

102008

<a href="#">Link to this property</a>

102009

<a href="#">Link to this property</a>

102010

<a href="#">Link to this property</a>

102011

<a href="#">Link to this property</a>

102012

<a href="#">Link to this property</a>

102013

<a href="#">Link to this property</a>

102014

<a href="#">Link to this property</a>

102015

<a href="#">Link to this property</a>

102016

<a href="#">Link to this property</a>

102017

<a href="#">Link to this property</a>

102018

<a href="#">Link to this property</a>

102019

<a href="#">Link to this property</a>

102020

<a href="#">Link to this property</a>

102021

<a href="#">Link to this property</a>

102022

<a href="#">Link to this property</a>

102023

<a href="#">Link to this property</a>

102024

<a href="#">Link to this property</a>

102025

<a href="#">Link to this property</a>

102026

<a href="#">Link to this property</a>

102027

<a href="#">Link to this property</a>

102028

<a href="#">Link to this property</a>

102029

<a href="#">Link to this property</a>

102030

<a href="#">Link to this property</a>

102031

<a href="#">Link to this property</a>

102032

<a href="#">Link to this property</a>

102033

<a href="#">Link to this property</a>

102034

<a href="#">Link to this property</a>

102035

<a href="#">Link to this property</a>

102036

<a href="#">Link to this property</a>

102037

<a href="#">Link to this property</a>

102038

<a href="#">Link to this property</a>

102039

<a href="#">Link to this property</a>

102040

<a href="#">Link to this property</a>

102041

<a href="#">Link to this property</a>

102042

<a href="#">Link to this property</a>

102043

<a href="#">Link to this property</a>

102044

<a href="#">Link to this property</a>

102045

<a href="#">Link to this property</a>

102046

<a href="#">Link to this property</a>

102047

<a href="#">Link to this property</a>

102048

<a href="#">Link to this property</a>

102049

<a href="#">Link to this property</a>

102050

<a href="#">Link to this property</a>

102051

<a href="#">Link to this property</a>

102052

<a href="#">Link to this property</a>

102053

<a href="#">Link to this property</a>

102054

<a href="#">Link to this property</a>

102055

<a href="#">Link to this property</a>

102056

<a href="#">Link to this property</a>

102057

<a href="#">Link to this property</a>

102058

<a href="#">Link to this property</a>

102059

<a href="#">Link to this property</a>

102060

<a href="#">Link to this property</a>

102061

<a href="#">Link to this property</a>

102062

<a href="#">Link to this property</a>

102063

<a href="#">Link to this property</a>

102064

<a href="#">Link to this property</a>

102065

<a href="#">Link to this property</a>

102066

<a href="#">Link to this property</a>

102067

<a href="#">Link to this property</a>

102068

<a href="#">Link to this property</a>

102069

<a href="#">Link to this property</a>

102070

<a href="#">Link to this property</a>

102071

<a href="#">Link to this property</a>

102072

<a href="#">Link to this property</a>

103001

<a href="#">Link to this property</a>

103002

<a href="#">Link to this property</a>

103003

<a href="#">Link to this property</a>

103004

<a href="#">Link to this property</a>

103005

<a href="#">Link to this property</a>

103006

<a href="#">Link to this property</a>

103007

<a href="#">Link to this property</a>

103008

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {l10n\_key, loggable\_error, template\_data, trace\_id }

</summary>

l10n\_key: optional string

<a href="#">Link to this property</a>

loggable\_error: optional string

<a href="#">Link to this property</a>

template\_data: optional unknown

<a href="#">Link to this property</a>

trace\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {parameter, parameter\_value\_index, pointer }

</summary>

parameter: optional string

<a href="#">Link to this property</a>

parameter\_value\_index: optional number

<a href="#">Link to this property</a>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vpc: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

vpcs\_by\_id: optional map\[object {id, account\_id, cloud\_type, 18 more } ]

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

config: map\[unknown]

<a href="#">Link to this property</a>

deployment\_provider: string

formatuuid

<a href="#">Link to this property</a>

managed: boolean

<a href="#">Link to this property</a>

<details>

<summary>

monthly\_cost\_estimate: object {currency, monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

native\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

observations: map\[object {first\_observed\_at, last\_observed\_at, provider\_id, resource\_id } ]

</summary>

first\_observed\_at: string

<a href="#">Link to this property</a>

last\_observed\_at: string

<a href="#">Link to this property</a>

provider\_id: string

formatuuid

<a href="#">Link to this property</a>

resource\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

provider\_ids: array of string

<a href="#">Link to this property</a>

provider\_names\_by\_id: map\[string]

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

resource\_group: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sections: array of object {hidden\_items, name, visible\_items, help\_text }

</summary>

<details>

<summary>

hidden\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

visible\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

help\_text: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

state: map\[unknown]

<a href="#">Link to this property</a>

tags: map\[string]

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

<details>

<summary>

managed\_by: optional array of object {id, client\_type, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

client\_type: "MAGIC\_WAN\_CLOUD\_ONRAMP"

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vpcs\_by\_id\_unavailable: optional array of string

The list of vpc IDs for which resource details failed to generate.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List On-ramps

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "cloud_type": "AWS",
      "dynamic_routing": true,
      "install_routes_in_cloud": true,
      "install_routes_in_magic_wan": true,
      "name": "name",
      "type": "OnrampTypeSingle",
      "updated_at": "updated_at",
      "attached_hubs": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "attached_vpcs": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "cloud_asn": 0,
      "description": "description",
      "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "last_applied_at": "last_applied_at",
      "last_exported_at": "last_exported_at",
      "last_planned_at": "last_planned_at",
      "manage_hub_to_hub_attachments": true,
      "manage_vpc_to_hub_attachments": true,
      "planned_monthly_cost_estimate": {
        "currency": "currency",
        "current_monthly_cost": 0,
        "diff": 0,
        "proposed_monthly_cost": 0
      },
      "planned_resources": [
        {
          "diff": {
            "diff": "diff",
            "left_description": "left_description",
            "left_yaml": "left_yaml",
            "right_description": "right_description",
            "right_yaml": "right_yaml"
          },
          "keys_require_replace": [
            "string"
          ],
          "monthly_cost_estimate_diff": {
            "currency": "currency",
            "current_monthly_cost": 0,
            "diff": 0,
            "proposed_monthly_cost": 0
          },
          "planned_action": "no_op",
          "resource": {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "cloud_type": "AWS",
            "detail": "detail",
            "name": "name",
            "resource_type": "aws_customer_gateway",
            "title": "title"
          }
        }
      ],
      "planned_resources_unavailable": true,
      "post_apply_monthly_cost_estimate": {
        "currency": "currency",
        "monthly_cost": 0
      },
      "post_apply_resources": {
        "foo": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account_id": "account_id",
          "cloud_type": "AWS",
          "config": {
            "foo": "bar"
          },
          "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "managed": true,
          "monthly_cost_estimate": {
            "currency": "currency",
            "monthly_cost": 0
          },
          "name": "name",
          "native_id": "native_id",
          "observations": {
            "foo": {
              "first_observed_at": "first_observed_at",
              "last_observed_at": "last_observed_at",
              "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          },
          "provider_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "provider_names_by_id": {
            "foo": "string"
          },
          "region": "region",
          "resource_group": "resource_group",
          "resource_type": "aws_customer_gateway",
          "sections": [
            {
              "hidden_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "name": "name",
              "visible_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "help_text": "help_text"
            }
          ],
          "state": {
            "foo": "bar"
          },
          "tags": {
            "foo": "string"
          },
          "updated_at": "updated_at",
          "url": "url",
          "managed_by": [
            {
              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
              "name": "name"
            }
          ]
        }
      },
      "post_apply_resources_unavailable": true,
      "region": "region",
      "status": {
        "apply_progress": {
          "done": 0,
          "total": 0
        },
        "lifecycle_state": "OnrampNeedsApply",
        "plan_progress": {
          "done": 0,
          "total": 0
        },
        "routes": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "tunnels": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "lifecycle_errors": {
          "foo": {
            "code": 1001,
            "message": "message",
            "documentation_url": "documentation_url",
            "meta": {
              "l10n_key": "l10n_key",
              "loggable_error": "loggable_error",
              "template_data": {},
              "trace_id": "trace_id"
            },
            "source": {
              "parameter": "parameter",
              "parameter_value_index": 0,
              "pointer": "pointer"
            }
          }
        }
      },
      "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "vpcs_by_id": {
        "foo": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account_id": "account_id",
          "cloud_type": "AWS",
          "config": {
            "foo": "bar"
          },
          "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "managed": true,
          "monthly_cost_estimate": {
            "currency": "currency",
            "monthly_cost": 0
          },
          "name": "name",
          "native_id": "native_id",
          "observations": {
            "foo": {
              "first_observed_at": "first_observed_at",
              "last_observed_at": "last_observed_at",
              "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          },
          "provider_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "provider_names_by_id": {
            "foo": "string"
          },
          "region": "region",
          "resource_group": "resource_group",
          "resource_type": "aws_customer_gateway",
          "sections": [
            {
              "hidden_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "name": "name",
              "visible_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "help_text": "help_text"
            }
          ],
          "state": {
            "foo": "bar"
          },
          "tags": {
            "foo": "string"
          },
          "updated_at": "updated_at",
          "url": "url",
          "managed_by": [
            {
              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
              "name": "name"
            }
          ]
        }
      },
      "vpcs_by_id_unavailable": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ]
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "cloud_type": "AWS",
      "dynamic_routing": true,
      "install_routes_in_cloud": true,
      "install_routes_in_magic_wan": true,
      "name": "name",
      "type": "OnrampTypeSingle",
      "updated_at": "updated_at",
      "attached_hubs": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "attached_vpcs": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "cloud_asn": 0,
      "description": "description",
      "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "last_applied_at": "last_applied_at",
      "last_exported_at": "last_exported_at",
      "last_planned_at": "last_planned_at",
      "manage_hub_to_hub_attachments": true,
      "manage_vpc_to_hub_attachments": true,
      "planned_monthly_cost_estimate": {
        "currency": "currency",
        "current_monthly_cost": 0,
        "diff": 0,
        "proposed_monthly_cost": 0
      },
      "planned_resources": [
        {
          "diff": {
            "diff": "diff",
            "left_description": "left_description",
            "left_yaml": "left_yaml",
            "right_description": "right_description",
            "right_yaml": "right_yaml"
          },
          "keys_require_replace": [
            "string"
          ],
          "monthly_cost_estimate_diff": {
            "currency": "currency",
            "current_monthly_cost": 0,
            "diff": 0,
            "proposed_monthly_cost": 0
          },
          "planned_action": "no_op",
          "resource": {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "cloud_type": "AWS",
            "detail": "detail",
            "name": "name",
            "resource_type": "aws_customer_gateway",
            "title": "title"
          }
        }
      ],
      "planned_resources_unavailable": true,
      "post_apply_monthly_cost_estimate": {
        "currency": "currency",
        "monthly_cost": 0
      },
      "post_apply_resources": {
        "foo": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account_id": "account_id",
          "cloud_type": "AWS",
          "config": {
            "foo": "bar"
          },
          "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "managed": true,
          "monthly_cost_estimate": {
            "currency": "currency",
            "monthly_cost": 0
          },
          "name": "name",
          "native_id": "native_id",
          "observations": {
            "foo": {
              "first_observed_at": "first_observed_at",
              "last_observed_at": "last_observed_at",
              "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          },
          "provider_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "provider_names_by_id": {
            "foo": "string"
          },
          "region": "region",
          "resource_group": "resource_group",
          "resource_type": "aws_customer_gateway",
          "sections": [
            {
              "hidden_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "name": "name",
              "visible_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "help_text": "help_text"
            }
          ],
          "state": {
            "foo": "bar"
          },
          "tags": {
            "foo": "string"
          },
          "updated_at": "updated_at",
          "url": "url",
          "managed_by": [
            {
              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
              "name": "name"
            }
          ]
        }
      },
      "post_apply_resources_unavailable": true,
      "region": "region",
      "status": {
        "apply_progress": {
          "done": 0,
          "total": 0
        },
        "lifecycle_state": "OnrampNeedsApply",
        "plan_progress": {
          "done": 0,
          "total": 0
        },
        "routes": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "tunnels": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "lifecycle_errors": {
          "foo": {
            "code": 1001,
            "message": "message",
            "documentation_url": "documentation_url",
            "meta": {
              "l10n_key": "l10n_key",
              "loggable_error": "loggable_error",
              "template_data": {},
              "trace_id": "trace_id"
            },
            "source": {
              "parameter": "parameter",
              "parameter_value_index": 0,
              "pointer": "pointer"
            }
          }
        }
      },
      "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "vpcs_by_id": {
        "foo": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account_id": "account_id",
          "cloud_type": "AWS",
          "config": {
            "foo": "bar"
          },
          "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "managed": true,
          "monthly_cost_estimate": {
            "currency": "currency",
            "monthly_cost": 0
          },
          "name": "name",
          "native_id": "native_id",
          "observations": {
            "foo": {
              "first_observed_at": "first_observed_at",
              "last_observed_at": "last_observed_at",
              "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          },
          "provider_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "provider_names_by_id": {
            "foo": "string"
          },
          "region": "region",
          "resource_group": "resource_group",
          "resource_type": "aws_customer_gateway",
          "sections": [
            {
              "hidden_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "name": "name",
              "visible_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "help_text": "help_text"
            }
          ],
          "state": {
            "foo": "bar"
          },
          "tags": {
            "foo": "string"
          },
          "updated_at": "updated_at",
          "url": "url",
          "managed_by": [
            {
              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
              "name": "name"
            }
          ]
        }
      },
      "vpcs_by_id_unavailable": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ]
    }
  ],
  "success": true
}
```