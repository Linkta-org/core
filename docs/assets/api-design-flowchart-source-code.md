
### How to update the flowchart in the API design document:
1. Create a free account at https://app.eraser.io.
2. Create a new diagram, double-click the diagram.
3. Copy the code inside the code block below, and paste it in the code editer on eraser.io.
4. Make edits.
5. Export the flowchart (area: canvas, image type: PNG, image size: large, image background: transparent).
6. Replace api-design-flowchart.png in .github/docs/assets/ with the new PNG document.
7. Preview the markdown to ensure the correct diagram is added.
8. Submit a PR for the changes.

```
colorMode pastel
typeface clean

// Authentication
Client [color: yellow, shape: oval, icon: monitor]
Firebase Auth[shape: circle, icon: firebase, color: orange]

Firebase Authentication Middleware [color: blue]{
  isAuthorized [icon: play-circle]
}

// Auth flow
isAuthorized <> Firebase Auth: Verifies Firebase ID Token
isAuthorized > Authenticated [color: green, shape: diamond]
Authenticated <> Find User Profile By UID

// UserInput
UserInput Controller [color: green, icon: lock] {
  UserInput Authenticated User [icon: user-check, shape: oval]
  Generate LinktaFlow From UserInput [icon: play-circle]
  Fetch Input History [icon: play-circle]
  Update UserInput Title [icon: play-circle]
  Delete UserInput [icon: play-circle]
}

UserInput Service [color: green, icon: settings]{
  Create UserInput [icon: worker]
  Fetch Input History By ID [icon: worker]
  Update Input Title [icon: worker]
  Delete User Input By ID[icon: worker]
}

// Generate LinktaFlow from UserInput Flow
UserInput Authenticated User > Generate LinktaFlow From UserInput :POST /v1/inputs
Generate LinktaFlow From UserInput > Validation Middleware
Validation Middleware > Create UserInput
Create UserInput > Database [color: blue, icon: database, shape: cylinder]
Create UserInput  > Generate Initial Response
Generate Initial Response  > Start Generation
Start Generation <> LLM [color: yellow, icon: ai, shape: hexagon]
Generate Initial Response > Create LinktaFlow
Create LinktaFlow > Database

// Fetch Input History Flow
UserInput Authenticated User > Fetch Input History: GET /v1/inputs
Fetch Input History > Validation Middleware
Validation Middleware > Fetch Input History By ID
Fetch Input History By ID > Database

// Update UserInput Title
UserInput Authenticated User > Update UserInput Title: PUT /v1/inputs/:userInputId
Update UserInput Title > Validation Middleware
Validation Middleware > Update Input Title
Update Input Title > Database

// Delete UserInput
UserInput Authenticated User > Delete UserInput: DELETE /v1/inputs/:userInputId
Delete UserInput > Validation Middleware
Validation Middleware > Delete User Input By ID
Validation Middleware > Delete LinktaFlow by UserInput ID
Delete User Input By ID > Database
Delete LinktaFlow by UserInput ID > Database

// LinktaFlow
LinktaFlow Controller [color: yellow, icon: lock] {
  LinktaFlow Authenticated User [icon: user-check, shape: oval]
  Fetch LinktaFlow [icon: play-circle]
  Update LinktaFlow [icon: play-circle]
  Save LinktaFlow As A Copy [icon: play-circle]
}

LinktaFlow Service [color: yellow, icon: settings]{
  Create LinktaFlow [icon: worker]
  Fetch LinktaFlow by UserInput ID [icon: worker]
  Update LinktaFlow by ID [icon: worker]
  Delete LinktaFlow by UserInput ID [icon: worker]
}

// Fetch LinktaFlow Flow
LinktaFlow Authenticated User > Fetch LinktaFlow: GET /v1/flows/:userInputId
Fetch LinktaFlow > Validation Middleware
Validation Middleware > Fetch LinktaFlow by UserInput ID
Fetch LinktaFlow by UserInput ID > Database

// Update LinktaFlow Flow
LinktaFlow Authenticated User > Update LinktaFlow: PUT /v1/flows/:linkaFlowId
Update LinktaFlow > Validation Middleware
Validation Middleware > Update LinktaFlow by ID
Update LinktaFlow by ID > Database

// Save LinktaFlow As A Copy
LinktaFlow Authenticated User > Save LinktaFlow As A Copy: POST /v1/flows/save-as
Save LinktaFlow As A Copy > Validation Middleware
Validation Middleware > Create LinktaFlow
Create LinktaFlow > Database
Validation Middleware > Create UserInput
Create UserInput > Database

// User Profile
User Controller [color: red, icon: lock] {
  User Settings Authenticated User [icon: user-check, shape: oval]
  Fetch User Profile [icon: play-circle]
  Create User Profile [icon: play-circle]
  Update User Settings [icon: play-circle]
}

User Service [color: red, icon: settings]{
  Find User Profile By UID [icon: worker]
  Find User Profile By ID [icon: worker]
  Create User Profile By ID[icon: worker]
  Update User Profile [icon: worker]
}

// Fetch User Profile Flow
User Settings Authenticated User > Fetch User Profile: GET v1/users
Fetch User Profile > Validation Middleware
Validation Middleware > Find User Profile By ID
Find User Profile By ID > Database

// Create User Profile
User Settings Authenticated User > Create User Profile: POST v1/users
Create User Profile > Validation Middleware
Validation Middleware > Create User Profile By ID
Create User Profile By ID > Database

// Update User Settings
User Settings Authenticated User > Update User Settings: PUT v1/users
Update User Settings > Validation Middleware
Validation Middleware > Update User Profile
Update User Profile > Database

// Bug Report (design in progress)
Bug Report Controller [color: purple, icon: unlock] {
  Bug Report Authenticated User [icon: user-check]
  Submit Bug Report [icon: worker]
}

Bug Report Service [color: purple, icon: settings]{
  Create Bug Report [icon: worker]
}

// Submit Bug Report Flow
Bug Report Authenticated User > Submit Bug Report: POST /v1/bug-reports
Submit Bug Report > Create Bug Report
Create Bug Report > Database

// AI Service
AI Service [color: orange, icon: lock] {
  Generate Initial Response [icon: play-circle]
}

Gemini Model [color: orange, icon: settings] {
  Start Generation  [icon: worker]
}

// Validation Middleware
Validation Middleware [color: pink, icon: lock]

// Connections from Client to other processes
Client <> Firebase Auth: Retrieves Firebase ID token
Client > Firebase Authentication Middleware

// Connections from Authenticated User to other processes
Authenticated > UserInput Controller
Authenticated > LinktaFlow Controller
Authenticated > User Controller
Authenticated > Bug Report Controller
```