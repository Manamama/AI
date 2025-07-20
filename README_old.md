# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

This project is deployed using GitHub Pages. To deploy a new version:

1.  Make sure all your changes are committed.
2.  Run the following command:

    ```bash
    npm run deploy
    ```

This command will automatically build the project and push the contents of the `dist` folder to the `gh-pages` branch, which will then be published online.
