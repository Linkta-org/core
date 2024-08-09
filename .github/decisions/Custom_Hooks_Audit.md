
# On Using Custom Hooks in Linkta

Date: 2024-07-23


## Context
Since many developers contributing to Linkta are using Tanstack Query with React for the first time, the question has been raised whether our current implementation involves an excessive number of custom hooks and whether this approach is leading to unneccesary complexity and mantainability challenges.  

The goal of this decision document is to provide a framework for approaching an audit of our use of custom hooks within Linkta in an attempt to streamline their use within our application.  This document will summarize research into suggested patterns from noted experts and the React documentation. 

### What is a custom hook?
Custom hooks are a mechansim for abstracting and encapsulating business logic and functionality to be share across components within a React applicaiton. Conventionally, they begin with the word "use" followed by the name of the hook. Typically, custom hooks wrap functionality 


### When is a good idea to extract logic into a custom hook?
[The React docs](https://react.dev/learn/reusing-logic-with-custom-hooks#passing-reactive-values-between-hooks) mention that custom hooks should be kept to concrete high level use cases, and whenever you write an effect, you should think about if it would be clear to wrap it in a custom hook.
The docs also say that custom hooks make data flows more explicit within applications, easier to understand, and easier to maintain in the long run. 

Ultimately, it is up to the developer to decide when to extract logic into a custom hook.

### React Query and Custom Hooks
Tanner Linsley, the creator of React Query emphasizes the point in his talk [Custom Hooks in React: The Ultimate UI Abstraction Layer](https://www.youtube.com/watch?v=J-g9ZJha8FE) that custom hooks are free. There is no cost to adding them other than the cost of abstraction. 

Using custom hooks as a proxy all business logic between components and external features can better encapsulate and manage complexity within a React application. As long as you are returning the right things (i.e. a function that a component can call, a loading and error state) components don’t care. 
 
[The pattern](https://x.com/housecor/status/1724066962433528210) of wrapping useQuery and useMutation calls in custom hooks appears to be established.

### Can we write too many custom hooks? 
TKDodo, the maintainer of React Query doesn't seem to think [so](https://x.com/TkDodo/status/1374021849600962564). 

## Decision
While not every query or mutation needs to be encapsulated in a custom hook, writing a custom hook is recommended when logic is complex, is likely to be reused, or has a clear benefit from abstraction.

This custom hook audit will focus on making changes that clearly need improve functionality, maintainability, and consistency.
