import axiosClient from './axiosClient';

export const getInfoUser = async (): Promise<any> => {
  const url = '/user/get-info';
  return axiosClient.get(url);
};

export const changeInfoUser = async (
  username: string,
  address: string,
  telephone: string
): Promise<any> => {
  const url = '/user/change-info';
  return axiosClient.put(
    url,
    { username, address, telephone },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

export const changeAvatarUser = async (avatar: File | string): Promise<any> => {
  const url = '/user/update-avatar';
  return axiosClient.post(
    url,
    { avatar },
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
  );
};
