import Distilled.Http

/-!
# HTTPS

A request goes out over TLS and its response comes back. TLS and the two hashes
are OpenSSL's, reached through one small C file; everything else is Lean.
-/

namespace Distilled

@[extern "distilled_tls_exchange"]
opaque tlsExchange (host : @& String) (port : UInt16) (request : @& ByteArray) : IO ByteArray

@[extern "distilled_tcp_exchange"]
opaque tcpExchange (host : @& String) (port : UInt16) (request : @& ByteArray) : IO ByteArray

@[extern "distilled_sha256"]
opaque sha256 (data : @& ByteArray) : ByteArray

@[extern "distilled_hmac_sha256"]
opaque hmacSha256 (key : @& ByteArray) (data : @& ByteArray) : ByteArray

def hex (bytes : ByteArray) : String :=
  bytes.foldl (init := "") fun out byte =>
    (out.push (hexDigit (byte.toNat / 16)).toLower).push (hexDigit (byte.toNat % 16)).toLower

/-- A server to talk to. -/
structure Endpoint where
  host : String
  port : UInt16 := 443
  tls : Bool := true
deriving Repr

/-- Send a request and read its response. The server's certificate is checked against its name. -/
def Endpoint.send (endpoint : Endpoint) (request : HttpRequest) : IO HttpResponse := do
  let bytes := request.encode endpoint.host
  let reply ← if endpoint.tls then tlsExchange endpoint.host endpoint.port bytes
    else tcpExchange endpoint.host endpoint.port bytes
  match HttpResponse.decode reply (bodiless := request.method == "HEAD") with
  | .ok response => return response
  | .error why => throw (IO.userError s!"{endpoint.host}: {why}")

end Distilled
