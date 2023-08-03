import { ReactNode, useMemo } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { AuthContextType } from '../../contexts/AuthenticationContext.types';

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const value = useMemo((): AuthContextType => ({ isAuthenticated: true }), []);
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
}
