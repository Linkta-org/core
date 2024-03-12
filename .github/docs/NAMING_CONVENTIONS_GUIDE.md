# Linkta Naming Conventions Guide

## Introduction
Adopting a standardized set of naming conventions is crucial for enhancing the readability, maintainability, and overall quality of code in software development projects. Consistent naming practices streamline the development process, facilitate effective team collaboration, and make the codebase more accessible to new contributors. This guide outlines best practices for naming various elements within a project, from variables and functions to files and directories, aiming to promote clarity and cohesion across the codebase.

## General Best Practices

- **Descriptive Over Abbreviated**: `fetchUserProfile` over `fchUsrPrf`.
- **Consistency Across the Codebase**: Ensure all developers adhere to these guidelines.
- **Limit Use of Abbreviations**: Prefer `userIdentifier` over `userId` if clarity is needed.

## TypeScript Naming Conventions

### Variables and Functions (camelCase)
- **Example**: `let userProfile: UserProfile;`

### Interfaces and Classes (PascalCase)
- **Interface Example**: `UserProfile.ts`
  ```typescript
  interface UserProfile {
    // Interface properties
  }
  ```

### Enums and Constants (Enums in PascalCase, Values in UPPER_SNAKE_CASE)
- **Example**: `Colors.ts`
  ```typescript
  enum Color {
    RED = 'red',
    BLUE = 'blue'
  }
  ```
## React Naming Conventions

### Components (PascalCase)
- **Example**: `UserProfile.tsx`
  ```tsx
  const UserProfile = () => {
    return <div>User Profile Component</div>;
  };
  ```

### Hooks (camelCase with `use` Prefix)
- **Example**: `useFetchUser.ts`
  ```tsx
  const useFetchUser = () => {
    // Hook logic here
  };
  ```

### Higher-Order Components (`with` Prefix)
- **Example**: `withUserAuthentication.tsx`
  ```tsx
  const withUserAuthentication = (Component) => {
    // HOC logic here
  };
  ```

### CSS Modules (PascalCase for File, camelCase for Classes)
- **File**: `UserProfile.module.scss`
  ```scss
  .profileContainer {
    // CSS rules here
  }
  ```

## Next.ts Naming Conventions

### Pages and Routing (kebab-case for File Names)
- Page components under the `pages` directory match URL paths directly.
  - **Example**: `pages/user-profile/index.tsx` maps to `/user-profile`.

### Dynamic Routes ([square brackets])
- Dynamic parameters: `pages/posts/[postId].tsx` for dynamic post pages.

### API Routes (kebab-case)
- API handlers within `pages/api`: `pages/api/user-profile/[userId].ts`.

### Public Directory for Static Files
- Static assets in `public`: images and fonts accessed directly from the root URL.
  - **Example**: `public/logo.svg` accessible at `/logo.svg`.


## Node.ts Naming Conventions

### Variables and Functions (camelCase)
- **Example**: `getUserData.ts`
  ```javascript
  const getUserData = () => {
    // Function logic
  };
  ```

### Classes (PascalCase)
- **Example**: `DatabaseService.ts`
  ```javascript
  class DatabaseService {
    // Class logic
  }
  ```

### Constants (UPPER_SNAKE_CASE)
- **Example**: `config.ts`
  ```javascript
  const MAX_CONNECTIONS = 50;
  ```


## REST API and URL Structuring

### Resource Naming (Plural or Singular Nouns)
- **Collections**: `/users`
- **Single Resource**: `/users/{userId}`

### URL Case Style (lowercase with hyphens)
- **Example**: `/user-profiles`

### No Verbs in URLs (Use HTTP Verbs Instead)
- **POST**: `POST /users` to create a user

### Query Parameters (camelCase)
- **Example**: `/users?startDate=2021-01-01`


## File and Directory Naming

### React Components and TypeScript Files (PascalCase)
- **React Component**: `UserProfile.tsx`
- **TypeScript Interface**: `UserProfile.ts`

### TypeScript and Utility Files (kebab-case)
- **Example**: `fetch-user.ts`

### Tests (Append `.test` or `.spec`)
- **Example**: `UserProfile.test.tsx`

### Directories (kebab-case for Grouping)
- **Example Directory Structure**:
  ```
  src/
    user-profile/
    fetch-user/
  ```

## Conclusion
By adhering to these naming conventions, Linkta's development teams can ensure their codebases are readable, maintainable, and SEO-friendly. These conventions facilitate easier collaboration among team members and contribute to the overall quality of Linkta’s software projects.