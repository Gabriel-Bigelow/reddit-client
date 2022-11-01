import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubreddits = createAsyncThunk(
    'subredditsBar',
    async () => {
        const response = await fetch('https://www.reddit.com/subreddits/.json?limit=100');
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
)


const subredditsBarSlice = createSlice({
    name: 'subredditsBar',
    initialState: {
        subreddits: {},
        isLoading: false,
        hasError: false
    },
    reducers: {

    },
    extraReducers: {
        [loadSubreddits.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            const subredditsArray = action.payload;
            for (let {data} of subredditsArray) {
                state.subreddits[data['id']] = {
                    title: data['title'],
                    subscribers: data['subscribers'],
                    url: data['url']
                }
            }
            state.isLoading = false;
            state.hasError = false;
        },
        [loadSubreddits.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})



export const selectSubreddits = (state) => state.subredditsBar.subreddits;

export default subredditsBarSlice.reducer;