import { RootState } from 'app/store';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { database } from 'lib/client';
import { randomStr } from 'lib/randomStr';
import { EstimateInfo } from './estimateSlice';

export const selectEstimate = (state: RootState) => state.estimate;

export const getEstimateCount = createAsyncThunk<number, undefined, { rejectValue: Error }>(
  'estimate/count',
  async (undefined, { rejectWithValue }) => {
    try {
      const container = database.container('estimate');
      const querySpec = {
        query: `SELECT c.id from c`,
      };

      const { resources: items } = await container.items.query(querySpec).fetchAll();

      if (items) {
        return items.length;
      }
    } catch (e) {
      alert('처리에 실패하였습니다.');
      return rejectWithValue(e.response);
    }
  }
);

export const insertEstimate = createAsyncThunk(
  'estimate/insert',
  async ({
    estimateNumber,
    date,
    attn,
    companyName,
    officerName,
    list,
    validity,
    manufacturer,
    delivery,
    manager,
    validityYear,
  }: {
    estimateNumber: string;
    date: string;
    attn: Array<string>;
    companyName: string;
    officerName: string;
    list: {
      dine: Array<{
        id: string;
        type: string;
        category: string;
        name: string;
        count: number;
        price: number;
        amount: number;
        stock: string;
        orgPrice: number;
        profit: number;
      }>;
      korloy: Array<{
        id: string;
        type: string;
        category: string;
        name: string;
        count: number;
        price: number;
        amount: number;
        stock: string;
        orgPrice: number;
        profit: number;
      }>;
    };
    validity: string;
    manufacturer: string;
    delivery: string;
    manager: string;
    validityYear: number;
  }) => {
    try {
      const container = database.container('estimate');
      const itemId = randomStr();
      await container.items.create({
        id: itemId,
        estimateNumber,
        date,
        attn,
        companyName,
        officerName,
        list,
        validity,
        manufacturer,
        delivery,
        manager,
        validityYear,
      });
      const querySpec = {
        query: `SELECT c.id from c where c.id='${itemId}'`,
      };

      const { resources: items } = await container.items.query(querySpec).fetchAll();

      if (items.length > 0) {
        return true;
      } else {
        alert('처리에 실패하였습니다.');
        return new Error('oops');
      }
    } catch (e) {
      console.log(e);
      alert('처리에 실패하였습니다.');
      return new Error('oops');
    }
  }
);

export const getEstimates = createAsyncThunk<Array<EstimateInfo>>('estimate/list', async () => {
  try {
    const container = database.container('estimate');
    const querySpec = {
      query: `SELECT * from c ORDER BY c._ts DESC
    `,
    };
    const { resources: items } = await container.items.query(querySpec).fetchAll();

    return items;
  } catch (e) {
    console.log(e);
    alert('처리에 실패하였습니다.');
    return new Error('oops');
  }
});

export const openEstimateModal = createAction('estimate/modal/open');
export const closeEstimateModal = createAction('estimate/modal/close');
