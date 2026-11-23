import Lean.Data.Json
import Distilled.Bytes

/-!
# Shapes

A `Schema` describes a shape of an API the way its model does: its members,
what each is called on the wire, and where each travels in an HTTP message. A
`Value` is a shape's content with the types taken off. Every protocol is a pair
of functions between values and HTTP messages, driven by the schema, so a
generated SDK only says what its shapes are.
-/

namespace Distilled
open Lean

inductive TimeFormat where
  | epochSeconds
  | dateTime
  | httpDate
deriving DecidableEq, Repr, Inhabited

/-- Where a member travels in an HTTP message. -/
inductive Location where
  | body
  /-- In the path. -/
  | label
  | query (name : String)
  /-- A map spread over the query string. -/
  | queryParams
  | header (name : String)
  /-- A map spread over headers that share a prefix. -/
  | prefixHeaders (prefix_ : String)
  /-- The whole body. -/
  | payload
  /-- The response's status code. -/
  | status
deriving DecidableEq, Repr, Inhabited

/-- What a model says about one member of a structure. -/
structure Info where
  name : String
  required : Bool := false
  /-- Its name in JSON, when that differs. -/
  jsonName : Option String := none
  /-- Its name in XML, when that differs. -/
  xmlName : Option String := none
  /-- Its name in a query-protocol request, when that differs. -/
  queryName : Option String := none
  /-- A list or map written without its wrapping element. -/
  flattened : Bool := false
  /-- Written as an XML attribute. -/
  asAttribute : Bool := false
  location : Location := .body
deriving Repr, Inhabited

inductive Schema where
  | bool
  | int
  | number
  | string
  | blob
  | time (format : Option TimeFormat)
  /-- Any JSON. -/
  | document
  | list (item : Schema) (itemName : String)
  | map (key value : Schema) (keyName valueName : String)
  | struct (name : String) (members : List (Info × Schema))
  | union (name : String) (members : List (Info × Schema))
deriving Inhabited

namespace Schema

def members : Schema → List (Info × Schema)
  | .struct _ members | .union _ members => members
  | _ => []

def name : Schema → String
  | .struct name _ | .union name _ => name
  | _ => ""

/-- The same structure with only the members that pass. -/
def keep (s : Schema) (pass : Info → Bool) : Schema :=
  match s with
  | .struct name members => .struct name (members.filter fun (info, _) => pass info)
  | other => other

end Schema

/-- A shape's content. -/
inductive Value where
  | null
  | bool (b : Bool)
  | int (i : Int)
  | number (n : JsonNumber)
  | string (s : String)
  | blob (bytes : ByteArray)
  /-- Seconds since 1970. -/
  | time (seconds : Nat)
  /-- JSON, as text. -/
  | document (json : String)
  | list (items : List Value)
  | map (entries : List (String × Value))
  /-- A structure's members that are present, by member name. A union has exactly one. -/
  | record (fields : List (String × Value))
deriving Inhabited

namespace Value

def field? : Value → String → Option Value
  | .record fields, name => (fields.find? (·.1 == name)).map (·.2)
  | _, _ => none

end Value

/-- A type that is a shape of an API. -/
class Shape (α : Type) where
  schema : Schema
  toValue : α → Value
  ofValue : Value → Except String α

/-- Bytes. -/
structure Blob where
  bytes : ByteArray
deriving DecidableEq, Inhabited

instance : Repr Blob := ⟨fun b _ => s!"Blob({b.bytes.size} bytes)"⟩

def Blob.ofString (s : String) : Blob := ⟨s.toUTF8⟩
def Blob.text (b : Blob) : String := (String.fromUTF8? b.bytes).getD ""

/-- A moment, to the second. -/
structure Timestamp where
  seconds : Nat
deriving DecidableEq, Repr, Inhabited

/-- Any JSON, kept as text. -/
structure Document where
  json : String
deriving DecidableEq, Repr, Inhabited

instance : Shape String := ⟨.string, .string, fun | .string s => .ok s | _ => .error "expected a string"⟩
instance : Shape Int := ⟨.int, .int, fun | .int i => .ok i | _ => .error "expected an integer"⟩
instance : Shape Bool := ⟨.bool, .bool, fun | .bool b => .ok b | _ => .error "expected a boolean"⟩
instance : Shape JsonNumber :=
  ⟨.number, .number, fun | .number n => .ok n | .int i => .ok (.fromInt i) | _ => .error "expected a number"⟩
instance : Shape Blob := ⟨.blob, fun b => .blob b.bytes, fun | .blob b => .ok ⟨b⟩ | _ => .error "expected bytes"⟩
instance : Shape Timestamp :=
  ⟨.time none, fun t => .time t.seconds, fun | .time s => .ok ⟨s⟩ | _ => .error "expected a time"⟩
instance : Shape Document :=
  ⟨.document, fun d => .document d.json, fun | .document j => .ok ⟨j⟩ | _ => .error "expected a document"⟩
instance : Shape Unit := ⟨.struct "Unit" [], fun _ => .record [], fun _ => .ok ()⟩

instance {α : Type} [Shape α] : Shape (List α) where
  schema := .list (Shape.schema α) "member"
  toValue items := .list (items.map Shape.toValue)
  ofValue
    | .list items => items.mapM Shape.ofValue
    | _ => .error "expected a list"

/-- A type that can be the key of a map: a string, or an enum of strings. -/
class Key (κ : Type) where
  toKey : κ → String
  ofKey : String → Except String κ

instance : Key String := ⟨id, .ok⟩

/-- A map, kept as its entries in order so that it can be compared and reasoned about. -/
structure Dict (κ α : Type) where
  entries : List (κ × α) := []
deriving DecidableEq, Repr, Inhabited

namespace Dict

variable {κ α : Type}

def get? [BEq κ] (d : Dict κ α) (key : κ) : Option α := (d.entries.find? (·.1 == key)).map (·.2)

def set [BEq κ] (d : Dict κ α) (key : κ) (value : α) : Dict κ α :=
  ⟨(d.entries.filter (·.1 != key)) ++ [(key, value)]⟩

/-- What was just set is what is found. -/
theorem get?_set [BEq κ] [LawfulBEq κ] (d : Dict κ α) (key : κ) (value : α) :
    (d.set key value).get? key = some value := by
  have gone : (d.entries.filter (·.1 != key)).find? (·.1 == key) = none := by
    simp [List.find?_eq_none]
  simp [get?, set, List.find?_append, gone]

end Dict

instance {κ α : Type} [Key κ] [Shape α] : Shape (Dict κ α) where
  schema := .map .string (Shape.schema α) "key" "value"
  toValue d := .map (d.entries.map fun (k, v) => (Key.toKey k, Shape.toValue v))
  ofValue
    | .map entries => do
      return ⟨← entries.mapM fun (k, v) => do return ((← Key.ofKey k), (← Shape.ofValue v))⟩
    | _ => .error "expected a map"

/-! ## What generated code uses -/

namespace Value

/-- A member that must be there. -/
def req {α : Type} [Shape α] (v : Value) (name : String) : Except String α :=
  match v.field? name with
  | some value => (Shape.ofValue value).mapError fun e => s!"{name}: {e}"
  | none => .error s!"{name} is missing"

/-- A member that may be absent. -/
def opt {α : Type} [Shape α] (v : Value) (name : String) : Except String (Option α) :=
  match v.field? name with
  | none | some .null => .ok none
  | some value => (some <$> Shape.ofValue value).mapError fun e => s!"{name}: {e}"

end Value

def put {α : Type} [Shape α] (name : String) (value : α) : Option (String × Value) :=
  some (name, Shape.toValue value)

def putOpt {α : Type} [Shape α] (name : String) (value : Option α) : Option (String × Value) :=
  value.map fun v => (name, Shape.toValue v)

/-- A record of the members that are present. -/
def record (members : List (Option (String × Value))) : Value := .record (members.filterMap id)

end Distilled
