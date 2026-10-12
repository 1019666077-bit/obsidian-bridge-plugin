---
name: check-obsidian-bridge
description: Verify Node, vault path, and obsidian-mcp can start (no note changes)
---

Check Obsidian Bridge setup without mutating vault notes.

1. Confirm Node.js is 22+ (`node --version`).
2. Confirm vault path is set (`OBSIDIAN_BRIDGE_VAULT`, `vault.local.txt`, or `~/.cursor/obsidian-bridge-vault.txt`) and the folder contains `.obsidian`.
3. If MCP is connected, call `obsidian_list_vaults` and report vault ids (expect `notes`).
4. If MCP is not connected, tell the user to enable the Obsidian Bridge plugin and reload Cursor; first start runs `npx obsidian-mcp@2` and needs network once.

Do not create or edit notes in this command unless the user asks to run a full smoke test.
