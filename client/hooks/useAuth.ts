import { useState } from 'react';
// TODO: implement auth logic
const useAuth = () => {
  const [isAuthenticated, setIsAUthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // implement auth logic here

  return { isAuthenticated, isLoading, error };
};

export default useAuth;
