
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
Client [color: white, shape: oval, icon: monitor]
Firebase Auth[shape: circle, icon: firebase, color: orange]

Authentication Middleware [color: blue] {
  User [icon: user]
  Logged In User [icon: user-check]
  Login [icon: log-in]
  Logout [icon: log-out]
}

Authentication Service [color: blue, icon: settings]{
  Generate Session Token [icon: worker]
  Verify Session Token [icon: worker]
  Validate Firebase Token [icon: worker]
  Invalidate Session Token [icon: worker]
}

// session login flow
User > Login: POST /v1/auth/login
Login > Validate Firebase Token: Initial request
Validate Firebase Token <> Firebase Auth: validate token through Firebase Admin SDK
Validate Firebase Token > Generate Session Token
Generate Session Token  > Authenticated [icon: check-circle, shape: diamond, color: green]
Login > Create User: once authenticated
Login > Verify Session Token: Subsequent requests
Verify Session Token > Authenticated

// session logout flow
Logged In User > Logout: POST /v1/auth/logout
Logout > Invalidate Session Token
Invalidate Session Token > Session Ended [shape: oval, icon: user-x]

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
  Find UserInputs by User ID [icon: worker]
  Update UserInput [icon: worker]
  Delete UserInput and Associated Data [icon: worker]
}

// Generate LinktaFlow from UserInput Flow
UserInput Authenticated User > Generate LinktaFlow From UserInput: POST /v1/inputs
Generate LinktaFlow From UserInput <> Validate UserInput
Generate LinktaFlow From UserInput > Create UserInput: validation passes
Create UserInput > Database [color: blue, icon: database, shape: cylinder]
Create UserInput  > Create LinktaFlow From Input: validation passes
Create LinktaFlow From Input > Generate Initial Response
Generate Initial Response > Start Generation
Start Generation <> LLM [color: yellow, icon: ai, shape: hexagon]
Create LinktaFlow From Input <> Validate LinktaFlow
Create LinktaFlow From Input > Database: validation passes
Create LinktaFlow From Input > Generate LinktaFlow From UserInput

// Fetch Input History Flow
UserInput Authenticated User > Fetch Input History: GET /v1/inputs
Fetch Input History > Find UserInputs by User ID
Find UserInputs by User ID <> Database

// Update UserInput Title
UserInput Authenticated User > Update UserInput Title: PUT /v1/inputs/:userInputId
Update UserInput Title > Update UserInput
Update UserInput > Database

// Delete UserInput
UserInput Authenticated User > Delete UserInput: DELETE /v1/inputs/:userInputId
Delete UserInput > Delete UserInput and Associated Data
Delete UserInput and Associated Data > Database

// LinktaFlow
LinktaFlow Controller [color: yellow, icon: lock] {
  LinktaFlow Authenticated User [icon: user-check, shape: oval]
  Fetch LinktaFlow [icon: play-circle]
  Update LinktaFlow [icon: play-circle]
  Save LinktaFlow As A Copy [icon: play-circle]
}

LinktaFlow Service [color: yellow, icon: settings]{
  Create LinktaFlow From Input [icon: worker]
  Create LinktaFlow From Object [icon: worker]
  Find LinktaFlow by ID [icon: worker]
  Update LinktaFlow by ID [icon: worker]
}

// Fetch LinktaFlow Flow
LinktaFlow Authenticated User > Fetch LinktaFlow: GET /v1/flows/:linkaFlowId
Fetch LinktaFlow > Find LinktaFlow by ID
Find LinktaFlow by ID > Database

// Update LinktaFlow Flow
LinktaFlow Authenticated User > Update LinktaFlow: PUT /v1/flows/:linkaFlowId
Update LinktaFlow > Update LinktaFlow by ID
Update LinktaFlow by ID > Database

// Save LinktaFlow As A Copy
LinktaFlow Authenticated User > Save LinktaFlow As A Copy: /v1/flows/save-as
Save LinktaFlow As A Copy > Create LinktaFlow From Object
Create LinktaFlow From Object > Database
Save LinktaFlow As A Copy > Create UserInput
Create UserInput > Database

// User Account and Settings
User Account and Settings Controller [color: red, icon: lock] {
  User Account Authenticated User [icon: user-check, shape: oval]
  Update User Settings [icon: play-circle]
  Delete User Account [icon: play-circle]
}

User Account and Settings Service [color: red, icon: settings]{
  Create User [icon: worker]
  Update User Settings by User ID [icon: worker]
  Delete User and Associated Data [icon: worker]
}

// Update User Settings Flow
User Account Authenticated User > Update User Settings: PUT /v1/users/settings
Update User Settings > Update User Settings by User ID
Update User Settings by User ID > Database

// Delete User Account Flow
User Account Authenticated User > Delete User Account: DELETE /v1/users
Delete User Account > Delete User and Associated Data
Delete User and Associated Data > Database

// Bug Report
Bug Report Controller [color: purple, icon: unlock] {
  Bug Report User [icon: user]
  Submit Bug Report [icon: worker]
}

Bug Report Service [color: purple, icon: settings]{
  Create Bug Report [icon: worker]
}

// Submit Bug Report Flow
Bug Report User > Submit Bug Report: POST /v1/bug-reports
Submit Bug Report > Create Bug Report
Create Bug Report > Database

// AI
AI Middleware [color: orange, icon: lock] {
  Generate Initial Response [icon: play-circle]
  Generate Response with History [icon: play-circle]
}

AI Service [color: orange, icon: settings] {
  Start Generation  [icon: worker]
}

// Validation
Validation Middleware [color: pink, icon: lock] {
  Validate UserInput [icon: play-circle]
  Validate LinktaFlow [icon: play-circle]
}

// Connections from Client to other processes
Client <> Firebase Auth: Retrieves Firebase ID token
Client > Authentication Middleware
Client > Bug Report Controller

// Connections from Authenticated User to other processes
Authenticated > UserInput Controller
Authenticated > LinktaFlow Controller
Authenticated > User Account and Settings Controller
```