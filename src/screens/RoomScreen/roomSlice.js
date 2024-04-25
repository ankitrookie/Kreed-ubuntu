import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRoom, joinRoom, getUserData, getRoomDetails, leaveRoom, startGame } from './roomAPI';

export const createRoomAsync = createAsyncThunk(
    'user/createroom',
    async (roomname, password, sportType, myUserId) => {
        const response = await createRoom(roomname, password, sportType, myUserId);
        return response;
    }
);

export const joinRoomAsync = createAsyncThunk(
    'user/joinRoom',
    async (roomname, password, userId) => {
        const response = await joinRoom(roomname, password, userId);
        return response;
    }
);

export const getUserDataAsync = createAsyncThunk(
    'user/getUserData',
    async (userIds) => {
        const response = await getUserData(userIds);
        return response;
    }
);

export const getRoomDetailsAsync = createAsyncThunk(
    'user/getRoomDetails',
    async (roomId) => {
        const response = await getRoomDetails(roomId);
        return response;
    }
);

export const leaveRoomAsync = createAsyncThunk(
    'user/getLeaveRoom',
    async ({ roomId, userId }) => {
        const response = await leaveRoom(roomId, userId);
        return response;
    }
);

export const startGameAsync = createAsyncThunk(
    'user/startGame',
    async (roomId) => {
        const response = await startGame(roomId);
        return response;
    }
)

const initialState = {
    room: null,
    userData: [],
    roomDetails: [],
    startGame: null,
    startLoading: false,
    loading: false,
    error: null,
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRoomAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRoomAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
                state.error = null;
            })
            .addCase(joinRoomAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(joinRoomAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
                state.error = null;
            })
            .addCase(getUserDataAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserDataAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(getRoomDetailsAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getRoomDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.roomDetails = action.payload;
                state.error = null;
            })
            .addCase(leaveRoomAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(leaveRoomAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
                state.error = null;
            })
            .addCase(startGameAsync.pending, (state, action) => {
                state.startLoading = true;
            })
            .addCase(startGameAsync.fulfilled, (state, action) => {
                state.startLoading = false;
                state.startGame = action.payload;
                state.error = null;
            })
    }
})

// create Room
export const selectLoading = (state) => state.room.loading;
export const selectRoom = (state) => state.room.room;
export const selectError = (state) => state.room.error;

// join Room
export const selectJoinLoading = (state) => state.room.loading;
export const selectJoinRoom = (state) => state.room.room;
export const selectJoinError = (state) => state.room.error;

// get user data
export const selectUserDataLoading = (state) => state.room.loading;
export const selectUserData = (state) => state.room.userData;

// get room details
export const selectRoomDetails = (state) => state.room.roomDetails;

// leave room
export const selectLeaveLoading = (state) => state.room.loading;
export const selectLeaveError = (state) => state.room.error;

// start game
export const selectStartGameLoading = (state) => state.room.startLoading;
export const selectStartGameData = (state) => state.room.startGame;
export const selectStartGameError = (state) => state.room.error;

export default roomSlice.reducer