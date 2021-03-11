import { createSlice } from '@reduxjs/toolkit';
import {
  getLogin,
  getLogout,
  signup,
  openUserModal,
  closeUserModal,
  setUserInfo,
  getUserList,
  deleteUser,
} from './userThunk';
import { encrypt } from 'lib/crypto';

export interface User {
  userModal: boolean;
  userModalMode: string;
  userInfo: UserInfo;
  userList: Array<UserInfo>;
}

export interface UserInfo {
  id: string;
  isMaster: boolean;
}

export interface Error {
  message: string;
}

const initialState: User = {
  userModal: false,
  userModalMode: 'signup',
  userList: [],
  userInfo: {
    id: '',
    isMaster: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.fulfilled, (state, { payload }) => {
        const encryptedCode = encrypt({ data: JSON.stringify(payload) });

        if (encryptedCode) {
          window.localStorage.setItem('info', encryptedCode);
          state.userInfo = payload;
          state.userModal = false;
          state.userList = [];
          state.userModalMode = 'signup';
        }
      })
      .addCase(getLogout.fulfilled, (state) => {
        window.localStorage.removeItem('info');
        state.userInfo = initialState.userInfo;
        state.userModal = initialState.userModal;
        state.userModalMode = initialState.userModalMode;
        state.userList = initialState.userList;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.userModal = false;
        state.userList = payload;
      })
      .addCase(signup.rejected, (state, action) => {
        if (action.payload) {
          alert(action.payload.message);
        } else {
          alert(action.error);
        }
      })
      .addCase(openUserModal, (state, { payload }) => {
        state.userModalMode = payload;
        state.userModal = true;
      })
      .addCase(closeUserModal, (state) => {
        state.userModal = false;
      })
      .addCase(setUserInfo, (state, { payload }) => {
        state.userInfo = payload;
      })
      .addCase(getUserList.fulfilled, (state, { payload }) => {
        state.userList = payload;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.userList = payload;
      });
  },
});

export default userSlice.reducer;
