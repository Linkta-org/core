# Running Cypress E2E Tests

Before running the Cypress end-to-end (E2E) tests, ensure that you've installed all necessary dependencies and that the application server is running.

Note: Cypress is currently only configured for the `landing-page` repository.

## Initial Setup

1. **Install Dependencies**:

   Before running the tests, make sure you've installed all required dependencies. In the `landing-page` root directory, run:

    ```bash
    npm install
    ```


2. **Start the Application Server**:

   The application server needs to be running for Cypress to interact with the application. Start the server by running:

    ```bash
    npm run dev
    ```

## Running Cypress Tests

With the server running, you can now proceed to run the Cypress tests.

### Interactive Mode

If you prefer to visually monitor the tests as they run, you can open Cypress in interactive mode:

 - **Open the Cypress Test Runner**:

    ```bash
    npm run cypress-open
    ```

    This command launches the Cypress Test Runner in a new window, where you can select and run individual tests or suites and observe their execution in real-time.

    1. Select "E2E Testing".
    2. Select "Chrome".
    3. Click on "Start E2E Testing in Chrome".
    4. Select the test you want to run (e.g., `landingPage.cy.ts`).

### Headless Mode

For running tests in your terminal without the GUI, use the headless mode:

 - **Run Cypress Tests in Headless Mode**:

    ```bash
    npm run cypress-run
    ```

    This command executes all tests in the background, using Chrome, and outputs the results to the terminal. It's the preferred method for automated or quick testing.

## GitHub Actions

Our landing-page repository is configured with GitHub Actions to run these tests automatically. 

For more information, [`click here`](https://github.com/Linkta-org/landing-page/pull/15).