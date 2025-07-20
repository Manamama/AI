# GitHub Pages Deployment Theory

This document explains the architecture and workflow for deploying your React application to GitHub Pages, clarifying the roles of different branches, tools, and processes.

## 1. `npm` (Node Package Manager) and `package.json` Scripts

*   **`npm`'s Role:** `npm` is the command-line tool that comes with Node.js. It's used to manage your project's dependencies (like React, Vite, `gh-pages`) and to run predefined scripts.
*   **`package.json` Scripts:** Your `package.json` file defines a set of custom commands under the `"scripts"` section. These automate common tasks:
    *   **`"build": "vite build"`**: This is the core command that triggers your build tool (Vite) to compile your source code.
    *   **`"predeploy": "npm run build"`**: This is a special `npm` script. When you run `npm run deploy`, `npm` automatically looks for and executes a script named `predeploy` *before* running `deploy`. This ensures your project is always built before it's deployed.
    *   **`"deploy": "gh-pages -d dist"`**: This is the command you run to initiate the deployment. It uses the `gh-pages` npm package.

## 2. The `master` Branch: Your Source Code Repository

*   **Purpose:** The `master` branch is your primary development branch. It contains all your original, human-readable **source code**.
    *   This includes your React components (`.tsx` files), styling files, configuration files (`vite.config.ts`, `tsconfig.json`), `package.json`, `README.md`, etc.
*   **What's NOT here:** It does *not* contain the compiled, optimized, or bundled files that a web browser needs to run your application. These are generated during the build process.
*   **Why it's separate:** Keeping source code separate from built code ensures a clean, manageable development history. You commit changes to your source code here.

## 3. Vite: Your Build Tool

*   **Role:** Vite is a modern build tool that takes your source code and transforms it into a set of static assets (HTML, CSS, JavaScript) that web browsers can understand and execute efficiently.
*   **Process:** When `npm run build` (i.e., `vite build`) runs:
    *   It transpiles your TypeScript (`.tsx`) into plain JavaScript.
    *   It bundles all your JavaScript modules into fewer, larger files (often called "chunks" or "bundles") to reduce network requests.
    *   It minifies your code (removes whitespace, shortens variable names) to reduce file size.
    *   It processes your `index.html` and injects references to the bundled JavaScript and CSS.
    *   It places all these final, optimized, static files into a directory named `dist/` (short for "distribution").

## 4. The `gh-pages` Branch: Your Deployment Target

*   **Purpose:** The `gh-pages` branch is a special branch specifically recognized by GitHub Pages. It serves as the repository for your **built, static website files**.
*   **What's here:** After `npm run build` creates the `dist/` folder, the `gh-pages` npm package takes the *contents* of that `dist/` folder and pushes them to the `gh-pages` branch.
    *   This is why you see `index.html` and the `assets/` directory (containing your bundled `.js` and `.css` files) directly at the root of this branch.
*   **Why it's separate:** It keeps your deployment history clean and distinct from your source code history. It also ensures that GitHub Pages only serves the necessary, optimized files.

## 5. The `gh-pages` npm Package

*   **Role:** This package automates the process of taking your built `dist/` directory and pushing its contents to the `gh-pages` branch of your GitHub repository.
*   **How it works:** When `gh-pages -d dist` runs, it essentially performs Git operations behind the scenes:
    1.  It creates a temporary Git repository or works in a temporary context.
    2.  It copies the contents of your `dist/` folder into this context.
    3.  It commits these files.
    4.  It then force-pushes these commits to the `gh-pages` branch on your `origin` remote. This overwrites the previous content of `gh-pages` with your new build.

## 6. GitHub Pages: The Hosting Service

*   **Role:** GitHub Pages is a free static site hosting service provided by GitHub.
*   **How it works:** Once you enable GitHub Pages for your repository (which you have done), GitHub continuously monitors the designated branch (in your case, `gh-pages`). Whenever new commits are pushed to `gh-pages`, GitHub Pages automatically detects the changes and deploys the new version of your website.

## 7. The Link: `https://manamama.github.io/AI/`

*   **The Connection:** Your `homepage` field in `package.json` (`"homepage": "https://manamama.github.io/AI/"`) tells the `gh-pages` package what the base URL of your deployed site will be.
*   **How it's served:** This URL directly points to the content of the `gh-pages` branch.
    *   `https://manamama.github.io/` is the base domain for GitHub Pages for user/organization pages.
    *   `/AI/` is derived from your repository name (`AI`).
*   **The `assets` directory:** When your browser loads `https://manamama.github.io/AI/`, it first requests `index.html`. Inside `index.html`, there are references to your JavaScript and CSS files, which are located in the `assets/` directory (e.g., `<script src="/AI/assets/index-d5qmFW8U.js"></script>`). GitHub Pages serves these files directly from the `assets/` folder within your `gh-pages` branch.

### In Summary: The Pipeline

1.  You write and commit **source code** to your **`master` branch**.
2.  You run `npm run deploy`.
3.  `npm` first runs `npm run build` (Vite).
4.  Vite compiles your source code into optimized, static files in the **`dist/` folder**.
5.  The `gh-pages` package takes the contents of `dist/` and pushes them to the **`gh-pages` branch** on GitHub.
6.  GitHub Pages detects the new commits on `gh-pages`.
7.  GitHub Pages serves the content of the `gh-pages` branch at **`https://manamama.github.io/AI/`**, making your application live.

This two-branch system (`master` for source, `gh-pages` for built output) is crucial for maintaining a clean development workflow while simultaneously providing a functional, optimized live website via GitHub Pages.
