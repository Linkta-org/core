# Authentication Flow with Firebase

Period: 2024-03-06 to 2024-04-03

Status: Draft (This document is currently under review. Status will be updated upon final decision.)

***

## Goal
To develop a custom, secure authentication system that grants verified users access, specifically designed to enhance security by avoiding the storage of ID tokens on the client side. This approach aims to mitigate risks associated with client-side token theft, XSS (Cross-Site Scripting) and CSRF(Cross-Site Request Forgery) attacks.

## Limitations
1. The need for more frequent server-side checks, potentially impacting performance.
2. Possible challenges in user experience due to the absence of persistent client-side state, requiring users to re-authenticate more often.

## Options Explored
1. Using backend session cookie management approach

## Challenges
1. Maintenance and scalability complexity in the future


## Decision

### Overview
This secure authentication flow combines CSRF protection with Firebase's robust authentication mechanisms and server-managed session cookies, ensuring a secure, user-friendly authentication experience.
### Secure Authentication Flow
#### 1.Server Generates CSRF Token:

Upon a user's request (e.g., visiting the login page), the server generates a unique CSRF token and sends it to the client. The client stores this token to be included in the headers of each subsequent request to the server, enhancing protection against CSRF attacks.

#### 2.Initialize Firebase Client SDK:

On the client side, initialize the Firebase client SDK and set the authentication state persistence to `none`. This ensures that the user's session is not stored in local or session storage, enhancing session security.

#### 3.Client Submits Authentication Request:

The user submits their credentials via the Firebase Authentication API, which returns a Firebase ID token upon successful authentication. The client then sends a `POST` request to the `/sessionLogin` endpoint, including the ID token and the CSRF token within the request headers. Including the CSRF token in headers over HTTPS is generally safe, as HTTPS encrypts the content, making it inaccessible to attackers during transit.

#### 4.Server Verifies CSRF Token:

Upon receiving the authentication request, the server first verifies the CSRF token against the user's session to guard against CSRF attacks. This verification ensures that the request is genuine and originated from the client.

#### 5.ID Token Verification and Session Cookie Issuance:

Once the CSRF token is verified, the server uses the Firebase Admin SDK to verify the ID token(using `createSessionCookie()`, this method also verify the ID token in the process). If the verification is successful, the server issues a session cookie with security policies (`maxAge`, `httpOnly`, `secure`, `SameSite`) applied. Optionally, the server can check the `auth_time` property to ensure the sign-in occurred within an acceptable timeframe (e.g., the last 5 minutes) before issuing the session cookie.

#### 6.Client Receives Session Cookie and Redirects:

After receiving the session cookie, the Firebase client SDK clears any lingering authentication state due to the none persistence setting. The client is then redirected to an authenticated page (e.g., profile or input page), completing the initial authentication process.

#### 7.Ongoing Authentication and Session Verification:

With the initial authentication complete, the client now holds a valid session cookie for session management. For every subsequent request to the server, the session cookie (and CSRF token) must be included. The server, alongside the Firebase Admin SDK, verifies the session cookie's validity and checks for revocation, maintaining a secure session.

#### 8.User Sign-Out Process:

To sign out, the client sends a request to the `/sessionLogout` endpoint. The server responds by clearing the session cookie and revoking the user's sessions via the Firebase Admin SDK, ensuring a comprehensive logout. The user is then redirected to the login page, ready for future authentication attempts.

***
## Additional Informations
- `maxAge`: To balance user experience with security measures, a duration between 30 minutes and 2 hours is typically considered optimal. This range is suitable for most applications, aiming to reduce the risk without significantly impacting user convenience. ["For high-security applications, common idle timeouts range from 2 to 5 minutes, while lower-risk applications might opt for 15 to 30 minutes."](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-expiration)
- `httpOnly`: To prevent client-side scripts from accessing the cookie, mitigating the risk of XSS (Cross-Site Scripting) attacks. 
- `secure`: To Ensure the cookie is transmitted only over secure HTTPS connections, enhancing data protection. Optionally, setting the `SameSite` attribute can further secure the cookie from cross-site request forgery (CSRF) attacks by controlling cross-origin requests.
- `VerifySessionCookie` and `VerifyIdToken` returns a Promise <DecodedIdToken/DecodedClaim> contain below properties:
    - aud: string 
    - auth_time: number
    - email_verified: boolean
    - email: string
    - exp: number
    - firebase: { identities: { [key: string]: any; }; sign_in_provider: string; sign_in_second_factor?: string; second_factor_identifier?: string; tenant?: string; [key: string]: any; }
    - iat: number
    - iss: string
    - phone_number_ string
    - picture: string
    - sub: string
    - uid: string


## Resources and Updates
1. [admin/manage-session-cookies](https://firebase.google.com/docs/auth/admin/manage-cookies)
2. [Admin SDK reference](https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.baseauth.md#baseauthverifysessioncookie)

