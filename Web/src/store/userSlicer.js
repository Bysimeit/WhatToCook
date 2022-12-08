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
      state.value += action.payload;
      state.email = '';
      state.firstName = '';
      state.name = '';
      state.picture = '';
      state.isAdmin =  '';
    }
  }
})

export const {login} = counterSlice.actions

export default counterSlice.reducer