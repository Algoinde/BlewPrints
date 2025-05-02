# Blue Prince Wiki

[https://holly.estate](https://holly.estate) is a bespoke wiki engine for the Blue Prince (and maybe later, other spoiler-dependent games).

## Developing

The core data is located in the [Google Sheet](https://docs.google.com/spreadsheets/d/1r_iI-CBb-DIu7nupCbckxp7aw5tMMP214y6PDigBvIQ/edit?gid=0#gid=0) and welcomes contributions.

To pull the latest data from the wiki into your development setup, run `node tools/fetch.mjs` from the project root directory.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
