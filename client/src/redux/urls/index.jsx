import { createSlice } from '@reduxjs/toolkit';
import { createUrl, getLinks } from './urls.api';

export const urlSlice = createSlice({
    name: 'urlSlice',
    initialState: {
        createUrl: {
            isLoading: false,
            isError: false
        },
        getLinks: {
            isLoading: false,
            isError: false,
            links: []
        }
    },
    extraReducers: (builder) => {
        // crate url 
        builder.addCase(createUrl.pending, (state, action) => {
            state.createUrl.isLoading = true;
            state.createUrl.isError = false;
        }).addCase(createUrl.fulfilled, (state, action) => {
            state.createUrl.isLoading = false
        }).addCase(createUrl.rejected, (state, action) => {
            state.createUrl.isLoading = false;
            state.createUrl.isError = true;
        })

        // get links 
        builder.addCase(getLinks.pending, (state, action) => {
            state.getLinks.isLoading = true;
            state.getLinks.isError = false;
        }).addCase(getLinks.fulfilled, (state, action) => {
            state.getLinks.isLoading = false;
            state.getLinks.links = action.payload?.links;
        }).addCase(getLinks.rejected, (state, action) => {
            state.getLinks.isLoading = false;
            state.getLinks.isError = true;
            state.getLinks.links = [];
        })
    }
});

// export reducers 
export default urlSlice.reducer
export { createUrl, getLinks }