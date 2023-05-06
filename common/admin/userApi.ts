import axiosClient from '../apis/axiosClient';

export const getAllUsers = async (): Promise<any> => {
  const url = '/user/get-all';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
