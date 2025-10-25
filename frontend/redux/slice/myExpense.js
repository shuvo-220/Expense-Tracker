import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../src/baseUrl";

export const myAllExpense = createAsyncThunk('myExpense', async(_, {rejectWithValue})=>{
    try {
        const res = await axios.get(`${base_url}/api/expense/myexpense`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState={
    isLoading:false,
    myExpense:[],
    error:null
}

const myExpenseSlice = createSlice({
    name:'myExpense',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(myAllExpense.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(myAllExpense.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.myExpense = action.payload
        })
        builder.addCase(myAllExpense.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default myExpenseSlice.reducer;