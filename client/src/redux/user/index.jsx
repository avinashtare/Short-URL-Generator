import { createSlice } from '@reduxjs/toolkit';
import { signInUser, signUpUser, validUser } from "./user.api"

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isValidUser: false,
    signIn: {
      Loading: false,
      Error: false,
    },
    signUp: {
      Loading: false,
      Error: false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(validUser.fulfilled, (state, action) => {
      state.isValidUser = action.payload.isValid;
    }).addCase(validUser.rejected, (state, action) => {
      state.isValidUser = false;
    });

    // sign in builder 
    builder.addCase(signInUser.pending, (state) => {
      state.signIn.Loading = true;
      state.signIn.Error = false;

    }).addCase(signInUser.fulfilled, (state, action) => {
      state.signIn.Loading = false;
      if (action.payload?.isSignIn) {
        state.isValidUser = true;
      }
    }).addCase(signInUser.rejected, (state, action) => {
      state.signIn.Error = true;
      state.signIn.Loading = false;
    });

    // sign up builder 
    builder.addCase(signUpUser.pending, (state) => {
      state.signUp.Loading = true;
      state.signUp.Error = false;

    }).addCase(signUpUser.fulfilled, (state, action) => {
      state.signUp.Loading = false;
      if (action.payload?.isSignUp) {
        state.isValidUser = true;
      }
    }).addCase(signUpUser.rejected, (state, action) => {
      state.signUp.Error = true;
      state.signUp.Loading = false;
    });
  }
});

// export slice 
export const { isValidUser } = userSlice.actions

// export reducers 
export default userSlice.reducer
export { validUser, signInUser, signUpUser }