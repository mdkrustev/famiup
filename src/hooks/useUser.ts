// hooks/useUser.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setUser, logout, setLoading, setLoginRoomId } from "../store/userSlice";
import type { IUser, ISocketMessage } from "../utils/interfaces";
import { Call, Config } from "../utils/config";
import { WSListener } from "../utils/wsListener";

export const useUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, loginRoomId } = useSelector((state: RootState) => state.user);

  // WebSocket listener
  const { socketMessage, socketObject } = WSListener<ISocketMessage>(loginRoomId, Config.apiWs);

  // Зареждане на user от localStorage при mount
  useEffect(() => {
    dispatch(setLoading(true));
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        dispatch(setUser(JSON.parse(savedUser)));
      } catch {
        localStorage.removeItem("user");
        dispatch(setUser(null));
      }
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch]);

  // WebSocket обработка
  useEffect(() => {
    if (socketObject?.action === "login") {
      const messageUser = socketObject.message as IUser;
      if (messageUser?.email) {
        dispatch(setUser(messageUser));
      }
    }
    if (socketObject?.action === "logout") {
      dispatch(logout());
    }
  }, [socketMessage, dispatch, socketObject]);

  // login функция (отваря Google Login прозорец)
  const login = () => {
    const newLoginRoomId = crypto.randomUUID();
    dispatch(setLoginRoomId(newLoginRoomId));

    const width = 800;
    const height = window.screen.height / 2;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const url = Call.urlTo(`/google-login?loginRoomId=${newLoginRoomId}`);
    const options = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`;
    window.open(url, "GoogleLogin", options);
  };

  // logout функция
  const logoutUser = (backEndLogOut = true) => {
    dispatch(logout());
    if (backEndLogOut) fetch(Call.urlTo("/auth/logout"), { credentials: "include" });
  };

  return { user, loading, login, logout: logoutUser };
};