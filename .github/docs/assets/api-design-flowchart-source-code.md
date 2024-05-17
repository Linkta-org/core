
### How to update the flowchart in the API design document:
1. Create a free account at https://app.eraser.io.
2. Create a new diagram, double-click the diagram.
3. Copy the code inside the code block below, and paste it in the code editer on eraser.io.
4. Make edits.
5. Export the flowchart (as area: canvas, image type: SVG, image size: large, image background: transparent).
6. Replace api-design-flowchart.svg in .github/docs/assets/ with the new SVG document.
7. Preview the markdown to ensure the correct diagram is added.
8. Submit a PR for the changes.

```
Frontend [color: white,shape: oval, icon: monitor]
Firebase Auth[shape: circle, icon: firebase, color: orange]

Frontend <> Firebase Auth: Retrieves Firebase ID token
Frontend > Authentication Controller

// User Authentication and Authorisation Flow
Authentication Controller [color: blue] {
  User [icon: user]
  Login [icon: log-in]
  Logout [icon: log-out]
  Firebase Token Validation [icon: worker]
  Session Token Generation [icon: worker]
  Session Token Validation [icon: worker]
  Session Termination [icon: worker]
}

// session login flow
User > Login: POST /api/v1/auth/login
Login > Firebase Token Validation: Initial request
Firebase Token Validation <> Firebase Auth: validate token through Firebase Admin SDK
Firebase Token Validation > Session Token Generation
Session Token Generation > Authenticated [icon: check-circle, shape: diamond]
Login > Session Token Validation: Subsequent requests
Session Token Validation > Authenticated

// session logout flow
User > Logout: POST /api/v1/auth/logout
Logout > Session Termination
Session Termination > Session Ended [shape: oval, icon: user-x]

// UserInput Submission and Processing Flow
UserInput Controller [color: green, icon: lock] {
  Auth User__ [icon: user-check, shape: oval]
  Submit UserInput [icon: file-text]
  Fetch UserInput [icon: file-text]
  Sanitize UserInput [icon: worker]
  Store UserInput in Database [icon: worker]
}

// Submit UserInput Flow
Auth User__ > Submit UserInput: POST /api/v1/inputs
Submit UserInput > Sanitize UserInput
Sanitize UserInput > Store UserInput in Database
Store UserInput in Database > Database: Store sanitized prompt in DB
Sanitize UserInput > GenAIController [color: red, icon: worker]
GenAIController <> LLM [icon: ai, color: yellow, shape: circle]: Send engineered UserInput
GenAIController > Create LinktaFlow
Create LinktaFlow > Database [icon: database, color: blue, shape: circle]: Store generated LinktaFlow in DB
Create LinktaFlow > Send LinktaFlow to User [icon: check-square, shape: oval] : if successful

// Fetch UserInput Flow
Auth User__ > Fetch UserInput: GET /api/v1/inputs/:userInputId
Fetch UserInput <> Database: Retrieve UserInput from DB
Fetch UserInput > Send UserInpt to User [icon: check-square, shape: oval]

// LinktaFlow Management Flow
LinktaFlow Controller [color: yellow, icon: lock] {
  Auth User [icon: user-check, shape: oval]
  Fetch LinktaFlow List [icon: git-branch]
  Fetch Specific LinktaFlow [icon: tree]
  Update LinktaFlow [icon: edit-3]
  Delete LinktaFlow [icon: trash-2]
  Create LinktaFlow [icon: magic]
}

// Fetch LinktaFlow List flow
Auth User > Fetch LinktaFlow List: GET /api/v1/flows
Fetch LinktaFlow List > Send LinktaFlow List to User [shape: oval, icon: check-square]

// Fetch Specific LinktaFlow Flow
Auth User > Fetch Specific LinktaFlow: GET /api/v1/flows/:linkaFlowId
Fetch Specific LinktaFlow > Send Specific LinktaFlow to User [shape: oval, icon: check-square]

// Update LinktaFlow Flow
Auth User > Update LinktaFlow: PUT /api/v1/flows/:linkaFlowId
Update LinktaFlow > Send Updated LinktaFlow to User[shape: oval, icon: check-square]

// Delete LinktaFlow Flow
Auth User > Delete LinktaFlow: DELETE /api/v1/flows/:linkaFlowId
Delete LinktaFlow > Notify User LinktaFlow Deleted [shape: oval, icon: check-square]

// Create LinktaFlow Flow
Auth User > Create LinktaFlow

// User Management and Settings Flow
User Controller [color: red, icon: lock] {
  Auth_User_ [icon: user-check, shape: oval]
  Update User Settings [icon: worker]
  Delete User Account [icon: worker]
}

// Update User Settings Flow
Auth_User_ > Update User Settings: PUT /api/v1/users/settings
Update User Settings > Database: Update user doc
Update User Settings >  Notify User Settings Updated [shape: oval, icon: check-square]

// Delete User Account Flow
Auth_User_ > Delete User Account: DELETE /api/v1/users
Delete User Account > Database: Delete user doc & related data
Delete User Account > Notify User Account Deleted [shape: oval, icon: check-square]

// Connections from Authenticated User to other processes
Authenticated > UserInput Controller
Authenticated  > LinktaFlow Controller
Authenticated  > User Controller
Authenticated > BugReport Controller [color: purple, icon: lock]
```