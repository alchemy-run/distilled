> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat element

> Display a chat in your app

The chat element renders a real-time chat UI connected to a specific channel.

### Basic usage

Pass a `channelId` to connect to a specific channel, DM, or support chat.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    "use client";

    import { useMemo } from "react";
    import {
    	ChatElement,
    	ChatSession,
    	Elements,
    } from "@whop/embedded-components-react-js";
    import { loadWhopElements } from "@whop/embedded-components-vanilla-js";
    import type { ChatElementOptions } from "@whop/embedded-components-vanilla-js/types";

    const elements = loadWhopElements();

    async function getToken() {
    	const response = await fetch("/api/token");
    	const data = await response.json();
    	return data.token;
    }

    export function ChatPage() {
    	const chatOptions: ChatElementOptions = useMemo(() => {
    		return {
    			channelId: "chat_feed_XXXXXXXXXXXXXX",
    		};
    	}, []);

    	return (
    		<Elements elements={elements}>
    			<ChatSession token={getToken}>
    				<ChatElement
    					options={chatOptions}
    					style={{ height: "100dvh", width: "100%" }}
    				/>
    			</ChatSession>
    		</Elements>
    	);
    }
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    import { loadWhopElements } from "@whop/embedded-components-vanilla-js";

    async function getToken() {
    	const response = await fetch("/api/token");
    	const data = await response.json();
    	return data.token;
    }

    const whopElements = await loadWhopElements();

    const session = whopElements.createChatSession({
    	token: getToken,
    });

    const chatElement = session.createElement("chat-element", {
    	channelId: "chat_feed_XXXXXXXXXXXXXX",
    });

    chatElement.mount("#chat-container");
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    import SwiftUI
    import WhopElements

    struct ChatView: View {
        var body: some View {
            WhopChatView(
                channelId: "chat_feed_XXXXXXXXXXXXXX",
                style: .imessage
            )
        }
    }
    ```
  </Tab>
</Tabs>

### Deep linking to messages

To scroll to and highlight a specific message, pass `deeplinkToPostId`. The view will automatically navigate to that message.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    const chatOptions: ChatElementOptions = useMemo(() => {
    	return {
    		channelId: "chat_feed_XXXXXXXXXXXXXX",
    		deeplinkToPostId: "post_XXXXXXXXXXXXXX",
    	};
    }, []);

    <ChatElement options={chatOptions} />;
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    const chatElement = session.createElement("chat-element", {
    	channelId: "chat_feed_XXXXXXXXXXXXXX",
    	deeplinkToPostId: "post_XXXXXXXXXXXXXX",
    });

    chatElement.mount("#chat-container");
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    struct ChatView: View {
        @State private var targetPostId: String? = nil

        var body: some View {
            WhopChatView(
                channelId: "chat_feed_XXXXXXXXXXXXXX",
                deeplinkToPostId: targetPostId,
                style: .imessage
            )
        }
    }
    ```
  </Tab>
</Tabs>

### Event handling

Use your platform's event callback to listen for profile selections, link selections, and sent messages.

<Tabs>
  <Tab title="React">
    | Event             | Detail                                               | Description                                         |
    | ----------------- | ---------------------------------------------------- | --------------------------------------------------- |
    | `profileClick`    | `{ id: string }`                                     | Emitted when the user selects a profile             |
    | `linkClick`       | `{ url: string }`                                    | Emitted when the user selects a link                |
    | `messageSent`     | `{ id: string, content: string, channelId: string }` | Emitted when the user sends a message               |
    | `experienceClick` | `{ id: string }`                                     | Emitted when the user selects an experience mention |

    ```tsx theme={null}
    import { useCallback, useMemo } from "react";
    import type {
    	ChatElementEvent,
    	ChatElementOptions,
    } from "@whop/embedded-components-vanilla-js/types";

    const handleChatEvent = useCallback((event: ChatElementEvent) => {
    	switch (event.type) {
    		case "profileClick":
    			console.log("Profile clicked:", event.detail.id);
    			break;

    		case "linkClick":
    			console.log("Link clicked:", event.detail.url);
    			break;

    		case "messageSent":
    			console.log("Message sent:", event.detail.id, event.detail.content, event.detail.channelId);
    			break;

    		case "experienceClick":
    			console.log("Experience clicked:", event.detail.id);
    			break;
    	}
    }, []);

    const chatOptions: ChatElementOptions = useMemo(() => {
    	return {
    		channelId: "chat_feed_XXXXXXXXXXXXXX",
    		onEvent: handleChatEvent,
    	};
    }, [handleChatEvent]);

    <ChatElement options={chatOptions} />;
    ```
  </Tab>

  <Tab title="Vanilla JS">
    | Event             | Detail                                               | Description                                         |
    | ----------------- | ---------------------------------------------------- | --------------------------------------------------- |
    | `profileClick`    | `{ id: string }`                                     | Emitted when the user selects a profile             |
    | `linkClick`       | `{ url: string }`                                    | Emitted when the user selects a link                |
    | `messageSent`     | `{ id: string, content: string, channelId: string }` | Emitted when the user sends a message               |
    | `experienceClick` | `{ id: string }`                                     | Emitted when the user selects an experience mention |

    ```typescript theme={null}
    const chatElement = session.createElement("chat-element", {
    	channelId: "chat_feed_XXXXXXXXXXXXXX",
    });

    chatElement.on("profileClick", (ev) => {
    	console.log("Profile clicked:", ev.detail.id);
    });

    chatElement.on("linkClick", (ev) => {
    	console.log("Link clicked:", ev.detail.url);
    });

    chatElement.on("messageSent", (ev) => {
    	console.log("Message sent:", ev.detail.id, ev.detail.content, ev.detail.channelId);
    });

    chatElement.on("experienceClick", (ev) => {
    	console.log("Experience clicked:", ev.detail.id);
    });

    chatElement.mount("#chat-container");
    ```
  </Tab>

  <Tab title="Swift">
    | Event          | Detail                               | Description                             |
    | -------------- | ------------------------------------ | --------------------------------------- |
    | `.profileTap`  | `username: String`                   | Emitted when the user taps on a profile |
    | `.urlTap`      | `url: String`                        | Emitted when the user taps on a link    |
    | `.messageSent` | `content: String, messageId: String` | Emitted when the user sends a message   |

    ```swift theme={null}
    WhopChatView(
        channelId: "chat_feed_XXXXXXXXXXXXXX",
        style: .imessage,
        onEvent: { event in
            switch event {
            case let .profileTap(username):
                print("Profile tapped: \(username)")
            case let .urlTap(url):
                print("URL tapped: \(url)")
            case let .messageSent(content, messageId):
                print("Message sent: \(messageId) - \(content)")
            }
        }
    )
    ```
  </Tab>
</Tabs>
