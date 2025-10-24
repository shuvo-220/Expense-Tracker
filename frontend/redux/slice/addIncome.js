import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../src/baseUrl'

export const addIncome = createAsyncThunk('addIncome', async(data, {rejectWithValue })=>{
    try {
        const res = await axios.post(`${base_url}/api/income/addincome`, data, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const initialState={
    isLoading:false,
    income:[],
    error:null
}


const addIncomeSlice = createSlice({
    name:'income',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addIncome.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(addIncome.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.income.push(action.payload)
        })
        builder.addCase(addIncome.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default addIncomeSlice.reducer;