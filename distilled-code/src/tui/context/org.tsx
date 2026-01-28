/**
 * Organization Context
 *
 * Provides organization configuration (agents, channels, groups) to the TUI components.
 * Replaces the simpler RegistryContext with full organization support.
 */

import { createContext, useContext, type JSX } from "solid-js";
import type { Agent } from "../../agent.ts";
import type { Channel } from "../../chat/channel.ts";
import type { GroupChat } from "../../chat/group-chat.ts";
import type { OrgConfig } from "../../state/org.ts";

/**
 * Organization context value
 */
export interface OrgContextValue {
  /**
   * Available agent definitions
   */
  agents: readonly Agent[];

  /**
   * Available channel definitions
   */
  channels: readonly Channel[];

  /**
   * Available group chat definitions
   */
  groupChats: readonly GroupChat[];

  /**
   * Get an agent by ID
   */
  getAgent: (id: string) => Agent | undefined;

  /**
   * Get a channel by ID
   */
  getChannel: (id: string) => Channel | undefined;

  /**
   * Get a group chat by ID
   */
  getGroupChat: (id: string) => GroupChat | undefined;

  /**
   * Get participants of a group chat (agent IDs)
   */
  getGroupChatMembers: (groupChatId: string) => readonly string[];
}

const OrgContext = createContext<OrgContextValue>();

/**
 * Props for OrgProvider
 */
export interface OrgProviderProps {
  /**
   * Organization configuration
   */
  config: OrgConfig;

  /**
   * Child components
   */
  children: JSX.Element;
}

/**
 * Extract agent members from a GroupChat's references
 */
function extractGroupChatMembers(groupChat: GroupChat, agentMap: Map<string, Agent>): readonly string[] {
  const members: string[] = [];
  for (const ref of groupChat.references) {
    // References could be Agent classes or thunks
    const resolved = typeof ref === "function" && "id" in ref ? ref : undefined;
    if (resolved && agentMap.has(resolved.id)) {
      members.push(resolved.id);
    }
  }
  return members;
}

/**
 * Provider component for organization context
 */
export function OrgProvider(props: OrgProviderProps) {
  const { config } = props;

  // Create lookup maps
  const agentMap = new Map<string, Agent>();
  for (const agent of config.agents) {
    agentMap.set(agent.id, agent);
  }

  const channelMap = new Map<string, Channel>();
  for (const channel of config.channels) {
    channelMap.set(channel.id, channel);
  }

  const groupChatMap = new Map<string, GroupChat>();
  for (const groupChat of config.groupChats) {
    groupChatMap.set(groupChat.id, groupChat);
  }

  // Pre-compute group chat members
  const groupChatMembersMap = new Map<string, readonly string[]>();
  for (const groupChat of config.groupChats) {
    groupChatMembersMap.set(groupChat.id, extractGroupChatMembers(groupChat, agentMap));
  }

  const value: OrgContextValue = {
    agents: config.agents,
    channels: config.channels,
    groupChats: config.groupChats,
    getAgent: (id: string) => agentMap.get(id),
    getChannel: (id: string) => channelMap.get(id),
    getGroupChat: (id: string) => groupChatMap.get(id),
    getGroupChatMembers: (groupChatId: string) => groupChatMembersMap.get(groupChatId) ?? [],
  };

  return (
    <OrgContext.Provider value={value}>
      {props.children}
    </OrgContext.Provider>
  );
}

/**
 * Hook to access the organization context
 */
export function useOrg(): OrgContextValue {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
}

/**
 * Hook to get agents (convenience wrapper)
 */
export function useAgents(): readonly Agent[] {
  return useOrg().agents;
}

/**
 * Hook to get channels (convenience wrapper)
 */
export function useChannels(): readonly Channel[] {
  return useOrg().channels;
}

/**
 * Hook to get group chats (convenience wrapper)
 */
export function useGroupChats(): readonly GroupChat[] {
  return useOrg().groupChats;
}
