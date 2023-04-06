import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import goalService from "./goalService";

const initialState = {
    goals:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:'',
}

export const createGoal = createAsyncThunk('goals/create', async (goal, thunkApi) => {
    try {
        let token = thunkApi.getState().auth.user.token;
        return await goalService.postGoals(goal, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
}
)

// get goals

export const getGoals = createAsyncThunk('goals/getGoal', async (_, thunkApi) => {
    try {
        let token = thunkApi.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})


export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) =>initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= false;
                state.message = action.payload
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
        })


    }
})


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;