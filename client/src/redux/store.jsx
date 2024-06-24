import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import urlsReducer from  './urls'

export default configureStore({
  reducer: {
    user: userReducer,
    urls: urlsReducer
  },
})