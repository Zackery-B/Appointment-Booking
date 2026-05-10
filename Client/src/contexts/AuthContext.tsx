import { createContext, useContext } from 'react';
import type { User } from "../types/types";

export interface AuthObject {
  user: User | null,
  login: (user: User) => void,
  logout: () => void,
}

export const AuthContext = createContext<AuthObject | null>(null);

export function useAuth(): AuthObject {
  const value = useContext(AuthContext);

  if (value == null) {
    throw new Error("useAuth called without a provided value");
  }

  return value;
}