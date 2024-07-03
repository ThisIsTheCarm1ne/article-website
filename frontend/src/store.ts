import { configureStore } from '@reduxjs/toolkit'
import authSlice from './states/auth/authSlice'
import userIdSlice from './states/auth/userIdSlice'
import articleSlice from './states/article/articleSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    userId: userIdSlice,
    article: articleSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
