# PV Theme Provider

## Component
WeWeb custom component that injects ~25 CSS design tokens on the page's :root element. Place once per page. All PV components read these tokens via var(--pv-*) with fallback defaults.

## Project ID
b413e1c2-8199-4468-bcf2-4f5a2dd1a16c

## Dev
- Serve: `npx weweb serve port=8090`
- Editor: https://editor-dev.weweb.io/b413e1c2-8199-4468-bcf2-4f5a2dd1a16c

## How it works
- Injects CSS variables via `wwLib.getFrontDocument().documentElement.style.setProperty()`
- Removes all variables on unmount
- Size presets (sm/md/lg) compute spacing/font tokens from shared/tokens.js
- Custom mode exposes individual spacing properties

## No PrimeVue dependency
This component does NOT import PrimeVue. It only injects CSS variables.

