# How to obtain a Gemini Key
This will be your private key during development. The master key used by the application is not to be shared and used during development.

## Prerequisites:
Have a Google account.

## Steps:
1. Navigate to: https://cloud.google.com/
2. Click Sign In in the upper right: ![Screenshot 2024-03-25 111143](https://github.com/Linkta-org/core/assets/1166090/b572b8e2-cfaa-4ad1-bef4-a032d94ddb67)
3. Sign in with your Google account.
4. Click Console in the upper right: ![Screenshot 2024-03-25 111423](https://github.com/Linkta-org/core/assets/1166090/e69d6198-ce7e-46cd-ab4e-fdfb65bf0b94)
5. If this is your first time, you will be asked to agree to Terms of Service: ![Screenshot 2024-03-25 111548](https://github.com/Linkta-org/core/assets/1166090/504370df-e4ef-40de-97a4-a9cbdcabd8e4)

6. You must agree to continue.
7. Click Select a Project:![Screenshot 2024-03-25 111657](https://github.com/Linkta-org/core/assets/1166090/7cd65c89-eb6a-4b6f-ab16-3db1b2654494)

  7a. If you already have a project where you play with GCP, feel free to use that project and skip steps 8 - 10. We are asking contributors to generate their own keys during development. These will not be linked to Linkta.
8. Click New Project in the popup: ![Screenshot 2024-03-25 111740](https://github.com/Linkta-org/core/assets/1166090/63ab4da7-47f7-4d31-b54b-bad841263208)

9.You can name the new project whatever you would like, but you cannot change it later. Since this project is linked to your personal account and not with Linkta, you can choose whatever you would like.
10. You will get a popup in the upper, right, you can click “SELECT PROJECT” to select the newly created project: ![Screenshot 2024-03-25 112008](https://github.com/Linkta-org/core/assets/1166090/61f8ca9b-be4c-467f-a40f-1213cb9dacb8)

11. Enter “gemini” in the search bar at the top (note that the trailing “-vision” is an autosuggestion) and press enter: ![Screenshot 2024-03-25 112404](https://github.com/Linkta-org/core/assets/1166090/dd13fb5d-5328-4a72-a685-afb265dafec4)

12. Select the Generative Language API link:![Screenshot 2024-03-25 112503](https://github.com/Linkta-org/core/assets/1166090/b064447b-3c27-426e-a008-c4d2d7baace4)

13. Click “ENABLE” on the next page:![Screenshot 2024-03-25 112555](https://github.com/Linkta-org/core/assets/1166090/ad960994-c940-4ad3-915b-af0cbcc872f1)

14. Enabling the API may take a moment, but you will be redirected to the next page.
15. Click “Credentials” on the left:![Screenshot 2024-03-25 112703](https://github.com/Linkta-org/core/assets/1166090/4ca99b1d-64b6-48e4-a541-c8d575a0984d)

16. Click “+ CREATE CREDENTIALS”:![Screenshot 2024-03-25 114239](https://github.com/Linkta-org/core/assets/1166090/0690e8e5-68e5-4f8e-b6d8-96668d07ee7c)

17. Select “API key”:![Screenshot 2024-03-25 114324](https://github.com/Linkta-org/core/assets/1166090/e1bea7b3-ada6-42df-9aaf-54651742c37d)

18. The process may take a moment, but you will have a popup with your API key: ![Screenshot 2024-03-25 114412](https://github.com/Linkta-org/core/assets/1166090/294e8e7d-3620-4e81-bd1b-98bd337930ae)

19. Within your own local development environment, open (or create) the file called .env at within the /config directory.
20. Add the line “GEMINI_API_KEY=<PASTE YOUR NEW API KEY HERE>”. Make sure you have replaced everything including the <> with the API key provided by Google.

## Optional:
1. You may have noticed the warning triangle. To fix this, click on the three dots at the end of the API key line: ![Screenshot 2024-03-25 130811](https://github.com/Linkta-org/core/assets/1166090/a7b15ac8-fd49-4204-92b0-c53f91cca953)

2. Click “Edit API Key”. 
3. You can filter it to be usable only for certain APIs. Here I have searched for “gene” to find the Generative Language API: ![Screenshot 2024-03-25 130946](https://github.com/Linkta-org/core/assets/1166090/e586f89d-a562-408d-9baf-ffc8d41f3936)

