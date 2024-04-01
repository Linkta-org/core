# Authentication Flow with Firebase

Period: 2024-03-06 to 2024-03-31

Status: Draft (This document is currently under review. Status will be updated upon final decision.)

***

## Goal
To develop a custom, secure authentication system that grants verified users access, specifically designed to enhance security by avoiding the storage of ID tokens on the client side. This approach aims to mitigate risks associated with client-side token theft and XSS (Cross-Site Scripting) attacks.

## Limitations
1. The need for more frequent server-side checks, potentially impacting performance.
2. Possible challenges in user experience due to the absence of persistent client-side state, requiring users to re-authenticate more often.

## Options Explored
1. Using backend session cookie approach

## Challenges
1. Maintenance and scalability complexity in the future


## Decision

### Overview

The chosen authentication flow begins with client-side user sign-in, progresses through backend token validation, and ends with session management via httpOnly cookies. This method prioritizes security by minimizing client-side exposure of sensitive tokens.

### Client-Side Authentication

#### Initialization and Persistence Setting

The authentication process begins with the client-side application initializing the Firebase Authentication module. This involves configuring the Firebase project details to ensure secure communication with Firebase services. For enhanced security, particularly because of the use of HttpOnly cookies, the persistence of Firebase's authentication state must be set to `none`. This means that the state is not stored in client-side storage, reducing the risk of authentication tokens being stolen through client-side attacks.

#### User Sign-In

Upon signing in, users provide credentials, which Firebase Authentication verifies. Firebase returns an ID token in user object, which the client application sends to the backend server via a secure POST request. It's essential to include CSRF (Cross-Site Request Forgery) protection in this step to prevent attackers from impersonating legitimate users.

### Backend: Session Cookie Management

#### Creating a Session Cookie

The backend, upon receiving the ID token, validates it and then uses the Firebase Admin SDK to exchange it for a session cookie. This cookie is configured with several security measures in mind, including settings like session expiration (maxAge), the httpOnly, and secure flags, thereby enhancing its security against various attacks.

- `maxAge`: To balance user experience with security measures, a duration between 30 minutes and 2 hours is typically considered optimal. This range is suitable for most applications, aiming to reduce the risk without significantly impacting user convenience. [For high-security applications, common idle timeouts range from 2 to 5 minutes, while lower-risk applications might opt for 15 to 30 minutes.](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-expiration)
- The `httpOnly` flag is used to prevent client-side scripts from accessing the cookie, mitigating the risk of XSS (Cross-Site Scripting) attacks. The secure flag ensures the cookie is transmitted only over secure HTTPS connections, enhancing data protection. Optionally, setting the SameSite attribute can further secure the cookie from cross-site request forgery (CSRF) attacks by controlling cross-origin requests.

#### Verifying Session Cookies

Each request to access protected resources on the backend requires session cookie verification. This process ensures the session is valid and checks for revocation, adding a layer of security by verifying the session's current validity.

### Secure Sign-Out and Session Management
When a user initiates sign-out, the client informs the backend, which first verifies the session cookie. Upon verification, it extracts the user's unique identifier from the cookie and uses the Firebase Admin SDK to revoke all the user’s refresh tokens, a crucial step to invalidate any potentially compromised tokens and prevent unauthorized account access. This action is particularly vital if the logout is due to security concerns like suspected account compromise.

Subsequently, the backend clears the session cookie, effectively ending the user's session. Finally, the server redirects the user to the login page, ensuring a smooth transition for re-authentication and secure access to the application. This redirection is enforced regardless of the outcomes of previous steps, maintaining a consistent and secure user experience even in scenarios of failed session verification or token revocation.
***

## Resources and Updates
1. [admin/manage-session-cookies](https://firebase.google.com/docs/auth/admin/manage-cookies)