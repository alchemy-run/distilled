import { defineFragment, type Fragment } from "../fragment.ts";

/**
 * Group type - an organizational unit containing agents.
 * Extends Fragment for template support.
 */
export interface Group<
  ID extends string = string,
  References extends any[] = any[],
> extends Fragment<"group", ID, References> {}

/**
 * Create a Group - an organizational unit containing agents.
 *
 * Groups can contain:
 * - Agents: Direct members of the group
 * - Other Groups: Nested groups (transitive membership)
 * - Roles: All members gain these roles
 *
 * Groups can be referenced in Channels/GroupChats to add all members
 * as participants. This enables efficient management of large teams.
 *
 * @example
 * ```typescript
 * // Define agents
 * class Alice extends Agent("alice")`Senior engineer` {}
 * class Bob extends Agent("bob")`Junior engineer` {}
 *
 * // Create a group with agents
 * class Engineering extends Group("engineering")`
 *   The engineering team.
 *   ${Alice}
 *   ${Bob}
 * ` {}
 *
 * // Nested groups
 * class Platform extends Group("platform")`
 *   Platform team includes engineering.
 *   ${Engineering}
 *   ${Carol}
 * ` {}
 *
 * // Group with role assignment
 * class AdminGroup extends Group("admins")`
 *   Admin team with ${Admin} privileges.
 *   ${Carol}
 * ` {}
 *
 * // Use group in channel
 * class EngineeringChannel extends Channel("eng")`
 *   Engineering discussions.
 *   ${Engineering}
 * ` {}
 * // Channel participants: Alice, Bob (expanded from Engineering)
 * ```
 */
export const Group = defineFragment("group")();

/**
 * Type guard for Group entities
 */
export const isGroup = Group.is<Group>;
