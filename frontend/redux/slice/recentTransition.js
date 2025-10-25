import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../src/baseUrl';

export const recentTransitions = createAsyncThunk('recent', async(_, {rejectWithValue})=>{
    try {
        const res = await axios.get(`${base_url}/api/expense/recent`, {
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
    recent:[],
    error:null
}

const recentSlice = createSlice({
    name:'recent',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(recentTransitions.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(recentTransitions.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.recent = action.payload
        })
        builder.addCase(recentTransitions.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default recentSlice.reducer;