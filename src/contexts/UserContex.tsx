import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ISocketMessage, IUser } from "../utils/interfaces";
import { Call, Config } from "../utils/config";
import { WSListener } from "../utils/wsListener";
import { useFetch } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

// Context type
interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

// Create context with proper type
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginRoomId, setLoginRoomId] = useState<string | null>(user?.loginroom_id || null)
  const { socketMessage, socketObject } = WSListener<ISocketMessage>(loginRoomId, Config.apiWs)
  const { data } = useFetch<{ checkReady: boolean, isAuth: boolean, loggedUser: IUser | null }>('/api/user/info')
  const navigate = useNavigate();

  // Load user from localStorage on initial render  
  useEffect(() => {
    if (data.loggedUser) {
      if (!user) {
        setUser(data.loggedUser)
        localStorage.setItem('user', JSON.stringify(data.loggedUser))
      }
    } else {
      if (user)
        logout(false)
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Invalid data in localStorage:", e);
        localStorage.removeItem("user");
      }
    }
  }, [data, localStorage]);


  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false)
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = () => {
    const newLoginRoomId = crypto.randomUUID();
    setLoginRoomId(newLoginRoomId)
    const width = 800;
    const height = window.screen.height / 2;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const url = Call.urlTo(`/google-login?loginRoomId=${newLoginRoomId}`);
    const options = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`;
    window.open(url, "GoogleLogin", options);
    const checkUrl = () => {
      setTimeout(() => {
        checkUrl()
      }, 100)
    }
    checkUrl()
  }

  const logout = (backEndLogOut = true) => {
    setUser(null);
    localStorage.removeItem("user");
    console.log(user)
    navigate('/')
    if (backEndLogOut)
      fetch(Call.urlTo('/auth/logout'), { credentials: 'include' })
  };

  useEffect(() => {
    console.log(socketObject)

    if (socketObject?.action == 'login') {
      const messgeUser = socketObject?.message as IUser;
      if (messgeUser?.email) {
        setUser(messgeUser)
        localStorage.setItem('user', JSON.stringify(messgeUser))
      }
    }
    if (socketObject?.action == 'logout') {
      setUser(null)
      localStorage.removeItem('logout')
    }
  }, [socketMessage])

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
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
