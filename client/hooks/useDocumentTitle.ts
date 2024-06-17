import { useEffect } from 'react';

/**
 * Custom hook to set the document title based on the provided view name.
 * This hook should be used by any component that will be rendered as a page
 * when a route is visited. If a view name is provided, it appends the view
 * name to "Linkta". If no view name is provided, it defaults to "Linkta".
 *
 * @param {string} [view] - The name of the current view to be appended to the document title.
 */

const useDocumentTitle = (view?: string) => {
  useEffect(() => {
    document.title = view ? `${view} | Linkta` : 'Linkta';
  }, [view]);
};

export default useDocumentTitle;
