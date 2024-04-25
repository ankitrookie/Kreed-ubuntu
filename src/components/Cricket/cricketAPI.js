import {BASE_URL} from '@env';

export const createCricketGame = async (roomId, roomPlayers) => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/games/cricket/${roomId}`, {
      method: 'POST',
      body: JSON.stringify(roomPlayers),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('SignUp error', error);
  }
};

export const teamToss = async (roomId, tossWin) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rooms/games/cricket/addToss/${roomId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(tossWin),
        headers: {'Content-Type': 'application/json'},
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const selectBatsMan = async playerData => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/cricket/updateCricScore`, {
      method: 'PUT',
      body: JSON.stringify(playerData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const selectBowler = async playerData => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/cricket/updateCricScore`, {
      method: 'PUT',
      body: JSON.stringify(playerData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayerScore = async playerData => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/cricket/updateCricScore`, {
      method: 'PUT',
      body: JSON.stringify(playerData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const teamScores = async teamScore => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/teamScore/createOrUpdate`, {
      method: 'POST',
      body: JSON.stringify(teamScore),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const teamScoresBowler = async teamScore => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/teamScore/createOrUpdate`, {
      method: 'POST',
      body: JSON.stringify(teamScore),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const playerOver = async playerOverData => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/overs/create`, {
      method: 'POST',
      body: JSON.stringify(playerOverData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const playerOverUpdate = async ballByBallData => {
  try {
    const response = await fetch(`${BASE_URL}/rooms/overs/runbyballs/create`, {
      method: 'PUT',
      body: JSON.stringify(ballByBallData),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomScoreForScoreBoard = async roomId => {
  try {
    const response = await fetch(
      `${BASE_URL}/rooms/rooms/games/scores/${roomId}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMoments = async ({roomId, userId, images, videos}) => {
  const formData = new FormData();
  formData.append('roomId', roomId);
  formData.append('userId', userId);

  if (images) {
    formData.append('images', {
      uri: `file://${images}`,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
  }

  if (videos) {
    formData.append('images', {
      uri: `file://${videos}`,
      type: 'video/mp4',
      name: 'video.mp4',
    });
  }

  console.log('formData', formData);

  try {
    const response = await fetch(`${BASE_URL}/moment/moments/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMoments = async roomId => {
  try {
    const response = await fetch(`${BASE_URL}/moment/moments/${roomId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postPublish = async ({
  GameIds,
  userId,
  caption,
  imageAndVideos,
  videosEdited,
}) => {
  const formData = new FormData();

  formData.append('GameIds', JSON.stringify(GameIds));
  formData.append('userId', userId);
  formData.append('caption', caption);

  if (imageAndVideos && imageAndVideos.length > 0) {
    formData.append('imageUrls', JSON.stringify(imageAndVideos));
  }

  if (videosEdited && videosEdited.length > 0) {
    videosEdited.forEach(videoUrl => {
      formData.append('media', {
        uri: videoUrl,
        type: 'video/mp4',
        name: 'video.mp4',
      });
    });
  }

  console.log('formData', formData);

  try {
    const response = await fetch(`${BASE_URL}/posts/posts`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async ({userId, postId, method}) => {
  const userIds = {
    userId: userId,
  };
  console.log('methods', method);
  try {
    const response = await fetch(`${BASE_URL}/posts/posts/like/${postId}`, {
      method: method,
      body: JSON.stringify(userIds),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = async ({userId, postId, comment}) => {
  const commentBody = {
    userId: userId,
    comment: comment,
  };
  try {
    const response = await fetch(`${BASE_URL}/posts/posts/comment/${postId}`, {
      method: 'POST',
      body: JSON.stringify(commentBody),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
