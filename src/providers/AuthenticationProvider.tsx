import * as LocalAuthentication from 'expo-local-authentication';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { AuthenticationContext } from '../contexts/AuthenticationContext';
import type { AuthContextType } from '../contexts/AuthenticationContext.types';

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = useCallback(async () => {
    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login to use Todo List',
      fallbackLabel: 'Use alternate method',
    });
    setIsAuthenticated(authResult.success);
  }, []);

  const value = useMemo((): AuthContextType => {
    return isAuthenticated
      ? {
          isAuthenticated,
        }
      : {
          isAuthenticated,
          authenticate,
        };
  }, [isAuthenticated, authenticate]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
}
