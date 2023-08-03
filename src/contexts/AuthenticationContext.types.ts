type Unauthenticated = {
  isAuthenticated: false;
  authenticate: () => void;
};

type Authenticated = {
  isAuthenticated: true;
};

export type AuthContextType = Unauthenticated | Authenticated;
