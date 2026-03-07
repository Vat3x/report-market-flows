---
name: clickup-sync
description: Syncs Markdown files or selected text to ClickUp as tasks or docs.
---
# ClickUp Sync Protocol
When the user asks to "sync to ClickUp":
1. Read the current Markdown file or selection.
2. Use the ClickUp API (https://api.clickup.com) to:
   - Create a task in the specified List ID.
   - Use the Markdown content as the task description.
3. Use the API Token from environment variable: `CLICKUP_API_TOKEN`
