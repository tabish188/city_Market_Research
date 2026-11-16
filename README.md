# Market Research by StowNest Marketing Team

City expansion research for StowNest (B2C household & self storage) and StowFlex (B2B warehousing & 3PL): **Visakhapatnam vs Ahmedabad**.

Plain HTML, CSS and JavaScript. No build step, no server, no dependencies.

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure and content |
| `style.css` | All styling and animations |
| `script.js` | Data, charts, tabs, hover explanations, buttons |
| `logo.jpg` | StowNest logo |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Put it live on GitHub Pages

1. Create a new repository on GitHub (for example `stownest-market-research`).
2. Push these files to the `main` branch:
   ```
   git init
   git add .
   git commit -m "StowNest market research page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/stownest-market-research.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. After about a minute the page is live at `https://<your-username>.github.io/stownest-market-research/`.

Every later `git push` updates the live page automatically.

## Update data

All numbers live at the top of `script.js` (scorecards, comparison rows, sources) and in `index.html` (stat cards, tables). Edit, commit, push.

## Credits

India map: [India boundaries](https://github.com/datameet/maps/blob/master/Country/india-composite.geojson) by [DataMeet India community](http://datameet.org/) ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
