import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import client from 'lib/client';
import { RootState } from 'app/store';
import { User, UserInfo } from './userSlice';

export const selectUser = (state: RootState) => state.user;

export const getLogin = createAsyncThunk<
  UserInfo,
  { mail: string; password: string },
  { rejectValue: Error }
>(
  'users/login',
  async ({ mail, password }: { mail: string; password: string }, { rejectWithValue }) => {
    try {
      const clientRes = await client.post('/user/login', { mail, password });
      const { user } = clientRes.data;
      return user;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getLogout = createAsyncThunk('users/logout', async () => {
  const clientRes = await client.get('/user/logout');
  return clientRes.data;
});

export const signup = createAsyncThunk<
  User,
  {
    mail: string;
    password: string;
    name: string;
    job: string;
    interest: string;
  },
  { rejectValue: Error }
>(
  'users/signup',
  async (
    {
      mail,
      password,
      name,
      job,
      interest,
    }: {
      mail: string;
      password: string;
      name: string;
      job: string;
      interest: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const clientRes = await client.post('/user/add', { mail, password, name, job, interest });
      return clientRes.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const openUserModal = createAction<string>('user/modal/open');
export const closeUserModal = createAction('user/modal/close');

export const setUserInfo = createAction<UserInfo>('user/info');
