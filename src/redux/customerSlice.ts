import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCustomerDetails = createAsyncThunk("customer/getDetails", async () => {
  return fetch(
    "https://30bglyrnxl.execute-api.eu-west-2.amazonaws.com/dev"
  ).then((res) => res.json());
});

interface customerInitialStateInterface {
  list: any;
  status: string;
}

const initialState: customerInitialStateInterface = {
  list: [],
  status: "initial",
};

const customerSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomerDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCustomerDetails.fulfilled, (state, payload) => {
      state.status = "success";
      state.list = payload;
    });
    builder.addCase(getCustomerDetails.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default customerSlice.reducer;
