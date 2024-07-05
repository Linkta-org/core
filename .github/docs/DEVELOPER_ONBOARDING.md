# Linkta Developer Onboarding

## Table of Contents:
1. [Intro](#what-is-linktaio)
2. [Accounts and Teams](#accounts-and-teams)
3. [GitHub Resources](#github-resources)
4. [Branches](#branches)
5. [Environment Variables](#environment-variables)
6. [Projects](#projects)
7. [Deployment](#deployment)

<br>

## What is Linkta.io?
Revolutionizing the way we learn! (TODO: add a more detailed description of the product and goals)

<br>

## Accounts and Teams
Developers must be added or invited to each of these services by an admin or another team member:

| Type                | Name                    | Access                            |
|---------------------|-------------------------|-----------------------------------|
| Slack Workspace     | Linkta.org              | Regular Member                    |
| GitHub Organization | Linkta-org              | 'member'                          |
| MongoDB Atlas       | Linkta organization     | Organization Member               |
| Heroku              | linkta-core application | collaborator                      |
| Firebase Console    | linkta-core project     | Editor                            |
| Google Calendar     | Linkta events           | Manage changes and manage sharing |
| Netlify             | client hosting          | no teams / collabs                |
| Google Gemini       | API key                 | create own account                |

<br>

## GitHub Resources
- The GitHub Organization is 'Linkta-org': https://github.com/Linkta-org
- The GitHub Repository is 'core': https://github.com/Linkta-org/core
- The GitHub Project is 'Linkta Core MVP': https://github.com/orgs/Linkta-org/projects/6

<br>

## Branches
As of July 1st, 2024, and until further notice, developers create feature branches named for the feature they are working on.

Changes to feature branches should be committed and pushed to the remote branch frequently.

When changes are ready for review, a pull request should be created from the remote feature branch to the remote dev branch.

<br>

## Environment Variables
Each developer should create their own local .env files. The project-level .gitignore ensures that .env files are not included in commits and are never synced with the remote repository.

There should be one .env file in the **client/** folder and one .env file in the **server/** folder. These files live at the root of the client and server applications, respectively.

```
Note: There is no .env file at the project root level!
```

<br>

### The variables required in the **client/.env** file are:
- VITE_FIREBASE_API_KEY=
- VITE_FIREBASE_AUTH_DOMAIN=
- VITE_FIREBASE_PROJECT_ID=
- VITE_FIREBASE_STORAGE_BUCKET=
- VITE_FIREBASE_MESSAGING_SENDER_ID=
- VITE_FIREBASE_APP_ID=
```
Note: in a Vite / React application, client-side environment variables must include the 'VITE_' prefix.
```
The developer is responsible for visiting the [**Firebase Console**](https://console.firebase.google.com/u/0/project/linkta-core/overview) site and obtaining the values for the above Firebase Configuration variables. These values are critical for allowing the Linkta client app to communicate with Firebase Auth services.

If the link above is not working for you, it may be that you are logged in to multiple Google accounts. Try changing the '0' to '1' or '2' in the URL or just visit **firebase.google.com** and navigate to the **Linkta Core** project.

From the **Linkta Core** project page, find **Project Settings** at the gear icon next to **Project Overview** at the top of the side navigation menu.

Within **Project Settings**, on the **General** tab, scroll down to **My Apps** to find the **firebaseConfig** sample code block which contains all of the values for these environment variables.

![A screenshot of the Firebase Console / General area](https://github.com/Linkta-org/core/blob/b98fd7fc93e1ba969b733bde560f8932b3df8257/.github/docs/assets/screenshot-firebase-config.png)

<br>

### The variables needed for the **server/.env** file are:
- GEMINI_API_KEY=
- MONGO_DB_URI=
- NODE_ENV=development
- LOG_LEVEL=debug
- CLIENT_BASE_URL=http://localhost:5173
- PROJECT_ID=
- PRIVATE_KEY=""
- CLIENT_EMAIL=
```
Note: Default values have been included for some non-sensitive variables.
```

**GEMINI_API_KEY** - Each developer should obtain a [**Google Gemini API key**](https://ai.google.dev/gemini-api/docs/api-key) for use in development. There is a Linkta key which is used for all deployed branches.

**MONGO_DB_URI** - Each developer should visit the MongoDB Atlas project and create their own username/password on the database. This allows creation of a unique MongoDB 'connection string' which is used as the MONGO_DB_URI value.

**NODE_ENV** - Defaults to 'development' if no value is set. Use this variable in local development if there is a reason to change to 'production' or any other value.

**CLIENT_BASE_URL** - Will be used to configure CORS headers and HTTP query targets.

**LOG_LEVEL** - Defaults to 'info' if no value is set. Use this variable to change the server log level in your local environment if needed.

| Level |	Description                                                                                               |
|-------|-----------------------------------------------------------------------------------------------------------|
| ALL   |	All levels including custom levels.                                                                       |
| DEBUG |	Designates fine-grained informational events that are most useful to debug an application.                |
| INFO  |	Designates informational messages that highlight the progress of the application at coarse-grained level. |
| WARN  |	Designates potentially harmful situations.                                                                |
| ERROR |	Designates error events that might still allow the application to continue running.                       |
| FATAL |	Designates very severe error events that will presumably lead the application to abort.                   |
| OFF   |	The highest possible rank and is intended to turn off logging.                                            |
| TRACE |	Designates finer-grained informational events than the DEBUG.                                             |

**PROJECT_ID**, **PRIVATE_KEY**, and **CLIENT_EMAIL** are values provided by Firebase as part of a Firebase "Private Key" a.k.a. "Service Account".

```
Note: The PRIVATE_KEY variable is a very long string and has special requirements. It must be enclosed in double-quotes, and all of the "\n" newline characters must be stripped out.
```

The developer is responsible for visiting the [**Firebase Console**](https://console.firebase.google.com/u/0/project/linkta-core/overview) site and obtaining the values for the above Firebase Configuration variables. These values are critical for allowing the Linkta server app to communicate with Firebase Auth services.

If the link above is not working for you, it may be that you are logged in to multiple Google accounts. Try changing the '0' to '1' or '2' in the URL or just visit **firebase.google.com** and navigate to the **Linkta Core** project.

From the **Linkta Core** project page, find **Project Settings** at the gear icon next to **Project Overview** at the top of the side navigation menu.

Within **Project Settings**, on the **Service Accounts** tab. Here you should see the 'Generate new private key' button.

After clicking 'Generate new private key' you will see a warning to keep the private key info confidential. The warning modal has a 'Generate Key' button.

Click 'Generate Key' to immediately download a JSON file containing the three values required for Firebase Auth, as well as a few other variables that are not needed.

```
Note: Do not add this JSON file to the VS Code project! If you open the file using VS Code, ensure that the file is located outside of the project and is not added to the Git repository.
```

![A screenshot of the Firebase Console / Service Accounts area](https://github.com/Linkta-org/core/blob/b98fd7fc93e1ba969b733bde560f8932b3df8257/.github/docs/assets/screenshot-firebase-key.png)

<br>

### Projects


<br>

### Deployment


