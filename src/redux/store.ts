import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import coinsReducer from './coinSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        coins: coinsReducer
    }
})