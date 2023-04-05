import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
    goals:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:'',
}

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) =>initialState
    },
    extraReducers:()=>{}
})


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;