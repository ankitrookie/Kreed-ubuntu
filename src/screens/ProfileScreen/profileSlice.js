import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadProfile, uploadBanner } from './profileAPI';

export const uploadProfileAsync = createAsyncThunk(
    'profile/uploadProfile',
    async ({ userProfileUpdate }) => {
        const response = await uploadProfile(userProfileUpdate);
        return response;
    }
);

export const uploadBannerAsync = createAsyncThunk(
    'profile/uploadBanner',
    async ({ userProfileUpdate }) => {
        const response = await uploadBanner(userProfileUpdate);
        return response;
    }
);

const initialState = {
    profilePic: null,
    coverProfile: null,
    loading: false,
    error: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadProfileAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadProfileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.profilePic = action.payload;
                state.error = null;
            })
            .addCase(uploadBannerAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadBannerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.coverProfile = action.payload;
                state.error = null;
            })
    }
})

// create profile 
export const selectProfileUpdateLoading = (state) => state.score.loading;
export const selectProfileUpdate = (state) => state.score.profilePic;
export const selectProfileUpdateError = (state) => state.score.error;


// create banner 
export const selectBannerLoading = (state) => state.score.loading;
export const selectBannerUpdate = (state) => state.score.profilePic;

export default profileSlice.reducer;