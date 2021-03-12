import { RootState } from 'app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from 'lib/client';
import { randomStr } from 'lib/randomStr';

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
  }: {
    estimateNumber: string;
    date: Date;
    attn: Array<string>;
    companyName: string;
    officerName: string;
    list: Array<{
      type: string;
      no: number;
      name: string;
      count: number;
      price: string;
      amount: number;
      stock: string;
    }>;
    validity: string;
    manufacturer: string;
    delivery: string;
    manager: string;
  }) => {
    try {
      const container = database.container('estimate');
      const { resources: item } = await container.items.create({
        id: randomStr(),
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
      });

      if (item) {
        return item;
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
