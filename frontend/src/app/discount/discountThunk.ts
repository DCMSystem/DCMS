import { RootState } from 'app/store';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { DiscountInfo } from './discountSlice';
import { database } from 'lib/client';
import { randomStr } from 'lib/randomStr';
import { useAppDispatch } from 'app/hooks';

export const selectDiscount = (state: RootState) => state.discount;

export const getDiscounts = createAsyncThunk<
  { year: number; list: Array<DiscountInfo> },
  { year: number },
  { rejectValue: Error }
>('discount/list', async ({ year }: { year: number }, { rejectWithValue }) => {
  try {
    const container = database.container('discount');
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

export const insertDiscount = createAsyncThunk(
  'discount/insert',
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
      const container = database.container('discount');
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
        dispatch(getDiscounts({ year }));
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

export const updateDiscount = createAsyncThunk(
  'discount/update',
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
      const container = database.container('discount');
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
        dispatch(getDiscounts({ year }));
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

export const deleteDiscount = createAsyncThunk(
  'estimate/delete',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const container = database.container('discount');
      const { resource: result } = await container.item(id).delete();
      if (!result) {
        dispatch(getDiscounts({ year: new Date().getFullYear() }));
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

export const openDiscountModal = createAction('discount/modal/open');
export const closeDiscountModal = createAction('discount/modal/close');
