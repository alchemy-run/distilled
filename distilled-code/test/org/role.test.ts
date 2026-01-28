import { describe, expect, it } from "vitest";
import { Agent } from "../../src/agent.ts";
import { input } from "../../src/input.ts";
import {
  Role,
  getInheritedRoles,
  getTools,
  isRole,
} from "../../src/org/index.ts";
import { getAgentTools, getRoles } from "../../src/org/queries.ts";
import { output } from "../../src/output.ts";
import { tool } from "../../src/tool/tool.ts";

// Helper to create a minimal tool for testing
const createTool = (id: string) =>
  tool(id)`${id} tool ${input("x")} ${output("result")}`(function* ({ x }) {
    return { result: x };
  });

describe("Role", () => {
  describe("fragment creation", () => {
    it("creates a role with correct type and id", () => {
      class Admin extends Role("admin")`Full administrative access` {}

      expect(Admin.type).toBe("role");
      expect(Admin.id).toBe("admin");
    });

    it("isRole identifies roles correctly", () => {
      class Admin extends Role("admin")`Admin role` {}
      class TestAgent extends Agent("test")`Test agent` {}

      expect(isRole(Admin)).toBe(true);
      expect(isRole(TestAgent)).toBe(false);
      expect(isRole(null)).toBe(false);
      expect(isRole({})).toBe(false);
    });
  });

  describe("getTools - collects tools from role", () => {
    it("collects direct tools", () => {
      const ReadTool = createTool("read");
      const WriteTool = createTool("write");

      class Editor extends Role("editor")`
        Editor with read/write access.
        ${ReadTool}
        ${WriteTool}
      ` {}

      const tools = getTools(Editor);

      expect(tools).toHaveLength(2);
      expect(tools).toContain(ReadTool);
      expect(tools).toContain(WriteTool);
    });

    it("collects inherited tools from parent roles", () => {
      const ReadTool = createTool("read");
      const WriteTool = createTool("write");
      const DeleteTool = createTool("delete");

      class Reader extends Role("reader")`Read access: ${ReadTool}` {}
      class Writer extends Role("writer")`
        Write access: ${WriteTool}
        Inherits: ${Reader}
      ` {}
      class Admin extends Role("admin")`
        Full access: ${DeleteTool}
        Inherits: ${Writer}
      ` {}

      const readerTools = getTools(Reader);
      expect(readerTools).toEqual([ReadTool]);

      const writerTools = getTools(Writer);
      expect(writerTools).toHaveLength(2);
      expect(writerTools).toContain(WriteTool);
      expect(writerTools).toContain(ReadTool);

      const adminTools = getTools(Admin);
      expect(adminTools).toHaveLength(3);
      expect(adminTools).toContain(DeleteTool);
      expect(adminTools).toContain(WriteTool);
      expect(adminTools).toContain(ReadTool);
    });

    it("handles diamond inheritance (deduplicates tools)", () => {
      const BaseTool = createTool("base");
      const LeftTool = createTool("left");
      const RightTool = createTool("right");

      class Base extends Role("base")`${BaseTool}` {}
      class Left extends Role("left")`${LeftTool}, ${Base}` {}
      class Right extends Role("right")`${RightTool}, ${Base}` {}
      class Diamond extends Role("diamond")`${Left}, ${Right}` {}

      const tools = getTools(Diamond);

      // BaseTool should only appear once due to visited tracking
      expect(tools.filter((t) => t === BaseTool)).toHaveLength(1);
      expect(tools).toContain(LeftTool);
      expect(tools).toContain(RightTool);
      expect(tools).toContain(BaseTool);
    });

    it("handles circular role references without infinite loop", () => {
      class RoleA extends Role("role-a")`Role A: ${() => RoleB}` {}
      class RoleB extends Role("role-b")`Role B: ${() => RoleA}` {}

      // Should not throw or loop infinitely
      const toolsA = getTools(RoleA);
      const toolsB = getTools(RoleB);

      expect(toolsA).toEqual([]);
      expect(toolsB).toEqual([]);
    });
  });

  describe("getInheritedRoles - collects parent roles", () => {
    it("collects direct parent roles", () => {
      class Base extends Role("base")`Base` {}
      class Extended extends Role("extended")`Extends ${Base}` {}

      const inherited = getInheritedRoles(Extended);

      expect(inherited).toHaveLength(1);
      expect(inherited).toContain(Base);
    });

    it("collects transitive parent roles", () => {
      class GrandParent extends Role("grandparent")`GrandParent` {}
      class Parent extends Role("parent")`Parent: ${GrandParent}` {}
      class Child extends Role("child")`Child: ${Parent}` {}

      const inherited = getInheritedRoles(Child);

      expect(inherited).toHaveLength(2);
      expect(inherited).toContain(Parent);
      expect(inherited).toContain(GrandParent);
    });
  });

  describe("getRoles - collects roles from agent", () => {
    it("collects roles referenced by agent", () => {
      class Admin extends Role("admin")`Admin` {}
      class Reviewer extends Role("reviewer")`Reviewer` {}
      class Alice extends Agent("alice")`
        Alice has:
        ${Admin}
        ${Reviewer}
      ` {}

      const roles = getRoles(Alice);

      expect(roles).toHaveLength(2);
      expect(roles).toContain(Admin);
      expect(roles).toContain(Reviewer);
    });

    it("returns empty for agent without roles", () => {
      class Bob extends Agent("bob")`Bob has no roles` {}

      const roles = getRoles(Bob);

      expect(roles).toEqual([]);
    });
  });

  describe("getAgentTools - collects tools from agent including roles", () => {
    it("collects direct tools from agent", () => {
      const DirectTool = createTool("direct");
      class Alice extends Agent("alice")`Alice with ${DirectTool}` {}

      const tools = getAgentTools(Alice);

      expect(tools).toHaveLength(1);
      expect(tools).toContain(DirectTool);
    });

    it("collects tools from agent roles", () => {
      const RoleTool = createTool("role-tool");
      class Admin extends Role("admin")`${RoleTool}` {}
      class Alice extends Agent("alice")`Alice is ${Admin}` {}

      const tools = getAgentTools(Alice);

      expect(tools).toHaveLength(1);
      expect(tools).toContain(RoleTool);
    });

    it("collects tools from both direct and roles", () => {
      const DirectTool = createTool("direct");
      const RoleTool = createTool("role-tool");
      class Admin extends Role("admin")`${RoleTool}` {}
      class Alice extends Agent("alice")`
        ${Admin}
        ${DirectTool}
      ` {}

      const tools = getAgentTools(Alice);

      expect(tools).toHaveLength(2);
      expect(tools).toContain(DirectTool);
      expect(tools).toContain(RoleTool);
    });

    it("collects tools from inherited roles", () => {
      const BaseTool = createTool("base");
      const ExtTool = createTool("ext");

      class Base extends Role("base")`${BaseTool}` {}
      class Extended extends Role("extended")`${ExtTool}, ${Base}` {}
      class Alice extends Agent("alice")`${Extended}` {}

      const tools = getAgentTools(Alice);

      expect(tools).toHaveLength(2);
      expect(tools).toContain(BaseTool);
      expect(tools).toContain(ExtTool);
    });
  });
});
