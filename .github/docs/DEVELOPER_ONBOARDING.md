# Linkta Developer Onboarding

## Table of Contents:
- [Intro](#what-is-linktaio)
- [Accounts and Teams](#accounts-and-teams)
- [GitHub Resources](#github-resources)
- [Branches](#branches)
- [Environment Variables](#environment-variables)
- [Workspace Settings](#workspace-settings)
- [Projects](#projects)
- [Deployment](#deployment)

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
| MongoDB Atlas       | Linkta dev database     | Read/Write access                 |
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


> Note: There is no .env file at the project root level!
<br>

### The variables required in the **client/.env** file are:
- VITE_SERVER_BASE_URL=http://localhost:3000
- VITE_FIREBASE_API_KEY=
- VITE_FIREBASE_AUTH_DOMAIN=
- VITE_FIREBASE_PROJECT_ID=
- VITE_FIREBASE_STORAGE_BUCKET=
- VITE_FIREBASE_MESSAGING_SENDER_ID=
- VITE_FIREBASE_APP_ID=

> Note: in a Vite / React application, client-side environment variables must include the 'VITE_' prefix.

<strike>The developer is responsible for visiting the [**Firebase Console**](https://console.firebase.google.com/) site and obtaining the values for the above Firebase Configuration variables.</strike>

Firebase limits the number of service accounts allocated to the project. Therefore, all of the client-side Firebase environment variables must be shared. Get a valid set from any team member.

![A screenshot of the Firebase Console / General area](https://github.com/Linkta-org/core/blob/d42a53fb77d6606573ff37bc07d90c502c1037b4/.github/docs/assets/screenshot-firebase-config.png)

<br>

### The variables needed for the **server/.env** file are:
- MONGO_DB_URI=
- GEMINI_API_KEY=
- NODE_ENV=development
- LOG_LEVEL=debug
- CLIENT_BASE_URL=http://localhost:5173
- SERVER_BASE_URL=http://localhost
- PORT=3000
- ALLOWED_ORIGINS=http&#xfeff;://localhost:5173, https&#xfeff;://linkta.io, https&#xfeff;://linkta-core.netlify.app
- PROJECT_ID=linkta-core
- PRIVATE_KEY=""
- CLIENT_EMAIL=firebase-adminsdk-ts6yo&#xfeff;@linkta-core.iam.gserviceaccount.com


> Note: Default values have been included for some non-sensitive variables.


**MONGO_DB_URI** - Each developer should be provided with a username and password for the Linkta database. This is separate from the credentials used to login to the MongoDB Atlas site.

The project-specific credentials can be used in creation of a unique MongoDB 'connection string' which is used as the MONGO_DB_URI value.

> Note: MongoDB provides a sample connection string with two variables which must be replaced with the user's name and password. A third variable is needed, which is not mentioned in the Connect dialog. This variable is "database-name", and the value should be set to 'development-db'.

Sample MongoDB Atlas connection string:

`mongodb+srv://<username>:<password>@linkta-core-development.1zuwk3v.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=linkta-core-development`

Variables:

`'username', 'password', 'database-name'`

**GEMINI_API_KEY** - Each developer should obtain a [**Google Gemini API key**](https://ai.google.dev/gemini-api/docs/api-key) for use in development. There is a Linkta key which is used for all deployed branches.

**NODE_ENV** - Defaults to 'development' if no value is set. Use this variable in local development if there is a reason to change to 'production' or any other value.

**CLIENT_BASE_URL** - Will be used to configure CORS headers and HTTP query targets.

**SERVER_BASE_URL** - Used in server logs.

**PORT** - Used in server logs.

**LOG_LEVEL** - Defaults to 'info' if no value is set. Use this variable to change the server log level in your local environment if needed. ('debug' is the recommended log level for development)

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

> Note: The PRIVATE_KEY variable is a very long string and has special requirements. It must be enclosed in double-quotes, and all of the "\n" newline characters must be stripped out.

Each Firebase application is limited to a total of 10 Private Keys. As it may not be possible for all developers to obtain a unique Firebase Private Key, they should instead obtain a service-account.json file from an admin or another team member. This file may include the three variables listed above, as well as others which are not needed at this time.

> Note: Do not add this JSON file to the Linkta Core project in VS Code! If you open the file using VS Code, ensure that the file is located outside of the project and is not added to Linkta's Git repository.


![A screenshot of the Firebase Console / Service Accounts area](https://github.com/Linkta-org/core/blob/b98fd7fc93e1ba969b733bde560f8932b3df8257/.github/docs/assets/screenshot-firebase-key.png)

<br>

## Workspace Settings

VS Code allows each user to maintain per-workspace settings. With the editor window active, press F1 and search "settings.json" to see that VS Code honors three settings.json files with three different scopes; default, user, and workspace.

To maintain workspace settings, create a ".vscode" folder in the project root directory. Inside this folder, create a "settings.json" file containing a JSON-compatible object with two properties:

```
{
  "eslint.workingDirectories": [
    "./client",
    "./server"
  ],
  "files.eol": "\n"
}
```
The first value is a list of folder locations which will be read by the ESLint extension for VS Code. If you have the ESLint extension installed and active, this setting prevents the extension from erroneously displaying a lint line at the beginning of every TypeScript file in the project.

The second value is controlling the newline character which will be used by all developers for this project. If you're curious about this setting you can read up on it starting [HERE](https://stackoverflow.com/questions/1552749/difference-between-cr-lf-lf-and-cr-line-break-types).

> Note: The ".vscode" folder and its contents were removed from the repo and added to .gitignore with [Pull Request #322](https://github.com/Linkta-org/core/pull/322) on 2024/07/12. After this date, the developer must create their own workspace settings folder and file.


<br>

## Projects


<br>

## Deployment


