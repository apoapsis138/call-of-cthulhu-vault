---
type: structure-note
dg-publish: false
---

# How To - Start a New Campaign

The checklist for turning this blank vault into a real campaign. Everything else in this folder is the detail behind these steps.

## 1. Get the vault onto my machine

- Clone or copy the repo into its own folder, then in Obsidian: Open folder as vault.
- Obsidian asks whether to trust the vault's plugins. Say yes, otherwise QuickAdd, Templater, Dataview and the rest stay off and nothing works.
- If a plugin shows as disabled, Settings, Community plugins, turn it on. The full list and what each one does is in [[How To - Plugins]].
- Dataview needs **Enable JavaScript Queries** and **Enable Inline JavaScript Queries** on. They are already on in this vault's settings, but check if the Connections panel shows an error.

## 2. Look at the examples, then delete them

- `97 - Examples` has one filled-in note of every type from a made-up 1923 scenario (a missing antiquarian and a lighthouse in the fictional town of Greyhaven). Open a few to see what a finished note looks like.
- The dashboards pick the examples up too, so they're a quick way to see the dashboards working.
- When I'm ready: delete the whole `97 - Examples` folder. Nothing else links to it except the example names in [[Vault Standards]] and [[Metadata Reference]], which are only text.

## 3. Name the campaign

- [[Campaign Home]]: set `campaign`, and the `dg-metatags` (description, `og:title`, `og:site_name`, the twitter lines). Leave `og:url` blank until the site exists.
- Optional: swap the `campaign/coc` tag for a campaign-specific one. Obsidian has no vault-wide replace, so I open the vault folder in VS Code and use Find and Replace in Files (`Ctrl+Shift+H`) for `campaign/coc`, including in `10 Templates`. Close Obsidian first so it doesn't fight over the files.
- Optional: the title banner in the theme says "CASE FILE, CALL OF CTHULHU". It's the `content:` line under `.inline-title::before` in `.obsidian/snippets/coc-1920s.css`. See [[How To - Theme and CSS]].

## 4. Set up the party

- Make each investigator from `Template - PC Profile` in `02 Characters/PCs` (see [[How To - Templates and Note Types]]). Set `my_character: true` on mine only.
- Add them to Party / Investigators on [[Campaign Home]].

## 5. Publishing (optional)

- The Digital Garden plugin is installed but not connected to anything. Follow [[How To - Publishing Setup]] to make a new site repo, connect Vercel and paste in a token.
- Until then, ignore anything about the site in the reference notes.

## 6. Before the first session

- Read [[Workflow Reference]] once. The session routine is there.
- Make the first session note with QuickAdd, New Session.
- After the session, work through [[Vault Maintenance]] ([[How To - Vault Maintenance]]).

## Things I keep out of the repo

The repo is public, so:

- Publisher PDFs go in `assets/reference`. It's in `.gitignore` and is never published.
- Never commit the Digital Garden token. It lives in `.obsidian/plugins/digitalgarden/data.json`, so once I've pasted a token in, I check `git status` before every commit and either leave that file unstaged or run `git update-index --skip-worktree .obsidian/plugins/digitalgarden/data.json` once so git stops seeing my local changes to it.
- Workspace files and `.trash` are ignored already.
