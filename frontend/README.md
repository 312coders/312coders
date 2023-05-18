## Setup and Run the project

1. Make sure you are in the `/frontend` directory
2. Install all dependencies by running `npm i`
3. Start the dev server with `npm run dev`
    - the site will be available at `localhost:5173`

Notes:
- For the best experience using TailwindCSS, install the [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) VS Code extension

---

## Deploy the site to Firebase
1. Install the Firebase CLI by running `npm install -g firebase-tools`
    - You only have to do this once
2. Sign in to your Google account by running `firebase login`
3. Build the site using `npm run build`
4. Deploy the site using `firebase deploy`
    - If you are asked which project to use, select "Use and existing project" and choose "code-312 (312 code)"
4. Once deployed the site will be available at https://code-312.web.app