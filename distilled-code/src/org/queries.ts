/**
 * Query functions for organizational fragments.
 *
 * These provide lazy, on-demand queries that use collect-references
 * to traverse the fragment graph. Use these in the TUI to get
 * membership, tools, etc.
 */

import { isAgent, type Agent } from "../agent.ts";
import { isTool, type Tool } from "../tool/tool.ts";
import { isToolkit, type Toolkit } from "../toolkit/toolkit.ts";
import { collectReferences } from "../util/collect-references.ts";
import { isGroup, type Group } from "./group.ts";
import { isRole, type Role } from "./role.ts";

/**
 * Get all agent members of a group, including from nested groups.
 *
 * This traverses through nested Group references to collect all Agents.
 *
 * @example
 * ```typescript
 * class Alice extends Agent("alice")`Alice` {}
 * class Bob extends Agent("bob")`Bob` {}
 * class SubTeam extends Group("sub")`${Alice}` {}
 * class Team extends Group("team")`${SubTeam}, ${Bob}` {}
 *
 * const members = getMembers(Team);
 * // [Alice, Bob]
 * ```
 */
export const getMembers = (group: Group): Agent[] =>
  collectReferences(group.references, {
    matches: isAgent,
    shouldRecurse: isGroup,
  });

/**
 * Get all tools from a role, including inherited tools from parent roles.
 *
 * This traverses through Role references to collect all Tools/Toolkits.
 *
 * @example
 * ```typescript
 * const ReadTool = tool("read")`Read ${input("file", S.String)}`;
 * const WriteTool = tool("write")`Write ${input("file", S.String)}`;
 *
 * class Reader extends Role("reader")`${ReadTool}` {}
 * class Writer extends Role("writer")`${WriteTool}, inherits ${Reader}` {}
 *
 * const tools = getTools(Writer);
 * // [WriteTool, ReadTool]
 * ```
 */
export const getTools = (role: Role): (Tool | Toolkit)[] =>
  collectReferences(role.references, {
    matches: (v): v is Tool | Toolkit => isTool(v) || isToolkit(v),
    shouldRecurse: isRole,
  });

/**
 * Get all roles from an agent's references.
 *
 * @example
 * ```typescript
 * class Admin extends Role("admin")`Admin` {}
 * class Reviewer extends Role("reviewer")`Reviewer` {}
 * class Alice extends Agent("alice")`Has ${Admin} and ${Reviewer}` {}
 *
 * const roles = getRoles(Alice);
 * // [Admin, Reviewer]
 * ```
 */
export const getRoles = (agent: Agent): Role[] =>
  collectReferences(agent.references, {
    matches: isRole,
  });

/**
 * Get all tools from an agent, including from roles and inherited roles.
 *
 * @example
 * ```typescript
 * const ReviewTool = tool("review")`Review ${input("code", S.String)}`;
 * const DirectTool = tool("direct")`Direct ${input("x", S.String)}`;
 *
 * class Reviewer extends Role("reviewer")`${ReviewTool}` {}
 * class Alice extends Agent("alice")`Has ${Reviewer} and ${DirectTool}` {}
 *
 * const tools = getAgentTools(Alice);
 * // [DirectTool, ReviewTool]
 * ```
 */
export const getAgentTools = (agent: Agent): (Tool | Toolkit)[] =>
  collectReferences(agent.references, {
    matches: (v): v is Tool | Toolkit => isTool(v) || isToolkit(v),
    shouldRecurse: isRole,
  });

/**
 * Get all inherited roles from a role (the roles it extends).
 *
 * @example
 * ```typescript
 * class Base extends Role("base")`Base` {}
 * class Extended extends Role("extended")`Extends ${Base}` {}
 *
 * const inherited = getInheritedRoles(Extended);
 * // [Base]
 * ```
 */
export const getInheritedRoles = (role: Role): Role[] =>
  collectReferences(role.references, {
    matches: isRole,
    shouldRecurse: isRole,
  });

/**
 * Get all nested groups from a group (groups referenced by this group).
 *
 * @example
 * ```typescript
 * class SubTeam extends Group("sub")`Sub team` {}
 * class Team extends Group("team")`Includes ${SubTeam}` {}
 *
 * const nested = getNestedGroups(Team);
 * // [SubTeam]
 * ```
 */
export const getNestedGroups = (group: Group): Group[] =>
  collectReferences(group.references, {
    matches: isGroup,
    shouldRecurse: isGroup,
  });

/**
 * Get all roles assigned to a group's members.
 *
 * @example
 * ```typescript
 * class Admin extends Role("admin")`Admin` {}
 * class Alice extends Agent("alice")`Alice` {}
 * class AdminGroup extends Group("admins")`${Alice} with ${Admin}` {}
 *
 * const roles = getGroupRoles(AdminGroup);
 * // [Admin]
 * ```
 */
export const getGroupRoles = (group: Group): Role[] =>
  collectReferences(group.references, {
    matches: isRole,
  });
