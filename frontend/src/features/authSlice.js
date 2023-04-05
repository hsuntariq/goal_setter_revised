import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import authService from './authService';

// set the user in the local storage
const user = JSON.parse(localStorage.getItem('user'));

// set the initial state for the app

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

// create the function to register the user

export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    return authService.logout();
})

// login function

export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})


// create the Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(register.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(register.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload;
                })
                .addCase(register.rejected, (state, action) => {
                    state.user = null;
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError= true;
                    state.message = action.payload
                })
                .addCase(logout.pending, (state) => {
                    state.user = null;
                    state.isLoading = true;
                })
                .addCase(logout.fulfilled, (state) => {
                    state.user = null;
                    state.isLoading = true;
                })
                .addCase(logout.rejected, (state,action) => {
                    state.isLoading = true;
                    state.message = action.payload
                })
                .addCase(login.pending,(state)=>{
                    state.isLoading = true;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload
                })
                .addCase(login.rejected, (state, action) => {
                    state.user = null;
                    state.isLoading = false;
                    state.message = action.payload;
                })
        }
})

export const {
    reset
} = authSlice.actions;
export default authSlice.reducer;