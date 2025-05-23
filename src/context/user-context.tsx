'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types';
import { DEFAULT_USER, getUserById, getUserByRole } from '@/utils/current-user';

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  setUserById: (id: number) => void;
  setUserByRole: (role: 'employee' | 'manager' | 'admin') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USER);

  const setUserById = (id: number) => {
    setCurrentUser(getUserById(id));
  };

  const setUserByRole = (role: 'employee' | 'manager' | 'admin') => {
    setCurrentUser(getUserByRole(role));
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, setUserById, setUserByRole }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
