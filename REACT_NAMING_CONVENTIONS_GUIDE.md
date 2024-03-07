# React Naming Conventions Guide 📚

This guide highlights the importance of naming conventions in React, emphasizing their role in fostering clean, readable, and maintainable codebases 🌟. Adopting consistent naming conventions enhances code readability 📖, simplifies maintenance 🔧, and facilitates effective communication 🗣️ within development teams.

## Key Naming Conventions:

### PascalCase 🆙
#### Use For:
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

### camelCase 🐫
#### Use For:
- **Variable Names:** Start variable names with a lowercase letter, followed by capitalized words.
  ```
  const userName = 'Batman';
  ```

- **Function Names:** Functions should follow the same pattern as variables.
  ```
  const calculateAge = (birthYear) => {};
  ```

- **Object Properties:** Keep object keys in camelCase.
  ```
  const user = { firstName: 'Bruce', lastName: 'Wayne' };
  ```

- **CSS Module Class Names:** Define class names in camelCase within CSS Modules.
  ```
  .headerContainer { display: flex; }
  ```

- **Custom Hooks & Higher-Order Components:** Prefix custom hooks with `use` and HOCs with `with`.
  ```
  // custom hook
  const useTodo = () => {
  //...
  }

  // HOC
  // 'Filter' is added as a suffix to indicate the original component
  const withFilter = () => {
  //...
  }

  // Usage of the HOC
  const Filter = withFilter(/*Component Name*/);
  ```

### kebab-case 🍖
#### Use For:
- **CSS Class Names:** When defining class names directly in CSS.
  ```
  .header-container {
    display: flex;
  }

  <div className='header-container'>
  //...
  </div>
  ```

- **Folder Names:** Organize related files into folders named in kebab-case.
  ```
  src/
    todo-list/
    todo-item/
  ```

### SCREAMING_SNAKE_CASE 🐍
#### Use For:
- **Constants:** Define constants in all uppercase, with underscores between words.
  ```
  const BASE_PATH = 'https://example.com/api';
  ```

- **Enumeration Properties:** Enum keys should follow the same convention.
  ```
  const RequestType = {
  // Name in Pascal Case
  // Properties in Screaming Snake Case
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  };
  ```
- **Global Variables:**
  ```
  const ENVIRONMENT = 'PRODUCTION';
  const PI = 3.14159;
  ```

## Best Practices 🙌
- **Descriptive Names:** Avoid generic names to improve clarity and maintainability.
  ```
  ✅ Best Practice

  const ProductDetails = () => {

  const productInfo = fetchProductInfo();
  // Fetches detailed product information

  const addProductToCart = () => {
    // Add the product to the shopping cart
  };
  //...
  }
  ```

- **Singular vs. Plural Naming:** Choose based on the context—singular for individual items and plural for collections.
  ```
  ✅ Best Practice

  const fetchConversation = () => {
    // Fetch single conversation.
  }

  const fetchConversations = () => {
    // Fetch multiple conversations.
  }
  ```

- **Avoid Excessive Abbreviations:** Prefer full, descriptive names over abbreviated ones.
  ```
  ✅ Best Practice

  // Descriptive object and property names
  const selectedUser = {
    userId: 1,
    userName: 'Batman',
    userEmail: 'notBruceWayne@domain.com',
  }

  // Usage
  selectedUser.userId
  ```

By adhering to these conventions, developers can create more readable, maintainable, and consistent codebases in React applications.

## Credits 🙏

This summary is based on [*React naming conventions and best practices for developing clean and understandable code*](https://dev.to/sathishskdev/part-1-naming-conventions-the-foundation-of-clean-code-51ng) by Sathish Kumar N.
