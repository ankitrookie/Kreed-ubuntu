import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  createCricketGame,
  teamToss,
  selectBatsMan,
  selectBowler,
  updatePlayerScore,
  getRoomScoreForScoreBoard,
  teamScores,
  teamScoresBowler,
  playerOver,
  playerOverUpdate,
  updateMoments,
  getMoments,
  postPublish,
  likePost,
  commentPost
} from './cricketAPI';

export const cricketGameAsync = createAsyncThunk(
  'cricket/cricketGame',
  async ({roomId, roomPlayers}) => {
    const response = await createCricketGame(roomId, roomPlayers);
    return response;
  },
);

export const teamTossAsync = createAsyncThunk(
  'cricket/teamToss',
  async ({gameId, tossWin}) => {
    const response = await teamToss(gameId, tossWin);
    return response;
  },
);

export const selectBatsManAsync = createAsyncThunk(
  'cricket/selectBatsMan',
  async ({playerData}) => {
    console.log('all batter data', playerData);
    const response = await selectBatsMan(playerData);
    return response;
  },
);

export const selectBowlerAsync = createAsyncThunk(
  'cricket/selectBowler',
  async ({playerData}) => {
    const response = await selectBowler(playerData);
    return response;
  },
);

export const updatePlayerScoreAsync = createAsyncThunk(
  'cricket/updatePlayerScore',
  async ({playerData}) => {
    console.log('batter player score'.playerData);
    const response = await updatePlayerScore(playerData);
    return response;
  },
);
export const teamRunsAsync = createAsyncThunk(
  'cricket/teamScores',
  async ({teamScore}) => {
    const response = await teamScores(teamScore);
    return response;
  },
);

export const teamScoresBowlerAsync = createAsyncThunk(
  'cricket/teamScoresBowler',
  async ({teamScore}) => {
    const response = await teamScoresBowler(teamScore);
    return response;
  },
);

export const playerOverAsync = createAsyncThunk(
  'cricket/playerOver',
  async ({playerOverData}) => {
    const response = await playerOver(playerOverData);
    return response;
  },
);

export const playerOverUpdateAsync = createAsyncThunk(
  'cricket/playerOverUpdate',
  async ({ballByBallData}) => {
    const response = await playerOverUpdate(ballByBallData);
    return response;
  },
);

export const getRoomScoreForScoreBoardAsync = createAsyncThunk(
  'cricket/getRoomScoreForScoreBoardAsync',
  async ({roomId}) => {
    const response = await getRoomScoreForScoreBoard(roomId);
    return response;
  },
);

export const updateMomentsAsync = createAsyncThunk(
  'cricket/updateMoments',
  async ({momentsData}) => {
    const response = await updateMoments(momentsData);
    return response;
  },
);

export const getMomentsAsync = createAsyncThunk(
  'cricket/getMoments',
  async ({roomId}) => {
    console.log('roomid for moments', roomId);
    const response = await getMoments(roomId);
    return response;
  },
);

export const postPublishAsync = createAsyncThunk(
  'cricket/postPublish',
  async ({postData}) => {
    const response = await postPublish(postData);
    return response;
  },
);

export const likePostAsync = createAsyncThunk(
  'cricket/likePost',
  async ({likeData}) => {
    const response = await likePost(likeData);
    return response;
  },
);

export const commentPostAsync = createAsyncThunk(
  'cricket/commentPost',
  async ({commentData}) => {
    const response = await commentPost(commentData);
    return response;
  },
);

const initialState = {
  cricketGame: null,
  selectedBatsMan: [],
  updatedScore: null,
  teamScore: null,
  bowlerTeamScore: null,
  selectedBowler: null,
  tossWin: null,
  tossLoading: false,
  batsManLoading: false,
  bowlerLoading: false,
  updateScoreLoading: false,
  loading: false,
  error: null,
  battingTeamData: null,
  bowlingTeamData: null,
  selectedUserId: null,
  selectedStrAndNonStr: [],
  selectedSingleBowler: [],
  bowlerCount: false,
  overId: null,
  roomScoreBoard: null,
  moments: null,
  getMoments: null,
  posts: null,
  like: null,
  comment: null
};

export const cricketSlice = createSlice({
  name: 'cricketRoom',
  initialState,
  reducers: {
    setBattingTeamData: (state, action) => {
      state.battingTeamData = action.payload;
    },
    setBowlingTeamData: (state, action) => {
      state.bowlingTeamData = action.payload;
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    setBowlerCount: (state, action) => {
      state.bowlerCount = true;
    },
    setTeamScoreBatter: (state, action) => {
      const teamScore = action.payload;
      const existingTeamScoreIndex = state.teamScores.findIndex(
        score => score.teamId === teamScore.teamId,
      );

      if (existingTeamScoreIndex !== -1) {
        state.teamScores[existingTeamScoreIndex] = teamScore;
      } else {
        state.teamScores = [teamScore, ...state.teamScores];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(cricketGameAsync.pending, state => {
        state.loading = true;
      })
      .addCase(cricketGameAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cricketGame = action.payload;
        state.error = null;
      })
      .addCase(teamTossAsync.pending, (state, action) => {
        state.tossLoading = true;
      })
      .addCase(teamTossAsync.fulfilled, (state, action) => {
        state.tossLoading = false;
        state.tossWin = action.payload;
        state.error = null;
      })
      .addCase(selectBatsManAsync.pending, (state, action) => {
        state.batsManLoading = true;
      })
      .addCase(selectBatsManAsync.fulfilled, (state, action) => {
        state.batsManLoading = false;
        state.selectedBatsMan = action.payload;
        state.error = null;
      })
      .addCase(selectBowlerAsync.pending, (state, action) => {
        state.bowlerLoading = true;
      })
      .addCase(selectBowlerAsync.fulfilled, (state, action) => {
        state.bowlerLoading = false;
        state.selectedBowler = action.payload;
        state.error = null;
      })
      .addCase(updatePlayerScoreAsync.pending, (state, action) => {
        state.updateScoreLoading = true;
      })
      .addCase(updatePlayerScoreAsync.fulfilled, (state, action) => {
        state.updateScoreLoading = false;
        state.updatedScore = action.payload;
        state.error = null;
      })
      .addCase(teamRunsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(teamRunsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.teamScore = action.payload;
        state.error = null;
      })
      .addCase(teamScoresBowlerAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(teamScoresBowlerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bowlerTeamScore = action.payload;
        state.error = null;
      })
      .addCase(playerOverAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(playerOverAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.overId = action.payload;
        state.error = null;
      })
      .addCase(playerOverUpdateAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(playerOverUpdateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.overId = action.payload;
        state.error = null;
      })
      .addCase(getRoomScoreForScoreBoardAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRoomScoreForScoreBoardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.roomScoreBoard = action.payload;
        state.error = null;
      })
      .addCase(updateMomentsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateMomentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.moments = action.payload;
        state.error = null;
      })
      .addCase(getMomentsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMomentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.getMoments = action.payload;
        state.error = null;
      })
      .addCase(postPublishAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postPublishAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(likePostAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.like = action.payload;
        state.error = null;
      })
      .addCase(commentPostAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(commentPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
        state.error = null;
      })
  },
});

// create double
export const selectCricketLoading = state => state.cricketRoom.loading;
export const selectCricketGame = state => state.cricketRoom.cricketGame;
export const selectCricketError = state => state.cricketRoom.error;

// toss
export const selectTossLoading = state => state.cricketRoom.tossLoading;
export const selectTossWin = state => state.cricketRoom.tossWin;
export const selectTossError = state => state.cricketRoom.error;

export const selectedBattingTeamData = state =>
  state.cricketRoom.battingTeamData;
export const selectedBowlingTeamData = state =>
  state.cricketRoom.bowlingTeamData;
export const selectSelectedUserId = state => state.cricketRoom.selectedUserId;
export const selectSelectedStrAndNonStr = state =>
  state.cricketRoom.selectedStrAndNonStr;
export const selectSelectedSingleBowler = state =>
  state.cricketRoom.selectedSingleBowler;
export const selectBowlerCount = state => state.cricketRoom.bowlerCount;
export const selectTeamScores = state => state.cricketRoom.teamScore; // batter team Score
export const selectBowlerTeamScores = state =>
  state.cricketRoom.bowlerTeamScore; // bowler teamScore
export const {
  setBattingTeamData,
  setBowlingTeamData,
  setSelectedUserId,
  setBowlerCount,
  setTeamScoreBatter,
} = cricketSlice.actions;

// batsMan
export const selectBatsManLoading = state => state.cricketRoom.batsManLoading;
export const selectedBatsMan = state => state.cricketRoom.selectedBatsMan;
export const selectBatsManError = state => state.cricketRoom.error;

// Bowler
export const selectBowlerLoading = state => state.cricketRoom.bowlerLoading;
export const selectedOpeningBowler = state => state.cricketRoom.selectedBowler;
export const selectBowlerError = state => state.cricketRoom.error;

// userUpdatedScore
export const selectUpdateScoreLoading = state =>
  state.cricketRoom.updateScoreLoading;
export const selectUpdatedScore = state => state.cricketRoom.updatedScore;
export const selectUpdateScoreError = state => state.cricketRoom.error;

// team scores
export const selectTeamScoreLoading = state => state.cricketRoom.loading;
export const selectTeamScore = state => state.cricketRoom.teamScore;
export const selectTeamScoreError = state => state.cricketRoom.error;

// overs
export const selectOverLoading = state => state.cricketRoom.loading;
export const selectOverId = state => state.cricketRoom.overId;
export const selectOverError = state => state.cricketRoom.error;

// over each request
export const selectPlayerOverLoading = state => state.cricketRoom.loading;
export const selectPlayerOverId = state => state.cricketRoom.overId;
export const selectPlayerOverError = state => state.cricketRoom.error;

export const selectGetScoreBoardLoading = state => state.cricketRoom.loading;
export const selectGetScoreBoard = state => state.cricketRoom.roomScoreBoard;

export const selectMometsloading = state => state.cricketRoom.loading;
export const selectMoments = state => state.cricketRoom.moments;

export const selectGetMometsloading = state => state.cricketRoom.loading;
export const selectGetMoments = state => state.cricketRoom.getMoments;

export const selectPostPublishloading = state => state.cricketRoom.loading;
export const selectPostPublish = state => state.posts.getMoments;

export const selectLikeloading = state => state.cricketRoom.loading;
export const selectLike = state => state.posts.like;

export const selectCommetLoading = state => state.cricketRoom.loading;
export const selectComment = state => state.posts.comment;


export default cricketSlice.reducer;
