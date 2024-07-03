import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
export interface userIdState {
  value: string
}

// Define the initial state using that type
const initialState: userIdState = {
  value: ''
}

export const userIdSlice = createSlice({
  name: 'userId',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setUserId } = userIdSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.userId.value

export default userIdSlice.reducer

