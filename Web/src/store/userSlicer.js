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
      const data = action.payload[0];

      state.id = data.id;
      state.email = data.email;
      state.firstName = data.firstname;
      state.name = data.name;
      state.picture = data.picture;
      state.isAdmin =  data.isAdmin;
    }
  }
})

export const {login} = counterSlice.actions

export default counterSlice.reducer