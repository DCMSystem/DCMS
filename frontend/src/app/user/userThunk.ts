import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import client, { database } from 'lib/client';
import { RootState } from 'app/store';
import { User, UserInfo } from './userSlice';
import { decryptStr } from 'lib/crypto';
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

      if (items.length > 0) {
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
      return rejectWithValue(e.response);
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
