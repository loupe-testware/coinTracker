import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCoins = createAsyncThunk("coins/getcoins", async () => {
  return fetch(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
  ).then((res) => res.json());
});

interface coinsInitialStateInterface {
  list: object,
  status: string
}

const initialState: coinsInitialStateInterface = {
  list: [],
  status: "initial",
}

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCoins.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(getCoins.fulfilled, (state, payload) => {
      state.status = "success";
      state.list = payload;
    })
    builder.addCase(getCoins.rejected, (state) => {
      state.status = "failed";
    })
  },
});

export default coinsSlice.reducer;
