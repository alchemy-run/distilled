import { describe, expect, it } from "vitest";
import { type ApiStructure, convert, isApiStructure } from "./schema.ts";

const structure: ApiStructure = {
  undocumentedRoutes: [],
  operations: [
    {
      path: "/api/widgets/add",
      title: "Add Widget",
      permissions: ["Widgets: None", "Widget: Modify"],
      parameters: [
        { name: "name", required: true, type: "string" },
        { name: "color", required: false, type: "string", enum: ["Red", "Blue"] },
        { name: "size", required: false, type: "integer" },
        { name: "pass", required: false, type: "string" },
      ],
      response: {
        kind: "json",
        wrapped: true,
        shape: {
          type: "object",
          properties: {
            owners: { type: "map", values: { type: "number" } },
            widget: { type: "object", properties: { token: { type: "string" } } },
          },
        },
      },
      request: "form",
    },
    {
      path: "/api/widgets/export",
      title: "Export Widgets",
      permissions: [],
      parameters: [],
      response: { kind: "file", contentType: "text/plain" },
      request: "form",
    },
  ],
};

describe("structure conversion", () => {
  it("recognizes the mirror's structure", () => {
    expect(isApiStructure(structure)).toBe(true);
    expect(isApiStructure({ operations: [{ path: "/api/x" }] })).toBe(false);
  });

  it("emits one POST operation per call, with typed and sensitive members", () => {
    const { models, skipped } = convert(structure, "Invented 1.0");
    expect(skipped).toEqual([
      { path: "/api/widgets/export", reason: "downloads a file (text/plain)" },
    ]);
    const shapes = models.widgets?.shapes ?? {};
    expect(shapes["technitium.widgets#AddWidget"]?.traits).toEqual({
      "smithy.api#http": { method: "POST", uri: "/api/widgets/add", code: 200 },
      "smithy.api#documentation": "POST /api/widgets/add. Permissions: Widget: Modify.",
    });
    expect(shapes["technitium.widgets#AddWidgetRequest"]?.members).toEqual({
      name: { target: "smithy.api#String", traits: { "smithy.api#required": {} } },
      color: { target: "technitium.widgets#AddWidgetRequestColor" },
      size: { target: "smithy.api#Integer" },
      pass: { target: "smithy.api#String", traits: { "smithy.api#sensitive": {} } },
    });
    expect(shapes["technitium.widgets#AddWidgetRequestColor"]?.type).toBe("enum");
    expect(shapes["technitium.widgets#AddWidgetResponseWidget"]?.members?.token).toEqual({
      target: "smithy.api#String",
      traits: { "smithy.api#sensitive": {}, "technitium.api#redactedOutput": {} },
    });
    expect(shapes["technitium.widgets#AddWidgetResponseOwners"]?.type).toBe("map");
  });
});
