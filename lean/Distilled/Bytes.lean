/-!
# Bytes and time

Base64, and the three ways a moment is written on the wire.
-/

namespace Distilled

def base64Chars : Array Char :=
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".toList.toArray

def base64Encode (bytes : ByteArray) : String := Id.run do
  let mut out := ""
  let mut i := 0
  while i < bytes.size do
    let a := bytes[i]!.toNat
    let b := if i + 1 < bytes.size then bytes[i+1]!.toNat else 0
    let c := if i + 2 < bytes.size then bytes[i+2]!.toNat else 0
    let n := a * 65536 + b * 256 + c
    out := out.push base64Chars[n / 262144 % 64]!
    out := out.push base64Chars[n / 4096 % 64]!
    out := out.push (if i + 1 < bytes.size then base64Chars[n / 64 % 64]! else '=')
    out := out.push (if i + 2 < bytes.size then base64Chars[n % 64]! else '=')
    i := i + 3
  return out

def base64Value (c : Char) : Option Nat :=
  if 'A' ≤ c && c ≤ 'Z' then some (c.toNat - 'A'.toNat)
  else if 'a' ≤ c && c ≤ 'z' then some (c.toNat - 'a'.toNat + 26)
  else if '0' ≤ c && c ≤ '9' then some (c.toNat - '0'.toNat + 52)
  else if c == '+' || c == '-' then some 62
  else if c == '/' || c == '_' then some 63
  else none

def base64Decode (text : String) : Option ByteArray := Id.run do
  let mut out := ByteArray.empty
  let mut acc := 0
  let mut bits := 0
  for c in text.toList do
    if c == '=' || c.isWhitespace then continue
    let some v := base64Value c | return none
    acc := acc * 64 + v
    bits := bits + 6
    if bits ≥ 8 then
      bits := bits - 8
      out := out.push (UInt8.ofNat (acc / 2 ^ bits % 256))
      acc := acc % 2 ^ bits
  return some out

/-! ## Time -/

def pad (n width : Nat) : String :=
  let s := toString n
  String.ofList (List.replicate (width - s.length) '0') ++ s

/-- Days since 1970-01-01 as a calendar date. -/
def civil (days : Nat) : Nat × Nat × Nat :=
  let z := days + 719468
  let era := z / 146097
  let doe := z - era * 146097
  let yoe := (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365
  let doy := doe - (365 * yoe + yoe / 4 - yoe / 100)
  let mp := (5 * doy + 2) / 153
  let d := doy - (153 * mp + 2) / 5 + 1
  let m := if mp < 10 then mp + 3 else mp - 9
  (yoe + era * 400 + (if m ≤ 2 then 1 else 0), m, d)

/-- A calendar date as days since 1970-01-01. -/
def daysFromCivil (y m d : Nat) : Nat :=
  let y := if m ≤ 2 then y - 1 else y
  let era := y / 400
  let yoe := y - era * 400
  let doy := (153 * (if m > 2 then m - 3 else m + 9) + 2) / 5 + d - 1
  let doe := yoe * 365 + yoe / 4 - yoe / 100 + doy
  era * 146097 + doe - 719468

def clock (seconds : Nat) : String :=
  let rest := seconds % 86400
  s!"{pad (rest / 3600) 2}:{pad (rest % 3600 / 60) 2}:{pad (rest % 60) 2}"

/-- `2014-04-29T18:30:38Z` -/
def isoTime (seconds : Nat) : String :=
  let (y, m, d) := civil (seconds / 86400)
  s!"{pad y 4}-{pad m 2}-{pad d 2}T{clock seconds}Z"

/-- `20140429T183038Z`, as AWS signatures write it. -/
def amzTime (seconds : Nat) : String :=
  (((isoTime seconds).replace "-" "").replace ":" "")

def months : List String :=
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

def weekdays : List String := ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/-- `Tue, 29 Apr 2014 18:30:38 GMT` -/
def httpTime (seconds : Nat) : String :=
  let days := seconds / 86400
  let (y, m, d) := civil days
  s!"{weekdays.getD ((days + 4) % 7) ""}, {pad d 2} {months.getD (m - 1) ""} {pad y 4} {clock seconds} GMT"

def digits (cs : List Char) (start length : Nat) : Option Nat :=
  (String.ofList ((cs.drop start).take length)).toNat?

def parseClock (text : String) : Option Nat := do
  let cs := text.toList
  return (← digits cs 0 2) * 3600 + (← digits cs 3 2) * 60 + (← digits cs 6 2)

def parseIsoTime (text : String) : Option Nat := do
  let cs := text.toList
  let days := daysFromCivil (← digits cs 0 4) (← digits cs 5 2) (← digits cs 8 2)
  return days * 86400 + (← parseClock (String.ofList (cs.drop 11)))

def parseHttpTime (text : String) : Option Nat := do
  match (text.splitOn " ").filter (· ≠ "") with
  | [_, day, month, year, time, _] =>
    let m ← months.findIdx? (· == month)
    return daysFromCivil (← year.toNat?) (m + 1) (← day.toNat?) * 86400 + (← parseClock time)
  | _ => none

end Distilled
