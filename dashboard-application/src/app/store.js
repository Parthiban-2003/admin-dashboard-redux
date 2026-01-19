import { configureStore } from '@reduxjs/toolkit'
import formsReducer from '../features/formsSlice'

export const store = configureStore({
  reducer: {
    forms: formsReducer
  }
})
