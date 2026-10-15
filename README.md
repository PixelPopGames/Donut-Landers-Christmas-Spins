# Donut Landers: Gleaming Slots — Christmas Spins

A self-contained, mobile-friendly browser slot game designed for GitHub Pages. All CSS and JavaScript are inside `index.html`; no external libraries, image paths, or audio files are required. Sound effects are synthesized in the browser and start after a user interaction, to comply with browser audio restrictions.

## Publish on GitHub Pages
1. Open the repository **Donut-Landers-Christmas-Spins**.
2. Upload `index.html` and `README.md` to the repository's top/root level (not inside an extra nested folder).
3. Commit the changes to the `main` branch.
4. Open **Settings → Pages**. Set source to **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
5. Wait for the Pages deployment to finish and open the URL shown under Settings → Pages. Repository name alone is not the full URL; it will usually be `https://YOUR-USERNAME.github.io/Donut-Landers-Christmas-Spins/`.
6. If an old version still appears, hard-refresh the page or open it in a private/incognito tab.

## Gameplay
- Start with 1,000 virtual coins.
- Change the bet in 5-coin increments (5–100).
- Two matching symbols pay 2× the bet; three matching symbols pay the symbol's multiplier; three 🎅 symbols trigger the 500× jackpot.
- The game uses virtual coins only; no real-money wagering or cash-out.

## Troubleshooting
- Ensure `index.html` is at the repository root and named exactly `index.html` (lowercase).
- Ensure Pages is deploying `main` and `/(root)`.
- Use the published Pages URL, not the GitHub repository's code-browsing URL.
- Sound cannot reliably autoplay before the first tap/click due to browser policies; press **SOUND ON** or **SPIN** once to activate it.
