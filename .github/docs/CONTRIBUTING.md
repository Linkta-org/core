# Contributing to Linkta

Welcome to the contribution guidelines for Linkta. This file will describe processes necessary to contribute to this application. 

## Table of Contents
1. [Getting Started](#getting-started)
2. [VS Code Workspace Configuration](#vs-code-workspace-configuration)


## Getting Started
If onboarding as a new developer on the team, please reference the [Developer Onboarding](./DEVELOPER_ONBOARDING.md) documentation for guidance on services and processes involved in development.


## VS Code Workspace Configuration
VS Code allows users to [configure their application through settings](https://code.visualstudio.com/docs/getstarted/settings) with both User and Workspace scopes. Workspace settings are specific to individual projects like Linkta. This section will outline settings necessary for certain features and plugins to function properly in the Linkta project. 

Workspace settings for VS Code are configured within a `settings.json` file in a `.vscode/` directory located at the root level of the project. If your local clone of the core repository does not contain this file or directory, you can create them. The `.vscode/` directory is gitignored, so any settings you configure within it will not be shared with the rest of the team.

All settings are configured within a JSON object. For example, when the end of line setting is configured, it will look like this:
``` json
{
  "files.eol": "\n"
}
```

### End of line characters

Different operating systems use different end of line (AKA newline) characters. By default, VS Code uses whichever character is preferred by a user's OS. To avoid conflicts between different contributors' systems, the Linkta project uses LF characters across the board. 

Configure this setting by adding the following line to `.vscode/settings.json`:

```json
"files.eol": "\n"
```

### ESlint

The [ESlint extension](https://github.com/Microsoft/vscode-eslint#readme) for VS Code performs live linting on open files. Because Linkta's core repository is split into separate Client and Server directories, the ESlint extension needs to be informed that it will be linting two working directories. 

Configure this setting by adding the following line to `.vscode/settings.json`:
``` json
"eslint.workingDirectories": [ "./client", "./server" ]
```

Without `eslint.workingDirectories` configured, the ESlint extension may throw `Parsing error: Cannot read file '/absolute/path/to/Core/tsconfig.json'` in each file in the project. 
