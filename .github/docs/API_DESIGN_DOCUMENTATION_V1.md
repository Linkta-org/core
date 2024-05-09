# API Design Documentation

## Introduction
This document provides an overview of the Linkta API, which follows a RESTful architecture and uses JSON for request and response payloads.

## Base URL
The base URL for the Linkta API is: `https://api.linkta.io/v1`

## Diagram
![API Design Flowchart](./assets/api-design-flowchart.svg "api design flowchart")

## Endpoints

### Authentication
> In the current design, CSRF tokens have been omitted from the authentication flow design to simplify the process and reduce overhead. However, the decision to include or exclude CSRF tokens has not been finalized and will require further discussion and a comprehensive risk assessment. The focus remains on maintaining a strong security posture through the use of Firebase Authentication, secure session cookie configuration, and the stateless nature of the API.

#### Session Login
- **Endpoint:** `POST /api/auth/session-login`
- **Description:** Authenticates a user using Firebase Authentication and generates a session token.
- **Payload:** `{ "idToken": "<Firebase ID Token>" }`
- **Responses:**
    - `200 OK`  : `{ "sessionToken": "<newly_generated_session_token>" , ``"message": "Welcome, [name]! You are now logged in."``}`
    - `400 Bad Request`  : `{ "message": "The login token provided is incorrect or expired. Please log in again to obtain a valid token." } `

#### Session Logout
- **Endpoint:** `POST /api/auth/session-logout`
- **Description:** Invalidates the session token, effectively logging out the user.
- **Payload:** `{ "sessionToken": "<session_token_to_invalidate>" }`
- **Responses:**
    - `200 OK`  : `{ "message": "Logout successful." }`
    - `400 Bad Request`  : `{ "message": "Your session has expired. Please log in again to continue." } `

### Prompt Submission and Augmentation
> The asynchronous processing and status checking endpoints described in this feature are subject to change based on ongoing performance testing and optimization. If the response time of the LLM interaction can be sufficiently reduced, we may opt for a simpler, synchronous approach where the generated tree structure is returned directly in the response of the `POST /api/prompts` endpoint. This would eliminate the need for the separate status checking endpoint and simplify the overall flow. However, if the LLM interaction remains time-consuming, we will explore the asynchronous approach to ensure a non-blocking user experience.

#### Submit Prompt
**Step 1: Immediate Acknowledgement**
- **Endpoint:** `POST /api/prompts`
- **Description:** Receives a user's prompt and begins processing it to generate a tree structure.
- **Payload:** `{ "prompt": "User's initial prompt" }`
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `202 Accepted` : `{ "message": "Your prompt has been received and is now being processed. You can check the progress using the task ID: [task_id].", "task_id": "[generated_task_id]" }`
    - `400 Bad Request` : `{ "message": "Your request could not be processed as it contains invalid data. Please check your input and try again." }`
    - `401 Unauthorized` : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." }`
    - `429 Too Many Requests` : `{ "message": "You have made too many requests in a short period. Please wait a while before trying again." }`

**Step 2: Status Endpoint**
- **Endpoint:** `GET /api/prompts/status/{task_id}`
- **Description:** Checks the status of a prompt processing task.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  (processing ongoing): `{ "status": "Processing", "message": "Your prompt is still being processed. Please check back shortly for updates." }`
    - `200 OK`  (processing completed): `{ "status": "Completed", "tree": { "id": "treeId", "nodes": [/* array of nodes */] }}`
    - `401 Unauthorized` : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." }`
    - `404 Not Found` : `{ "message": "The requested task could not be found. The task ID might be incorrect or the task might have been completed." }`
    - `500 Internal Server Error` : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are
    working on a solution. Please try again later." }`

**Step 3: Final Notification**

- For completed tasks, the final check by the user on the `/api/prompts/status/{task_id}`  endpoint will retrieve the `200 OK`  response with the `"status": "Completed"`  payload, containing the generated tree structure.

### Tree Management
#### Fetch Tree List
- **Endpoint:** `GET /api/trees`
- **Description:** Retrieves all trees (names only) associated with the authenticated user after user login.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "trees": [{ "id": "treeId", "name": "Tree Name" }] }`
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `
#### Fetch Specific Tree
- **Endpoint:** `GET /api/trees/{treeId}`
- **Description:** Retrieves a specific tree and all its associated nodes based on the tree's unique identifier.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "tree": { "id": "treeId", "nodes": [/* array of nodes */] } }`
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `404 Not Found`  : `{ "message": "The requested tree could not be found. It may have been deleted or the ID might be incorrect." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `
#### Update Tree
- **Endpoint:** `PUT /api/trees/{treeId}`
- **Description:** Updates the state of a specific tree.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "message": "Tree updated successfully on [timestamp]." } `
    - `400 Bad Request`  :` { "message": "Your request could not be processed as it contains invalid data. Please check your input and try again." } `
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `404 Not Found`  : `{ "message": "The requested tree could not be found. It may have been deleted or the ID might be incorrect." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." }`
#### Delete Tree
- **Endpoint:** `DELETE /api/trees/{treeId}`
- **Description:** Deletes a specific tree and all its associated nodes.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "message": "Tree deleted successfully" }`
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `403 Forbidden`  : `{ "message": "You do not have permission to perform this action. If you believe this is an error, please contact support." } `
    - `404 Not Found`  : `{ "message": "The requested tree could not be found. It may have been deleted or the ID might be incorrect." } `
    - `500 Internal Server Error`  :` { "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

### User Management
#### Update User Settings
- **Endpoint:** `PUT /api/users/settings`
- **Description:** Updates user settings.
- **Payload:** `{ "theme": "dark" }`
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  : `{ "message": "Your settings has been updated successfully." }`
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
#### Delete User Account
- **Endpoint:** `DELETE /api/users`
- **Description:** Deletes the user account.
- **Headers:**
    - `Authorization: Bearer <session_token>`
- **Responses:**
    - `200 OK`  :` { "message": "``User account with ID [user_id] has been successfully deleted.``" } `
    - `401 Unauthorized`  : `{ "message": "You need to log in to access this resource. Please ensure you are logged in and try again." } `
    - `403 Forbidden`  : `{ "message": "You do not have permission to perform this action. If you believe this is an error, please contact support." } `
    - `500 Internal Server Error`  : `{ "message": "A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later." } `

## Data Design
> The proposed data design outlined in this document is still under development and subject to significant revisions as it undergoes rigorous testing during the sandbox sprint. We will update our documentation and integrate the final version into our system upon completion.

![Data Design ER Diagram](./assets/data-design-erdiagram.svg "data design er diagram")

**Current Data models:**

**User Model**

- **ID** (String, required, unique): A unique identifier typically used to store Firebase ID.
- **TreeIDs** (Array of String references): A list of references to Tree objects.
**Tree Node Model**

- **ID** (String, required): A unique identifier for each node.
- **Content** (String, required): The content or information contained within the node.
- **ChildNodes** (Array of String references): References to child Node objects, forming a hierarchical (tree-like) structure.
- **Depth** (Integer, required, default: 0): The depth level of the node within the tree, where 0 typically represents the root level.

**Proposed Data models**_- work in progress:_

### User Model
- **ID** (String, unique, required): Unique identifier for the user, typically the Firebase UID.
- **Email** (String, unique, required): User's email address.
- **Name** (String, required): The name of the user.
- **Settings**:
    - **Theme** (String, default: 'light'): The theme setting for the user's interface.
- **CreatedAt** (DateTime, required): Timestamp when the user account was created.
- **LastUpdated** (DateTime, required): Timestamp when the user settings were last updated.
### Prompt Meta Model
- **ID** (String, unique, required): Unique identifier for the prompt metadata.
- **UserID** (String, required, Index, true): Reference to the User ID.
- **OriginalPrompt** (String, required): The original text of the user's prompt.
- **TreeID** (String, required): Reference to the tree to which the prompt belongs.
- **CreatedAt** (DateTime, required): Timestamp when the prompt metadata was created.
### Prompt Data Model
- **ID** (String, unique, required): Unique identifier for the prompt data.
- **PromptMetaID** (String, required): Reference to the Prompt Meta ID.
- **EngineeredPrompt** (String): The prompt after processing and optimization.
- **Response** (Object): The raw response from the language model processing the engineered prompt.
### Tree Model
- **ID** (String, unique, required): Unique identifier for the tree.
- **UserID** (String, required, Index, true): Reference to the user who owns the tree.
- **Name** (String, required): Descriptive name of the tree.
- **RootNodeID** (String, required, Index, true): Reference to the root node of this tree.
- **CreatedAt** (DateTime, required): Timestamp when the tree was created.
- **LastUpdated** (DateTime, required): Timestamp when the tree was last updated.
### Node Model
- **ID** (String, required): Unique identifier for the node.
- **TreeID** (String, required): Reference to the tree to which the node belongs.
- **ParentID** (String, optional): Direct reference to the parent node.
- **Content** (String, required): Information or data contained within the node.
- **Position**:
    - **X** (Number, required): X-coordinate for visual positioning in frontend.
    - **Y** (Number, required): Y-coordinate for visual positioning in frontend.
- **CreatedAt** (DateTime, required): Timestamp when the node was created.
- **LastUpdated** (DateTime): Timestamp when the node was last updated.

## Services
### User Authentication and Authorization Service
**Authentication**
Initial request:
- **Firebase Token Validation:** Validates Firebase ID Token using Firebase Admin SDK
- **Session Token Generation:** If Firebase Authentication is successful, generate a custom session token for the client. This token securely contains the user's ID as an embedded claim.

Subsequent requests:
- **Session Token Validation:** Validates the session token for any subsequent requests that require authentication.
- The API extracts the user ID from the token to identify the user and authorize actions based on their permissions.

**Session Termination:**
- **Token Invalidation:** Removes the session token

> **_Using the Session Token: _**
_Header Example: _`_Authorization: Bearer <session_token> _`_ _
**_Token Validation and User ID Extraction: _**_When a request is received, the API validates the session token and extracts the user ID embedded within it. This ID is then used to perform user-specific actions, such as accessing or modifying user data._

### Prompt Submission and Augmentation Service
**Prompt Processing:**

- Validates and cleans the user's submitted prompt according to a predefined schema. Toxic input should not be accepted (handled in frontend input validation?).
- Stores the prompt in the database.
**Prompt Engineering:**

- Takes the sanitized prompt, adds the relevant context, and transforms it into a format optimized for processing by an LLM.
- Stores the engineered prompt in the database.
**Async LLM Interaction:**

- **Background Processing:** Processes the prompt in a background job queue. Upon submitting a prompt, the user receives a task ID, which they can use to poll the status of the processing. This approach allows the user interface to remain responsive and provides the user with real-time updates on the processing status.
- **LLM Request Handling:** Sends the engineered prompt to the LLM. It then waits for a response. If a response is not received within a set timeout period, it triggers a retry mechanism.
- **Retry Mechanism:** If the LLM does not respond within the expected time, the middleware retries the request up to a predefined number of times.
- **Response Validation:** Post-processes the LLM's response and stores the response in the database.
> **Note:** The storage of both the initial and engineered prompts, while not directly impacting the current functionality of the MVP, is strategically planned to facilitate future upgrades that might include RAG capabilities. These enhancements would potentially use the accumulated data to refine and personalize the model's outputs, providing a more tailored and context-aware user experience.

### Tree Visualization and Operations Service
Work in progress.

> We are actively testing numerous workflows to assess their effectiveness and integration capabilities, leading to possible significant modifications in this service as well as the flowchart components. The current version may not yet reflect the final design. The finalized designs, once tested and approved, will be updated in our documentation and implemented accordingly.

### User Management Service
**Update User Settings:**
- Updates the user's settings in the database based on the provided payload

**Delete User Account:**
- Removes the user's record from the database, along with any related data such as user settings, trees, nodes, and prompt history.

## Error Handling
Work in progress.

## Rate Limiting
Work in progress.

## Caching and Performance
Work in progress.

## Security
See [Linkta System Design Documentation](https://app.eraser.io/workspace/HVzb82068UpkNrfem8AL)

## Testing
See [Linkta System Design Documentation](https://app.eraser.io/workspace/HVzb82068UpkNrfem8AL)

## Deployment and DevOps
See [Linkta System Design Documentation](https://app.eraser.io/workspace/HVzb82068UpkNrfem8AL)

## API Versioning and Lifecycle
**Versioning Strategy**

Linkta API adheres to semantic versioning (SemVer). Major versions (`**v1**`, `**v2**`, etc.) indicate potential backward-incompatible changes, while minor and patch updates (`**v1.1**`, `**v1.2**`, `**v1.2.1**`, etc.) introduce backward-compatible improvements and bug fixes.

**Current Version**

The current base URL `**https://api.linkta.io/v1**`  represents the first major version of the API. Clients should include the version number in the base URL to ensure compatibility.

(Work in progress.)
