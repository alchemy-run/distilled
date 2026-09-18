> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Theming & styles

> Customize the appearance of chat elements

## Theming

Customize the appearance of chat elements with a theme. On web, pass a `theme` through the Elements appearance options. On Swift, create a `WhopTheme` and apply it with `.whopTheme()`.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    <Elements
    	elements={elements}
    	appearance={{
    		theme: {
    			appearance: "dark",
    			accentColor: "blue",
    			grayColor: "gray",
    			dangerColor: "red",
    			warningColor: "amber",
    			successColor: "green",
    			infoColor: "sky",
    		},
    	}}
    >
    	<ChatSession token={getToken}>
    		<ChatElement options={chatOptions} />
    	</ChatSession>
    </Elements>
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    const whopElements = await loadWhopElements();

    whopElements.updateOptions({
    	appearance: {
    		theme: {
    			appearance: "dark",
    			accentColor: "blue",
    			grayColor: "gray",
    			dangerColor: "red",
    			warningColor: "amber",
    			successColor: "green",
    			infoColor: "sky",
    		},
    	},
    });
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    struct ThemedMessagesView: View {
        @State private var selectedChannel: DMChannel?

        let theme = WhopTheme(
            accent: .plum,
            neutral: .gray,
            danger: .tomato,
            warning: .violet
        )

        var body: some View {
            WhopDMsListView(
                onEvent: { event in
                    switch event {
                    case let .channelSelected(channel):
                        selectedChannel = channel
                    }
                }
            )
            .whopTheme(theme)
            .navigationDestination(item: $selectedChannel) { channel in
                WhopChatView(
                    channelId: channel.id,
                    style: .imessage
                )
                .whopTheme(theme)
                .navigationBarTitleDisplayMode(.inline)
                .navigationTitle(channel.name)
            }
        }
    }
    ```
  </Tab>
</Tabs>

### Theme properties

| Purpose    | Web option     | Swift option | Description                                                                            |
| ---------- | -------------- | ------------ | -------------------------------------------------------------------------------------- |
| Appearance | `appearance`   | —            | Light or dark mode (`"light"`, `"dark"`) on web. Swift follows the app's color scheme. |
| Accent     | `accentColor`  | `accent`     | Primary interactive elements, links, and selection highlights                          |
| Neutral    | `grayColor`    | `neutral`    | Text, borders, and backgrounds                                                         |
| Danger     | `dangerColor`  | `danger`     | Destructive actions and error states                                                   |
| Warning    | `warningColor` | `warning`    | Warning states                                                                         |
| Success    | `successColor` | `success`    | Success states                                                                         |
| Info       | `infoColor`    | `info`       | Informational highlights                                                               |

### Available colors

All color properties accept these tints. Use strings on web, such as `"blue"`, and enum values on Swift, such as `.blue`.

`amber` · `blue` · `bronze` · `brown` · `crimson` · `cyan` · `gold` · `grass` · `gray` · `green` · `indigo` · `iris` · `jade` · `lemon` · `lime` · `magenta` · `mint` · `orange` · `pink` · `plum` · `purple` · `red` · `ruby` · `sky` · `teal` · `tomato` · `violet` · `yellow`

## Chat styles

Choose between Discord-style or iMessage-style chat. iMessage style (bubble chat) is the default if not provided.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    const chatOptions: ChatElementOptions = useMemo(() => {
    	return {
    		channelId: "chat_feed_XXXXXXXXXXXXXX",
    		style: "discord", // or "imessage" (default)
    	};
    }, []);
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    const chatElement = session.createElement("chat-element", {
    	channelId: "chat_feed_XXXXXXXXXXXXXX",
    	style: "discord", // or "imessage" (default)
    });
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    // iMessage style (bubble chat)
    WhopChatView(
        channelId: "chat_feed_XXXXXXXXXXXXXX",
        style: .imessage
    )

    // Discord style (full-width messages)
    WhopChatView(
        channelId: "chat_feed_XXXXXXXXXXXXXX",
        style: .discord
    )
    ```
  </Tab>
</Tabs>
