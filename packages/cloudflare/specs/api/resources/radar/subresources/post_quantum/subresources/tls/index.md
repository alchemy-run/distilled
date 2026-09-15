---
title: TLS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Post Quantum](https://developers.cloudflare.com/api/resources/radar/subresources/post_quantum)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# TLS

##### [Check Post-Quantum TLS support](https://developers.cloudflare.com/api/resources/radar/subresources/post_quantum/subresources/tls/methods/support)

GET/radar/post\_quantum/tls/support

##### ModelsExpand Collapse

<details>

<summary>

TLSSupportResponse object {bugs, host, kex, 2 more }

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

[Link to this property](#)%20radar.post_quantum.tls%20%3E%20(model)%20tls_support_response%20%3E%20(schema)>)