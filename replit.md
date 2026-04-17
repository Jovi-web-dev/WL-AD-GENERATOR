# WL Importados Platform

## Overview
React 18 single-page frontend for generating e-commerce ad content with AI provider keys supplied by the user in the browser. The app stores API keys in localStorage and has no backend server in this project.

## Project Structure
- `src/App.jsx`: Main React application and inline styling/theme system.
- `src/index.js`: React entry point.
- `public/index.html`: Static HTML shell.
- `docs/`: Imported Portuguese documentation for setup, deployment, and AI integrations.

## Replit Setup
- Runtime: Node.js 20.
- Development command: `npm start`.
- Preview: Create React App is configured through the start script to bind to `0.0.0.0` on port `5000` and disable development host checking for Replit's proxied preview iframe.
- Production deployment: static React build from `npm run build`, serving the `build` directory.
