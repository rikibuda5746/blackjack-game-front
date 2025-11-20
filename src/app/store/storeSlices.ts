import authReducer from "@features/auth/store/authSlice";
import gameReducer from "@features/game/store/gameSlice";
import adminReducer from "@features/admin/store/adminSlice";

export const storeSlices = { auth: authReducer, game: gameReducer, admin: adminReducer };