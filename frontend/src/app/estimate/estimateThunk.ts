import { RootState } from 'app/store';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { database } from 'lib/client';
import { randomStr } from 'lib/randomStr';
import { EstimateInfo, EstimateProductInfo } from './estimateSlice';

export const selectEstimate = (state: RootState) => state.estimate;

export const getEstimateCount = createAsyncThunk<
  number,
  { year: string; month: string },
  { rejectValue: Error }
>('estimate/count', async ({ year, month }, { rejectWithValue }) => {
  try {
    const container = database.container('estimate');
    const querySpec = {
      query: `SELECT c.id from c where c.estimateNumber like '${year}${month}%'`,
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    if (items) {
      return items.length;
    }
  } catch (e) {
    alert('처리에 실패하였습니다.');
    return rejectWithValue(e.response);
  }
});

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
    specialPrice,
  }: {
    estimateNumber: string;
    date: string;
    attn: Array<string>;
    companyName: string;
    officerName: string;
    list: {
      dine: Array<EstimateProductInfo>;
      korloy: Array<EstimateProductInfo>;
    };
    validity: string;
    manufacturer: string;
    delivery: string;
    manager: string;
    validityYear: number;
    specialPrice: boolean;
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
        specialPrice,
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

export const updateEstimate = createAsyncThunk(
  'estimate/update',
  async ({
    estimateId,
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
    specialPrice,
  }: {
    estimateId: string;
    estimateNumber: string;
    date: string;
    attn: Array<string>;
    companyName: string;
    officerName: string;
    list: {
      dine: Array<EstimateProductInfo>;
      korloy: Array<EstimateProductInfo>;
    };
    validity: string;
    manufacturer: string;
    delivery: string;
    manager: string;
    validityYear: number;
    specialPrice: boolean;
  }) => {
    try {
      const container = database.container('estimate');
      await container.item(estimateId).replace({
        id: estimateId,
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
        specialPrice,
      });
      const querySpec = {
        query: `SELECT c.id from c where c.id='${estimateId}'`,
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

export const openEstimateModal = createAsyncThunk<
  number,
  { year: string; month: string },
  { rejectValue: Error }
>('estimate/modal/open', async ({ year, month }, { rejectWithValue }) => {
  try {
    const container = database.container('estimate');
    const querySpec = {
      query: `SELECT c.id from c where c.estimateNumber like '${year}${month}%'`,
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    if (items) {
      return items.length;
    }
  } catch (e) {
    alert('처리에 실패하였습니다.');
    return rejectWithValue(e.response);
  }
});

export const closeEstimateModal = createAction('estimate/modal/close');
