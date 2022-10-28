import { createSlice } from "@reduxjs/toolkit";


const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        somethingHere: {}
    },
    reducers: {
        changeSomethingHere: (state, action) => {
            const payload = action.payload;
            state.somethingHere = action.payload;
        }
    },
});

export const { changeSomethingHere } = redditSlice.actions;
export const selectSomethingHere = (state) => state.somethingHere;

export default redditSlice.reducer;