import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { IArticle } from '../../shared/interfaces'


// Define a type for the slice state
export interface articleState {
  value: IArticle
}

// Define the initial state using that type
const initialState: articleState = {
  value: {
    _id: '',
    title: '',
    content: '',
    author: '',
    createdAt: '',
    updatedAt: ''
  }
}

export const articleSlice = createSlice({
  name: 'article',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<IArticle>) => {
      state.value = action.payload
    },
    unsetArticle: (state) => {
      state.value = initialState.value
    },
  }
})

export const { setArticle, unsetArticle } = articleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectArticle = (state: RootState) => state.article.value

export default articleSlice.reducer
