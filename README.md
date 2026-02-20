This MCP server works with Claude code. It has one tool, "check-link", which when provided with a URL, will
verify whether or not that link is valid, then return a statement saying if it is valid or invalid. 

--INSTALLATION--
1. Download this repository/directory
2. Install dependencies (node.js, npm, Claude Code)
3. Register with Claude Code:
	claude mcp add my-first-mcp node /absolute/path/to/my-first-mcp/index.js
4. Restart Claude code and do /mcp

After these steps, using the check-link tool will allow you to provide a url, then recieve a response as to
whether it is valid or not. This can be useful for checking if a provided link still contains content or if
the page could have been deleted, no longer hosted, or having server issues.