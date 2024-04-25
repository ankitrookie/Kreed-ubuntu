import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../screens/authScreens/authSlice";
import roomSlice from "../screens/RoomScreen/roomSlice"
import scoreSlice from "../components/Badminton/badmintionSlice";
import cricketSlice from "../components/Cricket/cricketSlice";
import profileSlice from "../screens/ProfileScreen/profileSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        room: roomSlice,
        score: scoreSlice,
        cricketRoom: cricketSlice,
        profile: profileSlice
    }
})