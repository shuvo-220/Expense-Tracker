import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../src/baseUrl";

export const getAllIncome=createAsyncThunk('getAllIncomes', async(_, {rejectWithValue})=>{
    try {
        const res = await axios.get(`${base_url}/api/income/allincomes`, {
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
    allIncome:[],
    error:null
}

const getAllIncomeSlice = createSlice({
    name:'getAllIncome',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getAllIncome.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getAllIncome.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.allIncome = action.payload
        })
        builder.addCase(getAllIncome.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default getAllIncomeSlice.reducer;