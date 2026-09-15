---
title: Create Cloud Integration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Cloud Networking](https://developers.cloudflare.com/api/resources/magic_cloud_networking)

[Cloud Integrations](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/cloud_integrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Cloud Integration

POST/accounts/{account\_id}/magic/cloud/providers

Create a new Cloud Integration (Closed Beta).

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

`Magic WAN Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

forwarded: optional string

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20forwarded%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

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

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cloud_type%20%3E%20(schema)>)

friendly\_name: string

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20friendly_name%20%3E%20(schema)>)

description: optional string

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, cloud\_type, friendly\_name, 11 more }

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

friendly\_name: string

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

<details>

<summary>

lifecycle\_state: "ACTIVE"or "PENDING\_SETUP"or "RETIRED"

</summary>

One of the following:

"ACTIVE"

<a href="#">Link to this property</a>

"PENDING\_SETUP"

<a href="#">Link to this property</a>

"RETIRED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state: "UNSPECIFIED"or "PENDING"or "DISCOVERING"or 2 more

</summary>

One of the following:

"UNSPECIFIED"

<a href="#">Link to this property</a>

"PENDING"

<a href="#">Link to this property</a>

"DISCOVERING"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"SUCCEEDED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state\_v2: "UNSPECIFIED"or "PENDING"or "DISCOVERING"or 2 more

</summary>

One of the following:

"UNSPECIFIED"

<a href="#">Link to this property</a>

"PENDING"

<a href="#">Link to this property</a>

"DISCOVERING"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"SUCCEEDED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

aws\_arn: optional string

<a href="#">Link to this property</a>

azure\_subscription\_id: optional string

<a href="#">Link to this property</a>

azure\_tenant\_id: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

gcp\_project\_id: optional string

<a href="#">Link to this property</a>

gcp\_service\_account\_email: optional string

<a href="#">Link to this property</a>

<details>

<summary>

status: optional object {discovery\_progress, discovery\_progress\_v2, last\_discovery\_status, 13 more }

</summary>

<details>

<summary>

discovery\_progress: object {done, total, unit }

</summary>

done: number

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

unit: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

discovery\_progress\_v2: object {done, total, unit }

</summary>

done: number

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

unit: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_discovery\_status: "UNSPECIFIED"or "PENDING"or "DISCOVERING"or 2 more

</summary>

One of the following:

"UNSPECIFIED"

<a href="#">Link to this property</a>

"PENDING"

<a href="#">Link to this property</a>

"DISCOVERING"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"SUCCEEDED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_discovery\_status\_v2: "UNSPECIFIED"or "PENDING"or "DISCOVERING"or 2 more

</summary>

One of the following:

"UNSPECIFIED"

<a href="#">Link to this property</a>

"PENDING"

<a href="#">Link to this property</a>

"DISCOVERING"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"SUCCEEDED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

regions: array of string

<a href="#">Link to this property</a>

credentials\_good\_since: optional string

<a href="#">Link to this property</a>

credentials\_missing\_since: optional string

<a href="#">Link to this property</a>

credentials\_rejected\_since: optional string

<a href="#">Link to this property</a>

discovery\_message: optional string

<a href="#">Link to this property</a>

discovery\_message\_v2: optional string

<a href="#">Link to this property</a>

<details>

<summary>

in\_use\_by: optional array of object {id, client\_type, name }

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

last\_discovery\_completed\_at: optional string

<a href="#">Link to this property</a>

last\_discovery\_completed\_at\_v2: optional string

<a href="#">Link to this property</a>

last\_discovery\_started\_at: optional string

<a href="#">Link to this property</a>

last\_discovery\_started\_at\_v2: optional string

<a href="#">Link to this property</a>

last\_updated: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20magic_cloud_networking.cloud_integrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Cloud Integration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloud_type": "AWS",
          "friendly_name": "friendly_name"
        }'
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloud_type": "AWS",
    "friendly_name": "friendly_name",
    "last_updated": "last_updated",
    "lifecycle_state": "ACTIVE",
    "state": "UNSPECIFIED",
    "state_v2": "UNSPECIFIED",
    "aws_arn": "aws_arn",
    "azure_subscription_id": "azure_subscription_id",
    "azure_tenant_id": "azure_tenant_id",
    "description": "description",
    "gcp_project_id": "gcp_project_id",
    "gcp_service_account_email": "gcp_service_account_email",
    "status": {
      "discovery_progress": {
        "done": 0,
        "total": 0,
        "unit": "unit"
      },
      "discovery_progress_v2": {
        "done": 0,
        "total": 0,
        "unit": "unit"
      },
      "last_discovery_status": "UNSPECIFIED",
      "last_discovery_status_v2": "UNSPECIFIED",
      "regions": [
        "string"
      ],
      "credentials_good_since": "credentials_good_since",
      "credentials_missing_since": "credentials_missing_since",
      "credentials_rejected_since": "credentials_rejected_since",
      "discovery_message": "discovery_message",
      "discovery_message_v2": "discovery_message_v2",
      "in_use_by": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
          "name": "name"
        }
      ],
      "last_discovery_completed_at": "last_discovery_completed_at",
      "last_discovery_completed_at_v2": "last_discovery_completed_at_v2",
      "last_discovery_started_at": "last_discovery_started_at",
      "last_discovery_started_at_v2": "last_discovery_started_at_v2",
      "last_updated": "last_updated"
    }
  },
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloud_type": "AWS",
    "friendly_name": "friendly_name",
    "last_updated": "last_updated",
    "lifecycle_state": "ACTIVE",
    "state": "UNSPECIFIED",
    "state_v2": "UNSPECIFIED",
    "aws_arn": "aws_arn",
    "azure_subscription_id": "azure_subscription_id",
    "azure_tenant_id": "azure_tenant_id",
    "description": "description",
    "gcp_project_id": "gcp_project_id",
    "gcp_service_account_email": "gcp_service_account_email",
    "status": {
      "discovery_progress": {
        "done": 0,
        "total": 0,
        "unit": "unit"
      },
      "discovery_progress_v2": {
        "done": 0,
        "total": 0,
        "unit": "unit"
      },
      "last_discovery_status": "UNSPECIFIED",
      "last_discovery_status_v2": "UNSPECIFIED",
      "regions": [
        "string"
      ],
      "credentials_good_since": "credentials_good_since",
      "credentials_missing_since": "credentials_missing_since",
      "credentials_rejected_since": "credentials_rejected_since",
      "discovery_message": "discovery_message",
      "discovery_message_v2": "discovery_message_v2",
      "in_use_by": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
          "name": "name"
        }
      ],
      "last_discovery_completed_at": "last_discovery_completed_at",
      "last_discovery_completed_at_v2": "last_discovery_completed_at_v2",
      "last_discovery_started_at": "last_discovery_started_at",
      "last_discovery_started_at_v2": "last_discovery_started_at_v2",
      "last_updated": "last_updated"
    }
  },
  "success": true
}
```