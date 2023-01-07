import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fname: '',
    lname: '',
    email: ''
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setFname: (state, action) => {
            state.fname = action.payload
        },
        setLname: (state, action) => {
            state.lname = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
    }
});

export const { setFname, setLname, setEmail } = loginSlice.actions;

export const selectEmail = (state) => state.login.email;
export const selectFname = (state) => state.login.fname;
export const selectLname = (state) => state.login.lname;

export default loginSlice.reducer;