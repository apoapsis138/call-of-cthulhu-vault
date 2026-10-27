---
type: structure-note
dg-publish: false
---

# How To - Publishing Setup

Getting the campaign onto a website from nothing. The vault publishes with the **Digital Garden** plugin: it pushes notes as Markdown into a GitHub repo, and **Vercel** builds that repo (an Eleventy site) into the website every time it changes.

The plugin in this vault is installed but not connected: repo, user name, token and base URL are all blank.

There are two ways to get a site repo. Pick one.

## Option A: a plain Digital Garden site

The simplest. No case board or string board styling, but everything else (notes, dashboards, canvases, search, file tree) works.

1. Sign in to GitHub and Vercel (Vercel can sign in with the GitHub account).
2. Go to the Digital Garden template repo on GitHub (`oleeskild/digitalgarden`) and use the **Deploy to Vercel** button in its README. It makes a copy of the template in my GitHub account and a Vercel project linked to it. Give the repo a name I'll recognise.
3. Wait for the first deploy to finish. Vercel shows the site's address (something like `my-campaign.vercel.app`).
4. Carry on at [[#Connect the plugin]].

## Option B: a copy of my previous campaign's site

That repo has the extras: the case board on the home page, the string board styling, the share-card images for link previews and the custom fonts and palettes. It also has the old campaign's notes and pictures, which must not come across.

1. On GitHub, make a new **empty** repo (no README, no licence).
2. Clone the old site repo somewhere temporary and delete its `.git` folder, so the old history doesn't come along.
3. Empty the campaign content:
   - `src/site/notes`: delete everything inside (the plugin fills it again).
   - `src/site/img/user`: delete everything inside (portraits, maps, handouts).
   - Any share-card images already generated for the old campaign (look in `src/plugins/share-previews` for an output or images folder).
4. Change the old campaign's name wherever it's hard-coded:
   - `src/plugins/plugins.json`: the share-previews `siteName`.
   - `src/plugins/share-previews/scripts/home-card.js`: `TITLE`.
   - `src/plugins/share-previews/cards/person.html` and `home.html`: the title text in the card layouts.
   - `src/site/styles/custom-style.scss`: the case-file caption (the "CASE FILE" title line, same idea as in [[How To - Theme and CSS]]).
   - `src/site/_data/navigationOrder.json`: replace the old folder and note names with this vault's folders (or delete its contents; the plugin rewrites it on publish).
   - Search the whole repo for the old campaign's name, its places and its NPCs, and for the old site address. Map pins for the case board may be hard-coded for the old campaign's places; clear them out.
5. CSS class names: the view scripts in this vault tag their output `coc-connections`, `coc-timeline`, `coc-status-dead` and so on. If the old site's `custom-style.scss` styles them under a different prefix, rename them there to match (find and replace the prefix in that file). The colour variables can keep whatever name they have, but renaming them to `--coc-*` keeps the two stylesheets easy to compare.
6. `.github/workflows/person-cards.yml` regenerates the share cards (one per person, plus the home card) on GitHub Actions. It runs on its own after a publish; no setup needed beyond the repo having Actions enabled (Settings, Actions, General, Allow all actions).
7. `git init`, commit, add the new empty repo as the remote and push.
8. In Vercel: Add New, Project, import the new repo. Framework preset: Other (it picks up the build settings from the repo). Deploy.

## Set the site's name and address

In the Vercel project, Settings, Environment Variables, add:

| Name | Value |
|---|---|
| `SITE_NAME_HEADER` | the site's title, e.g. `Call of Cthulhu Campaign` |
| `SITE_BASE_URL` | the full address with `https://` and a trailing slash, e.g. `https://my-campaign.vercel.app/` |

Then Deployments, the latest one, Redeploy, so the build picks them up. (The repo's `.env` file can hold the same values; Vercel's settings win.)

To use a nicer address: Vercel project, Settings, Domains.

## Connect the plugin

1. **Make a fine-grained GitHub token.** GitHub, profile picture, Settings, Developer settings, Personal access tokens, Fine-grained tokens, Generate new token.
   - Name: something like "Digital Garden, campaign vault".
   - Expiration: a year, and a calendar reminder to renew it.
   - Repository access: **Only select repositories**, pick the site repo.
   - Permissions, Repository: **Contents: Read and write**, **Pull requests: Read and write**. (Metadata: Read-only is added automatically.)
   - Generate, and copy the token straight away; GitHub only shows it once.
2. **Obsidian, Settings, Digital Garden:**
   - GitHub repo name: the repo's name only (not the full URL).
   - GitHub username: my account name.
   - GitHub token: paste it.
   - Base URL: the site's address, e.g. `https://my-campaign.vercel.app/`.
   - The checkmark next to the token turns green when the connection works.
3. **Appearance:** Settings, Digital Garden, Appearance, Manage. Pick the theme (this vault uses ITS Theme, light), the site name, and the favicon (already set to `assets/favicon.png`), then Apply settings to site. That opens a pull request on the site repo; it merges itself, or I merge it on GitHub.
4. **Keep the token out of git.** The token is saved in `.obsidian/plugins/digitalgarden/data.json`. Before the next commit:
   ```
   git update-index --skip-worktree .obsidian/plugins/digitalgarden/data.json
   ```
   Git then ignores my local changes to that file. (`--no-skip-worktree` undoes it if I ever need to commit a real settings change; blank the token first.)
5. On [[Campaign Home]], set `og:url` in `dg-metatags` to the site's address.

## Publishing

- [[Campaign Home]] has `dg-home: true`, which makes it the site's front page. Only one note may have it.
- Notes publish when they have `dg-publish: true` (every template sets it).
- Command palette, "Digital Garden: Open publication center". It lists notes as Unpublished, Changed or Deleted. Tick what to publish and press Publish. It sends a commit to the repo and Vercel rebuilds in a minute or two.
- One note at a time: "Digital Garden: Publish single note" with the note open.
- Never publish anything from `00 Campaign Home/How To`, `10 Templates`, `97 - Examples`, `98 - Vault System` or `99 - Archive`. Those notes have `dg-publish: false`, except the templates, which the site build ignores.
- String boards: see [[String Board Standard]] and the canvas patch in [[How To - Plugins]].
- After each session, republish everything listed as Changed so Connections panels, dashboards and the case board catch up.

## Link previews

When the site's address is shared in Messenger, Discord and so on, the preview comes from the share cards. If an old preview sticks: Facebook's Sharing Debugger (developers.facebook.com/tools/debug), paste the address, Scrape Again. The "missing fb:app_id" warning can be ignored.

## If it breaks

- Publish fails with a 401 or 403: the token has expired or lacks a permission. Make a new one (step 1) and paste it in.
- Publish works but the site doesn't change: check Vercel, Deployments, for a failed build, and GitHub, Pull requests, for an unmerged appearance PR.
- Images missing on the site: the plugin deletes images that no published note embeds. A picture used only on a canvas has to be embedded in a note too.
