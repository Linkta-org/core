# Decision Log: Adopting Factory Function-based Dependency Injection for Linkta API

Period: 2024-06-15 to 2024-06-20

Status: Accepted

***

## Context and Problem Statement

Our initial approach to the Linkta API involved tightly coupled components, which made it increasingly challenging to test, maintain, and scale the codebase. To address these issues, we realized that a refactor was necessary to improve both modularity and testability - while also ensuring the solution was easy for the team to pick up.

## Goal

To refactor the Linkta API codebase by implementing a simplified version of Dependency Injection using factory functions. This approach aims to improve code modularity and testability while serving as an introductory step towards more advanced DI patterns in the future.

## Constraints and Considerations

- Team's varying familiarity with DI patterns
- Need to maintain compatibility with existing Express.js and TypeScript setup
- Preference for a solution that doesn't require significant changes to our current architecture
- Limited time for refactoring and learning new frameworks

## Options Considered

1. **Traditional constructor-based DI with a DI container**
   - Pros: Robust, well-established pattern
   - Cons: Steep learning curve for the team

2. **Implementation with Nest.js**
   - Pros: Full-featured framework with built-in DI, highly scalable
   - Cons: Requires significant refactoring, steep learning curve, potential overkill for current needs

3. **Factory function-based DI**
   - Pros: Balance of simplicity and effectiveness, works well with functional programming style
   - Cons: Not as powerful as full-fledged DI frameworks, may need to evolve in the future

## Decision

We’ve decided to implement a factory function-based Dependency Injection pattern for the Linkta API based on the following factors:

- **Improved Testability**: The new pattern allows for easier mocking of dependencies in unit tests.
- **Increased Modularity**: Services and controllers become more decoupled, improving maintainability.
- **Gradual Learning**: This approach provides an easier entry point for team members unfamiliar with DI concepts.
- **Flexibility**: Easy to modify and extend as the team's understanding of DI grows.
- **No Additional Libraries**: Implements DI principles without requiring external DI frameworks.
- **Minimal Disruption**: Can be implemented incrementally without a complete overhaul of our current architecture.

## Relationship to SOLID Principles

This decision supports key SOLID principles:

1. **Single Responsibility Principle (SRP)**: Each factory function creates an object with a single, well-defined responsibility.
2. **Open/Closed Principle (OCP)**: New functionality can be added by creating new factory functions without modifying existing ones.
3. **Dependency Inversion Principle (DIP)**: High-level modules (controllers) depend on abstractions (interfaces of services) rather than concrete implementations.

## Sample Implementation

Below is an example of how we’re applying the factory function-based DI pattern for the `UserInput` feature:

```typescript
// userInputRouter.ts
const userInputService = createUserInputService();
const userInputController = createUserInputController(userInputService);

userInputRouter.post('/', userInputController.fetchInputHistory, async (_, res) => {
  // Route handler
});

// userInputController.ts
const createUserInputController = (
  userInputService: ReturnType<typeof createUserInputService>,
) => {
  return {
    fetchInputHistory: async (req: Request, res: Response, next: NextFunction) => {
      // Implementation using injected services
    },
    // Other methods...
  };
};

// userInputService.ts
const createUserInputService = () => {
  return {
    fetchInputHistory: async (
      userId: Types.ObjectId,
      page: number,
      limit: number,
    ): Promise<UserInput[]> => {
      // Implementation
    },
    // Other methods...
  };
};
```

## Consequences

### Positive:
- Improved code modularity and testability
- Easier onboarding for new team members to DI concepts
- Better alignment with SOLID principles
- Can be implemented without major architectural changes

### Negative:
- Potential for inconsistent implementation if not properly standardized
- May require further refactoring if more complex DI needs arise in the future
- Not as feature-rich as full-fledged DI frameworks like Nest.js

## References

- [Nest.js Documentation](https://docs.nestjs.com/)
- [Express.js Documentation](https://expressjs.com/)
- Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide to Software Structure and Design. Prentice Hall.
- Schwarz, A. (2012). Dependency Injection with TypeScript. [https://nehalist.io/dependency-injection-in-typescript/](https://nehalist.io/dependency-injection-in-typescript/)
