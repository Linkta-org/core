# Linkta System Design Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Constraints and Limitations](#constraints-and-limitations)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Data Models and Database Design](#data-models-and-database-design)
7. [API Design](#api-design)
8. [Module or Component Design](#module-or-component-design)
9. [Business Logic and Algorithms](#business-logic-and-algorithms)
10. [Caching and Performance Optimization](#caching-and-performance-optimization)
11. [Error Handling and Logging](#error-handling-and-logging)
12. [Security Considerations](#security-considerations)
13. [Testing Strategy](#testing-strategy)
14. [Deployment and DevOps](#deployment-and-devops)
15. [Scalability and Performance](#scalability-and-performance)
16. [Maintenance and Support](#maintenance-and-support)
17. [Future Enhancements and Roadmap](#future-enhancements-and-roadmap)

## Introduction
Linkta is an innovative learning platform designed to empower users by connecting ideas and concepts, enabling efficient organization and understanding of complex topics. It allows users to create personalized learning paths, establish hierarchies, and visualize relationships between concepts, facilitating a deeper understanding and efficient learning process. This document outlines the system design for the Minimum Viable Product (MVP) of Linkta.

## Requirements

### Functional Requirements:
- **User Authentication and Authorization**
    - Support OAuth and other single sign-on methods
    - Provide forgot password functionality
    - Implement authentication for API endpoints
- **Prompt Submission and Augmentation**
    - Provide a method for users to submit prompts
    - Integrate with LLM for prompt processing and tree generation
    - Store prompt and tree data in the database
- **Tree Visualization and Operations:**
    - Retrieve and display trees associated with a user
    - Users can visualize a tree
    - Users can delete a tree
    - Node Interaction:
        - Support CRUD operations for nodes within a tree.
        - Implement drag-and-drop functionality for node movement
        - Enable node highlighting on hover or selection
        - Automatically adjust node edges when nodes are moved, maintain connectivity, and minimize overlaps
- **Undo/Redo Actions:**
    - Implement basic support for undoing and redoing changes
- **Bug Reporting and Support:**
    - Provide users with a method to report issues and receive assistance.
- **User Management:**
    - Allow users to customize their preferences and settings, such as profile information, password reset, and dark/light mode
    - Provide an option for users to delete their account

### Non-Functional Requirements:
- **Performance:** Fast response times for API endpoints and optimized tree retrieval and rendering to reduce bounce rates.
- **Scalability:** Capable of handling an increasing number of users and data without performance degradation.
- **Security:** Robust authentication mechanisms, compliance with data privacy laws (GDPR, CCPA), and rate limiting to prevent abuse.
- **Reliability:** High system availability with minimal downtime and robust error recovery mechanisms.
- **Maintainability:** Well-documented codebase adhering to coding standards, with a modular architecture for ease of updates.
- **Usability:** Intuitive user interface with straightforward onboarding processes.
- **Accessibility:** Compliance with WCAG guidelines.
- **Compatibility:** Functionality across various browsers and devices, particularly mobile.
- **Data Management:** Ensures data consistency and integrity, particularly for user-generated content.
- **Legal and Ethical Compliance:** Adherence to legal and ethical standards applicable to the software and its use.

## Constraints and Limitations

### Technical Constraints:
- **Tech Stack Integration:** Selected technologies must integrate seamlessly for low latency, high scalability, and robust security.
- **Cross-Platform Compatibility:** The system should be designed to support both web and potential future mobile applications, ensuring a consistent user experience across platforms.

### Resource Constraints:
- **Development Efficiency:** The development process must be efficient, leveraging the team's existing expertise with the MERN (MongoDB, Express, React, Node.js) stack within the constraints of a limited budget and timeline.
- **Budget Limitations:** Due to financial constraints, strategic feature prioritization and efficient resource allocation are necessary to deliver a high-quality product within the allocated budget.

### Market Constraints:
- **Competitive Advantage:** To stand out in a competitive market, the Linkta system should offer unique features or superior performance compared to existing solutions.
- **Future Enhancements:** The system should be designed to accommodate future enhancements, including the integration of Retrieval-Augmented Generation (RAG) post-MVP, to enhance data processing and user interaction capabilities.

## System Architecture
Linkta follows a client-server model with a frontend built on TypeScript, React, and various libraries, and a backend built using Node.js, Express, Redis, and MongoDB. The frontend communicates with the backend through a RESTful API. Firebase Authentication is used for user authentication and authorization. The system is deployed on Google Cloud Platform (GCP) with Firebase Hosting.

## Technology Stack
- **Frontend:** TypeScript, React, React Flow, Zustand, React Query, Firebase Authentication
- **Backend:** Node.js, Express, Redis, MongoDB
- **AI Provider:** Gemini (version TBD)
- **DevOps/Infrastructure:** GCP, Firebase Hosting, GitHub Actions, Git
- **Testing:** Jest, Cypress
- **Other:** Zod
- **Pending decisions:** Choice of notification library (React Toastify/React Hot Toast), logging library (Winston/Sentry), and monitoring and alerting tools

## Data Models and Database Design
The main entities include:
- **User:** Represents a user of the system, storing information such as ID, email, name, settings, and creation timestamp.
- **Prompt Meta:** Stores metadata related to a user's submitted prompt, including ID, user ID, original prompt, associated tree ID, and creation timestamp.
- **Prompt Data:** Stores the processed and optimized prompt data, including ID, associated prompt meta ID, engineered prompt, and LLM response.
- **Tree:** Represents a learning tree, storing information such as ID, user ID, name, root node ID, creation timestamp, and last update timestamp.
- **Node:** Represents a node within a learning tree, storing information such as ID, associated tree ID, parent ID, content, creation timestamp, and last update timestamp.

The detailed field-level information for each entity can be found in the "Data Models" section of the [Linkta API Design" documentation](https://app.eraser.io/workspace/TCClWhuYjciANvj4k9Ab) and the [data models ER diagrams](https://app.eraser.io/workspace/EJ7k7P8yiDQCqBUsEdoI).

## API Design
The Linkta API follows a REST architecture and uses JSON format for requests and responses. The API endpoints are categorized into the following main groups:

- **Authentication:** Handles user authentication and session management, including login and logout.
- **Prompt Submission and Augmentation:** Allows users to submit prompts, processes them, and generates tree structures.
- **Tree Management:** Provides endpoints for retrieving, updating, and deleting trees and their associated nodes.
- **User Management:** Handles user-related operations such as updating user settings and deleting user accounts.
The detailed API endpoints, request/response formats, and authentication requirements can be found in the [Linkta API Design documentation](https://app.eraser.io/workspace/TCClWhuYjciANvj4k9Ab).

## Module or Component Design
### UI Design:  [Figma](https://www.figma.com/file/9QKsvDQ9jivgA9XfS0oqPd/Design-System---Linkta?type=design&node-id=691-3754&mode=design&t=kUnZmiidrbvSyFQ0-0)
### Modules:
1. **User Authentication and Authorization**
    - Authentication Service: Handles user authentication using Firebase Authentication, generates session tokens, and validates tokens for subsequent requests.
    - Authorization Service: Manages user access control and permissions for various actions.
2. **Prompt Submission and Augmentation**
    - Prompt Processing Service: Validates, cleans, and stores user-submitted prompts in the database.
    - Prompt Engineering Service: Transforms the sanitized prompts into an optimized format for processing by the LLM and stores the engineered prompts.
    - Asynchronous LLM Integration Service: Handles the interaction with the LLM, including background processing, request handling, retry mechanisms, and response validation. Stores the LLM responses in the database.
3. **Tree Management**
    - Tree Retrieval Service: Fetches and returns the list of trees associated with an authenticated user, as well as fetches individual trees and their nodes.
    - Tree Modification Service: Handles operations such as creating, updating, and deleting trees and nodes.
    - Tree Caching Service: Implements caching mechanisms to improve the performance of tree retrieval and modification operations.
4. **Tree Visualization**
    - Tree Rendering Service: Responsible for rendering the tree structure and nodes in the user interface, including handling node interactions (CRUD, drag-and-drop, highlighting).
    - Undo/Redo Service: Manages the undo and redo functionality for tree and node modifications.
5. **User Management**
    - User Settings Service: Handles updating user settings, such as theme preferences, and potentially deleting user accounts.
6. **Bug Reporting and Support**
    - Bug Reporting Service: Users can click and email [﻿info@linkta.io](mailto:info@linkta.io) to submit a bug report.
7. **Infrastructure and DevOps**
    - Cloud Infrastructure Services: Provisions and manages the necessary cloud resources (e.g., virtual machines, load balancers, databases) on Google Cloud Platform (GCP).
    - Continuous Integration and Deployment (CI/CD) Pipeline: Automates the build, testing, and deployment processes using GitHub Actions and Firebase Hosting.
    - Monitoring and Alerting: Implements monitoring and alerting solutions to track application performance, error rates, and system health.
8. **Cross-Cutting Concerns**
    - Logging and Error Handling: Implements a centralized logging system and robust error-handling mechanisms.
    - Performance Optimization: Employs techniques like caching, load balancing, and database indexing to ensure optimal performance.
    - Security and Compliance: Implements security best practices, such as input validation, rate limiting, and adherence to data privacy regulations (GDPR, CCPA).
9. **Integration with Third-Party Services** - Work in progress

## Business Logic and Algorithms
_Work in progress_

## Caching and Performance Optimization
_Work in progress_

## Error Handling and Logging
_Work in progress_

## Security Considerations
The system incorporates various security measures, including:
- **Authentication and Authorization:** Firebase Authentication is used for user authentication and authorization. API endpoints are protected and require valid session tokens for access.
- **Data Privacy:** The system will be designed to comply with relevant data privacy laws such as GDPR and CCPA.
- **Rate Limiting:** Rate limiting mechanisms will be implemented to prevent abuse and protect against excessive requests.
- **Secure Communication:** HTTPS will be used for all client-server communications to ensure data confidentiality and integrity.

## Testing Strategy
The testing strategy for Linkta includes:
- **Unit Testing:** Individual components and modules will be tested using Jest to ensure they function as expected in isolation.
- **Integration Testing:** Integration tests will be performed to verify the proper functioning of component interactions and workflows.
- **End-to-End Testing:** Cypress will be used for end-to-end testing to simulate user interactions and validate the system's behavior from the user's perspective.
- **Continuous Integration and Continuous Deployment (CI/CD):** GitHub Actions will be utilized to automate the build, testing, and deployment processes.

## Deployment and DevOps
Linkta will be deployed on Google Cloud Platform (GCP) using Firebase Hosting for the frontend and GCP services for the backend. The deployment process will be automated using GitHub Actions, enabling continuous integration and continuous deployment (CI/CD).

## Scalability and Performance
_Work in progress_

## Maintenance and Support
_Work in progress_

## Future Enhancements and Roadmap
_Work in progress_

