import Distilled.Net

/-!
# AWS Signature Version 4

Signing is a pure function of the request, the credentials and the time.
-/

namespace Distilled.AWS

structure Credentials where
  accessKeyId : String
  secretAccessKey : String
  sessionToken : Option String := none

/-- Where and when a request is signed for. -/
structure Scope where
  region : String
  service : String
  /-- `YYYYMMDD'T'HHMMSS'Z'` -/
  time : String

def Scope.date (s : Scope) : String := (s.time.take 8).toString

def Scope.credential (s : Scope) : String := s!"{s.date}/{s.region}/{s.service}/aws4_request"

/-- The key a day's requests to one service in one region are signed with. -/
def signingKey (secret : String) (s : Scope) : ByteArray :=
  let date := hmacSha256 s!"AWS4{secret}".toUTF8 s.date.toUTF8
  let region := hmacSha256 date s.region.toUTF8
  let service := hmacSha256 region s.service.toUTF8
  hmacSha256 service "aws4_request".toUTF8

def insertSorted (x : String × String) : List (String × String) → List (String × String)
  | [] => [x]
  | y :: rest => if x.1 < y.1 || (x.1 == y.1 && x.2 ≤ y.2) then x :: y :: rest else y :: insertSorted x rest

def sortPairs (pairs : List (String × String)) : List (String × String) :=
  pairs.foldr insertSorted []

/-- The request in the form both sides hash: method, path, query, headers, signed header names, body hash. -/
def canonicalRequest (r : HttpRequest) (encodePath : Bool := true) : String × String :=
  let headers := sortPairs (r.headers.map fun (n, v) => (n.toLower, v.trimAscii.toString))
  let signed := ";".intercalate (headers.map (·.1))
  let query := "&".intercalate
    ((sortPairs (r.query.map fun (k, v) => (percentEncode k, percentEncode v))).map
      fun (k, v) => s!"{k}={v}")
  let path := if r.path.isEmpty then "/"
    else if encodePath then percentEncode r.path (keepSlash := true) else r.path
  ("\n".intercalate [r.method, path, query,
    String.join (headers.map fun (n, v) => s!"{n}:{v}\n"), signed, hex (sha256 r.body)], signed)

def stringToSign (r : HttpRequest) (s : Scope) (encodePath : Bool := true) : String :=
  "\n".intercalate ["AWS4-HMAC-SHA256", s.time, s.credential,
    hex (sha256 (canonicalRequest r encodePath).1.toUTF8)]

def signature (r : HttpRequest) (credentials : Credentials) (s : Scope)
    (encodePath : Bool := true) : String :=
  hex (hmacSha256 (signingKey credentials.secretAccessKey s) (stringToSign r s encodePath).toUTF8)

/--
The request with the headers that prove who sent it. The path is already
percent-encoded; every service but S3 has it encoded once more for signing.
-/
def sign (r : HttpRequest) (host : String) (credentials : Credentials) (s : Scope) : HttpRequest :=
  let encodePath := s.service != "s3"
  let r := (r.withHeader "Host" host).withHeader "X-Amz-Date" s.time
  let r := r.withHeader "X-Amz-Content-Sha256" (hex (sha256 r.body))
  let r := match credentials.sessionToken with
    | some token => r.withHeader "X-Amz-Security-Token" token
    | none => r
  r.withHeader "Authorization"
    s!"AWS4-HMAC-SHA256 Credential={credentials.accessKeyId}/{s.credential}, SignedHeaders={(canonicalRequest r).2}, Signature={signature r credentials s encodePath}"

end Distilled.AWS
