import { createSlice } from '@reduxjs/toolkit';
import { signInUser, validUser } from "./user.api"

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isValidUser: false,
    signIn: {
      IsSignInSuccess: false,
      Loading: false,
      Error: false,
    }
  },
  extraReducers: (builder) => {
    builder.addCase(validUser.fulfilled, (state, action) => {
      state.isValidUser = action.payload.isValid;
    })
    .addCase(validUser.rejected, (state, action) => {
      state.isValidUser = false;
    });


    builder.addCase(signInUser.pending, (state) => {
      state.signIn.Loading = true;
      state.signIn.IsSignInSuccess = false;
      state.signIn.Error = false;

    }).addCase(signInUser.fulfilled, (state, action) => {
      state.signIn.Loading = false;
      if (action.payload) {
        state.isValidUser = true;
        state.signIn.IsSignInSuccess = true;
      }
    }).addCase(signInUser.rejected, (state, action) => {
      state.signIn.Error = true;
      state.signIn.Loading = false;
    });
  }
});

// export slice 
export const { isValidUser } = userSlice.actions

// export reducers 
export default userSlice.reducer
export { validUser, signInUser }