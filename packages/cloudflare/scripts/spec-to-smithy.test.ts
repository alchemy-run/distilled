import { describe, expect, test } from "bun:test";
import pageRules from "../.generated-specs/page_rules.json";
import resourceTagging from "../.generated-specs/resource_tagging.json";
import {
  buildOperation,
  newBag,
  parseMarkdown,
  respaceUnion,
} from "./spec-to-smithy.ts";

const declarations: ReadonlyArray<readonly [string, string]> = [
  [
    "CacheDeceptionArmor object {id, value }",
    "CacheDeceptionArmor object {id, value }",
  ],
  [
    "LoadBalancerMonitor object {id, etag, name }",
    "LoadBalancerMonitor object {id, etag, name }",
  ],
  ["Monitor { id, name }", "Monitor { id, name }"],
  ["ListCursor object {after, before }", "ListCursor object {after, before }"],
  [
    "DigitalExperienceMonitor object {id, name }",
    "DigitalExperienceMonitor object {id, name }",
  ],
  ['"on"or "off"', '"on" or "off"'],
  [
    'value: optional "on"or "off"or 2 more',
    'value: optional "on" or "off" or 2 more',
  ],
  ["stringor null", "string or null"],
  ["Monitoror null", "Monitor or null"],
  ["Monitoror object {value}", "Monitoror object {value}"],
  ['"on"or object {value}', '"on" or object {value}'],
  ["stringor object {value}", "string or object {value}"],
  ["numberor object {value}", "number or object {value}"],
  ["booleanor object {value}", "boolean or object {value}"],
  ["nullor object {value}", "null or object {value}"],
  ["unknownor object {value}", "unknown or object {value}"],
  ["array[string]or unknown", "array[string] or unknown"],
  ["Monitor object {id}or null", "Monitor object {id} or null"],
  ["object {id}or object {name}", "object {id} or object {name}"],
];

describe("respaceUnion", () => {
  for (const [input, expected] of declarations) {
    test(input, () => {
      expect(respaceUnion(input)).toBe(expected);
    });
  }
});

const unionPage = (extraArm = "") => `# Get Example

GET/zones/{zone_id}/example

##### ReturnsExpand Collapse

<details>

<summary>

result: CacheDeceptionArmoror LoadBalancerMonitor

</summary>

One of the following:

<details>

<summary>

CacheDeceptionArmor object {id, value }

</summary>

id: "cache_deception_armor"

[Link to this property](<#id>)

value: "on"or "off"

[Link to this property](<#value>)

</details>

<details>

<summary>

LoadBalancerMonitor object {id, kind }

</summary>

id: string

[Link to this property](<#id>)

kind: "load_balancer_monitor"

[Link to this property](<#kind>)

</details>

${extraArm}

</details>
`;

const buildUnion = (extraArm = "") => {
  const parsed = parseMarkdown(unionPage(extraArm));
  if (!parsed) throw new Error("Fixture did not parse");
  const bag = newBag("com.cloudflare.example");
  const operation = buildOperation(bag, "GetExample", parsed);
  const output = bag.shapes[bag.shapes[operation].output.target];
  return { bag, target: output.members.result.target };
};

describe("named object union conversion", () => {
  test("preserves typed object variants and their discriminators", () => {
    const { bag, target } = buildUnion();
    const union = bag.shapes[target];
    expect(union.type).toBe("union");
    expect(Object.keys(union.members)).toHaveLength(2);
    const armor = bag.shapes[union.members.CacheDeceptionArmor.target];
    const monitor = bag.shapes[union.members.LoadBalancerMonitor.target];
    expect(armor.type).toBe("structure");
    expect(monitor.type).toBe("structure");
    expect(
      bag.shapes[armor.members.id.target].members.CACHE_DECEPTION_ARMOR.traits[
        "smithy.api#enumValue"
      ],
    ).toBe("cache_deception_armor");
    expect(
      bag.shapes[monitor.members.kind.target].members.LOAD_BALANCER_MONITOR
        .traits["smithy.api#enumValue"],
    ).toBe("load_balancer_monitor");
    expect(Object.keys(bag.shapes[armor.members.value.target].members)).toEqual(
      ["ON", "OFF"],
    );
  });

  test("an explicit unknown arm still absorbs the union", () => {
    const { target } = buildUnion(
      "unknown\n\n[Link to this property](<#unknown>)",
    );
    expect(target).toBe("smithy.api#Document");
  });
});

const buildObjectUnion = (declaration: string) => {
  const parsed = parseMarkdown(`# Get Example

GET/zones/{zone_id}/example

##### ReturnsExpand Collapse

<details>

<summary>

result: ${declaration}

</summary>

value: string

[Link to this property](<#value>)

</details>
`);
  if (!parsed) throw new Error("Fixture did not parse");
  const bag = newBag("com.cloudflare.example");
  buildOperation(bag, "GetExample", parsed);
  return bag.shapes;
};

describe("compact object union conversion", () => {
  for (const arm of [
    '"on"',
    "string",
    "number",
    "boolean",
    "null",
    "unknown",
  ]) {
    test(`${arm} followed by an object matches the spaced union`, () => {
      expect(buildObjectUnion(`${arm}or object {value}`)).toEqual(
        buildObjectUnion(`${arm} or object {value}`),
      );
    });
  }
});

type Shape = {
  type: string;
  member?: { target: string };
  members?: Record<
    string,
    { target?: string; traits?: Record<string, unknown> }
  >;
};

const finalizedModels: Record<string, { shapes: Record<string, Shape> }> = {
  page_rules: pageRules,
  resource_tagging: resourceTagging,
};

const unionTargets: ReadonlyArray<readonly [string, string, number]> = [
  ...[
    "CreateRequestActionsList",
    "CreateResponseActionsList",
    "EditRequestActionsList",
    "EditResponseActionsList",
    "GetResponseActionsList",
    "ListResultItemActionsList",
    "UpdateRequestActionsList",
    "UpdateResponseActionsList",
  ].map((name): [string, string, number] => ["page_rules", name, 34]),
  ...[
    "ListResultList",
    "GetAccountTagResponse",
    "PutAccountTagResponse",
    "GetZoneTagResponse",
    "PutZoneTagResponse",
  ].map((name): [string, string, number] => ["resource_tagging", name, 41]),
];

describe("finalized named object unions", () => {
  for (const [service, name, count] of unionTargets) {
    test(`${service} ${name}`, () => {
      const { shapes } = finalizedModels[service];
      const shape = shapes[`com.cloudflare.${service}#${name}`];
      const target = shape.member?.target ?? shape.members!.result.target!;
      expect(target).not.toBe("smithy.api#Document");
      const union = shapes[target];
      expect(union.type).toBe("union");
      expect(Object.keys(union.members!)).toHaveLength(count);
      for (const member of Object.values(union.members!)) {
        expect(shapes[member.target!].type).toBe("structure");
      }
    });
  }
});
