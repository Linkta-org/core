# Tree Visualization UI Library Decision Log

Period: 2024-04-06

Status: Approved

## Goal:
To select an optimal UI library that best meets the requirements for a tree visualization feature. This includes user-friendly drag-and-drop capabilities, efficient re-rendering for performance optimization, and comprehensive editing functionalities to enhance user experience and interaction with the tree structure, and consideration of library bundle sizes and documentation clarity.

## Limitations:
- **Technical Constraints**: Must seamlessly integrate with the current tech stack, including React, TypeScript, Zustand, and React Query, while ensuring low latency, scalability, and security. Additionally, the library should offer broad compatibility across platforms, aligning with future stretch goals to support both web and mobile applications effectively.
- **User Experience (UX)**: Requires intuitive navigation and manipulation capabilities, with support for responsive design and interactive elements like drag-and-drop.
- **Resources**: Should facilitate rapid development within a constrained budget and timeline, suitable for a team primarily experienced with MERN stack.
- **Market Factors**: Should offer competitive advantages in a tight market, with the potential for future enhancements.

## Options Explored:
1. **React Flow with dagre/d3-hierarchy**:
   - Pros: Provides a highly customizable and interactive environment for graph visualization, supporting features like node dragging, dynamic edge creation, and a flexible layout system adaptable for complex tree structures.
   - Cons: Requires an additional library and custom implementations to achieve an optimal tree layout and spacing, especially for complex or dynamic tree structures.

2. **React Beautiful DnD with react-d3-tree**:
   - Pros: Offers a smooth drag-and-drop experience combined with D3.js-powered tree visualizations. Supports various tree layout options and node selection, hovering, and customization.
   - Cons: Requires additional libraries and substantial custom implementations to integrate drag-and-drop functionalities with the tree structure and for creating and managing dynamic edges.

3. **Vis.js (vis-network)**:
   - Pros: Features a dedicated tree visualization module with a broad range of customization options. Supports intuitive drag-and-drop functionality and efficiently manages large datasets.
   - Cons: The large bundle size and less intuitive integration with React may lead to performance issues and a more complex development process.

4. **React Diagrams**:
   - Pros: A flexible library for creating interactive diagrams and flowcharts in React. Offers extensive customization options for nodes and links, including built-in drag-and-drop functionality.
   - Cons: The documentation is less user-friendly compared to other established libraries, requiring considerable custom development for tree layout implementation.

5. **Visx**:
   - Pros: A powerful, lightweight collection of packages that combines the capabilities of React and D3 to create highly expressive data visualizations. Supports visualization of hierarchical data with tree layout options.
   - Cons: The library doesn’t contain packages for certain core functionality features such as editing/adding/deleting of nodes.

## Challenges:

- Sophisticated algorithms are necessary to dynamically manage tree layouts in libraries not specifically designed for trees, optimizing spacing and preventing overlaps when nodes are manipulated.
- Robust event handling and UI updates are essential for enabling user interactions like drag-and-drop, selection, and direct node editing, ensuring a responsive experience.
- Adapting backend tree data models to meet UI library's specific node and edge structure requirements necessitates strategic planning to ensure seamless front-end integration and visualization.

## Decision
After evaluating our needs and comparing various libraries, we've chosen React Flow with dagre for its flexibility, comprehensive features, and smooth integration with our tech stack. This solution offers dynamic layout adjustments, custom styling options, and strong community support, ensuring an organized, efficient, and user-friendly tree visualization that meets our performance and usability criteria.

## Resources and Updates:
 1.[React Flow Documentation](https://reactflow.dev/api-reference)
 2.[dagre Documentation](https://github.com/dagrejs/dagre/wiki)
 3.[d3-hierarchy Documentation](https://d3js.org/d3-hierarchy)
 4.[React Beautiful DnD Documentation](https://github.com/atlassian/react-beautiful-dnd/tree/ae7bcf326928fea3615dfed092dd4261a3976e0d/docs)
 5.[react-d3-tree Documentation](https://github.com/bkrem/react-d3-tree)
 6.[Vis.js Network Documentation](https://visjs.github.io/vis-network/docs/network/)
 7.[React Diagrams Documentation](https://projectstorm.gitbook.io/react-diagrams)
 8.[visx Documentation](https://airbnb.io/visx/docs)