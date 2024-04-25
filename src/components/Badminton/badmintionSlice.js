import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doubleTeam, doubleTeamScore, singleTeam, singleTeamScore, endRoom, getRoomScore, makeCoHost } from './badmintonAPI';

export const doubleTeamAsync = createAsyncThunk(
    'user/doubleTeam',
    async ({ roomId, userId1, userId2, userId3, userId4 }) => {
        const response = await doubleTeam(roomId, userId1, userId2, userId3, userId4);
        return response;
    }
);

export const doubleTeamScoreAsync = createAsyncThunk(
    'user/doubleTeamScore',
    async ({ gameId, score }) => {
        const response = await doubleTeamScore(gameId, score);
        return response;
    }
);

export const singleTeamAsync = createAsyncThunk(
    'user/singleTeam',
    async ({ roomId, userId1, userId2 }) => {
        const response = await singleTeam(roomId, userId1, userId2);
        return response;
    }
);

export const singleTeamScoreAsync = createAsyncThunk(
    'user/singleTeamScore',
    async ({ gameId, score }) => {
        const response = await singleTeamScore(gameId, score);
        return response;
    }
)

export const endRoomAsync = createAsyncThunk(
    'user/endRoom',
    async ({ roomId }) => {
        const response = await endRoom(roomId);
        return response;
    }
);

export const getRoomScoreAsync = createAsyncThunk(
    'user/getRoomScore',
    async ({ roomId }) => {
        const response = await getRoomScore(roomId);
        return response;
    }
);

export const makeCoHostAsync = createAsyncThunk(
    'user/makeCoHost',
    async ({ roomId, userId }) => {
        console.log("slice", roomId, userId);
        const response = await makeCoHost(roomId, userId);
        return response;
    }
);

const initialState = {
    doubleGame: null,
    score: null,
    singleGame: null,
    startLoading: false,
    singleScore: null,
    singleLoading: false,
    singleScoreLoading: false,
    endRoomLoading: false,
    roomScore: null,
    roomScoreLoading: false,
    endRoom: null,
    coHostLoading: false,
    coHost: null,
    loading: false,
    error: null,
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(doubleTeamAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(doubleTeamAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.doubleGame = action.payload;
                state.error = null;
            })
            .addCase(doubleTeamScoreAsync.pending, (state, action) => {
                state.startLoading = true;
            })
            .addCase(doubleTeamScoreAsync.fulfilled, (state, action) => {
                state.startLoading = false;
                state.score = action.payload;
                state.error = null;
            })
            .addCase(singleTeamAsync.pending, (state) => {
                state.singleLoading = true;
            })
            .addCase(singleTeamAsync.fulfilled, (state, action) => {
                state.singleLoading = false;
                state.singleGame = action.payload;
                state.error = null;
            })
            .addCase(singleTeamScoreAsync.pending, (state, action) => {
                state.singleScoreLoading = true;
            })
            .addCase(singleTeamScoreAsync.fulfilled, (state, action) => {
                state.singleScoreLoading = false;
                state.singleScore = action.payload;
                state.error = null;
            })
            .addCase(endRoomAsync.pending, (state, action) => {
                state.endRoomLoading = true;
            })
            .addCase(endRoomAsync.fulfilled, (state, action) => {
                state.endRoomLoading = false;
                state.endRoom = action.payload;
                state.error = null;
            })
            .addCase(getRoomScoreAsync.pending, (state, action) => {
                state.roomScoreLoading = true;
            })
            .addCase(getRoomScoreAsync.fulfilled, (state, action) => {
                state.roomScoreLoading = false;
                state.roomScore = action.payload;
                state.error = null;
            })
            .addCase(makeCoHostAsync.pending, (state, action) => {
                state.coHostLoading = true;
            })
            .addCase(makeCoHostAsync.fulfilled, (state, action) => {
                state.coHostLoading = false;
                state.coHost = action.payload;
                state.error = null;
            })
    }
})

// create double 
export const selectScoreLoading = (state) => state.score.loading;
export const selectDoubleGame = (state) => state.score.doubleGame;
export const selectError = (state) => state.score.error;

//  update score
export const selectScoreUpdateLoading = (state) => state.score.startLoading;
export const selectScoreUpdateError = (state) => state.score.error;

// create single
export const selectSingleLoading = (state) => state.score.singleLoading;
export const selectSingleGame = (state) => state.score.singleGame;
export const selectSingleError = (state) => state.score.error;

// single score
export const selectSingleScoreLoading = (state) => state.score.singleScoreLoading;
export const selectSingleScoreError = (state) => state.score.error;

// room score
export const selectRoomScoreLoading = (state) => state.score.roomScoreLoading;
export const selectRoomScore = (state) => state.score.roomScore;
export const selectRoomScoreError = (state) => state.score.error;

// end room
export const selectEndRoomLoading = (state) => state.score.endRoomLoading;
export const selectEndRoomError = (state) => state.score.error;

// co host
export const selectCoHostLoading = (state) => state.score.coHostLoading;
export const selectCoHostError = (state) => state.score.error;

export default scoreSlice.reducer;