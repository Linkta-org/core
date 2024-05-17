
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

// User Authentication and Authorisation Flow
User Authentication and Authorisation [color: blue] {
  Login [icon: log-in]
  Logout [icon: log-out]
  Authentication [icon: key]
  Firebase Token Validation [icon: worker]
  Session Token Generation [icon: worker]
  Session Token Validation [icon: worker]
  Session Termination [icon: worker]
}

Firebase Auth[shape: circle, icon: firebase, color: orange]

Frontend <> Firebase Auth: Retrieves Firebase ID token
Frontend > Login
Login > Authentication: POST /api/v1/auth/login
Authentication > Firebase Token Validation: Initial request
Firebase Token Validation <> Firebase Auth: validate token through Firebase Admin SDK
Firebase Token Validation > Session Token Generation
Session Token Generation > Authenticated [icon: check-circle]
Authentication > Session Token Validation: Subsequent requests
Session Token Validation > Authenticated

Frontend > Logout
Logout > Session Termination: POST /api/v1/auth/logout
Session Termination > Session Ended [shape: oval, icon: user-x]

// UserInput Submission and Processing Flow
UserInput Submission and Processing [color: green, icon: lock] {
  Auth User_ [icon: user-check, shape: oval]
  Submit UserInput [icon: file-text]
  Fetch UserInput [icon: file-text]
  Sanitize UserInput [icon: worker]
  Store UserInput in Database [icon: worker]
}

Auth User_ > Submit UserInput: POST /api/v1/inputs
Auth User_ > Fetch UserInput: POST /api/v1/inputs/:userInputId
Submit UserInput > Sanitize UserInput
Sanitize UserInput > Store UserInput in Database
Store UserInput in Database > Database: Store sanitized prompt in DB
Sanitize UserInput > GenAIController [icon: worker]
GenAIController <> LLM [icon: ai, color: yellow, shape: circle]: Send engineered UserInput
GenAIController > Create LinktaFlow
Create LinktaFlow > Database [icon: database, color: blue, shape: circle]: Store generated LinktaFlow in DB
Create LinktaFlow > Send LinktaFlow to User [icon: check-square, shape: oval] : if successful
Fetch UserInput <> Database: Retrieve UserInput from DB
Fetch UserInput > Send UserInpt to User [icon: check-square, shape: oval]


// LinktaFlow Management Flow
LinktaFlow Management [color: yellow, icon: lock] {
  Auth_User [icon: user-check, shape: oval]
  Fetch LinktaFlow List [icon: git-branch]
  Fetch Specific LinktaFlow [icon: tree]
  Update LinktaFlow [icon: edit-3]
  Delete LinktaFlow [icon: trash-2]
  Create LinktaFlow [icon: magic]
}

Auth_User > Fetch LinktaFlow List: GET /api/v1/flows
Auth_User > Fetch Specific LinktaFlow: GET /api/v1/flows/:linkaFlowId
Auth_User > Delete LinktaFlow: DELETE /api/v1/flows/:linkaFlowId
Auth_User > Update LinktaFlow: PUT /api/v1/flows/:linkaFlowId
Auth_User > Create LinktaFlow
Fetch LinktaFlow List > Send LinktaFlow List to User [shape: oval, icon: check-square]
Fetch Specific LinktaFlow > Send Specific LinktaFlow to User [shape: oval, icon: check-square]
Delete LinktaFlow > Notify User LinktaFlow Deleted [shape: oval, icon: check-square]
Update LinktaFlow > Send Updated LinktaFlow to User[shape: oval, icon: check-square]

// User Management and Settings Flow
User Management and Settings [color: red, icon: lock] {
  Auth User__ [icon: user-check, shape: oval]
  Update User Settings [icon: worker]
  Delete User Account [icon: worker]
}

Auth User__ > Update User Settings: PUT /api/v1/users/settings
Update User Settings > Database: Update user doc
Update User Settings >  Notify User Settings Updated [shape: oval, icon: check-square]
Auth User__ > Delete User Account: DELETE /api/v1/users
Delete User Account > Database: Delete user doc & related data
Delete User Account > Notify User Account Deleted [shape: oval, icon: check-square]

// Connections from Authenticated User to other processes
Authenticated > UserInput Submission and Processing
Authenticated  > LinktaFlow Management
Authenticated  > User Management and Settings
```