import Lean.Data.Json

/-!
# The generator

Reads a Smithy model of a service and writes a Lean module: a type for every
shape with its JSON form, an error type for every operation, and the service as
a `Distilled.Api` with how it goes over the wire.

    distilled-gen <model.json> <Namespace> <out.lean>
-/

open Lean

structure Shape where
  id : String
  json : Json

def Shape.name (s : Shape) : String := (s.id.splitOn "#").getLastD s.id
def Shape.kind (s : Shape) : String := (s.json.getObjValAs? String "type").toOption.getD ""
def Shape.traits (s : Shape) : Json := (s.json.getObjVal? "traits").toOption.getD (Json.mkObj [])
def Shape.trait? (s : Shape) (name : String) : Option Json := (s.traits.getObjVal? name).toOption

def members (j : Json) : List (String × Json) :=
  match j.getObjVal? "members" with
  | .ok (.obj kvs) => kvs.toList
  | _ => []

def target (j : Json) : String := (j.getObjValAs? String "target").toOption.getD ""

def traitOf (j : Json) (name : String) : Option Json :=
  match j.getObjVal? "traits" with
  | .ok traits => (traits.getObjVal? name).toOption
  | .error _ => none

def traitString (j : Json) (name : String) : Option String :=
  (traitOf j name).bind fun t => (fromJson? t : Except String String).toOption

def hasTrait (j : Json) (name : String) : Bool :=
  match j.getObjVal? "traits" with
  | .ok traits => (traits.getObjVal? name).toOption.isSome
  | .error _ => false

def keywords : List String := [
  "at", "axiom", "by", "class", "def", "deriving", "do", "else", "end", "example", "export", "for",
  "attribute", "abbrev", "inductive", "instance", "opaque", "partial", "unsafe", "set_option",
  "initialize", "elab", "macro_rules", "public", "meta", "module", "init", "nomatch", "nofun",
  "from", "fun", "have", "if", "import", "in", "instance", "let", "local", "macro", "match",
  "mutual", "namespace", "notation", "open", "prefix", "private", "protected", "return", "section",
  "show", "structure", "syntax", "then", "theorem", "universe", "using", "variable", "where", "with"]

def escape (name : String) : String := if keywords.contains name then s!"«{name}»" else name

/-- `QueueUrl` to `queueUrl`, `MD5OfBody` to `md5OfBody`, `AWSTraceHeader` to `awsTraceHeader`. -/
def lowerFirst (name : String) : String :=
  let chars := name.toList.filter fun c => c.isAlphanum || c == '_'
  let run := chars.takeWhile fun c => c.isUpper || c.isDigit
  let rest := chars.drop run.length
  let lowered :=
    if run.length ≤ 1 || rest.isEmpty then run.map Char.toLower ++ rest
    else (run.take (run.length - 1)).map Char.toLower ++ run.drop (run.length - 1) ++ rest
  let out := String.ofList lowered
  escape (if (out.toList.headD 'a').isDigit then s!"_{out}" else out)

/-- The first sentence of a shape's documentation, as plain text. -/
def summary (j : Json) : Option String := do
  let traits ← (j.getObjVal? "traits").toOption
  let html ← (traits.getObjValAs? String "smithy.api#documentation").toOption
  let (text, _) := html.toList.foldl (init := ([], false)) fun (acc, inTag) c =>
    if c == '<' then (acc, true) else if c == '>' then (' ' :: acc, false)
    else if inTag then (acc, true) else ((if c.isWhitespace then ' ' else c) :: acc, false)
  let text := String.ofList text.reverse
  let text := " ".intercalate ((text.splitOn " ").filter (· ≠ ""))
  let text := (text.replace "&amp;" "&").replace "&lt;" "<" |>.replace "&gt;" ">" |>.replace "-/" "- /"
  let sentence := (text.splitOn ". ").headD text
  let sentence := if sentence.endsWith "." then sentence else sentence ++ "."
  if sentence.length < 3 then none else some (sentence.take 240).toString

def doc (indent : String) (j : Json) : String :=
  match summary j with
  | some text => s!"{indent}/-- {text} -/\n"
  | none => ""

structure Model where
  shapes : List Shape

def Model.find? (m : Model) (id : String) : Option Shape := m.shapes.find? (·.id == id)

/-- Names a generated module already uses, or that Lean does. -/
def reserved : List String := [
  "Type", "Sort", "Prop", "String", "Int", "Nat", "Bool", "List", "Option", "Unit", "Except", "Dict",
  "Blob", "Timestamp", "Document", "Op", "Input", "Output", "Error", "Value", "Schema", "Shape",
  "Key", "Info", "Protocol", "Xml", "Json", "Location", "Api", "Wire", "Eff", "Model", "Array",
  "Function", "Char", "Float", "Task", "IO", "Empty", "Subtype", "Id", "Name", "Format", "Repr"]

/-- The Lean name of a shape's type. -/
def Shape.leanName (s : Shape) : String :=
  let name := String.ofList (s.name.toList.filter fun c => c.isAlphanum || c == '_')
  if reserved.contains name then s!"{name}_" else name

def scalarType : String → Option String
  | "string" => some "String"
  | "integer" | "long" | "short" | "byte" | "bigInteger" | "intEnum" => some "Int"
  | "float" | "double" | "bigDecimal" => some "JsonNumber"
  | "boolean" => some "Bool"
  | "blob" => some "Blob"
  | "timestamp" => some "Timestamp"
  | "document" => some "Document"
  | _ => none

/-- The kind of a shape, with the prelude's shapes counted as their kind. -/
def Model.kindOf (m : Model) (id : String) : String :=
  if id.startsWith "smithy.api#" then
    match (id.drop 11).toString with
    | "String" => "string"
    | "Integer" | "PrimitiveInteger" => "integer"
    | "Long" | "PrimitiveLong" => "long"
    | "Short" | "PrimitiveShort" => "short"
    | "Byte" | "PrimitiveByte" => "byte"
    | "BigInteger" => "bigInteger"
    | "Float" | "PrimitiveFloat" => "float"
    | "Double" | "PrimitiveDouble" => "double"
    | "BigDecimal" => "bigDecimal"
    | "Boolean" | "PrimitiveBoolean" => "boolean"
    | "Blob" => "blob"
    | "Timestamp" => "timestamp"
    | "Document" => "document"
    | "Unit" => "unit"
    | other => other
  else match m.find? id with
    | some s => s.kind
    | none => "unknown"

/-- Whether a shape gets a type of its own. -/
def Model.named (m : Model) (id : String) : Bool :=
  ["structure", "enum", "union"].contains (m.kindOf id)

def sub (s : Shape) (key : String) : Json := (s.json.getObjVal? key).toOption.getD .null

/-- The Lean type for a shape. -/
partial def Model.typeOf (m : Model) (id : String) : Except String String :=
  let kind := m.kindOf id
  match scalarType kind with
  | some type => .ok type
  | none =>
    if kind == "unit" then .ok "Unit"
    else match m.find? id with
      | none => .error s!"unknown shape {id}"
      | some s =>
        match kind with
        | "structure" | "enum" | "union" => .ok s.leanName
        | "list" | "set" => do return s!"(List {← m.typeOf (target (sub s "member"))})"
        | "map" => do
          return s!"(Dict {← m.typeOf (target (sub s "key"))} {← m.typeOf (target (sub s "value"))})"
        | other => .error s!"{s.name}: shapes of type {other} are not supported"

def timeFormat (j : Json) : Option String :=
  match traitString j "smithy.api#timestampFormat" with
  | some "epoch-seconds" => some ".epochSeconds"
  | some "date-time" => some ".dateTime"
  | some "http-date" => some ".httpDate"
  | _ => none

/-- The schema of a shape, as Lean source. `member` is the reference to it, whose traits win. -/
partial def Model.schemaOf (m : Model) (member : Json) : String :=
  let id := target member
  match m.kindOf id with
  | "string" => ".string"
  | "integer" | "long" | "short" | "byte" | "bigInteger" | "intEnum" => ".int"
  | "float" | "double" | "bigDecimal" => ".number"
  | "boolean" => ".bool"
  | "blob" => ".blob"
  | "document" => ".document"
  | "unit" => "(Shape.schema Unit)"
  | "timestamp" =>
    let format := (timeFormat member).orElse fun _ => (m.find? id).bind fun s => timeFormat s.json
    match format with
    | some f => s!"(.time (some {f}))"
    | none => "(.time none)"
  | "list" | "set" =>
    match m.find? id with
    | some s =>
      let item := sub s "member"
      s!"(.list {m.schemaOf item} {repr ((traitString item "smithy.api#xmlName").getD "member")})"
    | none => ".string"
  | "map" =>
    match m.find? id with
    | some s =>
      let key := sub s "key"
      let value := sub s "value"
      s!"(.map {m.schemaOf key} {m.schemaOf value} {repr ((traitString key "smithy.api#xmlName").getD "key")} {repr ((traitString value "smithy.api#xmlName").getD "value")})"
    | none => ".string"
  | _ =>
    match m.find? id with
    | some s => s!"(Shape.schema {s.leanName})"
    | none => ".string"

/-- The named shapes a shape refers to, through lists and maps. -/
partial def Model.uses (m : Model) (id : String) : List String :=
  match m.find? id with
  | none => []
  | some s =>
    if m.named id then [id]
    else if s.kind == "list" || s.kind == "set" then m.uses (target (sub s "member"))
    else if s.kind == "map" then m.uses (target (sub s "key")) ++ m.uses (target (sub s "value"))
    else []

def Model.dependencies (m : Model) (s : Shape) : List String :=
  ((members s.json).flatMap fun (_, member) => m.uses (target member)).eraseDups

/-- The named shapes, each after the ones it mentions. Shapes that mention themselves are left out and reported. -/
partial def Model.ordered (m : Model) : List Shape × List Shape :=
  let named := m.shapes.filter fun s => m.named s.id
  let rec go (done : List Shape) (left : List Shape) : List Shape × List Shape :=
    let ready := left.filter fun s => (m.dependencies s).all fun d => done.any (·.id == d)
    if ready.isEmpty then (done, left)
    else go (done ++ ready) (left.filter fun s => !ready.any (·.id == s.id))
  go [] named

/-- Field or constructor names, made distinct. -/
def distinct (names : List String) : List String :=
  (names.foldl (init := ([] : List String)) fun acc name =>
    let name := if name.isEmpty || name == "_" then "value" else name
    let rec fresh (candidate : String) (n : Nat) : String :=
      match n with
      | 0 => candidate
      | n + 1 => if acc.contains candidate then fresh (candidate ++ "_") n else candidate
    acc ++ [fresh name 20])

def emitEnum (s : Shape) : String :=
  let raw := members s.json
  let names := distinct (raw.map fun (name, _) => lowerFirst name)
  let cases := (raw.zip names).map fun ((name, member), c) =>
    (c, (traitString member "smithy.api#enumValue").getD name)
  let n := s.leanName
  doc "" s.json ++ s!"inductive {n} where\n"
    ++ String.join (cases.map fun (c, _) => s!"  | {c}\n")
    ++ "deriving DecidableEq, Repr, Inhabited\n\n"
    ++ s!"def {n}.wire : {n} → String\n"
    ++ String.join (cases.map fun (c, v) => s!"  | .{c} => {repr v}\n")
    ++ s!"\ndef {n}.wireValues : List (String × {n}) := [\n"
    ++ ",\n".intercalate ((cases.map (·.2)).eraseDups.filterMap fun v =>
        (cases.find? (·.2 == v)).map fun (c, _) => s!"  ({repr v}, .{c})")
    ++ "]\n\n"
    ++ s!"def {n}.ofWire (text : String) : Except String {n} :=\n"
    ++ s!"  match List.find? (·.1 == text) {n}.wireValues with\n" ++ "  | Option.some (_, x) => .ok x\n"
    ++ s!"  | Option.none => .error s!\"{n} has no value \{text}\"\n\n"
    ++ s!"instance : Key {n} := ⟨{n}.wire, {n}.ofWire⟩\n\n"
    ++ s!"instance : Shape {n} where\n  schema := .string\n  toValue x := .string x.wire\n"
    ++ s!"  ofValue\n    | .string text => {n}.ofWire text\n    | _ => .error \"expected a string\"\n\n"

/-- What the model says about a member, as Lean source. -/
def infoOf (name : String) (member : Json) : String :=
  let location :=
    if hasTrait member "smithy.api#httpLabel" then some ".label"
    else if hasTrait member "smithy.api#httpQueryParams" then some ".queryParams"
    else if hasTrait member "smithy.api#httpPayload" then some ".payload"
    else if hasTrait member "smithy.api#httpResponseCode" then some ".status"
    else match traitString member "smithy.api#httpQuery" with
      | some q => some s!".query {repr q}"
      | none =>
        match traitString member "smithy.api#httpHeader" with
        | some h => some s!".header {repr h}"
        | none => (traitString member "smithy.api#httpPrefixHeaders").map fun p => s!".prefixHeaders {repr p}"
  let fields := [some s!"name := {repr name}",
    if hasTrait member "smithy.api#required" then some "required := true" else none,
    (traitString member "smithy.api#jsonName").map fun v => s!"jsonName := some {repr v}",
    (traitString member "smithy.api#xmlName").map fun v => s!"xmlName := some {repr v}",
    (traitString member "aws.protocols#ec2QueryName").map fun v => s!"queryName := some {repr v}",
    if hasTrait member "smithy.api#xmlFlattened" then some "flattened := true" else none,
    if hasTrait member "smithy.api#xmlAttribute" then some "asAttribute := true" else none,
    location.map fun l => s!"location := {l}"]
  "{ " ++ ", ".intercalate (fields.filterMap id) ++ " }"

def schemaMembers (m : Model) (s : Shape) : String :=
  "[" ++ ",\n      ".intercalate ((members s.json).map fun (name, member) =>
    s!"({infoOf name member}, {m.schemaOf member})") ++ "]"

def emitStructure (m : Model) (s : Shape) : Except String String := do
  let raw := members s.json
  let names := distinct (raw.map fun (name, _) => lowerFirst name)
  let fields ← (raw.zip names).mapM fun ((name, member), field) => do
    return (name, field, ← m.typeOf (target member), hasTrait member "smithy.api#required", member)
  let n := s.leanName
  let wireName := (traitString s.json "smithy.api#xmlName").getD s.name
  let decl := if fields.isEmpty then s!"structure {n} where\n  mk ::\n"
    else s!"structure {n} where\n" ++ String.join (fields.map fun (_, field, type, required, member) =>
      doc "  " member
        ++ (if required then s!"  {field} : {type}\n" else s!"  {field} : Option {type} := none\n"))
  let x := if fields.isEmpty then "_" else "x"
  let v := if fields.isEmpty then "_" else "v"
  return doc "" s.json ++ decl ++ "deriving DecidableEq, Repr, Inhabited\n\n"
    ++ s!"instance : Shape {n} where\n"
    ++ s!"  schema := .struct {repr wireName} {schemaMembers m s}\n"
    ++ s!"  toValue {x} := record ["
    ++ ", ".intercalate (fields.map fun (wire, field, _, required, _) =>
      s!"{if required then "put" else "putOpt"} {repr wire} x.{field}") ++ "]\n"
    ++ s!"  ofValue {v} := do\n"
    ++ String.join (fields.map fun (wire, field, _, required, _) =>
      s!"    let {field} ← v.{if required then "req" else "opt"} {repr wire}\n")
    ++ "    return { " ++ ", ".intercalate (fields.map fun (_, field, _, _, _) => field) ++ " }\n\n"

def emitUnion (m : Model) (s : Shape) : Except String String := do
  let raw := members s.json
  let names := distinct (raw.map fun (name, _) => lowerFirst name)
  let cases ← (raw.zip names).mapM fun ((name, member), c) => do
    return (name, c, ← m.typeOf (target member), member)
  let n := s.leanName
  return doc "" s.json ++ s!"inductive {n} where\n"
    ++ String.join (cases.map fun (_, c, type, member) => doc "  " member ++ s!"  | {c} (value : {type})\n")
    ++ "deriving DecidableEq, Repr, Inhabited\n\n"
    ++ s!"instance : Shape {n} where\n"
    ++ s!"  schema := .union {repr s.name} {schemaMembers m s}\n"
    ++ "  toValue\n"
    ++ String.join (cases.map fun (wire, c, _, _) => s!"    | .{c} value => record [put {repr wire} value]\n")
    ++ "  ofValue\n"
    ++ String.join (cases.map fun (wire, c, _, _) =>
      s!"    | .record [({repr wire}, value)] => .{c} <$> Shape.ofValue value\n")
    ++ s!"    | _ => .error \"expected exactly one member of {s.name}\"\n\n"

structure Operation where
  shape : Shape
  input : String
  output : String
  inputSchema : String
  outputSchema : String
  errors : List Shape

def Operation.name (o : Operation) : String := o.shape.name
def Operation.case (o : Operation) : String := lowerFirst o.shape.name
def Operation.errorType (o : Operation) : String :=
  if o.errors.isEmpty then "Empty" else s!"{o.shape.name}Error"

/-- The operations whose shapes were all generated, and the ones that were not. -/
def operations (m : Model) (skipped : List Shape) : List Operation × List String :=
  let ok (id : String) : Bool := !(m.uses id).any fun d => skipped.any (·.id == d)
  (m.shapes.filter (·.kind == "operation")).foldl (init := ([], [])) fun (done, left) s =>
    let side (key : String) : Option (String × String) :=
      match s.json.getObjVal? key with
      | .ok j => if ok (target j) then (m.typeOf (target j)).toOption.map (·, m.schemaOf j) else none
      | .error _ => some ("Unit", "(Shape.schema Unit)")
    let errors := match s.json.getObjValAs? (Array Json) "errors" with
      | .ok list => list.toList.filterMap fun e => m.find? (target e)
      | .error _ => []
    match side "input", side "output" with
    | some (input, inputSchema), some (output, outputSchema) =>
      if errors.all fun e => ok e.id then
        (done ++ [{ shape := s, input, output, inputSchema, outputSchema, errors }], left)
      else (done, left ++ [s.name])
    | _, _ => (done, left ++ [s.name])

def emitErrors (o : Operation) : String :=
  if o.errors.isEmpty then "" else
    let t := o.errorType
    let cases := (o.errors.zip (distinct (o.errors.map fun e => lowerFirst e.name)))
    s!"/-- What `{o.name}` can fail with. -/\ninductive {t} where\n"
      ++ String.join (cases.map fun (e, c) => doc "  " e.json ++ s!"  | {c} (error : {e.leanName})\n")
      ++ "deriving DecidableEq, Repr\n\n"
      ++ s!"def {t}.ofWire (name : String) (value : Value) : Option {t} :=\n  match name with\n"
      ++ String.join (cases.map fun (e, c) =>
        s!"  | {repr e.name} => (Shape.ofValue value).toOption.map .{c}\n")
      ++ "  | _ => none\n\n"

def errorCode (e : Shape) : Option String :=
  (traitOf e.json "aws.protocols#awsQueryError").bind fun t => (t.getObjValAs? String "code").toOption

def emitInfo (o : Operation) : String :=
  let http := traitOf o.shape.json "smithy.api#http"
  let method := (http.bind fun h => (h.getObjValAs? String "method").toOption).getD "POST"
  let uri := (http.bind fun h => (h.getObjValAs? String "uri").toOption).getD "/"
  s!"  | .{o.case} => \{ name := {repr o.name}, method := {repr method}, uri := {repr uri}, "
    ++ s!"input := {o.inputSchema}, output := {o.outputSchema}, "
    ++ "errors := [" ++ ", ".intercalate (o.errors.map fun e =>
        let code := match errorCode e with
          | some c => s!", code := some {repr c}"
          | none => ""
        s!"\{ name := {repr e.name}{code}, schema := Shape.schema {e.leanName} }") ++ "] }\n"

def protocolOf (service : Shape) : Except String String :=
  if (service.trait? "aws.protocols#awsJson1_0").isSome then .ok ".awsJson \"1.0\""
  else if (service.trait? "aws.protocols#awsJson1_1").isSome then .ok ".awsJson \"1.1\""
  else if (service.trait? "aws.protocols#restJson1").isSome then .ok ".restJson"
  else if (service.trait? "aws.protocols#restXml").isSome then .ok ".restXml"
  else if (service.trait? "aws.protocols#awsQuery").isSome then .ok ".awsQuery"
  else if (service.trait? "aws.protocols#ec2Query").isSome then .ok ".ec2Query"
  else .error "the service names no protocol this generator knows"

def generate (m : Model) (namespace_ : String) (source : String) :
    Except String (String × List String × List String) := do
  let some service := m.shapes.find? (·.kind == "service") | throw "the model has no service"
  let protocol ← protocolOf service
  let signingName := ((service.trait? "aws.auth#sigv4").bind fun j =>
    (j.getObjValAs? String "name").toOption).getD ""
  let version := (service.json.getObjValAs? String "version").toOption.getD ""
  let xmlns := (service.trait? "smithy.api#xmlNamespace").bind fun j =>
    (j.getObjValAs? String "uri").toOption
  let (shapes, skipped) := m.ordered
  let (ops, skippedOps) := operations m skipped
  let types ← shapes.mapM fun s =>
    if s.kind == "enum" then pure (emitEnum s)
    else if s.kind == "union" then emitUnion m s
    else emitStructure m s
  let table (name : String) (pick : Operation → String) : String :=
    s!"abbrev {name} : Op → Type\n" ++ String.join (ops.map fun o => s!"  | .{o.case} => {pick o}\n") ++ "\n"
  let text := s!"-- Generated by distilled-gen from {source}. Do not edit.\n"
    ++ "import Distilled.Protocol\n\n"
    ++ s!"namespace {namespace_}\nopen Lean Distilled\n\n"
    ++ "set_option linter.unusedVariables false\nset_option maxRecDepth 4096\nset_option maxHeartbeats 0\n\n"
    ++ String.join types
    ++ String.join (ops.map emitErrors)
    ++ "/-- The operations of the service. -/\ninductive Op where\n"
    ++ String.join (ops.map fun o => doc "  " o.shape.json ++ s!"  | {o.case}\n")
    ++ "deriving DecidableEq, Repr\n\n"
    ++ table "Input" (·.input) ++ table "Output" (·.output) ++ table "Error" (·.errorType)
    ++ "/-- An empty output for each operation, for a model that leaves an operation out. -/\n"
    ++ "def Output.empty : (op : Op) → Output op\n"
    ++ String.join (ops.map fun o => s!"  | .{o.case} => default\n") ++ "\n"
    ++ "/-- The service: every operation with its input, its output and its errors. -/\n"
    ++ "abbrev api : Distilled.Api where\n  Op := Op\n  In := Input\n  Out := Output\n  Err := Error\n\n"
    ++ s!"/-- The name requests to this service are signed for. -/\ndef signingName : String := {repr signingName}\n\n"
    ++ "def service : ServiceInfo where\n"
    ++ s!"  name := {repr service.name}\n  version := {repr version}\n  protocol := {protocol}\n"
    ++ s!"  signingName := {repr signingName}\n"
    ++ (match xmlns with | some ns => s!"  xmlNamespace := some {repr ns}\n" | none => "")
    ++ "\n/-- What the model says about each operation. -/\ndef info : Op → OpInfo\n"
    ++ String.join (ops.map emitInfo)
    ++ "\n/-- How the service goes over HTTP. -/\ndef wire : Wire api := Wire.of service info\n"
    ++ "  (fun op => match op with\n"
    ++ String.join (ops.map fun o => s!"    | .{o.case} => fun (x : {o.input}) => Shape.toValue x\n") ++ ")\n"
    ++ "  (fun op => match op with\n"
    ++ String.join (ops.map fun o =>
      s!"    | .{o.case} => fun v => (Shape.ofValue v : Except String {o.output})\n") ++ ")\n"
    ++ "  (fun op => match op with\n"
    ++ String.join (ops.map fun o =>
      s!"    | .{o.case} => " ++ (if o.errors.isEmpty then "fun _ _ => none" else s!"{o.errorType}.ofWire") ++ "\n")
    ++ ")\n\n"
    ++ String.join (ops.map fun o =>
      doc "" o.shape.json
        ++ s!"def {o.case} \{ε : Type} (input : {o.input}) : Eff api ε (Except {o.errorType} {o.output}) :=\n"
        ++ s!"  Eff.ask (api := api) .{o.case} input\n\n")
    ++ s!"end {namespace_}\n"
  return (text, skipped.map (·.name), skippedOps)

def main (args : List String) : IO UInt32 := do
  let [modelPath, namespace_, outPath] := args
    | IO.eprintln "usage: distilled-gen <model.json> <Namespace> <out.lean>"; return 2
  let text ← IO.FS.readFile modelPath
  let json ← IO.ofExcept (Json.parse text)
  let shapes := match json.getObjVal? "shapes" with
    | .ok (.obj kvs) => kvs.toList.map fun (id, j) => ({ id, json := j } : Shape)
    | _ => []
  match generate { shapes } namespace_ ((modelPath.splitOn "/").getLastD modelPath) with
  | .error why => IO.eprintln s!"{modelPath}: {why}"; return 1
  | .ok (source, skipped, skippedOps) =>
    IO.FS.writeFile outPath source
    IO.println s!"wrote {outPath}: {shapes.length} shapes"
    if !skipped.isEmpty then
      IO.println s!"  left out {skipped.length} shapes that refer to themselves: {skipped.take 6}"
      IO.println s!"  and {skippedOps.length} operations that use them: {skippedOps.take 6}"
    return 0
