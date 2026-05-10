import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthObject } from './AuthContext';
import type { User } from '../types/types';

export function AuthProvider({ children }: { children?: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((user: User) => setUser(user), []);
  const logout = useCallback(() => setUser(null), []);

  const contextValue = useMemo<AuthObject>(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext value={contextValue}>
      {children}
    </AuthContext>
  );
}