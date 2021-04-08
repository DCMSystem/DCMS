import { createSlice } from '@reduxjs/toolkit';
import {
  getPromotions,
  insertPromotion,
  updatePromotion,
  openPromotionModal,
  closePromotionModal,
} from './promotionThunk';

export interface Promotion {
  promotionModal: boolean;
  year: number;
  promotionList: Array<PromotionInfo>;
}

export interface PromotionInfo {
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

const initialState: Promotion = {
  promotionModal: false,
  year: new Date().getFullYear(),
  promotionList: [],
};

export const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.fulfilled, (state, { payload }) => {
        state.year = payload.year;
        state.promotionList = payload.list;
      })
      .addCase(insertPromotion.fulfilled, (state) => {
        state.promotionModal = false;
      })
      .addCase(updatePromotion.fulfilled, (state) => {
        state.promotionModal = false;
      })
      .addCase(openPromotionModal, (state) => {
        state.promotionModal = true;
      })
      .addCase(closePromotionModal, (state) => {
        state.promotionModal = false;
      });
  },
});

export default promotionSlice.reducer;
