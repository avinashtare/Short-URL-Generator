import { createSlice } from '@reduxjs/toolkit';
import { createUrl } from './urls.api';

export const urlSlice = createSlice({
    name: 'urlSlice',
    initialState: {
        createUrl: {
            isLoading: false,
            isError: false
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(validUser.fulfilled, (state, action) => {
        //   state.isValidUser = action.payload.isValid;
        // }).addCase(validUser.rejected, (state, action) => {
        //   state.isValidUser = false;
        // });
        builder.addCase(createUrl.pending, (state, action) => {
            state.createUrl.isLoading = true;
            state.createUrl.isError = false;
        }).addCase(createUrl.fulfilled, (state, action) => {
            state.createUrl.isLoading = false
        }).addCase(createUrl.rejected, (state, action) => {
            state.createUrl.isLoading = false;
            state.createUrl.isError = true;
        })
    }

});

// export reducers 
export default urlSlice.reducer
export { createUrl }