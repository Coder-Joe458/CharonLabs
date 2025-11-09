"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Check if user exists in localStorage (simulating a user database)
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};
    
    // If user exists, retrieve their name
    if (users[email]) {
      const userData = users[email];
      const user: User = {
        id: userData.id || email,
        name: userData.name || email.split('@')[0], // Use email prefix if no name
        email: email,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // User doesn't exist, create a new user with email prefix as name
      const user: User = {
        id: email,
        name: email.split('@')[0], // Use email prefix (e.g., "joe" from "joe@example.com")
        email: email,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      // Also store in users object for future logins
      users[email] = { id: email, name: user.name };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Store user in localStorage (simulating a user database)
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};
    
    const user: User = {
      id: email,
      name: name || email.split('@')[0], // Use provided name or email prefix
      email: email,
    };
    
    // Store user data for future logins
    users[email] = { id: email, name: user.name };
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set as current user
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

