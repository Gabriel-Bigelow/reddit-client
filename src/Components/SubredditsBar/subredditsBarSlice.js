import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubreddits = createAsyncThunk(
    'subredditsBar/loadSubreddits',
    async () => {
        const response = await fetch('https://www.reddit.com/subreddits/.json?limit=100');
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
)

export const loadSubredditPage = createAsyncThunk(
    'subredditsBar/loadSubredditsData',
    async (url) => {
        if (!url) {
            url = '/';
        }
        const response = await fetch(`https://www.reddit.com${url}.json?limit=5`);
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
)

const subredditsBarSlice = createSlice({
    name: 'subredditsBar',
    initialState: {
        subreddits: {},
        selectedSubreddit: '',
        returnedSubredditData: {},
        isLoading: false,
        hasError: false
    },
    reducers: {
        setSelectedSubreddit: (state,action) => {
            state.selectedSubreddit = action.payload;
        },
        clearReturnedSubredditData: (state, action) => {
            state.returnedSubredditData = {};
        }
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
        },
        [loadSubredditPage.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadSubredditPage.fulfilled]: (state, action) => {
            for (let article of action.payload) {
                const { data } = article;
                state.returnedSubredditData[data.id] = article;
            }
            state.isLoading = false;
            state.hasError = false;
        },
        [loadSubredditPage.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})


export const { clearReturnedSubredditData, setSelectedSubreddit } = subredditsBarSlice.actions;
export const selectSubreddits = (state) => state.subredditsBar.subreddits;
export const selectSelectedSubreddit = (state) => state.subredditsBar.selectedSubreddit;
export const selectReturnedSubredditData = (state) => state.subredditsBar.returnedSubredditData;

export default subredditsBarSlice.reducer;