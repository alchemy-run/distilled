> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# AI and MCP

> Connect AI agents to Whop's docs and API with Model Context Protocol servers, an LLM page index, and raw Markdown pages.

Whop runs two Model Context Protocol (MCP) servers: one that lets agents search and read these docs, and one that lets them operate on live Whop data. Both speak streamable HTTP at a `/mcp` endpoint.

## Whop Docs MCP server

Gives AI agents direct access to Whop documentation for accurate guidance while building. Server URL: `https://docs.whop.com/mcp`

<CodeGroup>
  ```bash Claude Code theme={null}
  claude mcp add --transport http whop-docs https://docs.whop.com/mcp
  ```

  ```json Cursor theme={null}
  // Add to: ~/.cursor/config/mcp.json
  {
    "mcpServers": {
      "whop-docs": {
        "url": "https://docs.whop.com/mcp"
      }
    }
  }
  ```
</CodeGroup>

One-click install for Cursor:

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=whop-docs\&config=eyJ1cmwiOiJodHRwczovL2RvY3Mud2hvcC5jb20vbWNwIn0%3D)

Any other MCP client that supports streamable HTTP can connect with the same URL.

## Whop API MCP server

Allows AI agents to make direct API calls to Whop: list resources, create data, and explore your setup interactively. Server URL: `https://mcp.whop.com/mcp`

<Note>
  `https://mcp.whop.com/sse` still works for clients that only speak the older SSE transport. Prefer `/mcp` (streamable HTTP) everywhere else.
</Note>

<CodeGroup>
  ```bash Claude Code theme={null}
  claude mcp add --transport http whop-api https://mcp.whop.com/mcp
  ```

  ```json Cursor theme={null}
  // Add to: ~/.cursor/config/mcp.json
  {
    "mcpServers": {
      "whop-api": {
        "url": "https://mcp.whop.com/mcp"
      }
    }
  }
  ```
</CodeGroup>

### Authentication

When connecting, provide your API key in the authorization prompt:

* [**Account API Key**](/developer/api/getting-started#account-api-keys) - For accessing only your account's data
* [**App API Key**](/developer/api/getting-started#app-api-keys) - For accessing data across accounts that have installed your app

### Connect from Claude.ai

1. Open [Claude Web](https://claude.ai)
2. Go to Settings -> Connectors
3. Click "+ Add Custom Connector"
4. Add the MCP server URL: `https://mcp.whop.com/mcp`

## Plain-file access for agents

If you have no MCP client, [docs.whop.com/llms.txt](https://docs.whop.com/llms.txt) indexes every page by product area, and appending `.md` to any docs URL returns the raw Markdown.

## Next steps

<CardGroup cols={2}>
  <Card title="API overview" icon="map" href="/api-reference/beta/overview">
    How requests, versioning, and pagination work.
  </Card>

  <Card title="Quickstart" icon="rocket" href="/developer/api/quickstart">
    Make your first API call in a few minutes.
  </Card>

  <Card title="Test in sandbox" icon="flask" href="/developer/guides/sandbox">
    Point your agent at test data before going live.
  </Card>

  <Card title="Whop CLI" icon="terminal" href="/developer/cli">
    Build and manage Whop apps from your terminal.
  </Card>
</CardGroup>
