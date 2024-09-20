import { User } from "@/types/User";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  registerEvent: (eventData: {
    name: string;
    description: string;
    address: string;
    zipcode: string;
    number: string;
    city: string;
    state: string;
    starts_at: string; // Formato: XX/XX/XXXX XX:XX:XX
    ends_at: string;   // Formato: XX/XX/XXXX XX:XX:XX
    complement: string;
    max_subscription: number;
    is_active: boolean;
  }) => Promise<void>;
  user: User | null;
};

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
      
      if (response.ok) {
        setUser(data.user);
      } else {
        throw new Error(data.message || "Erro ao obter usuário");
      }
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      setIsAuthenticated(false); 
    }
  }
  

  async function register(name: string, email: string, password: string): Promise<void> {
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar");
      }
  
      alert("Cadastro realizado com sucesso, faça seu login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  }

  async function registerEvent(eventData: {
    name: string;
    description: string;
    address: string;
    zipcode: string;
    number: string;
    city: string;
    state: string;
    starts_at: string;
    ends_at: string;
    complement: string;
    max_subscription: number;
    is_active: boolean;
  }): Promise<void> {
    try {
      const response = await fetch("http://localhost:8000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      console.log("Registrando evento com dados:", eventData);


      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar evento");
      }

      alert("Evento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    }
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsAuthenticated(true);
      getUser();
    }
  }, []);
  
  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, getUser, user, register, registerEvent }}>
      {children}
    </AuthContext.Provider>
  );
}
