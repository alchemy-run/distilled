import Distilled.Http

/-!
# Cloud APIs

An `Api` is what a generated SDK gives: every operation with its input, its
output and the errors it can return. Code that calls it is a value, so it can
be run against the real service, run against a model of it, or reasoned about.
-/

namespace Distilled

/-- The operations of a service. Each has its own input, output and errors. -/
structure Api where
  Op : Type
  In : Op → Type
  Out : Op → Type
  Err : Op → Type

/-- Code that calls an API: it may fail with `ε`, and returns `α`. -/
inductive Eff (api : Api) (ε α : Type) : Type where
  | pure (a : α)
  | fail (e : ε)
  /-- Call an operation. What comes back is its output or one of its own errors. -/
  | call (op : api.Op) (input : api.In op)
      (next : Except (api.Err op) (api.Out op) → Eff api ε α)

namespace Eff

variable {api : Api} {ε α β : Type}

def bind : Eff api ε α → (α → Eff api ε β) → Eff api ε β
  | .pure a, f => f a
  | .fail e, _ => .fail e
  | .call op input next, f => .call op input fun reply => (next reply).bind f

instance : Monad (Eff api ε) where
  pure := .pure
  bind := Eff.bind

/-- Recover from a failure. -/
def recover : Eff api ε α → (ε → Eff api ε α) → Eff api ε α
  | .pure a, _ => .pure a
  | .fail e, handle => handle e
  | .call op input next, handle => .call op input fun reply => (next reply).recover handle

instance : MonadExcept ε (Eff api ε) where
  throw := .fail
  tryCatch := Eff.recover

/-- Call an operation, and get its output or its error as a value to match on. -/
def ask (op : api.Op) (input : api.In op) : Eff api ε (Except (api.Err op) (api.Out op)) :=
  .call op input .pure

end Eff

/-- What a service does: how each operation answers and what it leaves behind. -/
structure Model (api : Api) where
  State : Type
  step : (op : api.Op) → api.In op → State → Except (api.Err op) (api.Out op) × State

namespace Eff

variable {api : Api} {ε α β : Type}

/-- Run code against a model of the service. -/
def run (m : Model api) : Eff api ε α → m.State → Except ε α × m.State
  | .pure a, s => (.ok a, s)
  | .fail e, s => (.error e, s)
  | .call op input next, s => (next (m.step op input s).1).run m (m.step op input s).2

@[simp] theorem run_pure (m : Model api) (a : α) (s : m.State) :
    (Pure.pure a : Eff api ε α).run m s = (.ok a, s) := rfl

@[simp] theorem run_throw (m : Model api) (e : ε) (s : m.State) :
    (throw e : Eff api ε α).run m s = (.error e, s) := rfl

@[simp] theorem run_ask (m : Model api) (op : api.Op) (input : api.In op) (s : m.State) :
    (ask op input : Eff api ε _).run m s = (.ok (m.step op input s).1, (m.step op input s).2) := rfl

theorem run_bind' (m : Model api) (x : Eff api ε α) (f : α → Eff api ε β) (s : m.State) :
    (x.bind f).run m s =
      match x.run m s with
      | (.ok a, s') => (f a).run m s'
      | (.error e, s') => (.error e, s') := by
  induction x generalizing s with
  | pure a => rfl
  | fail e => rfl
  | call op input next ih => exact ih _ _

@[simp] theorem run_bind (m : Model api) (x : Eff api ε α) (f : α → Eff api ε β) (s : m.State) :
    (x >>= f).run m s =
      match x.run m s with
      | (.ok a, s') => (f a).run m s'
      | (.error e, s') => (.error e, s') := run_bind' m x f s

/-- The calls code makes when run against a model, in order. -/
def calls (m : Model api) : Eff api ε α → m.State → List api.Op
  | .pure _, _ => []
  | .fail _, _ => []
  | .call op input next, s => op :: (next (m.step op input s).1).calls m (m.step op input s).2

end Eff

/-! ## On the wire -/

/--
How an API goes over HTTP. `decode` gives `none` for a response the API never
described, so an undocumented error is seen for what it is and not mistaken for
a typed one.
-/
structure Wire (api : Api) where
  encode : (op : api.Op) → api.In op → HttpRequest
  decode : (op : api.Op) → HttpResponse → Option (Except (api.Err op) (api.Out op))

/-- Why a call could not be made sense of. -/
structure Undescribed where
  request : HttpRequest
  response : HttpResponse

/-- Run code against the real service, given how to send a request. -/
def Eff.io {api : Api} {ε α : Type} (wire : Wire api) (send : HttpRequest → IO HttpResponse) :
    Eff api ε α → IO (Except Undescribed (Except ε α))
  | .pure a => return .ok (.ok a)
  | .fail e => return .ok (.error e)
  | .call op input next => do
    let request := wire.encode op input
    let response ← send request
    match wire.decode op response with
    | none => return .error ⟨request, response⟩
    | some reply => (next reply).io wire send

end Distilled
