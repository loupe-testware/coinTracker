import { configureStore } from '@reduxjs/toolkit'
import coinsReducer from './coinSlice'

export default configureStore({
    reducer: {
        coins: coinsReducer
    }
})