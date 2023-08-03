import { createContext } from 'react';

import type { AuthContextType } from './AuthenticationContext.types';

export const AuthenticationContext = createContext<AuthContextType>({
  hasHardware: false,
  isEnrolled: false,
  isAuthenticated: false,
  authenticate() {
    throw new Error(
      'Attempting to use AuthenticationContex outside of an AuthenticationContext.Provider'
    );
  },
});
