
### Instruction: to visualize the following code,  visit https://app.eraser.io.  Create a new diagram and paste the following code inside the code editor.

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
Session Token Generation > Authenticated User[icon: user-check, shape: oval]
Authentication > Session Token Validation: Subsequent requests
Session Token Validation > Authenticated User

Frontend > Logout
Logout > Session Termination: POST /api/v1/auth/logout
Session Termination > Session Ended [shape: oval, icon: user-x]

// UserInput Submission and Processing Flow
UserInput Submission and Processing [color: green, icon: lock] {
  Submit UserInput [icon: file-text, shape: oval]
  UserInput Sanitization [icon: worker]
  LLM Promp Pre-processing [icon: worker]
  LLM Interaction [icon: worker]
}

Submit UserInput > UserInput Sanitization: POST /api/v1/inputs
UserInput Sanitization > Database: Store sanitized prompt in DB
UserInput Sanitization > LLM Promp Pre-processing:  Add context and structure format
LLM Promp Pre-processing > LLM Interaction
LLM Interaction <> LLM [icon: ai, color: yellow, shape: circle]: Send engineered UserInput
LLM Interaction > Create LinktaFlow
Create LinktaFlow > Database [icon: database, color: blue, shape: circle]: Store generated LinktaFlow in DB
Create LinktaFlow > Send LinktaFlow to User [icon: user, shape: oval] : if successful


// LinktaFlow Management Flow
LinktaFlow Management [color: yellow, icon: lock] {
  Fetch LinktaFlow List [icon: git-branch]
  Fetch Specific LinktaFlow [icon: tree]
  Update LinktaFlow [icon: edit-3]
  Delete LinktaFlow [icon: trash-2]
  Create LinktaFlow [icon: magic]
}

Fetch LinktaFlow List > Send LinktaFlow List to User [shape: oval, icon: check-square]: GET /api/v1/flows
Fetch Specific LinktaFlow > Send Specific LinktaFlow to User [shape: oval, icon: check-square]: GET /api/v1/flows/:linkaFlowId
Delete LinktaFlow > Notify User LinktaFlow Deleted [shape: oval, icon: check-square]: DELETE /api/v1/flows/:linkaFlowId
Update LinktaFlow > Send Updated LinktaFlow to User[shape: oval, icon: check-square]: PUT /api/v1/flows/:linkaFlowId

// User Management and Settings Flow
User Management and Settings [color: red, icon: lock] {
  Update Settings [icon: settings, shape: oval]
  Update User Settings [icon: worker]
  Delete User Account [icon: worker]
}

Update Settings > Update User Settings: PUT /api/v1/users/settings
Update User Settings > Database: Update user doc
Update User Settings >  Notify User Settings Updated [shape: oval, icon: check-square]
Update Settings > Delete User Account: DELETE /api/v1/users
Delete User Account > Database: Delete user doc & related data
Delete User Account > Notify User Account Deleted [shape: oval, icon: check-square]

// Connections from Authenticated User to other processes
Authenticated User > UserInput Submission and Processing
Authenticated User  > LinktaFlow Management
Authenticated User  > User Management and Settings
```