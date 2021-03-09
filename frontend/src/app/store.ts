import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
