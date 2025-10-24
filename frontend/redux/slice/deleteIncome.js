import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../src/baseUrl';

export const incomeDelete=createAsyncThunk('incomeDelete', async(id, {rejectWithValue})=>{
    try {
        const res = await axios.delete(`${base_url}/api/income/delete/${id}`,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState={
    isLoading:false,
    success:false,
    error:null
}

const incomeDeleteSlice = createSlice({
    name:'deleteSlice',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(incomeDelete.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(incomeDelete.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.success = true
        })
        builder.addCase(incomeDelete.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default incomeDeleteSlice.reducer;