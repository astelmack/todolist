import * as LocalAuthentication from 'expo-local-authentication';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { AuthenticationContext } from '../contexts/AuthenticationContext';
import type { AuthContextType } from '../contexts/AuthenticationContext.types';

/**
 * Provider for the AuthContext which maintains state around authentication of the user.
 * Provides functionality to trigger the user to authenticate with biometrics, and then serve the state if that successfully completes
 * to other parts of the app that are gated by the user authenticating.
 *
 * Similarly here, this is a very small amount of state and very little threads used to change it.  Felt that this solution covered what was
 * necessary, plus enough to serve the authenticated state to the parts of the app that would need it.
 * @param children
 * @constructor
 */
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
