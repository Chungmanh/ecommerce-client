import axiosClient from '../apis/axiosClient';

export const getAllShops = async (): Promise<any> => {
  const url = '/shop/get-all';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
