import { configureStore } from '@reduxjs/toolkit'
import addIncomeReducer from './slice/addIncome';
import getAllIncomeReducer from './slice/getAllIncome';
import myIncomeSlice from './slice/myIncome';

const store = configureStore({
    reducer:{
        addIncome:addIncomeReducer,
        getAllIncome:getAllIncomeReducer,
        myIncome:myIncomeSlice
    }
});

export default store;