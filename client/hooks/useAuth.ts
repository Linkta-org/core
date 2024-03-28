/**
 * Custom hook to manage authentication state. It initializes with an unauthenticated state,
 * loading status, and no errors.
 *
 * @returns {object} - An object containing:
 *   - `isAuthenticated`: Boolean indicating whether the user is currently authenticated.
 *   - `isLoading`: Boolean indicating if the authentication status check is in progress.
 */
const useAuth = () => {
  // TODO: implement auth logic, currenly only using placeholders
  const isAuthenticated = true;
  const isLoading = false;
  const error = null;

  return { isAuthenticated, isLoading };
};

export default useAuth;
