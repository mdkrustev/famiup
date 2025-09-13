import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ISocketMessage, IUser } from "../utils/interfaces";
import { Call, Config } from "../utils/config";
import { WSListener } from "../utils/wsListener";

// Context type
interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: () => void;
  logout: () => void;
}

// Create context with proper type
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Invalid data in localStorage:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = () => {
    const width = 800;
    const height = window.screen.height / 2;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const url = Call.urlTo('/google-login');
    const options = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`;
    window.open(url, "GoogleLogin", options);
    const checkUrl = () => {
      setTimeout(() => {
        checkUrl()
      }, 100)
    }
    checkUrl()
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    fetch(Call.urlTo('/auth/logout'), { credentials: 'include' })
  };

  const { socketMessage, socketObject } = WSListener<ISocketMessage>('loginroom', Config.apiWs)
  
  useEffect(() => {
    console.log(socketObject)

    if (socketObject?.action == 'login') {
      const messgeUser = socketObject?.message as IUser;
      if (messgeUser?.email) {
        setUser(messgeUser)
        localStorage.setItem('user', JSON.stringify(messgeUser))
      }
    }
    if(socketObject?.action == 'logout') {
      setUser(null)
      localStorage.removeItem('logout')
    }
  }, [socketMessage])

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
