/**
 * Agent Registry Context
 *
 * Provides available agent, channel, and group chat definitions to the TUI components.
 * Automatically discovers all entities from the reference graph.
 */

import { createContext, useContext, type JSX } from "solid-js";
import type { Agent } from "../../agent.ts";
import type { Channel } from "../../chat/channel.ts";
import type { GroupChat } from "../../chat/group-chat.ts";
import { discoverOrg } from "../util/discover-org.ts";

/**
 * Registry context value
 */
export interface RegistryContextValue {
  /**
   * Available agent definitions (all discovered agents)
   */
  agents: Agent[];

  /**
   * Available channel definitions (all discovered channels)
   */
  channels: Channel[];

  /**
   * Available group chat definitions (all discovered group chats)
   */
  groupChats: GroupChat[];

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
}

const RegistryContext = createContext<RegistryContextValue>();

/**
 * Props for RegistryProvider
 */
export interface RegistryProviderProps {
  /**
   * Root agent definitions - will discover all referenced agents recursively
   */
  agents: Agent[];

  /**
   * Child components
   */
  children: JSX.Element;
}

/**
 * Provider component for agent registry.
 *
 * Automatically walks the reference graph starting from the provided agents
 * to discover ALL entities (agents, channels, group chats) in the system.
 */
export function RegistryProvider(props: RegistryProviderProps) {
  // Discover all entities from the reference graph
  const org = discoverOrg(props.agents);

  const agentMap = new Map<string, Agent>();
  for (const agent of org.agents) {
    agentMap.set(agent.id, agent);
  }

  const channelMap = new Map<string, Channel>();
  for (const channel of org.channels) {
    channelMap.set(channel.id, channel);
  }

  const groupChatMap = new Map<string, GroupChat>();
  for (const groupChat of org.groupChats) {
    groupChatMap.set(groupChat.id, groupChat);
  }

  const value: RegistryContextValue = {
    agents: org.agents,
    channels: org.channels,
    groupChats: org.groupChats,
    getAgent: (id: string) => agentMap.get(id),
    getChannel: (id: string) => channelMap.get(id),
    getGroupChat: (id: string) => groupChatMap.get(id),
  };

  return (
    <RegistryContext.Provider value={value}>
      {props.children}
    </RegistryContext.Provider>
  );
}

/**
 * Hook to access the agent registry
 */
export function useRegistry(): RegistryContextValue {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error("useRegistry must be used within a RegistryProvider");
  }
  return context;
}
