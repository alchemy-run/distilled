import { describe, expect, it } from "vitest";
import { Agent } from "../../src/agent.ts";
import {
  Group,
  isGroup,
  getMembers,
  getNestedGroups,
  getGroupRoles,
} from "../../src/org/index.ts";
import { Role } from "../../src/org/role.ts";

describe("Group", () => {
  describe("fragment creation", () => {
    it("creates a group with correct type and id", () => {
      class Engineering extends Group("engineering")`The engineering team` {}

      expect(Engineering.type).toBe("group");
      expect(Engineering.id).toBe("engineering");
    });

    it("isGroup identifies groups correctly", () => {
      class Team extends Group("team")`A team` {}
      class TestAgent extends Agent("test")`Test agent` {}
      class TestRole extends Role("test")`Test role` {}

      expect(isGroup(Team)).toBe(true);
      expect(isGroup(TestAgent)).toBe(false);
      expect(isGroup(TestRole)).toBe(false);
      expect(isGroup(null)).toBe(false);
      expect(isGroup({})).toBe(false);
    });
  });

  describe("getMembers - collects agents from group", () => {
    it("collects direct agent members", () => {
      class Alice extends Agent("alice")`Alice` {}
      class Bob extends Agent("bob")`Bob` {}
      class Team extends Group("team")`
        Team members:
        ${Alice}
        ${Bob}
      ` {}

      const members = getMembers(Team);

      expect(members).toHaveLength(2);
      expect(members).toContain(Alice);
      expect(members).toContain(Bob);
    });

    it("collects members from nested groups", () => {
      class Alice extends Agent("alice")`Alice` {}
      class Bob extends Agent("bob")`Bob` {}
      class Carol extends Agent("carol")`Carol` {}

      class SubTeam extends Group("sub")`${Alice}, ${Bob}` {}
      class MainTeam extends Group("main")`
        ${SubTeam}
        ${Carol}
      ` {}

      const members = getMembers(MainTeam);

      expect(members).toHaveLength(3);
      expect(members).toContain(Alice);
      expect(members).toContain(Bob);
      expect(members).toContain(Carol);
    });

    it("collects members from deeply nested groups", () => {
      class Alice extends Agent("alice")`Alice` {}
      class Bob extends Agent("bob")`Bob` {}
      class Carol extends Agent("carol")`Carol` {}

      class Level3 extends Group("level3")`${Alice}` {}
      class Level2 extends Group("level2")`${Level3}, ${Bob}` {}
      class Level1 extends Group("level1")`${Level2}, ${Carol}` {}

      const members = getMembers(Level1);

      expect(members).toHaveLength(3);
      expect(members).toContain(Alice);
      expect(members).toContain(Bob);
      expect(members).toContain(Carol);
    });

    it("deduplicates members appearing in multiple groups", () => {
      class Alice extends Agent("alice")`Alice` {}

      class Team1 extends Group("team1")`${Alice}` {}
      class Team2 extends Group("team2")`${Alice}` {}
      class AllTeams extends Group("all")`${Team1}, ${Team2}` {}

      const members = getMembers(AllTeams);

      // Alice should only appear once
      expect(members).toHaveLength(1);
      expect(members).toContain(Alice);
    });

    it("handles circular group references without infinite loop", () => {
      class Alice extends Agent("alice")`Alice` {}

      class GroupA extends Group("group-a")`${Alice}, ${() => GroupB}` {}
      class GroupB extends Group("group-b")`${() => GroupA}` {}

      // Should not throw or loop infinitely
      const membersA = getMembers(GroupA);
      const membersB = getMembers(GroupB);

      expect(membersA).toContain(Alice);
      expect(membersB).toContain(Alice);
    });

    it("returns empty for group with no agents", () => {
      class EmptyGroup extends Group("empty")`An empty group` {}

      const members = getMembers(EmptyGroup);

      expect(members).toEqual([]);
    });
  });

  describe("getNestedGroups - collects child groups", () => {
    it("collects direct nested groups", () => {
      class SubTeam extends Group("sub")`Sub team` {}
      class MainTeam extends Group("main")`Includes ${SubTeam}` {}

      const nested = getNestedGroups(MainTeam);

      expect(nested).toHaveLength(1);
      expect(nested).toContain(SubTeam);
    });

    it("collects transitively nested groups", () => {
      class Level3 extends Group("level3")`Level 3` {}
      class Level2 extends Group("level2")`${Level3}` {}
      class Level1 extends Group("level1")`${Level2}` {}

      const nested = getNestedGroups(Level1);

      expect(nested).toHaveLength(2);
      expect(nested).toContain(Level2);
      expect(nested).toContain(Level3);
    });

    it("returns empty for group with no nested groups", () => {
      class Alice extends Agent("alice")`Alice` {}
      class FlatGroup extends Group("flat")`Just ${Alice}` {}

      const nested = getNestedGroups(FlatGroup);

      expect(nested).toEqual([]);
    });
  });

  describe("getGroupRoles - collects roles assigned to group", () => {
    it("collects roles referenced by group", () => {
      class Admin extends Role("admin")`Admin` {}
      class Reviewer extends Role("reviewer")`Reviewer` {}
      class Alice extends Agent("alice")`Alice` {}

      class AdminGroup extends Group("admins")`
        ${Alice}
        Roles: ${Admin}, ${Reviewer}
      ` {}

      const roles = getGroupRoles(AdminGroup);

      expect(roles).toHaveLength(2);
      expect(roles).toContain(Admin);
      expect(roles).toContain(Reviewer);
    });

    it("returns empty for group without roles", () => {
      class Alice extends Agent("alice")`Alice` {}
      class NoRoleGroup extends Group("no-role")`${Alice}` {}

      const roles = getGroupRoles(NoRoleGroup);

      expect(roles).toEqual([]);
    });
  });

  describe("complex organization scenarios", () => {
    it("models a realistic org structure", () => {
      // Agents
      class CEO extends Agent("ceo")`CEO` {}
      class CTO extends Agent("cto")`CTO` {}
      class VPE extends Agent("vpe")`VP Engineering` {}
      class SeniorDev extends Agent("senior-dev")`Senior Developer` {}
      class JuniorDev extends Agent("junior-dev")`Junior Developer` {}

      // Roles
      class Executive extends Role("executive")`Executive` {}
      class Manager extends Role("manager")`Manager` {}
      class Developer extends Role("developer")`Developer` {}

      // Groups
      class DevTeam extends Group("dev-team")`
        Development team:
        ${SeniorDev}
        ${JuniorDev}
        Role: ${Developer}
      ` {}

      class Engineering extends Group("engineering")`
        Engineering org:
        ${VPE}
        ${DevTeam}
        Role: ${Manager}
      ` {}

      class Leadership extends Group("leadership")`
        ${CEO}
        ${CTO}
        Role: ${Executive}
      ` {}

      // Assert DevTeam members
      const devMembers = getMembers(DevTeam);
      expect(devMembers).toHaveLength(2);
      expect(devMembers).toContain(SeniorDev);
      expect(devMembers).toContain(JuniorDev);

      // Assert Engineering includes DevTeam members + VPE
      const engMembers = getMembers(Engineering);
      expect(engMembers).toHaveLength(3);
      expect(engMembers).toContain(VPE);
      expect(engMembers).toContain(SeniorDev);
      expect(engMembers).toContain(JuniorDev);

      // Assert Leadership members
      const leaderMembers = getMembers(Leadership);
      expect(leaderMembers).toHaveLength(2);
      expect(leaderMembers).toContain(CEO);
      expect(leaderMembers).toContain(CTO);

      // Assert group roles
      expect(getGroupRoles(DevTeam)).toContain(Developer);
      expect(getGroupRoles(Engineering)).toContain(Manager);
      expect(getGroupRoles(Leadership)).toContain(Executive);

      // Assert nested groups
      expect(getNestedGroups(Engineering)).toContain(DevTeam);
    });
  });
});
