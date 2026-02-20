// ─────────────────────────────────────────────
// index.js  –  My First MCP Server
// Exposes one tool: check-link
// ─────────────────────────────────────────────

// McpServer is the main class that registers tools and handles MCP protocol.
// StdioServerTransport lets Claude Code talk to this server over stdin/stdout.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// zod is used to describe and validate the tool's input parameters.
import { z } from "zod";

// ── 1. Create the server ──────────────────────
const server = new McpServer({
  name: "link-checker",   // shown in Claude's tool list
  version: "1.0.0",
});

// ── 2. Register the check-link tool ──────────
server.tool(
  // Tool name – this is what you type in Claude: use check-link
  "check-link",

  // Short description shown to Claude so it knows when to use this tool
  "Check whether a URL is reachable by making an HTTP HEAD request.",

  // Input schema – defines the parameters the tool accepts
  {
    url: z.string().url().describe("The URL to check (must start with http:// or https://)"),
  },

  // Handler – the async function that runs when the tool is called
  async ({ url }) => {
    try {
      // Send a HEAD request (fetches only headers, no body – faster and lighter)
      const response = await fetch(url, {
        method: "HEAD",
        // Abort if the server doesn't respond within 5 seconds
        signal: AbortSignal.timeout(5000),
        // Don't follow redirects automatically; treat them as a response
        redirect: "manual",
      });

      // response.ok is true for status codes 200–299.
      // We also treat redirects (3xx) as valid – the link exists, it just moved.
      const isValid = response.ok || (response.status >= 300 && response.status < 400);
      const status  = isValid ? "valid" : "invalid";

      return {
        content: [
          {
            type: "text",
            text: `URL: ${url}\nResult: ${status}\nHTTP status: ${response.status}`,
          },
        ],
      };

    } catch (error) {
      // fetch throws when the host can't be reached, DNS fails, or timeout fires
      return {
        content: [
          {
            type: "text",
            text: `URL: ${url}\nResult: invalid\nReason: ${error.message}`,
          },
        ],
      };
    }
  }
);

// ── 3. Connect and start listening ───────────
// StdioServerTransport reads MCP messages from stdin and writes to stdout.
// Claude Code will launch this process and communicate through those streams.
const transport = new StdioServerTransport();
await server.connect(transport);
