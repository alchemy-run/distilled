/**
 * Chat entities for Discord/Slack-like communication.
 *
 * This module provides:
 * - Channel - Named channels with multiple agent participants (like Slack channels)
 * - GroupChat - Group chats for ad-hoc collaboration (like Discord group DMs)
 * - DM - Utilities for 1:1 direct messages between agents
 *
 * All communication types support threaded conversations.
 */

export { Channel, isChannel, type Channel as ChannelType } from "./channel.ts";
export { DM } from "./dm.ts";
export {
  GroupChat,
  isGroupChat,
  type GroupChat as GroupChatType,
} from "./group-chat.ts";
