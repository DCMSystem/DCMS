import { createSlice } from '@reduxjs/toolkit';
import {
  getEstimateCount,
  insertEstimate,
  openEstimateModal,
  closeEstimateModal,
  getEstimates,
  updateEstimate,
} from './estimateThunk';

export interface Estimate {
  isLoading: boolean;
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
  specialPrice: boolean;
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
  specialPrice: boolean;
}

const initialState: Estimate = {
  isLoading: false,
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
      .addCase(getEstimateCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertEstimate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEstimate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openEstimateModal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEstimates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEstimateCount.fulfilled, (state, { payload }) => {
        state.estimateCount = payload;
        state.isLoading = false;
      })
      .addCase(insertEstimate.fulfilled, (state) => {
        state.estimateCount += 1;
        state.estimateModal = false;
        state.isLoading = false;
      })
      .addCase(updateEstimate.fulfilled, (state) => {
        state.estimateModal = false;
        state.isLoading = false;
      })
      .addCase(openEstimateModal.fulfilled, (state, { payload }) => {
        state.estimateCount = payload;
        state.estimateModal = true;
        state.isLoading = false;
      })
      .addCase(closeEstimateModal, (state) => {
        state.estimateModal = false;
      })
      .addCase(getEstimates.fulfilled, (state, { payload }) => {
        state.estimates = payload;
        state.isLoading = false;
      });
  },
});

export default estimateSlice.reducer;
