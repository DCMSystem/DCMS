import { createSlice } from '@reduxjs/toolkit';
import {
  getEstimateCount,
  insertEstimate,
  openEstimateModal,
  closeEstimateModal,
  getEstimates,
} from './estimateThunk';

export interface Estimate {
  estimateModal: boolean;
  estimateCount: number;
  estimates: Array<EstimateInfo>;
}

export interface EstimateInfo {
  id: string;
  estimateNumber: string;
  date: string;
  attn: Array<string>;
  validity: string;
  validityYear: number;
  officerName: string;
  companyName: string;
  list: {
    dine: Array<EstimateProductInfo>;
    korloy: Array<EstimateProductInfo>;
  };
  manufacturer: string;
  manager: string;
  delivery: string;
}

export interface EstimateProductInfo {
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
}

const initialState: Estimate = {
  estimateModal: false,
  estimateCount: 0,
  estimates: [],
};

export const estimateSlice = createSlice({
  name: 'estimate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEstimateCount.fulfilled, (state, { payload }) => {
        state.estimateCount = payload;
      })
      .addCase(insertEstimate.fulfilled, (state) => {
        state.estimateCount += 1;
        state.estimateModal = false;
      })
      .addCase(openEstimateModal, (state) => {
        state.estimateModal = true;
      })
      .addCase(closeEstimateModal, (state) => {
        state.estimateModal = false;
      })
      .addCase(getEstimates.fulfilled, (state, { payload }) => {
        state.estimates = payload;
      });
  },
});

export default estimateSlice.reducer;
