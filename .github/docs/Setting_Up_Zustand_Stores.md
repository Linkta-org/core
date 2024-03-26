# Setting Up Zustand Stores

This document will explain the creation of a store in Zustand as well as cover some best practices for working wth stores.

## Creating a Zustand Store

```typescript
import { create } from 'zustand';

interface NavigationState {
  currentPage: string;
  actions: {
    setCurrentPage: (page: string) => void;
  };
};

const useNavigationStore = create<NavigationState>()((set) => ({
  currentPage: '/',
  actions: {
    setCurrentPage: (page: string) => set({ currentPage: page }),
  },
}));
```

Note the currying `()` following the type declaration. When working in TypeScript, this `()` is needed to complete application of type to the function returned by `create`. Read more in the Zustand docs: https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md.

## Best Practices

This doc follows best practices outlined by tkdodo: https://tkdodo.eu/blog/working-with-zustand.
We won't cover everything mentioned in his blog, so be sure to check it out. 

### Export only custom hooks, Prefer atomic selectors

```typescript
export const useCurrentPage = () =>
  useNavigationStore((state) => state.currentPage);
```
Avoiding exporting the entire `useNavigationStore` hook prevents any components from being able to subscribe to the entire store. If a component subscribes to the entire store, it will re-render upon **any** updates to the store. Exporting custom hooks like `useCurrentPage`, using atomic selectors like `(state) => state.currentPage`, allows us to subscribe components to only the specific slices of the store that they need.

Additionally, returning a new object from a hook to access multiple state values from the store can have an unintended consequence of causing unnecessary re-renders unless using Zustand's `shallow` function. See tkdodo's blog post linked above for more details. 

### Separate actions from state 

```typescript
const useNavigationStore = create<NavigationState>()((set) => ({
  currentPage: '/',
  actions: {
    setCurrentPage: (page: string) => set({ currentPage: page }),
  },
}));
```

Defining `actions` as an object within the store allows all actions to be cleanly exported as a single hook without subscribing:

```typescript
export const useNavigationActions = () =>
  useNavigationStore((state) => state.actions);
```

The `actions` object can be considered atomic (in alignment with the *prefer atomic selectors* best practice) because its values will not change while the app is running.

## Using the Store

```typescript
import React from 'react';
import { useCurrentPage, useNavigationActions } from './store/navigationStore';


export default function Demo(): JSX.Element {
  const currentPage = useCurrentPage();

  const navigationActions = useNavigationActions();

  const handleClick = (page: string): void => {
    navigationActions.setCurrentPage(page);
  };

  return (
    <>
      <p>Current Page: {currentPage}</p>
      <button onClick={() => handleClick('Page 1')}>Page 1</button>
      <button onClick={() => handleClick('Page 2')}>Page 2</button>
    </>
  );
}
```

For more information on using Zustand, refer to the docs: https://github.com/pmndrs/zustand/tree/main/docs