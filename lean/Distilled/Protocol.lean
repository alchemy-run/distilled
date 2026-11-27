import Distilled.Core
import Distilled.Protocol.Codec

/-!
# Protocols

How an operation's input becomes an HTTP request, and how a response becomes
its output or one of its errors, for the five protocols AWS services speak:
`awsJson1_0`, `awsJson1_1`, `restJson1`, `restXml`, `awsQuery` and `ec2Query`.
-/

namespace Distilled
open Lean Codec

inductive Protocol where
  /-- `awsJson1_0` and `awsJson1_1`, which differ only in a version number. -/
  | awsJson (version : String)
  | restJson
  | restXml
  | awsQuery
  | ec2Query
deriving DecidableEq, Repr, Inhabited

/-- What a model says about a service as a whole. -/
structure ServiceInfo where
  /-- The name operations are prefixed with in `X-Amz-Target`. -/
  name : String
  version : String
  protocol : Protocol
  /-- The name requests are signed for. -/
  signingName : String := ""
  xmlNamespace : Option String := none
deriving Repr, Inhabited

/-- An error an operation can return. -/
structure ErrorInfo where
  /-- The shape's name. -/
  name : String
  /-- The code it has on the wire, when that differs. -/
  code : Option String := none
  schema : Schema
deriving Inhabited

/-- What a model says about an operation. -/
structure OpInfo where
  name : String
  method : String := "POST"
  uri : String := "/"
  input : Schema
  output : Schema
  errors : List ErrorInfo := []
deriving Inhabited

namespace Protocol

/-! ## Requests -/

def isBody (info : Info) : Bool := info.location == .body

/-- Fill a path such as `/functions/{FunctionName}/objects/{Key+}` from the labels. -/
def fillPath (template : String) (labels : List (String × String)) : String :=
  "/".intercalate ((template.splitOn "/").map fun segment =>
    if segment.startsWith "{" && segment.endsWith "}" then
      let inner := ((segment.drop 1).dropEnd 1).toString
      let greedy := inner.endsWith "+"
      let name := if greedy then (inner.dropEnd 1).toString else inner
      match labels.find? (·.1 == name) with
      | some (_, value) => percentEncode value (keepSlash := greedy)
      | none => segment
    else segment)

/-- The query parameters a path template carries after its `?`. -/
def staticQuery (template : String) : List (String × String) :=
  match template.splitOn "?" with
  | [_, query] => (query.splitOn "&").filter (· ≠ "") |>.map fun pair =>
    match pair.splitOn "=" with
    | [k, v] => (k, v)
    | _ => (pair, "")
  | _ => []

def texts (schema : Schema) (v : Value) (time : TimeFormat) : List String :=
  match schema, v with
  | .list item _, .list items => items.filterMap (scalarText item · time)
  | schema, v => (scalarText schema v time).toList

/-- The body of a REST request or response: the payload member, or the unbound members together. -/
def restBody (xml : Bool) (namespace_ : Option String) (schema : Schema) (fields : List (String × Value)) :
    ByteArray × Option String :=
  let document (name : String) (schema : Schema) (v : Value) : ByteArray × Option String :=
    if xml then
      let root := match toXml name false schema v with
        | [.element n attrs children] =>
          Xml.element n (attrs ++ (namespace_.map fun ns => ("xmlns", ns)).toList) children
        | _ => .element name [] []
      (root.render.toUTF8, some "application/xml")
    else ((toJson true schema v).compress.toUTF8, some "application/json")
  match schema.members.find? fun (info, _) => info.location == .payload with
  | some (info, member) =>
    match fields.find? (·.1 == info.name) with
    | none => (.empty, none)
    | some (_, .blob bytes) => (bytes, some "application/octet-stream")
    | some (_, .string text) => (text.toUTF8, some "text/plain")
    | some (_, v) => document (info.xmlName.getD (if member.name.isEmpty then info.name else member.name)) member v
  | none =>
    let body := schema.keep isBody
    if body.members.isEmpty then (.empty, none)
    else if !xml && !(body.members.any fun (info, _) => fields.any (·.1 == info.name)) then
      ("{}".toUTF8, some "application/json")
    else document schema.name body (.record fields)

def restRequest (xml : Bool) (service : ServiceInfo) (op : OpInfo) (input : Value) : HttpRequest :=
  let fields := match input with
    | .record fields => fields
    | _ => []
  let bound := op.input.members.filterMap fun (info, member) =>
    (fields.find? (·.1 == info.name)).map fun (_, v) => (info, member, v)
  let labels := bound.filterMap fun (info, member, v) =>
    if info.location == .label then (scalarText member v .dateTime).map (info.name, ·) else none
  let query := bound.flatMap fun (info, member, v) =>
    match info.location, v with
    | .query name, v => (texts member v .dateTime).map (name, ·)
    | .queryParams, .map entries => entries.flatMap fun (k, v) =>
      match v with
      | .list items => items.filterMap fun | .string s => some (k, s) | _ => none
      | .string s => [(k, s)]
      | _ => []
    | _, _ => []
  let headers := bound.flatMap fun (info, member, v) =>
    match info.location, v with
    | .header name, v =>
      match texts member v .httpDate with
      | [] => []
      | values => [(name, ", ".intercalate values)]
    | .prefixHeaders prefix_, .map entries =>
      entries.filterMap fun | (k, .string s) => some (prefix_ ++ k, s) | _ => none
    | _, _ => []
  let (body, contentType) := restBody xml service.xmlNamespace op.input fields
  { method := op.method
    path := fillPath ((op.uri.splitOn "?").headD op.uri) labels
    query := staticQuery op.uri ++ query
    headers := headers ++ (contentType.map fun t => ("Content-Type", t)).toList
    body }

def formBody (pairs : List (String × String)) : ByteArray :=
  ("&".intercalate (pairs.map fun (k, v) => s!"{percentEncode k}={percentEncode v}")).toUTF8

/-- An operation's input as an HTTP request. -/
def encode (service : ServiceInfo) (op : OpInfo) (input : Value) : HttpRequest :=
  match service.protocol with
  | .awsJson version =>
    { method := "POST", path := "/"
      headers := [("Content-Type", s!"application/x-amz-json-{version}"),
        ("X-Amz-Target", s!"{service.name}.{op.name}")]
      body := (toJson false op.input input).compress.toUTF8 }
  | .restJson => restRequest false service op input
  | .restXml => restRequest true service op input
  | .awsQuery | .ec2Query =>
    { method := "POST", path := "/"
      headers := [("Content-Type", "application/x-www-form-urlencoded")]
      body := formBody ([("Action", op.name), ("Version", service.version)]
        ++ toQuery (service.protocol == .ec2Query) "" false op.input input) }

/-! ## Responses -/

/-- The members of a response that travel outside its body. -/
def restBound (schema : Schema) (r : HttpResponse) : Except String (List (String × Value)) :=
  schema.members.filterMapM fun (info, member) => do
    match info.location with
    | .status => return some (info.name, .int r.status)
    | .header name =>
      match r.header name with
      | none => return none
      | some text =>
        match member with
        | .list item _ => do
          let items ← ((text.splitOn ",").map (·.trimAscii.toString)).mapM (scalarOfText item)
          return some (info.name, .list items)
        | _ => return some (info.name, ← scalarOfText member text)
    | .prefixHeaders prefix_ =>
      let found := r.headers.filterMap fun (n, v) =>
        if n.toLower.startsWith prefix_.toLower then
          some ((n.drop prefix_.length).toString, Value.string v) else none
      return if found.isEmpty then none else some (info.name, .map found)
    | _ => return none

def restFields (xml : Bool) (schema : Schema) (r : HttpResponse) : Except String Value := do
  let bound ← restBound schema r
  let body ← match schema.members.find? fun (info, _) => info.location == .payload with
    | some (info, member) =>
      match member with
      | .blob => pure [(info.name, Value.blob r.body)]
      | .string => pure [(info.name, Value.string r.text)]
      | _ =>
        if r.body.isEmpty then pure []
        else if xml then do
          pure [(info.name, ← ofXml member (← Xml.parse r.text))]
        else do
          pure [(info.name, ← ofJson true member (← Json.parse r.text))]
    | none =>
      let members := schema.keep isBody
      if members.members.isEmpty || r.body.isEmpty then pure []
      else if xml then do
        match ← ofXml members (← Xml.parse r.text) with
        | .record fields => pure fields
        | _ => pure []
      else do
        match ← ofJson true members (← Json.parse r.text) with
        | .record fields => pure fields
        | _ => pure []
  return .record (bound ++ body)

/-- The part of a type name that names a shape: after `#`, before `:`. -/
def shapeName (raw : String) : String :=
  (((raw.splitOn ":").headD raw).splitOn "#").getLastD raw

def findError (op : OpInfo) (code : String) : Option ErrorInfo :=
  op.errors.find? fun e => e.name == code || e.code == some code

/-- The element that holds an error's code, wherever the protocol puts it. -/
def errorElement (root : Xml) : Xml :=
  match root.child? "Error" with
  | some el => el
  | none =>
    match (root.child? "Errors").bind (·.child? "Error") with
    | some el => el
    | none => root

/-- A failed response as the error's shape name and content, if the operation lists it. -/
def decodeError (service : ServiceInfo) (op : OpInfo) (r : HttpResponse) : Option (String × Value) :=
  match service.protocol with
  | .awsJson _ | .restJson => do
    let body := (Json.parse (if r.body.isEmpty then "{}" else r.text)).toOption.getD (Json.mkObj [])
    let raw ← (r.header "x-amzn-errortype").orElse fun _ =>
      ((body.getObjValAs? String "__type").toOption).orElse fun _ =>
        (body.getObjValAs? String "code").toOption
    let error ← findError op (shapeName raw)
    let value ← if service.protocol == .restJson then
        (restFields false error.schema r).toOption
      else (ofJson false error.schema body).toOption
    return (error.name, value)
  | .restXml | .awsQuery | .ec2Query => do
    let root ← (Xml.parse r.text).toOption
    let el := errorElement root
    let code ← (el.child? "Code").map Xml.content
    let error ← findError op code
    let value ← (ofXml error.schema el).toOption
    return (error.name, value)

/--
A response as the operation's output, or the name and content of one of its
errors. `none` means the service said something its model does not describe.
-/
def decode (service : ServiceInfo) (op : OpInfo) (r : HttpResponse) :
    Option (Except (String × Value) Value) :=
  if 200 ≤ r.status && r.status < 300 then
    let out : Except String Value := match service.protocol with
      | .awsJson _ => do
        ofJson false op.output (← Json.parse (if r.body.isEmpty then "{}" else r.text))
      | .restJson => restFields false op.output r
      | .restXml => restFields true op.output r
      | .awsQuery => do
        if op.output.members.isEmpty then return .record []
        let root ← Xml.parse r.text
        ofXml op.output ((root.child? s!"{op.name}Result").getD root)
      | .ec2Query => do
        if op.output.members.isEmpty then return .record []
        ofXml op.output (← Xml.parse r.text)
    out.toOption.map .ok
  else (decodeError service op r).map .error

end Protocol

/-- The wire form of an API whose shapes all have schemas. -/
def Wire.of {api : Api} (service : ServiceInfo) (info : api.Op → OpInfo)
    (input : (op : api.Op) → api.In op → Value)
    (output : (op : api.Op) → Value → Except String (api.Out op))
    (error : (op : api.Op) → String → Value → Option (api.Err op)) : Wire api where
  encode op x := Protocol.encode service (info op) (input op x)
  decode op r :=
    match Protocol.decode service (info op) r with
    | none => none
    | some (.ok value) => (output op value).toOption.map .ok
    | some (.error (name, value)) => (error op name value).map .error

end Distilled
