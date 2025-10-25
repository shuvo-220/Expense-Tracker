import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../src/baseUrl";

export const addexpense = createAsyncThunk('addExpense', async(data, {rejectWithValue})=>{
    try {
        const res = await axios.post(`${base_url}/api/expense/addexpense`,data,{
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
    expense:[],
    error:null
}

const expenseSlice = createSlice({
    name:'expense',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addexpense.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(addexpense.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.expense.push(action.payload)
        })
        builder.addCase(addexpense.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default expenseSlice.reducer;