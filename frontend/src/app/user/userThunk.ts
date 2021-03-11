import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import client, { database } from 'lib/client';
import { RootState } from 'app/store';
import { UserInfo } from './userSlice';
import { decryptStr, encrypt } from 'lib/crypto';
import { push } from 'lib/historyUtils';

export const selectUser = (state: RootState) => state.user;

export const getLogin = createAsyncThunk<
  UserInfo,
  { id: string; password: string },
  { rejectValue: Error }
>(
  'users/login',
  async ({ id, password }: { id: string; password: string }, { rejectWithValue }) => {
    try {
      const container = database.container('user');
      const querySpec = {
        query: `SELECT c.id, c.password, c.isMaster from c WHERE c.id="${id}"`,
      };

      const { resources: items } = await container.items.query(querySpec).fetchAll();

      if (items && items.length > 0) {
        if (items[0].password) {
          if (decryptStr({ data: items[0].password }) === password) {
            push('/main');
            return items[0];
          } else {
            throw new Error('oops');
          }
        } else {
          alert('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
          throw new Error('oops');
        }
      } else {
        alert('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
        throw new Error('oops');
      }
    } catch (e) {
      alert('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
      return rejectWithValue(e.response);
    }
  }
);

export const getUserList = createAsyncThunk<Array<UserInfo>>('users/list', async () => {
  const container = database.container('user');
  const querySpec = {
    query: `SELECT c.id, c.isMaster from c`,
  };

  const { resources: items } = await container.items.query(querySpec).fetchAll();

  if (items && items.length > 0) {
    return items;
  }
});

export const getLogout = createAsyncThunk('users/logout', async () => {
  const clientRes = await client.get('/user/logout');
  return clientRes.data;
});

export const signup = createAsyncThunk<
  Array<UserInfo>,
  {
    id: string;
    password: string;
    isMaster: boolean;
  },
  { rejectValue: Error }
>(
  'users/signup',
  async (
    {
      id,
      password,
      isMaster,
    }: {
      id: string;
      password: string;
      isMaster: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const container = database.container('user');
      await container.items.create({ id, password: encrypt({ data: password }), isMaster });
      const { resources: items } = await container.items.readAll().fetchAll();

      if (items && items.length > 0) {
        return items;
      } else {
        throw new Error('oops');
      }
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk<Array<UserInfo>, { id: string }, { rejectValue: Error }>(
  'users/delete',
  async (
    {
      id,
    }: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const container = database.container('user');
      await container.item(id).delete();
      const { resources: items } = await container.items.readAll().fetchAll();

      if (items && items.length > 0) {
        return items;
      } else {
        throw new Error('oops');
      }
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const openUserModal = createAction<string>('user/modal/open');
export const closeUserModal = createAction('user/modal/close');

export const setUserInfo = createAction<UserInfo>('user/info');
