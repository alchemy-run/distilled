/-!
# HTTP

Requests and responses as plain values, and HTTP/1.1 as two pure functions:
one writes a request as bytes, one reads a response from bytes.
-/

namespace Distilled

structure HttpRequest where
  method : String
  path : String
  query : List (String × String) := []
  headers : List (String × String) := []
  body : ByteArray := .empty
deriving DecidableEq

structure HttpResponse where
  status : Nat
  headers : List (String × String) := []
  body : ByteArray := .empty
deriving DecidableEq

/-- The body as text. Empty if it is not text. -/
def HttpResponse.text (r : HttpResponse) : String := (String.fromUTF8? r.body).getD ""

namespace HttpResponse

/-- A header's value, whatever the case of its name. -/
def header (r : HttpResponse) (name : String) : Option String :=
  (r.headers.find? fun (n, _) => n.toLower == name.toLower).map (·.2)

end HttpResponse

def hexDigit (n : Nat) : Char := "0123456789ABCDEF".toList.getD n '0'

/-- Percent-encode everything but unreserved characters, as RFC 3986 says. -/
def percentEncode (s : String) (keepSlash : Bool := false) : String :=
  s.toUTF8.foldl (init := "") fun out byte =>
    let c := Char.ofNat byte.toNat
    if c.isAlphanum || c == '-' || c == '_' || c == '.' || c == '~' || (keepSlash && c == '/') then
      out.push c
    else (out.push '%').push (hexDigit (byte.toNat / 16)) |>.push (hexDigit (byte.toNat % 16))

namespace HttpRequest

def queryString (r : HttpRequest) : String :=
  "&".intercalate (r.query.map fun (k, v) => s!"{percentEncode k}={percentEncode v}")

/-- The path and query as they go on the request line. -/
def target (r : HttpRequest) : String :=
  let path := if r.path.isEmpty then "/" else r.path
  if r.query.isEmpty then path else s!"{path}?{r.queryString}"

def header (r : HttpRequest) (name : String) : Option String :=
  (r.headers.find? fun (n, _) => n.toLower == name.toLower).map (·.2)

/-- Set a header, replacing one of the same name. -/
def withHeader (r : HttpRequest) (name value : String) : HttpRequest :=
  { r with headers := (r.headers.filter fun (n, _) => n.toLower != name.toLower) ++ [(name, value)] }

/-- The request as HTTP/1.1 bytes. The connection is closed after the response. -/
def encode (r : HttpRequest) (host : String) : ByteArray :=
  let r := (r.withHeader "Host" host).withHeader "Connection" "close"
  let r := r.withHeader "Content-Length" (toString r.body.size)
  let head := s!"{r.method} {r.target} HTTP/1.1\r\n"
    ++ String.join (r.headers.map fun (n, v) => s!"{n}: {v}\r\n") ++ "\r\n"
  head.toUTF8 ++ r.body

end HttpRequest

/-- Where the blank line that ends the headers starts. -/
def headerEnd (bytes : ByteArray) : Option Nat := Id.run do
  let mut i := 0
  while i + 3 < bytes.size do
    if bytes[i]! == 13 && bytes[i+1]! == 10 && bytes[i+2]! == 13 && bytes[i+3]! == 10 then
      return some i
    i := i + 1
  return none

def hexValue (c : Char) : Option Nat :=
  if c.isDigit then some (c.toNat - '0'.toNat)
  else if 'a' ≤ c && c ≤ 'f' then some (c.toNat - 'a'.toNat + 10)
  else if 'A' ≤ c && c ≤ 'F' then some (c.toNat - 'A'.toNat + 10)
  else none

def parseHex (s : String) : Option Nat :=
  if s.isEmpty then none
  else s.toList.foldlM (fun n c => (hexValue c).map (n * 16 + ·)) 0

/-- Undo chunked transfer encoding. -/
def dechunk (bytes : ByteArray) : Option ByteArray := Id.run do
  let mut out := ByteArray.empty
  let mut i := 0
  let mut fuel := bytes.size + 1
  while fuel > 0 do
    fuel := fuel - 1
    let mut j := i
    while j + 1 < bytes.size && !(bytes[j]! == 13 && bytes[j+1]! == 10) do
      j := j + 1
    if j + 1 ≥ bytes.size then return none
    let line := String.fromUTF8! (bytes.extract i j)
    let some size := parseHex ((line.splitOn ";").headD "").trimAscii.toString | return none
    if size == 0 then return some out
    let start := j + 2
    if start + size > bytes.size then return none
    out := out ++ bytes.extract start (start + size)
    i := start + size + 2
  return none

/-- Read an HTTP/1.1 response from the bytes a server sent before closing. -/
def HttpResponse.decode (bytes : ByteArray) (bodiless : Bool := false) : Except String HttpResponse := do
  let some split := headerEnd bytes | throw "the response has no end of headers"
  let some head := String.fromUTF8? (bytes.extract 0 split) | throw "the response headers are not text"
  let lines := head.splitOn "\r\n"
  let statusLine := lines.headD ""
  let some status := ((statusLine.splitOn " ").getD 1 "").toNat?
    | throw s!"not an HTTP status line: {statusLine}"
  let headers := lines.tail.filterMap fun line =>
    match line.splitOn ":" with
    | name :: rest => some (name.trimAscii.toString, (":".intercalate rest).trimAscii.toString)
    | [] => none
  let raw := bytes.extract (split + 4) bytes.size
  let chunked := headers.any fun (n, v) => n.toLower == "transfer-encoding" && v.toLower == "chunked"
  let payload ← if bodiless || status == 204 || status == 304 then pure ByteArray.empty
    else if chunked then
      match dechunk raw with
      | some body => pure body
      | none => throw "the chunked body is cut short"
    else
      match (headers.find? fun (n, _) => n.toLower == "content-length").bind (·.2.toNat?) with
      | some length =>
        if raw.size < length then throw "the body is shorter than its Content-Length"
        else pure (raw.extract 0 length)
      | none => pure raw
  return { status, headers, body := payload }

end Distilled
