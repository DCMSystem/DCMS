import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import estimateReducer from './estimate/estimateSlice';
import promotionReducer from './promotion/promotionSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
    estimate: estimateReducer,
    promotion: promotionReducer,
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
