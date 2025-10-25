import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../src/baseUrl";

export const deleteExpense = createAsyncThunk('deleteExpense', async(id, {rejectWithValue})=>{
    try {
        const res = await axios.delete(`${base_url}/api/expense/delete/${id}`, {
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
    success:false,
    error:null
}

const deleteExpenseSlice = createSlice({
    name:'deleteExpense',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(deleteExpense.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(deleteExpense.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.success = true
        })
        builder.addCase(deleteExpense.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default deleteExpenseSlice.reducer;