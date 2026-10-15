# Donut Landers: Christmas Spins

A mobile-friendly browser slot game for GitHub Pages. This version uses a Christmas theme and a special ordered Donut Landers jackpot.

## Christmas Jackpot rule
The jackpot is awarded only when the three reels land, from left to right, in this exact order:
1. Sprinkles
2. Ghost
3. Chocolate Von Donut

That exact combination pays 500 times the selected bet in virtual coins. Other triples and pairs have smaller virtual-coin payouts. There are no real-money wagers or prizes.

## Publish on GitHub Pages
1. Create a new repository so your existing runner remains untouched.
2. Upload `index.html`, `style.css`, `game.js`, and the full `assets` folder to the repository root.
3. In repository Settings → Pages, choose Deploy from a branch, select `main` and `/(root)`, and save.
4. Open the Pages URL. Tap Spin once to allow the browser to play synthesized sound effects.

## Assets
`assets/donut-landers-trio.png` is the supplied Donut Landers image. The interface is drawn with HTML/CSS and holiday symbols; sound effects are synthesized in the browser. Browsers may require a user interaction before audio can play.
