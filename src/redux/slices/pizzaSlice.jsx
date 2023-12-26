import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading', // loading , success , error
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://813cecfc1deed960.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`,
  );

  console.log(thunkAPI);

  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      console.log(fetchPizzas.pending.toString());
      state.items = [];
      state.status = 'loading';
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      console.log(fetchPizzas.fulfilled.toString());

      state.items = action.payload.items;
      state.status = 'success';
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      console.log(fetchPizzas.rejected.toString());

      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectPizzaData = (state) => state.pizza;
// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
