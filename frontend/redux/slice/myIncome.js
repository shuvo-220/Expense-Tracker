import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { base_url } from '../../src/baseUrl';

export const getMyIncome = createAsyncThunk('myIncome', async(_, {rejectWithValue})=>{
    try {
        const res = await axios.get(`${base_url}/api/income/myincome`, {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error.message)
    }
})

const initialState={
    isLoading:false,
    myIncome:[],
    error:null
}

const myIncomeSlice = createSlice({
    name:'myIncome',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getMyIncome.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getMyIncome.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.myIncome = action.payload
        })
        builder.addCase(getMyIncome.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default myIncomeSlice.reducer;