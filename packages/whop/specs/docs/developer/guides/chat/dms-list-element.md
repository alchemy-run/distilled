> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# DMs list element

> Display a list of direct message conversations

The DMs list element renders a navigable list of the user's direct message conversations.

### Basic usage

Mount the DMs list and listen for channel selection events to navigate users into a conversation.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    "use client";

    import { useCallback, useMemo, useState } from "react";
    import {
    	ChatSession,
    	DmsListElement,
    	Elements,
    } from "@whop/embedded-components-react-js";
    import { loadWhopElements } from "@whop/embedded-components-vanilla-js";
    import type {
    	DmsListElementEvent,
    	DmsListElementOptions,
    } from "@whop/embedded-components-vanilla-js/types";

    const elements = loadWhopElements();

    async function getToken() {
    	const response = await fetch("/api/token");
    	const data = await response.json();
    	return data.token;
    }

    export function MessagesPage() {
    	const [channelId, setChannelId] = useState<string>();

    	const handleDmsEvent = useCallback((event: DmsListElementEvent) => {
    		switch (event.type) {
    			case "channelSelected":
    				setChannelId(event.detail.id);
    				break;
    		}
    	}, []);

    	const dmsOptions: DmsListElementOptions = useMemo(() => {
    		return {
    			selectedChannel: channelId,
    			onEvent: handleDmsEvent,
    		};
    	}, [channelId, handleDmsEvent]);

    	return (
    		<Elements elements={elements}>
    			<ChatSession token={getToken}>
    				<DmsListElement options={dmsOptions} />
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

    const dmsListElement = session.createElement("dms-list-element", {});

    dmsListElement.on("channelSelected", (ev) => {
    	console.log("Channel selected:", ev.detail.id);
    });

    dmsListElement.mount("#dms-list-container");
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    struct MessagesView: View {
        @State private var selectedChannel: DMChannel?

        var body: some View {
            WhopDMsListView(
                onEvent: { event in
                    switch event {
                    case let .channelSelected(channel):
                        selectedChannel = channel
                    }
                }
            )
            .navigationDestination(item: $selectedChannel) { channel in
                WhopChatView(
                    channelId: channel.id,
                    style: .imessage
                )
                .navigationBarTitleDisplayMode(.inline)
                .navigationTitle(channel.name)
            }
        }
    }
    ```
  </Tab>
</Tabs>

### Account scoping

Filter the DMs list to only show conversations belonging to a specific account by passing a `companyId`. To programmatically create DMs, use the [Create DM Channel](/api-reference/dm-channels/create-dm-channel) endpoint — make sure to pass the same `companyId` so the DM appears in the scoped list.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    const dmsOptions: DmsListElementOptions = useMemo(() => {
    	return {
    		companyId: "biz_xxxx",
    		selectedChannel: channelId,
    		onEvent: handleDmsEvent,
    	};
    }, [channelId, handleDmsEvent]);

    return (
    	<Elements elements={elements}>
    		<ChatSession token={getToken}>
    			<DmsListElement options={dmsOptions} />
    		</ChatSession>
    	</Elements>
    );
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    const dmsListElement = session.createElement("dms-list-element", {
    	companyId: "biz_xxxx",
    });

    dmsListElement.mount("#dms-list-container");
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    WhopDMsListView(
        companyId: "biz_xxxx",
        onEvent: { event in
            switch event {
            case let .channelSelected(channel):
                selectedChannel = channel
            }
        }
    )
    ```
  </Tab>
</Tabs>

### Event handling

Listen for channel selection to open the corresponding chat view.

<Tabs>
  <Tab title="React">
    | Event             | Detail           | Description                             |
    | ----------------- | ---------------- | --------------------------------------- |
    | `channelSelected` | `{ id: string }` | Emitted when the user selects a channel |

    ```tsx theme={null}
    const handleDmsEvent = useCallback((event: DmsListElementEvent) => {
    	switch (event.type) {
    		case "channelSelected":
    			setChannelId(event.detail.id);
    			break;
    	}
    }, []);
    ```
  </Tab>

  <Tab title="Vanilla JS">
    | Event             | Detail           | Description                             |
    | ----------------- | ---------------- | --------------------------------------- |
    | `channelSelected` | `{ id: string }` | Emitted when the user selects a channel |

    ```typescript theme={null}
    dmsListElement.on("channelSelected", (ev) => {
    	console.log("Channel selected:", ev.detail.id);
    });
    ```
  </Tab>

  <Tab title="Swift">
    | Event              | Detail               | Description                          |
    | ------------------ | -------------------- | ------------------------------------ |
    | `.channelSelected` | `channel: DMChannel` | Emitted when the user taps a channel |

    ```swift theme={null}
    WhopDMsListView(
        onEvent: { event in
            switch event {
            case let .channelSelected(channel):
                selectedChannel = channel
            }
        }
    )
    .navigationDestination(item: $selectedChannel) { channel in
        WhopChatView(
            channelId: channel.id,
            style: .imessage
        )
        .navigationBarTitleDisplayMode(.inline)
        .navigationTitle(channel.name)
    }
    ```
  </Tab>
</Tabs>
