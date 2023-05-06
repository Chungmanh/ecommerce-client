import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'search',
  initialState: {
    query: {
      categoryId: '',
      name: '',
      sort: {},
      limit: 6,
      skip: 0,
      // price: [0, 100000],
      // error: false,
    },
  },
  reducers: {
    insertQueryCategoryId: (state, action) => {
      state.query.categoryId = action.payload;
    },
    insertQuerySearch: (state, action) => {
      state.query.categoryId = '';
      state.query.name = action.payload;
      state.query.sort = {};
    },
    insertQuerySort: (state, action) => {
      state.query.sort = { ...action.payload };
    },
  },
});

export const { insertQueryCategoryId, insertQuerySearch, insertQuerySort } =
  querySlice.actions;

export default querySlice.reducer;
