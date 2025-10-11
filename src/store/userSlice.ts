// store/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import type { IUser } from "../utils/interfaces";

interface UserState {
  user: IUser | null;
  loading: boolean;
  loginRoomId: string | null;
}

// Взимаме user от localStorage, ако има
const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const initialUser: IUser | null = savedUser ? JSON.parse(savedUser) : null;

const initialState: UserState = {
  user: initialUser,
  loading: false,
  loginRoomId: initialUser?.loginroom_id || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
      state.loading = false;
      state.loginRoomId = action.payload?.loginroom_id || null;

      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoginRoomId(state, action: PayloadAction<string | null>) {
      state.loginRoomId = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.loginRoomId = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setLoading, setLoginRoomId, logout } = userSlice.actions;
export default userSlice.reducer;
