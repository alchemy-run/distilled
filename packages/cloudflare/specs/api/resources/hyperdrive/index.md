---
title: Hyperdrive
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Hyperdrive

##### ModelsExpand Collapse

<details>

<summary>

Configuration = object {host, port, database, 3 more } or object {access\_client\_id, access\_client\_secret, host, 4 more } or object {service\_id, database, password, 2 more }

Connect to a database through a Workers VPC Service. TLS settings (mTLS, sslmode) cannot be configured on the Hyperdrive when using a VPC Service origin; TLS must be managed on the VPC Service itself.

</summary>

One of the following:

<details>

<summary>

HyperdriveInternetOrigin object {host, port, database, 3 more }

</summary>

host: string

Defines the host (hostname or IP) of your origin database.

<a href="#">Link to this property</a>

port: number

Defines the port of your origin database. Defaults to 5432 for PostgreSQL or 3306 for MySQL if not specified.

<a href="#">Link to this property</a>

database: optional string

Set the name of your origin database.

<a href="#">Link to this property</a>

password: optional string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: optional "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: optional string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HyperdriveOverAccessOrigin object {access\_client\_id, access\_client\_secret, host, 4 more }

</summary>

access\_client\_id: string

Defines the Client ID of the Access token to use when connecting to the origin database.

<a href="#">Link to this property</a>

access\_client\_secret: string

Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

host: string

Defines the host (hostname or IP) of your origin database.

<a href="#">Link to this property</a>

database: optional string

Set the name of your origin database.

<a href="#">Link to this property</a>

password: optional string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: optional "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: optional string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HyperdriveVPCServiceOrigin object {service\_id, database, password, 2 more }

Connect to a database through a Workers VPC Service. TLS settings (mTLS, sslmode) cannot be configured on the Hyperdrive when using a VPC Service origin; TLS must be managed on the VPC Service itself.

</summary>

service\_id: string

The identifier of the Workers VPC Service to connect through. Hyperdrive will egress through the specified VPC Service to reach the origin database.

<a href="#">Link to this property</a>

database: optional string

Set the name of your origin database.

<a href="#">Link to this property</a>

password: optional string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: optional "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: optional string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hyperdrive%20%3E%20(model)%20configuration%20%3E%20(schema)>)

<details>

<summary>

Hyperdrive object {id, name, origin, 6 more }

</summary>

id: string

Define configurations using a unique string identifier.

maxLength32

<a href="#">Link to this property</a>

name: string

The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.

<a href="#">Link to this property</a>

<details>

<summary>

origin: object {database, host, password, 3 more } or object {access\_client\_id, access\_client\_secret, database, 4 more } or object {database, password, scheme, 2 more }

</summary>

One of the following:

<details>

<summary>

PublicDatabase object {database, host, password, 3 more }

</summary>

database: string

Set the name of your origin database.

<a href="#">Link to this property</a>

host: string

Defines the host (hostname or IP) of your origin database.

<a href="#">Link to this property</a>

password: string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

port: number

Defines the port of your origin database. Defaults to 5432 for PostgreSQL or 3306 for MySQL if not specified.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessProtectedDatabaseBehindCloudflareTunnel object {access\_client\_id, access\_client\_secret, database, 4 more }

</summary>

access\_client\_id: string

Defines the Client ID of the Access token to use when connecting to the origin database.

<a href="#">Link to this property</a>

access\_client\_secret: string

Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

database: string

Set the name of your origin database.

<a href="#">Link to this property</a>

host: string

Defines the host (hostname or IP) of your origin database.

<a href="#">Link to this property</a>

password: string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DatabaseReachableThroughAWorkersVPC object {database, password, scheme, 2 more }

</summary>

database: string

Set the name of your origin database.

<a href="#">Link to this property</a>

password: string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_id: string

The identifier of the Workers VPC Service to connect through. Hyperdrive will egress through the specified VPC Service to reach the origin database.

<a href="#">Link to this property</a>

user: string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

caching: optional object {disabled } or object {disabled, max\_age, stale\_while\_revalidate }

</summary>

One of the following:

<details>

<summary>

HyperdriveHyperdriveCachingCommon object {disabled }

</summary>

disabled: optional boolean

Set to true to disable caching of SQL responses. Default is false.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HyperdriveHyperdriveCachingEnabled object {disabled, max\_age, stale\_while\_revalidate }

</summary>

disabled: optional boolean

Set to true to disable caching of SQL responses. Default is false.

<a href="#">Link to this property</a>

max\_age: optional number

Specify the maximum duration (in seconds) items should persist in the cache. Defaults to 60 seconds if not specified.

<a href="#">Link to this property</a>

stale\_while\_revalidate: optional number

Specify the number of seconds the cache may serve a stale response. Defaults to 15 seconds if not specified.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

Defines the creation time of the Hyperdrive configuration.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Defines the last modified time of the Hyperdrive configuration.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

mtls: optional object {ca\_certificate\_id, mtls\_certificate\_id, sslmode }

mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.

</summary>

ca\_certificate\_id: optional string

Define CA certificate ID obtained after uploading CA cert.

<a href="#">Link to this property</a>

mtls\_certificate\_id: optional string

Define mTLS certificate ID obtained after uploading client cert.

<a href="#">Link to this property</a>

sslmode: optional string

Set SSL mode to ‘require’, ‘verify-ca’, or ‘verify-full’ to verify the CA.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origin\_connection\_limit: optional number

The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.

Maximum allowed: 20 for free tier accounts, 100 for paid tier accounts. If not specified, defaults to 20 for free tier and 60 for paid tier. Certain Cloudflare-managed origins may be permitted a higher limit. Contact Cloudflare if you need a higher limit.

minimum5

<a href="#">Link to this property</a>

restarted\_on: optional string

Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been explicitly restarted.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hyperdrive%20%3E%20(model)%20hyperdrive%20%3E%20(schema)>)

#### HyperdriveConfigs

##### [List Hyperdrives](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/list)

GET/accounts/{account\_id}/hyperdrive/configs

##### [Get Hyperdrive](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/get)

GET/accounts/{account\_id}/hyperdrive/configs/{hyperdrive\_id}

##### [Create Hyperdrive](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/create)

POST/accounts/{account\_id}/hyperdrive/configs

##### [Replace Hyperdrive](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/update)

PUT/accounts/{account\_id}/hyperdrive/configs/{hyperdrive\_id}

##### [Update Hyperdrive](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/edit)

PATCH/accounts/{account\_id}/hyperdrive/configs/{hyperdrive\_id}

##### [Delete Hyperdrive](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/delete)

DELETE/accounts/{account\_id}/hyperdrive/configs/{hyperdrive\_id}

##### ModelsExpand Collapse

ConfigDeleteResponse = unknown

[Link to this property](#)%20hyperdrive.configs%20%3E%20(model)%20config_delete_response%20%3E%20(schema)>)