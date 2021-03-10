import { createSlice } from '@reduxjs/toolkit';
import {
  getLogin,
  getLogout,
  signup,
  openUserModal,
  closeUserModal,
  setUserInfo,
} from './userThunk';
import { encrypt } from 'lib/crypto';
import { push } from 'lib/historyUtils';

export interface User {
  userModal: boolean;
  userModalMode: string;
  userInfo: UserInfo;
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
  userModalMode: 'login',
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
          state.userModalMode = 'login';
        }
      })
      .addCase(getLogin.rejected, (state, action) => {
        if (action.payload) {
          alert(action.payload.message);
        } else {
          alert(action.error);
        }
      })
      .addCase(getLogout.fulfilled, (state) => {
        window.localStorage.removeItem('info');
        state.userInfo = initialState.userInfo;
        state.userModal = initialState.userModal;
        state.userModalMode = initialState.userModalMode;
      })
      .addCase(signup.fulfilled, (state) => {
        state.userModal = false;
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
      });
  },
});

export default userSlice.reducer;
