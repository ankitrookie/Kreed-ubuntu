import {BASE_URL} from '@env';
import {useAuthStore} from '../../store/useAuthStore';

// const user = useAuthStore.getState().user;

export const createRoom = async (roomname, password, sportType, myUserId) => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/createRoom`, {
      method: 'POST',
      body: JSON.stringify(roomname, password, sportType, myUserId),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('SignUp error', error);
  }
};

export const joinRoom = async (roomname, password, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/joinRoom`, {
      method: 'POST',
      body: JSON.stringify(roomname, password, userId),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('SignUp error', error);
  }
};

export const getUserData = async userIds => {
  try {
    const promises = userIds.map(async userId => {
      const response = await fetch(`${BASE_URL}/user/getUser/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    });
    const usersData = await Promise.all(promises);
    return usersData;
  } catch (error) {
    console.log('User Data error', error);
  }
};

export const getRoomDetails = async roomId => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/getRoom/${roomId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const leaveRoom = async (roomId, userId) => {
  try {
    const response = await fetch(
      `https://creedapv1.onrender.com/rooms/leaveRoom`,
      {
        method: 'POST',
        body: JSON.stringify({roomId, userId}),
        headers: {'Content-Type': 'application/json'},
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const startGame = async roomId => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/games/start/${roomId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
