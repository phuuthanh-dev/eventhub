import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  id: string;
  email: string;
  accessToken: string;
  fullName?: string;
  follow_events: string[];
  fcmTokens?: string[];
  following?: string[];
  photo?: string;
}

const initialState: AuthState = {
  id: "",
  email: "",
  accessToken: "",
  follow_events: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, action) => {
      state.authData = initialState;
    },
    addFollowedEvent: (state, action) => {
      state.authData.follow_events = action.payload;
    },
    updateFollowing: (state, action) => {
      state.authData.following = action.payload;
    },
    addPhotoUrl: (state, action) => {
      state.authData.photo = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, addFollowedEvent, updateFollowing, addPhotoUrl } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
