import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { createLogin, editLogin, getLogin } from "../service";

const initialState={
 login:[],
 isLoading:true,
 error:null
}
export const getLoginAsync=createAsyncThunk('getLoginAsync/get',async(data)=>{
    const response=await getLogin(data);
    return response.data;
});
export const createLoginAsync=createAsyncThunk('createLoginAsync',async(data) => {
  const response=await createLogin(data);
    	return response.data;
})
export const editLoginAsync=createAsyncThunk('editLoginAsync/get',async(data)=>{
    const response=await editLogin(data);
    return response.data;
});

 const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{},
    extraReducers:{
        [getLoginAsync.pending]:(state)=>{
            state.isLoading=true;
        },
        [getLoginAsync.fulfilled]:(state,{payload})=>{
            state.user=payload;
            state.isLoading=false;
        },
        [getLoginAsync.rejected]:(state)=>{
        state.error=true;
        },
    
        [createLoginAsync.pending]:(state)=>{
            state.isLoading=true;
        },
        [createLoginAsync.fulfilled]:(state,{payload})=>{
            state.user=state.user?.push(payload);
            state.isLoading=false;
        },
        [createLoginAsync.rejected]:(state)=>{
        state.error=true;
        },
        [editLoginAsync.pending]:(state)=>{
            state.isLoading=true;
        },
        [editLoginAsync.fulfilled]:(state,{payload})=>{
           state.user=state.login.map((userDetails)=>userDetails.id==payload.id?payload:userDetails);
           state.isLoading=false;
        },
        [editLoginAsync.rejected]:(state)=>{
        state.error=true;
        },
    }
})
export default loginSlice.reducer;