---
title: Check Post-Quantum TLS support
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Post Quantum](https://developers.cloudflare.com/api/resources/radar/subresources/post_quantum)

[TLS](https://developers.cloudflare.com/api/resources/radar/subresources/post_quantum/subresources/tls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Check Post-Quantum TLS support

GET/radar/post\_quantum/tls/support

Tests whether a hostname or IP address supports Post-Quantum (PQ) TLS key exchange. Returns information about the negotiated key exchange algorithm, whether it uses PQ cryptography, and any detected TLS implementation bugs (Split ClientHello, HRR failure, etc.).

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

`User Details Write``User Details Read`

##### Q uery ParametersExpand Collapse

host: string

Hostname or IP address to test for Post-Quantum TLS support, optionally with port (defaults to 443).

minLength1

[Link to this property](#)%20radar.post_quantum.tls%20%3E%20(method)%20support%20%3E%20(params)%20default%20%3E%20(param)%20host%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {bugs, host, kex, 2 more }

</summary>

<details>

<summary>

bugs: object {hrrFailure, splitClientHello, unknownKeyshare }

</summary>

hrrFailure: boolean

Server sends a HelloRetryRequest but fails to complete the handshake after the client sends the second ClientHello. Often caused by non-compliant TLS 1.3 implementations on shared hosting providers.

<a href="#">Link to this property</a>

splitClientHello: boolean

Server rejects fragmented ClientHello caused by large PQ keyshare, but accepts classical (non-PQ) handshakes. Typically caused by middleboxes or firewalls that cannot reassemble split TLS ClientHello messages.

<a href="#">Link to this property</a>

unknownKeyshare: boolean

Server cannot handle an unknown key exchange algorithm in the ClientHello keyshare extension. Compliant servers should respond with HelloRetryRequest for a supported algorithm.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

host: string

The host that was tested

<a href="#">Link to this property</a>

kex: number

TLS CurveID of the negotiated key exchange

<a href="#">Link to this property</a>

kexName: string

Human-readable name of the key exchange algorithm

<a href="#">Link to this property</a>

pq: boolean

Whether the negotiated key exchange uses Post-Quantum cryptography (specifically X25519MLKEM768)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.post_quantum.tls%20%3E%20(method)%20support%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.post_quantum.tls%20%3E%20(method)%20support%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Check Post-Quantum TLS support

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/post_quantum/tls/support \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "bugs": {
      "hrrFailure": true,
      "splitClientHello": true,
      "unknownKeyshare": true
    },
    "host": "host",
    "kex": 0,
    "kexName": "kexName",
    "pq": true
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "bugs": {
      "hrrFailure": true,
      "splitClientHello": true,
      "unknownKeyshare": true
    },
    "host": "host",
    "kex": 0,
    "kexName": "kexName",
    "pq": true
  },
  "success": true
}
```