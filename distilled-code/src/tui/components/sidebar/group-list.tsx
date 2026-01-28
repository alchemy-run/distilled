/**
 * Group List Component
 *
 * Displays list of group chats.
 */

import { For } from "solid-js";
import { useGroupChats, useOrg } from "../../context/org.tsx";

export interface GroupListProps {
  /**
   * Currently selected group chat ID
   */
  selectedGroupChatId?: string;

  /**
   * Callback when a group chat is selected
   */
  onSelectGroupChat?: (groupChatId: string) => void;
}

/**
 * List of available group chats
 */
export function GroupList(props: GroupListProps) {
  const groupChats = useGroupChats();
  const org = useOrg();

  return (
    <box flexDirection="column" width="100%">
      <For each={groupChats}>
        {(groupChat) => {
          const isSelected = () => props.selectedGroupChatId === groupChat.id;
          const members = () => org.getGroupChatMembers(groupChat.id);

          return (
            <box
              flexDirection="row"
              width="100%"
              paddingLeft={1}
              paddingRight={1}
              backgroundColor={isSelected() ? "#2a2a4e" : undefined}
            >
              <text fg={isSelected() ? "white" : "magenta"}>
                @{"{"}
                {members().join(", ")}
                {"}"}
              </text>
            </box>
          );
        }}
      </For>
    </box>
  );
}
