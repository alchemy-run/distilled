import { describe, expect, test } from "vitest";
import { makeLogDemuxer, parseMultipart } from "../src/toolbox.ts";

const bytes = (...parts: Array<string | number[]>) =>
  new Uint8Array(
    parts.flatMap((part) =>
      typeof part === "string" ? Array.from(new TextEncoder().encode(part)) : part,
    ),
  );

const OUT = [1, 1, 1];
const ERR = [2, 2, 2];

const join = (pieces: Array<{ stream: string; text: string }>) => {
  const merged: Array<{ stream: string; text: string }> = [];
  for (const piece of pieces) {
    const last = merged.at(-1);
    if (last?.stream === piece.stream) last.text += piece.text;
    else merged.push({ ...piece });
  }
  return merged;
};

describe("makeLogDemuxer", () => {
  test("splits labelled output into stdout and stderr", () => {
    const demux = makeLogDemuxer();
    expect(join(demux(bytes(ERR, "err1\n", OUT, "out1\n"), true))).toEqual([
      { stream: "stderr", text: "err1\n" },
      { stream: "stdout", text: "out1\n" },
    ]);
  });

  test("a marker split across frames still switches streams", () => {
    const demux = makeLogDemuxer();
    const pieces = [
      ...demux(bytes(OUT, "a", [2])),
      ...demux(bytes([2, 2], "b", [1, 1])),
      ...demux(bytes([1], "c"), true),
    ];
    expect(join(pieces)).toEqual([
      { stream: "stdout", text: "a" },
      { stream: "stderr", text: "b" },
      { stream: "stdout", text: "c" },
    ]);
  });

  test("a multi-byte character split across frames decodes whole", () => {
    const demux = makeLogDemuxer();
    const euro = Array.from(new TextEncoder().encode("€"));
    const pieces = [...demux(bytes(OUT, euro.slice(0, 1))), ...demux(bytes(euro.slice(1)), true)];
    expect(join(pieces)).toEqual([{ stream: "stdout", text: "€" }]);
  });

  test("unlabelled bytes are stdout", () => {
    expect(makeLogDemuxer()(bytes("plain\n"), true)).toEqual([
      { stream: "stdout", text: "plain\n" },
    ]);
  });
});

describe("parseMultipart", () => {
  const boundary = "DAYTONA-FILE-BOUNDARY";
  // As Daytona's bulk-download answers, observed live.
  const body = bytes(
    `--${boundary}\r\n`,
    `Content-Disposition: form-data; name="file"; filename="/tmp/a.txt"; filename*=utf-8''%2Ftmp%2Fa.txt\r\n`,
    "Content-Type: text/plain; charset=utf-8\r\n\r\n",
    "alpha\r\n",
    `--${boundary}\r\n`,
    `Content-Disposition: form-data; name="file"; filename="/tmp/b.bin"; filename*=utf-8''%2Ftmp%2Fb.bin\r\n\r\n`,
    [0, 1, 13, 10, 255],
    "\r\n",
    `--${boundary}\r\n`,
    `Content-Disposition: form-data; name="error"; filename="/tmp/m"; filename*=utf-8''%2Ftmp%2Fm\r\n`,
    "Content-Type: application/json\r\n\r\n",
    `{"statusCode":404,"code":"FILE_NOT_FOUND"}\r\n`,
    `--${boundary}--\r\n`,
  );

  test("reads each part's name, filename and bytes", () => {
    const parts = parseMultipart(body, boundary);
    expect(parts.map((p) => [p.name, p.filename])).toEqual([
      ["file", "/tmp/a.txt"],
      ["file", "/tmp/b.bin"],
      ["error", "/tmp/m"],
    ]);
    expect(new TextDecoder().decode(parts[0]!.data)).toBe("alpha");
    expect(Array.from(parts[1]!.data)).toEqual([0, 1, 13, 10, 255]);
    expect(JSON.parse(new TextDecoder().decode(parts[2]!.data))).toEqual({
      statusCode: 404,
      code: "FILE_NOT_FOUND",
    });
  });

  test("an empty body has no parts", () => {
    expect(parseMultipart(bytes(`--${boundary}--\r\n`), boundary)).toEqual([]);
  });
});
