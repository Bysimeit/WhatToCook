import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    firstName: '',
    name: '',
    picture: '',
    isAdmin: '',
    token: '',
  },

  reducers: {
    login: (state, action) => {
      const data = action.payload[0];

      state.id = data.id;
      state.email = data.email;
      state.firstName = data.firstname;
      state.name = data.name;
      state.picture = data.picture;
      state.isAdmin =  data.isadmin;
    },

    setToken: (state, action) => {
      state.token =  action.payload;
    }
  }
})

export const {login, setToken} = userSlice.actions

export default userSlice.reducer;