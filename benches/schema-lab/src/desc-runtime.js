// Runtime for the lab's own static descriptors (see emit.ts). Plain JS so
// bundles measure exactly what a consumer would ship.

const isObj = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

const prim = (code, v) => {
  switch (code) {
    case "s":
    case "t":
    case "x":
      return typeof v === "string";
    case "n":
    case "T":
      return typeof v === "number";
    case "b":
      return typeof v === "boolean";
    case "z":
      return v === null;
    default:
      return true; // "u", "y"
  }
};

/** Validate a wire value against an object descriptor. */
export const validate = (spec, v) => {
  switch (typeof spec) {
    case "string":
      return spec.length === 2 ? v === undefined || prim(spec[0], v) : prim(spec, v);
    case "function":
      return validate(spec(), v);
  }
  if (spec.$a !== undefined) {
    if (!Array.isArray(v)) return false;
    for (let i = 0; i < v.length; i++) if (!validate(spec.$a, v[i])) return false;
    return true;
  }
  if (spec.$m !== undefined) {
    if (!isObj(v)) return false;
    for (const k in v) if (!validate(spec.$m, v[k])) return false;
    return true;
  }
  if (spec.$u !== undefined) return spec.$u.some((s) => validate(s, v));
  if (spec.$e !== undefined) return spec.$e.includes(v);
  if (spec.$r !== undefined) return validate(spec.$r, v);
  // struct
  if (!isObj(v)) return false;
  for (const key in spec) {
    let f = spec[key];
    let optional = false;
    if (Array.isArray(f)) {
      optional = f[1] === "?";
      f = f[0];
    }
    const x = v[key];
    if (x === undefined) {
      if (optional || (typeof f === "string" && f.length === 2)) continue;
      return false;
    }
    if (!validate(f, x)) return false;
  }
  return true;
};

//#region string descriptors

const parsed = new WeakMap();

const split = (text, sep) => {
  const out = [];
  let depth = 0,
    start = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "[" || c === "{" || c === "(" || c === "<") depth++;
    else if (c === "]" || c === "}" || c === ")" || c === ">") depth--;
    else if (c === sep && depth === 0) {
      out.push(text.slice(start, i));
      start = i + 1;
    }
  }
  out.push(text.slice(start));
  return out;
};

const parseSpec = (s, deps) => {
  const c = s[0];
  if (c === "@") {
    const d = deps[Number(s.slice(1))];
    if (typeof d === "string") return parseStruct(d, deps);
    if (typeof d === "function") return () => toObj(d());
    return toObj(d);
  }
  if (c === "[") return { $a: parseSpec(s.slice(1, -1), deps) };
  if (c === "{") return { $m: parseSpec(s.slice(1, -1), deps) };
  if (c === "(") return { $u: split(s.slice(1, -1), ",").map((x) => parseSpec(x, deps)) };
  if (c === "<") return { $e: split(s.slice(1, -1), ",").map(decodeURIComponent) };
  return s;
};

const parseStruct = (text, deps) => {
  const out = {};
  if (text === "") return out;
  for (const part of split(text, ";")) {
    const colon = part.indexOf(":");
    const name = decodeURIComponent(part.slice(0, colon));
    let rest = part.slice(colon + 1);
    const bar = rest.indexOf("|");
    let meta;
    if (bar >= 0) {
      meta = Object.fromEntries(
        rest
          .slice(bar + 1)
          .split(",")
          .map((kv) => kv.split("=").map(decodeURIComponent)),
      );
      rest = rest.slice(0, bar);
    }
    const optional = rest.endsWith("?");
    if (optional) rest = rest.slice(0, -1);
    const spec = parseSpec(rest, deps);
    out[name] = meta || optional ? [spec, optional ? "?" : "", meta] : spec;
  }
  return out;
};

/** A string descriptor `[text, deps]` as an object descriptor, parsed once. */
export const toObj = (shape) => {
  let o = parsed.get(shape);
  if (!o) {
    const [text, deps] = shape;
    o = text.startsWith("=") ? { $r: parseSpec(text.slice(1), deps) } : parseStruct(text, deps);
    parsed.set(shape, o);
  }
  return o;
};

export const validateStr = (shape, v) => (shape === undefined ? true : validate(toObj(shape), v));

//#endregion
