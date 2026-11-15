import { describe, expect, test } from "vitest";
import {
  decodeMessage,
  encodeMessage,
  frame,
  FrameReader,
  unframe,
  type ProtoDescriptors,
} from "../src/protobuf.ts";

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString("hex");
const fromHex = (s: string) => new Uint8Array(Buffer.from(s.replace(/\s+/g, ""), "hex"));

const d: ProtoDescriptors = {
  messages: {
    "t.Test1": [[1, "a", "int32"]],
    "t.Test2": [[2, "b", "string"]],
    "t.Test3": [[3, "c", "message", "t.Test1"]],
    "t.Packed": [[4, "d", "int32", 0, 1]],
    "t.Scalars": [
      [1, "i64", "int64"],
      [2, "u64", "uint64"],
      [3, "s32", "sint32"],
      [4, "s64", "sint64"],
      [5, "f32", "fixed32"],
      [6, "f64", "fixed64"],
      [7, "sf32", "sfixed32"],
      [8, "sf64", "sfixed64"],
      [9, "dbl", "double"],
      [10, "flt", "float"],
      [11, "flag", "bool"],
      [12, "raw", "bytes"],
      [13, "color", "enum", "t.Color"],
      [14, "u32", "uint32"],
    ],
    "t.Composite": [
      [1, "labels", "map", ["string", "string"]],
      [2, "children", "message", "t.Test1", 1],
      [3, "byId", "map", ["int32", "message", "t.Test2"]],
      [4, "names", "string", 0, 1],
      [5, "colors", "enum", "t.Color", 1],
      [6, "createdAt", "message", "google.protobuf.Timestamp"],
      [7, "meta", "message", "google.protobuf.Struct"],
      [8, "note", "message", "google.protobuf.StringValue"],
      [9, "nothing", "message", "google.protobuf.Empty"],
    ],
    "t.Presence": [
      [1, "note", "string", 0, 0, 1],
      [2, "count", "int32"],
      [3, "child", "message", "t.Test1"],
      [4, "color", "enum", "t.Color"],
      [5, "names", "string", 0, 1],
      [6, "labels", "map", ["string", "string"]],
      [7, "big", "int64"],
      [8, "flag", "bool"],
      [9, "raw", "bytes"],
      [10, "picked", "int32", 0, 0, 1],
      [11, "children", "message", "t.Test1", 1],
    ],
  },
  enums: { "t.Color": { COLOR_UNSPECIFIED: 0, COLOR_RED: 1, COLOR_BLUE: 2 } },
  methods: {},
};

describe("protobuf wire codec", () => {
  test("encodes the protobuf documentation's vectors", () => {
    expect(hex(encodeMessage(d, "t.Test1", { a: 150 }))).toBe("089601");
    expect(hex(encodeMessage(d, "t.Test2", { b: "testing" }))).toBe("120774657374696e67");
    expect(hex(encodeMessage(d, "t.Test3", { c: { a: 150 } }))).toBe("1a03089601");
    expect(hex(encodeMessage(d, "t.Packed", { d: [3, 270, 86942] }))).toBe("2206038e029ea705");
  });

  test("negative int32 is a ten-byte varint", () => {
    expect(hex(encodeMessage(d, "t.Test1", { a: -1 }))).toBe("08ffffffffffffffffff01");
    expect(decodeMessage(d, "t.Test1", fromHex("08ffffffffffffffffff01"))).toEqual({ a: -1 });
  });

  test("decodes unpacked repeated scalars too", () => {
    expect(decodeMessage(d, "t.Packed", fromHex("2003 208e02"))).toEqual({ d: [3, 270] });
  });

  test("round-trips every scalar kind in proto3 JSON shape", () => {
    const value = {
      i64: "-9007199254740993",
      u64: "18446744073709551615",
      s32: -2,
      s64: "-3",
      f32: 4294967295,
      f64: "12345678901234",
      sf32: -5,
      sf64: "-6",
      dbl: 1.5,
      flt: 0.25,
      flag: true,
      raw: "AAEC/w==",
      color: "COLOR_BLUE",
      u32: 4294967295,
    };
    expect(decodeMessage(d, "t.Scalars", encodeMessage(d, "t.Scalars", value))).toEqual(value);
  });

  test("sint32 uses zigzag", () => {
    expect(hex(encodeMessage(d, "t.Scalars", { s32: -1 }))).toBe("1801");
    expect(hex(encodeMessage(d, "t.Scalars", { s32: 1 }))).toBe("1802");
  });

  test("accepts numbers for 64-bit fields and numbers for enums", () => {
    const bytes = encodeMessage(d, "t.Scalars", { i64: 42, color: 1 });
    expect(decodeMessage(d, "t.Scalars", bytes)).toMatchObject({ i64: "42", color: "COLOR_RED" });
  });

  test("unknown enum numbers decode to the number", () => {
    expect(decodeMessage(d, "t.Scalars", fromHex("6809"))).toMatchObject({ color: 9 });
  });

  test("round-trips maps, repeated messages and well-known types", () => {
    const value = {
      labels: { a: "1", b: "2" },
      children: [{ a: 1 }, { a: 2 }],
      byId: { "7": { b: "seven" } },
      names: ["x", "y"],
      colors: ["COLOR_RED", "COLOR_BLUE"],
      createdAt: "2026-11-02T03:04:05.123456789Z",
      meta: { n: 1, s: "two", ok: true, nil: null, list: [1, "a"], nested: { k: "v" } },
      note: "hello",
      nothing: {},
    };
    expect(decodeMessage(d, "t.Composite", encodeMessage(d, "t.Composite", value))).toEqual(value);
  });

  test("whole-second timestamps format without a fraction", () => {
    const bytes = encodeMessage(d, "t.Composite", { createdAt: "2026-01-02T03:04:05Z" });
    expect(decodeMessage(d, "t.Composite", bytes)).toMatchObject({
      createdAt: "2026-01-02T03:04:05Z",
    });
  });

  test("skips unknown fields and reads an absent field as its default", () => {
    // field 2 (string "x") is unknown to Test1, field 1 is absent
    expect(decodeMessage(d, "t.Test1", fromHex("120178"))).toEqual({ a: 0 });
  });

  test("absent fields without presence read as their proto3 default; fields with presence stay absent", () => {
    expect(decodeMessage(d, "t.Presence", new Uint8Array())).toEqual({
      count: 0,
      color: "COLOR_UNSPECIFIED",
      names: [],
      labels: {},
      big: "0",
      flag: false,
      raw: "",
      children: [],
    });
    const bytes = encodeMessage(d, "t.Presence", { note: "", picked: 0, child: {} });
    expect(decodeMessage(d, "t.Presence", bytes)).toMatchObject({
      note: "",
      picked: 0,
      child: { a: 0 },
    });
  });

  test("rejects values of the wrong type", () => {
    expect(() => encodeMessage(d, "t.Scalars", { i64: "nope" })).toThrow(/expected an integer/);
    expect(() => encodeMessage(d, "t.Scalars", { color: "COLOR_GREEN" })).toThrow(/unknown enum/);
  });

  test("frames and unframes gRPC messages", () => {
    const a = encodeMessage(d, "t.Test1", { a: 1 });
    const b = encodeMessage(d, "t.Test1", { a: 2 });
    const body = new Uint8Array([...frame(a), ...frame(b), ...frame(new Uint8Array())]);
    expect(hex(frame(a))).toBe("00000000020801");
    expect(unframe(body).map((f) => decodeMessage(d, "t.Test1", f))).toEqual([
      { a: 1 },
      { a: 2 },
      { a: 0 },
    ]);
    expect(() => unframe(body.subarray(0, 6))).toThrow(/truncated/);
  });

  test("reads frames from a body split at any byte", () => {
    const body = new Uint8Array([
      ...frame(encodeMessage(d, "t.Test1", { a: 1 })),
      ...frame(encodeMessage(d, "t.Test2", { b: "two" })),
    ]);
    for (let cut = 0; cut <= body.length; cut++) {
      const reader = new FrameReader();
      const frames = [...reader.push(body.subarray(0, cut)), ...reader.push(body.subarray(cut))];
      expect(frames.map(hex)).toEqual(["0801", "120374776f"]);
      expect(reader.rest).toBe(0);
    }
    const partial = new FrameReader();
    expect(partial.push(body.subarray(0, 9))).toHaveLength(1);
    expect(partial.rest).toBe(2);
  });
});
