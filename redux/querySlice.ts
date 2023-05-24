import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'search',
  initialState: {
    query: {
      categoryId: '',
      trademarkId: '',
      name: '',
      sort: {},
      limit: 18,
      // limit: 1,
      skip: 0,
      price: {
        from: 0,
        to: null,
      },
      star: null,
      // error: false,
    },
  },
  reducers: {
    insertQueryCategoryId: (state, action) => {
      state.query.categoryId = action.payload;
    },
    insertQueryTrademarkId: (state, action) => {
      state.query.trademarkId = action.payload;
    },
    insertQuerySearch: (state, action) => {
      state.query.categoryId = '';
      state.query.name = action.payload;
      state.query.sort = {};
    },
    insertQuerySort: (state, action) => {
      state.query.sort = { ...action.payload };
    },
    changeQueryPrice: (state, action) => {
      state.query.price = { ...action.payload };
    },
    selectQureyByStar: (state, action) => {
      state.query.star = action.payload;
    },
    refreshQuery: (state) => {
      state.query.categoryId = '';
      state.query.trademarkId = '';
      state.query.name = '';
      state.query.sort = {};
      state.query.price = {
        from: 0,
        to: null,
      };
      state.query.star = null;
    },
  },
});

export const {
  insertQueryCategoryId,
  insertQuerySearch,
  insertQuerySort,
  changeQueryPrice,
  selectQureyByStar,
  refreshQuery,
  insertQueryTrademarkId,
} = querySlice.actions;

export default querySlice.reducer;
