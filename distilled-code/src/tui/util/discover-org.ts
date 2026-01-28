/**
 * Utility to recursively discover all organization entities from a root agent or list of agents.
 *
 * Walks the entire reference graph to find all Agents, Channels, GroupChats, Roles, and Groups.
 */

import { isAgent, type Agent } from "../../agent.ts";
import { isChannel, type Channel } from "../../chat/channel.ts";
import { isGroupChat, type GroupChat } from "../../chat/group-chat.ts";
import { isFragment } from "../../fragment.ts";
import { isGroup, type Group } from "../../org/group.ts";
import { isRole, type Role } from "../../org/role.ts";
import { resolveThunk } from "../../util/render-template.ts";

/**
 * Result of discovering all organization entities from the reference graph.
 */
export interface DiscoveredOrg {
  /**
   * All discovered agents, sorted by ID.
   */
  agents: Agent[];

  /**
   * All discovered channels, sorted by ID.
   */
  channels: Channel[];

  /**
   * All discovered group chats, sorted by ID.
   */
  groupChats: GroupChat[];

  /**
   * All discovered roles, sorted by ID.
   */
  roles: Role[];

  /**
   * All discovered groups, sorted by ID.
   */
  groups: Group[];
}

/**
 * Recursively discover all organization entities starting from a root agent or list of agents.
 *
 * This walks the entire reference graph (including through Channels, GroupChats,
 * Roles, Groups, Files, and any other Fragment types) to find all entity types.
 *
 * @example
 * ```typescript
 * import { discoverOrg } from "distilled-code/tui";
 *
 * class CEO extends Agent("ceo")`Reports: ${() => CTO}, ${() => VPE}` {}
 * class CTO extends Agent("cto")`Tech lead` {}
 * class Engineering extends Channel("engineering")`Tech discussions` {}
 *
 * const org = discoverOrg([CEO]);
 * // org.agents = [CEO, CTO, VPE]
 * // org.channels = [Engineering]
 * ```
 */
export function discoverOrg(roots: Agent | Agent[]): DiscoveredOrg {
  const agents = new Map<string, Agent>();
  const channels = new Map<string, Channel>();
  const groupChats = new Map<string, GroupChat>();
  const roles = new Map<string, Role>();
  const groups = new Map<string, Group>();
  const visited = new Set<unknown>();

  const queue: unknown[] = Array.isArray(roots) ? [...roots] : [roots];

  while (queue.length > 0) {
    const item = queue.shift()!;

    // Resolve thunks first
    const resolved = resolveThunk(item);
    if (resolved === undefined || resolved === null) {
      continue;
    }

    // Skip if we've already processed this resolved value
    if (visited.has(resolved)) {
      continue;
    }
    visited.add(resolved);

    // If it's an agent, add it and queue its references
    if (isAgent(resolved)) {
      if (!agents.has(resolved.id)) {
        agents.set(resolved.id, resolved);
      }
      for (const ref of resolved.references) {
        queue.push(ref);
      }
      continue;
    }

    // If it's a Channel, add it and queue its references
    if (isChannel(resolved)) {
      if (!channels.has(resolved.id)) {
        channels.set(resolved.id, resolved);
      }
      for (const ref of resolved.references) {
        queue.push(ref);
      }
      continue;
    }

    // If it's a GroupChat, add it and queue its references
    if (isGroupChat(resolved)) {
      if (!groupChats.has(resolved.id)) {
        groupChats.set(resolved.id, resolved);
      }
      for (const ref of resolved.references) {
        queue.push(ref);
      }
      continue;
    }

    // If it's a Role, add it and queue its references
    if (isRole(resolved)) {
      if (!roles.has(resolved.id)) {
        roles.set(resolved.id, resolved);
      }
      for (const ref of resolved.references) {
        queue.push(ref);
      }
      continue;
    }

    // If it's a Group, add it and queue its references
    if (isGroup(resolved)) {
      if (!groups.has(resolved.id)) {
        groups.set(resolved.id, resolved);
      }
      for (const ref of resolved.references) {
        queue.push(ref);
      }
      continue;
    }

    // If it's any other Fragment, queue its references
    if (isFragment(resolved)) {
      for (const ref of resolved.references) {
        queue.push(ref);
      }
      continue;
    }

    // If it's an array, queue all items
    if (Array.isArray(resolved)) {
      for (const ref of resolved) {
        queue.push(ref);
      }
      continue;
    }

    // If it's a plain object, queue all values
    if (typeof resolved === "object" && resolved !== null) {
      for (const value of Object.values(resolved)) {
        queue.push(value);
      }
    }
  }

  // Return all entities in stable order (sorted by ID)
  return {
    agents: Array.from(agents.values()).sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
    channels: Array.from(channels.values()).sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
    groupChats: Array.from(groupChats.values()).sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
    roles: Array.from(roles.values()).sort((a, b) => a.id.localeCompare(b.id)),
    groups: Array.from(groups.values()).sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
  };
}
