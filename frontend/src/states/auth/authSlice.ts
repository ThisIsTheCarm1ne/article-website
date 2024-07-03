import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
export interface tokenState {
  value: string
}

// Define the initial state using that type
const initialState: tokenState = {
  value: ''
}

export const tokenSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { set } = tokenSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.auth.value

export default tokenSlice.reducer
