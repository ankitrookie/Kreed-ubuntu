import {BASE_URL} from '@env';

export const signUp = async userData => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('SignUp error', error);
  }
};

export const Otp = async ({otp, phonenumber}) => {
  console.log('otp', otp, 'phoneNumber', phonenumber);
  try {
    const response = await fetch(`${BASE_URL}/user/verify-otp`, {
      method: 'POST',
      body: JSON.stringify({otp: Number(otp), phonenumber: phonenumber}),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Otp error', error);
  }
};

export const SendOtp = async ({phonenumber}) => {
  try {
    const response = await fetch(`${BASE_URL}/user/send-otp`, {
      method: 'POST',
      body: JSON.stringify({phonenumber: phonenumber}),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Send error', error);
  }
};

export const Login = async userData => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Login error', error);
  }
};

export const UpdateUser = async ({
  storedId,
  username,
  fname,
  bio,
  grip,
  profile,
  addPlayingBadminton,
  addPlayingcricket,
  bowlingStyle,
  battingStyle,
  gender,
}) => {
  console.log('profile from auth api', profile);
  const formData = new FormData();
  if (profile) {
    formData.append('profileImage', {
      uri: profile.assets[0].uri,
      type: profile.assets[0].type,
      name: profile.assets[0].fileName,
    });
  }
  if (fname) {
    formData.append('fname', fname);
  }
  if(gender){
    formData.append('gender', gender);
  }
  formData.append('username', username);
  formData.append('bio', bio);
  formData.append('grip', grip);
  formData.append('addPlayingBadminton', addPlayingBadminton);
  formData.append('addPlayingcricket', addPlayingcricket);
  formData.append('bowlingStyle', bowlingStyle);
  formData.append('battingStyle', battingStyle);

  console.log('formdata', formData);

  try {
    const response = await fetch(`${BASE_URL}/user/update/${storedId}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Update error', error);
  }
};

export const getAllPost = async ({userId}) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/getAllPosts/${userId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Update error', error);
  }
};

export const getUserPost = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/posts/${userId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Update error', error);
  }
};
