---
title: Connectivity
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Connectivity

#### ConnectivityDirectory

#### ConnectivityDirectoryServices

##### [List Workers VPC connectivity services](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/methods/list)

GET/accounts/{account\_id}/connectivity/directory/services

##### [Create Workers VPC connectivity service](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/methods/create)

POST/accounts/{account\_id}/connectivity/directory/services

##### [Get Workers VPC connectivity service](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/methods/get)

GET/accounts/{account\_id}/connectivity/directory/services/{service\_id}

##### [Update Workers VPC connectivity service](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/methods/update)

PUT/accounts/{account\_id}/connectivity/directory/services/{service\_id}

##### [Delete Workers VPC connectivity service](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/methods/delete)

DELETE/accounts/{account\_id}/connectivity/directory/services/{service\_id}

##### ModelsExpand Collapse

<details>

<summary>

ServiceListResponse = object {host, name, type, 6 more } or object {host, name, type, 6 more }

</summary>

One of the following:

<details>

<summary>

InfraHTTPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

https\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraTCPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

app\_protocol: optional "postgresql"or "mysql"

</summary>

One of the following:

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

tcp\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20connectivity.directory.services%20%3E%20(model)%20service_list_response%20%3E%20(schema)>)

<details>

<summary>

ServiceCreateResponse = object {host, name, type, 6 more } or object {host, name, type, 6 more }

</summary>

One of the following:

<details>

<summary>

InfraHTTPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

https\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraTCPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

app\_protocol: optional "postgresql"or "mysql"

</summary>

One of the following:

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

tcp\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20connectivity.directory.services%20%3E%20(model)%20service_create_response%20%3E%20(schema)>)

<details>

<summary>

ServiceGetResponse = object {host, name, type, 6 more } or object {host, name, type, 6 more }

</summary>

One of the following:

<details>

<summary>

InfraHTTPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

https\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraTCPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

app\_protocol: optional "postgresql"or "mysql"

</summary>

One of the following:

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

tcp\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20connectivity.directory.services%20%3E%20(model)%20service_get_response%20%3E%20(schema)>)

<details>

<summary>

ServiceUpdateResponse = object {host, name, type, 6 more } or object {host, name, type, 6 more }

</summary>

One of the following:

<details>

<summary>

InfraHTTPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

https\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraTCPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

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

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

app\_protocol: optional "postgresql"or "mysql"

</summary>

One of the following:

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

tcp\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20connectivity.directory.services%20%3E%20(model)%20service_update_response%20%3E%20(schema)>)