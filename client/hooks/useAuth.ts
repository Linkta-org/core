/**
 * Custom hook to manage authentication state.
 * @returns {object} - An object containing:
 *   - `isAuthenticated`: Boolean indicating whether the user is currently authenticated.
 *   - `isLoading`: Boolean indicating if the authentication status check is in progress.
 */
const useAuth = () => {
  // TODO: implement auth logic, currenly only using placeholders
  const isAuthenticated = false;
  const isLoading = false;

  return { isAuthenticated, isLoading };
};

export default useAuth;
