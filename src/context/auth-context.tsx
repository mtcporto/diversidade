
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  auth,
  googleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  type User
} from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import type { FirebaseError } from 'firebase/app'; // Import FirebaseError
import { useRouter } from 'next/navigation';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: FirebaseError, defaultMessage: string) => {
    console.error("Authentication error details:", {
      code: error.code,
      message: error.message,
      fullError: error,
    });

    // If user closes the popup or cancels, don't show a toast.
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      // We don't show a toast because this is often a user-initiated action
      // or an environmental issue like the one being investigated.
      return;
    }

    let message = defaultMessage;
    if (error.code === 'auth/email-already-in-use') {
      message = 'Este email já está em uso.';
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      message = 'Email ou senha inválidos.';
    } else if (error.code === 'auth/weak-password') {
      message = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
    }
    
    toast({
      title: "Erro de Autenticação",
      description: message,
      variant: "destructive",
    });
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast({ title: "Login bem-sucedido!", description: "Bem-vindo(a)!" });
      router.push('/');
    } catch (error) {
      handleAuthError(error as FirebaseError, "Falha ao fazer login com Google.");
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await firebaseCreateUserWithEmailAndPassword(auth, email, pass);
      toast({ title: "Cadastro bem-sucedido!", description: "Bem-vindo(a)!" });
      router.push('/');
    } catch (error) {
      handleAuthError(error as FirebaseError, "Falha ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await firebaseSignInWithEmailAndPassword(auth, email, pass);
      toast({ title: "Login bem-sucedido!", description: "Bem-vindo(a)!" });
      router.push('/');
    } catch (error) {
      handleAuthError(error as FirebaseError, "Falha ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      toast({ title: "Logout realizado", description: "Até breve!" });
      router.push('/');
    } catch (error) {
      handleAuthError(error as FirebaseError, "Falha ao fazer logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
