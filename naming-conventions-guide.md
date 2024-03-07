# React Naming Conventions Guide

This guide simplifies React naming conventions, making it easier for new developers to follow best practices. Credits to the community for establishing these standards.

## PascalCase
### Use For:
- **React Components:** Define components with the first letter of each word capitalized.
  ```
  const TodoList = () => {};
  ```

- **CSS Class Files:** Name your CSS, SCSS, or CSS module files using PascalCase.
  ```
    // Example filenames
    TodoList.css
    TodoList.scss
    TodoList.module.scss
    ```

- **Enumerations:** Define enums with each word capitalized.
  ```
  const RequestStatus = { NEW: 'new', IN_PROGRESS: 'inProgress' };
  ```

## camelCase
### Use For:
- **Variable Names:** Start variable names with a lowercase letter, followed by capitalized words.
  ```
  const userName = "janeDoe";
  ```

- **Function Names:** Functions should follow the same pattern as variables.
  ```
  const calculateAge = (birthYear) => {};
  ```

- **Object Properties:** Keep object keys in camelCase.
  ```
  const user = { firstName: "Jane", lastName: "Doe" };
  ```

- **CSS Module Class Names:** Define class names in camelCase within CSS Modules.
  ```
  .headerContainer { display: flex; }
  ```

- **Custom Hooks & Higher-Order Components:** Prefix custom hooks with `use` and HOCs with `with`.
  ```
  const useFetchData = () => {};
  const withAuthorization = (Component) => {};
  ```

## kebab-case
### Use For:
- **CSS Class Names:** When defining class names directly in CSS.
  ```
  .header-container { display: flex; }
  ```

- **Folder Names:** Organize related files into folders named in kebab-case.
  ```
  src/
  todo-list/
  TodoList.
  TodoList.module.scss
  todo-item/
  TodoItem.
  ```

## SCREAMING_SNAKE_CASE
### Use For:
- **Constants:** Define constants in all uppercase, with underscores between words.
  ```
  const API_ENDPOINT = "https://example.com/api";
  ```

- **Enumeration Properties:** Enum keys should follow the same convention.
  ```
  const LogLevel = { ERROR: 'error', WARN: 'warn' };
  ```

## Best Practices
- **Descriptive Names:** Avoid generic names to improve clarity and maintainability.
  ```
  // Instead of MyComponent, use a descriptive name
  const UserProfile = () => {};
  ```

- **Singular vs. Plural Naming:** Choose based on the context—singular for individual items and plural for collections.
  ```
  const fetchUser = () => {}; // For a single user
  const fetchUsers = () => {}; // For multiple users
  ```

- **Avoid Excessive Abbreviations:** Prefer full, descriptive names over abbreviated ones.
  ```
  // Instead of selUsr, use
  const selectedUser = { userId: 1, userName: 'John Doe' };
  ```

By adhering to these conventions, developers can create more readable, maintainable, and consistent codebases in React applications.

## Credits

This summary is based on *React naming conventions and best practices for developing clean and understandable code* by Sathish Kumar N. [Read the full article here](https://dev.to/sathishskdev/part-1-naming-conventions-the-foundation-of-clean-code-51ng).

