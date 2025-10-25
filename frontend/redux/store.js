import { configureStore } from '@reduxjs/toolkit'
import addIncomeReducer from './slice/addIncome';
import getAllIncomeReducer from './slice/getAllIncome';
import myIncomeSlice from './slice/myIncome';
import myExpensReducer from './slice/myExpense';
import recentReducer from './slice/recentTransition';

const store = configureStore({
    reducer:{
        addIncome:addIncomeReducer,
        getAllIncome:getAllIncomeReducer,
        myIncome:myIncomeSlice,
        myExpense:myExpensReducer,
        recent:recentReducer
    }
});

export default store;