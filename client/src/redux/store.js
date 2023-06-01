import { configureStore } from '@reduxjs/toolkit'
import { heroesReducer } from './slices/heroesSlice'

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
})