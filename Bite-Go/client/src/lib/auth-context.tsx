import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (name: string, email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("bite_go_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("bite_go_user");
      }
    }
  }, []);

  const signup = async (name: string, email: string, username: string, password: string) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to sign up");
    }

    const userData = await response.json();
    setUser(userData);
    localStorage.setItem("bite_go_user", JSON.stringify(userData));
    setLocation("/home");
  };

  const login = async (username: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to login");
    }

    const userData = await response.json();
    setUser(userData);
    localStorage.setItem("bite_go_user", JSON.stringify(userData));
    setLocation("/home");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bite_go_user");
    setLocation("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
