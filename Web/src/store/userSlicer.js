import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    firstName: '',
    name: '',
    picture: '',
    isAdmin: ''
  },

  reducers: {
    login: (state, action) => {
      state.value += action.payload
    }
  }
})

export const {login} = counterSlice.actions

export default counterSlice.reducer