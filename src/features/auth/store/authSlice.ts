import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { AuthState, LoginResponse } from '@features/auth/types'
import storageService from '@app/services/storageService'

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user
      storageService.setTokens({
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      })
    },
    logout: (state) => {
      state.user = null
      storageService.clearTokens()
    },
  },
})

export const { setCredentials, logout} = authSlice.actions
export default authSlice.reducer