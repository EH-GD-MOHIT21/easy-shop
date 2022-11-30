import { configureStore } from '@reduxjs/toolkit'
import DukaanSlice from './DukaanSlice'
export const store = configureStore({
  reducer: {
    Dukaan: DukaanSlice
}
})