import {BASE_URL} from '@env';

export const uploadProfile = async ({id, result}) => {
  const formData = new FormData();
  formData.append('profileImage', {
    uri: result.assets[0].uri,
    type: result.assets[0].type,
    name: result.assets[0].fileName,
  });
  try {
    const response = await fetch(`${BASE_URL}/user/update/${id}`, {
      method: 'PUT',
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


export const uploadBanner = async ({id, result}) => {
    const formData = new FormData();
    formData.append('coverPhoto', {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    });
    try {
      const response = await fetch(`${BASE_URL}/user/update/${id}`, {
        method: 'PUT',
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
  
