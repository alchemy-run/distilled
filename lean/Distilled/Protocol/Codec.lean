import Distilled.Schema
import Distilled.Xml

/-!
# Codecs

Values as JSON, as XML and as query parameters, each driven by a schema.
-/

namespace Distilled.Codec
open Lean

/-! ## Scalars as text -/

def timeText (format : TimeFormat) (seconds : Nat) : String :=
  match format with
  | .epochSeconds => toString seconds
  | .dateTime => isoTime seconds
  | .httpDate => httpTime seconds

def parseTime (text : String) : Option Nat :=
  let text := text.trimAscii.toString
  if text.contains 'T' then parseIsoTime text
  else if text.contains ',' then parseHttpTime text
  else ((text.splitOn ".").headD text).toNat?

/-- A scalar as the text it has in a header, a query string, a path or an XML element. -/
def scalarText (s : Schema) (v : Value) (defaultTime : TimeFormat) : Option String :=
  match s, v with
  | _, .string text => some text
  | _, .bool b => some (toString b)
  | _, .int i => some (toString i)
  | _, .number n => some (toString n)
  | .time format, .time seconds => some (timeText (format.getD defaultTime) seconds)
  | _, .time seconds => some (timeText defaultTime seconds)
  | _, .blob bytes => some (base64Encode bytes)
  | _, .document json => some json
  | _, _ => none

def scalarOfText (s : Schema) (text : String) : Except String Value :=
  match s with
  | .string => .ok (.string text)
  | .bool => .ok (.bool (text.trimAscii.toString.toLower == "true"))
  | .int =>
    match text.trimAscii.toString.toInt? with
    | some i => .ok (.int i)
    | none => .error s!"not an integer: {text}"
  | .number =>
    match Json.parse text.trimAscii.toString with
    | .ok (.num n) => .ok (.number n)
    | _ => .error s!"not a number: {text}"
  | .time _ =>
    match parseTime text with
    | some seconds => .ok (.time seconds)
    | none => .error s!"not a time: {text}"
  | .blob =>
    match base64Decode text with
    | some bytes => .ok (.blob bytes)
    | none => .error "not base64"
  | .document => .ok (.document text)
  | _ => .error "not a scalar"

/-! ## JSON -/

/-- `rest` uses each member's JSON name; the RPC protocols use member names as they are. -/
def jsonKey (rest : Bool) (info : Info) : String := if rest then info.jsonName.getD info.name else info.name

partial def toJson (rest : Bool) : Schema → Value → Json
  | _, .null => .null
  | _, .bool b => .bool b
  | _, .int i => .num (.fromInt i)
  | _, .number n => .num n
  | _, .string s => .str s
  | _, .blob bytes => .str (base64Encode bytes)
  | .time (some .dateTime), .time seconds => .str (isoTime seconds)
  | .time (some .httpDate), .time seconds => .str (httpTime seconds)
  | _, .time seconds => .num (.fromNat seconds)
  | _, .document json => (Json.parse json).toOption.getD .null
  | .list item _, .list items => .arr (items.map (toJson rest item)).toArray
  | .map _ value _ _, .map entries => Json.mkObj (entries.map fun (k, v) => (k, toJson rest value v))
  | schema, .record fields =>
    Json.mkObj (schema.members.filterMap fun (info, member) =>
      ((fields.find? (·.1 == info.name)).map fun (_, v) => (jsonKey rest info, toJson rest member v)))
  | _, _ => .null

partial def ofJson (rest : Bool) : Schema → Json → Except String Value
  | _, .null => .ok .null
  | .bool, .bool b => .ok (.bool b)
  | .int, j =>
    match j.getInt? with
    | .ok i => .ok (.int i)
    | .error _ => .error "expected an integer"
  | .number, .num n => .ok (.number n)
  | .number, .str s => scalarOfText .number s
  | .string, .str s => .ok (.string s)
  | .blob, .str s => scalarOfText .blob s
  | .time _, .num n => .ok (.time (n.mantissa / (10 ^ n.exponent : Nat)).toNat)
  | .time format, .str s => scalarOfText (.time format) s
  | .document, j => .ok (.document j.compress)
  | .list item _, .arr items => .list <$> items.toList.mapM (ofJson rest item)
  | .map _ value _ _, .obj entries =>
    .map <$> entries.toList.mapM fun (k, v) => do return (k, ← ofJson rest value v)
  | .struct _ members, j => do
    let fields ← members.filterMapM fun (info, member) =>
      match j.getObjVal? (jsonKey rest info) with
      | .ok .null | .error _ => pure none
      | .ok v => do
        let value ← (ofJson rest member v).mapError fun e => s!"{info.name}: {e}"
        pure (some (info.name, value))
    return .record fields
  | .union _ members, j => do
    let fields ← members.filterMapM fun (info, member) =>
      match j.getObjVal? (jsonKey rest info) with
      | .ok .null | .error _ => pure none
      | .ok v => do return some (info.name, ← ofJson rest member v)
    return .record (fields.take 1)
  | _, _ => .error "the JSON does not match the shape"

/-! ## XML -/

def xmlKey (info : Info) : String := info.xmlName.getD info.name

mutual

/-- A value as the elements it becomes under the name it is given. -/
partial def toXml (name : String) (flattened : Bool) : Schema → Value → List Xml
  | .list item itemName, .list items =>
    if flattened then items.flatMap (toXml name false item)
    else [.element name [] (items.flatMap (toXml itemName false item))]
  | .map key value keyName valueName, .map entries =>
    let entry (tag : String) (k : String) (v : Value) : Xml :=
      .element tag [] (toXml keyName false key (.string k) ++ toXml valueName false value v)
    if flattened then entries.map fun (k, v) => entry name k v
    else [.element name [] (entries.map fun (k, v) => entry "entry" k v)]
  | schema, .record fields => [recordXml name schema fields]
  | _, .null => []
  | schema, v =>
    match scalarText schema v .dateTime with
    | some text => [.element name [] [.text text]]
    | none => []

partial def recordXml (name : String) (schema : Schema) (fields : List (String × Value)) : Xml :=
  let present := schema.members.filterMap fun (info, member) =>
    (fields.find? (·.1 == info.name)).map fun (_, v) => (info, member, v)
  let attributes := present.filterMap fun (info, member, v) =>
    if info.asAttribute then (scalarText member v .dateTime).map (xmlKey info, ·) else none
  .element name attributes (present.flatMap fun (info, member, v) =>
    if info.asAttribute then [] else toXml (xmlKey info) info.flattened member v)

end

mutual

/-- Read the member called `name` from its parent element. -/
partial def ofXmlMember (parent : Xml) (name : String) (flattened : Bool) :
    Schema → Except String (Option Value)
  | .list item itemName =>
    if flattened then
      match parent.children name with
      | [] => pure none
      | found => do return some (.list (← found.mapM (ofXml item)))
    else
      match parent.child? name with
      | none => pure none
      | some el => do return some (.list (← (el.children itemName).mapM (ofXml item)))
  | .map key value keyName valueName => do
    let entries := if flattened then parent.children name
      else match parent.child? name with
        | some el => el.children "entry"
        | none => []
    if entries.isEmpty && (flattened || (parent.child? name).isNone) then return none
    let read ← entries.mapM fun entry => do
      let k := ((entry.child? keyName).map Xml.content).getD ""
      let _ := key
      let v ← match entry.child? valueName with
        | some el => ofXml value el
        | none => pure .null
      return (k, v)
    return some (.map read)
  | schema =>
    match parent.child? name with
    | none => pure none
    | some el => some <$> ofXml schema el

/-- Read an element as a value. -/
partial def ofXml : Schema → Xml → Except String Value
  | .struct _ members, el => .record <$> xmlFields members el
  | .union _ members, el => do return .record ((← xmlFields members el).take 1)
  | .list item itemName, el => .list <$> (el.children itemName).mapM (ofXml item)
  | schema, el => scalarOfText schema el.content

partial def xmlFields (members : List (Info × Schema)) (el : Xml) :
    Except String (List (String × Value)) :=
  members.filterMapM fun (info, member) => do
    if info.asAttribute then
      match el.attribute? (xmlKey info) with
      | some text => return some (info.name, ← scalarOfText member text)
      | none => return none
    else
      let found ← (ofXmlMember el (xmlKey info) info.flattened member).mapError
        fun e => s!"{info.name}: {e}"
      return found.map (info.name, ·)

end

/-! ## Query parameters -/

def capitalize (s : String) : String :=
  match s.toList with
  | c :: rest => String.ofList (c.toUpper :: rest)
  | [] => s

/-- A member's name in a query-protocol request. EC2 capitalizes it. -/
def queryKey (ec2 : Bool) (info : Info) : String :=
  if ec2 then info.queryName.getD (capitalize (xmlKey info)) else xmlKey info

/-- A value as `Name.member.1=…` pairs, the way the query protocols write it. -/
partial def toQuery (ec2 : Bool) (key : String) (flattened : Bool) : Schema → Value → List (String × String)
  | .list item itemName, .list items =>
    let base := if flattened || ec2 then key else s!"{key}.{itemName}"
    if items.isEmpty then [(key, "")]
    else (items.zipIdx 1).flatMap fun (v, i) => toQuery ec2 s!"{base}.{i}" false item v
  | .map keySchema value keyName valueName, .map entries =>
    let base := if flattened then key else s!"{key}.entry"
    (entries.zipIdx 1).flatMap fun ((k, v), i) =>
      toQuery ec2 s!"{base}.{i}.{keyName}" false keySchema (.string k)
        ++ toQuery ec2 s!"{base}.{i}.{valueName}" false value v
  | schema, .record fields =>
    schema.members.flatMap fun (info, member) =>
      match fields.find? (·.1 == info.name) with
      | some (_, v) =>
        toQuery ec2 (if key.isEmpty then queryKey ec2 info else s!"{key}.{queryKey ec2 info}")
          info.flattened member v
      | none => []
  | _, .null => []
  | schema, v =>
    match scalarText schema v .dateTime with
    | some text => [(key, text)]
    | none => []

end Distilled.Codec
