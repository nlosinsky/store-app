import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { User, UserResponse } from '../../models';

enum Themes {
  WINTER = 'winter',
  DRACULA = 'dracula'
}

type Theme = Themes.DRACULA | Themes.WINTER

type UserState = {
  user: User | null;
  theme: Theme;
}

const getThemeFromLocalStorage = (): Theme => {
  const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') as Theme : Themes.WINTER;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) as User : null;
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage()
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<UserResponse>) {
      const user = {...action.payload.user, token: action.payload.jwt};
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
    toggleTheme(state) {
      const {WINTER, DRACULA} = Themes;
      state.theme = state.theme === WINTER ? WINTER : DRACULA;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    }
  }
})

export const {loginUser, logoutUser, toggleTheme} = userSlice.actions;

export default userSlice.reducer;
