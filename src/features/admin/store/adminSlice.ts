import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUser } from '@features/admin/types/usersTypes';

type AdminState = {
  adminUsers: AdminUser[];
};

const initialState: AdminState = {
  adminUsers: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminUsers: (state, action: PayloadAction<AdminUser[]>) => {      
      state.adminUsers = action.payload.map(user => ({
        ...user,
        balance: user.balance,
      }));
    },
    clearAdminUsers: (state) => {
      state.adminUsers = [];
    },
  },
});

export const { setAdminUsers, clearAdminUsers } = adminSlice.actions;
export default adminSlice.reducer;