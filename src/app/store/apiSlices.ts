import { authApi } from "@/features/auth/api/authApi";
import { gameApi } from "@/features/game/api/gameApi";
import { adminApi } from "@/features/admin/api/adminApi";

export const apiSlices = [authApi, gameApi, adminApi];