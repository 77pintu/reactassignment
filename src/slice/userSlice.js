import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser, editUser, getUser } from "../service";

const initialState = {
  user: [],
  isLoading: false,
  error: null,
};
export const getAsyncUsers = createAsyncThunk("getAsyncUsers/get", async () => {
  const response = await getUser();
  return response.data;
});
export const editAsyncUsers = createAsyncThunk("users/edit", async (data) => {
  const response = await editUser(data.id, data);
  return response.data;
});
export const deleteAsyncUsers = createAsyncThunk("users/delete", async (id) => {
  const response = await deleteUser(id);
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAsyncUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAsyncUsers.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    },
    [getAsyncUsers.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [editAsyncUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [editAsyncUsers.fulfilled]: (state, { payload }) => {
      state.user = state.user.map((userDetails) =>
        userDetails.id == payload.id ? payload : userDetails
      );
      state.isLoading = false;
    },
    [editAsyncUsers.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [deleteAsyncUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAsyncUsers.fulfilled]: (state, { payload }) => {
      // state.user=state.user.filter((_)=>_.id!==payload.id)
      let index = state.user.findIndex((_) => _.id === payload.id);
      state.user.splice(index, 1);
      state.isLoading = false;
    },
    [deleteAsyncUsers.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default userSlice.reducer;
