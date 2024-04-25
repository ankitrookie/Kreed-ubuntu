import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {signUp, Otp, Login, SendOtp, UpdateUser, getAllPost, getUserPost} from './authAPI';

export const signUpUserAsync = createAsyncThunk(
  'user/signUp',
  async userData => {
    const response = await signUp(userData);
    return response;
  },
);

export const otpAsync = createAsyncThunk(
  'user/otp',
  async ({otp, phonenumber}) => {
    const response = await Otp({otp, phonenumber});
    return response;
  },
);

export const loginAsync = createAsyncThunk('user/login', async userData => {
  const response = await Login(userData);
  return response;
});

export const sendOtpAsync = createAsyncThunk(
  'user/sendOtp',
  async ({phonenumber}) => {
    const response = await SendOtp({phonenumber});
    return response;
  },
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({updateUserData}) => {
    console.log("updateUserData", updateUserData);
    const response = await UpdateUser(updateUserData);
    return response;
  },
);

export const getAllPostAsync = createAsyncThunk(
  'user/getAllPost',
  async ({userId}) => {
    const response = await getAllPost(userId);
    return response;
  },
);

export const getUserPostAsync = createAsyncThunk(
  'user/getUserPost',
  async ({userId}) => {
    const response = await getUserPost(userId);
    return response;
  },
);

const initialState = {
  getPost: null,
  user: null,
  updateUser: null,
  otp: null,
  sendOtp: null,
  loading: false,
  error: null,
  phonenumber: null,
  setotp: null,
  userPost: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phonenumber = action.payload;
    },
    setotp: (state, action) => {
      state.setotp = action.payload;
    },
    setid: (state, action) => {
      state.id = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUserAsync.pending, state => {
        state.loading = true;
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(otpAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(otpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(sendOtpAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendOtpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.sendOtp = action.payload;
        state.error = null;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.updateUser = action.payload;
        state.error = null;
      })
      .addCase(getAllPostAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.getPost = action.payload;
        state.error = null;
      })
      .addCase(getUserPostAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userPost = action.payload;
        state.error = null;
      })
  },
});

// auth signup
export const selectLoading = state => state.auth.loading;
export const selectUser = state => state.auth.user;
export const selectError = state => state.auth.error;

// auth otp
export const selectPhoneNumber = state => state.auth.phonenumber;
export const selectId = state => state.auth.id;
export const {setPhoneNumber} = authSlice.actions;
export const {setotp} = authSlice.actions;
export const {setid} = authSlice.actions;
export const selectOtpLoading = state => state.auth.loading;
export const selectOtpError = state => state.auth.error;

// send otp
export const selectSendOtpLoading = state => state.auth.loading;
export const selectSendOtpError = state => state.auth.error;

// auth login
export const selectLoginLoading = state => state.auth.loading;
export const selectLoginError = state => state.auth.error;

// update user
export const selectUpdateUserLoading = state => state.auth.loading;
export const selectUpdateUserError = state => state.auth.error;

export const selectGetPostLoading = state => state.auth.loading;
export const selectGetPost = state => state.auth.getPost;

export const selectUserPostLoading = state => state.auth.loading;
export const selectUserPost = state => state.auth.userPost;


export default authSlice.reducer;
