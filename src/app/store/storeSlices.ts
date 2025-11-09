import authReducer from "@features/auth/store/authSlice";
import gameReducer from "@features/game/store/gameSlice";

export const storeSlices = { auth: authReducer, game: gameReducer };