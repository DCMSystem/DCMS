import { createSlice } from '@reduxjs/toolkit';
import { getEstimateCount, insertEstimate } from './estimateThunk';

export interface Estimate {
  estimateModal: boolean;
  estimateCount: number;
}

const initialState: Estimate = {
  estimateModal: false,
  estimateCount: 0,
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
      });
  },
});

export default estimateSlice.reducer;
