import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    firstName: '',
    name: '',
    picture: '',
    isAdmin: ''
  },

  reducers: {
    login: (state, action) => {
      state.id += action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.name = action.payload.name;
      state.picture = action.payload.picture;
      state.isAdmin =  action.payload.isAdmin;
    }
  }
})

export const {login} = counterSlice.actions

export default counterSlice.reducer