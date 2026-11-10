import * as http2 from "node:http2";
import { describe, expect, test } from "vitest";
import { encode, HpackError, huffmanDecode, makeDecoder } from "../src/hpack.ts";

const hex = (text: string) => new Uint8Array(Buffer.from(text.replace(/\s+/g, ""), "hex"));

// RFC 7541 Appendix C: each block continues the connection of the one before.
describe("HPACK decoding", () => {
  test("requests with Huffman coding (C.4)", () => {
    const decoder = makeDecoder();
    expect(decoder.decode(hex("8286 8441 8cf1 e3c2 e5f2 3a6b a0ab 90f4 ff"))).toEqual([
      [":method", "GET"],
      [":scheme", "http"],
      [":path", "/"],
      [":authority", "www.example.com"],
    ]);
    expect(decoder.decode(hex("8286 84be 5886 a8eb 1064 9cbf"))).toEqual([
      [":method", "GET"],
      [":scheme", "http"],
      [":path", "/"],
      [":authority", "www.example.com"],
      ["cache-control", "no-cache"],
    ]);
    expect(
      decoder.decode(hex("8287 85bf 4088 25a8 49e9 5ba9 7d7f 8925 a849 e95b b8e8 b4bf")),
    ).toEqual([
      [":method", "GET"],
      [":scheme", "https"],
      [":path", "/index.html"],
      [":authority", "www.example.com"],
      ["custom-key", "custom-value"],
    ]);
  });

  test("responses that evict from a 256-octet dynamic table (C.6)", () => {
    const decoder = makeDecoder(256);
    expect(
      decoder.decode(
        hex(`4882 6402 5885 aec3 771a 4b61 96d0 7abe 9410 54d4 44a8 2005 9504 0b81 66e0 82a6
             2d1b ff6e 919d 29ad 1718 63c7 8f0b 97c8 e9ae 82ae 43d3`),
      ),
    ).toEqual([
      [":status", "302"],
      ["cache-control", "private"],
      ["date", "Mon, 21 Oct 2013 20:13:21 GMT"],
      ["location", "https://www.example.com"],
    ]);
    expect(decoder.decode(hex("4883 640e ffc1 c0bf"))).toEqual([
      [":status", "307"],
      ["cache-control", "private"],
      ["date", "Mon, 21 Oct 2013 20:13:21 GMT"],
      ["location", "https://www.example.com"],
    ]);
    expect(
      decoder.decode(
        hex(`88c1 6196 d07a be94 1054 d444 a820 0595 040b 8166 e084 a62d 1bff c05a 839b d9ab
             77ad 94e7 821d d7f2 e6c7 b335 dfdf cd5b 3960 d5af 2708 7f36 72c1 ab27 0fb5 291f
             9587 3160 65c0 03ed 4ee5 b106 3d50 07`),
      ),
    ).toEqual([
      [":status", "200"],
      ["cache-control", "private"],
      ["date", "Mon, 21 Oct 2013 20:13:22 GMT"],
      ["location", "https://www.example.com"],
      ["content-encoding", "gzip"],
      ["set-cookie", "foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1"],
    ]);
  });

  test("literals that are never indexed, and a table size update", () => {
    // 0x3f 0xe1 0x1f: table size 4096; 0x10: never indexed, new name.
    const block = hex("3fe11f 10 08 70617373776f7264 06 736563726574");
    expect(makeDecoder().decode(block)).toEqual([["password", "secret"]]);
  });

  test("refuses what RFC 7541 forbids", () => {
    // An index past both tables, a table size above the limit, EOS in a string.
    expect(() => makeDecoder().decode(hex("be"))).toThrow(HpackError);
    expect(() => makeDecoder(256).decode(hex("3fe11f"))).toThrow(HpackError);
    expect(() => huffmanDecode(hex("ffffffff"))).toThrow(HpackError);
    // Padding of zeros, and a string cut short.
    expect(() => huffmanDecode(hex("f1e3c2e5f23a6ba0ab90f400"))).toThrow(HpackError);
    expect(() => makeDecoder().decode(hex("0005 6162"))).toThrow(HpackError);
  });
});

describe("HPACK encoding", () => {
  const fields = [
    [":method", "POST"],
    [":path", "/test.Svc/Get"],
    ["authorization", `Bearer ${"t".repeat(300)}`],
    ["grpc-message", "café"],
  ] as const;

  test("decodes back to the same fields", () => {
    const decoded = makeDecoder().decode(encode(fields));
    expect(decoded[2]).toEqual(fields[2]);
    // One character per octet, so UTF-8 comes back as its octets.
    expect(Buffer.from(decoded[3]![1], "latin1").toString("utf8")).toBe("café");
  });

  test("is what node:http2 reads", async () => {
    const server = http2.createServer();
    const seen = new Promise<http2.IncomingHttpHeaders>((resolve) =>
      server.on("stream", (stream, headers) => {
        resolve(headers);
        stream.close();
      }),
    );
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address() as { port: number };
    const net = await import("node:net");
    const socket = net.connect(port, "127.0.0.1");
    const block = encode([
      [":method", "POST"],
      [":scheme", "http"],
      [":path", "/test.Svc/Get"],
      [":authority", "localhost"],
      ["authorization", `Bearer ${"t".repeat(300)}`],
    ]);
    socket.write(
      Buffer.concat([
        Buffer.from("PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n", "latin1"),
        Buffer.from([0, 0, 0, 4, 0, 0, 0, 0, 0]),
        // HEADERS on stream 1, END_STREAM | END_HEADERS.
        Buffer.from([block.length >> 16, (block.length >> 8) & 0xff, block.length & 0xff, 1, 5]),
        Buffer.from([0, 0, 0, 1]),
        Buffer.from(block),
      ]),
    );
    const headers = await seen;
    socket.destroy();
    await new Promise((resolve) => server.close(resolve));
    expect(headers[":path"]).toBe("/test.Svc/Get");
    expect(headers.authorization).toBe(`Bearer ${"t".repeat(300)}`);
  });
});
