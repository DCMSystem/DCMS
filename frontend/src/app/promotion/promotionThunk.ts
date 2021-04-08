import { RootState } from 'app/store';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { PromotionInfo } from './promotionSlice';
import { database } from 'lib/client';
import { randomStr } from 'lib/randomStr';
import { useAppDispatch } from 'app/hooks';

export const selectPromotion = (state: RootState) => state.promotion;

export const getPromotions = createAsyncThunk<
  { year: number; list: Array<PromotionInfo> },
  { year: number },
  { rejectValue: Error }
>('promotion/list', async ({ year }: { year: number }, { rejectWithValue }) => {
  try {
    const container = database.container('promotion');
    const querySpec = {
      query: `SELECT * from c where c.year=${year}`,
    };
    const { resources: items } = await container.items.query(querySpec).fetchAll();

    return { year, list: items };
  } catch (e) {
    console.log(e);
    alert('처리에 실패하였습니다.');
    return rejectWithValue(e.response);
  }
});

export const insertPromotion = createAsyncThunk(
  'promotion/insert',
  async (
    {
      year,
      type,
      category,
      productFamily,
      purchaseDiscount,
      purchaseCondition,
      salesDiscount,
      salesCondition,
      profit,
      note,
    }: {
      year: number;
      type: string; //DINE, KORLOY
      category: string; //일반, 대량
      productFamily: string; //제품군
      purchaseDiscount: number;
      purchaseCondition: string;
      salesDiscount: number;
      salesCondition: string;
      profit: number;
      note: string;
    },
    { dispatch }
  ) => {
    try {
      const container = database.container('promotion');
      const itemId = randomStr();
      const { resource } = await container.items.create({
        id: itemId,
        year,
        type,
        category,
        productFamily,
        purchaseDiscount,
        purchaseCondition,
        salesDiscount,
        salesCondition,
        profit,
        note,
      });

      if (resource) {
        dispatch(getPromotions({ year }));
      } else {
        throw new Error('oops');
      }
    } catch (e) {
      console.log(e);
      alert('처리에 실패하였습니다.');
      return new Error('oops');
    }
  }
);

export const updatePromotion = createAsyncThunk(
  'promotion/update',
  async (
    {
      id,
      year,
      type,
      category,
      productFamily,
      purchaseDiscount,
      purchaseCondition,
      salesDiscount,
      salesCondition,
      profit,
      note,
    }: {
      id: string;
      year: number;
      type: string; //DINE, KORLOY
      category: string; //일반, 대량
      productFamily: string; //제품군
      purchaseDiscount: number;
      purchaseCondition: string;
      salesDiscount: number;
      salesCondition: string;
      profit: number;
      note: string;
    },
    { dispatch }
  ) => {
    try {
      const container = database.container('promotion');
      const { resource: updatedItem } = await container.item(id).replace({
        id,
        year,
        type,
        category,
        productFamily,
        purchaseDiscount,
        purchaseCondition,
        salesDiscount,
        salesCondition,
        profit,
        note,
      });

      if (updatedItem) {
        dispatch(getPromotions({ year }));
        return true;
      } else {
        throw new Error('oops');
      }
    } catch (e) {
      console.log(e);
      alert('처리에 실패하였습니다.');
      return new Error('oops');
    }
  }
);

export const deletePromotion = createAsyncThunk(
  'estimate/delete',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const container = database.container('promotion');
      const { resource: result } = await container.item(id).delete();
      if (!result) {
        dispatch(getPromotions({ year: new Date().getFullYear() }));
        return true;
      } else {
        throw new Error('oops');
      }
    } catch (e) {
      console.log(e);
      alert('처리에 실패하였습니다.');
      return new Error('oops');
    }
  }
);

export const openPromotionModal = createAction('promotion/modal/open');
export const closePromotionModal = createAction('promotion/modal/close');
