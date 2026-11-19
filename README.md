# SSDLC Integration Roadmap

An interactive process map and schedule for integrating a product into the SSDLC. Each step lists its teams, features, dependencies and a conservative estimate in weeks. Dates (`t0`, `tStart`, `tEnd`, `tLaunch`) are computed from the dependency graph and the critical path is highlighted.

## Use it

Open `index.html` in a browser. No build step and no dependencies (fonts load from Google Fonts).

To publish it, enable GitHub Pages on the main branch.

## Use it as a template for a new integration

1. Click **Use this template** (or copy the repo).
2. Edit `data/process.js`:
   - `TEAMS`: PM, ENG-PY, ENG-TS, MGR, MKT, GTM, ENG-PA, BR.
   - `NODES`: each step has `id`, `name`, `phase`, `teams` (first is the lead), `est` (weeks), `deps`, `features`, and optionally `asset`, `note`, `optional`.
   - `ASSETS`: PD, SCP, DES, LRA with owner, authors and sign-off.
   - `PHASE`: row label by dependency level.
3. Keep `NODES` in dependency order (a step must come after its deps).

## Known coupling to fix when the process changes

`index.html` finds the milestone steps by id: `tStart` = S7, `tEnd` = S14, `tLaunch` = S19 (see `mk` in the script). Update those if you renumber steps.

## Terms

- **PD** product description (PM). **SCP** lower-level requirements (PM with ENG). **DES** optional design, signed off by specialists. **LRA** Launch Readiness Assessment (PM owns, ENG writes technical parts, MGR signs off).
- **t0** PD or SCP available. **tStart** engineering begins. **tEnd** target end of engineering. **tLaunch** public announcement.
