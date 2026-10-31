import { describe, expect, it } from "vitest";
import { convert, FAMILY, FORMAT, isApiTree } from "./schema.ts";

/** Every key at any depth of a value. */
const keys = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.flatMap(keys)
    : typeof value === "object" && value !== null
      ? Object.entries(value).flatMap(([key, item]) => [key, ...keys(item)])
      : [];

describe("schema conversion", () => {
  it("preserves property-string formats and indexed families", () => {
    const { models, count } = convert([
      {
        path: "/nodes/{node}/lxc/{vmid}/config",
        info: {
          PUT: {
            name: "update_config",
            parameters: {
              properties: {
                node: { type: "string" },
                vmid: { type: "integer" },
                "net[n]": {
                  type: "string",
                  optional: 1,
                  format: { name: { type: "string" }, mtu: { type: "integer", optional: 1 } },
                },
                tags: { type: "string", optional: 1, format: "pve-tag-list" },
              },
            },
            returns: { type: "null" },
          },
        },
      },
    ]);
    expect(count).toBe(1);
    const input =
      models.nodes_lxc!.shapes["proxmox.nodes_lxc#PutNodesByNodeLxcByVmidConfigRequest"]!;
    expect(input.members?.node?.traits?.["smithy.api#httpLabel"]).toEqual({});
    expect(input.members?.["net[n]"]?.traits?.[FORMAT]).toEqual({
      name: { type: "string" },
      mtu: { type: "integer", optional: 1 },
    });
    expect(input.members?.["net[n]"]?.traits?.[FAMILY]).toMatchObject({ pattern: "net[n]" });
    expect(input.members?.tags?.traits?.[FORMAT]).toBe("pve-tag-list");
  });

  it("binds GET parameters to the query and the path and keeps access flags", () => {
    const { models } = convert([
      {
        path: "/pools/{poolid}",
        info: {
          GET: {
            name: "read_pool",
            allowtoken: 0,
            protected: 1,
            parameters: {
              properties: {
                poolid: { type: "string" },
                type: { type: "string", optional: 1, enum: ["qemu", "storage"] },
              },
            },
            returns: { type: "array", items: { type: "string" } },
          },
        },
      },
    ]);
    const shapes = models.pools!.shapes;
    expect(
      shapes["proxmox.pools#GetPoolsByPoolidRequest"]?.members?.type?.traits?.[
        "smithy.api#httpQuery"
      ],
    ).toBe("type");
    expect(shapes["proxmox.pools#GetPoolsByPoolid"]?.traits?.["proxmox.api#access"]).toEqual({
      allowtoken: 0,
      protected: 1,
    });
    expect(shapes["proxmox.pools#GetPoolsByPoolidRequestType"]?.type).toBe("enum");
    expect(shapes["proxmox.pools#Pools"]?.operations).toEqual([
      { target: "proxmox.pools#GetPoolsByPoolid" },
    ]);
  });

  it("keeps structure and drops every documentation field", () => {
    const prose = "Invented prose for this test only.";
    // Upstream fields the converter ignores (`text`) ride along as in the real schema.
    const tree: unknown = [
      {
        path: "/widgets/{id}",
        text: "widgets",
        info: {
          POST: {
            name: "create_widget",
            description: prose,
            permissions: { description: prose, check: ["perm", "/", ["Sys.Audit"]] },
            parameters: {
              additionalProperties: 0,
              properties: {
                id: { type: "integer", description: prose, minimum: 1, title: prose },
                "slot[n]": {
                  type: "string",
                  optional: 1,
                  description: prose,
                  verbose_description: prose,
                  typetext: "<size>",
                  format: {
                    size: {
                      type: "integer",
                      description: prose,
                      format_description: "size in units",
                      default: 4,
                    },
                    mode: { type: "string", enum: ["a", "b"], default: "described in words" },
                  },
                },
              },
            },
            returns: {
              type: "array",
              title: prose,
              items: {
                type: "object",
                description: prose,
                links: [{ rel: "child", href: "{id}" }],
                properties: { id: { type: "integer", renderer: "bytes", description: prose } },
              },
            },
          },
        },
      },
    ];
    if (!isApiTree(tree)) throw new Error("Invalid test tree");
    const { models } = convert(tree);
    const shapes = models.widgets!.shapes;
    const slot = {
      type: "string",
      optional: 1,
      format: {
        size: { type: "integer", default: 4 },
        mode: { type: "string", enum: ["a", "b"] },
      },
    };
    const input = shapes["proxmox.widgets#PostWidgetsByIdRequest"]!;
    expect(input.members?.["slot[n]"]?.traits?.[FORMAT]).toEqual(slot.format);
    expect(input.members?.["slot[n]"]?.traits?.[FAMILY]).toEqual({
      pattern: "slot[n]",
      schema: slot,
    });
    // The only operation text is generated from the method and the path.
    expect(shapes["proxmox.widgets#PostWidgetsById"]?.traits?.["smithy.api#documentation"]).toBe(
      "POST /widgets/{id}",
    );
    const documentation = [
      "description",
      "verbose_description",
      "format_description",
      "typetext",
      "title",
      "permissions",
      "renderer",
      "links",
      "text",
    ];
    expect(keys(models).filter((key) => documentation.includes(key))).toEqual([]);
    expect(JSON.stringify(models)).not.toMatch(
      /Invented prose|size in units|described in words|Sys\.Audit/,
    );
  });
});
