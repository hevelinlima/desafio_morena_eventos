import { User } from "@/types/User";
import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login falhou");
      }

      // Armazena o token no cookie
      document.cookie = `token=${data.token}; path=/`;

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsAuthenticated(false);
    }
  }

  async function signOut(): Promise<void> {
    try {
      await fetch("http://localhost:8000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`
        },
        body: JSON.stringify({})
      });
  
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }  

  async function getUser(): Promise<void> {
    try {
      const response = await fetch("http://localhost:8000/api/users/get_user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookie("token")}`
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erro ao obter usuário");
      }
  
      setUser(data.user); 
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
    }
  }
  

  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}
