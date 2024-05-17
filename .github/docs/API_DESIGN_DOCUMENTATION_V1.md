# API Design Documentation

## Introduction
This document provides an overview of the Linkta API, which follows a RESTful architecture and uses JSON for request and response payloads.

## Base URL
The base URL for the Linkta API is: `https://api.linkta.io/v1`

## Diagram
![API Design Flowchart](./assets/api-design-flowchart.svg "api design flowchart")

## Endpoints
### User Authentication and Authorization
>_Work in progress_

#### Session Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Description:** Authenticates a user using Firebase Authentication and generates a session token.
- **Payload:** `{ "idToken": "<Firebase ID Token>" }`
- **Responses:**
    - `200 OK`  : `{ "sessionToken": "<Newly Generated Session Token>" , "message": "Welcome, [name]! You are now logged in."}`
    - `400 Bad Request`  : `{ "message": "The login token provided is incorrect or expired. Please log in again to obtain a valid token." } `

#### Session Logout
- **Endpoint:** `POST /api/v1/auth/logout`
- **Description:** Invalidates the session token, effectively logging out the user.
- **Payload:** `{ "sessionToken": "<Session Token to Invalidate>" }`
- **Responses:**
    - `200 OK`  : `{ "message": "Logout successful." }`
    - `400 Bad Request`  : `{ "message": "Your session has expired. Please log in again to continue." } `

### UserInput Submission and Processing

#### Submit UserInput

Design 1:
- **Endpoint:** `POST /api/v1/inputs`
- **Description:** Receives a UserInput and begins processing it to generate a LinktaFlow.
- **Payload:** `{ "input": "User's Initial Input" }`
- **Headers:**
    - `Authorization: Bearer <session_token>`
    - `requestId: <Unique Request ID>`
- **Responses:**
- `200 OK: { "linktaFlow": <LinktaFlow Object>} `
- `400 Bad Request` : `{ "message": "Your request could not be processed as it contains invalid data. Please check your input and try again." }`
- `401 Unauthorized` : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." }`
- `429 Too Many Requests` : `{ "message": "You have made too many requests in a short period. Please wait a while before trying again." }`
- `500 Internal Server Error` : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." }`

Design 2 (async):
> If the LLM interaction in design 1 remains time-consuming , we can explore this asynchronous approach to ensure a non-blocking user experience.

**Step 1: Immediate Acknowledgement**

- **Endpoint:** `POST /api/v1/inputs `
- **Description:** Receives a UserInput and begins processing it to generate a LinktaFlow.
- **Payload:** `{ "input": "User's Initial Input" }`
- **Headers:**
    - `Authorization: Bearer <session_token>`
    - `requestId: <Unique Request ID>`
- **Responses:**
    - `202 Accepted` : `{ "message": "Your input has been received and is now being processed. You can check the progress using the task ID: [taskID].", "taskId": "[Generated TaskId]" }`
    - `400 Bad Request` : `{ "message": "Your request could not be processed as it contains invalid data. Please check your input and try again." }`
    - `401 Unauthorized` : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." }`
    - `429 Too Many Requests` : `{ "message": "You have made too many requests in a short period. Please wait a while before trying again." }`

**Step 2: Status Endpoint**
- **Endpoint:** `GET /api/v1/inputs/status/:task_id `
- **Description:** Checks the status of a UserInput processing task.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  (processing ongoing): `{ "status": "processing", "message": "Your input is still being processed. Please check back shortly for updates." }`
    - `200 OK`  (processing completed): `{ "status": "completed", "linktaFlow": <LinktaFlow Object>}`
    - `401 Unauthorized` : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." }`
    - `404 Not Found` : `{ "message": "The requested task could not be found. The task ID might be incorrect or the task might have been completed." }`
    - `500 Internal Server Error` : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." }`

#### Fetch UserInput

- **Endpoint:** `GET /api/v1/inputs/:userInputId`
- **Description:** Retrieves a specific UserInput by its unique identifier.
- **Parameters:**
  - `userInputId` (string, required): The unique identifier of the UserInput to retrieve.
- **Headers:**
  - `Authorization: Bearer <session_token>`
- **Responses:**
  - `200 OK`: `{ "userInput": <UserInput Object> }`
  - `400 Bad Request`: `{ "message": "The provided input ID is invalid. Please check the ID and try again." }`
  - `401 Unauthorized`: `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." }`
  - `404 Not Found`: `{ "message": "The requested UserInput could not be found. It may have been deleted or the ID might be incorrect." }`
  - `500 Internal Server Error`: `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." }`

### LinktaFlow Management
>_Work in progress_

#### Fetch LinktaFlow List
- **Endpoint:** `GET /api/v1/flows`
- **Description:** Retrieves all LinktaFlows associated with the authenticated user.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "linktaFlows": [/*Array of linktaFlow Objects*/] }  `
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

#### Fetch Specific LinktaFlow
- **Endpoint:** `GET /api/v1/flows/:linktaFlowId `
- **Description:** Retrieves a specific LinktaFlow object based on the tree's unique identifier.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  :` { "linktaFlow": <LinktaFlow Object> }`
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `404 Not Found`  : `{ "message": "The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

#### Update LinktaFlow
- **Endpoint:** `PUT /api/v1/flows/:linktaFlowId`
- **Description:** Updates a specific LinktaFlow.
- **Payload:** `{ "updatedLinktaFlow": <Updated LinktaFlow Object> }  `
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "message": "Linkta Flow updated successfully on [timestamp]." } `
    - `400 Bad Request`  :` { "message": "Your request could not be processed as it contains invalid data. Please check your input and try again." } `
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `404 Not Found  : { "message": "The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect." }  `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." }`

#### Delete LinktaFlow
- **Endpoint:** `DELETE /api/v1/flows/:linktaFlowId `
- **Description:** Deletes a specific LinktaFlow Object and all its associated data.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "message": "Linkta Flow with ID [linktaFlowId] has been successfully deleted." } `
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `403 Forbidden`  : `{ "message": "You do not have permission to perform this action. If you believe this is an error, please contact support." } `
    - `404 Not Found`  : `{ "message": "The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect." } `
    - `500 Internal Server Error`  :` { "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

### User Management and Settings
>_Work in progress_

#### Update User Settings
- **Endpoint:** `PUT /api/v1/users/settings`
- **Description:** Updates user settings.
- **Payload:** `{ "theme": "dark" }`
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "message": "Your settings has been updated successfully." }`
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `403 Forbidden`  : `{ "message": "You do not have permission to perform this action. If you believe this is an error, please contact support." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

#### Delete User Account
- **Endpoint:** `DELETE /api/v1/users `
- **Description:** Deletes the user account.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  :` { "message": "User account with ID [userId] has been successfully deleted." } `
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `403 Forbidden`  : `{ "message": "You do not have permission to perform this action. If you believe this is an error, please contact support." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

### Bug Reporting
>_Work in progress_

## Data Design
### Diagram
>_Work in progress_

### Data Entities
>_Work in progress_
#### User
- id (string)
- firstName (string, required, minLength: 3, maxLength: 30, trimmed)
- lastName (string)
- linktaFlows (array of LinktaFlow references)
- createdAt (timestamp)
- updatedAt (timestamp)

#### UserInput
- id (string)
- input (string, required)
- createdAt (timestamp)
- updatedAt (timestamp)

#### LinktaFlow
- id (string)
- nodes (array of Node objects)
    - Node
        - id (string)
        - type (string)
        - position
            - x (number)
            - y (number)
        - data
            - label (string)
        - style (object)
        - className (string)
        - hidden (boolean)
        - selected (boolean)
        - draggable (boolean)
        - dragging (boolean)
        - selectable (boolean)
        - connectable (boolean)
        - deletable (boolean)
        - dragHandle (string)
        - width (number, optional)
        - height (number, optional)
        - parentId (string, optional)
        - zIndex (number)
        - extent (string, enum: ['parent', null], optional)
        - expandParent (boolean)
        - sourcePosition (string, enum: ['left', 'right', 'top', 'bottom'], optional)
        - targetPosition (string, enum: ['left', 'right', 'top', 'bottom'], optional)
        - ariaLabel (string)
        - focusable (boolean)
        - resizing (boolean)
- edges (array of Edge objects)
    - Edge
        - id (string)
        - source (string)
        - target (string)
        - type (string, optional)
        - sourceHandle (string, optional)
        - targetHandle (string, optional)
        - style (object)
        - animated (boolean)
        - hidden (boolean)
        - deletable (boolean)
        - className (string)
        - selected (boolean)
        - zIndex (number)
        - ariaLabel (string)
        - focusable (boolean)
        - label (string, optional)
        - labelStyle (object)
        - labelShowBg (boolean)
        - labelBgStyle (object)
        - labelBgPadding (array of numbers, optional)
        - labelBgBorderRadius (number)
        - pathOptions (map of PathOption objects)
            - PathOption
                - offset (number, optional)
                - borderRadius (number, optional)
                - curvature (number, optional)
- userInputId (UserInput reference)
- userId (User reference)

#### Bug Report
>_Work in progress_

## Services and Utility Functions

**User Authentication and Authorization**
>_Work in progress_

_Initial request_:
- **Firebase Token Validation:** Validates Firebase ID Token using Firebase Admin SDK
- **Session Token Generation:** If Firebase Authentication is successful, generate a custom session token for the client. This token securely contains the user's ID as an embedded claim.

_Subsequent requests_:
- **Session Token Validation:** Validates the session token for any subsequent requests that require authentication.
- The API extracts the user ID from the token to identify the user and authorize actions based on their permissions.

**Session Termination:**
- **Token Invalidation:** Clears the session token

> **_Using the Session Token: _**
_Header Example: _`_Authorization: Bearer <session_token> _`_ _
**_Token Validation and User ID Extraction: _**_When a request is received, the API validates the session token and extracts the user ID embedded within it. This ID is then used to perform user-specific actions, such as accessing or modifying user data._

### UserInput Submission and Processing

Class: UserInputController
Methods:
- submitUserInput: Validates and processes the user input through sanitization and AI services, then stores and returns the generated LinktaFlow.
- fetchUserInput: Retrieves and returns details of a specific user input by ID, ensuring the request is authorized and the input exists.
- fetchUserInputStatus (design 2): Checks and returns the processing status of a user input.
- sanitizeUserInput: Utility method for cleansing user input to ensure safety and conformity to expected formats.
- storeUserInputInDatabase: Utility method for storing sanitized user input into the database.

### LinktaFlow Interaction
> _Work in progress_

> Current design in sandbox repo (to be removed)

Class: GenAIController
Methods:
- generateResponse: Handles generating a basic response from the AI.
- generateTree: Manages the full lifecycle of generating a tree based on user input, which involves invoking AI, parsing the response, and storing the result in the database.
- createConnection: Establishes a connection to the AI service.
- queryTree: Constructs and sends a query to the AI service based on a refined prompt methodology.

Class: TreePrompts
Methods:
- oneShot(prompt: string)
Generates a single, detailed instruction prompt for the LLM to process and respond to based on the user's input. This method is straightforward but noted to be less effective.
- zeroShot(prompt: string)
Creates a prompt that instructs the AI to output in a structured JSON format without previous examples, focusing purely on the user's current input.
- chainOfThought(prompt: string)
Utilizes a conversational approach, building a context through a simulated dialogue history that influences the AI’s response to the current prompt.
- costar(prompt: string)
Generates a highly detailed and structured prompt, dictating the format, context, tone, and audience for the AI's response, aimed at producing complex tree-like structures for visualization.

Class: Gemini
Methods:
- generateResponse: Generates a response from a prompt.
- generateConversation: Manages a conversational context with the AI, allowing for more dynamic interactions based on a conversation history.

**Data Flow**
User Input on Frontend
│
└───► PromptInputForm (React Component)
     │
     └───► User types into TextField
          │
          └───► inputValue state updated
               │
               └───► User clicks "Generate" button
                    │
                    └───► handleSubmit function triggers
                         │
                         └───► newPromptMutation.mutate sends POST request to Backend
                              │
                              └───► Express Server (/gen-ai/query endpoint)
                                   │
                                   └───► genAIController.generateTree handles request
                                        │
                                        ├─► TreePrompts utility generates appropriate prompt
                                        │  │
                                        │  └───► genAIController.createConnection establishes connection with AI provider
                                        │       │
                                        │       └───► genAIController.queryTree sends prompt to AI
                                        │            │
                                        │            └───► Gemini AI generates tree based on prompt
                                        │
                                        └───► MongoDB: Store generated LinktaFlow and UserInput
                                             │
                                             └───► Response with tree data sent back to Frontend
                                                  │
                                                  └───► PromptInputForm receives response
                                                       │
                                                       └───► User navigates to '/output' displaying the result

### User Management and Settings
> _Work in progress_

**Update User Settings:**

- Updates the user's settings in the database based on the provided payload
**Delete User Account:**

- Removes the user's record from the database, along with any related data such as user settings, LinktaFlows, and input history.

## Error Handling
> _Work in progress_

## Rate Limiting
> _Work in progress_

## Caching and Performance
> _Work in progress_

## Security
> Insert System Design Doc link here

## Testing
> Insert System Design Doc link here

## Deployment and DevOps
> Insert System Design Doc link here

## API Versioning and Lifecycle
> _Work in progress_

**Versioning Strategy**
Linkta API adheres to semantic versioning (SemVer). Major versions (`**v1**`, `**v2**`, etc.) indicate potential backward-incompatible changes, while minor and patch updates (`**v1.1**`, `**v1.2**`, `**v1.2.1**`, etc.) introduce backward-compatible improvements and bug fixes.

**Current Version**
The current base URL `**https://api.linkta.io/v1**`  represents the first major version of the API. Clients should include the version number in the base URL to ensure compatibility.
