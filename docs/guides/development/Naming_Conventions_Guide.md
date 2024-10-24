# Linkta Naming Conventions Guide 📘

## Introduction 🌟
Adopting a standardized set of naming conventions is crucial for enhancing the readability, maintainability, and overall quality of code in software development projects. Consistent naming practices streamline the development process, facilitate effective team collaboration, and make the codebase more accessible to new contributors. This guide outlines best practices for naming various elements within a project, from variables and functions to files and directories, aiming to promote clarity and cohesion across the codebase.

## General Best Practices 📏

- **Descriptive Over Abbreviated**: `fetchUserProfile` over `fchUsrPrf`.
- **Consistency Across the Codebase**: Ensure all developers adhere to these guidelines.
- **Limit Use of Abbreviations**: Prefer `userIdentifier` over `userId` if clarity is needed.

## Frontend Naming Conventions 🪟

### React

#### Components (PascalCase)
- **Example**: `UserProfile.tsx`
  ```tsx
  const UserProfile = () => {
    return <div>User Profile Component</div>;
  };
  ```

#### Hooks (camelCase with `use` Prefix)
- **Example**: `useFetchUser.ts`
  ```tsx
  const useFetchUser = () => {
    // Hook logic here
  };
  ```

#### Higher-Order Components (`with` Prefix)
- **Example**: `withUserAuthentication.tsx`
  ```tsx
  const withUserAuthentication = (Component) => {
    // HOC logic here
  };
  ```

#### CSS Modules (PascalCase for File, camelCase for Classes)
- **File**: `UserProfile.module.scss`
  ```scss
  .profileContainer {
    // CSS rules here
  }
  ```

## Backend Naming Conventions 🧠

### Node.js and Express.js

#### Variables and Functions (camelCase)
- **Example**: `getUserData.ts`
  ```javascript
  const getUserData = () => {
    // Function logic
  };
  ```

#### Classes (PascalCase)
- **Example**: `DatabaseService.ts`
  ```javascript
  class DatabaseService {
    // Class logic
  }
  ```

#### Constants (UPPER_SNAKE_CASE)
- **Example**: `config.ts`
  ```javascript
  const MAX_CONNECTIONS = 50;
  ```


### REST API and URL Structuring

#### Resource Naming (Plural or Singular Nouns)
- **Collections**: `/users`
- **Single Resource**: `/users/{userId}`

#### URL Case Style (lowercase with hyphens)
- **Example**: `/user-profiles`

#### No Verbs in URLs (Use HTTP Verbs Instead)
- **POST**: `POST /users` to create a user

#### Query Parameters (camelCase)
- **Example**: `/users?startDate=2021-01-01`

## General Naming Conventions 🌎

### TypeScript

#### Variables and Functions (camelCase)
- **Example**: `let userProfile: UserProfile;`

#### Interfaces and Classes (PascalCase)
- **Interface Example**: `UserProfile.ts`
  ```typescript
  interface UserProfile {
    // Interface properties
  }
  ```

#### Enums and Constants (Enums in PascalCase, Values in UPPER_SNAKE_CASE)
- **Example**: `Colors.ts`
  ```typescript
  enum Color {
    RED = 'red',
    BLUE = 'blue'
  }
  ```
###  Environment Variables (UPPER_SNAKE_CASE) 🔐
- **Define environment variables in upper casee**: such as`API_URL` or `DATABASE_HOST`, to distinguish them from regular variables.

### File and Directory Naming 🗂️

#### React Components and TypeScript Files (PascalCase)
- **React Component**: `UserProfile.tsx`
- **TypeScript Interface**: `UserProfile.ts`

#### TypeScript and Utility Files (kebab-case)
- **Example**: `fetch-user.ts`

#### Tests (Append `.test` or `.spec`)
- **Example**: `UserProfile.test.tsx`

#### Directories (kebab-case for Grouping)
- **Example Directory Structure**:
  ```
  src/
    user-profile/
    fetch-user/
  ```

### Branch Naming (Use descriptive branch names (kebab-case)):
- **Feature branches:** `feature/linkta-30-user-authentication`
- **Bug fixes:** `bugfix/linkta-20-fix-header-styling`
- **Hot fixes:** `hotfix/linkta-13-security-patch`
- **Documentation:** `docs/linkta-23-update-readme`
- **Release:** `release/v2.0.0`

#### Commit messages see [**Commit Message Guide**](Commit_Message_Guide.md)

## Conclusion
By adhering to these naming conventions, Linkta's development teams can ensure their codebases are readable, maintainable, and SEO-friendly. These conventions facilitate easier collaboration among team members and contribute to the overall quality of Linkta’s software projects.