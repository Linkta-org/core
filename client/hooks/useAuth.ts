/**
 * Custom hook to manage authentication state. It initializes with an unauthenticated state,
 * loading status, and no errors.
 *
 * @returns {object} - An object containing:
 *   - `isAuthenticated`: Boolean indicating whether the user is currently authenticated.
 *   - `isLoading`: Boolean indicating if the authentication status check is in progress.
 *   - `error`: String for any authentication error messages or `null` if there are no errors.
 */
// TODO: implement auth logic
const useAuth = () => {
  const isAuthenticated = true;
  const isLoading = false;
  const error = null;

  // add auth logic here

  return { isAuthenticated, isLoading, error };
};

export default useAuth;
