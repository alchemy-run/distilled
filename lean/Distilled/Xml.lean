/-!
# XML

A small reader and writer: elements, attributes and text.
-/

namespace Distilled

inductive Xml where
  | element (name : String) (attributes : List (String × String)) (children : List Xml)
  | text (content : String)
deriving Inhabited, Repr

namespace Xml

def escape (s : String) : String :=
  s.foldl (init := "") fun out c =>
    match c with
    | '<' => out ++ "&lt;"
    | '>' => out ++ "&gt;"
    | '&' => out ++ "&amp;"
    | '"' => out ++ "&quot;"
    | c => out.push c

partial def render : Xml → String
  | .text content => escape content
  | .element name attributes children =>
    let attrs := String.join (attributes.map fun (k, v) => s!" {k}=\"{escape v}\"")
    if children.isEmpty then s!"<{name}{attrs}/>"
    else s!"<{name}{attrs}>{String.join (children.map render)}</{name}>"

/-- The element's name without a namespace prefix. -/
def name : Xml → String
  | .element name _ _ => ((name.splitOn ":").getLastD name)
  | .text _ => ""

def elements : Xml → List Xml
  | .element _ _ children => children.filter fun | .element .. => true | .text _ => false
  | .text _ => []

def children (x : Xml) (named : String) : List Xml := x.elements.filter (·.name == named)

def child? (x : Xml) (named : String) : Option Xml := (x.children named).head?

def attribute? : Xml → String → Option String
  | .element _ attributes _, key => (attributes.find? (·.1 == key)).map (·.2)
  | .text _, _ => none

/-- The text inside an element. -/
partial def content : Xml → String
  | .text content => content
  | .element _ _ children => String.join (children.map content)

def unescape (s : String) : String := Id.run do
  let mut out := ""
  let mut rest := s.toList
  while !rest.isEmpty do
    match rest with
    | '&' :: tail =>
      let entity := tail.takeWhile (· != ';')
      let after := (tail.dropWhile (· != ';')).drop 1
      let known : Option Char := match String.ofList entity with
        | "lt" => some '<' | "gt" => some '>' | "amp" => some '&' | "quot" => some '"'
        | "apos" => some '\''
        | other =>
          if other.startsWith "#x" then
            (other.drop 2).toString.toList.foldlM (fun (n : Nat) (c : Char) =>
              (if c.isDigit then some (c.toNat - 48)
                else if 'a' ≤ c.toLower && c.toLower ≤ 'f' then some (c.toLower.toNat - 87)
                else none).map (n * 16 + ·)) 0 |>.map Char.ofNat
          else if other.startsWith "#" then (other.drop 1).toString.toNat?.map Char.ofNat
          else none
      match known with
      | some c => out := out.push c; rest := after
      | none => out := out.push '&'; rest := tail
    | c :: tail => out := out.push c; rest := tail
    | [] => pure ()
  return out

def startsAt (cs : Array Char) (i : Nat) (word : String) : Bool :=
  let w := word.toList
  (List.range w.length).all fun k => cs.getD (i + k) ' ' == w.getD k '\x00' && i + k < cs.size

partial def skipPast (cs : Array Char) (i : Nat) (word : String) : Nat :=
  if i ≥ cs.size then cs.size
  else if startsAt cs i word then i + word.length
  else skipPast cs (i + 1) word

partial def takeUntil (cs : Array Char) (i : Nat) (stop : Char → Bool) (acc : String := "") : String × Nat :=
  if i ≥ cs.size || stop cs[i]! then (acc, i) else takeUntil cs (i + 1) stop (acc.push cs[i]!)

partial def skipSpace (cs : Array Char) (i : Nat) : Nat :=
  if i < cs.size && cs[i]!.isWhitespace then skipSpace cs (i + 1) else i

mutual

/-- Reads the element that starts at `i`, which is at a `<`. -/
partial def parseElement (cs : Array Char) (i : Nat) : Except String (Xml × Nat) := do
  let (name, i) := takeUntil cs (i + 1) fun c => c.isWhitespace || c == '/' || c == '>'
  let rec attrs (i : Nat) (acc : List (String × String)) : Except String (List (String × String) × Nat) := do
    let i := skipSpace cs i
    if i ≥ cs.size then throw "the XML is cut short"
    else if cs[i]! == '/' || cs[i]! == '>' then return (acc.reverse, i)
    else
      let (key, i) := takeUntil cs i fun c => c == '=' || c.isWhitespace
      let i := skipSpace cs (skipSpace cs i + 1)
      let quote := cs.getD i '"'
      let (value, i) := takeUntil cs (i + 1) (· == quote)
      attrs (i + 1) ((key, unescape value) :: acc)
  let (attributes, i) ← attrs i []
  if cs[i]! == '/' then return (.element name attributes [], i + 2)
  let (children, i) ← parseContent cs (i + 1) []
  return (.element name attributes children, i)

/-- Reads children up to and past the closing tag. -/
partial def parseContent (cs : Array Char) (i : Nat) (acc : List Xml) : Except String (List Xml × Nat) := do
  if i ≥ cs.size then throw "the XML is cut short"
  else if startsAt cs i "</" then return (acc.reverse, skipPast cs i ">")
  else if startsAt cs i "<![CDATA[" then
    let stop := skipPast cs i "]]>"
    parseContent cs stop (.text (String.ofList ((cs.extract (i + 9) (stop - 3)).toList)) :: acc)
  else if startsAt cs i "<!--" then parseContent cs (skipPast cs i "-->") acc
  else if startsAt cs i "<?" then parseContent cs (skipPast cs i "?>") acc
  else if cs[i]! == '<' then
    let (child, i) ← parseElement cs i
    parseContent cs i (child :: acc)
  else
    let (raw, i) := takeUntil cs i (· == '<')
    parseContent cs i (if raw.trimAscii.isEmpty then acc else .text (unescape raw) :: acc)

end

partial def skipProlog (cs : Array Char) (i : Nat) : Nat :=
  let i := skipSpace cs i
  if startsAt cs i "<?" then skipProlog cs (skipPast cs i "?>")
  else if startsAt cs i "<!--" then skipProlog cs (skipPast cs i "-->")
  else if startsAt cs i "<!" then skipProlog cs (skipPast cs i ">")
  else i

/-- Read a document's root element. -/
def parse (document : String) : Except String Xml := do
  let cs := document.toList.toArray
  let i := skipProlog cs 0
  if i ≥ cs.size || cs[i]! != '<' then throw "not an XML document"
  return (← parseElement cs i).1

end Xml

end Distilled
