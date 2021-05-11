import { createSlice } from '@reduxjs/toolkit';
import {
  getDiscounts,
  insertDiscount,
  updateDiscount,
  openDiscountModal,
  closeDiscountModal,
} from './discountThunk';

export interface Discount {
  isLoading: boolean;
  discountModal: boolean;
  year: number;
  discountList: Array<DiscountInfo>;
}

export interface DiscountInfo {
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
}

const initialState: Discount = {
  isLoading: false,
  discountModal: false,
  year: new Date().getFullYear(),
  discountList: [],
};

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.year = payload.year;
        state.discountList = payload.list;
      })
      .addCase(insertDiscount.fulfilled, (state) => {
        state.isLoading = false;
        state.discountModal = false;
      })
      .addCase(updateDiscount.fulfilled, (state) => {
        state.isLoading = false;
        state.discountModal = false;
      })
      .addCase(openDiscountModal, (state) => {
        state.discountModal = true;
      })
      .addCase(closeDiscountModal, (state) => {
        state.discountModal = false;
      });
  },
});

export default discountSlice.reducer;
